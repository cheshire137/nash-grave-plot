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
    this.street = String(props.Street);
    this.number = String(props.Number);
    this.streetAddress = [this.number, this.street].
      filter(info => info.trim().length > 0).
      map(info => info.trim()).
      join(' ');
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
    return parts.
      filter(part => part.trim().length > 0).
      join(' ');
  }
}

export default Address;
