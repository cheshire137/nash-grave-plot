import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'
import styles from './DemarcationDisplay.module.css'

function DemarcationDisplay({value}: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <TitleCase value={value} />
    </div>
  )
}

export default DemarcationDisplay
