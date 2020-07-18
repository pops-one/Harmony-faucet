import React from "react";

const FaucetInfo = ({ name, contractAddress }) => {
  return (
    <div>
      <h1 className="header-text">HARMONY ONE FAUCET FOR {name}</h1>
      <h3 className="sub-header-text">5000 ONE token is sent at a time</h3>
      <h3 className="sub-header-text">Contract address: {contractAddress}</h3>
    </div>
  );
};

export default FaucetInfo;
