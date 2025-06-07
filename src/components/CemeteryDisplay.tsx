import {useCallback} from 'react'
import TitleCase from './TitleCase'
import {FilterButton} from './FilterButton'
import type {CellProps} from 'react-table'
import Cemetery from '../models/Cemetery'
import type {CemeteryFilterOption} from '../types'
import {cemeteryColumnId} from '../constants'
import styles from './CemeteryDisplay.module.css'

function CemeteryDisplay({setFilter, value}: CellProps<Record<string, unknown>>) {
  const cemetery = value as Cemetery
  const setCemeteryFilter = useCallback(
    (value?: CemeteryFilterOption) => {
      setFilter(cemeteryColumnId, value)
    },
    [setFilter]
  )
  const onApplyNameFilter = useCallback(() => {
    setCemeteryFilter({name: cemetery.name})
  }, [cemetery.name, setCemeteryFilter])
  const onApplyTypeFilter = useCallback(() => {
    setCemeteryFilter({graveyardType: cemetery.graveyardType})
  }, [cemetery.graveyardType, setCemeteryFilter])

  return (
    <div className={styles.container}>
      <TitleCase value={cemetery.name} />
      <FilterButton
        tooltipDirection="e"
        className={styles.filterButton}
        title="Set cemetery name filter"
        onClick={onApplyNameFilter}
      />
      <div className={styles.cemeteryType}>
        Type: {cemetery.graveyardType}
        <FilterButton
          tooltipDirection="e"
          className={styles.filterButton}
          title="Set type filter"
          onClick={onApplyTypeFilter}
        />
      </div>
    </div>
  )
}

export default CemeteryDisplay
