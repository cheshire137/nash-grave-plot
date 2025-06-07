import {useMemo} from 'react'
import AddressDisplay from '../components/AddressDisplay'
import CemeteryDisplay from '../components/CemeteryDisplay'
import {InscriptionDisplay} from '../components/InscriptionDisplay'
import LongTextBlock from '../components/LongTextBlock'
import AddressFilter from '../components/AddressFilter'
import DateCellFormatter from '../components/DateCellFormatter'
import {PhotoList} from '../components/PhotoList'
import {NameDisplay} from '../components/NameDisplay'
import {InfoDisplay} from '../components/InfoDisplay'
import {CemeteryFilterDialog} from '../components/CemeteryFilterDialog'
import DemarcationDisplay from '../components/DemarcationDisplay'
import FootstoneDisplay from '../components/FootstoneDisplay'
import {NotesDisplay} from '../components/NotesDisplay'
import {ParcelNumberDisplay} from '../components/ParcelNumberDisplay'
import {addressColumnId, cemeteryColumnId, intermentFieldLabels} from '../constants'
import {getColumnsToDisplay} from '../utils'
import {useEnabledFields} from '../contexts/EnabledFieldsContext'

export function useIntermentListColumns() {
  const {enabledFields} = useEnabledFields()
  const columns = useMemo(() => {
    const nameColumn = {
      Header: intermentFieldLabels.person,
      accessor: 'person',
      filter: 'fuzzyText',
      Cell: NameDisplay,
    }
    const deceasedInfoColumn = {
      Header: intermentFieldLabels.deceasedInfo,
      accessor: 'deceasedInfo',
      Cell: InfoDisplay,
      filter: 'fuzzyText',
    }
    const personColumnGroup = {
      Header: 'Person',
      columns: getColumnsToDisplay(enabledFields, [nameColumn, deceasedInfoColumn]),
    }

    const cemeteryColumn = {
      Header: intermentFieldLabels.cemetery,
      accessor: 'cemetery',
      filter: 'cemeteryMatches',
      Filter: CemeteryFilterDialog,
      Cell: CemeteryDisplay,
      id: cemeteryColumnId,
    }
    const addressColumn = {
      Header: intermentFieldLabels.address,
      accessor: 'cemetery',
      Cell: AddressDisplay,
      filter: 'addressMatches',
      Filter: AddressFilter,
      id: addressColumnId,
    }
    const siteHistoryColumn = {
      Header: intermentFieldLabels.siteHistory,
      accessor: 'siteHistory',
      Cell: InfoDisplay,
    }
    const locationColumnGroup = {
      Header: 'Location',
      columns: getColumnsToDisplay(enabledFields, [cemeteryColumn, addressColumn, siteHistoryColumn]),
    }

    const inscriptionColumn = {
      Header: intermentFieldLabels.inscription,
      accessor: 'inscription',
      Cell: InscriptionDisplay,
    }
    const footstoneColumn = {
      Header: intermentFieldLabels.footstone,
      accessor: 'footstone',
      Cell: FootstoneDisplay,
    }
    const demarcationColumn = {
      Header: intermentFieldLabels.demarcation,
      accessor: 'demarcation',
      Cell: DemarcationDisplay,
    }
    const conditionColumn = {
      Header: intermentFieldLabels.condition,
      accessor: 'condition',
      Cell: DemarcationDisplay,
    }
    const accessibleColumn = {
      Header: intermentFieldLabels.accessible,
      accessor: 'accessible',
      filter: 'includes',
    }
    const restorationColumn = {
      Header: intermentFieldLabels.restoration,
      accessor: 'restoration',
      Cell: LongTextBlock,
    }
    const gravePhotosColumn = {
      Header: intermentFieldLabels.gravePhotos,
      accessor: 'gravePhotoCaptionsByUrl',
      Cell: PhotoList,
    }
    const markerColumnGroup = {
      Header: 'Marker/Plot',
      columns: getColumnsToDisplay(enabledFields, [
        inscriptionColumn,
        footstoneColumn,
        demarcationColumn,
        conditionColumn,
        accessibleColumn,
        restorationColumn,
        gravePhotosColumn,
      ]),
    }

    const notesColumn = {
      Header: intermentFieldLabels.notes,
      accessor: 'notes',
      Cell: NotesDisplay,
    }
    const otherColumnGroup = {
      Header: '',
      id: 'other',
      columns: getColumnsToDisplay(enabledFields, [notesColumn]),
    }

    const tractParcelNumberColumn = {
      Header: intermentFieldLabels.tractParcelNumber,
      accessor: 'tractParcelNumber',
      Cell: ParcelNumberDisplay,
    }
    const cemeteryParcelNumberColumn = {
      Header: intermentFieldLabels.cemeteryParcelNumber,
      accessor: 'cemeteryParcelNumber',
      Cell: ParcelNumberDisplay,
    }
    const parcelNumberColumnGroup = {
      Header: 'Parcel Numbers',
      columns: getColumnsToDisplay(enabledFields, [tractParcelNumberColumn, cemeteryParcelNumberColumn]),
    }

    const originalSurveyColumn = {
      Header: intermentFieldLabels.originalSurvey,
      accessor: 'originalSurvey',
      Cell: DateCellFormatter,
    }
    const surveyUpdatesColumn = {
      Header: intermentFieldLabels.surveyUpdates,
      accessor: 'surveyUpdates',
      Cell: DateCellFormatter,
    }
    const currentSurveyColumn = {
      Header: intermentFieldLabels.currentSurvey,
      accessor: 'currentSurvey',
      Cell: DateCellFormatter,
    }
    const surveyColumnGroup = {
      Header: 'Survey',
      columns: getColumnsToDisplay(enabledFields, [originalSurveyColumn, surveyUpdatesColumn, currentSurveyColumn]),
    }

    return [
      personColumnGroup,
      locationColumnGroup,
      markerColumnGroup,
      otherColumnGroup,
      parcelNumberColumnGroup,
      surveyColumnGroup,
    ]
  }, [enabledFields])

  return {columns}
}
