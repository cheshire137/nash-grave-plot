import React from 'react'
import {titleCaseify} from '../utils'
import ConstrainedTextBlock from './ConstrainedTextBlock'

interface InscriptionLinesProps {
  text: string
  lines: string[]
}

function InscriptionLines({text, lines}: InscriptionLinesProps) {
  return (
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
}

export default InscriptionLines
