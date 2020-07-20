import HarmonyCore from "@harmony-js/core";
import HarmonyUtils from "@harmony-js/utils";
import config from "../config/config.js";
import { keystore } from "../config/keystore.js";

/********************************
Config
********************************/
const { networks, gasPrice, gasLimit } = config;

/********************************
Harmony Setup
********************************/
const createHmy = (url, chainId) =>
  new HarmonyCore.Harmony(url, {
    chainType: HarmonyUtils.ChainType.Harmony,
    chainId: chainId,
  });

async function setSharding(hmy) {
  const res = await hmy.blockchain.getShardingStructure();
  hmy.shardingStructures(res.result);
}

export const initHarmony = async (networkId) => {
  const currentNetwork = networks.find((n) => n.id === networkId);
  if (!currentNetwork) {
    throw new Error("Network not found");
  }

  const { url, chainId, privateKey, contractAddress } = currentNetwork;

  //prepare Harmony instance
  const hmy = createHmy(url, chainId);
  await setSharding(hmy);

  hmy.wallet.addByPrivateKey(privateKey);
  hmy.wallet.setSigner(hmy.crypto.getAddress(contractAddress).basicHex);

  return hmy;
};

export default initHarmony;
