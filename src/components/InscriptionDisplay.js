import React, { Component } from 'react';

class InscriptionDisplay extends Component {
  render() {
    const { text, lines } = this.props;

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
  }
}

export default InscriptionDisplay;
