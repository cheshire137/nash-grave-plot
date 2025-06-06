import {Dialog} from '@primer/react'
import styles from './FilterModal.module.css'

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
      <div className={styles.innerContainer}>{children}</div>
    </Dialog>
  )
}

export default FilterModal
