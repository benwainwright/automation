import { Logger } from "hass-ts";
import { exists } from "./exists";
import { pluginsDir } from "./plugins-dir";
import fs from "node:fs/promises";

export const ensurePluginsDir = async (logger: Logger) => {
  if (!(await exists(pluginsDir))) {
    logger.info("Plugins directory didn't exist. Creating...");
    await fs.mkdir(pluginsDir);
  }
};
