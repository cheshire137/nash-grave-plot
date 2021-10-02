import React, { useEffect, useMemo } from 'react';
import TextFilter from './TextFilter';
import debounce from 'lodash.debounce';

function AddressFilter({
  column: { filterValue, setFilter }
}) {
  const updateUrl = () => {
    if (!filterValue || filterValue.trim().length < 1) {
      if (window.location.search !== '') {
        window.history.pushState({}, '', '');
      }
      return;
    }
    if (window.history.pushState) {
      const newUrlSearch = `?address=${encodeURIComponent(filterValue)}`;
      if (window.location.search !== newUrlSearch) {
        window.history.pushState({}, '', newUrlSearch);
      }
    }
  };
  const debouncedUpdateUrl = useMemo(() => debounce(updateUrl, 300), [filterValue]);
  useEffect(() => { return () => debouncedUpdateUrl.cancel(); }, []);
  const setFilterAndUpdateUrl = newAddress => {
    debouncedUpdateUrl();
    setFilter(newAddress);
  }
  return <TextFilter column={{ filterValue, setFilter: setFilterAndUpdateUrl }} />;
}

export default AddressFilter;
