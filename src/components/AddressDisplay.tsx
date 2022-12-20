import React from 'react';
import type { CellProps } from 'react-table';
import AddressLines from './AddressLines';

const AddressDisplay = (props: CellProps<Record<string, unknown>>) => <AddressLines {...props} />;

export default AddressDisplay;
