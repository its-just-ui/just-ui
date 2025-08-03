import { useContext, useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { TableContext } from './context'
import {
  RowData,
  SortDescriptor,
  FilterDescriptor,
  SelectionModel,
  ExpandedState,
  PaginationState,
  EditingState,
  TableContextValue,
  FilterMatchMode,
} from './types'

export const useTable = <TData extends RowData = RowData>() => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTable must be used within a Table component')
  }
  return context as TableContextValue<TData>
}

export const useTableData = <TData extends RowData = RowData>(
  data: TData[],
  {
    sort,
    filters,
    globalFilter,
    groupBy,
    pagination,
    paginationMode,
  }: {
    sort: SortDescriptor[]
    filters: FilterDescriptor[]
    globalFilter: string
    groupBy: string[]
    pagination: PaginationState
    paginationMode: 'client' | 'server'
  }
) => {
  // Filter data
  const filteredData = useMemo(() => {
    let result = [...data]

    // Apply column filters
    filters.forEach((filter) => {
      result = result.filter((row) => {
        const value = row[filter.columnId]
        const filterValue = filter.value

        if (filterValue === undefined || filterValue === null || filterValue === '') {
          return true
        }

        const stringValue = String(value).toLowerCase()
        const stringFilterValue = String(filterValue).toLowerCase()

        switch (filter.matchMode) {
          case 'equals':
            return stringValue === stringFilterValue
          case 'notEquals':
            return stringValue !== stringFilterValue
          case 'contains':
          default:
            return stringValue.includes(stringFilterValue)
          case 'startsWith':
            return stringValue.startsWith(stringFilterValue)
          case 'endsWith':
            return stringValue.endsWith(stringFilterValue)
        }
      })
    })

    // Apply global filter
    if (globalFilter) {
      const searchValue = globalFilter.toLowerCase()
      result = result.filter((row) => {
        return Object.values(row).some((value) => {
          if (value === null || value === undefined) return false
          return String(value).toLowerCase().includes(searchValue)
        })
      })
    }

    return result
  }, [data, filters, globalFilter])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sort.length) return filteredData

    const sorted = [...filteredData]
    sorted.sort((a, b) => {
      for (const sortDesc of sort) {
        const { columnId, direction } = sortDesc
        if (!direction) continue

        const aValue = a[columnId]
        const bValue = b[columnId]

        let comparison = 0
        if (aValue == null) comparison = 1
        else if (bValue == null) comparison = -1
        else if (aValue < bValue) comparison = -1
        else if (aValue > bValue) comparison = 1

        if (comparison !== 0) {
          return direction === 'asc' ? comparison : -comparison
        }
      }
      return 0
    })

    return sorted
  }, [filteredData, sort])

  // Group data (if enabled)
  const groupedData = useMemo(() => {
    if (!groupBy.length) return sortedData

    // TODO: Implement grouping logic
    return sortedData
  }, [sortedData, groupBy])

  // Paginate data (client-side only)
  const paginatedData = useMemo(() => {
    if (paginationMode === 'server') return groupedData

    const start = pagination.pageIndex * pagination.pageSize
    const end = start + pagination.pageSize
    return groupedData.slice(start, end)
  }, [groupedData, pagination, paginationMode])

  return {
    processedData: groupedData,
    paginatedData,
    totalCount: filteredData.length,
  }
}

export const useTableSelection = <TData extends RowData = RowData>(
  data: TData[],
  getRowId: (row: TData, index: number) => string | number,
  isRowSelectable?: (row: TData) => boolean
) => {
  const [selectedRows, setSelectedRows] = useState<SelectionModel>(new Set())

  const toggleRowSelection = useCallback((rowId: string | number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }, [])

  const toggleAllRowsSelection = useCallback(() => {
    setSelectedRows((prev) => {
      const selectableRows = data.filter((row) => {
        if (isRowSelectable && !isRowSelectable(row)) return false
        return true
      })

      const allRowIds = selectableRows.map((row, index) => getRowId(row, index))
      const allSelected = allRowIds.every((id) => prev.has(id))

      if (allSelected) {
        return new Set()
      } else {
        return new Set(allRowIds)
      }
    })
  }, [data, getRowId, isRowSelectable])

  return {
    selectedRows,
    setSelectedRows,
    toggleRowSelection,
    toggleAllRowsSelection,
  }
}

