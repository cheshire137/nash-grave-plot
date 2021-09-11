import React from 'react';
import { Box } from '@primer/components';
import TitleCase from './TitleCase';

const NameDisplay = ({ value }) => <Box minWidth="200px"><TitleCase value={value} /></Box>;

export default NameDisplay;
