import {useCallback} from 'react'
import TitleCase from './TitleCase'
import {FilterButton} from './FilterButton'
import AddressMapLink from './AddressMapLink'
import Address from '../models/Address'
import type {AddressFilterOption} from '../types'
import styles from './AddressLines.module.css'

interface AddressLinesProps {
  address: Address
  setFilter: (value?: AddressFilterOption) => void
}

// Keep text shown here in sync with addressMatchesFilter:
function AddressLines({address, setFilter}: AddressLinesProps) {
  const onApplyFilter = useCallback(() => {
    setFilter({address: address.streetAddress})
  }, [address.streetAddress, setFilter])

  return (
    <div className={styles.container}>
      <AddressMapLink address={address}>
        <TitleCase value={address.streetAddress} />
      </AddressMapLink>
      <FilterButton title="Set filter" onClick={onApplyFilter} />
      {typeof address.additionalLocationInfo === 'string' && (
        <div>
          <TitleCase value={address.additionalLocationInfo} />
        </div>
      )}
    </div>
  )
}

export default AddressLines
