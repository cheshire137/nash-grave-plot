import React, { useRef, useEffect, useState } from 'react';
import type { FilterValue } from 'react-table'
import { FormControl, Checkbox } from '@primer/react';
import FilterPopover from './FilterPopover';
import FilterButton from './FilterButton';

interface Props {
  column: {
    setFilter: (value?: FilterValue) => void;
  };
}

function PhotoColumnFilter({
  column: { setFilter }
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen, inputRef]);

  return <>
    <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    <FilterPopover open={isOpen} sx={{ px: 3 }}>
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
    </FilterPopover>
  </>;
}

export default PhotoColumnFilter;
