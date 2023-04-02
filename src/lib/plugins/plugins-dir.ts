import path from "node:path";
import { PLUGINS_DIR } from "../core/constants";

export const pluginsDir = path.join(
  __dirname,
  "..",
  "..",
  "config",
  PLUGINS_DIR
);
