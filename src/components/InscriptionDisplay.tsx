import React from 'react'
import {Box} from '@primer/react'
import type {CellProps} from 'react-table'
import InscriptionLines from './InscriptionLines'

const InscriptionDisplay = ({value}: CellProps<Record<string, unknown>>) => (
  <Box minWidth="200px">
    <InscriptionLines {...value} />
  </Box>
)

export default InscriptionDisplay
