import React, { Component } from 'react';

class AddressDisplay extends Component {
  render() {
    const { streetAddress, additionalLocationInfo } = this.props;

    return (
      <div>
        {streetAddress}
        {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
          <div
            className="ws-normal"
          >{additionalLocationInfo}</div>
        ) : null}
      </div>
    );
  }
}

export default AddressDisplay;
