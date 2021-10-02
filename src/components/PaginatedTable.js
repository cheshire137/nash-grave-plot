import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Pagination } from '@primer/components';
import { useFilters, useTable, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';

const TableHeaderCell = styled(Box).attrs({
  as: 'th',
  p: 2,
  borderBottom: '1px solid #e5e5e5'
})`
  background-color: #f5f5f5;
`;

const TableCell = styled(Box).attrs({
  as: 'td',
  p: 2,
  verticalAlign: 'top',
  textAlign: 'center',
  borderBottom: '1px solid #e5e5e5'
})`
`;

const TableStyles = styled.div`
  width: 100%;
  overflow-x: auto;

  tr:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = val => !val;

const PaginatedTable = ({ columns, data, pageSize, defaultColumn, setPageTitle, filters }) => {
  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    state: {pageIndex},
    gotoPage,
    rows
  } = useTable({
    columns,
    data,
    initialState: { pageSize, filters: filters || [] },
    defaultColumn,
    filterTypes
  }, useFilters, usePagination);

  const totalPages = pageOptions.length;
  const totalResults = rows.length;
  if (totalResults === 1) {
    setPageTitle('1 result');
  } else if (totalResults > 1) {
    setPageTitle(`${totalResults.toLocaleString('en-US')} results`);
  } else {
    setPageTitle('No results');
  }

  return (
    <>
      <TableStyles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableHeaderCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <Box mt="1">{column.canFilter ? column.render('Filter') : null}</Box>
                  </TableHeaderCell>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>)}
                </tr>
              );
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
    </>
  );
};

export default PaginatedTable;
