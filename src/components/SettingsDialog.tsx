import React, { useState } from 'react';
import { Box, Dialog, Text } from '@primer/react';
import { GearIcon } from '@primer/octicons-react';
import IntermentFieldGroupSettings from './IntermentFieldGroupSettings';
import LocalStorage from '../models/LocalStorage';
import type IntermentField from '../types/IntermentField';
import type IntermentFieldGroup from '../types/IntermentFieldGroup';
import HeaderIconButton from './HeaderIconButton';

const allIntermentFieldGroups: IntermentFieldGroup[] = ['Person', 'Location', 'Marker/Plot', 'Parcel Numbers',
  'Survey', 'Other'];

const getEnabledColumns = (enabledFields: IntermentField[], intermentField: IntermentField, isEnabled: boolean) => {
  if (isEnabled) return [...enabledFields, intermentField];
  return enabledFields.filter(c => c !== intermentField);
};

interface Props {
  enabledFields: IntermentField[];
  setEnabledFields: (enabledFields: IntermentField[]) => void;
}

const SettingsDialog = ({ enabledFields, setEnabledFields }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <HeaderIconButton icon={GearIcon} onClick={() => setIsOpen(true)} aria-label="Settings" />
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} aria-labelledby="header-id">
      <Dialog.Header id="header-id">Settings</Dialog.Header>
      <Box p={3} sx={{ overflow: 'auto', maxHeight: '70vh' }}>
        <Text color="black" as="div">
          <Box mt={0} mb={3} as="p">Choose which columns to show:</Box>
          {allIntermentFieldGroups.map(group => <IntermentFieldGroupSettings
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

export default SettingsDialog;
