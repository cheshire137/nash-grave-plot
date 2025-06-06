import Inscription from './Inscription'
import Address from './Address'
import parseDateString from '../utils/parseDateString'
import parseAccessible from '../utils/parseAccessible'
import type {NashvilleCemeteryFeature} from '../types/NashvilleCemeteryData'
import Cemetery from './Cemetery'
import Person from './Person'
import {getPhotoCaptionsByUrl} from '../utils/get-photo-captions-by-url'

class Interment {
  key: string
  person: Person
  currentSurvey: Date | string | null
  surveyUpdates: Date | string | null
  originalSurvey: Date | string | null
  gravePhotos: string[]
  gravePhotoCaptionsByUrl: {[url: string]: string}
  accessible: string
  archaeologicalInfo: string | null
  cemeteryParcelNumber: string | null
  tractParcelNumber: string | null
  siteContactInfo: string | null
  siteHistory: string | null
  restoration: string | null
  notes: string
  footstone: string | null
  inscription: Inscription
  knownBurials: number
  demarcation: string | null
  condition: string | null
  mapID: string
  cemetery: Cemetery
  address: Address

  constructor({properties: props}: NashvilleCemeteryFeature) {
    this.person = new Person(props)
    this.footstone = props.Footstone
    this.key = '_' + Math.random().toString(36).substr(2, 9)
    this.demarcation = props.Demarcation
    this.archaeologicalInfo = props.Archaeological_Information
    this.condition = props.Condition
    this.mapID = props.Map_ID
    this.siteContactInfo = props.Site_Contact_Info
    this.tractParcelNumber = props.Tract_Parcel_Number
    this.cemeteryParcelNumber = props.Cemetery_Parcel_Number
    this.restoration = props.Restoration
    this.notes = props.Notes
    this.knownBurials = props.Known_Burials
    this.currentSurvey = parseDateString(props.Current_Survey)
    this.surveyUpdates = parseDateString(props.Survey_Update_s_)
    this.originalSurvey = parseDateString(props.Original_Survey)
    this.gravePhotos = []
    for (const text of [props.Grave_Photo_1, props.Grave_Photo_2, props.Grave_Photo_3]) {
      if (text && text.trim().length > 0) {
        this.gravePhotos.push(text.trim())
      }
    }
    this.gravePhotoCaptionsByUrl = getPhotoCaptionsByUrl(this.gravePhotos)
    this.accessible = parseAccessible(props.Accessible)
    this.cemetery = new Cemetery(props)
    this.siteHistory = this.cemetery.siteHistory
    this.address = this.cemetery.address
    this.inscription = new Inscription(props.Inscription)
  }

  hasPhotos() {
    return this.gravePhotos.length > 0 || this.cemetery.hasPhotos()
  }

  graveCaption() {
    return `${this.person} in ${this.cemetery.toString()}`
  }
}

export default Interment
