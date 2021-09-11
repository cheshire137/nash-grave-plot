import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useFilters, useTable, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';

const TableStyles = styled.div`
  table thead th {
    background-color: #f5f5f5;
  }
`;

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = val => !val;

const PaginatedTable = ({ columns, data, pageSize, defaultColumn }) => {
  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    pageOptions,
    state: {pageIndex},
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
  } = useTable({
    columns,
    data,
    initialState: { pageSize },
    defaultColumn,
    filterTypes
  }, useFilters, usePagination);

  return (
    <TableStyles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => previousPage()} disabled={!canPreviousPage}
        >&lt; Previous</button>
        <span>Page{' '}<em>{pageIndex + 1} of {pageOptions.length}</em>, {rows.length} graves</span>
        <label htmlFor="goToPage">Go to page:</label>
        <input
          id="goToPage"
          type="number"
          defaultValue={pageIndex + 1 || 1}
          onChange={e => gotoPage(e.target.value ? Number(e.target.value) - 1 : 0)}
        />
        <button
          onClick={() => nextPage()} disabled={!canNextPage}
        >Next &gt;</button>
      </div>
    </TableStyles>
  );
};

export default PaginatedTable;
