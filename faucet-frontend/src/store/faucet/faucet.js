import { observable, action, flow, decorate } from "mobx";

const host = process.env.REACT_APP_HOST_API;
class Faucet {
  isFetching = false;

  name = "";

  contractAddress = "";

  url = "";

  balance = 0;

  getBalance = flow(function* () {
    try {
      const result = yield fetch(`${host}/balance`).then((response) =>
        response.json()
      );
      if (result.balance) {
        this.balance = Number(result.balance).toFixed(5);
      }
    } catch (error) {
      console.warn(error);
    }
  });

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
  balance: observable,
  contractAddress: observable,
  getBalance: action,
});

export default Faucet;
