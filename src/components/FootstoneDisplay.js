import React from 'react';
import { Box } from '@primer/components';
import LongTextBlock from './LongTextBlock';

const FootstoneDisplay = ({ value }) => <Box minWidth="150px"><LongTextBlock value={value} /></Box>;

export default FootstoneDisplay;
