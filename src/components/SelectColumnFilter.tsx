import React, { useMemo } from 'react';
import titleCaseify from '../utils/titleCaseify';
import FullWidthDropdown from './FullWidthDropdown';
import FullWidthDropdownButton from './FullWidthDropdownButton';
import ConstrainedDropdownMenu from './ConstrainedDropdownMenu';
import SmallDropdownItem from './SmallDropdownItem';
import type { FilterValue, IdType, Row } from 'react-table'
import { ActionList } from '@primer/react';

interface Props {
  column: {
    filterValue: FilterValue;
    setFilter: (value?: FilterValue) => void;
    preFilteredRows: Row<Record<string, unknown>>[];
    id: IdType<Record<string, unknown>>;
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

  return <FullWidthDropdown>
    <FullWidthDropdownButton variant="small">{filterValue ? titleCaseify(filterValue) : "All"}</FullWidthDropdownButton>
    <ConstrainedDropdownMenu>
      <ActionList>
        <SmallDropdownItem onSelect={() => setFilter("")}>All</SmallDropdownItem>
        {options.map((option, i) => <SmallDropdownItem key={`${i}-${option}`} onSelect={() => setFilter(option)}>
          {titleCaseify(option)}
        </SmallDropdownItem>)}
      </ActionList>
    </ConstrainedDropdownMenu>
  </FullWidthDropdown>;
}

export default SelectColumnFilter;
