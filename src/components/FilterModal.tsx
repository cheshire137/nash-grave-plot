import {Dialog, Box} from '@primer/react'

interface Props {
  isOpen: boolean
  children: React.ReactNode
  id: string
  onClose: () => void
  returnFocusRef: React.RefObject<HTMLElement>
}

function FilterModal({isOpen, id, children, onClose, returnFocusRef}: Props) {
  if (!isOpen) return null
  return (
    <Dialog returnFocusRef={returnFocusRef} aria-labelledby={id} onClose={onClose}>
      <Dialog.Header id={id}>Filter graves</Dialog.Header>
      <Box p="3">{children}</Box>
    </Dialog>
  )
}

export default FilterModal
