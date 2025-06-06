import {createContext, type PropsWithChildren, useContext, useMemo} from 'react'
import {NashvilleCemeteryData} from '../types'
import cemeteryData from '../nashville-cemeteries.json'
import Interment from '../models/Interment'
import IntermentSort from '../models/IntermentSort'

interface CemeteryDataContextProps {
  interments: Interment[]
}

const CemeteryDataContext = createContext<CemeteryDataContextProps>({interments: []})

export const CemeteryDataContextProvider = ({children}: PropsWithChildren) => {
  const interments = useMemo(() => {
    const result = (cemeteryData as NashvilleCemeteryData).features.map((data) => new Interment(data))
    result.sort(IntermentSort)
    return result
  }, [])
  return <CemeteryDataContext.Provider value={{interments}}>{children}</CemeteryDataContext.Provider>
}

export function useCemeteryData() {
  return useContext(CemeteryDataContext)
}
