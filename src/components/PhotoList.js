import React from 'react';
import PhotoDisplay from './PhotoDisplay';

const PhotoList = ({value}) => {
  return (
    <div>
      {value.map(photo => (
        <PhotoDisplay {...photo} key={photo.text} />
      ))}
    </div>
  )
};

export default PhotoList;
