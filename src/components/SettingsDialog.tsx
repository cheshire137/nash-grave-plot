import {useCallback, useRef, useState} from 'react'
import {Dialog} from '@primer/react'
import {GearIcon} from '@primer/octicons-react'
import IntermentFieldGroupSettings from './IntermentFieldGroupSettings'
import {allIntermentFieldGroups} from '../constants'
import {useEnabledFields} from '../contexts/EnabledFieldsContext'
import {getEnabledColumns} from '../utils'
import HeaderIconButton from './HeaderIconButton'
import styles from './SettingsDialog.module.css'

export function SettingsDialog() {
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
      <HeaderIconButton ref={buttonRef} icon={GearIcon} onClick={() => setIsOpen(true)} aria-label="Settings" />
      {isOpen && (
        <Dialog
          footerButtons={[{buttonType: 'primary', content: 'Save', onClick: onSave}]}
          title="Settings"
          returnFocusRef={buttonRef}
          onClose={() => setIsOpen(false)}
        >
          <p className={styles.instructions}>Choose which columns to show:</p>
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
