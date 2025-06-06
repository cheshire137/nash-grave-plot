import React from 'react'
import {Box, Link} from '@primer/react'

const Footer = () => (
  <Box display="flex" alignItems="center" sx={{fontSize: 1}}>
    <Link
      target="_blank"
      sx={{display: 'inline-block'}}
      muted={true}
      rel="noopener noreferrer"
      href="https://github.com/cheshire137/nash-grave-plot"
    >
      View source
    </Link>
    <Box display="inline-block" mx="4">
      Data from{' '}
      <Link
        target="_blank"
        muted={true}
        rel="noopener noreferrer"
        href="https://data.nashville.gov/maps/829ba5846e704ffd86b339f1ede647f7"
      >
        Davidson County Cemetery Survey
      </Link>
    </Box>
    <span>Data last updated Oct 17, 2023</span>
  </Box>
)

export default Footer
