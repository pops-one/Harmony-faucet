import { initHarmony } from "../utils/harmony.js";

const getBalance = async (req, res, next) => {
  const { networkId, address } = req.query;
  try {
    const hmy = await initHarmony(networkId);
    const balanceResp = await hmy.blockchain.getBalance({ address: address });
    if (balanceResp.result) {
      res.send({
        balance: new hmy.utils.Unit(balanceResp.result).asWei().toEther(),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default getBalance;
