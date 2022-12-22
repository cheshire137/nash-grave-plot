import Address from './Address';
import type NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import type PhotoLink from '../types/PhotoLink';
import parseGraveyardType from '../utils/parseGraveyardType';

class Cemetery {
  name: string;
  alternateCemeteryName: string | null;
  address: Address;
  graveyardType: string;
  siteHistory: string | null;
  sitePhotos: PhotoLink[];

  constructor(data: NashvilleCemeteryData) {
    this.name = data.cemetery_name;
    this.alternateCemeteryName = data.alternate_cemetery_name || null;
    this.address = new Address(data);
    this.graveyardType = parseGraveyardType(data.graveyard_type);
    this.siteHistory = data.site_history || null;
    this.sitePhotos = [data.site_photo_link, data.site_photo_2, data.site_photo_3, data.site_photo_4,
      data.site_photo_5, data.site_photo_6].filter(pl => pl).map(pl => pl as PhotoLink);

    if (!this.name || (typeof this.name === 'string' && this.name.length < 0)) {
      if (typeof this.alternateCemeteryName === 'string' && this.alternateCemeteryName.length > 0) {
        this.name = this.alternateCemeteryName;
      }
    }
  }

  hasPhotos() {
    return this.sitePhotos.length > 0;
  }

  getPhotoCaptionsByUrl() {
    const result: { [url: string]: string } = {};
    for (const photoLink of this.sitePhotos) {
      result[photoLink.url] = this.toString();
    }
    return result;
  }

  toString() {
    return `${this.name} at ${this.address.toString()}`;
  }
}

export default Cemetery;
