import React from 'react';
import {Text} from '@primer/components';

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

const DateCellFormatter = ({ value }) => {
  if (value instanceof Date) {
    const displayValue = prettyDateStr(value);
    return <Text whiteSpace="nowrap">{displayValue}</Text>;
  }
  return value;
};

export default DateCellFormatter;
