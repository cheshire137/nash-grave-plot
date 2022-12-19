import React, { useMemo, useState } from 'react';
import { BaseStyles, Box, Header, Heading, Text, ThemeProvider } from '@primer/react';
import IntermentList from './components/IntermentList';
import SettingsDialog from './components/SettingsDialog';
import type IntermentField from './types/IntermentField';
import LocalStorage from './models/LocalStorage';
import Filter from './models/Filter';
import Footer from './components/Footer';

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
  const [pageTitle, setPageTitle] = useState('');
  const filters = useMemo(() => getInitialFilters(), []);

  return (
    <ThemeProvider>
      <BaseStyles>
        <Header>
          <Header.Item full>
            <Heading as="h1">
              NashGravePlot
              {pageTitle.length > 0 && <Text
                ml={4}
                display="inline-block"
                fontWeight="normal"
                fontSize="3"
              >{pageTitle}</Text>}
            </Heading>
          </Header.Item>
          <Header.Item>
            <SettingsDialog enabledFields={enabledFields} setEnabledFields={setEnabledFields} />
          </Header.Item>
        </Header>
        <Box pb={4}>
          <IntermentList enabledIntermentFields={enabledFields} setPageTitle={setPageTitle} filters={filters} />
        </Box>
        <Footer />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;
