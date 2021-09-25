import React from 'react';
import { Box, FormGroup } from '@primer/components';

const ColumnOption = ({ name, value, onToggle }) => {
  const domID = `enabledColumns_${value}`;
  return (
    <FormGroup display="inline-block" my={0} mr={3}>
      <FormGroup.Label fontWeight="normal" htmlFor={domID}>
        <input
          type="checkbox"
          value={value}
          onChange={e => onToggle(e.target.checked)}
          id={domID}
        />
        <Box as="span" display="inline-block" ml={1}>{name}</Box>
      </FormGroup.Label>
    </FormGroup>
  );
};

export default ColumnOption;
