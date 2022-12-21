import React, { useContext, useEffect, useMemo } from 'react';
import { PageContext } from '../contexts/PageContext';
import { CemeteryDataContext } from '../contexts/CemeteryDataContext';
import Masonry from 'react-responsive-masonry';

const PhotoGallery = () => {
  const { interments } = useContext(CemeteryDataContext);
  const { setPageTitle } = useContext(PageContext);
  const imageData = useMemo(() => {
    const intermentsWithPhotos = interments.filter(interment => interment.hasPhotos());
    let photoCaptionsByUrl: { [url: string]: string } = {};
    for (const interment of intermentsWithPhotos) {
      photoCaptionsByUrl = Object.assign(photoCaptionsByUrl, interment.getPhotoCaptionsByUrl());
    }
    return Object.keys(photoCaptionsByUrl).map(src => {
      const caption = photoCaptionsByUrl[src];
      return { src, caption, alt: caption, width: 200, height: 200 };
    });
  }, [interments]);

  useEffect(() => setPageTitle('Photo gallery'), [setPageTitle]);

  return <Masonry columnsCount={3} gutter="10px">
    {imageData.slice(0, 10).map(image => <img
      key={image.src}
      src={image.src}
      alt={image.alt}
      style={{ width: '100%', display: 'block' }}
    />)}
  </Masonry>;
};

export default PhotoGallery;
