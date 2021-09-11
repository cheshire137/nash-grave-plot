import React, { useMemo } from 'react';
import { useFilters, useTable, usePagination } from 'react-table';
import { matchSorter } from 'match-sorter';
import NashvilleCemeteries from '../nashville-cemeteries.json';
import Interment from '../models/Interment';
import AddressDisplay from './AddressDisplay';
import InscriptionDisplay from './InscriptionDisplay';
import LongTextBlock from './LongTextBlock';
import SelectColumnFilter from './SelectColumnFilter';
import TextFilter from './TextFilter';
import DateCellFormatter from './DateCellFormatter';
import PhotoList from './PhotoList';
import TitleCase from './TitleCase';
import NameDisplay from './NameDisplay';
import DiedDateDisplay from './DiedDateDisplay';
import InfoDisplay from './InfoDisplay';
import GraveyardTypeDisplay from './GraveyardTypeDisplay';
import DemarcationDisplay from './DemarcationDisplay';

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = val => !val;

const IntermentList = () => {
  const data = useMemo(() => NashvilleCemeteries.map(interment => new Interment(interment)), []);
  const defaultColumn = useMemo(() => ({ Filter: TextFilter }), []);
  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  const columns = useMemo(() => {
    return [
      {
        Header: 'Person',
        columns: [
          {
            Header: 'Name',
            accessor: 'person',
            filter: 'fuzzyText',
            Cell: NameDisplay
          },
          {
            Header: 'Died',
            accessor: 'deathDate',
            Cell: DiedDateDisplay
          },
          {
            Header: 'Info',
            accessor: 'deceasedInfo',
            Cell: InfoDisplay,
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
            filter: 'includes',
            Filter: SelectColumnFilter,
            Cell: NameDisplay
          },
          {
            Header: 'Address',
            accessor: 'address',
            Cell: AddressDisplay,
            filter: 'fuzzyText'
          },
          {
            Header: 'Graveyard Type',
            accessor: 'graveyardType',
            filter: 'includes',
            Filter: SelectColumnFilter,
            Cell: GraveyardTypeDisplay
          },
          {
            Header: 'Site History',
            accessor: 'siteHistory',
            Cell: InfoDisplay
          }
        ]
      },
      {
        Header: 'Marker/Plot',
        columns: [
          {
            Header: 'Inscription',
            accessor: 'inscription',
            Cell: InscriptionDisplay
          },
          {
            Header: 'Footstone',
            accessor: 'footstone',
            minWidth: 150,
            Cell: LongTextBlock
          },
          {
            Header: 'Demarcation',
            accessor: 'demarcation',
            Cell: DemarcationDisplay
          },
          {
            Header: 'Condition',
            accessor: 'condition',
            Cell: DemarcationDisplay
          },
          {
            Header: 'Accessible',
            accessor: 'accessible',
            filter: 'includes',
            Filter: SelectColumnFilter
          },
          {
            Header: 'Restoration',
            accessor: 'restoration',
            Cell: LongTextBlock
          },
          {
            Header: 'Photos',
            accessor: 'gravePhotos',
            Cell: PhotoList
          }
        ]
      },
      {
        Header: 'Notes',
        accessor: 'notes',
        minWidth: 300,
        Cell: LongTextBlock
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
            Cell: DateCellFormatter
          },
          {
            Header: 'Updates',
            accessor: 'surveyUpdates',
            Cell: DateCellFormatter
          },
          {
            Header: 'Current',
            accessor: 'currentSurvey',
            Cell: DateCellFormatter
          }
        ]
      }
    ];
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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
    </>
  );
};

export default IntermentList;
