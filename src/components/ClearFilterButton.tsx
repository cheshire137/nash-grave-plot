import {IconButton, type ButtonBaseProps} from '@primer/react'
import {XIcon} from '@primer/octicons-react'

export function ClearFilterButton(props: Omit<ButtonBaseProps, 'aria-labelledby'>) {
  return (
    <IconButton
      size="small"
      variant="invisible"
      aria-label="Clear filter"
      title="Clear filter"
      icon={XIcon}
      {...props}
    />
  )
}
