import React, { useState, useEffect } from 'react';

import './style.scss';

const host = process.env.REACT_APP_HOST_API;

const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch(`${host}/balance`)
      .then((response) => response.json())
      .then((result) => setBalance(result.balance));
  }, []);

  return (
    <div className="balance-wrapper">
      Current balance in this faucet is {balance} ONE.
    </div>
  );
};

export default Balance;
