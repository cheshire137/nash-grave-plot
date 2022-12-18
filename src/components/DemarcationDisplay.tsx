import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

interface Props {
  value?: string;
}

const DemarcationDisplay = ({ value }: Props) => <Box minWidth="140px"><TitleCase value={value} /></Box>;

export default DemarcationDisplay;
