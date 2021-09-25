import React, { useState } from 'react';
import { Box, ButtonInvisible, Dialog, StyledOcticon, Text } from '@primer/components';
import { GearIcon } from '@primer/octicons-react';
import ColumnGroupOptions from './ColumnGroupOptions';
import Column from '../models/Column';

const getEnabledColumns = (enabledColumns, columnValue, isEnabled) => {
  if (isEnabled) {
    return [...enabledColumns, columnValue];
  }
  return enabledColumns.filter(c => c !== columnValue);
};

const Settings = ({ enabledColumns, setEnabledColumns }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ButtonInvisible onClick={() => setIsOpen(true)} title="Settings" aria-label="Settings">
        <StyledOcticon icon={GearIcon} size={16} color="white" />
      </ButtonInvisible>
      <Dialog
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">Settings</Dialog.Header>
        <Box p={3} sx={{ overflow: 'auto', maxHeight: '70vh' }}>
          <Text color="black">
            <p>Choose which columns to show:</p>
            {Object.keys(Column.groups).map(groupName => <ColumnGroupOptions
              key={groupName}
              groupName={groupName}
              columnValues={Column.groups[groupName]}
              enabledColumns={enabledColumns}
              onColumnToggle={(columnValue, isEnabled) =>
                setEnabledColumns(getEnabledColumns(enabledColumns, columnValue, isEnabled))}
            />)}
          </Text>
        </Box>
      </Dialog>
    </>
  );
};

export default Settings;
