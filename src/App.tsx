import React from 'react';
import { BaseStyles, ThemeProvider } from '@primer/react';
import IntermentList from './components/IntermentList';
import { WindowContextProvider } from './contexts/WindowContext';
import { CemeteryDataContextProvider } from './contexts/CemeteryDataContext';
import { PageContextProvider } from './contexts/PageContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import AppLayout from './components/AppLayout';

const App = () => {
  const routes = [
    {
      path: '/',
      element: <IntermentList />,
      errorElement: <ErrorPage />,
    },
  ];
  const router = createBrowserRouter(routes, { basename: '/nash-grave-plot' });

  return <ThemeProvider>
    <BaseStyles>
      <WindowContextProvider>
        <CemeteryDataContextProvider>
          <PageContextProvider>
            <AppLayout>
              <RouterProvider router={router} />
            </AppLayout>
          </PageContextProvider>
        </CemeteryDataContextProvider>
      </WindowContextProvider>
    </BaseStyles>
  </ThemeProvider>;
};

export default App;
