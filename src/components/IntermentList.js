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

const IntermentList = () => {
  const data = useMemo(() => NashvilleCemeteries.map(interment => new Interment(interment)), []);
  const defaultColumn = useMemo(() => ({ Filter: TextFilter }), []);

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
            Cell: FootstoneDisplay
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
        Cell: NotesDisplay
      },
      {
        Header: 'Parcel Numbers',
        columns: [
          {
            Header: 'Tract',
            accessor: 'tractParcelNumber',
            Cell: ParcelNumberDisplay
          },
          {
            Header: 'Cemetery',
            accessor: 'cemeteryParcelNumber',
            Cell: ParcelNumberDisplay
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

  return <PaginatedTable
    data={data}
    columns={columns}
    pageSize={10}
    defaultColumn={defaultColumn}
  />;
};

export default IntermentList;
