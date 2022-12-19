import React, { useState } from 'react';
import { Box, Button, Dialog, StyledOcticon, Text } from '@primer/react';
import { GearIcon } from '@primer/octicons-react';
import ColumnGroupOptions from './ColumnGroupOptions';
import LocalStorage from '../models/LocalStorage';
import type IntermentField from '../types/IntermentField';
import type IntermentFieldGroup from '../types/IntermentFieldGroup';

const allIntermentFieldGroups: IntermentFieldGroup[] = ['Person', 'Location', 'Marker/Plot', 'Parcel Numbers',
  'Survey', 'Other'];

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
          {allIntermentFieldGroups.map(group => <ColumnGroupOptions
            key={group}
            group={group}
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
