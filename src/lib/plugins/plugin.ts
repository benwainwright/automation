import { Client, Logger } from "hass-ts";

export interface Plugin {
  initialise: (client: Client, logger: Logger) => Promise<void>;
  unload?: (logger: Logger) => Promise<void>;
}
