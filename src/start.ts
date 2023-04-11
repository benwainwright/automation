import { Client } from 'hass-ts';

import { loadInitialPlugins } from './lib/plugins/load-initial-plugins';
import { logger } from './lib/core/logger';
import { ensurePluginsDir } from './lib/plugins/ensure-plugins-dir';
import { watchAndReload } from './lib/plugins/watch-and-reload';
import { PluginMap } from './lib/types/plugin-map';

export const start = async () => {
  logger.info('Starting my automations');
  const client = await Client.start(logger);

  await ensurePluginsDir(logger);

  const plugins: PluginMap = new Map();

  await loadInitialPlugins(client, logger, plugins);
  await watchAndReload(client, logger, plugins);
};

start().catch((error) => console.log(error));
