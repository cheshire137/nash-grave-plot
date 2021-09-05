import React, { useMemo } from 'react';
import { useFilters, useTable, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';
import NashvilleCemeteries from '../nashville-cemeteries.json';
import Interment from '../models/Interment';
import PhotoDisplay from './PhotoDisplay';
import AddressDisplay from './AddressDisplay';
import InscriptionDisplay from './InscriptionDisplay';

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      const option = row.values[id].replaceAll(/\s+/g, '');
      if (option.length > 0) {
        options.add(option);
      }
    })
    const sortedOptions = [...options.values()];
    sortedOptions.sort();
    return sortedOptions;
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      style={{ width: "100%" }}
      onChange={e => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>
  )
}

function DefaultColumnFilter({
  column: { filterValue, setFilter }
}) {
  return (
    <input
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder="Filter"
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}
fuzzyTextFilterFn.autoRemove = val => !val

const IntermentList = () => {
  const data = useMemo(() => NashvilleCemeteries.map(interment => new Interment(interment)), []);

  const defaultColumn = useMemo(() => ({
    Filter: DefaultColumnFilter,
  }), []);

  const formatAddress = ({value}) => {
    return <AddressDisplay {...value} />
  };

  const formatInscription = ({value}) => {
    return <InscriptionDisplay {...value} />
  };

  const formatGravePhotos = ({value}) => {
    return (
      <div>
        {value.map(photo => (
          <PhotoDisplay {...photo} key={photo.text} />
        ))}
      </div>
    )
  };

  const formatDateCell = ({ value }) => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      let month = value.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = value.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    }

    return value;
  };

  const formatLongText = ({value}) => {
    return (
      <div
        className="ws-normal constrained-text"
      >{value}</div>
    );
  };

  const filterTypes = useMemo(() => {
    return { fuzzyText: fuzzyTextFilterFn };
  }, []);

  const columns = [
    {
      Header: 'Person',
      columns: [
        {
          Header: 'Name',
          accessor: 'person',
          minWidth: 200,
          filter: 'fuzzyText'
        },
        {
          Header: 'Died',
          accessor: 'deathDate',
          minWidth: 130,
          Cell: formatDateCell
        },
        {
          Header: 'Info',
          accessor: 'deceasedInfo',
          Cell: formatLongText,
          minWidth: 180,
          filter: 'fuzzyText'
        }
      ]
    },
    {
      Header: 'Location',
      columns: [
        {
          Header: 'Cemetery',
          accessor: 'cemeteryName',
          minWidth: 200,
          filter: 'includes',
          Filter: SelectColumnFilter,
          Cell: formatLongText
        },
        {
          Header: 'Address',
          accessor: 'address',
          minWidth: 200,
          Cell: formatAddress,
          filter: 'fuzzyText'
        },
        {
          Header: 'Graveyard Type',
          accessor: 'graveyardType',
          minWidth: 130,
          filter: 'includes',
          Filter: SelectColumnFilter
        },
        {
          Header: 'Site History',
          accessor: 'siteHistory',
          Cell: formatLongText,
          minWidth: 180
        }
      ]
    },
    {
      Header: 'Marker/Plot',
      columns: [
        {
          Header: 'Inscription',
          accessor: 'inscription',
          minWidth: 200,
          Cell: formatInscription
        },
        {
          Header: 'Footstone',
          accessor: 'footstone',
          minWidth: 150,
          Cell: formatLongText
        },
        {
          Header: 'Demarcation',
          accessor: 'demarcation',
          minWidth: 140
        },
        {
          Header: 'Condition',
          accessor: 'condition',
          minWidth: 140
        },
        {
          Header: 'Accessible',
          accessor: 'accessible',
          filter: 'includes',
          Filter: SelectColumnFilter
        },
        {
          Header: 'Restoration',
          accessor: 'restoration'
        },
        {
          Header: 'Photos',
          accessor: 'gravePhotos',
          Cell: formatGravePhotos,
          minWidth: 120
        }
      ]
    },
    {
      Header: 'Notes',
      accessor: 'notes',
      minWidth: 300,
      Cell: formatLongText
    },
    {
      Header: 'Parcel Numbers',
      columns: [
        {
          Header: 'Tract',
          accessor: 'tractParcelNumber',
          minWidth: 130
        },
        {
          Header: 'Cemetery',
          accessor: 'cemeteryParcelNumber',
          minWidth: 150
        }
      ]
    },
    {
      Header: 'Survey',
      columns: [
        {
          Header: 'Original',
          accessor: 'originalSurvey',
          minWidth: 130,
          Cell: formatDateCell
        },
        {
          Header: 'Updates',
          accessor: 'surveyUpdates',
          minWidth: 130,
          Cell: formatDateCell
        },
        {
          Header: 'Current',
          accessor: 'currentSurvey',
          minWidth: 130,
          Cell: formatDateCell
        }
      ]
    }
  ];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    state: { pageIndex },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 20 },
    defaultColumn,
    filterTypes
  }, useFilters, usePagination);

  return (
    <>
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
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          &lt; Previous
        </button>
        <div>
          Page{' '}
          <em>{pageIndex + 1} of {pageOptions.length}</em>
        </div>
        <label htmlFor="goToPage">Go to page:</label>
        <input
          id="goToPage"
          type="number"
          defaultValue={pageIndex + 1 || 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
        />
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next &gt;
        </button>
      </div>
    </>
  );
};

export default IntermentList;
