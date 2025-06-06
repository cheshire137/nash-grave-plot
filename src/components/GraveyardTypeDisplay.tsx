import React from 'react'
import {Box, Text} from '@primer/react'
import type {CellProps} from 'react-table'

const GraveyardTypeDisplay = ({value}: CellProps<Record<string, unknown>>) => (
  <Box minWidth="130px">
    <Text textAlign="center" as="div">
      {value}
    </Text>
  </Box>
)

export default GraveyardTypeDisplay
