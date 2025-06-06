import {IdType, Row} from 'react-table'
import Interment from '../models/Interment'
import Cemetery from '../models/Cemetery'
import type AddressFilterOption from '../types/AddressFilterOption'
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
