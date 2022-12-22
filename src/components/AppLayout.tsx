import React, { useContext } from 'react';
import { Header, Heading, PageLayout } from '@primer/react';
import Footer from './Footer';
import { PageContext } from '../contexts/PageContext';
import { useHref, Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const { pageTitle, headerItems } = useContext(PageContext);
  const { pathname } = useLocation();

  return <PageLayout containerWidth="full" padding="none" rowGap="none" columnGap="none">
    <PageLayout.Header>
      <Header>
        <Header.Item full sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Heading as="h1" sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Header.Link href={useHref('/')}>NashGravePlot</Header.Link>
          </Heading>
          {pageTitle && pageTitle.length > 0 && <Heading
            as="h2"
            sx={{ fontWeight: 'normal', fontSize: 3, mx: 4 }}
          >{pageTitle}</Heading>}
          <Header.Link sx={{
            borderBottom: pathname === '/' ? '1px solid' : null,
          }} href={useHref('/')}>Data</Header.Link>
          <Header.Link sx={{
            ml: 4,
            borderBottom: pathname === '/photos' ? '1px solid' : null,
          }} href={useHref('/photos')}>Photos</Header.Link>
          <Header.Link sx={{
            ml: 4,
            borderBottom: pathname === '/about' ? '1px solid' : null,
          }} href={useHref('/about')}>About</Header.Link>
        </Header.Item>
        {headerItems.map(headerItem => <Header.Item key={JSON.stringify(headerItem)}>{headerItem}</Header.Item>)}
      </Header>
    </PageLayout.Header>
    <Outlet />
    <PageLayout.Footer divider="line" padding="normal">
      <Footer />
    </PageLayout.Footer>
  </PageLayout>;
};

export default AppLayout;
