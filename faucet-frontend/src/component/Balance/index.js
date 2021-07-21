import React, { useState, useEffect } from "react";

import "./style.scss";

const Balance = ({ balance }) => {
  return (
    <div className="balance-wrapper">
      Current balance in this faucet is {balance} ONE. <br/><br/>

      This Faucet is intended for use by DApp Developers on Harmony Testnet. <br/> <br/>
      We recommend that you <a href="https://staking.harmony.one">stake</a> a portion of the tokens received from the Faucet, so that you have a continuous source of Testnet tokens. <br/> <br/>
      If you wish to receive additional tokens to run a validator on testnet, please drop a message <a href="https://t.me/POPS_Team_Validator">here.</a><br/> <br/>

      Please return unused Testnet tokens back to the faucet.
      
    </div>
  );
};

export default Balance;
