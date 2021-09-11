import React from 'react';
import { Box } from '@primer/components';
import { titleCase } from './TitleCase';

const AddressLines = ({ streetAddress, additionalLocationInfo }) => {
  return (
    <Box minWidth="200px">
      {titleCase(streetAddress)}
      {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
        <div>{titleCase(additionalLocationInfo)}</div>
      ) : null}
    </Box>
  );
};

const AddressDisplay = ({ value }) => <AddressLines {...value} />;

export default AddressDisplay;
