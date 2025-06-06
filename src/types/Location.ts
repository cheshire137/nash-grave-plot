// https://dev.socrata.com/docs/datatypes/location.html#2.1
type Location = {
  latitude: string | null
  longitude: string | null
  human_address: {
    address: string
    city: string
    state: string
    zip: string
  } | null
}

export default Location
