import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createDirIfNotExists } from "./create-dir-if-not-exists.js";

export async function writeDotEnv(
  variables: Record<string, string>,
  dir?: string,
  fileName: string = ".env",
) {
  const lines = Object.entries(variables).map(
    ([key, value]) => `${key}=${value}`,
  );
  const content = lines.join("\n");

  const dirSafe = dir || process.cwd();

  await createDirIfNotExists(dirSafe);

  await writeFile(join(dirSafe, fileName), content);
}
