import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';
import type { CellProps } from 'react-table';

const NotesDisplay = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="300px" textAlign="left">
  <LongTextBlock value={value} />
</Box>;

export default NotesDisplay;
