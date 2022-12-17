import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

const ParcelNumberDisplay = ({ value }) => <Box minWidth="150px"><TitleCase value={value} /></Box>;

export default ParcelNumberDisplay;
