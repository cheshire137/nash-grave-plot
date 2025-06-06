import type {CellProps} from 'react-table'
import InscriptionLines from './InscriptionLines'
import styles from './InscriptionDisplay.module.css'

export function InscriptionDisplay({value}: CellProps<Record<string, unknown>>) {
  return (
    <div className={styles.container}>
      <InscriptionLines {...value} />
    </div>
  )
}
