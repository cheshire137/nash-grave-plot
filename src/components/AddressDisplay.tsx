import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

const AddressLines = ({ streetAddress, additionalLocationInfo }) => <Box textAlign="left" minWidth="200px">
  <TitleCase value={streetAddress} />
  {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
    <Box>
      <TitleCase value={additionalLocationInfo} />
    </Box>
  ) : null}
</Box>;

const AddressDisplay = ({ value }) => <AddressLines {...value} />;

export default AddressDisplay;
