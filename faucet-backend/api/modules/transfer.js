import request from "request";
import crypto from "@harmony-js/crypto";

import { initHarmony } from "../utils/harmony.js";
import { config, artifact } from "../../config/config.js";
import { captchaUrl, captchaSecret } from "../../constants.js";
import getContractInstance from "../utils/contract.js";

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
        if (body.success && body.score > 0.5) {
          // transaction stuffs here
          const hmy = await initHarmony(networkId);
          const contract = getContractInstance(hmy, networkId, artifact);
          let txinfo = await contract.methods
            .transferAmount(crypto.fromBech32(address))
            .send({
              gasLimit: gasLimit,
              gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
              to: contract.options.address,
            });
          if (txinfo.transaction.receipt.status !== "0x1") {
            throw new Error("Transfer token failed");
          }
          res.json({ hash: txinfo.transaction.id });
        } else {
          throw new Error("Captcha verification failed.");
        }
      } catch (error) {
        next(error);
      }
    }
  );
};

export default transferBalance;
