import React from 'react';
import { PhotoLink } from '../models/NashvilleCemetery';

const PhotoDisplay = ({ url, description }: PhotoLink) => <div>
  {url && description ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >{description}</a>
  ) : <span>{url}</span>}
</div>;

export default PhotoDisplay;
