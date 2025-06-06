import React from 'react'
import {Box} from '@primer/react'
import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'

const DemarcationDisplay = ({value}: CellProps<Record<string, unknown>>) => (
  <Box minWidth="140px">
    <TitleCase value={value} />
  </Box>
)

export default DemarcationDisplay
