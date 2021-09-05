import React from 'react';

const InscriptionDisplay = ({ text, lines }) => {
  return (
    <div class="constrained-text text-center ws-normal">
      {lines.length > 0 ? (
        <div>
          {lines.map(line => (
            <div key={line}>{line}</div>
          ))}
        </div>
      ) : text}
    </div>
  );
};

export default InscriptionDisplay;
