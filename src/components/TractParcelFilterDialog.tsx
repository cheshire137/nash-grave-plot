import {type FormEvent, useCallback, useRef, useState} from 'react'
import type {IdType, Row} from 'react-table'
import {FormControl, TextInput} from '@primer/react'
import {FilterDialog} from './FilterDialog'

interface TractParcelFilterDialogProps {
  column: {
    filterValue: string
    setFilter: (value?: string) => void
    preFilteredRows: Row<Record<string, unknown>>[]
    id: IdType<Record<string, unknown>>
  }
}

export function TractParcelFilterDialog({column: {filterValue, setFilter}}: TractParcelFilterDialogProps) {
  const tractParcelNumberRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [tractParcelNumber, setTractParcelNumber] = useState<string | undefined>()
  const tractParcelNumberSet = typeof filterValue === 'string' && filterValue.trim() !== ''
  const onSave = useCallback(() => {
    setFilter(tractParcelNumber?.trim())
    setIsOpen(false)
  }, [tractParcelNumber, setFilter])
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
      showClearButton={tractParcelNumberSet}
      footerButtons={[{type: 'submit', form: 'tract-parcel-filter-form', content: 'Apply', buttonType: 'primary'}]}
    >
      <form id="tract-parcel-filter-form" onSubmit={onFormSubmit}>
        <FormControl>
          <FormControl.Label>Tract parcel:</FormControl.Label>
          <TextInput
            value={tractParcelNumber ?? ''}
            onChange={(e) => setTractParcelNumber(e.target.value)}
            placeholder="Filter rows by tract parcel number"
            block
            type="search"
            ref={tractParcelNumberRef}
            autoFocus={isOpen}
          />
        </FormControl>
      </form>
    </FilterDialog>
  )
}
