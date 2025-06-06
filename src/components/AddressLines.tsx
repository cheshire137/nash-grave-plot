import TitleCase from './TitleCase'
import AddressMapLink from './AddressMapLink'
import Address from '../models/Address'
import styles from './AddressLines.module.css'

interface AddressLinesProps {
  address: Address
}

// Keep text shown here in sync with addressMatchesFilter:
function AddressLines({address}: AddressLinesProps) {
  return (
    <div className={styles.container}>
      <AddressMapLink address={address}>
        <TitleCase value={address.streetAddress} />
      </AddressMapLink>
      {typeof address.additionalLocationInfo === 'string' && (
        <div>
          <TitleCase value={address.additionalLocationInfo} />
        </div>
      )}
    </div>
  )
}

export default AddressLines
