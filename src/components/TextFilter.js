import React from 'react';
import { TextInput } from '@primer/components';

function TextFilter({
  column: {filterValue, setFilter}
}) {
  return (
    <TextInput
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder="Filter"
    />
  );
}

export default TextFilter;
