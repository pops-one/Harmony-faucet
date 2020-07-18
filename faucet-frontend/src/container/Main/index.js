import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { observer } from "mobx-react";
import "react-toastify/dist/ReactToastify.css";
import RadioButton from "../../component/Radio";
import Balance from "../../component/Balance";
import FaucetInfo from "../../component/FaucetInfo";
import TransactionResult from "../../component/TransactionResult";
import { StoreContext } from "../../index";

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

  useEffect(() => {
    if (currentFaucet.getBalance) {
      currentFaucet.getBalance();
    }
  }, [currentFaucet]);

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
      <FaucetInfo
        name={currentFaucet.name}
        contractAddress={currentFaucet.contractAddress}
      />
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
      <Balance balance={currentFaucet.balance} />
      <TransactionResult transactionHash={transactionHash} />
    </div>
  );
};

export default observer(Main);
