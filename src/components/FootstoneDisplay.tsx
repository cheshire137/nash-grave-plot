import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';

interface Props {
  value?: string;
}

const FootstoneDisplay = ({ value }: Props) => <Box minWidth="150px"><LongTextBlock value={value} /></Box>;

export default FootstoneDisplay;
