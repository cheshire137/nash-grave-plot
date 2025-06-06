import {Text} from '@primer/react'
import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'
import Cemetery from '../models/Cemetery'
import styles from './CemeteryDisplay.module.css'

function CemeteryDisplay({value}: CellProps<Record<string, unknown>>) {
  const cemetery = value as Cemetery
  return (
    <div className={styles.container}>
      <TitleCase value={cemetery.name} />
      <br />
      <Text color="fg.muted" fontSize="1">
        Type: {cemetery.graveyardType}
      </Text>
    </div>
  )
}

export default CemeteryDisplay
