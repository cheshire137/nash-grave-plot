import React from 'react';
import { Box } from '@primer/react';
import PhotoDisplay from './PhotoDisplay';

const PhotoList = ({ value }) => <Box minWidth="120px">
  {value.map(photo => {return <PhotoDisplay {...photo} key={photo.url} />})}
</Box>;

export default PhotoList;
