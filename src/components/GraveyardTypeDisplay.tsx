import React from 'react';
import { Box, Text } from '@primer/react';

interface Props {
  value?: string | null;
}

const GraveyardTypeDisplay = ({ value }) => <Box minWidth="130px">
  <Text textAlign="center" as="div">{value}</Text>
</Box>;

export default GraveyardTypeDisplay;