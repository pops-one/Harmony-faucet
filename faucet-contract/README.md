# Faucet Contract 

### Harmony Blockchain Network Commands
#### Creating new wallet

` ./wallet new`
```
(base) ultimate@ultimate-Blade-15-Mid-2019-Base:~/Desktop/Projects/iBriz/HarmonyOne/HarmonyNode$ ./wallet new
Passphrase: 
Passphrase again: 
account: one1u43tspcel8snrjr2zhdsscwce9wzx0r35anc4m
URL: keystore:///home/ultimate/Desktop/Projects/iBriz/HarmonyOne/HarmonyNode/.hmy/keystore/UTC--2019-11-03T02-08-33.646955468Z--e562b80719f9e131c86a15db0861d8c95c233c71

```
#### Creating bls key

`  ./wallet blsgen`
```
(base) ultimate@ultimate-Blade-15-Mid-2019-Base:~/Desktop/Projects/iBriz/HarmonyOne/HarmonyNode$ ./wallet blsgen
Passphrase: 
Passphrase again: 
Bls private key: 03a6bd5a05b1643bb6f5344cc93a4eeb89733a3a5ee095a98b02fc7564355946
Bls public key: d73f9c3ed9a954c9b8cd35d76d764295464f29671e3f45bc3742f2083e5a6b476b9648d51bfcddf038b0708ab45f6f0b
File storing the ENCRYPTED private key with your passphrase: d73f9c3ed9a954c9b8cd35d76d764295464f29671e3f45bc3742f2083e5a6b476b9648d51bfcddf038b0708ab45f6f0b.key

```

#### Running harmony node in localnet config
 
 `./test/deploy.sh  ./test/configs/local-resharding.txt --network_type=localnet`
 
 
 
####  Running bootnode
`./bootnode`
```
(base) ultimate@ultimate-Blade-15-Mid-2019-Base:~/Desktop/Projects/iBriz/HarmonyOne/HarmonyNode$ ./bootnode 
bootnode BN_MA=/ip4/127.0.0.1/tcp/9876/p2p/QmZWnNbAM61F69mZjZBudpoFGdBFnwMKdSdHk8NAH8bLyG
```
> Note: This is not required if `test/deploy.sh`  script is used.


#### Run harmony localnet node
```
./test/deploy.sh -D 60 ./test/configs/local-resharding.txt --network_type=localnet^C
(base) ultimate@ultimate-Blade-15-Mid-2019-Base:~/Desktop/Projects/iBriz/HarmonyOne/harmony-2$ ^C
```

#### Running harmony-tui for local environment
`./bin/harmony-tui-unix --hmyUrl http://127.0.0.1:9500 --env local --address one1spshr72utf6rwxseaz339j09ed8p6f8ke370zj`
 > *Note:*  `one1spshr72utf6rwxseaz339j09ed8p6f8ke370zj` is bech32 address for `localnet`
 
 
 #### Export private key for the bech32 key
 
 `./wallet exportPriKey --account  one1658znfwf40epvy7e46cqrmzyy54h4n0qa73nep`
 
 ```
 $ ./wallet exportPriKey --account  one1658znfwf40epvy7e46cqrmzyy54h4n0qa73nep
account: one1658znfwf40epvy7e46cqrmzyy54h4n0qa73nep
URL: keystore:///home/ultimate/Desktop/Projects/iBriz/HarmonyOne/harmony-2/.hmy/keystore/one1658znfwf40epvy7e46cqrmzyy54h4n0qa73nep.key
Original Passphrase: 
Private key: c2cb74432ed84677ccff7c3cd7af46dc3c2c56ca6d50e62da6bb969f3fd98eaa 
 ```
 
 #### Find the mnemonic words for the network
 
 `./hmy.exe keys  mnemonic -n http://localhost:9500 -v`
 
 ```
 $ ./hmy.exe keys  mnemonic -n http://localhost:9500 -v
inspire barrel industry dust latin often mammal protect promote mirror ticket sport potato supreme reopen behind upper drive border kangaroo shop matrix depart manual
 ```
 
 #### Format bech32 address to base16 
 
 ` ./wallet format --address  one1spshr72utf6rwxseaz339j09ed8p6f8ke370zj`
 
 ```
 $ ./wallet format --address  one1spshr72utf6rwxseaz339j09ed8p6f8ke370zj
account address in Bech32: one1spshr72utf6rwxseaz339j09ed8p6f8ke370zj
account address in Base16 (deprecated): 0x806171f95C5a74371a19e8a312c9e5Cb4E1D24f6
 ```
 
 #### Deploy contract to localnet - develoment
 
 `truffle migrate --network development --reset`
 
 
