import { Client, Logger } from 'ts-automation';
import fs from 'node:fs/promises';
import { pluginsDir } from './plugins-dir';
import { loadPlugin } from './load-plugin';

export const loadInitialPlugins = async (client: Client, logger: Logger) => {
  logger.info('Loading startup plugins');
  const entries = await fs.readdir(pluginsDir);
  const entryPromises = entries.map(async (fileEntry) => {
    await loadPlugin(fileEntry, client, logger);
  });
  await Promise.all(entryPromises);
};
