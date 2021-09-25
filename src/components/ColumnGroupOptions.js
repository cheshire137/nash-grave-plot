import React from 'react';
import { Box, Heading } from '@primer/components';
import ColumnOption from './ColumnOption';
import Column from '../models/Column';

const ColumnGroupOptions = ({ groupName, enabledColumns, columnValues, onColumnToggle }) => {
  return (
    <Box mb={4}>
      {groupName && groupName.trim().length > 0 && <Heading fontSize={2} mb={2}>{groupName}</Heading>}
      {columnValues.map(value => <ColumnOption
        key={"${groupName}-#{value}"}
        name={Column.names[value]}
        value={value}
        isEnabled={enabledColumns.includes(value)}
        onToggle={onColumnToggle}
      />)}
    </Box>
  );
};

export default ColumnGroupOptions;
