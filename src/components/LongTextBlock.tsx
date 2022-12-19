import React from 'react';
import { titleCase } from './TitleCase';
import type { CellProps } from 'react-table';
import ConstrainedTextBlock from './ConstrainedTextBlock';

const LongTextBlock = ({ value }: CellProps<Record<string, unknown>>) => typeof value === 'string' ? (
  <ConstrainedTextBlock>{titleCase(value)}</ConstrainedTextBlock>
) : null;

export default LongTextBlock;
