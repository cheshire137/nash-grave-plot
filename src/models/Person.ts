import type {NashvilleCemeteryFeatureProperties} from '../types'
import {parseDateString} from '../utils'

class Person {
  name: string
  deathDate: Date | string | null
  rawDeathDate: string | null
  deceasedInfo: string | null

  constructor(data: NashvilleCemeteryFeatureProperties) {
    this.name = data.Interment
    this.deceasedInfo = data.Deceased_Info
    this.rawDeathDate = data.Death_Date
    this.deathDate = parseDateString(data.Death_Date)
  }
}

export default Person
