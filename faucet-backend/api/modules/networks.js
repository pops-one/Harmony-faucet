import config from "../../config/config.js";

const getNetworks = (req, res, next) => {
  if (config.networks) {
    res.json({
      networks: config.networks.map(
        ({ id, name, contractAddress, url, explorerUrl }) => ({
          id,
          url,
          name,
          explorerUrl,
          contractAddress,
        })
      ),
    });
  } else {
    res.status(404).json({
      message: "Network not found",
    });
  }
};

export default getNetworks;
