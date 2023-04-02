import { Client, Logger } from 'hass-ts';
import { loadPlugin } from './load-plugin';
import { pluginsDir } from './plugins-dir';
import chokidar from 'chokidar';
import path from 'node:path';

export const watchAndReload = async (client: Client, logger: Logger) => {
  const watcher = chokidar.watch(`${pluginsDir}/**/*`, {
    persistent: true,
    usePolling: true,
    ignoreInitial: true
  });

  watcher.on('all', async (_event, watchedPath) => {
    logger.debug(`Change detected in '${watchedPath}'`);
    const dir = path.relative(pluginsDir, watchedPath).split('/')[0];
    if (dir) {
      await loadPlugin(dir, client, logger);
    }
  });
};
