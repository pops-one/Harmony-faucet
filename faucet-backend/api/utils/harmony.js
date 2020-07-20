import HarmonyCore from "@harmony-js/core";
import HarmonyUtils from "@harmony-js/utils";
import config from "../config/config.js";
import { keystore } from "../config/keystore.js";

/********************************
Config
********************************/
const { net, privateKey, mnemonic } = config;

/********************************
Harmony Setup
********************************/
const createHmy = (url, chainId) =>
  new HarmonyCore.Harmony(url, {
    chainType: HarmonyUtils.ChainType.Harmony,
    chainId: chainId || net,
  });
async function setSharding(hmy) {
  const res = await hmy.blockchain.getShardingStructure();
  hmy.shardingStructures(res.result);
}

/********************************
Wallet Setup
********************************/
function setDefaultWallets(hmy) {
  const alice = hmy.wallet.addByPrivateKey(privateKey);
  hmy.wallet.setSigner(alice.address);
  const bob = hmy.wallet.addByMnemonic(mnemonic);
}

export const initHarmony = async (url, chainId, from) => {
  //prepare Harmony instance
  const hmy = createHmy(url, chainId);
  await setSharding(hmy);
  if (from) {
    const pkey = keystore(from);
    if (pkey) {
      hmy.wallet.addByPrivateKey(pkey);
      hmy.wallet.setSigner(hmy.crypto.getAddress(from).basicHex);
    } else {
      return { success: false, message: `account ${from} not in keystore` };
    }
  } else {
    setDefaultWallets(hmy);
  }
  return hmy;
};

export default initHarmony;
