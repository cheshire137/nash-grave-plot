import React, { useMemo, useEffect } from 'react';
import { TableOptions, useTable, useFilters, usePagination } from 'react-table';
import TableStyles from './TableStyles';
import TableHeaderCell from './TableHeaderCell';
import Interment from '../models/Interment';
import { matchSorter } from 'match-sorter';
import { Box, Pagination } from '@primer/react';
import TableCell from './TableCell';

function fuzzyTextFilterFn(rows: any[], id: any, filterValue: any) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

const getPageTitle = (totalResults: number) => {
  if (totalResults === 1) return '1 result';
  if (totalResults > 1) return `${totalResults.toLocaleString('en-US')} results`;
  return 'No results';
}

interface Props extends TableOptions<Interment> {
  setPageTitle: (title: string) => void;
}

const Table = ({ columns, data, pageSize, defaultColumn, setPageTitle, filters }: Props) => {
  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    pageOptions,
    state: { pageIndex },
    gotoPage,
  } = useTable({
    columns,
    data,
    initialState: { pageSize, filters: filters || [] },
    defaultColumn,
    filterTypes,
  // }, useFilters, usePagination);
  }, usePagination);

  const totalPages = pageOptions.length;

  useEffect(() => setPageTitle(getPageTitle(rows.length)), [rows.length, setPageTitle])

  return <>
    <TableStyles>
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
          {page.map(row => {
            prepareRow(row);
            return <tr {...row.getRowProps()}>
              {row.cells.map(cell => <TableCell {...cell.getCellProps()}>
                {cell.render('Cell')}
              </TableCell>)}
            </tr>;
          })}
        </tbody>
      </table>
    </TableStyles>
    {totalPages > 1 && (
      <Pagination
        pageCount={totalPages}
        currentPage={pageIndex + 1}
        onPageChange={(e, page) => {
          e.preventDefault();
          gotoPage(page - 1);
        }}
      />
    )}
  </>;
};

export default Table;
