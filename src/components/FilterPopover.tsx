import styled from 'styled-components';
import { Popover, themeGet } from '@primer/react';

const FilterPopover = styled(Popover).attrs({
  caret: 'top',
})`
  background-color: ${themeGet('colors.canvas.default')};
  border-color: ${themeGet('colors.border.default')};
  border: ${themeGet('borderWidths.1')} solid ${themeGet('colors.border.default')};
  border-radius: ${themeGet('radii.2')};
  min-width: 100%;
`;

export default FilterPopover;
