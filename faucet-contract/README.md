### Faucet Contract

Harony faucet contract. We can set the amount to be sent per request and block height to configure the time to allow next request.

#### Change the amount per request

Inside the `faucet-contract` folder:

```bash
npx oz send-tx
? Pick a network lrtn_testnet
? Pick an instance HarmonyFaucet at 0x4B203bB02fDBd702610b4d2564beAd3af82bd7d2
? Select which function setRate(_sendAmount: uint256)
? _sendAmount: uint256: 1e23
✓ Transaction successful. Transaction hash: 0x1027c0b30c5c584532143c7948051acd741688fe2c00c670d03da4deeb9b5b3a
```

#### Change the time to allow per request

We can set the time to allow for each request in terms of block height. If you want to set the time of 24 hours then with the 5 sec block time it would require 17280 (86400/5) blocks. Similarly set the block number as per requirement.

```bash
$ npx oz send-tx
? Pick a network lrtn_testnet
? Pick an instance HarmonyFaucet at 0x4B203bB02fDBd702610b4d2564beAd3af82bd7d2
? Select which function setBlockHeight(_blockHeight: uint256)
? _blockHeight: uint256: 18000
✓ Transaction successful. Transaction hash: 0x9eaad5521ccbb39144b9a76842fc77ec3ad0a6531467bcfce58319aaee000c34
```
