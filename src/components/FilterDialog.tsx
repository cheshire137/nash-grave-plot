import {type PropsWithChildren, useRef} from 'react'
import {Dialog, type DialogProps} from '@primer/react'
import {FilterButton} from './FilterButton'
import {ClearFilterButton} from './ClearFilterButton'

interface FilterDialogProps extends Omit<DialogProps, 'title' | 'returnFocusRef'> {
  isOpen: boolean
  onClear: () => void
  setIsOpen: (val: boolean) => void
  showClearButton?: boolean
}

export function FilterDialog({
  isOpen,
  children,
  onClear,
  setIsOpen,
  showClearButton = false,
  ...props
}: PropsWithChildren<FilterDialogProps>) {
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <FilterButton ref={filterButtonRef} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {showClearButton && <ClearFilterButton onClick={() => onClear()} />}
      {isOpen && (
        <Dialog title="Filter graves" {...props}>
          {children}
        </Dialog>
      )}
    </>
  )
}
