import React from 'react';
import { Box, Heading } from '@primer/react';
import ColumnOption from './ColumnOption';
import type IntermentField from '../types/IntermentField';
import type IntermentFieldGroup from '../types/IntermentFieldGroup';
import { ColumnNamesByColumn, ColumnsByColumnGroup } from '../models/Column';

interface Props {
  groupName: IntermentFieldGroup;
  enabledFields: IntermentField[];
  toggleFieldEnabled: (intermentField: IntermentField, isEnabled: boolean) => void;
}

const ColumnGroupOptions = ({ groupName, enabledFields, toggleFieldEnabled }: Props) => <Box mb={3}>
  <Heading sx={{ fontSize: 1, mb: 2 }}>{groupName}</Heading>
  {ColumnsByColumnGroup[groupName].map(value => <ColumnOption
    key={`${groupName}-${value}`}
    name={ColumnNamesByColumn[value]}
    value={value}
    isEnabled={enabledFields.includes(value)}
    onToggle={toggleFieldEnabled}
  />)}
</Box>;

export default ColumnGroupOptions;
