import React from 'react'
import {Link} from '@primer/react'

interface PhotoDisplayProps {
  url: string
  description: string
}

function PhotoDisplay({url, description}: PhotoDisplayProps) {
  return (
    <div>
      {description.trim().length > 0 && url !== description ? (
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {description}
        </Link>
      ) : (
        <span>{url}</span>
      )}
    </div>
  )
}

export default PhotoDisplay
