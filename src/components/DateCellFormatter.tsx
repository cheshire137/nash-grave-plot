import React from 'react';
import { Box, Text } from '@primer/react';

const prettyDateStr = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

const DateCellFormatter = ({ value }) => <Box minWidth="130px">
  {value instanceof Date ? <Text whiteSpace="nowrap">{prettyDateStr(value)}</Text> : value}
</Box>;

export default DateCellFormatter;
