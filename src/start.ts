import { Client, Logger } from "hass-ts";

import { logger } from "./logger";
import { ensurePluginsDir } from "./ensure-plugins-dir";
import { loadInitialPlugins } from "./load-initial-plugins";
import { watchAndReload } from "./watch-and-reload";

export const start = async () => {
  logger.info("Starting my automations");
  const client = await Client.start(logger);

  await ensurePluginsDir(logger);
  await loadInitialPlugins(client, logger);
  await watchAndReload(client, logger);
};

start().catch((error) => console.log(error));
