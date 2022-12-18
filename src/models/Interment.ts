import Address from './Address';
import Inscription from './Inscription';
import { NashvilleCemeteryData, PhotoLink } from './NashvilleCemetery';

const parseAccessible = (accessible?: string | null) => {
  const lowercase = (accessible || '').toLowerCase();
  if (lowercase === 'yes' || lowercase === 'y') {
    return 'yes';
  }
  if (lowercase === 'no' || lowercase === 'n') {
    return 'no';
  }
  return lowercase;
};

const parseMonthDayYearString = (str: string) => {
  const regex = /^(\d\d?)\/(\d\d?)\/(\d\d\d\d)$/;
  const match = str.match(regex);

  if (match) {
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    return new Date(year, month - 1, day);
  }

  return null;
}

const parseYearMonthDayString = (str: string) => {
  const regex = /^(\d\d\d\d)-(\d\d?)-(\d\d?)/;
  const match = str.match(regex);

  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    return new Date(year, month - 1, day);
  }

  return null;
};

const parseDateString = (str?: string | null) => {
  if (typeof str !== 'string' || str.trim().length < 1) {
    return null;
  }

  let date = parseMonthDayYearString(str.trim());
  if (date) {
    return date;
  }

  date = parseYearMonthDayString(str.trim());
  if (date) {
    return date;
  }

  return str;
};

const parseGraveyardType = (graveyardType?: string | null) => {
  const lowercase = (graveyardType || '').toLowerCase();
  if (lowercase.match(/\s+graveyard$/)) {
    return lowercase.split(/\s+/)[0];
  }
  return lowercase;
}

class Interment {
  data: NashvilleCemeteryData;
  key: string;
  address: Address;
  graveyardType: string;
  currentSurvey: Date | string | null;
  surveyUpdates: Date | string | null;
  originalSurvey: Date | string | null;
  deathDate: Date | string | null;
  gravePhotos: PhotoLink[];
  sitePhotos: PhotoLink[];
  accessible: string;
  cemeteryName: string;

  constructor(props: NashvilleCemeteryData) {
    this.data = props;
    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.address = new Address(props);
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
  }

  getInscription() {
    return new Inscription(this.data.inscription);
  }
}

export default Interment;
