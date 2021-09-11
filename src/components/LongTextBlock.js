import React from 'react';
import { Text } from '@primer/components';
import styled from "styled-components";
import { titleCase } from './TitleCase';

const ConstrainedTextBlock = styled(Text).attrs({
  as: 'div'
})`
  max-height: 7.5em;
  overflow: auto;
`;

const LongTextBlock = ({ value }) => typeof value === 'string' ? (
  <ConstrainedTextBlock>{titleCase(value)}</ConstrainedTextBlock>
) : null;

export default LongTextBlock;
