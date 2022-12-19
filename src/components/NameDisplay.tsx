import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';
import type { CellProps } from 'react-table';

const NameDisplay = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="200px">
  <TitleCase value={value} />
</Box>;

export default NameDisplay;
