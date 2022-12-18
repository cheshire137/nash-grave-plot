import styled from 'styled-components';
import { Box } from '@primer/react';

const TableHeaderCell = styled(Box).attrs({
  as: 'th',
  p: 2,
  borderBottom: '1px solid #e5e5e5'
})`
  background-color: #f5f5f5;
`;

export default TableHeaderCell;
