import React from 'react';
import type PhotoLink from '../types/PhotoLink';
import { Link } from '@primer/react';

const PhotoDisplay = ({ url, description }: PhotoLink) => <div>
  {url && description ? <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >{description}</Link> : <span>{url}</span>}
</div>;

export default PhotoDisplay;
