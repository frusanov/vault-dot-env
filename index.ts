import get from "lodash/get";
import { getVariablesDescriptors } from "./lib/get-variables-descriptors";
import { getVault } from "./lib/get-vault";
import { getVariables } from "./lib/get-variables";
import { writeDotEnv } from "./lib/write-dot-env";
import { config } from "./lib/config";
import { runHealthServer } from "./lib/run-health-server";

const vault = await getVault(config.vaultAddress, config.vaultToken);

const descriptors = getVariablesDescriptors();

const variables = await getVariables(vault, descriptors);

await writeDotEnv(variables, config.dotEnvPath, config.dotEnvFilename);

const server = await runHealthServer(80);

process.once("SIGINT", async () => {
  server.close();
});

process.once("SIGTERM", async () => {
  server.close();
});
