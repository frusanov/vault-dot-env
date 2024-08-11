import { mkdir, readdir } from "node:fs/promises";
import Debug from "debug";

const debug = Debug("vault-dot-env:util:create-dir-if-not-exists");

export async function createDirIfNotExists(dirPath: string) {
  const segments = dirPath.split("/");

  for (let i = 1; i <= segments.length; i++) {
    const partialDirPath = segments.slice(0, i).join("/");

    try {
      await readdir(partialDirPath || "/");
      debug("Directory exists: %s", partialDirPath || "/");
    } catch (error: any) {
      try {
        await mkdir(partialDirPath);
        debug("Directory created: %s", partialDirPath);
      } catch (error: any) {
        if (error.code !== "EEXIST") {
          debug("Error creating directory: %s", partialDirPath);
          throw error;
        }
      }
    }
  }
}
