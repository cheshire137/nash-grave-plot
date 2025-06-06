import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'
import styles from './ParcelNumberDisplay.module.css'

export function ParcelNumberDisplay({value}: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <TitleCase value={value} />
    </div>
  )
}
