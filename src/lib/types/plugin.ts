import { Client, Logger } from 'ts-automation';

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

  /**
   * Triggered when the switch for this plugin is changed to the 'on' state
   */
  switchOn: () => void;

  /**
   * Triggered when the switch for this plugin is changed to the 'off' state
   */
  switchOff: () => void;
}
