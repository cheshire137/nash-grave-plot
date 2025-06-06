import {CheckboxGroup, FormControl, Checkbox} from '@primer/react'
import type {IntermentField, IntermentFieldGroup} from '../types'
import {intermentFieldsByGroup, intermentFieldLabels} from '../constants'

interface IntermentFieldGroupSettingsProps {
  group: IntermentFieldGroup
  enabledFields: IntermentField[]
  toggleFieldEnabled: (intermentField: IntermentField, isEnabled: boolean) => void
}

function IntermentFieldGroupSettings({group, enabledFields, toggleFieldEnabled}: IntermentFieldGroupSettingsProps) {
  return (
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
}

export default IntermentFieldGroupSettings
