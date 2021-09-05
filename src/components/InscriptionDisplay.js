import React from 'react';

const InscriptionDisplay = ({ text, lines }) => {
  return (
    <div className="constrained-text text-center ws-normal">
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
    </div>
  );
};

export default InscriptionDisplay;
