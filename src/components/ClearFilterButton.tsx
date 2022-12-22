import React, { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@primer/react';
import { XIcon } from '@primer/octicons-react';

const ClearFilterButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <IconButton
    size="small"
    variant="invisible"
    aria-label="Clear filter"
    title="Clear filter"
    icon={XIcon}
    {...props}
  />;
};

export default ClearFilterButton;
