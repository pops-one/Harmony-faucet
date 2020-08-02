require('dotenv').config()
const { TruffleProvider } = require('@harmony-js/core');

//GAS - Currently using same GAS accross all environments
gasLimit = process.env.GAS_LIMIT
gasPrice = process.env.GAS_PRICE

module.exports = {
  networks: {
    local: {
      network_id: '2', 
      provider: () => {
        const truffleProvider = new TruffleProvider(
          'http://localhost:9500',
          { menmonic: process.env.LOCAL_MNEMONIC },
          { shardID: 0, chainId: 2 },
          { gasLimit: gasLimit, gasPrice: gasPrice},
        );
        const newAcc = truffleProvider.addByPrivateKey(process.env.LOCAL_PRIVATE_KEY);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    },
    lrtn_testnet: {
      network_id: '2',
      provider: () => {
        const truffleProvider = new TruffleProvider(
          'https://api.s0.b.hmny.io/',
          { menmonic: process.env.TESTNET_MNEMONIC },
          { shardID: 0, chainId: 2 },
          { gasLimit: gasLimit, gasPrice: gasPrice},
        );
        const newAcc = truffleProvider.addByPrivateKey(process.env.TESTNET_PRIVATE_KEY);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    },
  },
};
