import { Client, Logger } from 'ts-automation';
import fs from 'node:fs/promises';
import { pluginsDir } from './plugins-dir';
import { exists } from '../core/exists';
import { Plugin } from '../types/plugin';
import { pluginsMap } from './plugins-map';
import path from 'node:path';
import { listAllFiles } from '../core/list-all-files';

export const loadPlugin = async (
  name: string,
  client: Client,
  logger: Logger
): Promise<void> => {
  const pluginPath = path.join(pluginsDir, name);
  if (!(await exists(pluginPath))) {
    return;
  }
  const stat = await fs.stat(pluginPath);
  if (stat.isDirectory()) {
    if (pluginsMap.has(name)) {
      logger.debug(
        `Plugin '${name}' was already loaded. Triggering unload first`
      );
      await pluginsMap.get(name)?.unload?.(logger);
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

      logger.debug(`Initialised '${name}'`);
      pluginsMap.set(name, plugin);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
      }
    }
  }
};
