const getNetworks = (req, res, next) => {
  res.json({
    networks: [
      {
        id: "1",
        name: "LRTN",
        contractAddress: "one1qaxw5a62tca6p9uf36kjlcq6flk2s34uxrkrld",
        url: "https://api.s0.os.hmny.io",
        chainId: "",
        explorerUrl: "https://explorer.testnet.harmony.one/#/tx/",
      },
      {
        id: "2",
        name: "LRTN1",
        contractAddress: "one1qaxw5a62tca6p9uf36kjlcq6flk2s34uxrkrld",
        url: "https://api.s0.os.hmny.io",
        chainId: "",
        explorerUrl: "https://explorer.testnet.harmony.one/#/tx/",
      },
    ],
  });
};

export default getNetworks;
