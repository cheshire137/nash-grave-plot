import React, {useContext, useEffect, useMemo, useState} from 'react'
import {PageContext} from '../contexts/PageContext'
import {CemeteryDataContext} from '../contexts/CemeteryDataContext'
import Masonry from 'react-responsive-masonry'
import {Pagination, PageLayout} from '@primer/react'
import getPageTitleForResults from '../utils/getPageTitleForResults'

const PhotoGallery = () => {
  const {interments} = useContext(CemeteryDataContext)
  const {setPageTitle} = useContext(PageContext)
  const imageData = useMemo(() => {
    const intermentsWithPhotos = interments.filter((interment) => interment.hasPhotos())
    let photoCaptionsByUrl: {[url: string]: string} = {}
    for (const interment of intermentsWithPhotos) {
      photoCaptionsByUrl = Object.assign(photoCaptionsByUrl, interment.gravePhotoCaptionsByUrl)
    }
    return Object.keys(photoCaptionsByUrl).map((src) => {
      const caption = photoCaptionsByUrl[src]
      return {src, caption, alt: caption, width: 200, height: 200}
    })
  }, [interments])
  const totalImages = imageData.length
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 12
  const endIndex = Math.min(imageData.length, currentPage * perPage)
  const startIndex = Math.max(0, endIndex - perPage)
  const totalPages = Math.ceil(imageData.length / perPage)

  useEffect(() => setPageTitle(getPageTitleForResults(totalImages, 'photo', 'photos')), [setPageTitle, totalImages])

  return (
    <PageLayout.Content padding="none" sx={{fontSize: 2}}>
      <Masonry columnsCount={4} gutter="10px">
        {imageData.slice(startIndex, endIndex).map((image) => (
          <img key={image.src} src={image.src} alt={image.alt} style={{width: '100%', display: 'block'}} />
        ))}
      </Masonry>
      <Pagination
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={(e, page) => {
          e.preventDefault()
          setCurrentPage(page)
        }}
      />
    </PageLayout.Content>
  )
}

export default PhotoGallery
