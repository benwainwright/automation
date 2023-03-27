import { Client, Logger } from "hass-ts";
import { loadPlugin } from "./load-plugin";
import { pluginsDir } from "./plugins-dir";
import fs from "node:fs/promises";

export const loadInitialPlugins = async (client: Client, logger: Logger) => {
  const entries = await fs.readdir(pluginsDir);
  const entryPromises = entries.map(async (fileEntry) => {
    await loadPlugin(fileEntry, client, logger);
  });
  await Promise.all(entryPromises);
};
