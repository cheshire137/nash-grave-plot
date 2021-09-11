import React from 'react';
import { Dropdown } from '@primer/components';

function SelectColumnFilter({
  column: {filterValue, setFilter, preFilteredRows, id}
}) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      const value = row.values[id] || '';
      const option = value.replaceAll(/\s+/g, ' ');
      if (option.length > 0 && option !== ' ') {
        options.add(option);
      }
    })
    const sortedOptions = [...options.values()];
    sortedOptions.sort();
    return sortedOptions;
  }, [id, preFilteredRows]);

  return (
    <Dropdown>
      <Dropdown.Button>{filterValue || "All"}</Dropdown.Button>
      <Dropdown.Menu direction="se">
        <Dropdown.Item onClick={() => setFilter("")}>All</Dropdown.Item>
        {options.map((option, i) => (
          <Dropdown.Item key={i} onClick={() => setFilter(option)}>{option}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SelectColumnFilter;
