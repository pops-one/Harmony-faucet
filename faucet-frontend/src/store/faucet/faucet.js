import { observable, action, flow, decorate } from "mobx";

const host = process.env.REACT_APP_HOST_API;
class Faucet {
  isFetching = false;

  name = "";

  contractAddress = "";

  url = "";

  balance = "";

  getBalance = flow(function* () {});

  constructor({ name, contractAddress, url }) {
    this.name = name;
    this.contractAddress = contractAddress;
    this.url = url;
  }
}

decorate(Faucet, {
  isFetching: observable,
  name: observable,
  url: observable,
  contractAddress: observable,
  getBalance: action,
});

export default Faucet;
