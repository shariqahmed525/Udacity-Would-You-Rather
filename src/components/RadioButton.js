import React from 'react';

const RadioButton = ({ setOption, text, value, checked }) => {
  return (
    <div
      className="radio-wrapper"
      onClick={setOption}
    >
      <input
        type="radio"
        value={value}
        className="radio"
        onChange={setOption}
        checked={value === checked}
      />
      <span className="radio-text">
        {text}
      </span>
    </div>
  );
}

export default RadioButton;