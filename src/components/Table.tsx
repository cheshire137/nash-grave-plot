import React, { useMemo } from 'react';
import { TableOptions, useTable } from 'react-table';
import TableStyles from './TableStyles';
import TableHeaderCell from './TableHeaderCell';
import Interment from '../models/Interment';
import { matchSorter } from 'match-sorter';
import { Box } from '@primer/react';
import TableCell from './TableCell';

function fuzzyTextFilterFn(rows: any[], id: any, filterValue: any) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

interface Props extends TableOptions<Interment> {
  setPageTitle: (title: string) => void;
}

const Table = ({ columns, data, defaultColumn, setPageTitle, filters }: Props) => {
  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: { filters: filters || [] },
    defaultColumn,
    filterTypes,
  });

  const totalResults = rows.length;
  if (totalResults === 1) {
    setPageTitle('1 result');
  } else if (totalResults > 1) {
    setPageTitle(`${totalResults.toLocaleString('en-US')} results`);
  } else {
    setPageTitle('No results');
  }

  return <TableStyles>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => <TableHeaderCell {...column.getHeaderProps()}>
            {column.render('Header')}
            {column.canFilter && <Box mt="1">{column.render('Filter')}</Box>}
          </TableHeaderCell>)}
        </tr>)}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => <TableCell {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>)}
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  </TableStyles>;
};

export default Table;
