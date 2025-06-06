import React from 'react'
import {Text} from '@primer/react'
import titleCaseify from '../utils/titleCaseify'

interface TitleCaseProps {
  value?: string | null
}

function TitleCase({value}: TitleCaseProps) {
  if (typeof value === 'string') return <Text>{titleCaseify(value)}</Text>
  return null
}

export default TitleCase
