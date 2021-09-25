import React from 'react';
import { Box, Link } from '@primer/components';

const Footer = () => {
  return (
    <Box
      mt={4}
      p={4}
      textAlign="center"
      borderTopWidth={1}
      borderColor="border.default"
      borderTopStyle="solid"
    >
      Data from <Link
        target="_blank"
        muted={true}
        rel="noopener noreferrer"
        href="https://data.nashville.gov/Geneology/Davidson-County-Cemetery-Survey/ttqg-mpiz"
      >Davidson County Cemetery Survey</Link>
    </Box>
  );
};

export default Footer;
