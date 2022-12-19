import React from 'react';
import { Box, Text } from '@primer/react';
import type { CellProps } from 'react-table';

const prettyDateStr = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let monthStr = month.toString();
  if (month < 10) {
    monthStr = `0${month}`;
  }
  const day = date.getDate();
  let dayStr = day.toString();
  if (day < 10) {
    dayStr = `0${day}`;
  }
  return `${year}-${monthStr}-${dayStr}`;
};

const DateCellFormatter = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="130px">
  {value instanceof Date ? <Text whiteSpace="nowrap">{prettyDateStr(value)}</Text> : value}
</Box>;

export default DateCellFormatter;
