import path from "node:path";
import { PLUGINS_DIR } from "./constants";

export const pluginsDir = path.join(__dirname, "..", PLUGINS_DIR);
