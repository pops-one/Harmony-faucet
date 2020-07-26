import React from "react";
import "./style.scss";

const Dropdown = ({ list, selected, onChange }) => {
  return (
    <div className="dropdown-wrapper">
      <div className="dropdown">
        <select name="faucet" id="faucet" onChange={onChange}>
          {list.map((l) => {
            return (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
