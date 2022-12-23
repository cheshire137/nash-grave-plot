import type AddressFilterOption from '../types/AddressFilterOption';
import type CemeteryFilterOption from '../types/CemeteryFilterOption';
import Interment from '../models/Interment';

const getInitialFilters = (searchParams: URLSearchParams) => {
  const addressFilterValue: AddressFilterOption = {};
  if (searchParams.has('address')) {
    addressFilterValue.address = searchParams.get('address')!;
  }
  // const cemeteryFilterValue: CemeteryFilterOption = {};
  // if (searchParams.has('site_photos')) {
  //   cemeteryFilterValue.hasPhotos = searchParams.get('site_photos') === '1';
  // }
  const addressFilter = { id: 'address', value: addressFilterValue };
  return [addressFilter];
};

export default getInitialFilters;
