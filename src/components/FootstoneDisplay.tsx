import React from 'react'
import {Box} from '@primer/react'
import LongTextBlock from './LongTextBlock'
import type {CellProps} from 'react-table'

function FootstoneDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <Box minWidth="150px">
      <LongTextBlock {...props} />
    </Box>
  )
}

export default FootstoneDisplay
