import LongTextBlock from './LongTextBlock'
import type {CellProps} from 'react-table'
import styles from './FootstoneDisplay.module.css'

function FootstoneDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <LongTextBlock {...props} />
    </div>
  )
}

export default FootstoneDisplay
