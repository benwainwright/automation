import { Client as HassTsClient } from 'hass-ts';
import { ReducedClassInterface } from './reduced-class-interface';

export type Client = ReducedClassInterface<
  typeof HassTsClient,
  'init' | 'close' | 'onStateLoaded' | 'removeOnStateLoadedCallback'
>;
