import React from 'react'
import {Box} from '@primer/react'
import DateCellFormatter from './DateCellFormatter'
import type {CellProps} from 'react-table'

function DiedDateDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <Box minWidth="130px">
      <DateCellFormatter {...props} />
    </Box>
  )
}

export default DiedDateDisplay
