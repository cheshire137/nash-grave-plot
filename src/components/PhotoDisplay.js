import React from 'react';

const PhotoDisplay = ({ text, url, title }) => {
  return (
    <div>
      {url && title ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >{title}</a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default PhotoDisplay;
