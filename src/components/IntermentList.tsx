import React, { useEffect, useMemo, useRef, useContext, useState } from 'react';
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
import PhotoColumnFilter from './PhotoColumnFilter';
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
import { intermentFieldLabels } from '../utils/intermentFieldLabels';
import type IntermentField from '../types/IntermentField';
import { useTable, useFilters, usePagination, Column as TableColumn } from 'react-table';
import { fuzzyTextFilter } from '../utils/fuzzyTextFilter';
import { minArrayLengthFilter } from '../utils/minArrayLengthFilter';
import { Pagination } from '@primer/react';
import getPageTitleForResults from '../utils/getPageTitleForResults';
import { WindowContext } from '../contexts/WindowContext';

const filterTypes = { fuzzyText: fuzzyTextFilter, minArrayLength: minArrayLengthFilter };

const filterColumns = (enabledIntermentFields: IntermentField[], relevantColumns: TableColumn[]) => {
  const enabledPropStrs: string[] = enabledIntermentFields;
  return relevantColumns.filter(column => {
    if (typeof column.accessor === 'string') {
      return enabledPropStrs.includes(column.accessor);
    }
    return false;
  });
};

interface Props {
  enabledIntermentFields: IntermentField[];
  setPageTitle: (title: string) => void;
  filters: Filter[];
}

