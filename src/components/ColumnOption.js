import React from 'react';

const ColumnOption = ({ name, value, onToggle }) => {
  return (
    <label>
      <input
        type="checkbox"
        value={value}
        onChange={() => onToggle(value)}
      />
      {name}
    </label>
  );
};

export default ColumnOption;
