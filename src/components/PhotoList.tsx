import React from 'react';
import { Box } from '@primer/react';
import PhotoDisplay from './PhotoDisplay';
import { PhotoLink } from '../models/NashvilleCemetery';

interface Props {
  value: PhotoLink[];
}

const PhotoList = ({ value }: Props) => <Box minWidth="120px">
  {value.map(photo => {return <PhotoDisplay {...photo} key={photo.url} />})}
</Box>;

export default PhotoList;
