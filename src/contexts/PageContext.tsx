import React, { useState, useCallback } from 'react';

export type PageContextProps = {
  pageTitle: string;
  headerItems: React.ReactNode[];
  setPageTitle: (pageTitle: string) => void;
  setHeaderItems: (headerItems: React.ReactNode[]) => void;
};

export const PageContext = React.createContext<PageContextProps>({
  pageTitle: '',
  headerItems: [],
  setPageTitle: () => {},
  setHeaderItems: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const PageContextProvider = ({ children }: Props) => {
  const [pageTitle, _setPageTitle] = useState('');
  const [headerItems, _setHeaderItems] = useState<React.ReactNode[]>([]);

  const setPageTitle = useCallback((title: string) => _setPageTitle(title), [_setPageTitle]);
  const setHeaderItems = useCallback((items: React.ReactNode[]) => _setHeaderItems(items), [_setHeaderItems]);

  return <PageContext.Provider value={{ pageTitle, setPageTitle, headerItems, setHeaderItems }}>
    {children}
  </PageContext.Provider>;
};
