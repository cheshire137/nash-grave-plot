import React from 'react';
import { Box, Text } from '@primer/react';
import type { CellProps } from 'react-table';
import prettyDateStr from '../utils/prettyDateStr';

const DateCellFormatter = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="130px">
  {value instanceof Date ? <Text whiteSpace="nowrap">{prettyDateStr(value)}</Text> : value}
</Box>;

export default DateCellFormatter;
