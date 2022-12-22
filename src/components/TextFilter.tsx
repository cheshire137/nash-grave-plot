import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TextInput, FormControl } from '@primer/react';
import FilterPopover from './FilterPopover';
import FilterButton from './FilterButton';
import ClearFilterButton from './ClearFilterButton';
import debounce from 'lodash.debounce';

interface Props {
  column: {
    filterValue: string;
    setFilter: (value?: string) => void;
  };
}

function TextFilter({
  column: { filterValue, setFilter }
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const debouncedSetFilter = useMemo(() => debounce(setFilter, 300), [setFilter]);

  useEffect(() => setValue(filterValue || ''), [filterValue]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen, inputRef]);

  // Stop the invocation of the debounced function after unmounting:
  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  return <>
    <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    {filterValue && <ClearFilterButton onClick={() => setFilter()} />}
    <FilterPopover open={isOpen}>
      <FormControl>
        <FormControl.Label visuallyHidden={true}>Filter rows:</FormControl.Label>
        <TextInput
          value={value}
          onChange={e => {
            setValue(e.target.value);
            debouncedSetFilter(e.target.value);
          }}
          onBlur={() => {
            setIsOpen(false);
            setFilter(value);
          }}
          placeholder="Filter rows"
          variant="small"
          block
          type="search"
          ref={inputRef}
          autoFocus={isOpen}
        />
      </FormControl>
    </FilterPopover>
  </>;
}

export default TextFilter;
