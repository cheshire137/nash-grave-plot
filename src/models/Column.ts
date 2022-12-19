export type ColumnGroup = 'Person' | 'Location' | 'Marker/Plot' | 'Parcel Numbers' | 'Survey' | 'Other';
export type IntermentField = 'person' | 'deathDate' | 'deceasedInfo' | 'cemeteryName' | 'address' | 'graveyardType' |
  'siteHistory' | 'inscription' | 'footstone' | 'demarcation' | 'condition' | 'accessible' | 'restoration' |
  'gravePhotos' | 'notes' | 'tractParcelNumber' | 'cemeteryParcelNumber' | 'originalSurvey' | 'surveyUpdates' |
  'currentSurvey';

export const AllColumnGroups: ColumnGroup[] = [
  'Person',
  'Location',
  'Marker/Plot',
  'Parcel Numbers',
  'Survey',
  'Other'
];

export const AllColumns: IntermentField[] = [
  'person',
  'deathDate',
  'deceasedInfo',
  'cemeteryName',
  'address',
  'graveyardType',
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
  'currentSurvey'
];

export const ColumnNamesByColumn: { [prop in IntermentField]: string } = {
  'person': 'Name',
  'deathDate': 'Died',
  'deceasedInfo': 'Info',
  'cemeteryName': 'Cemetery',
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

export const ColumnsByColumnGroup: { [group in ColumnGroup]: IntermentField[] } = {
  'Person': ['person', 'deathDate', 'deceasedInfo'],
  'Location': ['cemeteryName', 'address', 'graveyardType', 'siteHistory'],
  'Marker/Plot': ['inscription', 'footstone', 'demarcation', 'condition', 'accessible', 'restoration',
    'gravePhotos'],
  'Parcel Numbers': ['tractParcelNumber', 'cemeteryParcelNumber'],
  'Survey': ['originalSurvey', 'surveyUpdates', 'currentSurvey'],
  'Other': ['notes']
};
