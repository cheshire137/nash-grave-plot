import React from 'react';
import TextFilter from './TextFilter';
import UpdateUrlFilter from '../models/UpdateUrlFilter';

interface Props {
  column: {
    filterValue: string;
    setFilter: (value: string) => void;
  };
}

function AddressFilter({
  column: { filterValue, setFilter }
}: Props) {
  const setFilterAndUpdateUrl = (newAddress: string) => {
    UpdateUrlFilter('address', newAddress);
    setFilter(newAddress);
  }
  const column = { filterValue, setFilter: setFilterAndUpdateUrl };
  return <TextFilter column={column} />;
}

export default AddressFilter;
