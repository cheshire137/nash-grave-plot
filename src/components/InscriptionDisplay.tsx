import React from 'react';
import { Box } from '@primer/react';
import { titleCase } from './TitleCase';
import type { CellProps } from 'react-table';
import ConstrainedTextBlock from './ConstrainedTextBlock';


interface InscriptionLinesProps {
  text: string;
  lines: string[];
}

const InscriptionLines = ({ text, lines }: InscriptionLinesProps) => <ConstrainedTextBlock textAlign="center">
  {lines.length > 0 ? (
    <>
      {lines.map(line => {
        const key = '_' + Math.random().toString(36).substr(2, 9);
        return (
          <div key={key}>{titleCase(line)}</div>
        );
      })}
    </>
  ) : text}
</ConstrainedTextBlock>;

const InscriptionDisplay = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="200px">
  <InscriptionLines {...value} />
</Box>;

export default InscriptionDisplay;
