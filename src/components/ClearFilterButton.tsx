import {IconButton, type ButtonBaseProps} from '@primer/react'
import {XIcon} from '@primer/octicons-react'

const ClearFilterButton = (props: Omit<ButtonBaseProps, 'aria-labelledby'>) => (
  <IconButton
    size="small"
    variant="invisible"
    aria-label="Clear filter"
    title="Clear filter"
    icon={XIcon}
    {...props}
  />
)

export default ClearFilterButton
