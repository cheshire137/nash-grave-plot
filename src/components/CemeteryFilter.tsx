import React, {useMemo, useRef, useState, useEffect} from 'react'
import titleCaseify from '../utils/titleCaseify'
import type {IdType, Row} from 'react-table'
import {FormControl, Select, TextInput, Box} from '@primer/react'
import FilterModal from './FilterModal'
import FilterButton from './FilterButton'
import ClearFilterButton from './ClearFilterButton'
import Cemetery from '../models/Cemetery'
import type CemeteryFilterOption from '../types/CemeteryFilterOption'
import debounce from 'lodash.debounce'
import {useDetectClickOutside} from 'react-detect-click-outside'

interface Props {
  column: {
    filterValue: CemeteryFilterOption
    setFilter: (value?: CemeteryFilterOption) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

function CemeteryFilter({column: {filterValue, setFilter, preFilteredRows, id}}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  })
  const graveyardTypeSelectRef = useRef<HTMLSelectElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState<string | undefined>()
  const [graveyardType, setGraveyardType] = useState<string | undefined>()
  const graveyardTypes = useMemo(() => {
    return [
      ...preFilteredRows
        .reduce((memo, row) => {
          const cemetery: Cemetery = row.values[id]
          if (cemetery.graveyardType !== '') {
            return memo.add(cemetery.graveyardType)
          }
          return memo
        }, new Set<string>())
        .values(),
    ]
  }, [id, preFilteredRows])
  const debouncedSetFilter = useMemo(() => debounce(setFilter, 300), [setFilter])
  const graveyardTypeFilterSet =
    filterValue && typeof filterValue.graveyardType === 'string' && filterValue?.graveyardType !== ''
  const nameFilterSet = filterValue && typeof filterValue.name === 'string' && filterValue?.name !== ''

  useEffect(() => setName(filterValue?.name), [filterValue?.name])
  useEffect(() => setGraveyardType(filterValue?.graveyardType), [filterValue?.graveyardType])

  useEffect(() => {
    if (isOpen && nameInputRef.current) nameInputRef.current.focus()
  }, [isOpen, nameInputRef])

  // Stop the invocation of the debounced function after unmounting:
  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel()
    }
  }, [debouncedSetFilter])

  return (
    <Box display="inline-block" ref={containerRef} sx={{textAlign: 'left'}}>
      <FilterButton ref={filterButtonRef} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {(graveyardTypeFilterSet || nameFilterSet) && <ClearFilterButton onClick={() => setFilter()} />}
      <FilterModal
        isOpen={isOpen}
        id="cemetery-filter-modal"
        returnFocusRef={filterButtonRef}
        onClose={() => {
          setFilter({name, graveyardType})
          setIsOpen(false)
        }}
      >
        <FormControl sx={{display: 'inline-block'}}>
          <FormControl.Label>Graveyard type:</FormControl.Label>
          <Select
            ref={graveyardTypeSelectRef}
            onChange={(e) => setFilter({name, graveyardType: e.target.value})}
            value={graveyardType || ''}
          >
            <Select.Option value="">All</Select.Option>
            {graveyardTypes.map((graveyardType, i) => (
              <Select.Option key={`${i}-${graveyardType}`} value={graveyardType}>
                {titleCaseify(graveyardType)}
              </Select.Option>
            ))}
          </Select>
          {graveyardTypeFilterSet && <ClearFilterButton onClick={() => setFilter({name})} />}
        </FormControl>
        <FormControl sx={{mt: 3}}>
          <FormControl.Label>Cemetery name:</FormControl.Label>
          <TextInput
            value={name || ''}
            onChange={(e) => {
              const newName = e.target.value
              setName(newName)
              debouncedSetFilter({name: newName, graveyardType})
            }}
            onBlur={() => setFilter({name, graveyardType})}
            placeholder="Filter rows"
            variant="small"
            block
            type="search"
            ref={nameInputRef}
            autoFocus={isOpen}
          />
        </FormControl>
      </FilterModal>
    </Box>
  )
}

export default CemeteryFilter
