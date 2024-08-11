import Debug from "debug";

const debug = Debug("vault-dot-env:get-variables-descriptors");

export interface VariableDescriptor {
  fullPath: string;
  vaultPath: string;
  objectPath: string[];
  envVarName: string;
}

// TODO: Add validation for the descriptor
export function getVariablesDescriptors(): VariableDescriptor[] {
  const keys = Object.keys(process.env).filter((key) =>
    /^VARIABLE_(\d{1,3})/i.test(key),
  );

  debug("Detected enviroment variables: %O", keys);

  const descriptorsRaw = keys.map((key) => {
    return process.env[key];
  });

  debug("Raw descriptors: %O", descriptorsRaw);

  const descriptors = [];

  for (const descriptorRaw of descriptorsRaw) {
    if (!descriptorRaw) continue;

    const [fullPath, envVarNameRaw] = descriptorRaw.split(":");

    const [vaultPath, ...objectPath] = fullPath.split(".");

    const secret = vaultPath.split("/").pop();
    const safeEnvVarName = [secret, ...objectPath].join("_").toUpperCase();

    descriptors.push({
      fullPath,
      vaultPath,
      objectPath,
      envVarName: envVarNameRaw || safeEnvVarName,
    });
  }

  debug("Parsed descriptors: %O", descriptors);

  return descriptors;
}
