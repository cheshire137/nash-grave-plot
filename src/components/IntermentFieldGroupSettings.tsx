import React from 'react'
import {CheckboxGroup, FormControl, Checkbox} from '@primer/react'
import type IntermentField from '../types/IntermentField'
import type IntermentFieldGroup from '../types/IntermentFieldGroup'
import {intermentFieldLabels} from '../utils/intermentFieldLabels'

const intermentFieldsByGroup: {
  [group in IntermentFieldGroup]: IntermentField[]
} = {
  Person: ['person', 'deceasedInfo'],
  Location: ['cemetery', 'address', 'siteHistory'],
  'Marker/Plot': ['inscription', 'footstone', 'demarcation', 'condition', 'accessible', 'restoration', 'gravePhotos'],
  'Parcel Numbers': ['tractParcelNumber', 'cemeteryParcelNumber'],
  Survey: ['originalSurvey', 'surveyUpdates', 'currentSurvey'],
  Other: ['notes'],
}

interface Props {
  group: IntermentFieldGroup
  enabledFields: IntermentField[]
  toggleFieldEnabled: (intermentField: IntermentField, isEnabled: boolean) => void
}

const IntermentFieldGroupSettings = ({group, enabledFields, toggleFieldEnabled}: Props) => (
  <CheckboxGroup sx={{mb: 3}}>
    <CheckboxGroup.Label>{group}</CheckboxGroup.Label>
    {intermentFieldsByGroup[group].map((intermentField) => (
      <FormControl key={intermentField}>
        <Checkbox
          checked={enabledFields.includes(intermentField)}
          name="enabledColumns"
          value={intermentField}
          onChange={(e) => toggleFieldEnabled(intermentField, e.target.checked)}
        />
        <FormControl.Label>{intermentFieldLabels[intermentField]}</FormControl.Label>
      </FormControl>
    ))}
  </CheckboxGroup>
)

export default IntermentFieldGroupSettings
