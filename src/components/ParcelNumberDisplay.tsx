import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

interface Props {
  value?: string | null;
}

const ParcelNumberDisplay = ({ value }: Props) => <Box minWidth="150px"><TitleCase value={value} /></Box>;

export default ParcelNumberDisplay;
