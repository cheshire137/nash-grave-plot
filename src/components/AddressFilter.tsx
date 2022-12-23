import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { TextInput, FormControl, Checkbox, Box } from '@primer/react';
import FilterModal from './FilterModal';
import FilterButton from './FilterButton';
import ClearFilterButton from './ClearFilterButton';
import type AddressFilterOption from '../types/AddressFilterOption';
import type { IdType, Row } from 'react-table'
import { useDetectClickOutside } from 'react-detect-click-outside';

interface Props {
  column: {
    filterValue: AddressFilterOption;
    setFilter: (value?: AddressFilterOption) => void;
    preFilteredRows: Row<Record<string, unknown>>[];
    id: IdType<Record<string, unknown>>;
  };
}

function AddressFilter({
  column: { filterValue, setFilter }
}: Props) {
  const containerRef = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });
  const [isOpen, setIsOpen] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const hasPhotosInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string | undefined>();
  const [hasPhotos, setHasPhotos] = useState<boolean | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSetFilter = useMemo(() => {
    const setFilterAndUpdateUrl = (newFilter?: AddressFilterOption) => {
      const newAddress = newFilter?.address;
      if (newAddress && newAddress.length > 0) {
        setSearchParams({ address: newAddress });
      } else {
        setSearchParams({});
      }
      setFilter(newFilter);
    }
    return debounce(setFilterAndUpdateUrl, 300);
  }, [setFilter, setSearchParams]);
  const hasPhotosFilterSet = filterValue && typeof filterValue.hasPhotos === 'boolean' && filterValue?.hasPhotos;
  const addressFilterSet = filterValue && typeof filterValue.address === 'string' &&
    filterValue?.address !== '';

  useEffect(() => setAddress(filterValue?.address), [filterValue?.address]);
  useEffect(() => setHasPhotos(typeof filterValue?.hasPhotos === 'boolean' ? filterValue?.hasPhotos : undefined),
    [filterValue?.hasPhotos]);

  useEffect(() => {
    if (isOpen && addressInputRef.current) addressInputRef.current.focus();
  }, [isOpen, addressInputRef]);

  // Stop the invocation of the debounced function after unmounting:
  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  return <Box display="inline-block" ref={containerRef} sx={{ textAlign: 'left' }}>
    <FilterButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    {(hasPhotosFilterSet || addressFilterSet) && <ClearFilterButton onClick={() => setFilter()} />}
    <FilterModal isOpen={isOpen} id="address-filter-modal" onDismiss={() => {
      setFilter({ address, hasPhotos });
      setIsOpen(false);
    }}>
      <FormControl>
        <FormControl.Label>Address:</FormControl.Label>
        <TextInput
          value={address || ''}
          onChange={e => {
            const newAddress = e.target.value;
            setAddress(newAddress);
            debouncedSetFilter({ hasPhotos, address: newAddress });
          }}
          placeholder="Filter rows"
          variant="small"
          block
          type="search"
          ref={addressInputRef}
          autoFocus={isOpen}
        />
      </FormControl>
      <FormControl sx={{ mt: 3 }}>
        <Checkbox ref={hasPhotosInputRef}
          checked={hasPhotos || false}
          onChange={e => setFilter({ hasPhotos: e.target.checked, address })}
        />
        <FormControl.Label>Has photo</FormControl.Label>
      </FormControl>
    </FilterModal>
  </Box>;
}

export default AddressFilter;
