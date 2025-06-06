import React from 'react'
import {Box} from '@primer/react'
import LongTextBlock from './LongTextBlock'
import type {CellProps} from 'react-table'

function InfoDisplay(props: CellProps<Record<string, unknown>>) {
  return (
    <Box minWidth="180px" textAlign="left">
      <LongTextBlock {...props} />
    </Box>
  )
}

export default InfoDisplay
