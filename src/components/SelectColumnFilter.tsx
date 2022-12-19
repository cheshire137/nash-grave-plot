import React, { useMemo } from 'react';
import { titleCase } from './TitleCase';
import FullWidthDropdown from './FullWidthDropdown';
import FullWidthDropdownButton from './FullWidthDropdownButton';
import ConstrainedDropdownMenu from './ConstrainedDropdownMenu';
import SmallDropdownItem from './SmallDropdownItem';

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
