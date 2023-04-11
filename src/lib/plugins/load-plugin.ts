import { Client, Logger } from 'ts-automation';
import fs from 'node:fs/promises';
import { pluginsDir } from './plugins-dir';
import { exists } from '../core/exists';
import { Plugin } from '../types/plugin';
import path from 'node:path';
import { listAllFiles } from '../core/list-all-files';
import { SwitchState } from 'hass-ts';
import { PluginMap } from '../types/plugin-map';

export const loadPlugin = async (
  name: string,
  client: Client,
  logger: Logger,
  plugins: PluginMap
): Promise<void> => {
  const pluginPath = path.join(pluginsDir, name);
  if (!(await exists(pluginPath))) {
    return;
  }
  const stat = await fs.stat(pluginPath);
  const switchName = `switch.ts_automation_${name}` as const;
  if (stat.isDirectory()) {
    const pluginPair = plugins.get(name);
    if (pluginPair) {
      logger.debug(
        `Plugin '${name}' was already loaded. Triggering unload first`
      );
      const [loadedPlugin, loadedSwitchListener] = pluginPair;
      client.removeStateChangedCallback(switchName, loadedSwitchListener);
      await loadedPlugin?.unload?.(logger);
    }

    logger.debug(`Loading '${name}'`);

    const pluginFiles = await listAllFiles(pluginPath);
    pluginFiles.forEach((file) => delete require.cache[require.resolve(file)]);

    const modulePath = `${pluginPath}/load.ts`;
    try {
      const { plugin } = (await import(modulePath)) as {
        plugin: Plugin;
      };

      logger.debug(`initialising '${name}'`);
      await plugin.initialise(client, logger);

      logger.debug(`Registering switch for ${name}`);
      await client.setState(switchName, { state: 'on' });
      const switchListener = (oldState: SwitchState, newState: SwitchState) => {
        if (oldState.state === 'off' && newState.state === 'on') {
          plugin.switchOn?.();
        }

        if (oldState.state === 'on' && newState.state === 'off') {
          plugin.switchOff?.();
        }
      };

      client.onStateChanged(switchName, switchListener);
      logger.debug(`Initialised '${name}'`);
      plugins.set(name, [plugin, switchListener]);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
      }
    }
  }
};
