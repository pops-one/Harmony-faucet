import { initHarmony } from "../utils/harmony.js";
import config from "../config/config.js";

const { net, privateKey, mnemonic, GAS_LIMIT } = config;

const transferBalance = async (req, res, next) => {
  const { address, shard, token, contractAddress, chainId, url } = req.body;
  try {
    const hmy = await initHarmony(url, chainId, contractAddress);
    const txn = hmy.transactions.newTx({
      to: address,
      value: new Unit(1).asOne().toWei(),
      // gas limit, you can use string
      gasLimit: GAS_LIMIT,
      // send token from shardID
      shardID: shard,
      // send token to toShardID
      toShardID: shard,
      // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
      gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
    });

    // sign the transaction use wallet;
    const signedTxn = await hmy.wallet.signTransaction(txn);
    const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
    console.log(txnHash.result);
  } catch (error) {
    next(error);
  }
};

export default transferBalance;
