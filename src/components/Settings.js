import React, { useState } from 'react';
import { Box, ButtonInvisible, Dialog, StyledOcticon } from '@primer/components';
import { GearIcon } from '@primer/octicons-react';

const Settings = () => {
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
        <Box p={3}>
        </Box>
      </Dialog>
    </>
  );
};

export default Settings;
