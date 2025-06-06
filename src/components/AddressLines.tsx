import React from 'react'
import {Box} from '@primer/react'
import TitleCase from './TitleCase'
import AddressMapLink from './AddressMapLink'
import Address from '../models/Address'

interface Props {
  address: Address
}

// Keep text shown here in sync with addressMatchesFilter:
const AddressLines = ({address}: Props) => (
  <Box textAlign="left" minWidth="200px">
    <AddressMapLink address={address}>
      <TitleCase value={address.streetAddress} />
    </AddressMapLink>
    {typeof address.additionalLocationInfo === 'string' && (
      <Box>
        <TitleCase value={address.additionalLocationInfo} />
      </Box>
    )}
  </Box>
)

export default AddressLines
