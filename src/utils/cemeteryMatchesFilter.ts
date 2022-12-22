import { IdType, Row } from 'react-table';
import Interment from '../models/Interment';
import Cemetery from '../models/Cemetery';
import type CemeteryFilterOption from '../types/CemeteryFilterOption';
import { matchSorter } from 'match-sorter';

export function cemeteryMatchesFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: CemeteryFilterOption
): Row<Interment>[] {
  let matchingRows = rows;
  if (typeof filterValue?.graveyardType === 'string' && filterValue.graveyardType.length > 0) {
    matchingRows = rows.filter(row => {
      const cemetery: Cemetery = row.values[id[0]];
      return cemetery.graveyardType === filterValue.graveyardType;
    });
  }
  if (typeof filterValue?.name === 'string' && filterValue.name.length > 0) {
    matchingRows = matchSorter(matchingRows, filterValue.name, {
      keys: [(row: Row<Interment>) => {
        const cemetery: Cemetery = row.values[id[0]];
        return cemetery.name;
      }],
    });
  }
  return matchingRows;
};

cemeteryMatchesFilter.autoRemove = (val: any) => !val;
