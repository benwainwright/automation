import { Plugin } from 'ts-automation';

import { initialise, switchOff, switchOn, unload } from './initialise';

export const plugin: Plugin = {
  initialise,
  unload,
  switchOn,
  switchOff
};
