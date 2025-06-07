import {useRef, useEffect, useState, useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'
import {TextInput, FormControl, Checkbox} from '@primer/react'
import {FilterDialog} from './FilterDialog'
import type {AddressFilterOption} from '../types'
import type {IdType, Row} from 'react-table'

interface AddressFilterDialogProps {
  column: {
    filterValue: AddressFilterOption
    setFilter: (value?: AddressFilterOption) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

export function AddressFilterDialog({column: {filterValue, setFilter}}: AddressFilterDialogProps) {
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
  const hasPhotosFilterSet = filterValue && typeof filterValue.hasPhotos === 'boolean' && filterValue?.hasPhotos
  const addressFilterSet = filterValue && typeof filterValue.address === 'string' && filterValue?.address !== ''
  const onSave = useCallback(() => {
    setFilterAndUpdateUrl({hasPhotos, address: address?.trim()})
    setIsOpen(false)
  }, [address, setFilterAndUpdateUrl, hasPhotos])
  const onFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSave()
    },
    [onSave]
  )

  useEffect(() => setAddress(filterValue?.address), [filterValue?.address])
  useEffect(
    () => setHasPhotos(typeof filterValue?.hasPhotos === 'boolean' ? filterValue?.hasPhotos : undefined),
    [filterValue?.hasPhotos]
  )

  useEffect(() => {
    if (isOpen) addressInputRef.current?.focus()
  }, [isOpen, addressInputRef])

  return (
    <FilterDialog
      isOpen={isOpen}
      onClear={setFilterAndUpdateUrl}
      onClose={onSave}
      setIsOpen={setIsOpen}
      showClearButton={hasPhotosFilterSet || addressFilterSet}
      footerButtons={[
        {type: 'submit', content: 'Apply', buttonType: 'primary', onClick: onSave, form: 'address-filter-form'},
      ]}
    >
      <form id="address-filter-form" onSubmit={onFormSubmit}>
        <FormControl>
          <FormControl.Label>Address:</FormControl.Label>
          <TextInput
            value={address ?? ''}
            onChange={(e) => setAddress(e.target.value)}
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
            checked={hasPhotos ?? false}
            onChange={(e) => setHasPhotos(e.target.checked)}
          />
          <FormControl.Label>Has photo</FormControl.Label>
        </FormControl>
      </form>
    </FilterDialog>
  )
}
