import React from 'react';
import { Box } from '@primer/react';
import LongTextBlock from './LongTextBlock';

interface Props {
  value?: string | null;
}

const NotesDisplay = ({ value }: Props) => <Box minWidth="300px" textAlign="left">
  <LongTextBlock value={value} />
</Box>;

export default NotesDisplay;
