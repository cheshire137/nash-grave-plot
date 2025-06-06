import React, {ButtonHTMLAttributes, RefObject} from 'react'
import {IconButton} from '@primer/react'
import {FilterIcon} from '@primer/octicons-react'

interface Props {
  isOpen: boolean
  ref: RefObject<HTMLButtonElement>
}

const FilterButton = ({
  isOpen,
  ref,
  ...rest
}: Props & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-labelledby' | 'ref'>) => {
  return (
    <IconButton
      size="small"
      ref={ref}
      aria-label="Change filter"
      variant={isOpen ? 'default' : 'invisible'}
      icon={FilterIcon}
      title="Change filter"
      {...rest}
    />
  )
}

export default FilterButton
