import {IconButton, type IconButtonProps} from '@primer/react'
import {FilterIcon} from '@primer/octicons-react'

interface FilterButtonProps
  extends Omit<IconButtonProps, 'aria-labelledby' | 'aria-label' | 'icon' | 'size' | 'title' | 'variant'> {
  isOpen?: boolean
  title?: string
}

export function FilterButton({isOpen = false, title = 'Change filter', ...rest}: FilterButtonProps) {
  return (
    <IconButton
      size="small"
      aria-label={title}
      variant={isOpen ? 'default' : 'invisible'}
      icon={FilterIcon}
      title={title}
      {...rest}
    />
  )
}
