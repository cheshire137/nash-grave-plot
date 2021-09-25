import React from 'react';

const ColumnOption = ({ name, value, onToggle }) => {
  return (
    <label>
      <input
        type="checkbox"
        value={value}
        onChange={e => onToggle(e.target.checked)}
      />
      {name}
    </label>
  );
};

export default ColumnOption;
