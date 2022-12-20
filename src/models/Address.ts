import type NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import type Location from '../types/Location';

class Address {
  locale: string;
  street: string;
  number: string;
  geocode: string | null;
  streetAddress: string;
  additionalLocationInfo: string | null;
  latitude: string | null;
  longitude: string | null;

  constructor(props: NashvilleCemeteryData) {
    this.locale = props.locale;
    this.latitude = props.latitude || null;
    this.longitude = props.longitude || null;
    if (props.mapped_location) {
      if (props.mapped_location.latitude && !this.latitude) this.latitude = props.mapped_location.latitude;
      if (props.mapped_location.longitude && !this.longitude) this.longitude = props.mapped_location.longitude;
    }
    this.geocode = null;
    if (this.latitude && this.longitude) {
      this.geocode = `${this.latitude}, ${this.longitude}`;
    }
    this.additionalLocationInfo = props.additional_location_information || null;
    this.street = props.street || '';
    this.number = props.number || '';
    this.streetAddress = [this.number, this.street].filter(info => info.trim().length > 0)
      .map(info => info.trim()).join(' ');
  }

  toString() {
    const parts = [this.geocode, this.additionalLocationInfo];
    if (this.streetAddress.includes(this.locale)) {
      parts.unshift(this.streetAddress);
    } else {
      parts.unshift(this.streetAddress, this.locale);
    }
    return parts.filter(part => part && part.trim().length > 0).join(' ');
  }

  getMapsUrl() {
    let query: string;
    if (this.latitude && this.longitude) {
      query = `${this.latitude},${this.longitude}`;
    } else {
      query = `${this.streetAddress} Nashville, TN USA`;
    }
    let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    if (this.additionalLocationInfo) {
      url += `&query_place_id=${encodeURIComponent(this.additionalLocationInfo)}`;
    }
    return url;
  }
}

export default Address;
