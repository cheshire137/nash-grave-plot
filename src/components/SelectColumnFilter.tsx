import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ActionMenu, ActionList } from '@primer/react';
import { titleCase } from './TitleCase';

const FullWidthDropdown = styled(ActionMenu)`
  width: 100%;
`;

const FullWidthDropdownButton = styled(ActionMenu.Button)`
  width: 100%;
`;

const ConstrainedDropdownMenu = styled(ActionMenu.Overlay)`
  width: 100%;
  max-height: 50vh;
  overflow: auto;
  text-align: left;
  font-weight: normal;
`;

const SmallDropdownItem = styled(ActionList.Item).attrs({
  px: 2
})`
  font-size: 0.9rem;
`;

interface Props {
  column: {
    filterValue: string;
    setFilter: (value?: string) => void;
    preFilteredRows: any[];
    id: string;
  };
}

function SelectColumnFilter({
  column: {filterValue, setFilter, preFilteredRows, id}
}: Props) {
  const options: any[] = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      const value = row.values[id] || '';
      const option = value.replaceAll(/\s+/g, ' ');
      if (option.length > 0 && option !== ' ') {
        options.add(option);
      }
    })
    const sortedOptions: any[] = [...options.values()];
    sortedOptions.sort();
    return sortedOptions;
  }, [id, preFilteredRows]);

  return (
    <FullWidthDropdown>
      <FullWidthDropdownButton variant="small">{filterValue ? titleCase(filterValue) : "All"}</FullWidthDropdownButton>
      <ConstrainedDropdownMenu>
        <SmallDropdownItem onClick={() => setFilter("")}>All</SmallDropdownItem>
        {options.map((option, i) => (
          <SmallDropdownItem key={i} onClick={() => setFilter(option)}>{titleCase(option)}</SmallDropdownItem>
        ))}
      </ConstrainedDropdownMenu>
    </FullWidthDropdown>
  )
}

export default SelectColumnFilter;
