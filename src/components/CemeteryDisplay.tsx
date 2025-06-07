import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'
import Cemetery from '../models/Cemetery'
import styles from './CemeteryDisplay.module.css'

function CemeteryDisplay({value}: CellProps<Record<string, unknown>>) {
  const cemetery = value as Cemetery
  return (
    <div className={styles.container}>
      <TitleCase value={cemetery.name} />
      <div className={styles.cemeteryType}>Type: {cemetery.graveyardType}</div>
    </div>
  )
}

export default CemeteryDisplay
