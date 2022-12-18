import React, { useMemo } from 'react';
import { NashvilleCemeteries } from '../models/NashvilleCemetery';
import Interment from '../models/Interment';
import AddressDisplay from './AddressDisplay';
import InscriptionDisplay from './InscriptionDisplay';
import LongTextBlock from './LongTextBlock';
import SelectColumnFilter from './SelectColumnFilter';
import TextFilter from './TextFilter';
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

const filterColumns = (enabledColumns: Column[], relevantColumns: TableColumn<Interment>[]) => {
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
  const defaultColumn = useMemo(() => ({ Filter: TextFilter }), []);

  const nameColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.person, accessor: 'person',
    filter: 'fuzzyText', Cell: NameDisplay };
  const deathDateColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.deathDate, accessor: 'deathDate',
    Cell: DiedDateDisplay };
  const deceasedInfoColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.deceasedInfo,
    accessor: 'deceasedInfo', Cell: InfoDisplay, filter: 'fuzzyText' };
  const personColumnGroup: TableColumnGroup<Interment> = {
    Header: 'Person',
    columns: filterColumns(enabledColumns, [nameColumn, deathDateColumn, deceasedInfoColumn])
  };

  const cemeteryColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.cemeteryName, accessor: 'cemeteryName',
    filter: 'includes', Filter: SelectColumnFilter, Cell: NameDisplay };
  const addressColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.address, accessor: 'address',
    Cell: AddressDisplay, filter: 'fuzzyText', Filter: AddressFilter };
  const graveyardTypeColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.graveyardType,
    accessor: 'graveyardType', filter: 'includes', Filter: SelectColumnFilter, Cell: GraveyardTypeDisplay };
  const siteHistoryColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.siteHistory,
    accessor: 'siteHistory', Cell: InfoDisplay };
  const locationColumnGroup: TableColumnGroup<Interment> = {
    Header: 'Location',
    columns: filterColumns(enabledColumns, [cemeteryColumn, addressColumn, graveyardTypeColumn, siteHistoryColumn])
  };

  const inscriptionColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.inscription,
    accessor: 'inscription', Cell: InscriptionDisplay };
  const footstoneColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.footstone, accessor: 'footstone',
    Cell: FootstoneDisplay };
  const demarcationColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.demarcation,
    accessor: 'demarcation', Cell: DemarcationDisplay };
  const conditionColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.condition, accessor: 'condition',
    Cell: DemarcationDisplay };
  const accessibleColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.accessible, accessor: 'accessible',
    filter: 'includes', Filter: SelectColumnFilter };
  const restorationColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.restoration,
    accessor: 'restoration', Cell: LongTextBlock };
  const photosColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.gravePhotos, accessor: 'gravePhotos',
    Cell: PhotoList };
  const markerColumnGroup: TableColumnGroup<Interment> = {
    Header: 'Marker/Plot',
    columns: filterColumns(enabledColumns, [inscriptionColumn, footstoneColumn, demarcationColumn, conditionColumn,
      accessibleColumn, restorationColumn, photosColumn])
  };

  const notesColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.notes, accessor: 'notes',
    Cell: NotesDisplay };
  const otherColumnGroup: TableColumnGroup<Interment> = { Header: '', id: 'other',
    columns: filterColumns(enabledColumns, [notesColumn]) };

  const tractParcelNumberColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.tractParcelNumber,
    accessor: 'tractParcelNumber', Cell: ParcelNumberDisplay };
  const cemeteryParcelNumberColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.cemeteryParcelNumber,
    accessor: 'cemeteryParcelNumber', Cell: ParcelNumberDisplay };
  const parcelNumberColumnGroup: TableColumnGroup<Interment> = {
    Header: 'Parcel Numbers',
    columns: filterColumns(enabledColumns, [tractParcelNumberColumn, cemeteryParcelNumberColumn])
  };

  const originalSurveyColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.originalSurvey,
    accessor: 'originalSurvey', Cell: DateCellFormatter };
  const surveyUpdatesColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.surveyUpdates,
    accessor: 'surveyUpdates', Cell: DateCellFormatter };
  const currentSurveyColumn: TableColumn<Interment> = { Header: ColumnNamesByColumn.currentSurvey,
    accessor: 'currentSurvey', Cell: DateCellFormatter };
  const surveyColumnGroup: TableColumnGroup<Interment> = {
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
    defaultColumn={defaultColumn}
  />;
};

export default IntermentList;
