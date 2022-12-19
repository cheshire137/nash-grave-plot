import { NashvilleCemeteryData, Location } from "./NashvilleCemetery";

class Address {
  locale: string;
  mappedLocation: Location | null;
  street: string;
  number: string;
  geocode: string | null;
  streetAddress: string;
  additionalLocationInfo: string | null;
  latitude: string | null;
  longitude: string | null;

  constructor(props: NashvilleCemeteryData) {
    this.locale = props.locale;
    this.mappedLocation = props.mapped_location || null;
    this.latitude = props.latitude || null;
    this.longitude = props.longitude || null;
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
}

export default Address;
