import {useRef, useState} from 'react'
import {Dialog} from '@primer/react'
import {GearIcon} from '@primer/octicons-react'
import IntermentFieldGroupSettings from './IntermentFieldGroupSettings'
import LocalStorage from '../models/LocalStorage'
import {allIntermentFieldGroups} from '../constants'
import type {IntermentField} from '../types'
import {getEnabledColumns} from '../utils'
import HeaderIconButton from './HeaderIconButton'
import styles from './SettingsDialog.module.css'

interface SettingsDialogProps {
  enabledFields: IntermentField[]
  setEnabledFields: (enabledFields: IntermentField[]) => void
}

export function SettingsDialog({enabledFields, setEnabledFields}: SettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <HeaderIconButton ref={buttonRef} icon={GearIcon} onClick={() => setIsOpen(true)} aria-label="Settings" />
      {isOpen && (
        <Dialog title="Settings" returnFocusRef={buttonRef} onClose={() => setIsOpen(false)}>
          <p className={styles.instructions}>Choose which columns to show:</p>
          {allIntermentFieldGroups.map((group) => (
            <IntermentFieldGroupSettings
              key={group}
              group={group}
              enabledFields={enabledFields}
              toggleFieldEnabled={(intermentField, isEnabled) => {
                const newEnabledFields = getEnabledColumns(enabledFields, intermentField, isEnabled)
                LocalStorage.set('enabledFields', newEnabledFields)
                setEnabledFields(newEnabledFields)
              }}
            />
          ))}
        </Dialog>
      )}
    </>
  )
}
