import React, { useMemo, useRef, useState, useEffect } from 'react';
import titleCaseify from '../utils/titleCaseify';
import type { FilterValue, IdType, Row } from 'react-table'
import { FormControl, Select } from '@primer/react';
import FilterPopover from './FilterPopover';
import FilterButton from './FilterButton';
import ClearFilterButton from './ClearFilterButton';
import Cemetery from '../models/Cemetery';
import type CemeteryFilterOption from '../types/CemeteryFilterOption';

interface Props {
  column: {
    filterValue: FilterValue;
    setFilter: (value?: CemeteryFilterOption) => void;
    preFilteredRows: Row<Record<string, unknown>>[];
    id: IdType<Record<string, unknown>>;
  };
}

function CemeteryFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const graveyardTypeSelectRef = useRef<HTMLSelectElement>(null);
  const graveyardTypes = useMemo(() => {
    return [...preFilteredRows.reduce((memo, row) => {
      const cemetery: Cemetery = row.values[id];
      if (cemetery.graveyardType !== '') {
        return memo.add(cemetery.graveyardType);
      }
      return memo;
    }, new Set<string>()).values()];
  }, [id, preFilteredRows]);

  return <>
    <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    {filterValue && <ClearFilterButton onClick={() => setFilter()} />}
    <FilterPopover open={isOpen}>
      <FormControl sx={{ width: '100%' }}>
        <FormControl.Label>Graveyard type:</FormControl.Label>
        <Select ref={graveyardTypeSelectRef}
          onChange={e => setFilter({ graveyardType: e.target.value })}
          onBlur={() => setIsOpen(false)}
        >
          <Select.Option value="">All</Select.Option>
          {graveyardTypes.map((graveyardType, i) => <Select.Option
            key={`${i}-${graveyardType}`}
            value={graveyardType}
          >{titleCaseify(graveyardType)}</Select.Option>)}
        </Select>
      </FormControl>
    </FilterPopover>
  </>;
}

export default CemeteryFilter;
