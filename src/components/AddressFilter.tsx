import React from 'react';
import TextFilter from './TextFilter';
import { useSearchParams } from 'react-router-dom';

interface Props {
  column: {
    filterValue: string;
    setFilter: (value?: string) => void;
  };
}

function AddressFilter({
  column: { filterValue, setFilter }
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const setFilterAndUpdateUrl = (newAddress?: string) => {
    if (newAddress && newAddress.length > 0) {
      setSearchParams({ address: newAddress });
    } else {
      setSearchParams({});
    }
    setFilter(newAddress);
  }
  const column = { filterValue, setFilter: setFilterAndUpdateUrl };
  return <TextFilter column={column} />;
}

export default AddressFilter;
