import React, { useEffect, useMemo } from 'react';
import TableStyles from './TableStyles';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';
import NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import cemeteriesList from '../nashville-cemeteries.json';
import Interment from '../models/Interment';
import AddressDisplay from './AddressDisplay';
import InscriptionDisplay from './InscriptionDisplay';
import LongTextBlock from './LongTextBlock';
import SelectColumnFilter from './SelectColumnFilter';
import AddressFilter from './AddressFilter';
import Filter from '../models/Filter';
import TextFilter from './TextFilter';
import DateCellFormatter from './DateCellFormatter';
import PhotoList from './PhotoList';
import NameDisplay from './NameDisplay';
import DiedDateDisplay from './DiedDateDisplay';
import InfoDisplay from './InfoDisplay';
import GraveyardTypeDisplay from './GraveyardTypeDisplay';
import DemarcationDisplay from './DemarcationDisplay';
import FootstoneDisplay from './FootstoneDisplay';
import NotesDisplay from './NotesDisplay';
import ParcelNumberDisplay from './ParcelNumberDisplay';
import IntermentSort from '../models/IntermentSort';
import { Column, ColumnNamesByColumn } from '../models/Column';
import { useTable, useFilters, usePagination, Column as TableColumn } from 'react-table';
import { fuzzyTextFilter } from '../utils/fuzzyTextFilter';
import { Box, Pagination } from '@primer/react';
import getPageTitleForResults from '../utils/getPageTitleForResults';

const filterTypes = { fuzzyText: fuzzyTextFilter };

const filterColumns = (enabledColumns: Column[], relevantColumns: TableColumn[]) => {
  const enabledColumnNames: string[] = enabledColumns;
  return relevantColumns.filter(column => {
    if (typeof column.accessor === 'string') {
      return enabledColumnNames.includes(column.accessor);
    }
    return false;
  });
};

interface Props {
  enabledColumns: Column[];
  setPageTitle: (title: string) => void;
  filters: Filter[];
}

