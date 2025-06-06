import {Dialog} from '@primer/react'

interface FilterDialogProps {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
  returnFocusRef: React.RefObject<HTMLElement>
}

export function FilterDialog({isOpen, children, onClose, returnFocusRef}: FilterDialogProps) {
  if (!isOpen) return null

  return (
    <Dialog title="Filter graves" returnFocusRef={returnFocusRef} onClose={onClose}>
      {children}
    </Dialog>
  )
}
