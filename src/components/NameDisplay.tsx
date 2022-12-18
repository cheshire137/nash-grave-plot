import React from 'react';
import { Box } from '@primer/react';
import TitleCase from './TitleCase';

interface Props {
  value?: string | null;
}

const NameDisplay = ({ value }: Props) => <Box minWidth="200px"><TitleCase value={value} /></Box>;

export default NameDisplay;
