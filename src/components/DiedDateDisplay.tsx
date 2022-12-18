import React from 'react';
import { Box } from '@primer/react';
import DateCellFormatter from './DateCellFormatter';

interface Props {
  value: Date | string | null;
}

const DiedDateDisplay = ({ value }: Props) => <Box minWidth="130px"><DateCellFormatter value={value} /></Box>;

export default DiedDateDisplay;
