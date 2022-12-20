import styled from 'styled-components';
import { Box } from '@primer/react';

const TableHeaderCell = styled(Box).attrs({
  as: 'th',
  p: 2,
  borderBottom: '1px solid #e5e5e5',
  position: 'relative',
})`
  background-color: #f5f5f5;
  white-space: nowrap;
`;

export default TableHeaderCell;
