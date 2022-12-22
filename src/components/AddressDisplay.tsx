import React from 'react';
import type { CellProps } from 'react-table';
import AddressLines from './AddressLines';
import Cemetery from '../models/Cemetery';
import PhotoList from './PhotoList';
import { Box } from '@primer/react';

const AddressDisplay = ({ value }: CellProps<Record<string, unknown>>) => {
  const cemetery = value as Cemetery;
  return <Box>
    <AddressLines address={cemetery.address} />
    {cemetery.hasPhotos() && <PhotoList value={cemetery.sitePhotos} />}
  </Box>;
};

export default AddressDisplay;
