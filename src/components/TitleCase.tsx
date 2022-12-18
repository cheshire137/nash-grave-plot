import React from 'react';
import { Text } from '@primer/react';

interface Props {
  value?: string | null;
}

export const titleCase = (str: string) => str.toLowerCase().split(/\s+/)
  .filter(word => word.length > 0)
  .map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');

const TitleCase = ({ value }: Props) => typeof value === 'string' ? <Text>{titleCase(value)}</Text> : null;

export default TitleCase;
