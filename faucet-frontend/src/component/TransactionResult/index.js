import React from 'react';

import './style.scss';

const transactionExplorer = process.env.REACT_APP_TXN_EXPLORER;

const TransactionResult = ({ transactionHash }) => {
  if (!transactionHash) {
    return null;
  }
  return (
    <div className="txn-result-wrapper">
      <div className="txn-header">Transaction Result</div>
      <div className="txn-body">
        <span>Transaction Hash</span>
        <span>{transactionHash}</span>
      </div>
      <div className="txn-body">
        <span>Explorer</span>
        <span>
          <a href={`${transactionExplorer}${transactionHash}`} target="_blank" rel="noopener noreferrer">{transactionExplorer}</a>
        </span>
      </div>
    </div>
  );
};

export default TransactionResult;
