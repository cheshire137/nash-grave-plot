import NashvilleCemeteries from '../nashville-cemeteries.json';

const interments = [];

class Interment {
  static findAll() {
    if (interments.length < 1) {
      for (const data of NashvilleCemeteries) {
        interments.push(new Interment(data))
      }
    }
    return interments;
  }

  constructor(props) {
    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.person = props.Interment;
    this.mappedLocation = props['Mapped Location'];
    this.archaeologicalInfo = props['Archaeological Information'];
    this.latitude = props.Latitude;
    this.longitude = props.Longitude;
    if (this.latitude && this.longitude) {
      this.geocode = `${this.latitude}, ${this.longitude}`;
    }
    this.additionalLocationInfo = props['Additional Location Information'];
    this.street = props.Street;
    this.number = props.Number;
    this.address = [this.number, this.street].filter(info => typeof info === 'string' && info.trim().length > 0).map(info => info.trim()).join(' ');
    this.cemeteryParcelNumber = props['Cemetery Parcel Number'];
    this.tractParcelNumber = props['Tract Parcel Number'];
    this.siteContactInfo = props['Site Contact Info'];
    this.siteHistory = props['Site History'];
    this.restoration = props.Restoration;
    this.notes = props.Notes;
    this.graveyardType = props['Graveyard Type'];
    this.currentSurvey = props['Current Survey'];
    this.surveyUpdates = props['Survey Update(s)'];
    this.originalSurvey = props['Original Survey'];
    this.deceasedInfo = props['Deceased Info'];
    this.footstone = props.Footstone;
    this.deathDate = props['Death Date'];
    this.inscription = props.Inscription;
    this.gravePhotos = [];
    for (let i = 1; i <= 3; i++) {
      if (typeof props[`Grave Photo ${i}`] === 'string' && props[`Grave Photo ${i}`].length > 0) {
        this.gravePhotos.push(props[`Grave Photo ${i}`]);
      }
    }
    this.knownBurials = props['Known Burials'];
    this.sitePhotos = [];
    for (let i = 1; i <= 6; i++) {
      if (typeof props[`Site Photo ${i}`] === 'string' && props[`Site Photo ${i}`].length > 0) {
        this.sitePhotos.push(props[`Site Photo ${i}`]);
      }
    }
    this.accessible = props.Accessible;
    this.demarcation = props.Demarcation;
    this.condition = props.Condition;
    this.locale = props.Locale;
    this.mapID = props['Map ID'];
    this.alternateCemeteryName = props['Alternate Cemetery Name'];
    this.cemeteryName = props['Cemetery Name'];
    if (!this.cemeteryName || typeof this.cemeteryName === 'string' && this.cemeteryName.length < 0) {
      if (typeof this.alternateCemeteryName === 'string' && this.alternateCemeteryName.length > 0) {
        this.cemeteryName = this.alternateCemeteryName;
      }
    }
    if (!this.address || typeof this.address === 'string' && this.address.length < 1) {
      if (typeof this.locale === 'string' && this.locale.length > 0) {
        this.address = this.locale;
      } else if (typeof this.mappedLocation === 'string' && this.mappedLocation.length > 0) {
        this.address = this.mappedLocation;
      }
    }
  }
}

export default Interment;
