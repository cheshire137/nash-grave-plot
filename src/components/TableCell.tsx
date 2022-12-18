import styled from 'styled-components';
import { Box } from '@primer/react';

const TableCell = styled(Box).attrs({
  as: 'td',
  p: 2,
  verticalAlign: 'top',
  textAlign: 'center',
  borderBottom: '1px solid #e5e5e5'
})`
`;

export default TableCell;
