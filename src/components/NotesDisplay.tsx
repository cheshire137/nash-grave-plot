import LongTextBlock from './LongTextBlock'
import type {CellProps} from 'react-table'
import styles from './NotesDisplay.module.css'

export function NotesDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <LongTextBlock {...props} />
    </div>
  )
}
