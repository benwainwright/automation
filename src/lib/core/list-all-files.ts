import fs from "node:fs/promises";
import path from "node:path";

export const listAllFiles = async (dirPath: string): Promise<string[]> => {
  const files = await fs.readdir(dirPath);
  return (
    await Promise.all(
      files.map(async (file) => {
        const thePath = path.join(dirPath, file);
        const stat = await fs.stat(thePath);
        if (stat.isDirectory()) {
          return await listAllFiles(thePath);
        }
        return thePath;
      })
    )
  ).flat();
};
