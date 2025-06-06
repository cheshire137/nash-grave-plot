import type {CellProps} from 'react-table'
import styles from './GraveyardTypeDisplay.module.css'

function GraveyardTypeDisplay({value}: CellProps<Record<string, unknown>>) {
  return <div className={styles.container}>{value}</div>
}

export default GraveyardTypeDisplay