export const useTableSort = (enableMultiSort = false, maxMultiSortColCount = Infinity) => {
  const [sort, setSort] = useState<SortDescriptor[]>([])

  const toggleSort = useCallback(
    (columnId: string, multiSort = false) => {
      setSort((prev) => {
        const existingIndex = prev.findIndex((s) => s.columnId === columnId)

        if (!enableMultiSort || !multiSort) {
          // Single sort mode
          if (existingIndex !== -1) {
            const existing = prev[existingIndex]
            if (existing.direction === 'asc') {
              return [{ columnId, direction: 'desc' }]
            } else if (existing.direction === 'desc') {
              return []
            }
          }
          return [{ columnId, direction: 'asc' }]
        } else {
          // Multi-sort mode
          const newSort = [...prev]
          if (existingIndex !== -1) {
            const existing = newSort[existingIndex]
            if (existing.direction === 'asc') {
              newSort[existingIndex] = { columnId, direction: 'desc' }
            } else if (existing.direction === 'desc') {
              newSort.splice(existingIndex, 1)
            }
          } else if (newSort.length < maxMultiSortColCount) {
            newSort.push({ columnId, direction: 'asc' })
          }
          return newSort
        }
      })
    },
    [enableMultiSort, maxMultiSortColCount]
  )

  return {
    sort,
    setSort,
    toggleSort,
  }
}

export const useTableFilter = () => {
  const [filters, setFilters] = useState<FilterDescriptor[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const setColumnFilter = useCallback(
    (columnId: string, value: any, matchMode?: FilterMatchMode) => {
      setFilters((prev) => {
        const newFilters = prev.filter((f) => f.columnId !== columnId)
        if (value !== undefined && value !== null && value !== '') {
          newFilters.push({ columnId, value, matchMode })
        }
        return newFilters
      })
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters([])
    setGlobalFilter('')
  }, [])

  return {
    filters,
    setFilters,
    globalFilter,
    setGlobalFilter,
    setColumnFilter,
    clearFilters,
  }
}

export const useTablePagination = (totalCount: number, defaultPageSize = 10) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  const pageCount = Math.ceil(totalCount / pagination.pageSize)
  const canPreviousPage = pagination.pageIndex > 0
  const canNextPage = pagination.pageIndex < pageCount - 1

  const previousPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(0, prev.pageIndex - 1),
    }))
  }, [])

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.min(pageCount - 1, prev.pageIndex + 1),
    }))
  }, [pageCount])

  const gotoPage = useCallback(
    (pageIndex: number) => {
      setPagination((prev) => ({
        ...prev,
        pageIndex: Math.max(0, Math.min(pageCount - 1, pageIndex)),
      }))
    },
    [pageCount]
  )

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => {
      const topRowIndex = prev.pageIndex * prev.pageSize
      const pageIndex = Math.floor(topRowIndex / pageSize)
      return {
        pageSize,
        pageIndex,
      }
    })
  }, [])

  return {
    pagination,
    setPagination,
    pageCount,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    gotoPage,
    setPageSize,
  }
}

export const useTableExpansion = () => {
  const [expandedRows, setExpandedRows] = useState<ExpandedState>(new Set())

  const toggleRowExpansion = useCallback((rowId: string | number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }, [])

  const expandAllRows = useCallback((rowIds: (string | number)[]) => {
    setExpandedRows(new Set(rowIds))
  }, [])

  const collapseAllRows = useCallback(() => {
    setExpandedRows(new Set())
  }, [])

  return {
    expandedRows,
    setExpandedRows,
    toggleRowExpansion,
    expandAllRows,
    collapseAllRows,
  }
}

export const useTableEditing = <TData extends RowData = RowData>(
  onEditCommit?: (
    rowId: string | number,
    columnId: string,
    value: any,
    row: TData
  ) => void | Promise<void>,
  onEditCancel?: (rowId: string | number, columnId: string) => void
) => {
  const [editingCell, setEditingCell] = useState<EditingState | null>(null)
  const editValueRef = useRef<any>(null)

  const startEditing = useCallback(
    (rowId: string | number, columnId: string, initialValue?: any) => {
      setEditingCell({ rowId, columnId, value: initialValue })
      editValueRef.current = initialValue
    },
    []
  )

  const commitEdit = useCallback(
    async (value: any, row: TData) => {
      if (!editingCell) return

      try {
        if (onEditCommit) {
          await onEditCommit(editingCell.rowId, editingCell.columnId, value, row)
        }
        setEditingCell(null)
        editValueRef.current = null
      } catch (error) {
        console.error('Failed to commit edit:', error)
      }
    },
    [editingCell, onEditCommit]
  )

  const cancelEdit = useCallback(() => {
    if (editingCell && onEditCancel) {
      onEditCancel(editingCell.rowId, editingCell.columnId)
    }
    setEditingCell(null)
    editValueRef.current = null
  }, [editingCell, onEditCancel])

  return {
    editingCell,
    setEditingCell,
    startEditing,
    commitEdit,
    cancelEdit,
  }
}

