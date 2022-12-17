import React from 'react';
import { Box } from '@primer/react';
import { ConstrainedTextBlock } from './LongTextBlock';
import { titleCase } from './TitleCase';

const InscriptionLines = ({ text, lines }) => <ConstrainedTextBlock textAlign="center">
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

const InscriptionDisplay = ({ value }) => <Box minWidth="200px"><InscriptionLines {...value} /></Box>;

export default InscriptionDisplay;
