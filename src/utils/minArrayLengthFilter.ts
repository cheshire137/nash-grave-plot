import { FilterValue, IdType, Row } from 'react-table';
import Interment from '../models/Interment';

export function minArrayLengthFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: FilterValue
): Row<Interment>[] {
  return rows.filter(row => {
    const rowValue = row.values[id[0]];
    if (typeof rowValue === 'object' && rowValue instanceof Array) {
      return rowValue.length >= filterValue;
    }
    return false;
  });
};

minArrayLengthFilter.autoRemove = (val: any) => !val;
