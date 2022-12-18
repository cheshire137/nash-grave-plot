import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';

interface Props {
  value?: string | null;
}

const InfoDisplay = ({ value }: Props) => <Box minWidth="180px" textAlign="left">
  <LongTextBlock value={value} />
</Box>;

export default InfoDisplay;
