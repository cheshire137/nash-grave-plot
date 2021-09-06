import Photo from './Photo';
import Address from './Address';
import Inscription from './Inscription';

const parseAccessible = accessible => {
  const lowercase = (accessible || '').toLowerCase();
  if (lowercase === 'yes' || lowercase === 'y') {
    return 'yes';
  }
  if (lowercase === 'no' || lowercase === 'n') {
    return 'no';
  }
  return lowercase;
};

const parseMonthDayYearString = str => {
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

const parseYearMonthDayString = str => {
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

const parseDateString = str => {
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

const parseGraveyardType = graveyardType => {
  const lowercase = (graveyardType || '').toLowerCase();
  if (lowercase.match(/\s+graveyard$/)) {
    return lowercase.split(/\s+/)[0];
  }
  return lowercase;
}

const extractPhotos = (props, photoAttrs) => {
  const photos = [];
  let i = 0;
  for (const attr of photoAttrs) {
    if (typeof props[attr] === 'string' && props[attr].length > 0) {
      const photo = new Photo(i, props[attr]);
      photos.push(photo);
      i++;
    }
  }
  return photos;
};

class Interment {
  constructor(props) {
    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.person = props.interment;
    this.archaeologicalInfo = props.archaeological_information;
    this.address = new Address(props);
    this.cemeteryParcelNumber = props.cemetery_parcel_number;
    this.tractParcelNumber = props.tract_parcel_number;
    this.siteContactInfo = props.site_contact_info;
    this.siteHistory = props.site_history;
    this.restoration = props.restoration;
    this.notes = props.notes;
    this.graveyardType = parseGraveyardType(props.graveyard_type);
    this.currentSurvey = parseDateString(props.current_survey);
    this.surveyUpdates = parseDateString(props.survey_update_s);
    this.originalSurvey = parseDateString(props.original_survey);
    this.deceasedInfo = props.deceased_info;
    this.footstone = props.footstone;
    this.deathDate = parseDateString(props.death_date);
    this.inscription = new Inscription(props.inscription);
    this.gravePhotos = extractPhotos(props, ['grave_photo_link', 'grave_photo_2', 'grave_photo_3']);
    this.knownBurials = props.known_burials;
    this.sitePhotos = extractPhotos(props, ['site_photo_link', 'site_photo_2', 'site_photo_3', 'site_photo_4',
      'site_photo_5', 'site_photo_6']);
    this.accessible = parseAccessible(props.accessible);
    this.demarcation = props.demarcation;
    this.condition = props.condition;
    this.mapID = props.map_id;
    this.alternateCemeteryName = props.alternate_cemetery_name;
    this.cemeteryName = props.cemetery_name;
    if (!this.cemeteryName || (typeof this.cemeteryName === 'string' && this.cemeteryName.length < 0)) {
      if (typeof this.alternateCemeteryName === 'string' && this.alternateCemeteryName.length > 0) {
        this.cemeteryName = this.alternateCemeteryName;
      }
    }
  }
}

export default Interment;
