import { Plugin } from 'ts-automation';

export const plugin: Plugin = {
  initialise: async () => {},
  unload: async () => {},
  switchOn: () => {
    console.log('SWITCH ON');
  },
  switchOff: () => {
    console.log('SWITCH OFF');
  }
};
