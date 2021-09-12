import React from 'react';
import { BaseStyles, Header, Heading, Text, ThemeProvider } from '@primer/components';
import IntermentList from './components/IntermentList';

const App = () => {
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
        </Header>
        <IntermentList />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;
