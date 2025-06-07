import {type FormEvent, useCallback, useMemo, useRef, useState, useEffect} from 'react'
import {titleCaseify} from '../utils'
import type {IdType, Row} from 'react-table'
import {FormControl, Select, TextInput} from '@primer/react'
import {FilterDialog} from './FilterDialog'
import {ClearFilterButton} from './ClearFilterButton'
import Cemetery from '../models/Cemetery'
import type {CemeteryFilterOption} from '../types'
import styles from './CemeteryFilterDialog.module.css'

interface CemeteryFilterDialogProps {
  column: {
    filterValue: CemeteryFilterOption
    setFilter: (value?: CemeteryFilterOption) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

export function CemeteryFilterDialog({
  column: {filterValue, setFilter, preFilteredRows, id},
}: CemeteryFilterDialogProps) {
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
  const graveyardTypeFilterSet =
    filterValue && typeof filterValue.graveyardType === 'string' && filterValue?.graveyardType !== ''
  const nameFilterSet = filterValue && typeof filterValue.name === 'string' && filterValue?.name !== ''
  const onSave = useCallback(() => {
    setFilter({name, graveyardType})
    setIsOpen(false)
  }, [name, graveyardType, setFilter])
  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSave()
    },
    [onSave]
  )

  useEffect(() => setName(filterValue?.name), [filterValue?.name])
  useEffect(() => setGraveyardType(filterValue?.graveyardType), [filterValue?.graveyardType])

  useEffect(() => {
    if (isOpen && nameInputRef.current) nameInputRef.current.focus()
  }, [isOpen, nameInputRef])

  return (
    <div className={styles.container}>
      <FilterDialog
        isOpen={isOpen}
        onClear={setFilter}
        onClose={onSave}
        setIsOpen={setIsOpen}
        showClearButton={graveyardTypeFilterSet || nameFilterSet}
        footerButtons={[{type: 'submit', form: 'cemetery-filter-form', content: 'Save', buttonType: 'primary'}]}
      >
        <form id="cemetery-filter-form" onSubmit={onFormSubmit}>
          <FormControl className={styles.graveyardTypeControl}>
            <FormControl.Label>Graveyard type:</FormControl.Label>
            <Select
              ref={graveyardTypeSelectRef}
              onChange={(e) => setGraveyardType(e.target.value)}
              value={graveyardType ?? ''}
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
              value={name ?? ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="Filter rows"
              block
              type="search"
              ref={nameInputRef}
              autoFocus={isOpen}
            />
          </FormControl>
        </form>
      </FilterDialog>
    </div>
  )
}
