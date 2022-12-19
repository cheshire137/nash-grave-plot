import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';
import type { CellProps } from 'react-table';

const FootstoneDisplay = (props: CellProps<Record<string, unknown>>) => <Box minWidth="150px">
  <LongTextBlock {...props} />
</Box>;

export default FootstoneDisplay;
