import React, { useEffect, useContext } from 'react';
import { PageContext } from '../contexts/PageContext';
import { Link, PageLayout, Box } from '@primer/react';

const AboutPage = () => {
  const { setPageTitle } = useContext(PageContext);

  useEffect(() => setPageTitle('About this site'), [setPageTitle]);

  return <PageLayout.Content padding="normal" sx={{ fontSize: 2 }}>
    <Box sx={{ maxWidth: '31em' }}>
      <p>Hi! I live in Nashville, Tennessee and have an interest in some of the local cemeteries. I wanted to build this
        app to explore the data that the <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://data.nashville.gov/Genealogy/Davidson-County-Cemetery-Survey/ttqg-mpiz"
        >Nashville Open Data Portal</Link> provides.</p>
    </Box>
  </PageLayout.Content>;
}

export default AboutPage;