import React from 'react';
import { BaseStyles, Box, Heading, ThemeProvider } from '@primer/components';
import IntermentList from './components/IntermentList';

const App = () => {
  return (
    <ThemeProvider>
      <BaseStyles>
        <header>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Heading as="h1">NashGravePlot</Heading>
            <Heading as="h2" fontSize="1" fontWeight="normal">
              Data from <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://data.nashville.gov/Geneology/Davidson-County-Cemetery-Survey/ttqg-mpiz"
              >Davidson County Cemetery Survey</a>
            </Heading>
          </Box>
        </header>
        <IntermentList />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default App;
