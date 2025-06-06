import React from 'react'
import titleCaseify from '../utils/titleCaseify'
import ConstrainedTextBlock from './ConstrainedTextBlock'

interface Props {
  text: string
  lines: string[]
}

const InscriptionLines = ({text, lines}: Props) => (
  <ConstrainedTextBlock textAlign="center">
    {lines.length > 0 ? (
      <>
        {lines.map((line) => {
          const key = '_' + Math.random().toString(36).substr(2, 9)
          return <div key={key}>{titleCaseify(line)}</div>
        })}
      </>
    ) : (
      text
    )}
  </ConstrainedTextBlock>
)

export default InscriptionLines
