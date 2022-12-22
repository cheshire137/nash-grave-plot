import React from 'react';
import { Box, Text } from '@primer/react';
import TitleCase from './TitleCase';
import type { CellProps } from 'react-table';
import Cemetery from '../models/Cemetery';

const CemeteryDisplay = ({ value }: CellProps<Record<string, unknown>>) => {
  const cemetery = value as Cemetery;
  return <Box minWidth="200px">
    <TitleCase value={cemetery.name} /><br />
    <Text color="fg.muted" fontSize="1">Type: {cemetery.graveyardType}</Text>
  </Box>;
};

export default CemeteryDisplay;
