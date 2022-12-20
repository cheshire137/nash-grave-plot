import React, { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@primer/react';
import { FilterIcon } from '@primer/octicons-react';

interface Props {
  isOpen: boolean;
}

const FilterButton = (props: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { isOpen, ...rest } = props;
  return <IconButton
    size="small"
    aria-label="Change filter"
    variant={isOpen ? 'default' : 'invisible'}
    icon={FilterIcon}
    {...rest}
  />;
};

export default FilterButton;
