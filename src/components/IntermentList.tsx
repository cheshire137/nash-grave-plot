import {useCallback, useEffect, useMemo, useRef} from 'react'
import TableStyles from './TableStyles'
import TableHeaderCell from './TableHeaderCell'
import TableCell from './TableCell'
import Interment from '../models/Interment'
import {EnabledColumnsDialog} from './EnabledColumnsDialog'
import {useTable, useFilters, usePagination} from 'react-table'
import {addressMatchesFilter, cemeteryMatchesFilter, fuzzyTextFilter, minArrayLengthFilter} from '../filters'
import {Pagination, PageLayout} from '@primer/react'
import {getInitialFilters, getPageTitleForResults} from '../utils'
import {useCemeteryData} from '../contexts/CemeteryDataContext'
import {usePage} from '../contexts/PageContext'
import {useEnabledFields} from '../contexts/EnabledFieldsContext'
import {useSearchParams, useParams, useNavigate} from 'react-router-dom'
import {PageNumber} from './PageNumber'
import {useDynamicTablePageSize} from '../hooks/use-dynamic-table-page-size'
import {useIntermentListColumns} from '../hooks/use-interment-list-columns'

const filterTypes = {
  fuzzyText: fuzzyTextFilter,
  minArrayLength: minArrayLengthFilter,
  cemeteryMatches: cemeteryMatchesFilter,
  addressMatches: addressMatchesFilter,
}

function IntermentList() {
  const tableBodyRef = useRef<HTMLTableSectionElement>(null)
  const paginationRef = useRef<HTMLDivElement>(null)
  const {interments} = useCemeteryData()
  const {setPageTitle, setHeaderItems} = usePage()
  const {enabledFields} = useEnabledFields()
  const {initialPageNumberStr} = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const filters = useMemo(() => getInitialFilters(searchParams), [searchParams])
  const initialPageIndex = initialPageNumberStr ? parseInt(initialPageNumberStr) - 1 : 0
  const initialPageSize = searchParams.get('page_size') ? parseInt(searchParams.get('page_size')!) : 10
  const {columns} = useIntermentListColumns()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    pageOptions,
    state: {pageIndex, pageSize},
    gotoPage,
    setPageSize,
  } = useTable<Interment>(
    {
      columns,
      data: interments,
      initialState: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
        filters: filters || [],
      },
      filterTypes,
    },
    useFilters,
    usePagination
  )
  const {pageSize: dynamicPageSize} = useDynamicTablePageSize({
    initialPageSize,
    paginationRef,
    rowCount: rows.length,
    tableBodyRef,
  })
  const totalPages = pageOptions.length
  const getPagePath = useCallback(
    (pageNumber: number) => (pageNumber < 2 ? '/' : `/page/${pageNumber}?page_size=${pageSize}`),
    [pageSize]
  )
  const onPageChange = useCallback(
    (e: React.MouseEvent, page: number) => {
      // Don't actually load the link on click, that does a full page load:
      e.preventDefault()

      const newPageIndex = page - 1
      gotoPage(newPageIndex)
      navigate(getPagePath(page))
    },
    [getPagePath, gotoPage, navigate]
  )

  useEffect(() => setPageTitle(getPageTitleForResults(rows.length, 'grave', 'graves')), [rows.length, setPageTitle])
  useEffect(() => setHeaderItems([<EnabledColumnsDialog />]), [enabledFields, setHeaderItems])
  useEffect(() => setPageSize(dynamicPageSize), [dynamicPageSize, setPageSize])

  return (
    <PageLayout.Content padding="none" sx={{fontSize: 2}}>
      <TableStyles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeaderCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {column.canFilter && column.Filter && <>{column.render('Filter')}</>}
                  </TableHeaderCell>
                ))}
              </tr>
            ))}
          </thead>
          <tbody ref={tableBodyRef} {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableStyles>
      {totalPages > 1 && (
        <div ref={paginationRef}>
          <Pagination
            pageCount={totalPages}
            currentPage={pageIndex + 1}
            onPageChange={onPageChange}
            hrefBuilder={(page) => {
              // Can't seem to use React Router's useHref in here, so preserve the base path manually:
              return `${window.location.pathname}#${getPagePath(page)}`
            }}
            renderPage={PageNumber}
          />
        </div>
      )}
    </PageLayout.Content>
  )
}

export default IntermentList
