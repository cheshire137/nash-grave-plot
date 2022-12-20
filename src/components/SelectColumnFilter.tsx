import React, { useMemo, useRef, useState, useEffect } from 'react';
import titleCaseify from '../utils/titleCaseify';
import type { FilterValue, IdType, Row } from 'react-table'
import { TextInput, FormControl, IconButton, Popover, Select } from '@primer/react';
import { FilterIcon } from '@primer/octicons-react';

interface Props {
  column: {
    filterValue: FilterValue;
    setFilter: (value?: FilterValue) => void;
    preFilteredRows: Row<Record<string, unknown>>[];
    id: IdType<Record<string, unknown>>;
  };
}

function SelectColumnFilter({
  column: {setFilter, preFilteredRows, id}
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const options = useMemo(() => {
    return [...preFilteredRows.reduce((memo, row) => {
      const value = row.values[id];
      if (typeof value === 'string' && value !== '') {
        return memo.add(value);
      }
      return memo;
    }, new Set<string>()).values()];
  }, [id, preFilteredRows]);

  useEffect(() => {
    if (isOpen && selectRef.current) selectRef.current.focus();
  }, [isOpen, selectRef]);

  return <>
    <IconButton aria-label="Change filter" variant="invisible" icon={FilterIcon} onClick={() => setIsOpen(!isOpen)} />
    <Popover open={isOpen} caret="top">
      <FormControl>
        <FormControl.Label visuallyHidden={true}>Filter rows:</FormControl.Label>
        <Select onChange={e => setFilter(e.target.value)} onBlur={() => setIsOpen(false)}>
          <Select.Option value="">All</Select.Option>
          {options.map((option, i) => <Select.Option key={`${i}-${option}`} value={option}>
            {titleCaseify(option)}
          </Select.Option>)}
        </Select>
      </FormControl>
    </Popover>
  </>;
}

export default SelectColumnFilter;
