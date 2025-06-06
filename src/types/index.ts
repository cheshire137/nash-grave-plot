export interface AddressFilterOption {
  address?: string
  hasPhotos?: boolean
}

export interface CemeteryFilterOption {
  graveyardType?: string
  name?: string
}

// https://dev.socrata.com/docs/datatypes/location.html#2.1
export interface Location {
  latitude: string | null
  longitude: string | null
  human_address: {
    address: string
    city: string
    state: string
    zip: string
  } | null
}

export type IntermentFieldGroup = 'Person' | 'Location' | 'Marker/Plot' | 'Parcel Numbers' | 'Survey' | 'Other'

export type IntermentField =
  | 'person'
  | 'deceasedInfo'
  | 'cemetery'
  | 'address'
  | 'siteHistory'
  | 'inscription'
  | 'footstone'
  | 'demarcation'
  | 'condition'
  | 'accessible'
  | 'restoration'
  | 'gravePhotos'
  | 'notes'
  | 'tractParcelNumber'
  | 'cemeteryParcelNumber'
  | 'originalSurvey'
  | 'surveyUpdates'
  | 'currentSurvey'

// https://data.nashville.gov/datasets/829ba5846e704ffd86b339f1ede647f7_0/explore GeoJSON format
export interface NashvilleCemeteryData {
  crs: {
    properties: {name: string}
    type: string
  }
  features: NashvilleCemeteryFeature[]
  type: string
}

export interface NashvilleCemeteryFeature {
  geometry: null
  id: number
  properties: NashvilleCemeteryFeatureProperties
  type: string
}

export interface NashvilleCemeteryFeatureProperties {
  OBJECTID: number
  Cemetery_Name: string
  Alternate_Cemetery_Name: string | null
  Map_ID: string
  Locale: string
  Condition: string | null
  Demarcation: string | null
  Accessible: string | null
  Site_Photo_1: string | null
  Site_Photo_2: string | null
  Site_Photo_3: string | null
  Site_Photo_4: string | null
  Site_Photo_5: string | null
  Site_Photo_6: string | null
  Known_Burials: number
  Interment: string
  Grave_Photo_1: string | null
  Grave_Photo_2: string | null
  Grave_Photo_3: string | null
  Inscription: string
  Death_Date: string
  Footstone: string | null
  Deceased_Info: string | null
  Original_Survey: string
  Survey_Update_s_: string | null
  Current_Survey: string
  Graveyard_Type: string
  Notes: string
  Restoration: string | null
  Site_History: string | null
  Site_Contact_Info: string | null
  Tract_Parcel_Number: string | null
  Cemetery_Parcel_Number: string | null
  Number: string | null
  Street: string
  Additional_Location_Information: string | null
  Latitude: string | null
  Longitude: string | null
  Archaeological_Information: string | null
  Mapped_Location: Location | null
}
