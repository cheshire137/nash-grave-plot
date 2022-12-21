import React, { useContext } from 'react';
import { Header, Heading, Box } from '@primer/react';
import Footer from './Footer';
import { PageContext } from '../contexts/PageContext';
import { useHref, Outlet } from 'react-router-dom';

const AppLayout = () => {
  const { pageTitle, headerItems } = useContext(PageContext);

  return <>
    <Header>
      <Header.Item full sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Heading as="h1" sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Header.Link href="">NashGravePlot</Header.Link>
        </Heading>
        {pageTitle && pageTitle.length > 0 && <Heading
          as="h2"
          sx={{ fontWeight: 'normal', fontSize: 3, mx: 4 }}
        >{pageTitle}</Heading>}
        <Header.Link href={useHref('/')}>Data</Header.Link>
      </Header.Item>
      {headerItems.map(headerItem => <Header.Item key={JSON.stringify(headerItem)}>{headerItem}</Header.Item>)}
    </Header>
    <Box pb={4} fontSize="2"><Outlet /></Box>
    <Footer />
  </>;
};

export default AppLayout;
