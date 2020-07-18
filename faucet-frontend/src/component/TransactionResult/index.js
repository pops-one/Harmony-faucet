import React from "react";

import "./style.scss";

const TransactionResult = ({ transactionHash, explorerUrl }) => {
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
          <a
            href={`${explorerUrl}${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {explorerUrl}
          </a>
        </span>
      </div>
    </div>
  );
};

export default TransactionResult;
