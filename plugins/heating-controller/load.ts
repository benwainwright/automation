import { Plugin } from "../../src/plugin";

import { initialise, unload } from "./initialise";

export const plugin: Plugin = {
  initialise,
  unload,
};
