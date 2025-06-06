import {FilterValue, IdType, Row} from 'react-table'
import Interment from './models/Interment'
import Cemetery from './models/Cemetery'
import type {AddressFilterOption, CemeteryFilterOption} from './types'
import {matchSorter} from 'match-sorter'

export function addressMatchesFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: AddressFilterOption
): Row<Interment>[] {
  let matchingRows = rows
  if (typeof filterValue?.hasPhotos === 'boolean') {
    matchingRows = rows.filter((row) => {
      const cemetery: Cemetery = row.values[id[0]]
      return cemetery.hasPhotos() === filterValue.hasPhotos
    })
  }
  if (typeof filterValue?.address === 'string' && filterValue.address.length > 0) {
    matchingRows = matchSorter(matchingRows, filterValue.address, {
      keys: [
        (row: Row<Interment>) => {
          const cemetery: Cemetery = row.values[id[0]]
          const address = cemetery.address
          return `${address.streetAddress} ${address.additionalLocationInfo}` // shown in AddressLines
        },
      ],
    })
  }
  return matchingRows
}

addressMatchesFilter.autoRemove = (val: any) => !val

export function cemeteryMatchesFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: CemeteryFilterOption
): Row<Interment>[] {
  let matchingRows = rows
  if (typeof filterValue?.graveyardType === 'string' && filterValue.graveyardType.length > 0) {
    matchingRows = rows.filter((row) => {
      const cemetery: Cemetery = row.values[id[0]]
      return cemetery.graveyardType === filterValue.graveyardType
    })
  }
  if (typeof filterValue?.name === 'string' && filterValue.name.length > 0) {
    matchingRows = matchSorter(matchingRows, filterValue.name, {
      keys: [
        (row: Row<Interment>) => {
          const cemetery: Cemetery = row.values[id[0]]
          return cemetery.name
        },
      ],
    })
  }
  return matchingRows
}

cemeteryMatchesFilter.autoRemove = (val: any) => !val

export function fuzzyTextFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: FilterValue
): Row<Interment>[] {
  return matchSorter(rows, filterValue, {
    keys: [(row: Row<Interment>) => row.values[id[0]]],
  })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilter.autoRemove = (val: any) => !val

export function minArrayLengthFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: FilterValue
): Row<Interment>[] {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]]
    if (typeof rowValue === 'object' && rowValue instanceof Array) {
      return rowValue.length >= filterValue
    }
    return false
  })
}

minArrayLengthFilter.autoRemove = (val: any) => !val
