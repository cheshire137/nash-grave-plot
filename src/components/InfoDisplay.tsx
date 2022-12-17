import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';

const InfoDisplay = ({ value }) => <Box minWidth="180px" textAlign="left">
  <LongTextBlock value={value} />
</Box>;

export default InfoDisplay;
