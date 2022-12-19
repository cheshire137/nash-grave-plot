import Address from './Address';
import Inscription from './Inscription';
import parseDateString from '../utils/parseDateString';
import parseGraveyardType from '../utils/parseGraveyardType';
import parseAccessible from '../utils/parseAccessible';
import type NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import type PhotoLink from '../types/PhotoLink';

class Interment {
  person: string;
  key: string;
  address: Address;
  graveyardType: string | null;
  currentSurvey: Date | string | null;
  surveyUpdates: Date | string | null;
  originalSurvey: Date | string | null;
  deathDate: Date | string | null;
  gravePhotos: PhotoLink[];
  sitePhotos: PhotoLink[];
  accessible: string | null;
  cemeteryName: string;
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
  alternateCemeteryName: string | null;

  constructor(props: NashvilleCemeteryData) {
    this.footstone = props.footstone || null;
    this.alternateCemeteryName = props.alternate_cemetery_name || null;
    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.person = props.interment;
    this.demarcation = props.demarcation || null;
    this.archaeologicalInfo = props.archaeological_information || null;
    this.address = new Address(props);
    this.condition = props.condition || null;
    this.mapID = props.map_id;
    this.siteContactInfo = props.site_contact_info || null;
    this.tractParcelNumber = props.tract_parcel_number;
    this.cemeteryParcelNumber = props.cemetery_parcel_number || null;
    this.siteHistory = props.site_history || null;
    this.restoration = props.restoration || null;
    this.notes = props.notes;
    this.knownBurials = props.known_burials;
    this.deceasedInfo = props.deceased_info || null;
    this.graveyardType = parseGraveyardType(props.graveyard_type);
    this.currentSurvey = parseDateString(props.current_survey);
    this.surveyUpdates = parseDateString(props.survey_update_s);
    this.originalSurvey = parseDateString(props.original_survey);
    this.deathDate = parseDateString(props.death_date);
    this.gravePhotos = [props.grave_photo_link, props.grave_photo_2, props.grave_photo_3]
      .filter(pl => pl).map(pl => pl as PhotoLink);
    this.sitePhotos = [props.site_photo_link, props.site_photo_2, props.site_photo_3, props.site_photo_4,
      props.site_photo_5, props.site_photo_6].filter(pl => pl).map(pl => pl as PhotoLink);
    this.accessible = parseAccessible(props.accessible);
    this.cemeteryName = props.cemetery_name;
    if (!this.cemeteryName || (typeof this.cemeteryName === 'string' && this.cemeteryName.length < 0)) {
      if (typeof props.alternate_cemetery_name === 'string' && props.alternate_cemetery_name.length > 0) {
        this.cemeteryName = props.alternate_cemetery_name;
      }
    }
    this.inscription = new Inscription(props.inscription);
  }
}

export default Interment;
