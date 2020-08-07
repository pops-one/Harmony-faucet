import request from 'request';
import crypto from '@harmony-js/crypto';

import { initHarmony } from '../utils/harmony.js';
import { config, artifact } from '../../config/config.js';
import { captchaUrl, captchaSecret } from '../../constants.js';
import getContractInstance from '../utils/contract.js';

const { gasLimit, gasPrice } = config;

const getTime = (seconds) => {
  if (seconds < 3600) {
    const min = Math.ceil(seconds / 60);
    return `${min} minute${min > 1 ? 's' : ''}`;
  }
  const hours = Math.ceil(seconds / 3600);
  return `${hours} hour${hours > 1 ? 's' : ''}`;
};

const validateTransaction = async (address, hmy, contract) => {
  let requestedBlockNumber = await contract.methods
    .requestedAddressMapping(crypto.fromBech32(address))
    .call({
      gasLimit: gasLimit,
      gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
      to: contract.options.address,
    });

  let blockHeight = await contract.methods.blockHeight().call({
    gasLimit: gasLimit,
    gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
    to: contract.options.address,
  });
  let currentBlockNumber = await hmy.blockchain.getBlockNumber();
  console.log(Number(blockHeight), Number(requestedBlockNumber), Number(currentBlockNumber.result));
  let block_height = Number(blockHeight);
  let requested_block_number = Number(requestedBlockNumber);
  let current_block_number = Number(currentBlockNumber.result);

  if ((block_height + requested_block_number) > current_block_number) {
    let time = getTime(
      (block_height + requested_block_number - current_block_number) * 5
    );
    throw new Error(
      `Please try again after ${time}. You have been funded recently.`
    );
  }
};

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
          await validateTransaction(address, hmy, contract);
          let txinfo = await contract.methods
            .transferAmount(crypto.fromBech32(address))
            .send({
              gasLimit: gasLimit,
              gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
              to: contract.options.address,
            });
          if (txinfo.transaction.receipt.status !== '0x1') {
            throw new Error('Transfer token failed. Please try again later.');
          }
          res.json({ hash: txinfo.transaction.id });
        } else {
          throw new Error('Captcha verification failed.');
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  );
};

export default transferBalance;
