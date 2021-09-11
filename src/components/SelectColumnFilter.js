import React from 'react';
import styled from 'styled-components';
import { Dropdown } from '@primer/components';
import { titleCase } from './TitleCase';

const FullWidthDropdown = styled(Dropdown)`
  width: 100%;
`;

const FullWidthDropdownButton = styled(Dropdown.Button)`
  width: 100%;
`;

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
    <FullWidthDropdown>
      <FullWidthDropdownButton variant="small">{filterValue ? titleCase(filterValue) : "All"}</FullWidthDropdownButton>
      <Dropdown.Menu direction="s">
        <Dropdown.Item onClick={() => setFilter("")}>All</Dropdown.Item>
        {options.map((option, i) => (
          <Dropdown.Item key={i} onClick={() => setFilter(option)}>{titleCase(option)}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </FullWidthDropdown>
  )
}

export default SelectColumnFilter;
