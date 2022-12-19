import React, { useState } from 'react';
import { Box, Button, Dialog, StyledOcticon, Text } from '@primer/react';
import { GearIcon } from '@primer/octicons-react';
import ColumnGroupOptions from './ColumnGroupOptions';
import { AllColumnGroups, IntermentField } from '../models/Column';
import LocalStorage from '../models/LocalStorage';

const getEnabledColumns = (enabledFields: IntermentField[], columnValue: IntermentField, isEnabled: boolean) => {
  if (isEnabled) {
    return [...enabledFields, columnValue];
  }
  return enabledFields.filter(c => c !== columnValue);
};

interface Props {
  enabledFields: IntermentField[];
  setEnabledFields: (enabledFields: IntermentField[]) => void;
}

const Settings = ({ enabledFields, setEnabledFields }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
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
          {AllColumnGroups.map(groupName => <ColumnGroupOptions
            key={groupName}
            groupName={groupName}
            enabledFields={enabledFields}
            toggleFieldEnabled={(intermentField, isEnabled) => {
              const newEnabledFields = getEnabledColumns(enabledFields, intermentField, isEnabled);
              LocalStorage.set('enabledFields', newEnabledFields);
              setEnabledFields(newEnabledFields);
            }}
          />)}
        </Text>
      </Box>
    </Dialog>
  </>;
};

export default Settings;
