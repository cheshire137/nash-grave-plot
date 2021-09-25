class Column {
  static all = [
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
  static defaultColumns = Column.all;
  static names = {
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
}

export default Column;
