import { getVariablesDescriptors } from "./lib/get-variables-descriptors.js";
import { getVault } from "./lib/get-vault.js";
import { getVariables } from "./lib/get-variables.js";
import { writeDotEnv } from "./lib/write-dot-env.js";
import { config } from "./lib/config.js";
import { runHealthServer } from "./lib/run-health-server.js";

const vault = await getVault(config.vaultAddress, config.vaultToken);

const descriptors = getVariablesDescriptors();

const variables = await getVariables(vault, descriptors);

await writeDotEnv(variables, config.dotEnvPath, config.dotEnvFilename);

const server = await runHealthServer(3000);

process.once("SIGINT", async () => {
  server.close();
});

process.once("SIGTERM", async () => {
  server.close();
});
