import React, { useContext, useEffect } from 'react';
import { PageContext } from '../contexts/PageContext';
import { CemeteryDataContext } from '../contexts/CemeteryDataContext';

const PhotoGallery = () => {
  const { interments } = useContext(CemeteryDataContext);
  const { setPageTitle } = useContext(PageContext);

  useEffect(() => setPageTitle('Photo gallery'), [setPageTitle]);

  return <>
  </>;
};

export default PhotoGallery;
