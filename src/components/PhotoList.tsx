import React from 'react'
import {Box} from '@primer/react'
import PhotoDisplay from './PhotoDisplay'

interface PhotoListProps {
  value: {[url: string]: string}
}

const PhotoList = ({value}: PhotoListProps) => (
  <Box minWidth="120px">
    {Object.keys(value).map((url) => (
      <PhotoDisplay url={url} description={value[url]} key={url} />
    ))}
  </Box>
)

export default PhotoList
