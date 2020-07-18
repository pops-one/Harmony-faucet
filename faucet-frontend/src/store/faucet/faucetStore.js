import { observable, action, flow, decorate } from "mobx";
import Faucet from "./faucet";
import { get, post } from "../../apis";

class FaucetStore {
  isFetching = false;

  isFetched = false;

  faucets = [];

  currentFaucet = {};

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
  fetch: action,
});

export default new FaucetStore();
