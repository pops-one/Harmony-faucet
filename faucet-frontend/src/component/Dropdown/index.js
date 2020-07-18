import React from "react";

const Dropdown = ({ list, selected, onChange }) => {
  return (
    <div>
      <label for="faucet">Select Faucet Network:</label>
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
  );
};

export default Dropdown;
