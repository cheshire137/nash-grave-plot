import React, { useMemo } from 'react';
import { NashvilleCemeteries } from '../models/NashvilleCemetery';
import Interment from '../models/Interment';
import AddressDisplay from './AddressDisplay';
import InscriptionDisplay from './InscriptionDisplay';
import LongTextBlock from './LongTextBlock';
import SelectColumnFilter from './SelectColumnFilter';
import AddressFilter from './AddressFilter';
import Filter from '../models/Filter';
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
import PaginatedTable from './PaginatedTable';
import Table from './Table';
import IntermentSort from '../models/IntermentSort';
import { Column, ColumnNamesByColumn } from '../models/Column';
import { Column as TableColumn, ColumnGroup as TableColumnGroup } from 'react-table';

const filterColumns = (enabledColumns: Column[], relevantColumns: TableColumn<Record<string, unknown>>[]) => {
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
    const interments = NashvilleCemeteries.map(cemeteryData => new Interment(cemeteryData));
    interments.sort(IntermentSort);
    return interments;
  }, []);

  const nameColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.person, accessor: 'person',
    filter: 'fuzzyText', Cell: NameDisplay };
  const deathDateColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.deathDate, accessor: 'deathDate',
    Cell: DiedDateDisplay };
  const deceasedInfoColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.deceasedInfo,
    accessor: 'deceasedInfo', Cell: InfoDisplay, filter: 'fuzzyText' };
  const personColumnGroup: TableColumnGroup<Record<string, unknown>> = {
    Header: 'Person',
    columns: filterColumns(enabledColumns, [nameColumn, deathDateColumn, deceasedInfoColumn])
  };

  const cemeteryColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.cemeteryName, accessor: 'cemeteryName',
    filter: 'includes', Filter: SelectColumnFilter, Cell: NameDisplay };
  const addressColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.address, accessor: 'address',
    Cell: AddressDisplay, filter: 'fuzzyText', Filter: AddressFilter };
  const graveyardTypeColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.graveyardType,
    accessor: 'graveyardType', filter: 'includes', Filter: SelectColumnFilter, Cell: GraveyardTypeDisplay };
  const siteHistoryColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.siteHistory,
    accessor: 'siteHistory', Cell: InfoDisplay };
  const locationColumnGroup: TableColumnGroup<Record<string, unknown>> = {
    Header: 'Location',
    columns: filterColumns(enabledColumns, [cemeteryColumn, addressColumn, graveyardTypeColumn, siteHistoryColumn])
  };

  const inscriptionColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.inscription,
    accessor: 'inscription', Cell: InscriptionDisplay };
  const footstoneColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.footstone, accessor: 'footstone',
    Cell: FootstoneDisplay };
  const demarcationColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.demarcation,
    accessor: 'demarcation', Cell: DemarcationDisplay };
  const conditionColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.condition, accessor: 'condition',
    Cell: DemarcationDisplay };
  const accessibleColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.accessible, accessor: 'accessible',
    filter: 'includes', Filter: SelectColumnFilter };
  const restorationColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.restoration,
    accessor: 'restoration', Cell: LongTextBlock };
  const photosColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.gravePhotos, accessor: 'gravePhotos',
    Cell: PhotoList };
  const markerColumnGroup: TableColumnGroup<Record<string, unknown>> = {
    Header: 'Marker/Plot',
    columns: filterColumns(enabledColumns, [inscriptionColumn, footstoneColumn, demarcationColumn, conditionColumn,
      accessibleColumn, restorationColumn, photosColumn])
  };

  const notesColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.notes, accessor: 'notes',
    Cell: NotesDisplay };
  const otherColumnGroup: TableColumnGroup<Record<string, unknown>> = { Header: '', id: 'other',
    columns: filterColumns(enabledColumns, [notesColumn]) };

  const tractParcelNumberColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.tractParcelNumber,
    accessor: 'tractParcelNumber', Cell: ParcelNumberDisplay };
  const cemeteryParcelNumberColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.cemeteryParcelNumber,
    accessor: 'cemeteryParcelNumber', Cell: ParcelNumberDisplay };
  const parcelNumberColumnGroup: TableColumnGroup<Record<string, unknown>> = {
    Header: 'Parcel Numbers',
    columns: filterColumns(enabledColumns, [tractParcelNumberColumn, cemeteryParcelNumberColumn])
  };

  const originalSurveyColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.originalSurvey,
    accessor: 'originalSurvey', Cell: DateCellFormatter };
  const surveyUpdatesColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.surveyUpdates,
    accessor: 'surveyUpdates', Cell: DateCellFormatter };
  const currentSurveyColumn: TableColumn<Record<string, unknown>> = { Header: ColumnNamesByColumn.currentSurvey,
    accessor: 'currentSurvey', Cell: DateCellFormatter };
  const surveyColumnGroup: TableColumnGroup<Record<string, unknown>> = {
    Header: 'Survey',
    columns: filterColumns(enabledColumns, [originalSurveyColumn, surveyUpdatesColumn, currentSurveyColumn])
  };

  const columns = useMemo(() => {
    return [personColumnGroup, locationColumnGroup, markerColumnGroup, otherColumnGroup, parcelNumberColumnGroup,
      surveyColumnGroup];
  }, [enabledColumns]);

  // return <PaginatedTable
  //   data={data}
  //   columns={columns}
  //   pageSize={10}
  //   defaultColumn={defaultColumn}
  //   setPageTitle={setPageTitle}
  //   filters={filters}
  // />;
  return <Table
    data={data}
    columns={columns}
    pageSize={10}
    setPageTitle={setPageTitle}
    filters={filters}
  />;
};

export default IntermentList;
