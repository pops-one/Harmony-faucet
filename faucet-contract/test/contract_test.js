var Faucet = artifacts.require("./contracts/HarmonyFaucet.sol");

// const gasLimit = process.env.GAS_LIMIT
// const gasPrice = process.env.GAS_PRICE

contract("HarmonyFaucet", (accounts) => {
    const getContractAddress = (artifact) =>
    artifact.networks[net] ? artifact.networks[net].address : config[artifact.contractName]
exports.getContractAddress = getContractAddress

	const ONE = '1000000000000000000'
	const after = '900000000000000000'
    let faucet
	const alice = accounts[0], bob = accounts[1]
	it("should be deployed", async () => {
        faucet = await Faucet.deployed();
        
        console.log(getContractAddress)
        assert.ok(faucet)
    })

    it("checking for the balance", async() => {
        const balance = (await faucet.getBalance.call()).toString()
        console.log("Balance: " + balance)
    })
    it("contract should be funded with one ONE", async () => {
        const balance = (await faucet.getBalance.call()).toString()
        console.log(balance)
        assert.equal(balance, ONE)
    })
    it("should allow alice to fund bob", async () => {
        const tx = await faucet.fund(bob)
        assert.ok(tx)
        const balance = (await faucet.getBalance.call()).toString()
        console.log(balance)
        assert.equal(balance, after)
    })
})