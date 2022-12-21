import React, { useContext, useEffect, useMemo } from 'react';
import { PageContext } from '../contexts/PageContext';
import { CemeteryDataContext } from '../contexts/CemeteryDataContext';
import { Gallery, Image } from 'react-grid-gallery';

const PhotoGallery = () => {
  const { interments } = useContext(CemeteryDataContext);
  const { setPageTitle } = useContext(PageContext);
  const imageData: Image[] = useMemo(() => {
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

  return <Gallery enableImageSelection={false} images={imageData.slice(0, 10)} />;
};

export default PhotoGallery;
