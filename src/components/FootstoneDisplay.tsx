import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';
import type { CellProps } from 'react-table';

const FootstoneDisplay = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="150px">
  <LongTextBlock {...value} />
</Box>;

export default FootstoneDisplay;
