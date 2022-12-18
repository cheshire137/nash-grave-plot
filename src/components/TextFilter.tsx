import React from 'react';
import { TextInput } from '@primer/react';

interface Props {
  column: {
    filterValue: string;
    setFilter: (value?: string) => void;
  };
}

function TextFilter({
  column: { filterValue, setFilter }
}: Props) {
  return <TextInput
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value)}
    placeholder="Filter"
    sx={{ bg: 'white' }}
    variant="small"
    block
    type="search"
  />;
}

export default TextFilter;
