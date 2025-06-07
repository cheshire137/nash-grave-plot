import {useCallback} from 'react'
import type {CellProps} from 'react-table'
import AddressLines from './AddressLines'
import Cemetery from '../models/Cemetery'
import type {AddressFilterOption} from '../types'
import {PhotoList} from './PhotoList'

function AddressDisplay({setFilter, value}: CellProps<Record<string, unknown>>) {
  const cemetery = value as Cemetery
  const setAddressFilter = useCallback(
    (value?: AddressFilterOption) => {
      setFilter('address', value)
    },
    [setFilter]
  )

  return (
    <div>
      <AddressLines address={cemetery.address} setFilter={setAddressFilter} />
      {cemetery.hasPhotos() && <PhotoList value={cemetery.sitePhotoCaptionsByUrl} />}
    </div>
  )
}

export default AddressDisplay
