import { Client, Logger } from 'ts-automation';
import fs from 'node:fs/promises';
import { pluginsDir } from './plugins-dir';
import { loadPlugin } from './load-plugin';
import { PluginMap } from '../types/plugin-map';

export const loadInitialPlugins = async (
  client: Client,
  logger: Logger,
  plugins: PluginMap
) => {
  logger.info('Loading startup plugins');
  const entries = await fs.readdir(pluginsDir);
  const entryPromises = entries.map(async (fileEntry) => {
    if (fileEntry !== 'node_modules') {
      await loadPlugin(fileEntry, client, logger, plugins);
    }
  });
  await Promise.all(entryPromises);
};
