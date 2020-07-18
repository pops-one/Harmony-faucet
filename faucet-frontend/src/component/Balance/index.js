import React, { useState, useEffect } from "react";

import "./style.scss";

const Balance = ({ balance }) => {
  return (
    <div className="balance-wrapper">
      Current balance in this faucet is {balance} ONE.
    </div>
  );
};

export default Balance;
