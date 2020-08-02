import React, { useState } from "react";

import "./style.scss";

const Dropdown = ({ list, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (option) => () => {
    onChange(option);
    toggleMenu();
  };

  const selectedOption =
    list.find((opt) => opt.value === selected) || list[0] || {};

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown" onClick={toggleMenu}>
        {selectedOption.label}
      </div>
      <div className={`${isOpen && "is-open"} dropdown-options`}>
        {list.map((l) => (
          <div
            key={l.value}
            value={l.value}
            className="dropdown-option"
            onClick={onSelect(l)}
          >
            <div>{l.label}</div>
            <div>{l.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
