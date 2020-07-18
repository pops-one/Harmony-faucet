import React from 'react';

import './style.scss';

const RadioButton = ({ name, checked, onChange, radios }) => {
  return (
    <div className="radio-wrapper">
      {radios.map((radio) => {
        return (
          <>
            <input
              type="radio"
              id={radio.id}
              name={name}
              value={radio.value}
              checked={checked === radio.value}
              onChange={onChange}
              disabled={radio.disabled}
            />
            <label for={radio.id}>{radio.label}</label>
          </>
        );
      })}
    </div>
  );
};

export default RadioButton;
