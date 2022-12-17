import React from 'react';
import { Box, FormControl, Checkbox } from '@primer/react';

const ColumnOption = ({ name, value, isEnabled, onToggle }) => {
  const domID = `enabledColumns_${value}`;
  return <FormControl id={domID} sx={{ display: 'inline-block', mx: 0, mr: 3 }}>
    <FormControl.Label sx={{ fontWeight: 'normal', mb: 1 }}>
      <Checkbox
        checked={isEnabled}
        name="enabledColumns"
        value={value}
        id={domID}
        onChange={e => onToggle(value, e.target.checked)}
      />
      <Box as="span" display="inline-block" ml={1}>{name}</Box>
    </FormControl.Label>
  </FormControl>
};

export default ColumnOption;
