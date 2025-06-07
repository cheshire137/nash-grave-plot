import {type FormEvent, useCallback, useRef, useState} from 'react'
import type {IdType, Row} from 'react-table'
import {FormControl, TextInput} from '@primer/react'
import {FilterDialog} from './FilterDialog'
import type {PersonFilterOption} from '../types'
import styles from './PersonFilterDialog.module.css'

interface PersonFilterDialogProps {
  column: {
    filterValue: PersonFilterOption
    setFilter: (value?: PersonFilterOption) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

export function PersonFilterDialog({column: {filterValue, setFilter}}: PersonFilterDialogProps) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState<string | undefined>()
  const [deathDate, setDeathDate] = useState<string | undefined>()
  const personFilterSet = filterValue && typeof filterValue.name === 'string' && filterValue?.name !== ''
  const deathDateFilterSet = filterValue && typeof filterValue.deathDate === 'string' && filterValue?.deathDate !== ''
  const onSave = useCallback(() => {
    setFilter({name: name?.trim(), deathDate: deathDate?.trim()})
    setIsOpen(false)
  }, [deathDate, name, setFilter])
  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSave()
    },
    [onSave]
  )

  return (
    <FilterDialog
      isOpen={isOpen}
      onClear={setFilter}
      onClose={onSave}
      setIsOpen={setIsOpen}
      showClearButton={personFilterSet || deathDateFilterSet}
      footerButtons={[{type: 'submit', form: 'person-filter-form', content: 'Apply', buttonType: 'primary'}]}
    >
      <form id="person-filter-form" onSubmit={onFormSubmit}>
        <FormControl>
          <FormControl.Label>Person:</FormControl.Label>
          <TextInput
            value={name ?? ''}
            onChange={(e) => setName(e.target.value)}
            placeholder="Filter rows by name"
            block
            type="search"
            ref={nameInputRef}
            autoFocus={isOpen}
          />
        </FormControl>
        <FormControl className={styles.deathDateControl}>
          <FormControl.Label>Death date:</FormControl.Label>
          <TextInput
            value={deathDate ?? ''}
            onChange={(e) => setDeathDate(e.target.value)}
            placeholder="Filter rows by death date"
            block
            type="search"
          />
        </FormControl>
      </form>
    </FilterDialog>
  )
}
