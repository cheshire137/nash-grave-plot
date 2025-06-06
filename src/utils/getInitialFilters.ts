import type {AddressFilterOption} from '../types'

const getInitialFilters = (searchParams: URLSearchParams) => {
  const addressFilterValue: AddressFilterOption = {}
  if (searchParams.has('address')) {
    addressFilterValue.address = searchParams.get('address')!
  }
  if (searchParams.has('site_photos')) {
    addressFilterValue.hasPhotos = searchParams.get('site_photos') === '1'
  }
  const addressFilter = {id: 'address', value: addressFilterValue}
  return [addressFilter]
}

export default getInitialFilters
