const config = require('./config');
const { ENV, url, net, port, privateKey, GAS_LIMIT, GAS_PRICE } = config;
const gasLimit = GAS_LIMIT;
const gasPrice = GAS_PRICE;

exports.oneToHexAddress = (hmy, address) =>
  hmy.crypto.getAddress(address).basicHex;
exports.hexToOneAddress = (hmy, address) => hmy.crypto.toBech32(address);
const getContractAddress = (artifact) =>
  artifact.networks[net]
    ? artifact.networks[net].address
    : config[artifact.contractName];
exports.getContractAddress = getContractAddress;

exports.getContractInstance = (hmy, artifact) => {
  console.log(hmy.crypto);
  const address = getContractAddress(artifact); //'0x61229F6C9B34099fE2C4094E03eE9274F5A2e7bb'; //getContractAddress(artifact)
  console.log('Contract Address:', address);
  const contract = hmy.contracts.createContract(artifact.abi, address);
  return contract;
};

// exports.getBalance = (contract, method, ...args) => new Promise((resolve, reject) => {
//     const tx = contract.methods[method]().send({
//         gasLimit,
//         gasPrice
//     }).on('transactionHash', (_hash) => {
//         hash = _hash
//         console.log('transactionHash', hash)
//     }).on('receipt', (_receipt) => {
//         receipt = _receipt
//         console.log('receipt\n\n', receipt)
//         console.log('\n\n')
//     }).on('confirmation', (confirmationNumber, receipt) => {
//         console.log('confirmed')
//         done()
//     }).on('error', (_error) => {
//         error = _error
//         console.log(error)
//         done()
//     })
// }

exports.txContractMethod = (contract, method, ...args) =>
  new Promise((resolve, reject) => {
    let hash, receipt, error; //assigned in listeners
    const done = () =>
      resolve({
        hash,
        receipt,
        error
      });
    console.log('method', method);
    console.log('getContractMethod args', ...args);
    const tx = contract.methods[method](...args)
      .send({
        gasLimit,
        gasPrice
      })
      .on('transactionHash', (_hash) => {
        hash = _hash;
        console.log('transactionHash', hash);
      })
      .on('receipt', (_receipt) => {
        receipt = _receipt;
        console.log('receipt\n\n', receipt);
        console.log('\n\n');
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmed');
        done();
      })
      .on('error', (_error) => {
        error = _error;
        console.log(error);
        done();
      });
  });
