import request from "request";
import { initHarmony } from "../utils/harmony.js";
import config from "../../config/config.js";
import { captchaUrl, captchaSecret } from "../../constants.js";

const { gasLimit, gasPrice } = config;

const transferBalance = async (req, res, next) => {
  const { address, shard, token, networkId } = req.body;
  // send request to verify captcha token
  request(
    `${captchaUrl}${captchaSecret}&response=${token}`,
    async (error, response, body) => {
      try {
        if (error) throw error;
        body = JSON.parse(body);
        if (body.success && body.score < 0.5) {
          // transaction stuffs here
          res.json({ success: true });
        } else {
          throw new Error("Captcha verification failed.");
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // const hmy = await initHarmony(networkId);
  // const txn = hmy.transactions.newTx({
  //   to: address,
  //   value: new Unit(1).asOne().toWei(),
  //   // gas limit, you can use string
  //   gasLimit: gasLimit,
  //   // send token from shardID
  //   shardID: shard,
  //   // send token to toShardID
  //   toShardID: shard,
  //   // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
  //   gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
  // });

  // // sign the transaction use wallet;
  // const signedTxn = await hmy.wallet.signTransaction(txn);
  // const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
};

export default transferBalance;
