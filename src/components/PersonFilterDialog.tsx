import {type FormEvent, useCallback, useRef, useState} from 'react'
import type {IdType, Row} from 'react-table'
import {FormControl, TextInput} from '@primer/react'
import {FilterDialog} from './FilterDialog'

interface PersonFilterDialogProps {
  column: {
    filterValue: any
    setFilter: (value?: any) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

export function PersonFilterDialog({column: {filterValue, setFilter}}: PersonFilterDialogProps) {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState<string | undefined>()
  const personFilterSet = filterValue && typeof filterValue.name === 'string' && filterValue?.name !== ''
  const onSave = useCallback(() => {
    setFilter({name: name?.trim()})
    setIsOpen(false)
  }, [name, setFilter])
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
      showClearButton={personFilterSet}
      footerButtons={[{type: 'submit', form: 'person-filter-form', content: 'Apply', buttonType: 'primary'}]}
    >
      <form id="person-filter-form" onSubmit={onFormSubmit}>
        <FormControl>
          <FormControl.Label>Person:</FormControl.Label>
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
  )
}
