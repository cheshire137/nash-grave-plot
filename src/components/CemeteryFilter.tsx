import {useCallback, useMemo, useRef, useState, useEffect} from 'react'
import {titleCaseify} from '../utils'
import type {IdType, Row} from 'react-table'
import {FormControl, Select, TextInput} from '@primer/react'
import {FilterDialog} from './FilterDialog'
import {ClearFilterButton} from './ClearFilterButton'
import Cemetery from '../models/Cemetery'
import type {CemeteryFilterOption} from '../types'
import debounce from 'lodash.debounce'
import styles from './CemeteryFilter.module.css'

interface CemeteryFilterProps {
  column: {
    filterValue: CemeteryFilterOption
    setFilter: (value?: CemeteryFilterOption) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

function CemeteryFilter({column: {filterValue, setFilter, preFilteredRows, id}}: CemeteryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const graveyardTypeSelectRef = useRef<HTMLSelectElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState<string | undefined>()
  const [graveyardType, setGraveyardType] = useState<string | undefined>()
  const graveyardTypes = useMemo(
    () => [
      ...preFilteredRows
        .reduce((memo, row) => {
          const cemetery: Cemetery = row.values[id]
          if (cemetery.graveyardType !== '') {
            return memo.add(cemetery.graveyardType)
          }
          return memo
        }, new Set<string>())
        .values(),
    ],
    [id, preFilteredRows]
  )
  const debouncedSetFilter = useMemo(() => debounce(setFilter, 300), [setFilter])
  const graveyardTypeFilterSet =
    filterValue && typeof filterValue.graveyardType === 'string' && filterValue?.graveyardType !== ''
  const nameFilterSet = filterValue && typeof filterValue.name === 'string' && filterValue?.name !== ''
  const onFilterDialogClose = useCallback(() => {
    setFilter({name, graveyardType})
    setIsOpen(false)
  }, [name, graveyardType, setFilter])

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
    <div className={styles.container}>
      <FilterDialog
        isOpen={isOpen}
        onClear={() => setFilter()}
        onClose={onFilterDialogClose}
        setIsOpen={setIsOpen}
        showClearButton={graveyardTypeFilterSet || nameFilterSet}
      >
        <FormControl className={styles.graveyardTypeControl}>
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
        <FormControl className={styles.cemeteryNameControl}>
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
            block
            type="search"
            ref={nameInputRef}
            autoFocus={isOpen}
          />
        </FormControl>
      </FilterDialog>
    </div>
  )
}

export default CemeteryFilter
