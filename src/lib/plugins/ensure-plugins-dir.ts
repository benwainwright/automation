import { Logger } from "hass-ts";
import fs from "node:fs/promises";
import { exists } from "../core/exists";
import { pluginsDir } from "./plugins-dir";

export const ensurePluginsDir = async (logger: Logger) => {
  if (!(await exists(pluginsDir))) {
    logger.info("Plugins directory didn't exist. Creating...");
    await fs.mkdir(pluginsDir, { recursive: true });
  }
};
