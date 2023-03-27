import { Client, Logger } from "hass-ts";
import path from "node:path";
import fs from "node:fs/promises";
import { pluginsDir } from "./plugins-dir";
import { pluginsMap } from "./plugins-map";
import { Plugin } from "./plugin";
import { exists } from "./exists";

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
      await pluginsMap.get(name)?.unload(logger);
    }

    logger.info(`Loading '${name}'`);

    const modulePath = `${pluginPath}/load.ts`;
    delete require.cache[require.resolve(modulePath)];

    const { plugin } = (await import(modulePath)) as {
      plugin: Plugin;
    };

    logger.debug(`initialising '${name}'`);
    await plugin.initialise(client, logger);

    pluginsMap.set(name, plugin);
  }
};
