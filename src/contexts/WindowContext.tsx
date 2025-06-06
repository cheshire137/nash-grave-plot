import React, {useCallback, useEffect, useState} from 'react'
export type WindowContextProps = {
  clientHeight: number
  clientWidth: number
}
export const WindowContext = React.createContext<WindowContextProps>({
  clientHeight: 0,
  clientWidth: 0,
})
interface Props {
  children: React.ReactNode
}

// See https://medium.com/@christian_maehler/handle-window-resizing-with-a-react-context-4392b47285e4
export const WindowContextProvider = ({children}: Props) => {
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
  return <WindowContext.Provider value={{clientHeight, clientWidth}}>{children}</WindowContext.Provider>
}
