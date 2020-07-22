import config from "../../config/config.js";
import crypto from "@harmony-js/crypto";

const getContractInstance = (hmy, networkId, artifact) => {
  const currentNetwork = config.networks.find((n) => n.id === networkId);
  if (!currentNetwork) {
    throw new Error("Network not found");
  }
  const contract = hmy.contracts.createContract(
    artifact.abi,
    crypto.fromBech32(currentNetwork.contractAddress)
  );
  return contract;
};

export default getContractInstance;
