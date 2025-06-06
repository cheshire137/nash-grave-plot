import React, {ButtonHTMLAttributes, RefObject} from 'react'
import {IconButton} from '@primer/react'
import {FilterIcon} from '@primer/octicons-react'

interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-labelledby' | 'ref'> {
  isOpen: boolean
  ref: RefObject<HTMLButtonElement>
}

export function FilterButton({isOpen, ref, ...rest}: FilterButtonProps) {
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
