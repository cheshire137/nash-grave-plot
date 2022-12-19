import React, { useMemo } from 'react';
import titleCaseify from '../utils/titleCaseify';
import type { FilterValue, IdType, Row } from 'react-table'
import { FormControl, Select } from '@primer/react';

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
  const options = useMemo(() => {
    return [...preFilteredRows.reduce((memo, row) => {
      const value = row.values[id];
      return memo.add(value);
    }, new Set<string>()).values()];
  }, [id, preFilteredRows]);

  return <FormControl>
    <FormControl.Label></FormControl.Label>
    <Select onChange={e => setFilter(e.target.value)}>
      <Select.Option value="">All</Select.Option>
      {options.map((option, i) => <Select.Option key={`${i}-${option}`} value={option}>
        {titleCaseify(option)}
      </Select.Option>)}
    </Select>
  </FormControl>;
}

export default SelectColumnFilter;
