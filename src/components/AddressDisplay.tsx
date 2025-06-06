import type {CellProps} from 'react-table'
import AddressLines from './AddressLines'
import Cemetery from '../models/Cemetery'
import PhotoList from './PhotoList'

function AddressDisplay({value}: CellProps<Record<string, unknown>>) {
  const cemetery = value as Cemetery
  return (
    <div>
      <AddressLines address={cemetery.address} />
      {cemetery.hasPhotos() && <PhotoList value={cemetery.sitePhotoCaptionsByUrl} />}
    </div>
  )
}

export default AddressDisplay
