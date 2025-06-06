import type {IntermentField, IntermentFieldGroup} from './types'

export const allIntermentFieldGroups: IntermentFieldGroup[] = [
  'Person',
  'Location',
  'Marker/Plot',
  'Parcel Numbers',
  'Survey',
  'Other',
]

export const intermentFieldLabels: {
  [intermentField in IntermentField]: string
} = {
  person: 'Name and death date',
  deceasedInfo: 'Info',
  cemetery: 'Cemetery name and type',
  address: 'Address and photos',
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
