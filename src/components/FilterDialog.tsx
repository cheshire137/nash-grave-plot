import type {PropsWithChildren} from 'react'
import {Dialog, type DialogProps} from '@primer/react'

interface FilterDialogProps extends Omit<DialogProps, 'title'> {
  isOpen: boolean
}

export function FilterDialog({isOpen, children, ...props}: PropsWithChildren<FilterDialogProps>) {
  if (!isOpen) return null

  return (
    <Dialog title="Filter graves" {...props}>
      {children}
    </Dialog>
  )
}