const IntermentList = ({ enabledIntermentFields, setPageTitle, filters }: Props) => {
  const data = useMemo(() => {
    const interments = (cemeteriesList as NashvilleCemeteryData[]).map(data => new Interment(data));
    interments.sort(IntermentSort);
    return interments;
  }, []);
  const defaultColumn = useMemo(() => ({
    Filter: TextFilter,
  }), []);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const { clientHeight: viewportHeight } = useContext(WindowContext);
  const [viewportHeightAtLastPageSizeChange, setViewportHeightAtLastPageSizeChange] = useState<number>(0);

  const columns = useMemo(() => {
    const nameColumn = { Header: intermentFieldLabels.person, accessor: 'person', filter: 'fuzzyText',
      Cell: NameDisplay };
    const deathDateColumn = { Header: intermentFieldLabels.deathDate, accessor: 'deathDate', Cell: DiedDateDisplay };
    const deceasedInfoColumn = { Header: intermentFieldLabels.deceasedInfo, accessor: 'deceasedInfo',
      Cell: InfoDisplay, filter: 'fuzzyText' };
    const personColumnGroup = { Header: 'Person',
      columns: filterColumns(enabledIntermentFields, [nameColumn, deathDateColumn, deceasedInfoColumn]) };

    const cemeteryColumn = { Header: intermentFieldLabels.cemeteryName, accessor: 'cemeteryName', filter: 'includes',
      Filter: SelectColumnFilter, Cell: NameDisplay };
    const addressColumn = { Header: intermentFieldLabels.address, accessor: 'address', Cell: AddressDisplay,
      filter: 'fuzzyText', Filter: AddressFilter };
    const graveyardTypeColumn = { Header: intermentFieldLabels.graveyardType, accessor: 'graveyardType',
      filter: 'includes', Filter: SelectColumnFilter, Cell: GraveyardTypeDisplay };
    const siteHistoryColumn = { Header: intermentFieldLabels.siteHistory, accessor: 'siteHistory', Cell: InfoDisplay };
    const locationColumnGroup = { Header: 'Location', columns: filterColumns(enabledIntermentFields, [cemeteryColumn,
      addressColumn, graveyardTypeColumn, siteHistoryColumn]) };

    const inscriptionColumn = { Header: intermentFieldLabels.inscription, accessor: 'inscription',
      Cell: InscriptionDisplay };
    const footstoneColumn = { Header: intermentFieldLabels.footstone, accessor: 'footstone', Cell: FootstoneDisplay };
    const demarcationColumn = { Header: intermentFieldLabels.demarcation, accessor: 'demarcation',
      Cell: DemarcationDisplay };
    const conditionColumn = { Header: intermentFieldLabels.condition, accessor: 'condition',
      Cell: DemarcationDisplay };
    const accessibleColumn = { Header: intermentFieldLabels.accessible, accessor: 'accessible', filter: 'includes',
      Filter: SelectColumnFilter };
    const restorationColumn = { Header: intermentFieldLabels.restoration, accessor: 'restoration',
      Cell: LongTextBlock };
    const photosColumn = { Header: intermentFieldLabels.gravePhotos, accessor: 'gravePhotos', Cell: PhotoList,
      Filter: PhotoColumnFilter, filter: 'minArrayLength' };
    const markerColumnGroup = { Header: 'Marker/Plot', columns: filterColumns(enabledIntermentFields, [inscriptionColumn,
      footstoneColumn, demarcationColumn, conditionColumn, accessibleColumn, restorationColumn, photosColumn]) };

    const notesColumn = { Header: intermentFieldLabels.notes, accessor: 'notes', Cell: NotesDisplay };
    const otherColumnGroup = { Header: '', id: 'other', columns: filterColumns(enabledIntermentFields, [notesColumn]) };

    const tractParcelNumberColumn = { Header: intermentFieldLabels.tractParcelNumber, accessor: 'tractParcelNumber',
      Cell: ParcelNumberDisplay };
    const cemeteryParcelNumberColumn = { Header: intermentFieldLabels.cemeteryParcelNumber,
      accessor: 'cemeteryParcelNumber', Cell: ParcelNumberDisplay };
    const parcelNumberColumnGroup = { Header: 'Parcel Numbers',
      columns: filterColumns(enabledIntermentFields, [tractParcelNumberColumn, cemeteryParcelNumberColumn]) };

    const originalSurveyColumn = { Header: intermentFieldLabels.originalSurvey, accessor: 'originalSurvey',
      Cell: DateCellFormatter };
    const surveyUpdatesColumn = { Header: intermentFieldLabels.surveyUpdates, accessor: 'surveyUpdates',
      Cell: DateCellFormatter };
    const currentSurveyColumn = { Header: intermentFieldLabels.currentSurvey, accessor: 'currentSurvey',
      Cell: DateCellFormatter };
    const surveyColumnGroup = { Header: 'Survey',
      columns: filterColumns(enabledIntermentFields, [originalSurveyColumn, surveyUpdatesColumn, currentSurveyColumn]) };

    return [personColumnGroup, locationColumnGroup, markerColumnGroup, otherColumnGroup, parcelNumberColumnGroup,
      surveyColumnGroup];
  }, [enabledIntermentFields]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable<Interment>({
    columns,
    data,
    initialState: { pageSize: 10, filters: filters || [] },
    defaultColumn,
    filterTypes,
  }, useFilters, usePagination);

  const totalPages = pageOptions.length;

  useEffect(() => setPageTitle(getPageTitleForResults(rows.length)), [rows.length, setPageTitle])

  useEffect(() => {
    if (tableBodyRef && tableBodyRef.current) {
      const tbody = tableBodyRef.current;
      const rows = tbody.querySelectorAll('tr');
      if (rows.length < 1) return;

      const rect = tbody.getBoundingClientRect();
      let targetAreaHeight = rect.height;
      let availableHeight = viewportHeight - rect.top;
      let spaceBetweenPaginationAndTable = 0;
      let paginationHeight = 0;
      if (paginationRef && paginationRef.current) {
        const paginationRect = paginationRef.current.getBoundingClientRect();
        spaceBetweenPaginationAndTable += paginationRect.top - rect.bottom;
        paginationHeight = paginationRect.height;
        targetAreaHeight += paginationHeight + spaceBetweenPaginationAndTable;
        availableHeight -= paginationHeight - spaceBetweenPaginationAndTable;
      }

      if (targetAreaHeight > availableHeight) { // need to reduce page size
        let newPageSize = 1;
        let totalRowHeight = rows[0].clientHeight + spaceBetweenPaginationAndTable + paginationHeight;
        while (totalRowHeight < availableHeight) {
          const nextRow = rows[newPageSize];
          if (!nextRow) break;

          const rowHeight = nextRow.clientHeight;
          if (totalRowHeight + rowHeight > availableHeight) break;

          totalRowHeight += rowHeight;
          newPageSize++;
        }

        if (newPageSize != pageSize) {
          setViewportHeightAtLastPageSizeChange(viewportHeight);
          setPageSize(newPageSize);
        }
      } else if (targetAreaHeight < availableHeight && viewportHeightAtLastPageSizeChange !== viewportHeight) { // might be able to increase page size
        const rowHeights = Array.from(rows).map(row => row.clientHeight);
        const avgRowHeight = rowHeights.reduce((a, b) => a + b, 0) / rowHeights.length;
        const heightDiff = availableHeight - targetAreaHeight;
        const rowsToAdd = Math.floor(heightDiff / avgRowHeight);

        if (rowsToAdd > 0) {
          setViewportHeightAtLastPageSizeChange(viewportHeight);
          setPageSize(pageSize + rowsToAdd);
        }
      }
    }
  }, [tableBodyRef, paginationRef, viewportHeight, pageSize, setPageSize])

  return <>
    <TableStyles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => <TableHeaderCell {...column.getHeaderProps()}>
              {column.render('Header')}
              {column.canFilter && column.Filter && <>{column.render('Filter')}</>}
            </TableHeaderCell>)}
          </tr>)}
        </thead>
        <tbody ref={tableBodyRef} {...getTableBodyProps()}>
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
    {totalPages > 1 && <div ref={paginationRef}>
      <Pagination pageCount={totalPages}
        currentPage={pageIndex + 1}
        onPageChange={(e, page) => {
          e.preventDefault();
          gotoPage(page - 1);
        }}
      />
    </div>}
  </>;
};

export default IntermentList;
