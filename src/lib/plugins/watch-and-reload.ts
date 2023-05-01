import { Client, Logger } from 'ts-automation';
import { loadPlugin } from './load-plugin';
import { pluginsDir } from './plugins-dir';
import chokidar from 'chokidar';
import path from 'node:path';
import { PluginMap } from '../types/plugin-map';

export const watchAndReload = async (
  client: Client,
  logger: Logger,
  plugins: PluginMap
) => {
  const watcher = chokidar.watch(`${pluginsDir}/**/*`, {
    persistent: true,
    usePolling: true,
    ignoreInitial: true
  });

  watcher.on('all', async (_event, watchedPath) => {
    const dir = path.relative(pluginsDir, watchedPath).split('/')[0];
    if (dir && dir !== 'node_modules') {
      logger.debug(`Change detected in '${watchedPath}'`);
      await loadPlugin(dir, client, logger, plugins);
    }
  });
};
