import {useCallback, useRef, useState} from 'react'
import {Dialog} from '@primer/react'
import {TableIcon} from '@primer/octicons-react'
import IntermentFieldGroupSettings from './IntermentFieldGroupSettings'
import {allIntermentFieldGroups} from '../constants'
import {useEnabledFields} from '../contexts/EnabledFieldsContext'
import {getEnabledColumns} from '../utils'
import HeaderIconButton from './HeaderIconButton'

export function EnabledColumnsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {enabledFields: persistedEnabledFields, saveEnabledFields} = useEnabledFields()
  const [enabledFields, setEnabledFields] = useState(persistedEnabledFields)
  const onSave = useCallback(() => {
    saveEnabledFields(enabledFields)
    setIsOpen(false)
  }, [enabledFields, saveEnabledFields])

  return (
    <>
      <HeaderIconButton
        ref={buttonRef}
        icon={TableIcon}
        onClick={() => setIsOpen(true)}
        aria-label="Visible columns"
      />
      {isOpen && (
        <Dialog
          footerButtons={[{buttonType: 'primary', content: 'Save', onClick: onSave}]}
          title="Visible columns"
          returnFocusRef={buttonRef}
          onClose={() => setIsOpen(false)}
        >
          {allIntermentFieldGroups.map((group) => (
            <IntermentFieldGroupSettings
              key={group}
              group={group}
              enabledFields={enabledFields}
              toggleFieldEnabled={(intermentField, isEnabled) => {
                setEnabledFields(getEnabledColumns(enabledFields, intermentField, isEnabled))
              }}
            />
          ))}
        </Dialog>
      )}
    </>
  )
}
