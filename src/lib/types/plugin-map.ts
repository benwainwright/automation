import { Plugin } from './plugin';
import { SwitchListener } from './switch-listener';

export type PluginMap = Map<
  string,
  [plugin: Plugin, switchListener: SwitchListener]
>;
