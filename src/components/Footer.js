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
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Link
        target="_blank"
        display="inline-block"
        mr={4}
        muted={true}
        rel="noopener noreferrer"
        href="https://github.com/cheshire137/nash-grave-plot"
      >View source</Link>
      <span>
        Data from <Link
          target="_blank"
          muted={true}
          rel="noopener noreferrer"
          href="https://data.nashville.gov/Geneology/Davidson-County-Cemetery-Survey/ttqg-mpiz"
        >Davidson County Cemetery Survey</Link>
      </span>
    </Box>
  );
};

export default Footer;
