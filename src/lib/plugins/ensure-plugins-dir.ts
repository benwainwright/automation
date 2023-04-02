import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import { Logger } from 'hass-ts';
import { exists } from '../core/exists';
import { pluginsDir } from './plugins-dir';
import { updatePackageJson } from '../core/template-package-json';

export const ensurePluginsDir = async (logger: Logger) => {
  if (!(await exists(pluginsDir))) {
    logger.info(`${pluginsDir} didn't exist. Creating...`);
    await fs.mkdir(pluginsDir, { recursive: true });
  }
  await updatePackageJson(`${pluginsDir}/package.json`);

  const process = exec('yarn install', { cwd: pluginsDir });
  process.on('data', (data) => logger.info(data));
};
