import path from "node:path";
import fs from "node:fs/promises";
import { ROOT_DIR } from "./root-dir";
import { DEPENDENCIES, HASS_TS } from "./constants";

const getPackageJson = async () => {
  const packageJsonPath = path.join(ROOT_DIR, "package.json");
  const packageJson = JSON.parse(
    await fs.readFile(packageJsonPath, { encoding: "utf-8" })
  );
  const hassVersion = packageJson[DEPENDENCIES][HASS_TS];

  return `{
  "dependencies": {
    "hass-ts": "${hassVersion}",
  },
}`;
};

export const updatePackageJson = async (path: string) => {
  await fs.writeFile(path, await getPackageJson());
};
