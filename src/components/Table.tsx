import { TableOptions, useTable } from 'react-table';
import TableStyles from './TableStyles';
import Interment from '../models/Interment';

interface Props extends TableOptions<Interment> {
  setPageTitle: (title: string) => void;
}

const Table = ({ columns, data, setPageTitle }: Props) => {
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
    </table>
  </TableStyles>;
};

export default Table;
