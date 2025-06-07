import {useRef, useEffect, useState, useMemo, useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'
import debounce from 'lodash.debounce'
import {TextInput, FormControl, Checkbox} from '@primer/react'
import {FilterDialog} from './FilterDialog'
import type {AddressFilterOption} from '../types'
import type {IdType, Row} from 'react-table'
import styles from './AddressFilter.module.css'

interface AddressFilterProps {
  column: {
    filterValue: AddressFilterOption
    setFilter: (value?: AddressFilterOption) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

function AddressFilter({column: {filterValue, setFilter}}: AddressFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const hasPhotosInputRef = useRef<HTMLInputElement>(null)
  const [address, setAddress] = useState<string | undefined>()
  const [hasPhotos, setHasPhotos] = useState<boolean | undefined>()
  const [searchParams, setSearchParams] = useSearchParams()
  const setFilterAndUpdateUrl = useCallback(
    (newFilter?: AddressFilterOption) => {
      const newSearchParams = new URLSearchParams(searchParams)
      const newAddress = newFilter?.address
      const newHasPhotos = newFilter?.hasPhotos
      if (newAddress && newAddress.length > 0) {
        newSearchParams.set('address', newAddress)
      } else {
        newSearchParams.delete('address')
      }
      if (typeof newHasPhotos === 'boolean') {
        newSearchParams.set('site_photos', newHasPhotos ? '1' : '0')
      } else {
        newSearchParams.delete('site_photos')
      }
      setSearchParams(newSearchParams)
      setFilter(newFilter)
    },
    [setFilter, searchParams, setSearchParams]
  )
  const debouncedSetFilterAndUpdateUrl = useMemo(() => debounce(setFilterAndUpdateUrl, 300), [setFilterAndUpdateUrl])
  const hasPhotosFilterSet = filterValue && typeof filterValue.hasPhotos === 'boolean' && filterValue?.hasPhotos
  const addressFilterSet = filterValue && typeof filterValue.address === 'string' && filterValue?.address !== ''
  const onFilterDialogClose = useCallback(() => {
    setFilterAndUpdateUrl({address, hasPhotos})
    setIsOpen(false)
  }, [address, hasPhotos, setFilterAndUpdateUrl])

  useEffect(() => setAddress(filterValue?.address), [filterValue?.address])
  useEffect(
    () => setHasPhotos(typeof filterValue?.hasPhotos === 'boolean' ? filterValue?.hasPhotos : undefined),
    [filterValue?.hasPhotos]
  )

  useEffect(() => {
    if (isOpen && addressInputRef.current) addressInputRef.current.focus()
  }, [isOpen, addressInputRef])

  // Stop the invocation of the debounced function after unmounting:
  useEffect(() => {
    return () => {
      debouncedSetFilterAndUpdateUrl.cancel()
    }
  }, [debouncedSetFilterAndUpdateUrl])

  return (
    <div className={styles.container}>
      <FilterDialog
        isOpen={isOpen}
        onClear={setFilterAndUpdateUrl}
        onClose={onFilterDialogClose}
        setIsOpen={setIsOpen}
        showClearButton={hasPhotosFilterSet || addressFilterSet}
      >
        <FormControl>
          <FormControl.Label>Address:</FormControl.Label>
          <TextInput
            value={address || ''}
            onChange={(e) => {
              const newAddress = e.target.value
              setAddress(newAddress)
              debouncedSetFilterAndUpdateUrl({
                hasPhotos,
                address: newAddress,
              })
            }}
            placeholder="Filter rows"
            block
            type="search"
            ref={addressInputRef}
            autoFocus={isOpen}
          />
        </FormControl>
        <FormControl sx={{mt: 3}}>
          <Checkbox
            ref={hasPhotosInputRef}
            checked={hasPhotos || false}
            onChange={(e) => setFilterAndUpdateUrl({hasPhotos: e.target.checked, address})}
          />
          <FormControl.Label>Has photo</FormControl.Label>
        </FormControl>
      </FilterDialog>
    </div>
  )
}

export default AddressFilter
