import React from 'react';
import { Box } from '@primer/components';
import PhotoDisplay from './PhotoDisplay';

const PhotoList = ({ value }) => <Box minWidth="120px">
  {value.map(photo => {return <PhotoDisplay {...photo} key={photo.url} />})}
</Box>;

export default PhotoList;
