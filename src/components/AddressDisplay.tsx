import React from 'react';
import type { CellProps } from 'react-table';
import AddressLines from './AddressLines';

const AddressDisplay = ({ value }: CellProps<Record<string, unknown>>) => <AddressLines {...value} />;

export default AddressDisplay;
