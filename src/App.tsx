import React from 'react';
import { BaseStyles, ThemeProvider } from '@primer/react';
import IntermentList from './components/IntermentList';
import { WindowContextProvider } from './contexts/WindowContext';
import { CemeteryDataContextProvider } from './contexts/CemeteryDataContext';
import { PageContextProvider } from './contexts/PageContext';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import AppLayout from './components/AppLayout';

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<IntermentList />} errorElement={<ErrorPage />} />
      <Route path="/page/:initialPageNumberStr" element={<IntermentList />} errorElement={<ErrorPage />} />
    </Route>
  ), { basename: '/nash-grave-plot' });

  return <ThemeProvider>
    <BaseStyles>
      <WindowContextProvider>
        <CemeteryDataContextProvider>
          <PageContextProvider>
            <RouterProvider router={router} />
          </PageContextProvider>
        </CemeteryDataContextProvider>
      </WindowContextProvider>
    </BaseStyles>
  </ThemeProvider>;
};

export default App;
