import { observable, action, flow, decorate } from "mobx";
import { toast } from "react-toastify";
import { get, post } from "../../apis";
class Faucet {
  isFetching = false;
  id = "";
  name = "";
  contractAddress = "";
  url = "";
  balance = 0;
  chainId = "",
  explorerUrl = "",
  transactionHash = "";
  error = null;

  constructor({ id, name, contractAddress, url, chainId, explorerUrl }) {
    this.id = id;
    this.name = name;
    this.contractAddress = contractAddress;
    this.url = url;
    this.chainId = chainId;
    this.explorerUrl = explorerUrl;
  }

  getBalance = flow(function* () {
    try {
      const result = yield get("/balance");
      if (result.balance) {
        this.balance = Number(result.balance).toFixed(5);
      }
    } catch (error) {
      console.warn(error);
    }
  });

  sendToAddress = flow(function* (address, shard, token) {
    console.log(token);
    try {
      this.error = null;
      this.transactionHash = "";
      this.isFetching = true;
      const result = yield post("/", {
        address,
        shard,
        token,
        contractAddress: this.contractAddress,
        chainId: this.chainId,
        url: this.url
      });
      toast.success(`Successfully transferred HMC to ${address}.`);
      this.transactionHash = result.hash;
    } catch (error) {
      this.error = error;
      toast.error(error);
      console.warn(error);
    } finally {
      this.isFetching = false;
    }
  });
}

decorate(Faucet, {
  isFetching: observable,
  id: observable,
  name: observable,
  error: observable,
  url: observable,
  balance: observable,
  transactionHash: observable,
  contractAddress: observable,
  explorerUrl: observable,
  chainId: observable,
  getBalance: action,
});

export default Faucet;
