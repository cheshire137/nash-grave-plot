import React from 'react';
import { Text } from '@primer/components';
import { titleCase } from './TitleCase';

const AddressLines = ({ streetAddress, additionalLocationInfo }) => {
  return (
    <Text as="div">
      {titleCase(streetAddress)}
      {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
        <div>{titleCase(additionalLocationInfo)}</div>
      ) : null}
    </Text>
  );
};

const AddressDisplay = ({ value }) => <AddressLines {...value} />;

export default AddressDisplay;
