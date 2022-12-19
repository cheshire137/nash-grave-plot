import React from 'react';
import { Box, Heading } from '@primer/react';
import ColumnOption from './ColumnOption';
import type IntermentField from '../types/IntermentField';
import type IntermentFieldGroup from '../types/IntermentFieldGroup';
import { intermentFieldLabels } from '../utils/intermentFieldLabels';

const intermentFieldsByGroup: { [group in IntermentFieldGroup]: IntermentField[] } = {
  'Person': ['person', 'deathDate', 'deceasedInfo'],
  'Location': ['cemeteryName', 'address', 'graveyardType', 'siteHistory'],
  'Marker/Plot': ['inscription', 'footstone', 'demarcation', 'condition', 'accessible', 'restoration',
    'gravePhotos'],
  'Parcel Numbers': ['tractParcelNumber', 'cemeteryParcelNumber'],
  'Survey': ['originalSurvey', 'surveyUpdates', 'currentSurvey'],
  'Other': ['notes']
};

interface Props {
  group: IntermentFieldGroup;
  enabledFields: IntermentField[];
  toggleFieldEnabled: (intermentField: IntermentField, isEnabled: boolean) => void;
}

const ColumnGroupOptions = ({ group, enabledFields, toggleFieldEnabled }: Props) => <Box mb={3}>
  <Heading sx={{ fontSize: 1, mb: 2 }}>{group}</Heading>
  {intermentFieldsByGroup[group].map(intermentField => <ColumnOption
    key={`${group}-${intermentField}`}
    name={intermentFieldLabels[intermentField]}
    value={intermentField}
    isEnabled={enabledFields.includes(intermentField)}
    onToggle={toggleFieldEnabled}
  />)}
</Box>;

export default ColumnGroupOptions;
