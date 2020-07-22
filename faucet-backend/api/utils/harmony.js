import HarmonyCore from "@harmony-js/core";
import HarmonyUtils from "@harmony-js/utils";
import config from "../../config/config.js";

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

async function setWallet(hmy, privateKey) {
  const admin = hmy.wallet.addByPrivateKey(privateKey);
  hmy.wallet.setSigner(admin.address);
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

  setWallet(hmy, privateKey);

  return hmy;
};

export default initHarmony;
