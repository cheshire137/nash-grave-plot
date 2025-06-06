import React from 'react'
import {Link} from '@primer/react'
import Address from '../models/Address'

interface Props {
  address: Address
  children: React.ReactNode
}

const AddressMapLink = ({address, children}: Props) => {
  return (
    <Link href={address.getMapsUrl()} rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  )
}

export default AddressMapLink
