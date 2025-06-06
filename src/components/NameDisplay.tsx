import React from 'react'
import {Box} from '@primer/react'
import TitleCase from './TitleCase'
import type {CellProps} from 'react-table'
import Person from '../models/Person'
import DateCellFormatter from './DateCellFormatter'

const NameDisplay = ({value}: CellProps<Record<string, unknown>>) => {
  const person = value as Person
  return (
    <Box minWidth="200px">
      <TitleCase value={person.name} />
      <DateCellFormatter value={person.deathDate} />
    </Box>
  )
}

export default NameDisplay
