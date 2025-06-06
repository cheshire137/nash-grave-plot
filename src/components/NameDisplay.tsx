import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'
import Person from '../models/Person'
import DateCellFormatter from './DateCellFormatter'
import styles from './NameDisplay.module.css'

export function NameDisplay({value}: CellProps<Record<string, unknown>>) {
  const person = value as Person
  return (
    <div className={styles.container}>
      <TitleCase value={person.name} />
      <DateCellFormatter value={person.deathDate} />
    </div>
  )
}
