import React, { useState } from 'react';
import { BaseStyles, Box, Header, Heading, ThemeProvider } from '@primer/components';
import IntermentList from './components/IntermentList';
import Settings from './components/Settings';
import Column from './models/Column';
import LocalStorage from './models/LocalStorage';
import Footer from './components/Footer';

const App = () => {
  const savedEnabledColumns = LocalStorage.get('enabledColumns');
  const [enabledColumns, setEnabledColumns] = useState(savedEnabledColumns || Column.defaultColumns);
  return (
    <ThemeProvider>
      <BaseStyles>
        <Header>
          <Header.Item full>
            <Heading as="h1">NashGravePlot</Heading>
          </Header.Item>
          <Header.Item>
            <Settings enabledColumns={enabledColumns} setEnabledColumns={setEnabledColumns} />
          </Header.Item>
        </Header>
        <Box pb={4}>
          <IntermentList enabledColumns={enabledColumns} />
        </Box>
        <Footer />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;
