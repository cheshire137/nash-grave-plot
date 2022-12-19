import styled from 'styled-components';
import { ActionMenu } from '@primer/react';

const ConstrainedDropdownMenu = styled(ActionMenu.Overlay)`
  width: 100%;
  max-height: 50vh;
  overflow: auto;
  text-align: left;
  font-weight: normal;
`;

export default ConstrainedDropdownMenu;
