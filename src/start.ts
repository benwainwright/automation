import { Client } from 'hass-ts';

import { loadInitialPlugins } from './lib/plugins/load-initial-plugins';
import { logger } from './lib/core/logger';
import { ensurePluginsDir } from './lib/plugins/ensure-plugins-dir';
import { watchAndReload } from './lib/plugins/watch-and-reload';

export const start = async () => {
  logger.info('Starting my automations');
  const client = await Client.start(logger);

  await ensurePluginsDir(logger);
  await loadInitialPlugins(client, logger);
  await watchAndReload(client, logger);
};

start().catch((error) => console.log(error));
