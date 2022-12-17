import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';

const FootstoneDisplay = ({ value }) => <Box minWidth="150px"><LongTextBlock value={value} /></Box>;

export default FootstoneDisplay;
