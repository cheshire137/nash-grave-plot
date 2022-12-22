import React, { useState, useCallback, useEffect } from 'react';

type Padding = 'normal' | 'none' | 'condensed';

export type PageContextProps = {
  pageTitle: string;
  headerItems: React.ReactNode[];
  setPageTitle: (pageTitle: string) => void;
  setHeaderItems: (headerItems: React.ReactNode[]) => void;
  padding?: Padding;
  setPadding: (padding: Padding) => void;
};

export const PageContext = React.createContext<PageContextProps>({
  pageTitle: '',
  headerItems: [],
  setPageTitle: () => {},
  setHeaderItems: () => {},
  padding: 'normal',
  setPadding: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const PageContextProvider = ({ children }: Props) => {
  const [pageTitle, _setPageTitle] = useState('');
  const [headerItems, _setHeaderItems] = useState<React.ReactNode[]>([]);
  const [padding, _setPadding] = useState<Padding>('normal');

  const setPageTitle = useCallback((title: string) => _setPageTitle(title), [_setPageTitle]);
  const setHeaderItems = useCallback((items: React.ReactNode[]) => _setHeaderItems(items), [_setHeaderItems]);
  const setPadding = useCallback((p: Padding) => _setPadding(p), [_setPadding]);

  useEffect(() => {
    if (pageTitle.length > 0) {
      document.title = `NashGravePlot - ${pageTitle}`;
    } else {
      document.title = 'NashGravePlot';
    }
  }, [pageTitle])

  return <PageContext.Provider value={{ padding, setPadding, pageTitle, setPageTitle, headerItems, setHeaderItems }}>
    {children}
  </PageContext.Provider>;
};
