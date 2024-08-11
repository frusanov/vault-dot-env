import { env } from "./env.js";

export const config = {
  vaultAddress: await env("VAULT_ADDRESS", "http://vault:8200"),
  vaultToken: (await env("VAULT_TOKEN")) as string,
  dotEnvPath: await env("DOT_ENV_PATH"),
  dotEnvFilename: await env("DOT_ENV_FILENAME", ".env"),
};
