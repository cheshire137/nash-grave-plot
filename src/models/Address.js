class Address {
  constructor(props) {
    this.locale = props.locale;
    this.mappedLocation = props.mapped_location;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    if (this.latitude && this.longitude) {
      this.geocode = `${this.latitude}, ${this.longitude}`;
    }
    this.additionalLocationInfo = props.additional_location_information;
    this.street = String(props.street);
    this.number = String(props.number);
    this.streetAddress = [this.number, this.street].filter(info => info.trim().length > 0)
      .map(info => info.trim()).join(' ');
  }

  toString() {
    const parts = [
      String(this.locale),
      String(this.mappedLocation),
      String(this.latitude),
      String(this.longitude),
      String(this.additionalLocationInfo),
      String(this.street),
      String(this.number)
    ];
    return parts.filter(part => part.trim().length > 0).join(' ');
  }
}

export default Address;
