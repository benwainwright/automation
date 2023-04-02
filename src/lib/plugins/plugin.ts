import { Client, Logger } from "hass-ts";

export interface Plugin {
  /**
   * Triggered when the plugin is first loaded and on
   * each reload. Put initialisation logic here
   */
  initialise: (client: Client, logger: Logger) => Promise<void>;

  /**
   * Triggered when the plugin is unloaded. This happens just before
   * every reload. Put cleanup logic here
   */
  unload?: (logger: Logger) => Promise<void>;
}
