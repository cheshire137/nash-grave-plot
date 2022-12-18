import { TableOptions, useTable } from 'react-table';

const Table = ({ columns, data }: TableOptions<{}>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return <table {...getTableProps()}>
    <thead>
      {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => <th {...column.getHeaderProps()}>
          {column.render('Header')}
        </th>)}
      </tr>)}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(
        (row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => <td {...cell.getCellProps()}>
                {cell.render('Cell')}
              </td>)}
            </tr>
          );
        },
      )}
    </tbody>
  </table>;
};

export default Table;
