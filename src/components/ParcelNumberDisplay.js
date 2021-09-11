import React from 'react';
import { Box } from '@primer/components';
import TitleCase from './TitleCase';

const ParcelNumberDisplay = ({ value }) => <Box minWidth="150px"><TitleCase value={value} /></Box>;

export default ParcelNumberDisplay;
