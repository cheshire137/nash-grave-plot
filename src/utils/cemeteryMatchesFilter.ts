import { IdType, Row } from 'react-table';
import Interment from '../models/Interment';
import Cemetery from '../models/Cemetery';
import type CemeteryFilterOption from '../types/CemeteryFilterOption';

export function cemeteryMatchesFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: CemeteryFilterOption
): Row<Interment>[] {
  return rows.filter(row => {
    const cemetery: Cemetery = row.values[id[0]];
    if (typeof filterValue === 'undefined') return true; // not filtering
    if (typeof filterValue.graveyardType === 'string') {
      return cemetery.graveyardType === filterValue.graveyardType;
    }
    return false;
  });
};

cemeteryMatchesFilter.autoRemove = (val: any) => !val;
