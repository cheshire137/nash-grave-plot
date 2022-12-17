import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

const DemarcationDisplay = ({ value }) => <Box minWidth="140px"><TitleCase value={value} /></Box>;

export default DemarcationDisplay;
