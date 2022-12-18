import React from 'react';
import { Box, Heading } from '@primer/react';
import ColumnOption from './ColumnOption';
import { Column, ColumnGroup, ColumnNamesByColumn } from '../models/Column';

interface Props {
  groupName: ColumnGroup;
  columnValues: Column[];
  enabledColumns: Column[];
  onColumnToggle: (columnValue: Column, isEnabled: boolean) => void;
}

const ColumnGroupOptions = ({ groupName, enabledColumns, columnValues, onColumnToggle }: Props) => {
  return (
    <Box mb={3}>
      {groupName && groupName.trim().length > 0 && <Heading sx={{ fontSize: 1, mb: 2 }}>{groupName}</Heading>}
      {columnValues.map(value => <ColumnOption
        key={`${groupName}-${value}`}
        name={ColumnNamesByColumn[value]}
        value={value}
        isEnabled={enabledColumns.includes(value)}
        onToggle={onColumnToggle}
      />)}
    </Box>
  );
};

export default ColumnGroupOptions;
