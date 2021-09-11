import React from 'react';
import { TextBlock } from './TextBlock';

const InscriptionDisplay = ({ text, lines }) => {
  return (
    <TextBlock textAlign="center">
      {lines.length > 0 ? (
        <>
          {lines.map(line => {
            const key = '_' + Math.random().toString(36).substr(2, 9);
            return (
              <div key={key}>{line}</div>
            );
          })}
        </>
      ) : text}
    </TextBlock>
  );
};

const useInscriptionDisplay = ({ value }) => <InscriptionDisplay {...value} />;

export default useInscriptionDisplay;
