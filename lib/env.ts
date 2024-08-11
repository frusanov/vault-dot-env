import { readFile } from "node:fs/promises";

type AllowedVars =
  | "VAULT_ADDRESS"
  | "VAULT_TOKEN"
  | "DOT_ENV_PATH"
  | "DOT_ENV_FILENAME";

export async function env<T extends string | undefined>(
  variable: AllowedVars,
  defaultValue?: T,
) {
  if (process.env[variable]) {
    return process.env[variable] as string;
  }

  if (process.env[`${variable}_FILE`]) {
    try {
      return await readFile(process.env[`${variable}_FILE`] as string, "utf-8");
    } catch (error: any) {
      console.error(`Error reading file: ${process.env[`${variable}_FILE`]}`);
      console.error(error);
    }
  }

  return defaultValue as T;
}
