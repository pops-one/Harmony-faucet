import { observable, action, flow, decorate } from "mobx";
import Faucet from "./faucet";
import { get, post } from "../../apis";

class FaucetStore {
  isFetching = false;

  isFetched = false;

  faucets = [];

  currentFaucet = {};

  setCurrentFaucet(faucetId) {
    const newFaucet = this.faucets.find((f) => f.id === faucetId);
    if (!newFaucet) {
      return;
    }
    this.currentFaucet = newFaucet;
  }

  fetch = flow(function* () {
    try {
      this.isFetching = true;
      const result = yield get("/networks");
      if (result.networks) {
        result.networks.forEach((network) => {
          this.faucets.push(new Faucet(network));
        });
        this.currentFaucet = this.faucets[0];
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.isFetching = false;
    }
  });
}

decorate(FaucetStore, {
  isFetching: observable,
  isFetched: observable,
  faucets: observable,
  currentFaucet: observable,
  setCurrentFaucet: action,
  fetch: action,
});

export default new FaucetStore();
