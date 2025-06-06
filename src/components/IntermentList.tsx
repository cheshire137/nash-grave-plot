import {useCallback, useEffect, useMemo, useRef} from 'react'
import TableStyles from './TableStyles'
import TableHeaderCell from './TableHeaderCell'
import TableCell from './TableCell'
import Interment from '../models/Interment'
import AddressDisplay from './AddressDisplay'
import CemeteryDisplay from './CemeteryDisplay'
import {InscriptionDisplay} from './InscriptionDisplay'
import LongTextBlock from './LongTextBlock'
import {EnabledColumnsDialog} from './EnabledColumnsDialog'
import AddressFilter from './AddressFilter'
import DateCellFormatter from './DateCellFormatter'
import {PhotoList} from './PhotoList'
import {NameDisplay} from './NameDisplay'
import {InfoDisplay} from './InfoDisplay'
import CemeteryFilter from './CemeteryFilter'
import DemarcationDisplay from './DemarcationDisplay'
import FootstoneDisplay from './FootstoneDisplay'
import {NotesDisplay} from './NotesDisplay'
import {ParcelNumberDisplay} from './ParcelNumberDisplay'
import {intermentFieldLabels} from '../constants'
import {useTable, useFilters, usePagination} from 'react-table'
import {addressMatchesFilter, cemeteryMatchesFilter, fuzzyTextFilter, minArrayLengthFilter} from '../filters'
import {Pagination, PageLayout} from '@primer/react'
import {getColumnsToDisplay, getInitialFilters, getPageTitleForResults} from '../utils'
import {useCemeteryData} from '../contexts/CemeteryDataContext'
import {usePage} from '../contexts/PageContext'
import {useEnabledFields} from '../contexts/EnabledFieldsContext'
import {useSearchParams, useParams, useNavigate} from 'react-router-dom'
import {PageNumber} from './PageNumber'
import {useDynamicTablePageSize} from '../hooks/use-dynamic-table-page-size'

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
  const {pageSize: dynamicPageSize} = useDynamicTablePageSize({initialPageSize, paginationRef, tableBodyRef})

  const columns = useMemo(() => {
    const nameColumn = {
      Header: intermentFieldLabels.person,
      accessor: 'person',
      filter: 'fuzzyText',
      Cell: NameDisplay,
    }
    const deceasedInfoColumn = {
      Header: intermentFieldLabels.deceasedInfo,
      accessor: 'deceasedInfo',
      Cell: InfoDisplay,
      filter: 'fuzzyText',
    }
    const personColumnGroup = {
      Header: 'Person',
      columns: getColumnsToDisplay(enabledFields, [nameColumn, deceasedInfoColumn]),
    }

    const cemeteryColumn = {
      Header: intermentFieldLabels.cemetery,
      accessor: 'cemetery',
      filter: 'cemeteryMatches',
      Filter: CemeteryFilter,
      Cell: CemeteryDisplay,
      id: 'cemetery',
    }
    const addressColumn = {
      Header: intermentFieldLabels.address,
      accessor: 'cemetery',
      Cell: AddressDisplay,
      filter: 'addressMatches',
      Filter: AddressFilter,
      id: 'address',
    }
    const siteHistoryColumn = {
      Header: intermentFieldLabels.siteHistory,
      accessor: 'siteHistory',
      Cell: InfoDisplay,
    }
    const locationColumnGroup = {
      Header: 'Location',
      columns: getColumnsToDisplay(enabledFields, [cemeteryColumn, addressColumn, siteHistoryColumn]),
    }

    const inscriptionColumn = {
      Header: intermentFieldLabels.inscription,
      accessor: 'inscription',
      Cell: InscriptionDisplay,
    }
    const footstoneColumn = {
      Header: intermentFieldLabels.footstone,
      accessor: 'footstone',
      Cell: FootstoneDisplay,
    }
    const demarcationColumn = {
      Header: intermentFieldLabels.demarcation,
      accessor: 'demarcation',
      Cell: DemarcationDisplay,
    }
    const conditionColumn = {
      Header: intermentFieldLabels.condition,
      accessor: 'condition',
      Cell: DemarcationDisplay,
    }
    const accessibleColumn = {
      Header: intermentFieldLabels.accessible,
      accessor: 'accessible',
      filter: 'includes',
    }
    const restorationColumn = {
      Header: intermentFieldLabels.restoration,
      accessor: 'restoration',
      Cell: LongTextBlock,
    }
    const gravePhotosColumn = {
      Header: intermentFieldLabels.gravePhotos,
      accessor: 'gravePhotoCaptionsByUrl',
      Cell: PhotoList,
    }
    const markerColumnGroup = {
      Header: 'Marker/Plot',
      columns: getColumnsToDisplay(enabledFields, [
        inscriptionColumn,
        footstoneColumn,
        demarcationColumn,
        conditionColumn,
        accessibleColumn,
        restorationColumn,
        gravePhotosColumn,
      ]),
    }

    const notesColumn = {
      Header: intermentFieldLabels.notes,
      accessor: 'notes',
      Cell: NotesDisplay,
    }
    const otherColumnGroup = {
      Header: '',
      id: 'other',
      columns: getColumnsToDisplay(enabledFields, [notesColumn]),
    }

    const tractParcelNumberColumn = {
      Header: intermentFieldLabels.tractParcelNumber,
      accessor: 'tractParcelNumber',
      Cell: ParcelNumberDisplay,
    }
    const cemeteryParcelNumberColumn = {
      Header: intermentFieldLabels.cemeteryParcelNumber,
      accessor: 'cemeteryParcelNumber',
      Cell: ParcelNumberDisplay,
    }
    const parcelNumberColumnGroup = {
      Header: 'Parcel Numbers',
      columns: getColumnsToDisplay(enabledFields, [tractParcelNumberColumn, cemeteryParcelNumberColumn]),
    }

    const originalSurveyColumn = {
      Header: intermentFieldLabels.originalSurvey,
      accessor: 'originalSurvey',
      Cell: DateCellFormatter,
    }
    const surveyUpdatesColumn = {
      Header: intermentFieldLabels.surveyUpdates,
      accessor: 'surveyUpdates',
      Cell: DateCellFormatter,
    }
    const currentSurveyColumn = {
      Header: intermentFieldLabels.currentSurvey,
      accessor: 'currentSurvey',
      Cell: DateCellFormatter,
    }
    const surveyColumnGroup = {
      Header: 'Survey',
      columns: getColumnsToDisplay(enabledFields, [originalSurveyColumn, surveyUpdatesColumn, currentSurveyColumn]),
    }

    return [
      personColumnGroup,
      locationColumnGroup,
      markerColumnGroup,
      otherColumnGroup,
      parcelNumberColumnGroup,
      surveyColumnGroup,
    ]
  }, [enabledFields])

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
    [getPagePath]
  )

  useEffect(() => setPageTitle(getPageTitleForResults(rows.length, 'grave', 'graves')), [rows.length, setPageTitle])
  useEffect(() => setHeaderItems([<EnabledColumnsDialog />]), [enabledFields, setHeaderItems])
  useEffect(() => setPageSize(dynamicPageSize), [dynamicPageSize])

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
