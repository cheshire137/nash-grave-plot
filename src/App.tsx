import React, { useMemo, useState } from 'react';
import { BaseStyles, ThemeProvider } from '@primer/react';
import IntermentList from './components/IntermentList';
import type IntermentField from './types/IntermentField';
import LocalStorage from './models/LocalStorage';
import Filter from './models/Filter';
import { WindowContextProvider } from './contexts/WindowContext';
import { CemeteryDataContextProvider } from './contexts/CemeteryDataContext';
import { PageContextProvider } from './contexts/PageContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import AppLayout from './components/AppLayout';

const getInitialFilters = () => {
  const filters: Filter[] = [];
  if (window.location.search.length < 1) {
    return filters;
  }
  const searchParams = new URLSearchParams(window.location.search);
  for (const [id, value] of searchParams.entries()) {
    filters.push({ id, value });
  }
  return filters;
};


const allColumns: IntermentField[] = ['person', 'deathDate', 'deceasedInfo', 'cemeteryName', 'address',
  'graveyardType', 'siteHistory', 'inscription', 'footstone', 'demarcation', 'condition', 'accessible', 'restoration',
  'gravePhotos', 'notes', 'tractParcelNumber', 'cemeteryParcelNumber', 'originalSurvey', 'surveyUpdates',
  'currentSurvey'];

const App = () => {
  const savedEnabledFields: IntermentField[] = LocalStorage.get('enabledFields');
  const [enabledFields, setEnabledFields] = useState<IntermentField[]>(savedEnabledFields || allColumns);
  const filters = useMemo(() => getInitialFilters(), []);
  const routes = [
    {
      path: '/',
      element: <IntermentList enabledIntermentFields={enabledFields} filters={filters} />,
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
