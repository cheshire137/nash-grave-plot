import type {IntermentField, IntermentFieldGroup} from './types'

export const cemeteryColumnId = 'cemetery'
export const addressColumnId = 'address'

export const allColumns: IntermentField[] = [
  'person',
  'deceasedInfo',
  cemeteryColumnId,
  addressColumnId,
  'siteHistory',
  'inscription',
  'footstone',
  'demarcation',
  'condition',
  'accessible',
  'restoration',
  'gravePhotos',
  'notes',
  'tractParcelNumber',
  'cemeteryParcelNumber',
  'originalSurvey',
  'surveyUpdates',
  'currentSurvey',
]

export const allIntermentFieldGroups: IntermentFieldGroup[] = [
  'Person',
  'Location',
  'Marker/Plot',
  'Parcel Numbers',
  'Survey',
  'Other',
]

export const intermentFieldsByGroup: {
  [group in IntermentFieldGroup]: IntermentField[]
} = {
  Person: ['person', 'deceasedInfo'],
  Location: [cemeteryColumnId, addressColumnId, 'siteHistory'],
  'Marker/Plot': ['inscription', 'footstone', 'demarcation', 'condition', 'accessible', 'restoration', 'gravePhotos'],
  'Parcel Numbers': ['tractParcelNumber', 'cemeteryParcelNumber'],
  Survey: ['originalSurvey', 'surveyUpdates', 'currentSurvey'],
  Other: ['notes'],
}

export const intermentFieldLabels: {
  [intermentField in IntermentField]: string
} = {
  person: 'Name / Death date',
  deceasedInfo: 'Info',
  [cemeteryColumnId]: 'Cemetery',
  [addressColumnId]: 'Address / Photos',
  siteHistory: 'Site History',
  inscription: 'Inscription',
  footstone: 'Footstone',
  demarcation: 'Demarcation',
  condition: 'Condition',
  accessible: 'Accessible',
  restoration: 'Restoration',
  gravePhotos: 'Photos',
  notes: 'Notes',
  tractParcelNumber: 'Tract',
  cemeteryParcelNumber: 'Cemetery',
  originalSurvey: 'Original',
  surveyUpdates: 'Updates',
  currentSurvey: 'Current',
}
