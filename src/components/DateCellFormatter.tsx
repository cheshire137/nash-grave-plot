import {Text} from '@primer/react'
import {prettyDateStr} from '../utils'
import styles from './DateCellFormatter.module.css'

interface DateCellFormatterProps {
  value: Date | string | null
}

function DateCellFormatter({value}: DateCellFormatterProps) {
  return (
    <div className={styles.container}>
      {value instanceof Date ? <Text whiteSpace="nowrap">{prettyDateStr(value)}</Text> : value}
    </div>
  )
}

export default DateCellFormatter
