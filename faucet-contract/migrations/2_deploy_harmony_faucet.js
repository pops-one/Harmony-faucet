var harmony_faucet = artifacts.require("./HarmonyFaucet.sol");

module.exports = function(deployer) {

    const ONE = 10000000000000000 //Deploy with a balance of 0.01 ONE

    deployer.then(function () {
        return deployer.deploy(harmony_faucet, {
            value: ONE,
        }).then(function (faucet) {
            console.log("Faucet deployed.");
        });
    });
};