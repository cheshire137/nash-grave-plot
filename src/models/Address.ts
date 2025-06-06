import type {NashvilleCemeteryFeatureProperties} from '../types'

class Address {
  locale: string
  street: string
  number: string
  geocode: string | null
  streetAddress: string
  additionalLocationInfo: string | null
  latitude: string | null
  longitude: string | null

  constructor(props: NashvilleCemeteryFeatureProperties) {
    this.locale = props.Locale
    this.latitude = props.Latitude
    this.longitude = props.Longitude
    if (props.Mapped_Location) {
      if (props.Mapped_Location.latitude && !this.latitude) this.latitude = props.Mapped_Location.latitude
      if (props.Mapped_Location.longitude && !this.longitude) this.longitude = props.Mapped_Location.longitude
    }
    this.geocode = null
    if (this.latitude && this.longitude) {
      this.geocode = `${this.latitude}, ${this.longitude}`
    }
    this.additionalLocationInfo = null
    if (props.Additional_Location_Information && props.Additional_Location_Information.trim().length > 0) {
      this.additionalLocationInfo = props.Additional_Location_Information.trim()
    }
    this.street = props.Street || ''
    this.number = props.Number || ''
    this.streetAddress = [this.number, this.street]
      .filter((info) => info.trim().length > 0)
      .map((info) => info.trim())
      .join(' ')
  }

  toString() {
    const parts = [this.geocode, this.additionalLocationInfo]
    if (this.streetAddress.includes(this.locale)) {
      parts.unshift(this.streetAddress)
    } else {
      parts.unshift(this.streetAddress, this.locale)
    }
    return parts.filter((part) => part && part.trim().length > 0).join(' ')
  }

  getMapsUrl() {
    let query: string
    if (this.latitude && this.longitude) {
      query = `${this.latitude},${this.longitude}`
    } else {
      query = `${this.streetAddress} Nashville, TN USA`
    }
    let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    if (this.additionalLocationInfo) {
      url += `&query_place_id=${encodeURIComponent(this.additionalLocationInfo)}`
    }
    return url
  }
}

export default Address
