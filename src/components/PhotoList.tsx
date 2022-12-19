import React from 'react';
import { Box } from '@primer/react';
import PhotoDisplay from './PhotoDisplay';
import { PhotoLink } from '../models/NashvilleCemetery';
import type { CellProps } from 'react-table';

const PhotoList = ({ value }: CellProps<Record<string, unknown>>) => <Box minWidth="120px">
  {value.map((photo: PhotoLink) => {return <PhotoDisplay {...photo} key={photo.url} />})}
</Box>;

export default PhotoList;
