import styled from 'styled-components'
import {IconButton, themeGet} from '@primer/react'

const HeaderIconButton = styled(IconButton).attrs({
  variant: 'invisible',
})`
  color: ${themeGet('colors.header.logo')};

  &:hover:not([disabled]) {
    background-color: ${themeGet('colors.header.bg')};
    color: ${themeGet('colors.header.text')};
  }
`

export default HeaderIconButton
