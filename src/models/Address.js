class Address {
  constructor(props) {
    this.locale = props.Locale;
    this.mappedLocation = props['Mapped Location'];
    this.latitude = props.Latitude;
    this.longitude = props.Longitude;
    if (this.latitude && this.longitude) {
      this.geocode = `${this.latitude}, ${this.longitude}`;
    }
    this.additionalLocationInfo = props['Additional Location Information'];
    this.street = props.Street;
    this.number = props.Number;
    this.streetAddress = [props.Number, props.Street].
      filter(info => typeof info === 'string' && info.trim().length > 0).
      map(info => info.trim()).
      join(' ');
  }

  toString() {
    const parts = [
      this.locale,
      this.mappedLocation,
      this.latitude,
      this.longitude,
      this.additionalLocationInfo,
      this.street,
      this.number
    ];
    return parts.
      filter(part => typeof part === 'string' && part.trim().length > 0).
      join(' ');
  }
}

export default Address;
