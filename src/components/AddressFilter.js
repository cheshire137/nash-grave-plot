import React from 'react';
import TextFilter from './TextFilter';
import UpdateUrlFilter from '../models/UpdateUrlFilter';

function AddressFilter({
  column: { filterValue, setFilter }
}) {
  const setFilterAndUpdateUrl = newAddress => {
    UpdateUrlFilter('address', newAddress);
    setFilter(newAddress);
  }
  return <TextFilter column={{ filterValue, setFilter: setFilterAndUpdateUrl }} />;
}

export default AddressFilter;
