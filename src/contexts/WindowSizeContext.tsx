import {createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {getViewportHeight, getViewportWidth} from '../utils'

interface WindowSizeContextProps {
  clientHeight: number
  clientWidth: number
}

const WindowSizeContext = createContext<WindowSizeContextProps | undefined>(undefined)

// See https://medium.com/@christian_maehler/handle-window-resizing-with-a-react-context-4392b47285e4
export const WindowSizeContextProvider = ({children}: PropsWithChildren) => {
  const [clientHeight, setClientHeight] = useState<number>(getViewportHeight())
  const [clientWidth, setClientWidth] = useState<number>(getViewportWidth())
  const handleResize = useCallback(() => {
    setClientHeight(getViewportHeight())
    setClientWidth(getViewportWidth())
  }, [])
  const value = useMemo(() => ({clientHeight, clientWidth}), [clientHeight, clientWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return <WindowSizeContext.Provider value={value}>{children}</WindowSizeContext.Provider>
}

export function useWindowSize() {
  const context = useContext(WindowSizeContext)
  if (!context) throw new Error('useWindowSize must be used within a WindowSizeContextProvider')
  return context
}
