import { observable, action, flow, decorate } from "mobx";

class FaucetStore {
  isFetching = false;

  isFetched = false;

  faucets = [];

  currentFaucet = null;

  fetch = () => {
    console.log("called");
  };
}

decorate(FaucetStore, {
  isFetching: observable,
  isFetched: observable,
  faucets: observable,
  fetch: action,
});

export default new FaucetStore();
