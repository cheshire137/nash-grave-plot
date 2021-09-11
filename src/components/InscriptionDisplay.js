import React from 'react';
import LongTextBlock from './LongTextBlock';
import { titleCase } from './TitleCase';

const InscriptionDisplay = ({ text, lines }) => {
  return (
    <LongTextBlock textAlign="center">
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
    </LongTextBlock>
  );
};

const useInscriptionDisplay = ({ value }) => <InscriptionDisplay {...value} />;

export default useInscriptionDisplay;
