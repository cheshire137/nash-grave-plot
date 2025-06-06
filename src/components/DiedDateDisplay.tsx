import DateCellFormatter from './DateCellFormatter'
import type {CellProps} from 'react-table'
import styles from './DiedDateDisplay.module.css'

function DiedDateDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <DateCellFormatter {...props} />
    </div>
  )
}

export default DiedDateDisplay
