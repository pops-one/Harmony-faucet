import { observable, action, flow, decorate } from "mobx";
import { toast } from "react-toastify";
const host = process.env.REACT_APP_HOST_API;
class Faucet {
  isFetching = false;

  name = "";

  contractAddress = "";

  url = "";

  balance = 0;

  error = null;

  transactionHash = "";

  constructor({ name, contractAddress, url }) {
    this.name = name;
    this.contractAddress = contractAddress;
    this.url = url;
  }

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

  sendToAddress = flow(function* (address, shard) {
    try {
      this.error = null;
      this.transactionHash = "";
      this.isFetching = true;
      const result = yield fetch(host, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, shard }),
      }).then((response) => response.json());
      if (result.error) {
        toast.error(result.error);
        this.error = result.error;
      } else {
        toast.success(`Successfully transferred HMC to ${address}.`);
        this.transactionHash = result.hash;
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.isFetching = false;
    }
  });
}

decorate(Faucet, {
  isFetching: observable,
  name: observable,
  error: observable,
  url: observable,
  balance: observable,
  transactionHash: observable,
  contractAddress: observable,
  getBalance: action,
});

export default Faucet;
