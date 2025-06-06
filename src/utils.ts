import type {Column} from 'react-table'
import type {AddressFilterOption, IntermentField} from './types'

export function getColumnsToDisplay(enabledFields: IntermentField[], relevantColumns: Column[]) {
  const enabledPropStrs: string[] = enabledFields
  return relevantColumns.filter((column) => {
    if (typeof column.accessor === 'string') {
      return enabledPropStrs.includes(column.accessor)
    }
    return false
  })
}

export function getEnabledColumns(
  enabledFields: IntermentField[],
  intermentField: IntermentField,
  isEnabled: boolean
) {
  if (isEnabled) return [...enabledFields, intermentField]
  return enabledFields.filter((c) => c !== intermentField)
}

export function getInitialFilters(searchParams: URLSearchParams) {
  const addressFilterValue: AddressFilterOption = {}
  if (searchParams.has('address')) {
    addressFilterValue.address = searchParams.get('address')!
  }
  if (searchParams.has('site_photos')) {
    addressFilterValue.hasPhotos = searchParams.get('site_photos') === '1'
  }
  const addressFilter = {id: 'address', value: addressFilterValue}
  return [addressFilter]
}

export function getPageTitleForResults(totalResults: number, singular?: string, plural?: string) {
  const singularUnit = singular || 'result'
  const pluralUnit = plural || 'results'
  if (totalResults === 1) return `1 ${singularUnit}`
  if (totalResults > 1) return `${totalResults.toLocaleString('en-US')} ${pluralUnit}`
  return `No ${pluralUnit}`
}

export function getPhotoCaptionsByUrl(urlTexts: string[]): {
  [url: string]: string
} {
  const result: {[url: string]: string} = {}

  // e.g., "View Grave Photo (http://dataimages.nashville.gov/dccs/an-36-01-01.jpg)"
  for (const text of urlTexts) {
    const openParenIndex = text.indexOf('(')
    if (openParenIndex > -1) {
      const closeParenIndex = text.indexOf(')', openParenIndex)
      const url = text.substring(openParenIndex + 1, closeParenIndex)
      const caption = text.substring(0, openParenIndex).trim()
      result[url] = caption
    } else {
      result[text] = text
    }
  }

  return result
}

export function parseAccessible(accessible?: string | null) {
  const lowercase = (accessible || '').toLowerCase()
  if (lowercase === 'yes' || lowercase === 'y') {
    return 'yes'
  }
  if (lowercase === 'no' || lowercase === 'n') {
    return 'no'
  }
  if (lowercase.trim().length > 0) return lowercase
  return ''
}

// Sample values:
// - '1915'
// - 'BEFORE 1880'
// - '4/10/183(5)'
// - '4/29/1884 OR 4/29/1894
// - '02/03/962
// - '1852/3'
export function parseDateString(maybeStr?: string | null) {
  if (typeof maybeStr !== 'string') return null

  const str = maybeStr.trim()
  if (str.length < 1) return null

  let dateOrNormalizedStr = parseMonthDayYearString(str)
  if (dateOrNormalizedStr) return dateOrNormalizedStr

  dateOrNormalizedStr = parseYearMonthDayString(str)
  if (dateOrNormalizedStr) return dateOrNormalizedStr

  dateOrNormalizedStr = parseMonthYearString(str)
  if (dateOrNormalizedStr) return dateOrNormalizedStr

  dateOrNormalizedStr = parseYearMonthString(str)
  if (dateOrNormalizedStr) return dateOrNormalizedStr

  return str
}

export function parseGraveyardType(graveyardType?: string | null) {
  const lowercase = (graveyardType || '').toLowerCase().trim()
  if (lowercase.match(/\s+graveyard$/)) {
    return lowercase.split(/\s+/)[0]
  }
  if (lowercase.length > 0) return lowercase
  return 'unspecified'
}

export function parseMonthDayYearString(rawStr: string) {
  // e.g., '.1/1/1918'
  const str = rawStr.replace(/^\.+/, '')

  // e.g., '12/28//1983', '9/17/1851'
  let matches = str.match(/^(?<month>\d\d?)\/+(?<day>\d\d?)\/+(?<year>\d\d\d\d?)$/)
  if (matches && matches.groups) {
    const month = parseInt(matches.groups.month, 10)
    const day = parseInt(matches.groups.day, 10)
    let year = parseInt(matches.groups.year, 10)
    if (year < 1000) year += 1000 // handle strings like '02/03/962'
    return new Date(year, month - 1, day)
  }

  // e.g., '9/21/190?', '?/22/1923', '10/22/19??'
  matches =
    str.match(/^(?<month>\d\d?)\/+(?<day>\d\d?)\/+(?<year>\d\d[\d?]\?)$/) ||
    str.match(/^(?<month>\?)\/+(?<day>\d\d?)\/+(?<year>\d\d\d\d?)$/)
  if (matches && matches.groups) {
    return `${matches.groups.year}-${matches.groups.month}-${matches.groups.day}`
  }

  // e.g., '8/81982'
  matches = str.match(/^(?<month>\d\d?)\/+(?<dayyear>\d\d?\d{4})$/)
  if (matches && matches.groups) {
    const firstDayInt = parseInt(matches.groups.dayyear.charAt(0), 10)
    const remainingDayYearStr = matches.groups.dayyear.slice(1)
    if (remainingDayYearStr.length === 4) {
      const year = parseInt(remainingDayYearStr, 10)
      const month = parseInt(matches.groups.month, 10)
      return new Date(year, month - 1, firstDayInt)
    }
  }

  return null
}

export function parseMonthYearString(str: string) {
  const matches = str.match(/^(?<month>\d\d?)\/(?<year>\d\d\d\d?)$/)

  if (matches && matches.groups) {
    let year = parseInt(matches.groups.year, 10)
    if (year < 1000) year += 1000 // handle strings like '02/962'

    const month = parseInt(matches.groups.month, 10)

    let monthStr = month.toString()
    if (month < 10) monthStr = `0${month}`

    return `${year}-${monthStr}`
  }

  return null
}

export function parseYearMonthDayString(str: string) {
  // Don't include `$` for end of string so that we match strings like '1999-12-04T00:00:00.000' that always
  // have the same time and just represent the date:
  const matches = str.match(/^(?<year>\d\d\d\d)-(?<month>\d\d?)-(?<day>\d\d?)/)

  if (matches && matches.groups) {
    const year = parseInt(matches.groups.year, 10)
    const month = parseInt(matches.groups.month, 10)
    const day = parseInt(matches.groups.day, 10)
    return new Date(year, month - 1, day)
  }

  return null
}

export function parseYearMonthString(str: string) {
  // e.g., '1852/3'
  const matches = str.match(/^(?<year>\d\d\d\d)\/(?<month>\d\d?)$/)

  if (matches && matches.groups) {
    const year = parseInt(matches.groups.year, 10)
    const month = parseInt(matches.groups.month, 10)

    let monthStr = month.toString()
    if (month < 10) monthStr = `0${month}`

    return `${year}-${monthStr}`
  }

  return null
}

export function prettyDateStr(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let monthStr = month.toString()
  if (month < 10) monthStr = `0${month}`

  let dayStr = day.toString()
  if (day < 10) dayStr = `0${day}`

  return `${year}-${monthStr}-${dayStr}`
}

export function titleCaseify(str: string) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ')
}
