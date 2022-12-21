import React, { useContext } from 'react';
import { Header, Text, Heading, Box, TabNav } from '@primer/react';
import Footer from './Footer';
import { PageContext } from '../contexts/PageContext';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const { pageTitle, headerItems } = useContext(PageContext);

  return <>
    <Header sx={{ pb: 0 }}>
      <Header.Item>
        <Heading as="h1" sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Header.Link href="">NashGravePlot</Header.Link>
          {pageTitle && pageTitle.length > 0 && <Text
            ml={4}
            display="inline-block"
            fontWeight="normal"
            fontSize="3"
          >{pageTitle}</Text>}
        </Heading>
      </Header.Item>
      <Header.Item full>
        <TabNav aria-label="Main navigation">
          <TabNav.Link href="/" selected>Data</TabNav.Link>
        </TabNav>
      </Header.Item>
      {headerItems.map(headerItem => <Header.Item key={JSON.stringify(headerItem)}>{headerItem}</Header.Item>)}
    </Header>
    <Box pb={4} fontSize="2">{children}</Box>
    <Footer />
  </>;
};

export default AppLayout;
