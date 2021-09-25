import React, { useMemo } from 'react';
import NashvilleCemeteries from '../nashville-cemeteries.json';
import Interment from '../models/Interment';
import AddressDisplay from './AddressDisplay';
import InscriptionDisplay from './InscriptionDisplay';
import LongTextBlock from './LongTextBlock';
import SelectColumnFilter from './SelectColumnFilter';
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
import PaginatedTable from './PaginatedTable';
import IntermentSort from '../models/IntermentSort';
import Column from '../models/Column';

const filterColumns = (enabledColumnNames, relevantColumns) => {
  return relevantColumns.filter(column => enabledColumnNames.includes(column.accessor));
};

const IntermentList = ({ enabledColumns }) => {
  const data = useMemo(() => {
    const interments = NashvilleCemeteries.map(interment => new Interment(interment));
    interments.sort(IntermentSort);
    return interments;
  }, []);
  const defaultColumn = useMemo(() => ({ Filter: TextFilter }), []);

  const nameColumn = { Header: Column.names.person, accessor: 'person', filter: 'fuzzyText', Cell: NameDisplay };
  const deathDateColumn = { Header: Column.names.deathDate, accessor: 'deathDate', Cell: DiedDateDisplay };
  const deceasedInfoColumn = { Header: Column.names.deceasedInfo, accessor: 'deceasedInfo', Cell: InfoDisplay, filter: 'fuzzyText' };
  const personColumnGroup = {
    Header: 'Person',
    columns: filterColumns(enabledColumns, [nameColumn, deathDateColumn, deceasedInfoColumn])
  };

  const cemeteryColumn = { Header: Column.names.cemeteryName, accessor: 'cemeteryName', filter: 'includes',
    Filter: SelectColumnFilter, Cell: NameDisplay };
  const addressColumn = { Header: Column.names.address, accessor: 'address', Cell: AddressDisplay,
    filter: 'fuzzyText' };
  const graveyardTypeColumn = { Header: Column.names.graveyardType, accessor: 'graveyardType', filter: 'includes',
    Filter: SelectColumnFilter, Cell: GraveyardTypeDisplay };
  const siteHistoryColumn = { Header: Column.names.siteHistory, accessor: 'siteHistory', Cell: InfoDisplay };
  const locationColumnGroup = {
    Header: 'Location',
    columns: filterColumns(enabledColumns, [cemeteryColumn, addressColumn, graveyardTypeColumn, siteHistoryColumn])
  };

  const inscriptionColumn = { Header: Column.names.inscription, accessor: 'inscription', Cell: InscriptionDisplay };
  const footstoneColumn = { Header: Column.names.footstone, accessor: 'footstone', Cell: FootstoneDisplay };
  const demarcationColumn = { Header: Column.names.demarcation, accessor: 'demarcation', Cell: DemarcationDisplay };
  const conditionColumn = { Header: Column.names.condition, accessor: 'condition', Cell: DemarcationDisplay };
  const accessibleColumn = { Header: Column.names.accessible, accessor: 'accessible', filter: 'includes',
    Filter: SelectColumnFilter };
  const restorationColumn = { Header: Column.names.restoration, accessor: 'restoration', Cell: LongTextBlock };
  const photosColumn = { Header: Column.names.gravePhotos, accessor: 'gravePhotos', Cell: PhotoList };
  const markerColumnGroup = {
    Header: 'Marker/Plot',
    columns: filterColumns(enabledColumns, [inscriptionColumn, footstoneColumn, demarcationColumn, conditionColumn,
      accessibleColumn, restorationColumn, photosColumn])
  };

  const notesColumn = { Header: Column.names.notes, accessor: 'notes', Cell: NotesDisplay };

  const tractParcelNumberColumn = { Header: Column.names.tractParcelNumber, accessor: 'tractParcelNumber', Cell: ParcelNumberDisplay };
  const cemeteryParcelNumberColumn = { Header: Column.names.cemeteryParcelNumber, accessor: 'cemeteryParcelNumber',
    Cell: ParcelNumberDisplay };
  const parcelNumberColumnGroup = {
    Header: 'Parcel Numbers',
    columns: filterColumns(enabledColumns, [tractParcelNumberColumn, cemeteryParcelNumberColumn])
  };

  const originalSurveyColumn = { Header: Column.names.originalSurvey, accessor: 'originalSurvey',
    Cell: DateCellFormatter };
  const surveyUpdatesColumn = { Header: Column.names.surveyUpdates, accessor: 'surveyUpdates',
    Cell: DateCellFormatter };
  const currentSurveyColumn = { Header: Column.names.currentSurvey, accessor: 'currentSurvey',
    Cell: DateCellFormatter };
  const surveyColumnGroup = {
    Header: 'Survey',
    columns: filterColumns(enabledColumns, [originalSurveyColumn, surveyUpdatesColumn, currentSurveyColumn])
  };

  const columns = useMemo(() => {
    return [
      personColumnGroup,
      locationColumnGroup,
      markerColumnGroup,
      notesColumn,
      parcelNumberColumnGroup,
      surveyColumnGroup
    ];
  }, []);

  return <PaginatedTable
    data={data}
    columns={columns}
    pageSize={10}
    defaultColumn={defaultColumn}
  />;
};

export default IntermentList;
