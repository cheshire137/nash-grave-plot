import {createContext, type PropsWithChildren, useCallback, useContext, useEffect, useState} from 'react'

interface WindowSizeContextProps {
  clientHeight: number
  clientWidth: number
}

const WindowSizeContext = createContext<WindowSizeContextProps>({
  clientHeight: 0,
  clientWidth: 0,
})

// See https://medium.com/@christian_maehler/handle-window-resizing-with-a-react-context-4392b47285e4
export const WindowSizeContextProvider = ({children}: PropsWithChildren) => {
  const getVh = useCallback(() => {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  }, [])
  const getVw = useCallback(() => {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  }, [])
  const [clientHeight, setVh] = useState<number>(getVh())
  const [clientWidth, setVw] = useState<number>(getVw())
  useEffect(() => {
    const handleResize = () => {
      setVh(getVh())
      setVw(getVw())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getVh, getVw])
  return <WindowSizeContext.Provider value={{clientHeight, clientWidth}}>{children}</WindowSizeContext.Provider>
}

export function useWindowSize() {
  return useContext(WindowSizeContext)
}
