import React, { useRef, useEffect, useState } from 'react';
import type { FilterValue } from 'react-table'
import { FormControl, Checkbox } from '@primer/react';
import FilterModal from './FilterModal';
import FilterButton from './FilterButton';
import ClearFilterButton from './ClearFilterButton';

interface Props {
  column: {
    filterValue: FilterValue;
    setFilter: (value?: FilterValue) => void;
  };
}

function PhotoColumnFilter({
  column: { setFilter, filterValue }
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen, inputRef]);

  return <>
    <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    {filterValue && <ClearFilterButton onClick={() => setFilter()} />}
    <FilterModal isOpen={isOpen} id="photo-column-filter" onDismiss={() => setIsOpen(false)}>
      <FormControl sx={{ alignItems: 'center' }}>
        <Checkbox
          ref={inputRef}
          onChange={e => {
            setFilter(e.target.checked ? 1 : 0);
            setIsOpen(false);
          }}
        />
        <FormControl.Label>Has photo</FormControl.Label>
      </FormControl>
    </FilterModal>
  </>;
}

export default PhotoColumnFilter;
