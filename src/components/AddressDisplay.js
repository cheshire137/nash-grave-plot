import React from 'react';

const AddressDisplay = ({ streetAddress, additionalLocationInfo }) => {
  return (
    <div className="constrained-text ws-normal">
      {streetAddress}
      {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
        <div>{additionalLocationInfo}</div>
      ) : null}
    </div>
  );
};

export default AddressDisplay;
