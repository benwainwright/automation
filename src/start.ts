import { Client, Logger } from "hass-ts";

import fs from "node:fs/promises";
import { logger } from "./logger";
import { exists } from "./exists";
import { pluginsDir } from "./plugins-dir";
import { loadPlugin } from "./load-plugin";

export const start = async () => {
  logger.info("Starting my automations");
  const client = await Client.start(logger);

  if (!(await exists(pluginsDir))) {
    logger.info("Plugins directory didn't exist. Creating...");
    await fs.mkdir(pluginsDir);
  }

  const watcher = fs.watch(pluginsDir, { recursive: true });

  const entries = await fs.readdir(pluginsDir);

  const entryPromises = entries.map(async (fileEntry) => {
    await loadPlugin(fileEntry, client, logger);
  });

  await Promise.all(entryPromises);

  for await (const event of watcher) {
    const dir = event.filename.split("/")[0];
    await loadPlugin(dir, client, logger);
  }
};

start().catch((error) => console.log(error));
