import React from 'react';
import type PhotoLink from '../types/PhotoLink';

const PhotoDisplay = ({ url, description }: PhotoLink) => <div>
  {url && description ? <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >{description}</a> : <span>{url}</span>}
</div>;

export default PhotoDisplay;
