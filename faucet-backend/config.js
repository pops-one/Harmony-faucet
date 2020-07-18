require('dotenv').config();

let network, net, url, privateKey, mnemonic;

switch (process.env.ENV) {
  case 'local': {
    network = 0;
    net = 2;
    url = process.env.LOCAL_0_URL;
    privateKey = process.env.LOCAL_PRIVATE_KEY;
    mnemonic = process.env.LOCAL_MNEMONIC;
    break;
  }
  case 'testnet': {
    network = 1;
    net = 2;
    url = process.env.TESTNET_0_URL;
    privateKey = process.env.TESTNET_PRIVATE_KEY;
    mnemonic = process.env.TESTNET_MNEMONIC;
    break;
  }
  case 'openstaking': {
    network = 3;
    net = 3;
    url = process.env.OPENSTAKING_0_URL;
    privateKey = process.env.TESTNET_PRIVATE_KEY;
    mnemonic = process.env.TESTNET_MNEMONIC;
    break;
  }
  case 'mainnet': {
    network = 2;
    net = 1;
    url = process.env.MAINNET_0_URL;
    privateKey = process.env.MAINNET_PRIVATE_KEY;
    break;
  }
}

module.exports = {
  port: 3000,
  privateKey,
  mnemonic,
  ENV: process.env.ENV,
  network, // 0 local, 1 testnet, 2 mainnet
  net, //TODO: change name
  url,
  GAS_LIMIT: process.env.GAS_LIMIT,
  GAS_PRICE: process.env.GAS_PRICE
};
