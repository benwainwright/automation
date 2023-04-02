import path from "node:path";
import { PLUGINS_DIR } from "../core/constants";
import { ROOT_DIR } from "../core/root-dir";

export const pluginsDir = path.join(ROOT_DIR, PLUGINS_DIR);
