import React from 'react';
import { Text } from '@primer/components';
import { titleCase } from './TitleCase';

const AddressDisplay = ({ streetAddress, additionalLocationInfo }) => {
  return (
    <Text as="div" whiteSpace="normal">
      {titleCase(streetAddress)}
      {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
        <div>{titleCase(additionalLocationInfo)}</div>
      ) : null}
    </Text>
  );
};

const useAddressDisplay = ({ value }) => <AddressDisplay {...value} />;

export default useAddressDisplay;
