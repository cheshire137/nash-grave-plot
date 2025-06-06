import Address from './Address';
import type {NashvilleCemeteryFeatureProperties} from '../types/NashvilleCemeteryData';
import parseGraveyardType from '../utils/parseGraveyardType';
import {getPhotoCaptionsByUrl} from '../utils/get-photo-captions-by-url';

class Cemetery {
  name: string;
  alternateCemeteryName: string | null;
  address: Address;
  graveyardType: string;
  siteHistory: string | null;
  sitePhotos: string[];
  sitePhotoCaptionsByUrl: { [url: string]: string };

  constructor(data: NashvilleCemeteryFeatureProperties) {
    this.name = data.Cemetery_Name;
    this.alternateCemeteryName = data.Alternate_Cemetery_Name;
    this.address = new Address(data);
    this.graveyardType = parseGraveyardType(data.Graveyard_Type);
    this.siteHistory = data.Site_History;
    this.sitePhotos = [];
    for (const text of [
      data.Site_Photo_1,
      data.Site_Photo_2,
      data.Site_Photo_3,
      data.Site_Photo_4,
      data.Site_Photo_5,
      data.Site_Photo_6,
    ]) {
      if (text && text.trim().length > 0) {
        this.sitePhotos.push(text.trim());
      }
    }
    this.sitePhotoCaptionsByUrl = getPhotoCaptionsByUrl(this.sitePhotos);

    if (!this.name || (typeof this.name === 'string' && this.name.length < 0)) {
      if (typeof this.alternateCemeteryName === 'string' && this.alternateCemeteryName.length > 0) {
        this.name = this.alternateCemeteryName;
      }
    }
  }

  hasPhotos() {
    return this.sitePhotos.length > 0;
  }

  toString() {
    return `${this.name} at ${this.address.toString()}`;
  }
}

export default Cemetery;
