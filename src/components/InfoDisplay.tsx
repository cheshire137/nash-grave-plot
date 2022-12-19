import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';
import type { CellProps } from 'react-table';

const InfoDisplay = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="180px" textAlign="left">
  <LongTextBlock {...value} />
</Box>;

export default InfoDisplay;
