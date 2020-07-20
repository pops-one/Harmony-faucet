import config from "../../config/config.js";

const getNetworks = (req, res, next) => {
  if (config.networks) {
    res.json({
      networks: config.networks.map(
        ({ id, name, contractAddress, url, chainId, explorerUrl }) => ({
          id,
          name,
          explorerUrl,
          contractAddress,
        })
      ),
    });
  } else {
    next(new Error("Networks not found."));
  }
};

export default getNetworks;
