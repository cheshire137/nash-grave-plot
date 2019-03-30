import React, { Component } from 'react';

class PhotoDisplay extends Component {
  render() {
    const { text, url, title } = this.props;

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
  }
}

export default PhotoDisplay;
