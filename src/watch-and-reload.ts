import { Client, Logger } from "hass-ts";
import { loadPlugin } from "./load-plugin";
import { pluginsDir } from "./plugins-dir";
import fs from "node:fs/promises";

export const watchAndReload = async (client: Client, logger: Logger) => {
  const watcher = fs.watch(pluginsDir, { recursive: true });
  for await (const event of watcher) {
    const dir = event.filename.split("/")[0];
    await loadPlugin(dir, client, logger);
  }
};
