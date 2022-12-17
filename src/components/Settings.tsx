import React, { useState } from 'react';
import { Box, Button, Dialog, StyledOcticon, Text } from '@primer/react';
import { GearIcon } from '@primer/octicons-react';
import ColumnGroupOptions from './ColumnGroupOptions';
import Column from '../models/Column';
import LocalStorage from '../models/LocalStorage';

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
      <Button variant="invisible" onClick={() => setIsOpen(true)} title="Settings" aria-label="Settings">
        <StyledOcticon icon={GearIcon} size={16} color="white" />
      </Button>
      <Dialog
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">Settings</Dialog.Header>
        <Box p={3} sx={{ overflow: 'auto', maxHeight: '70vh' }}>
          <Text color="black" as="div">
            <Box mt={0} mb={3} as="p">Choose which columns to show:</Box>
            {Object.keys(Column.groups).map(groupName => <ColumnGroupOptions
              key={groupName}
              groupName={groupName}
              columnValues={Column.groups[groupName]}
              enabledColumns={enabledColumns}
              onColumnToggle={(columnValue, isEnabled) => {
                const newEnabledColumns = getEnabledColumns(enabledColumns, columnValue, isEnabled);
                LocalStorage.set('enabledColumns', newEnabledColumns);
                setEnabledColumns(newEnabledColumns);
              }}
            />)}
          </Text>
        </Box>
      </Dialog>
    </>
  );
};

export default Settings;
