import {type RefObject, useEffect, useState} from 'react'
import {useWindowSize} from '../contexts/WindowSizeContext'

interface DynamicTablePageSizeProps {
  initialPageSize: number
  paginationRef: RefObject<HTMLDivElement>
  rowCount: number
  tableBodyRef: RefObject<HTMLTableSectionElement>
}

export function useDynamicTablePageSize({
  initialPageSize,
  paginationRef,
  rowCount,
  tableBodyRef,
}: DynamicTablePageSizeProps) {
  const [pageSize, setPageSize] = useState<number>(initialPageSize)
  const {clientHeight: viewportHeight} = useWindowSize()
  const [viewportHeightAtLastPageSizeChange, setViewportHeightAtLastPageSizeChange] = useState<number>(0)

  useEffect(() => {
    if (!tableBodyRef || !tableBodyRef.current) return

    const tbody = tableBodyRef.current
    const rows = tbody.querySelectorAll('tr')
    if (rows.length < 1) return

    const tbodyRect = tbody.getBoundingClientRect()
    let targetAreaHeight = tbodyRect.height
    let availableHeight = viewportHeight - tbodyRect.top
    let spaceBetweenPaginationAndTable = 0
    let paginationHeight = 0
    if (paginationRef && paginationRef.current) {
      const paginationRect = paginationRef.current.getBoundingClientRect()
      spaceBetweenPaginationAndTable += paginationRect.top - tbodyRect.bottom
      paginationHeight = paginationRect.height
      targetAreaHeight += paginationHeight + spaceBetweenPaginationAndTable
      availableHeight -= paginationHeight - spaceBetweenPaginationAndTable
    }

    // need to reduce page size:
    if (targetAreaHeight > availableHeight) {
      let newPageSize = 1
      let totalRowHeight = rows[0].clientHeight + spaceBetweenPaginationAndTable + paginationHeight

      while (totalRowHeight < availableHeight) {
        const nextRow = rows[newPageSize]
        if (!nextRow) break

        const rowHeight = nextRow.clientHeight
        if (totalRowHeight + rowHeight > availableHeight) break

        totalRowHeight += rowHeight
        newPageSize++
      }

      if (newPageSize !== pageSize) {
        setViewportHeightAtLastPageSizeChange(viewportHeight)
        setPageSize(newPageSize)
      }

      // might be able to increase page size:
    } else if (targetAreaHeight < availableHeight && viewportHeightAtLastPageSizeChange !== viewportHeight) {
      const rowHeights = Array.from(rows).map((row) => row.clientHeight)
      const avgRowHeight = rowHeights.reduce((a, b) => a + b, 0) / rowHeights.length
      const heightDiff = availableHeight - targetAreaHeight
      const rowsToAdd = Math.floor(heightDiff / avgRowHeight)

      if (rowsToAdd > 0) {
        setViewportHeightAtLastPageSizeChange(viewportHeight)
        setPageSize(pageSize + rowsToAdd)
      }
    }
  }, [
    tableBodyRef,
    paginationRef,
    viewportHeightAtLastPageSizeChange,
    viewportHeight,
    pageSize,
    setPageSize,
    rowCount,
  ])

  return {pageSize}
}
