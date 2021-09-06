import React from 'react';
import { Text } from '@primer/components';

const AddressDisplay = ({ streetAddress, additionalLocationInfo }) => {
  return (
    <Text as="div" whiteSpace="normal">
      {streetAddress}
      {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
        <div>{additionalLocationInfo}</div>
      ) : null}
    </Text>
  );
};

export default AddressDisplay;
