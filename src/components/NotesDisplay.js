import React from 'react';
import { Box } from '@primer/components';
import LongTextBlock from './LongTextBlock';

const NotesDisplay = ({ value }) => <Box minWidth="300px"><LongTextBlock value={value} /></Box>;

export default NotesDisplay;
