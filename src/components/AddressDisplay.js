import React, { Component } from 'react';

class AddressDisplay extends Component {
  render() {
    const { streetAddress, additionalLocationInfo } = this.props;

    return (
      <div class="constrained-text ws-normal">
        {streetAddress}
        {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
          <div>{additionalLocationInfo}</div>
        ) : null}
      </div>
    );
  }
}

export default AddressDisplay;
