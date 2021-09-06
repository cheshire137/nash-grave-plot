import React from 'react';
import { Text } from '@primer/components';

const InscriptionDisplay = ({ text, lines }) => {
  return (
    <Text as="div" whiteSpace="normal" textAlign="center">
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
    </Text>
  );
};

export default InscriptionDisplay;
