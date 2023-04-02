import path from "node:path";
import fs from "node:fs/promises";
import { ROOT_DIR } from "./root-dir";
import { DEPENDENCIES, HASS_TS } from "./constants";
import { exists } from "./exists";

export const updatePackageJson = async (pluginsPackageJsonPath: string) => {
  const packageJsonPath = path.join(ROOT_DIR, "package.json");
  const currentPackageJson = JSON.parse(
    await fs.readFile(packageJsonPath, { encoding: "utf-8" })
  );
  const hassVersion = currentPackageJson[DEPENDENCIES][HASS_TS];

  const hassTsDependencies = {
    dependencies: {
      "hass-ts": hassVersion,
    },
  };

  const packageJson = (await exists(pluginsPackageJsonPath))
    ? {
        ...JSON.parse(
          await fs.readFile(pluginsPackageJsonPath, { encoding: "utf-8" })
        ),
        ...hassTsDependencies,
      }
    : hassTsDependencies;

  const content = JSON.stringify(packageJson, null, 2);
  await fs.writeFile(pluginsPackageJsonPath, content);
};
