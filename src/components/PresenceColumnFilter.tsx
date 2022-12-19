import React, { useMemo } from 'react';
import titleCaseify from '../utils/titleCaseify';
import type { FilterValue, IdType, Row } from 'react-table'
import { FormControl, Checkbox } from '@primer/react';

interface Props {
  column: {
    setFilter: (value?: FilterValue) => void;
  };
}

function PresenceColumnFilter({
  column: { setFilter }
}: Props) {
  return <FormControl>
    <Checkbox onChange={e => setFilter(e.target.checked ? 1 : 0)} />
    <FormControl.Label>Any</FormControl.Label>
  </FormControl>;
}

export default PresenceColumnFilter;
