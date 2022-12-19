import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';
import type { CellProps } from 'react-table';

const InfoDisplay = (props: CellProps<Record<string, unknown>>) => <Box minWidth="180px" textAlign="left">
  <LongTextBlock {...props} />
</Box>;

export default InfoDisplay;
