import React from 'react';
import { Box, Heading } from '@primer/components';
import ColumnOption from './ColumnOption';
import Column from '../models/Column';

const ColumnGroupOptions = ({ groupName, columnValues }) => {
  return (
    <Box mb={4}>
      {groupName && groupName.trim().length > 0 && <Heading fontSize={2} mb={2}>{groupName}</Heading>}
      {columnValues.map(value => <ColumnOption
        key={"${groupName}-#{value}"}
        name={Column.names[value]}
        value={value}
        onToggle={isEnabled => console.log(value, 'is', isEnabled ? 'enabled' : 'disabled')}
      />)}
    </Box>
  );
};

export default ColumnGroupOptions;
