import React from 'react';
import { Box } from '@primer/react';
import PhotoDisplay from './PhotoDisplay';
import type PhotoLink from '../types/PhotoLink';

interface Props {
  value: PhotoLink[];
}

const PhotoList = ({ value }: Props) => <Box minWidth="120px">
  {value.map((photo: PhotoLink) => <PhotoDisplay {...photo} key={photo.url} />)}
</Box>;

export default PhotoList;
