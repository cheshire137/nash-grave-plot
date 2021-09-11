import React from 'react';
import { Text } from '@primer/components';

export const titleCase = str => str.toLowerCase().split(/\s+/)
  .map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');

const TitleCase = ({ value }) => typeof value === 'string' ? <Text>{titleCase(value)}</Text> : null;

export default TitleCase;
