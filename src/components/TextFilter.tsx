import React, { useState, useRef, useEffect } from 'react';
import { TextInput, FormControl } from '@primer/react';
import FilterPopover from './FilterPopover';
import FilterButton from './FilterButton';

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

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen, inputRef]);

  return <>
    <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    <FilterPopover open={isOpen}>
      <FormControl>
        <FormControl.Label visuallyHidden={true}>Filter rows:</FormControl.Label>
        <TextInput
          value={filterValue || ''}
          onChange={e => setFilter(e.target.value)}
          onBlur={() => setIsOpen(false)}
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
