import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { observer } from "mobx-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import "react-toastify/dist/ReactToastify.css";
import RadioButton from "../../component/Radio";
import Balance from "../../component/Balance";
import FaucetInfo from "../../component/FaucetInfo";
import TransactionResult from "../../component/TransactionResult";
import { StoreContext } from "../../index";
import Dropdown from "../../component/Dropdown";

const Main = () => {
  const [address, setAddress] = useState("");
  const [shard, setShard] = useState("0");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { faucetStore } = useContext(StoreContext);
  const { currentFaucet, faucets } = faucetStore;
  useEffect(() => {
    if (currentFaucet.getBalance) {
      currentFaucet.getBalance();
    }
  }, [currentFaucet]);

  const onFaucetChange = ({ target }) => {
    faucetStore.setCurrentFaucet(target.value);
  };

  const onShardChange = ({ target }) => setShard(target.value);

  const sendToAddress = async (event) => {
    event.preventDefault();
    if (currentFaucet.isFetching) {
      return;
    }

    if (!address) {
      toast.error("Address can't be Empty");
      return;
    }
    const token = await executeRecaptcha("submit_address");

    currentFaucet.sendToAddress(address, shard, token);
  };

  return (
    <div className="hm-main">
      <Dropdown
        list={faucets.map((f) => ({ label: f.name, value: f.id }))}
        selected={currentFaucet.id}
        onChange={onFaucetChange}
      />
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
        <div className={`input-wrapper  ${!!currentFaucet.error && "error"}`}>
          <input
            type="text"
            placeholder="ONE address"
            className="address-input"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <input
            type="submit"
            className={`send-me ${currentFaucet.isFetching && "disabled"}`}
            value="Send Me"
            disabled={currentFaucet.isFetching}
          />
        </div>
      </form>
      <Balance balance={currentFaucet.balance} />
      <TransactionResult transactionHash={currentFaucet.transactionHash} />
    </div>
  );
};

export default observer(Main);
