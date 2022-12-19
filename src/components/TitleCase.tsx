import React from 'react';
import { Text } from '@primer/react';
import titleCaseify from '../models/titleCaseify';

interface Props {
  value?: string | null;
}

const TitleCase = ({ value }: Props) => {
  if (typeof value === 'string') return <Text>{titleCaseify(value)}</Text>;
  return null;
};

export default TitleCase;
