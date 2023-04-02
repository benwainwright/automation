import { Plugin } from "ts-automation";

import { initialise, unload } from "./initialise";

export const plugin: Plugin = {
  initialise,
  unload,
};
