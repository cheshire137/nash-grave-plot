import styled from 'styled-components';
import { Text } from '@primer/react';

const ConstrainedTextBlock = styled(Text).attrs({
  as: 'div'
})`
  max-height: 7.5em;
  overflow: auto;
`;

export default ConstrainedTextBlock;
