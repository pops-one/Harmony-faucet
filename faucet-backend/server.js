const express = require("express");
const { Harmony } = require("@harmony-js/core");
const { initHarmony } = require("./harmony");
const {
  getContractInstance,
  getContractAddress,
  txContractMethod,
  callContractMethod,
  oneToHexAddress,
  hexToOneAddress,
} = require("./contract");

const bodyParser = require("body-parser");
const FaucetJSON = require("./HarmonyFaucet.json");
const config = require("./config");

// const FaucetJSON = require('./FaucetHRC.json');
const app = express();

gasLimit = process.env.GAS_LIMIT;
gasPrice = process.env.GAS_PRICE;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

const url = config.url;
// const url = 'http://localhost:9500';

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Pass to next layer of middleware
  next();
});

app.get("/networks", async (req, res, next) => {
  res.send({
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
});

app.get("/balance", async (req, res, next) => {
  let err = false;
  let balances = [];

  try {
    const initRes = await initHarmony(req.body.url);
    const { success, hmy } = initRes;
    if (!success) {
      res.send({ success: false, initRes });
      return;
    }

    const result = (
      await hmy.blockchain
        .getBalance({ address: req.body.address })
        .catch((error) => {
          res.send({ success: false, error });
          err = true;
        })
    ).result;
    if (err) return;
    if (result) {
      // balances.push({
      //   shard: 0,
      //   balance: new hmy.utils.Unit(result).asWei().toEther()
      // });
      res.send({
        success: true,
        balance: new hmy.utils.Unit(result).asWei().toEther(),
      });
    }
    // if (!err) res.send({ success: true, balances: balances });
  } catch (error) {
    console.log(error);
    res.send({
      error: error.message,
    });
  }
});

app.post("/", async (req, res, next) => {
  try {
    const initRes = await initHarmony(url);
    const { success, hmy } = initRes;
    if (!success) {
      res.send(initRes);
      return;
    }
    /********************************
     @todo check make sure address works and amount is valid
     ********************************/

    //prepare args for contract call
    var address = oneToHexAddress(hmy, req.body.address);
    console.log(address);
    console.log("hex address:", address);
    const faucet = getContractInstance(hmy, FaucetJSON);
    //call method
    const { hash, receipt, error } = await txContractMethod(
      faucet,
      "transferAmount",
      address
    );
    console.log(receipt);
    if (receipt.status === "0x0") {
      res.send({
        error: "Error in sending from faucet. Please try again later",
      });
      return;
    }
    res.send({
      receipt,
      hash,
      error,
    });
  } catch (error) {
    console.log(error);
    res.send({
      error: error.message,
    });
  }
  // await balance(req, res)
});

app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
