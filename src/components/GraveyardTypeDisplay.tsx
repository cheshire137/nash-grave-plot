import React from 'react'
import {Box, Text} from '@primer/react'
import type {CellProps} from 'react-table'

function GraveyardTypeDisplay({value}: CellProps<Record<string, unknown>>) {
  return (
    <Box minWidth="130px">
      <Text textAlign="center" as="div">
        {value}
      </Text>
    </Box>
  )
}

export default GraveyardTypeDisplay
