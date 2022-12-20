import React, { useState, useRef, useEffect } from 'react';
import { TextInput, FormControl, IconButton, Popover } from '@primer/react';
import { FilterIcon } from '@primer/octicons-react';

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
    <IconButton variant="invisible" icon={FilterIcon} onClick={() => setIsOpen(!isOpen)} />
    <Popover open={isOpen} caret="top">
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
    </Popover>
  </>;
}

export default TextFilter;
