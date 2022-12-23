import type NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import parseDateString from '../utils/parseDateString';

class Person {
  name: string;
  deathDate: Date | string | null;
  deceasedInfo: string | null;

  constructor(data: NashvilleCemeteryData) {
    this.name = data.interment;
    this.deceasedInfo = data.deceased_info || null;
    this.deathDate = parseDateString(data.death_date);
  }
}

export default Person;
