import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import Header from "../component/Header";
import Main from "./Main";
import { StoreContext } from "../index";
import "./App.scss";

const App = () => {
  const { faucetStore } = useContext(StoreContext);
  useEffect(() => {
    faucetStore.fetch();
  }, []);

  return (
    <div className="hm-wrapper">
      <Header />
      <Main />
    </div>
  );
};

export default observer(App);
