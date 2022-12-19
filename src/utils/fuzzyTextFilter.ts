import { matchSorter } from 'match-sorter';
import { FilterValue, IdType, Row } from 'react-table';
import Interment from '../models/Interment';

export function fuzzyTextFilter(
  rows: Row<Interment>[],
  id: IdType<Interment>[],
  filterValue: FilterValue
): Row<Interment>[] {
  return matchSorter(rows, filterValue, {
    keys: [(row: Row<Interment>) => row.values[id[0]]],
  });
};

// Let the table remove the filter if the string is empty
fuzzyTextFilter.autoRemove = (val: any) => !val;