const IntermentList = ({ enabledColumns, setPageTitle, filters }: Props) => {
  const data = useMemo(() => {
    const interments = (cemeteriesList as NashvilleCemeteryData[]).map(data => new Interment(data));
    interments.sort(IntermentSort);
    return interments;
  }, []);
  const defaultColumn = useMemo(() => ({
    Filter: TextFilter,
  }), []);

  const columns = useMemo(() => {
    const nameColumn = { Header: ColumnNamesByColumn.person, accessor: 'person', filter: 'fuzzyText',
      Cell: NameDisplay };
    const deathDateColumn = { Header: ColumnNamesByColumn.deathDate, accessor: 'deathDate', Cell: DiedDateDisplay };
    const deceasedInfoColumn = { Header: ColumnNamesByColumn.deceasedInfo, accessor: 'deceasedInfo',
      Cell: InfoDisplay, filter: 'fuzzyText' };
    const personColumnGroup = { Header: 'Person',
      columns: filterColumns(enabledColumns, [nameColumn, deathDateColumn, deceasedInfoColumn]) };

    const cemeteryColumn = { Header: ColumnNamesByColumn.cemeteryName, accessor: 'cemeteryName', filter: 'includes',
      Filter: SelectColumnFilter, Cell: NameDisplay };
    const addressColumn = { Header: ColumnNamesByColumn.address, accessor: 'address', Cell: AddressDisplay,
      filter: 'fuzzyText', Filter: AddressFilter };
    const graveyardTypeColumn = { Header: ColumnNamesByColumn.graveyardType, accessor: 'graveyardType',
      filter: 'includes', Filter: SelectColumnFilter, Cell: GraveyardTypeDisplay };
    const siteHistoryColumn = { Header: ColumnNamesByColumn.siteHistory, accessor: 'siteHistory', Cell: InfoDisplay };
    const locationColumnGroup = { Header: 'Location', columns: filterColumns(enabledColumns, [cemeteryColumn,
      addressColumn, graveyardTypeColumn, siteHistoryColumn]) };

    const inscriptionColumn = { Header: ColumnNamesByColumn.inscription, accessor: 'inscription',
      Cell: InscriptionDisplay };
    const footstoneColumn = { Header: ColumnNamesByColumn.footstone, accessor: 'footstone', Cell: FootstoneDisplay };
    const demarcationColumn = { Header: ColumnNamesByColumn.demarcation, accessor: 'demarcation',
      Cell: DemarcationDisplay };
    const conditionColumn = { Header: ColumnNamesByColumn.condition, accessor: 'condition',
      Cell: DemarcationDisplay };
    const accessibleColumn = { Header: ColumnNamesByColumn.accessible, accessor: 'accessible', filter: 'includes',
      Filter: SelectColumnFilter };
    const restorationColumn = { Header: ColumnNamesByColumn.restoration, accessor: 'restoration',
      Cell: LongTextBlock };
    const photosColumn = { Header: ColumnNamesByColumn.gravePhotos, accessor: 'gravePhotos', Cell: PhotoList };
    const markerColumnGroup = { Header: 'Marker/Plot', columns: filterColumns(enabledColumns, [inscriptionColumn,
      footstoneColumn, demarcationColumn, conditionColumn, accessibleColumn, restorationColumn, photosColumn]) };

    const notesColumn = { Header: ColumnNamesByColumn.notes, accessor: 'notes', Cell: NotesDisplay };
    const otherColumnGroup = { Header: '', id: 'other', columns: filterColumns(enabledColumns, [notesColumn]) };

    const tractParcelNumberColumn = { Header: ColumnNamesByColumn.tractParcelNumber, accessor: 'tractParcelNumber',
      Cell: ParcelNumberDisplay };
    const cemeteryParcelNumberColumn = { Header: ColumnNamesByColumn.cemeteryParcelNumber,
      accessor: 'cemeteryParcelNumber', Cell: ParcelNumberDisplay };
    const parcelNumberColumnGroup = { Header: 'Parcel Numbers',
      columns: filterColumns(enabledColumns, [tractParcelNumberColumn, cemeteryParcelNumberColumn]) };

    const originalSurveyColumn = { Header: ColumnNamesByColumn.originalSurvey, accessor: 'originalSurvey',
      Cell: DateCellFormatter };
    const surveyUpdatesColumn = { Header: ColumnNamesByColumn.surveyUpdates, accessor: 'surveyUpdates',
      Cell: DateCellFormatter };
    const currentSurveyColumn = { Header: ColumnNamesByColumn.currentSurvey, accessor: 'currentSurvey',
      Cell: DateCellFormatter };
    const surveyColumnGroup = { Header: 'Survey',
      columns: filterColumns(enabledColumns, [originalSurveyColumn, surveyUpdatesColumn, currentSurveyColumn]) };

    return [personColumnGroup, locationColumnGroup, markerColumnGroup, otherColumnGroup, parcelNumberColumnGroup,
      surveyColumnGroup];
  }, [enabledColumns]);

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
  } = useTable<Interment>({
    columns,
    data,
    initialState: { pageSize: 10, filters: filters || [] },
    defaultColumn,
    filterTypes,
  }, useFilters, usePagination);

  const totalPages = pageOptions.length;

  useEffect(() => setPageTitle(getPageTitleForResults(rows.length)), [rows.length, setPageTitle])

  return <>
    <TableStyles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => <TableHeaderCell {...column.getHeaderProps()}>
              {column.render('Header')}
              {column.canFilter && column.Filter && <Box mt="1">{column.render('Filter')}</Box>}
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
    {totalPages > 1 && <Pagination
      pageCount={totalPages}
      currentPage={pageIndex + 1}
      onPageChange={(e, page) => {
        e.preventDefault();
        gotoPage(page - 1);
      }}
    />}
  </>;
};

export default IntermentList;
