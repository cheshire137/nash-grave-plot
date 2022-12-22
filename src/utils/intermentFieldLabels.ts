import type IntermentField from '../types/IntermentField';

export const intermentFieldLabels: { [intermentField in IntermentField]: string } = {
  'person': 'Name',
  'deathDate': 'Died',
  'deceasedInfo': 'Info',
  'cemetery': 'Cemetery',
  'address': 'Address',
  'graveyardType': 'Graveyard Type',
  'siteHistory': 'Site History',
  'inscription': 'Inscription',
  'footstone': 'Footstone',
  'demarcation': 'Demarcation',
  'condition': 'Condition',
  'accessible': 'Accessible',
  'restoration': 'Restoration',
  'gravePhotos': 'Photos',
  'notes': 'Notes',
  'tractParcelNumber': 'Tract',
  'cemeteryParcelNumber': 'Cemetery',
  'originalSurvey': 'Original',
  'surveyUpdates': 'Updates',
  'currentSurvey': 'Current'
};
