import React, { useState } from 'react';
import { BaseStyles, Header, Heading, Text, ThemeProvider } from '@primer/components';
import IntermentList from './components/IntermentList';
import Settings from './components/Settings';
import Column from './models/Column';

const App = () => {
  const [enabledColumns, setEnabledColumns] = useState(Column.defaultColumns);
  return (
    <ThemeProvider>
      <BaseStyles>
        <Header>
          <Header.Item full>
            <Heading as="h1">NashGravePlot</Heading>
          </Header.Item>
          <Heading as="h2" fontSize="1" fontWeight="normal">
            Data from <Text
              as="a"
              target="_blank"
              color="white"
              rel="noopener noreferrer"
              href="https://data.nashville.gov/Geneology/Davidson-County-Cemetery-Survey/ttqg-mpiz"
            >Davidson County Cemetery Survey</Text>
          </Heading>
          <Header.Item>
            <Settings enabledColumns={enabledColumns} setEnabledColumns={setEnabledColumns} />
          </Header.Item>
        </Header>
        <IntermentList enabledColumns={enabledColumns} />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;
