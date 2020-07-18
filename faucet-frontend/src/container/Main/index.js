import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { observer } from "mobx-react";
import "react-toastify/dist/ReactToastify.css";
import RadioButton from "../../component/Radio";
import Balance from "../../component/Balance";
import TransactionResult from "../../component/TransactionResult";
import { StoreContext } from "../../index";

// import RecentClaims from "../RecentClaims";

toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
});

const host = process.env.REACT_APP_HOST_API;

const Main = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [shard, setShard] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const {
    faucetStore: { currentFaucet },
  } = useContext(StoreContext);

  const onShardChange = ({ target }) => setShard(target.value);

  const sendToAddress = async (event) => {
    event.preventDefault();
    if (isFetching) {
      return;
    }

    if (!address) {
      setError("Address can't be Empty");
      toast.error("Address can't be Empty");
      return;
    }
    setError(null);
    setTransactionHash("");
    setIsFetching(true);
    const result = await fetch(host, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, shard }),
    }).then((response) => response.json());
    console.log(result);
    setIsFetching(false);
    if (result.error) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    setTransactionHash(result.hash);
    toast.success(`Successfully transferred HMC to ${address}.`);
  };

  return (
    <div className="hm-main">
      {/* <RecentClaims /> */}
      <h1 className="header-text">
        HARMONY ONE FAUCET FOR {currentFaucet.name}
      </h1>
      <h3 className="sub-header-text">5000 ONE token is sent at a time</h3>
      <h3 className="sub-header-text">
        Contract address: {currentFaucet.contractAddress}
      </h3>
      <form onSubmit={sendToAddress} className="hm-form">
        <RadioButton
          name="shard"
          checked={shard}
          onChange={onShardChange}
          radios={[
            { id: "shard0", value: "0", label: "Shard 0" },
            { id: "shard1", value: "1", label: "Shard 1", disabled: true },
            { id: "shard2", value: "2", label: "Shard 2", disabled: true },
            { id: "shard3", value: "3", label: "Shard 3", disabled: true },
          ]}
        />
        <div className={`input-wrapper  ${!!error && "error"}`}>
          <input
            type="text"
            placeholder="ONE address"
            className="address-input"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <input
            type="submit"
            className={`send-me ${isFetching && "disabled"}`}
            value="Send Me"
            disabled={isFetching}
          />
        </div>
      </form>
      <Balance />
      <TransactionResult transactionHash={transactionHash} />
    </div>
  );
};

export default observer(Main);
