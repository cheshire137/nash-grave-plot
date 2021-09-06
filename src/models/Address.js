class Address {
  constructor(props) {
    this.locale = props.locale || '';
    this.mappedLocation = props.mapped_location || '';
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    if (this.latitude && this.longitude) {
      this.geocode = `${this.latitude}, ${this.longitude}`;
    } else {
      this.geocode = '';
    }
    this.additionalLocationInfo = props.additional_location_information || '';
    this.street = props.street || '';
    this.number = props.number || '';
    this.streetAddress = [this.number, this.street].filter(info => info.trim().length > 0)
      .map(info => info.trim()).join(' ');
  }

  toString() {
    const parts = [this.locale, this.geocode, this.additionalLocationInfo, this.streetAddress];
    return parts.filter(part => part.trim().length > 0).join(' ');
  }
}

export default Address;
