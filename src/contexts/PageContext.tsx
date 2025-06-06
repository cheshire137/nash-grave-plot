import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react'

interface PageContextProps {
  pageTitle: string
  headerItems: React.ReactNode[]
  setPageTitle: (pageTitle: string) => void
  setHeaderItems: (headerItems: React.ReactNode[]) => void
}

const PageContext = createContext<PageContextProps | undefined>(undefined)

export const PageContextProvider = ({children}: PropsWithChildren) => {
  const [pageTitle, _setPageTitle] = useState('')
  const [headerItems, _setHeaderItems] = useState<ReactNode[]>([])

  const setPageTitle = useCallback((title: string) => _setPageTitle(title), [_setPageTitle])
  const setHeaderItems = useCallback((items: ReactNode[]) => _setHeaderItems(items), [_setHeaderItems])

  useEffect(() => {
    if (pageTitle.length > 0) {
      document.title = `NashGravePlot - ${pageTitle}`
    } else {
      document.title = 'NashGravePlot'
    }
  }, [pageTitle])

  return (
    <PageContext.Provider value={{pageTitle, setPageTitle, headerItems, setHeaderItems}}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  const context = useContext(PageContext)
  if (!context) throw new Error('usePage must be used within a PageContextProvider')
  return context
}
