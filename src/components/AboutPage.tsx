import React, { useEffect, useContext } from 'react';
import { PageContext } from '../contexts/PageContext';
import { Link } from '@primer/react';

const AboutPage = () => {
  const { setPageTitle, setPadding } = useContext(PageContext);

  useEffect(() => setPageTitle('About'), [setPageTitle]);
  useEffect(() => setPadding('normal'), [setPadding]);

  return <>
    <p>Hi! I live in Nashville, Tennessee and have an interest in some of the local cemeteries. I wanted to build this
      app to explore the data that the <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://data.nashville.gov/Genealogy/Davidson-County-Cemetery-Survey/ttqg-mpiz"
      >Nashville Open Data Portal</Link> provides.</p>
  </>;
}

export default AboutPage;
