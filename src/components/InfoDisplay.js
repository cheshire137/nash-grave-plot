import React from 'react';
import { Box } from '@primer/components';
import LongTextBlock from './LongTextBlock';

const InfoDisplay = ({ value }) => <Box minWidth="180px" textAlign="left">
  <LongTextBlock value={value} />
</Box>;

export default InfoDisplay;
