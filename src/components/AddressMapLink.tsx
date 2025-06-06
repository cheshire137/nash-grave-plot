import React from 'react'
import {Link} from '@primer/react'
import Address from '../models/Address'

interface AddressMapLinkProps {
  address: Address
  children: React.ReactNode
}

function AddressMapLink({address, children}: AddressMapLinkProps) {
  return (
    <Link href={address.getMapsUrl()} rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  )
}

export default AddressMapLink
