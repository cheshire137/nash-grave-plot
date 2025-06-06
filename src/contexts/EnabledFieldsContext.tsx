import {createContext, type PropsWithChildren, useCallback, useContext, useMemo, useState} from 'react'
import type {IntermentField} from '../types'
import LocalStorage from '../models/LocalStorage'
import {allColumns} from '../constants'

interface EnabledFieldsContextProps {
  enabledFields: IntermentField[]
  saveEnabledFields: (enabledFields: IntermentField[]) => void
}

const EnabledFieldsContext = createContext<EnabledFieldsContextProps | undefined>(undefined)

const localStorageKey = 'enabledFields'

export function EnabledFieldsProvider({children}: PropsWithChildren) {
  const savedEnabledFields: IntermentField[] = LocalStorage.get(localStorageKey)
  const [enabledFields, setEnabledFields] = useState<IntermentField[]>(savedEnabledFields || allColumns)
  const saveEnabledFields = useCallback((newEnabledFields: IntermentField[]) => {
    LocalStorage.set(localStorageKey, newEnabledFields)
    setEnabledFields(newEnabledFields)
  }, [])
  const value = useMemo(
    () => ({enabledFields, saveEnabledFields}) satisfies EnabledFieldsContextProps,
    [enabledFields]
  )
  return <EnabledFieldsContext.Provider value={value}>{children}</EnabledFieldsContext.Provider>
}

export function useEnabledFields() {
  const context = useContext(EnabledFieldsContext)
  if (!context) throw new Error('useEnabledFields must be used within an EnabledFieldsContextProvider')
  return context
}
