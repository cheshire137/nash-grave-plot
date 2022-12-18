import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

interface AddressLinesProps {
  streetAddress: string;
  additionalLocationInfo?: string;
}

const AddressLines = ({ streetAddress, additionalLocationInfo }: AddressLinesProps) => <Box textAlign="left" minWidth="200px">
  <TitleCase value={streetAddress} />
  {typeof additionalLocationInfo === 'string' && additionalLocationInfo.length > 0 ? (
    <Box>
      <TitleCase value={additionalLocationInfo} />
    </Box>
  ) : null}
</Box>;

interface AddressDisplayProps {
  value: AddressLinesProps;
}

const AddressDisplay = ({ value }: AddressDisplayProps) => <AddressLines {...value} />;

export default AddressDisplay;
