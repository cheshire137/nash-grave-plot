import React from 'react';
import { Box, Text } from '@primer/react';
import prettyDateStr from '../utils/prettyDateStr';

interface Props {
  value: Date | string | null;
}

const DateCellFormatter = ({ value }: Props) => <Box minWidth="130px">
  {value instanceof Date ? <Text whiteSpace="nowrap">{prettyDateStr(value)}</Text> : value}
</Box>;

export default DateCellFormatter;