export const useTableKeyboardNavigation = <TData extends RowData = RowData>(
  tableRef: React.RefObject<HTMLTableElement>,
  {
    data,
    columns,
    getRowId,
    selectionMode,
    toggleRowSelection,
    expandedRows,
    toggleRowExpansion,
    editMode,
    startEditing,
  }: {
    data: TData[]
    columns: any[]
    getRowId: (row: TData, index: number) => string | number
    selectionMode: 'none' | 'single' | 'multiple'
    toggleRowSelection: (rowId: string | number) => void
    expandedRows: ExpandedState
    toggleRowExpansion: (rowId: string | number) => void
    editMode: 'none' | 'cell' | 'row' | 'inline'
    startEditing: (rowId: string | number, columnId: string) => void
  }
) => {
  const [focusedCell, setFocusedCell] = useState<{ rowIndex: number; columnIndex: number } | null>(
    null
  )

  useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedCell) return

      const { rowIndex, columnIndex } = focusedCell
      let newRowIndex = rowIndex
      let newColumnIndex = columnIndex

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          newRowIndex = Math.max(0, rowIndex - 1)
          break
        case 'ArrowDown':
          e.preventDefault()
          newRowIndex = Math.min(data.length - 1, rowIndex + 1)
          break
        case 'ArrowLeft':
          e.preventDefault()
          newColumnIndex = Math.max(0, columnIndex - 1)
          break
        case 'ArrowRight':
          e.preventDefault()
          newColumnIndex = Math.min(columns.length - 1, columnIndex + 1)
          break
        case 'Home':
          e.preventDefault()
          if (e.ctrlKey) {
            newRowIndex = 0
            newColumnIndex = 0
          } else {
            newColumnIndex = 0
          }
          break
        case 'End':
          e.preventDefault()
          if (e.ctrlKey) {
            newRowIndex = data.length - 1
            newColumnIndex = columns.length - 1
          } else {
            newColumnIndex = columns.length - 1
          }
          break
        case 'PageUp':
          e.preventDefault()
          newRowIndex = Math.max(0, rowIndex - 10)
          break
        case 'PageDown':
          e.preventDefault()
          newRowIndex = Math.min(data.length - 1, rowIndex + 10)
          break
        case ' ':
          if (selectionMode !== 'none' && rowIndex < data.length) {
            e.preventDefault()
            const rowId = getRowId(data[rowIndex], rowIndex)
            toggleRowSelection(rowId)
          }
          break
        case 'Enter':
          if (editMode !== 'none' && rowIndex < data.length && columnIndex < columns.length) {
            e.preventDefault()
            const rowId = getRowId(data[rowIndex], rowIndex)
            const column = columns[columnIndex]
            if (column.editable) {
              startEditing(rowId, column.id)
            }
          } else if (expandedRows && rowIndex < data.length) {
            e.preventDefault()
            const rowId = getRowId(data[rowIndex], rowIndex)
            toggleRowExpansion(rowId)
          }
          break
        default:
          return
      }

      if (newRowIndex !== rowIndex || newColumnIndex !== columnIndex) {
        setFocusedCell({ rowIndex: newRowIndex, columnIndex: newColumnIndex })

        // Focus the new cell
        const newCell = table.querySelector(
          `[data-row-index="${newRowIndex}"][data-column-index="${newColumnIndex}"]`
        ) as HTMLElement
        newCell?.focus()
      }
    }

    table.addEventListener('keydown', handleKeyDown)
    return () => {
      table.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    tableRef,
    focusedCell,
    data,
    columns,
    getRowId,
    selectionMode,
    toggleRowSelection,
    expandedRows,
    toggleRowExpansion,
    editMode,
    startEditing,
  ])

  return {
    focusedCell,
    setFocusedCell,
  }
}
