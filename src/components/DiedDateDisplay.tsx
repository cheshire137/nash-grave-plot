import React from 'react';
import { Box } from '@primer/react';
import DateCellFormatter from './DateCellFormatter';

const DiedDateDisplay = ({ value }) => <Box minWidth="130px"><DateCellFormatter value={value} /></Box>;

export default DiedDateDisplay;
