import React from 'react';
import { TextInput } from '@primer/react';

function TextFilter({
  column: { filterValue, setFilter }
}) {
  return <TextInput
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
    placeholder="Filter"
    bg="white"
    variant="small"
    block
    type="search"
  />;
}

export default TextFilter;
