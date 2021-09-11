import React from 'react';
import { Box } from '@primer/components';
import PhotoDisplay from './PhotoDisplay';

const PhotoList = ({ value }) => <Box minWidth="120px">
  {value.map(photo => (
    <PhotoDisplay {...photo} key={photo.text} />
  ))}
</Box>;

export default PhotoList;
