import React from 'react';
import {Text} from '@primer/components';
import styled from "styled-components";

const TextBlock = styled(Text).attrs({
  as: 'div'
})`
  max-height: 7.5em;
  overflow: auto;
`;

const useTextBlock = ({ value }) => <TextBlock>{value}</TextBlock>;

export default useTextBlock;
