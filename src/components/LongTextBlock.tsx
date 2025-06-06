import React from 'react'
import titleCaseify from '../utils/titleCaseify'
import type {CellProps} from 'react-table'
import ConstrainedTextBlock from './ConstrainedTextBlock'

const LongTextBlock = ({value}: CellProps<Record<string, unknown>>) => {
  if (typeof value === 'string') return <ConstrainedTextBlock>{titleCaseify(value)}</ConstrainedTextBlock>
  return null
}

export default LongTextBlock
