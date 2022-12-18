import React from 'react';
import { Text } from '@primer/react';
import styled from "styled-components";
import { titleCase } from './TitleCase';

export const ConstrainedTextBlock = styled(Text).attrs({
  as: 'div'
})`
  max-height: 7.5em;
  overflow: auto;
`;

interface Props {
  value?: string | null;
}

const LongTextBlock = ({ value }: Props) => typeof value === 'string' ? (
  <ConstrainedTextBlock>{titleCase(value)}</ConstrainedTextBlock>
) : null;

export default LongTextBlock;
