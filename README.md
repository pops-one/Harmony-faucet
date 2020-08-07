# Harmony Faucet

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

`Node Version:v12.13.1+`

Harmony Faucet using solidity contract. Claim testnet faucet tokens using harmony faucet.
https://onefaucet.ibriz.ai

## Setup

### Contract

* Add `.env` file corresponding to `.env.sample` in `faucet-contract` folder

* Add the network in which the contract is to be deployed

#### Sample Network config

```javascript
mainnet: {
      network_id: '1',
      provider: () => {
        const truffleProvider = new TruffleProvider(
          'https://api.s0.t.hmny.io/',
          { menmonic: process.env.MAINNET_MNEMONIC },
          { shardID: 0, chainId: 1 },
          { gasLimit: gasLimit, gasPrice: gasPrice},
        );
        const newAcc = truffleProvider.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    }
```

Enter the required environment variables in the `.env` file. For the above config it would be `MAINNET_MNEMONIC` and `MAINNET_PRIVATE_KEY`.

#### To deploy contract

``` bash
$ npx oz deploy        
Nothing to compile, all contracts are up to date.
? Choose the kind of deployment regular
? Pick a network lrtn_testnet
? Pick a contract to deploy HarmonyFaucet
✓ Deployed instance of HarmonyFaucet
0x4B203bB02fDBd702610b4d2564beAd3af82bd7d2
```

* Convert the obtained address to bech32 format.
* Transfer amount to the address.

## Backend

* Add `.env` file corresponding to `.env.sample` in the faucet-backend folder
* Add `config.json` file corresponding to the `config-sample.json` in `faucet-backend/config` folder.
* Use the above obtained address of faucet contract in the `config.json` file.
* Run `npm run copy` from the root folder. This will copy the `HarmonyFaucet.json` from `faucet-contract/build/contracts` folder to `faucet-backend/config`

## Frontend

* Add `.env` file corresponding to `.env.sample` in root of faucet-frontend

## Run the faucet application

**Be in the root of the repo:**

1. Install Node Modules:

```bash
npm install // installs all dependencies for project
```

2. Setup contract configurations and deploy the contract

3. Setup backend and copy the HarmonyFaucet.json artifact of contract

```bash
npm run copy
```

4. Setup frontend

5. Starting development server

```bash
npm start // starts frontend server at port:3000 and backend server to provided port - default 5000
```
