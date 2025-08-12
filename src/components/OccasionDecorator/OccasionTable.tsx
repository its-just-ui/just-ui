import React, { forwardRef, useState, useMemo } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import './OccasionTable.css'

export interface TableColumn<T = Record<string, unknown>> {
  key: string
  header: React.ReactNode
  accessor?: string | ((row: T) => React.ReactNode)
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T, index: number) => React.ReactNode
}

export interface OccasionTableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  variant?: 'default' | 'bordered' | 'striped' | 'hover'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  selectable?: boolean
  multiSelect?: boolean
  sortable?: boolean
  filterable?: boolean
  pagination?: boolean
  pageSize?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  onFilter?: (filters: Record<string, string>) => void
  onRowClick?: (row: T, index: number) => void
  onSelectionChange?: (selectedRows: T[]) => void
  emptyMessage?: React.ReactNode
  loadingMessage?: React.ReactNode
  stickyHeader?: boolean
  maxHeight?: string | number
  footer?: React.ReactNode
  occasionTheme?: boolean
  decorateHeaders?: boolean
  className?: string
  responsive?: boolean
}

export const OccasionTable = forwardRef<HTMLDivElement, OccasionTableProps>(
  (
    {
      columns,
      data,
      variant = 'default',
      size = 'medium',
      loading = false,
      selectable = false,
      multiSelect = false,
      sortable = false,
      filterable = false,
      pagination = false,
      pageSize = 10,
      currentPage: controlledPage,
      onPageChange,
      onSort,
      onFilter,
      onRowClick,
      onSelectionChange,
      emptyMessage = 'No data available',
      loadingMessage = 'Loading...',
      stickyHeader = false,
      maxHeight,
      footer,
      occasionTheme = true,
      decorateHeaders = false,
      className = '',
      responsive = true,
    },
    ref
  ) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [internalPage, setInternalPage] = useState(1)

    const currentPageNumber = controlledPage ?? internalPage

    const { getAssets, activeOccasion } = useOccasion()

    const decoration = occasionTheme ? getAssets('adjacent') : null

    const filteredData = useMemo(() => {
      let result = [...data]

      if (filterable && Object.keys(filters).length > 0) {
        result = result.filter((row) => {
          return Object.entries(filters).every(([key, value]) => {
            if (!value) return true
            const column = columns.find((col) => col.key === key)
            if (!column) return true

            const cellValue = column.accessor
              ? typeof column.accessor === 'function'
                ? column.accessor(row)
                : (row as Record<string, unknown>)[column.accessor]
              : (row as Record<string, unknown>)[key]

            return String(cellValue).toLowerCase().includes(value.toLowerCase())
          })
        })
      }

      if (sortable && sortColumn) {
        const column = columns.find((col) => col.key === sortColumn)
        if (column) {
          result.sort((a, b) => {
            const aValue = column.accessor
              ? typeof column.accessor === 'function'
                ? column.accessor(a)
                : (a as Record<string, unknown>)[column.accessor]
              : (a as Record<string, unknown>)[sortColumn]

            const bValue = column.accessor
              ? typeof column.accessor === 'function'
                ? column.accessor(b)
                : (b as Record<string, unknown>)[column.accessor]
              : (b as Record<string, unknown>)[sortColumn]

            const aStr = String(aValue)
            const bStr = String(bValue)
            if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1
            if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1
            return 0
          })
        }
      }

      return result
    }, [data, filters, sortColumn, sortDirection, columns, filterable, sortable])

    const paginatedData = useMemo(() => {
      if (!pagination) return filteredData

      const start = (currentPageNumber - 1) * pageSize
      const end = start + pageSize
      return filteredData.slice(start, end)
    }, [filteredData, pagination, currentPageNumber, pageSize])

    const totalPages = Math.ceil(filteredData.length / pageSize)

    const handleSort = (column: string) => {
      if (!sortable) return

      if (sortColumn === column) {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        setSortDirection(newDirection)
        onSort?.(column, newDirection)
      } else {
        setSortColumn(column)
        setSortDirection('asc')
        onSort?.(column, 'asc')
      }
    }

    const handleFilter = (column: string, value: string) => {
      const newFilters = { ...filters, [column]: value }
      if (!value) delete newFilters[column]
      setFilters(newFilters)
      onFilter?.(newFilters)
    }

    const handleRowSelection = (index: number) => {
      const newSelection = new Set(selectedRows)

      if (multiSelect) {
        if (newSelection.has(index)) {
          newSelection.delete(index)
        } else {
          newSelection.add(index)
        }
      } else {
        newSelection.clear()
        if (!selectedRows.has(index)) {
          newSelection.add(index)
        }
      }

      setSelectedRows(newSelection)
      const selected = paginatedData.filter((_, i) => newSelection.has(i))
      onSelectionChange?.(selected)
    }

    const handleSelectAll = () => {
      if (selectedRows.size === paginatedData.length) {
        setSelectedRows(new Set())
        onSelectionChange?.([])
      } else {
        const allIndices = new Set(paginatedData.map((_, i) => i))
        setSelectedRows(allIndices)
        onSelectionChange?.(paginatedData)
      }
    }

    const handlePageChange = (page: number) => {
      if (controlledPage === undefined) {
        setInternalPage(page)
      }
      onPageChange?.(page)
    }

    const occasionClass = occasionTheme && activeOccasion ? `occasion-${activeOccasion}` : ''

    const classes = [
      'occasion-table',
      `occasion-table--${variant}`,
      `occasion-table--${size}`,
      stickyHeader && 'occasion-table--sticky',
      responsive && 'occasion-table--responsive',
      loading && 'occasion-table--loading',
      occasionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const tableStyle = maxHeight ? { maxHeight, overflowY: 'auto' as const } : undefined

    return (
      <div ref={ref} className={classes} style={tableStyle}>
        <div className="occasion-table__wrapper">
          <table className="occasion-table__table">
            <thead className="occasion-table__header">
              <tr>
                {selectable && (
                  <th className="occasion-table__cell occasion-table__cell--checkbox">
                    {multiSelect && (
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.size === paginatedData.length && paginatedData.length > 0
                        }
                        onChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    )}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`occasion-table__cell occasion-table__cell--header occasion-table__cell--${column.align || 'left'}`}
                    style={{ width: column.width }}
                  >
                    <div className="occasion-table__header-content">
                      <span className="occasion-table__header-text">
                        {column.header}
                        {decorateHeaders && decoration && (
                          <span className="occasion-table__decoration" aria-hidden="true">
                            {decoration}
                          </span>
                        )}
                      </span>
                      {column.sortable !== false && sortable && (
                        <button
                          className="occasion-table__sort"
                          onClick={() => handleSort(column.key)}
                          aria-label={`Sort by ${column.header}`}
                        >
                          <span
                            className={
                              sortColumn === column.key && sortDirection === 'asc' ? 'active' : ''
                            }
                          >
                            ▲
                          </span>
                          <span
                            className={
                              sortColumn === column.key && sortDirection === 'desc' ? 'active' : ''
                            }
                          >
                            ▼
                          </span>
                        </button>
                      )}
                    </div>
                    {column.filterable !== false && filterable && (
                      <input
                        type="text"
                        className="occasion-table__filter"
                        placeholder="Filter..."
                        value={filters[column.key] || ''}
                        onChange={(e) => handleFilter(column.key, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="occasion-table__body">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="occasion-table__message"
                  >
                    <div className="occasion-table__loader">
                      <div className="occasion-table__spinner" />
                      <span>{loadingMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="occasion-table__message"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={[
                      'occasion-table__row',
                      selectedRows.has(rowIndex) && 'occasion-table__row--selected',
                      onRowClick && 'occasion-table__row--clickable',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => onRowClick?.(row, rowIndex)}
                  >
                    {selectable && (
                      <td className="occasion-table__cell occasion-table__cell--checkbox">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(rowIndex)}
                          onChange={() => handleRowSelection(rowIndex)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = column.accessor
                        ? typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : (row as Record<string, unknown>)[column.accessor]
                        : (row as Record<string, unknown>)[column.key]

                      return (
                        <td
                          key={column.key}
                          className={`occasion-table__cell occasion-table__cell--${column.align || 'left'}`}
                        >
                          {column.render
                            ? column.render(value, row, rowIndex)
                            : (value as unknown as React.ReactNode)}
                        </td>
                      )
                    })}
                  </tr>
                ))
              )}
            </tbody>
            {footer && (
              <tfoot className="occasion-table__footer">
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)}>{footer}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {pagination && totalPages > 1 && (
          <div className="occasion-table__pagination">
            <button
              className="occasion-table__page-btn"
              onClick={() => handlePageChange(currentPageNumber - 1)}
              disabled={currentPageNumber === 1}
            >
              Previous
            </button>

            <span className="occasion-table__page-info">
              Page {currentPageNumber} of {totalPages}
            </span>

            <button
              className="occasion-table__page-btn"
              onClick={() => handlePageChange(currentPageNumber + 1)}
              disabled={currentPageNumber === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    )
  }
)

OccasionTable.displayName = 'OccasionTable'
