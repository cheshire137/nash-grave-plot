import React from 'react';
import { Box } from '@primer/react';
import DateCellFormatter from './DateCellFormatter';
import type { CellProps } from 'react-table';

const DiedDateDisplay = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="130px">
  <DateCellFormatter {...value} />
</Box>;

export default DiedDateDisplay;
