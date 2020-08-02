import { initHarmony } from "../utils/harmony.js";
import { config, artifact } from "../../config/config.js";
import getContractInstance from "../utils/contract.js";

const { gasLimit, gasPrice } = config;

const amountPerRequest = async (req, res, next) => {
  const { networkId } = req.query;
  console.log(networkId);
  try {
    const hmy = await initHarmony(networkId);
    const contract = getContractInstance(hmy, networkId, artifact);
    let sendAmount = await contract.methods.sendAmount().call({
      gasLimit: gasLimit,
      gasPrice: new hmy.utils.Unit(gasPrice).asGwei().toWei(),
      to: contract.options.address,
    });
    res.json({ sendAmount: Number(sendAmount) / 1e18 });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default amountPerRequest;
