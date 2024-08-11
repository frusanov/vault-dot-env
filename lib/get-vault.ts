import NodeVault from "node-vault";

export async function getVault(address: string, token: string) {
  const vault = NodeVault({
    apiVersion: "v1", // default
    endpoint: address, // default
    token: token, // Optional in case you want to initialize the vault
  });

  // await vault.unseal({
  //   secret_shares: 1,
  //   key: "F6BfZ2PPSs+Cv0TjY2f3W/pqHCmjzU+XPDUIKgsoVdk=",
  // });

  return vault;
}
