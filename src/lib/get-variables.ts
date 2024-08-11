import get from "lodash/get.js";
import type { client } from "node-vault";
import type { VariableDescriptor } from "./get-variables-descriptors.js";

export async function getVariables(
  vault: client,
  descriptors: VariableDescriptor[],
): Promise<Record<string, string>> {
  const variables: Record<string, string> = {};

  for (const descriptor of descriptors) {
    const {
      data: { data },
    } = await vault.read(descriptor.vaultPath);

    const path = descriptor.objectPath;

    const value = path.length ? get(data, path) : data;

    console.log(descriptor.envVarName, value);

    variables[descriptor.envVarName] =
      typeof value === "string" ? value : JSON.stringify(value);
  }

  return variables;
}
