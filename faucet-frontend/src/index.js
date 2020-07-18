import React from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import { toast } from "react-toastify";

import "./index.css";
import App from "./container/App";
import store from "./store";

import * as serviceWorker from "./serviceWorker";

configure({ enforceActions: "observed" });

toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
});

export const StoreContext = React.createContext(store);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
