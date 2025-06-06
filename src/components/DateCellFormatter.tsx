import React from 'react'
import {Box, Text} from '@primer/react'
import prettyDateStr from '../utils/prettyDateStr'

interface DateCellFormatterProps {
  value: Date | string | null
}

function DateCellFormatter({value}: DateCellFormatterProps) {
  return (
    <Box minWidth="130px">
      {value instanceof Date ? <Text whiteSpace="nowrap">{prettyDateStr(value)}</Text> : value}
    </Box>
  )
}

export default DateCellFormatter
