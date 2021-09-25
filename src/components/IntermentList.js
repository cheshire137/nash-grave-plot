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

const IntermentList = () => {
  const data = useMemo(() => {
    const interments = NashvilleCemeteries.map(interment => new Interment(interment));
    interments.sort(IntermentSort);
    return interments;
  }, []);
  const defaultColumn = useMemo(() => ({ Filter: TextFilter }), []);

  const nameColumn = {
    Header: 'Name',
    accessor: 'person',
    filter: 'fuzzyText',
    Cell: NameDisplay
  };
  const deathDateColumn = {
    Header: 'Died',
    accessor: 'deathDate',
    Cell: DiedDateDisplay
  };
  const deceasedInfoColumn = {
    Header: 'Info',
    accessor: 'deceasedInfo',
    Cell: InfoDisplay,
    filter: 'fuzzyText'
  };
  const personColumnGroup = {
    Header: 'Person',
    columns: [
      nameColumn,
      deathDateColumn,
      deceasedInfoColumn
    ]
  };
  const cemeteryColumn = {
    Header: 'Cemetery',
    accessor: 'cemeteryName',
    filter: 'includes',
    Filter: SelectColumnFilter,
    Cell: NameDisplay
  };
  const addressColumn = {
    Header: 'Address',
    accessor: 'address',
    Cell: AddressDisplay,
    filter: 'fuzzyText'
  };
  const graveyardTypeColumn = {
    Header: 'Graveyard Type',
    accessor: 'graveyardType',
    filter: 'includes',
    Filter: SelectColumnFilter,
    Cell: GraveyardTypeDisplay
  };
  const siteHistoryColumn = {
    Header: 'Site History',
    accessor: 'siteHistory',
    Cell: InfoDisplay
  };
  const locationColumnGroup = {
    Header: 'Location',
    columns: [
      cemeteryColumn,
      addressColumn,
      graveyardTypeColumn,
      siteHistoryColumn
    ]
  };
  const inscriptionColumn = {
    Header: 'Inscription',
    accessor: 'inscription',
    Cell: InscriptionDisplay
  };
  const footstoneColumn = {
    Header: 'Footstone',
    accessor: 'footstone',
    Cell: FootstoneDisplay
  };
  const demarcationColumn = {
    Header: 'Demarcation',
    accessor: 'demarcation',
    Cell: DemarcationDisplay
  };
  const conditionColumn = {
    Header: 'Condition',
    accessor: 'condition',
    Cell: DemarcationDisplay
  };
  const accessibleColumn = {
    Header: 'Accessible',
    accessor: 'accessible',
    filter: 'includes',
    Filter: SelectColumnFilter
  };
  const restorationColumn = {
    Header: 'Restoration',
    accessor: 'restoration',
    Cell: LongTextBlock
  };
  const photosColumn = {
    Header: 'Photos',
    accessor: 'gravePhotos',
    Cell: PhotoList
  };
  const markerColumnGroup = {
    Header: 'Marker/Plot',
    columns: [
      inscriptionColumn,
      footstoneColumn,
      demarcationColumn,
      conditionColumn,
      accessibleColumn,
      restorationColumn,
      photosColumn
    ]
  };
  const notesColumn = {
    Header: 'Notes',
    accessor: 'notes',
    Cell: NotesDisplay
  };
  const tractParcelNumberColumn = {
    Header: 'Tract',
    accessor: 'tractParcelNumber',
    Cell: ParcelNumberDisplay
  };
  const cemeteryParcelNumberColumn = {
    Header: 'Cemetery',
    accessor: 'cemeteryParcelNumber',
    Cell: ParcelNumberDisplay
  };
  const parcelNumberColumnGroup = {
    Header: 'Parcel Numbers',
    columns: [
      tractParcelNumberColumn,
      cemeteryParcelNumberColumn
    ]
  };
  const originalSurveyColumn = {
    Header: 'Original',
    accessor: 'originalSurvey',
    Cell: DateCellFormatter
  };
  const surveyUpdatesColumn = {
    Header: 'Updates',
    accessor: 'surveyUpdates',
    Cell: DateCellFormatter
  };
  const currentSurveyColumn = {
    Header: 'Current',
    accessor: 'currentSurvey',
    Cell: DateCellFormatter
  };
  const surveyColumnGroup = {
    Header: 'Survey',
    columns: [
      originalSurveyColumn,
      surveyUpdatesColumn,
      currentSurveyColumn
    ]
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
