import React, {useRef, useState} from 'react'
import {Box, Dialog, Text} from '@primer/react'
import {GearIcon} from '@primer/octicons-react'
import IntermentFieldGroupSettings from './IntermentFieldGroupSettings'
import LocalStorage from '../models/LocalStorage'
import {allIntermentFieldGroups} from '../constants'
import type {IntermentField} from '../types'
import {getEnabledColumns} from '../utils'
import HeaderIconButton from './HeaderIconButton'

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
        <Dialog returnFocusRef={buttonRef} onClose={() => setIsOpen(false)} aria-labelledby="header-id">
          <Dialog.Header id="header-id">Settings</Dialog.Header>
          <Box p={3} sx={{overflow: 'auto', maxHeight: '70vh'}}>
            <Text color="black" as="div">
              <Box mt={0} mb={3} as="p">
                Choose which columns to show:
              </Box>
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
            </Text>
          </Box>
        </Dialog>
      )}
    </>
  )
}
