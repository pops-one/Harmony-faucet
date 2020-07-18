import { observable, action, flow, decorate } from "mobx";
import Faucet from "./faucet";

const host = process.env.REACT_APP_HOST_API;
class FaucetStore {
  isFetching = false;

  isFetched = false;

  faucets = [];

  currentFaucet = {};

  fetch = flow(function* () {
    try {
      this.isFetching = true;
      const result = yield fetch(`${host}/networks`).then((res) => res.json());
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
