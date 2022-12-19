import styled from 'styled-components';
import { ActionList } from '@primer/react';

const SmallDropdownItem = styled(ActionList.Item).attrs({
  px: 2
})`
  font-size: 0.9rem;
`;

export default SmallDropdownItem;
