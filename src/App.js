import React, { useMemo, useState } from 'react';
import { BaseStyles, Box, Header, Heading, Text, ThemeProvider } from '@primer/components';
import IntermentList from './components/IntermentList';
import Settings from './components/Settings';
import Column from './models/Column';
import LocalStorage from './models/LocalStorage';
import Footer from './components/Footer';

const getInitialFilters = () => {
  const filters = [];
  if (window.location.search.length < 1) {
    return filters;
  }
  const searchParams = new URLSearchParams(window.location.search);
  for (const [id, value] of searchParams.entries()) {
    filters.push({ id, value });
  }
  return filters;
};

const App = () => {
  const savedEnabledColumns = LocalStorage.get('enabledColumns');
  const [enabledColumns, setEnabledColumns] = useState(savedEnabledColumns || Column.defaultColumns);
  const [pageTitle, setPageTitle] = useState('');
  const filters = useMemo(() => getInitialFilters(), []);

  return (
    <ThemeProvider>
      <BaseStyles>
        <Header>
          <Header.Item full>
            <Heading as="h1">
              NashGravePlot
              {pageTitle.length > 0 && (
                <Text color="fade.white50" ml={4} display="inline-block" fontWeight="normal" fontSize="3">{pageTitle}</Text>
              )}
            </Heading>
          </Header.Item>
          <Header.Item>
            <Settings enabledColumns={enabledColumns} setEnabledColumns={setEnabledColumns} />
          </Header.Item>
        </Header>
        <Box pb={4}>
          <IntermentList enabledColumns={enabledColumns} setPageTitle={setPageTitle} filters={filters} />
        </Box>
        <Footer />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;
