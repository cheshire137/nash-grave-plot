import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';
import type { CellProps } from 'react-table';

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

const AddressDisplay = ({ value }: CellProps<Record<string, unknown>>) => <AddressLines {...value} />;

export default AddressDisplay;
