import React from 'react';

const PhotoDisplay = ({ url, description }) => {
  return (
    <div>
      {url && description ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >{description}</a>
      ) : (
        <span>{url}</span>
      )}
    </div>
  );
};

export default PhotoDisplay;
