import type Location from './Location';
import type PhotoLink from './PhotoLink';

// https://dev.socrata.com/foundry/data.nashville.gov/ttqg-mpiz
type NashvilleCemeteryData = {
  cemetery_name: string;
  alternate_cemetery_name?: string;
  map_id: string;
  locale: string;
  condition?: string;
  demarcation?: string;
  accessible?: string;
  site_photo_link: PhotoLink;
  site_photo_2?: PhotoLink;
  site_photo_3?: PhotoLink;
  site_photo_4?: PhotoLink;
  site_photo_5?: PhotoLink;
  site_photo_6?: PhotoLink;
  known_burials: string;
  interment: string;
  grave_photo_link: PhotoLink;
  grave_photo_2?: PhotoLink;
  grave_photo_3?: PhotoLink;
  inscription: string;
  death_date: string;
  footstone?: string;
  deceased_info?: string;
  original_survey: string;
  survey_update_s: string;
  current_survey: string;
  graveyard_type: string;
  notes: string;
  restoration?: string;
  site_history?: string;
  site_contact_info?: string;
  tract_parcel_number: string;
  cemetery_parcel_number?: string;
  number?: string;
  street: string;
  additional_location_information?: string;
  latitude?: string;
  longitude?: string;
  archaeological_information?: string;
  mapped_location?: Location;
};

export default NashvilleCemeteryData;
