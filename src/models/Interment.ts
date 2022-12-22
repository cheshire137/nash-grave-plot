import Inscription from './Inscription';
import Address from './Address';
import parseDateString from '../utils/parseDateString';
import parseAccessible from '../utils/parseAccessible';
import type NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import type PhotoLink from '../types/PhotoLink';
import Cemetery from './Cemetery';

class Interment {
  person: string;
  key: string;
  currentSurvey: Date | string | null;
  surveyUpdates: Date | string | null;
  originalSurvey: Date | string | null;
  deathDate: Date | string | null;
  gravePhotos: PhotoLink[];
  accessible: string;
  archaeologicalInfo: string | null;
  cemeteryParcelNumber: string | null;
  tractParcelNumber: string;
  siteContactInfo: string | null;
  siteHistory: string | null;
  restoration: string | null;
  notes: string;
  deceasedInfo: string | null;
  footstone: string | null;
  inscription: Inscription;
  knownBurials: string;
  demarcation: string | null;
  condition: string | null;
  mapID: string;
  cemetery: Cemetery;
  address: Address;

  constructor(props: NashvilleCemeteryData) {
    this.footstone = props.footstone || null;
    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.person = props.interment;
    this.demarcation = props.demarcation || null;
    this.archaeologicalInfo = props.archaeological_information || null;
    this.condition = props.condition || null;
    this.mapID = props.map_id;
    this.siteContactInfo = props.site_contact_info || null;
    this.tractParcelNumber = props.tract_parcel_number;
    this.cemeteryParcelNumber = props.cemetery_parcel_number || null;
    this.restoration = props.restoration || null;
    this.notes = props.notes;
    this.knownBurials = props.known_burials;
    this.deceasedInfo = props.deceased_info || null;
    this.currentSurvey = parseDateString(props.current_survey);
    this.surveyUpdates = parseDateString(props.survey_update_s);
    this.originalSurvey = parseDateString(props.original_survey);
    this.deathDate = parseDateString(props.death_date);
    this.gravePhotos = [props.grave_photo_link, props.grave_photo_2, props.grave_photo_3]
      .filter(pl => pl).map(pl => pl as PhotoLink);
    this.accessible = parseAccessible(props.accessible);
    this.cemetery = new Cemetery(props);
    this.siteHistory = this.cemetery.siteHistory;
    this.address = this.cemetery.address;
    this.inscription = new Inscription(props.inscription);
  }

  hasPhotos() {
    return this.gravePhotos.length > 0 || this.cemetery.hasPhotos();
  }

  getPhotoCaptionsByUrl() {
    const result: { [url: string]: string } = {};
    for (const photoLink of this.gravePhotos) {
      result[photoLink.url] = this.graveCaption();
    }
    return Object.assign(result, this.cemetery.getPhotoCaptionsByUrl());
  }

  graveCaption() {
    return `${this.person} in ${this.cemetery.toString()}`;
  }
}

export default Interment;
