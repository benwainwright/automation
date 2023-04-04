import * as HassApi from 'hass-ts';
import { Expand } from './lib/types/expand';
import { ReducedClassInterface } from './lib/types/reduced-class-interface';
import { logger } from './lib/core/logger';
export { Plugin } from './lib/types/plugin';

export type Logger = typeof logger;

type HassApiType = Expand<typeof HassApi>;

type ClassMap = Record<string, { prototype: any }>;

type InterfaceMapTemplate<M extends ClassMap> = {
  [C in keyof M]: keyof M[C]['prototype'];
};

type ReduceApis<
  M extends ClassMap,
  R extends keyof M,
  T extends Partial<InterfaceMapTemplate<M>>
> = Omit<
  {
    [C in keyof M]: T extends Record<C, unknown>
      ? ReducedClassInterface<M[C], NonNullable<T[C]>>
      : M[C]['prototype'];
  },
  R
>;

interface ReduceClassMap {
  Client: 'init' | 'close' | 'onStateLoaded' | 'removeOnStateLoadedCallback';
}

type FinalApi = ReduceApis<HassApiType, 'HomeAssistantApi', ReduceClassMap>;

export type Client = FinalApi['Client'];
