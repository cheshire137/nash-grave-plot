import LongTextBlock from './LongTextBlock'
import type {CellProps} from 'react-table'
import styles from './InfoDisplay.module.css'

export function InfoDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <LongTextBlock {...props} />
    </div>
  )
}
