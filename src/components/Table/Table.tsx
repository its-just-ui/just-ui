import React, {
  forwardRef,
  useMemo,
  useCallback,
  useRef,
  useState,
  useEffect,
  CSSProperties,
} from 'react'
import { cn } from '@/utils'
import { TableContext } from './context'
import {
  useTableData,
  useTableSelection,
  useTableSort,
  useTableFilter,
  useTablePagination,
  useTableExpansion,
  useTableEditing,
  useTableKeyboardNavigation,
  useTable,
} from './hooks'
import {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
  TablePaginationProps,
  TableFilterProps,
  TableGlobalFilterProps,
  TableSortIconProps,
  TableExpandButtonProps,
  TableSelectCheckboxProps,
  TableEditCellProps,
  TableEmptyProps,
  TableLoadingProps,
  TableExpandedPanelProps,
  ColumnDef,
  TableContextValue,
} from './types'

// Main Table Component
const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      // Data
      data = [],
      columns = [],
      getRowId = (row, index) => row.id ?? index,

      // Variants & Styling
      variant = 'default',
      size = 'md',
      className,
      style,

      // States
      loading = false,
      loadingComponent,
      empty = data.length === 0,
      emptyComponent,
      disabled = false,

      // Selection
      selectionMode = 'none',
      selectedRows: controlledSelectedRows,
      defaultSelectedRows,
      onSelectionChange,
      isRowSelectable,

      // Sorting
      enableSorting = true,
      sort: controlledSort,
      defaultSort = [],
      onSortChange,
      enableMultiSort = false,
      maxMultiSortColCount = Infinity,

      // Filtering
      enableFiltering = false,
      filters: controlledFilters,
      defaultFilters = [],
      onFiltersChange,
      globalFilter: controlledGlobalFilter,
      onGlobalFilterChange,

      // Pagination
      enablePagination = false,
      paginationMode = 'client',
      pagination: controlledPagination,
      defaultPagination = { pageIndex: 0, pageSize: 10 },
      onPaginationChange,
      totalCount: controlledTotalCount,
      pageSizeOptions = [10, 20, 30, 40, 50],

      // Expansion
      enableExpanding = false,
      expandedRows: controlledExpandedRows,
      defaultExpandedRows,
      onExpandedChange,
      expandedContent,

      // Editing
      editMode = 'none',
      editingCell: controlledEditingCell,
      onEditingCellChange,
      onEditCommit,
      onEditCancel,

      // Grouping
      enableGrouping = false,
      groupBy = [],
      groups = [],

      // Virtualization
      enableVirtualization: _enableVirtualization = false,
      virtualizer: _virtualizer,

      // Features
      enableColumnResizing: _enableColumnResizing = false,
      enableColumnReordering: _enableColumnReordering = false,
      enableRowReordering: _enableRowReordering = false,
      stickyHeader = false,
      stickyColumns: _stickyColumns = false,

      // Handlers
      onRowClick,
      onRowDoubleClick,
      onCellClick,
      onCellDoubleClick,

      // Custom renderers
      rowRenderer,
      noDataRenderer: _noDataRenderer,
      loadingRenderer: _loadingRenderer,

      // Animation
      animationType = 'fade',
      animationDuration = 200,

      // Style customization props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      headerTextColor,
      backgroundColor,
      headerBackgroundColor,
      footerBackgroundColor,
      rowHoverBackground,
      rowSelectedBackground,
      alternateRowBackground,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      padding,
      paddingX,
      paddingY,
      headerPadding,
      cellPadding,
      footerPadding,

      // Sub-component style overrides
      headerStyle,
      headerClassName: _headerClassName,
      bodyStyle,
      bodyClassName: _bodyClassName,
      footerStyle,
      footerClassName: _footerClassName,
      rowStyle,
      rowClassName,
      cellStyle,
      cellClassName,

      // Icon customization
      sortAscIcon,
      sortDescIcon,
      sortNeutralIcon,
      expandIcon,
      collapseIcon,
      selectIcon,
      selectAllIcon,
      filterIcon,
      clearFilterIcon,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      captionComponent,

      children,
      ...props
    },
    ref
  ) => {
    const tableRef = useRef<HTMLTableElement>(null)
    const mergedRef = ref || tableRef

    // Selection state
    const isSelectionControlled = controlledSelectedRows !== undefined
    const {
      selectedRows: internalSelectedRows,
      setSelectedRows: setInternalSelectedRows,
      toggleRowSelection: internalToggleRowSelection,
      toggleAllRowsSelection: internalToggleAllRowsSelection,
    } = useTableSelection(data, getRowId, isRowSelectable)

    const selectedRows = isSelectionControlled
      ? controlledSelectedRows
      : (defaultSelectedRows ?? internalSelectedRows)

    const setSelectedRows = useCallback(
      (value: any) => {
        if (isSelectionControlled && onSelectionChange) {
          onSelectionChange(typeof value === 'function' ? value(selectedRows) : value)
        } else {
          setInternalSelectedRows(value)
        }
      },
      [isSelectionControlled, onSelectionChange, selectedRows, setInternalSelectedRows]
    )

    const toggleRowSelection = useCallback(
      (rowId: string | number) => {
        if (isSelectionControlled) {
          const next = new Set(selectedRows)
          if (next.has(rowId)) {
            next.delete(rowId)
          } else {
            next.add(rowId)
          }
          onSelectionChange?.(next)
        } else {
          internalToggleRowSelection(rowId)
        }
      },
      [isSelectionControlled, selectedRows, onSelectionChange, internalToggleRowSelection]
    )

    const toggleAllRowsSelection = useCallback(() => {
      if (isSelectionControlled) {
        const selectableRows = data.filter((row) => {
          if (isRowSelectable && !isRowSelectable(row)) return false
          return true
        })
        const allRowIds = selectableRows.map((row, index) => getRowId(row, index))
        const allSelected = allRowIds.every((id) => selectedRows.has(id))
        onSelectionChange?.(allSelected ? new Set() : new Set(allRowIds))
      } else {
        internalToggleAllRowsSelection()
      }
    }, [
      isSelectionControlled,
      data,
      getRowId,
      isRowSelectable,
      selectedRows,
      onSelectionChange,
      internalToggleAllRowsSelection,
    ])

    // Sorting state
    const isSortControlled = controlledSort !== undefined
    const {
      sort: internalSort,
      setSort: setInternalSort,
      toggleSort: internalToggleSort,
    } = useTableSort(enableMultiSort, maxMultiSortColCount)

    const sort = isSortControlled ? controlledSort : defaultSort.length ? defaultSort : internalSort

    const setSort = useCallback(
      (value: any) => {
        if (isSortControlled && onSortChange) {
          onSortChange(typeof value === 'function' ? value(sort) : value)
        } else {
          setInternalSort(value)
        }
      },
      [isSortControlled, onSortChange, sort, setInternalSort]
    )

    const toggleSort = useCallback(
      (columnId: string, multiSort = false) => {
        if (isSortControlled) {
          const existingIndex = sort.findIndex((s) => s.columnId === columnId)
          let newSort = [...sort]

          if (!enableMultiSort || !multiSort) {
            if (existingIndex !== -1) {
              const existing = sort[existingIndex]
              if (existing.direction === 'asc') {
                newSort = [{ columnId, direction: 'desc' }]
              } else if (existing.direction === 'desc') {
                newSort = []
              }
            } else {
              newSort = [{ columnId, direction: 'asc' }]
            }
          } else {
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
          }
          onSortChange?.(newSort)
        } else {
          internalToggleSort(columnId, multiSort)
        }
      },
      [
        isSortControlled,
        sort,
        enableMultiSort,
        maxMultiSortColCount,
        onSortChange,
        internalToggleSort,
      ]
    )

    // Filtering state
    const isFiltersControlled = controlledFilters !== undefined
    const isGlobalFilterControlled = controlledGlobalFilter !== undefined
    const {
      filters: internalFilters,
      setFilters: setInternalFilters,
      globalFilter: internalGlobalFilter,
      setGlobalFilter: setInternalGlobalFilter,
    } = useTableFilter()

    const filters = isFiltersControlled
      ? controlledFilters
      : defaultFilters.length
        ? defaultFilters
        : internalFilters
    const globalFilter = isGlobalFilterControlled ? controlledGlobalFilter : internalGlobalFilter

    const setFilters = useCallback(
      (value: any) => {
        if (isFiltersControlled && onFiltersChange) {
          onFiltersChange(typeof value === 'function' ? value(filters) : value)
        } else {
          setInternalFilters(value)
        }
      },
      [isFiltersControlled, onFiltersChange, filters, setInternalFilters]
    )

    const setGlobalFilter = useCallback(
      (value: string) => {
        if (isGlobalFilterControlled && onGlobalFilterChange) {
          onGlobalFilterChange(value)
        } else {
          setInternalGlobalFilter(value)
        }
      },
      [isGlobalFilterControlled, onGlobalFilterChange, setInternalGlobalFilter]
    )

    // Pagination state
    const isPaginationControlled = controlledPagination !== undefined
    const { pagination: internalPagination, setPagination: setInternalPagination } =
      useTablePagination(controlledTotalCount ?? data.length, defaultPagination.pageSize)

    const pagination = isPaginationControlled ? controlledPagination : internalPagination

    const setPagination = useCallback(
      (value: any) => {
        if (isPaginationControlled && onPaginationChange) {
          onPaginationChange(typeof value === 'function' ? value(pagination) : value)
        } else {
          setInternalPagination(value)
        }
      },
      [isPaginationControlled, onPaginationChange, pagination, setInternalPagination]
    )

    // Expansion state
    const isExpansionControlled = controlledExpandedRows !== undefined
    const {
      expandedRows: internalExpandedRows,
      setExpandedRows: setInternalExpandedRows,
      toggleRowExpansion: internalToggleRowExpansion,
    } = useTableExpansion()

    const expandedRows = isExpansionControlled
      ? controlledExpandedRows
      : (defaultExpandedRows ?? internalExpandedRows)

    const setExpandedRows = useCallback(
      (value: any) => {
        if (isExpansionControlled && onExpandedChange) {
          onExpandedChange(typeof value === 'function' ? value(expandedRows) : value)
        } else {
          setInternalExpandedRows(value)
        }
      },
      [isExpansionControlled, onExpandedChange, expandedRows, setInternalExpandedRows]
    )

    const toggleRowExpansion = useCallback(
      (rowId: string | number) => {
        if (isExpansionControlled) {
          const next = new Set(expandedRows)
          if (next.has(rowId)) {
            next.delete(rowId)
          } else {
            next.add(rowId)
          }
          onExpandedChange?.(next)
        } else {
          internalToggleRowExpansion(rowId)
        }
      },
      [isExpansionControlled, expandedRows, onExpandedChange, internalToggleRowExpansion]
    )

    // Editing state
    const isEditingControlled = controlledEditingCell !== undefined
    const {
      editingCell: internalEditingCell,
      setEditingCell: setInternalEditingCell,
      startEditing: internalStartEditing,
      commitEdit: internalCommitEdit,
      cancelEdit: internalCancelEdit,
    } = useTableEditing(onEditCommit, onEditCancel)

    const editingCell = isEditingControlled ? controlledEditingCell : internalEditingCell

    const setEditingCell = useCallback(
      (value: any) => {
        if (isEditingControlled && onEditingCellChange) {
          onEditingCellChange(value)
        } else {
          setInternalEditingCell(value)
        }
      },
      [isEditingControlled, onEditingCellChange, setInternalEditingCell]
    )

    const startEditing = useCallback(
      (rowId: string | number, columnId: string) => {
        const rowIndex = data.findIndex((row, index) => getRowId(row, index) === rowId)
        if (rowIndex === -1) return

        const column = columns.find((col) => col.id === columnId)
        if (!column || !column.editable) return

        const row = data[rowIndex]
        const value = column.accessorFn ? column.accessorFn(row) : row[column.accessorKey as string]

        if (isEditingControlled) {
          onEditingCellChange?.({ rowId, columnId, value })
        } else {
          internalStartEditing(rowId, columnId, value)
        }
      },
      [data, columns, getRowId, isEditingControlled, onEditingCellChange, internalStartEditing]
    )

    const commitEdit = useCallback(
      async (value: any) => {
        if (!editingCell) return
        const rowIndex = data.findIndex((row, index) => getRowId(row, index) === editingCell.rowId)
        if (rowIndex === -1) return
        const row = data[rowIndex]
        await internalCommitEdit(value, row)
        if (isEditingControlled) {
          onEditingCellChange?.(null)
        }
      },
      [editingCell, data, getRowId, internalCommitEdit, isEditingControlled, onEditingCellChange]
    )

    const cancelEdit = useCallback(() => {
      internalCancelEdit()
      if (isEditingControlled) {
        onEditingCellChange?.(null)
      }
    }, [internalCancelEdit, isEditingControlled, onEditingCellChange])

    // Process data
    const { processedData, paginatedData, totalCount } = useTableData(data, {
      sort,
      filters,
      globalFilter,
      groupBy,
      pagination,
      paginationMode,
    })

    const finalTotalCount = controlledTotalCount ?? totalCount
    const pageCount = Math.ceil(finalTotalCount / pagination.pageSize)
    const canPreviousPage = pagination.pageIndex > 0
    const canNextPage = pagination.pageIndex < pageCount - 1

    // Keyboard navigation
    const { focusedCell } = useTableKeyboardNavigation(mergedRef as any, {
      data: paginatedData,
      columns,
      getRowId,
      selectionMode,
      toggleRowSelection,
      expandedRows,
      toggleRowExpansion,
      editMode,
      startEditing,
    })

    // Collect all style props
    const styles = useMemo(
      () => ({
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily,
        textColor,
        headerTextColor,
        backgroundColor,
        headerBackgroundColor,
        footerBackgroundColor,
        rowHoverBackground,
        rowSelectedBackground,
        alternateRowBackground,
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        focusBorderColor,
        focusBackgroundColor,
        boxShadow,
        focusBoxShadow,
        padding,
        paddingX,
        paddingY,
        headerPadding,
        cellPadding,
        footerPadding,
      }),
      [
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily,
        textColor,
        headerTextColor,
        backgroundColor,
        headerBackgroundColor,
        footerBackgroundColor,
        rowHoverBackground,
        rowSelectedBackground,
        alternateRowBackground,
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        focusBorderColor,
        focusBackgroundColor,
        boxShadow,
        focusBoxShadow,
        padding,
        paddingX,
        paddingY,
        headerPadding,
        cellPadding,
        footerPadding,
      ]
    )

    // Icon components
    const icons = useMemo(
      () => ({
        sortAsc: sortAscIcon,
        sortDesc: sortDescIcon,
        sortNeutral: sortNeutralIcon,
        expand: expandIcon,
        collapse: collapseIcon,
        select: selectIcon,
        selectAll: selectAllIcon,
        filter: filterIcon,
        clearFilter: clearFilterIcon,
      }),
      [
        sortAscIcon,
        sortDescIcon,
        sortNeutralIcon,
        expandIcon,
        collapseIcon,
        selectIcon,
        selectAllIcon,
        filterIcon,
        clearFilterIcon,
      ]
    )

    // Context value
    const contextValue: TableContextValue = {
      // Data & columns
      data,
      columns,
      getRowId,

      // Variants & styling
      variant,
      size,

      // States
      loading,
      empty,
      disabled,

      // Selection
      selectionMode,
      selectedRows,
      setSelectedRows,
      isRowSelectable,
      toggleRowSelection,
      toggleAllRowsSelection,

      // Sorting
      enableSorting,
      sort,
      setSort,
      toggleSort,

      // Filtering
      enableFiltering,
      filters,
      setFilters,
      globalFilter,
      setGlobalFilter,

      // Pagination
      enablePagination,
      paginationMode,
      pagination,
      setPagination,
      totalCount: finalTotalCount,
      pageSizeOptions,
      pageCount,
      canPreviousPage,
      canNextPage,

      // Expansion
      enableExpanding,
      expandedRows,
      setExpandedRows,
      toggleRowExpansion,
      expandedContent,

      // Editing
      editMode,
      editingCell,
      setEditingCell,
      startEditing,
      commitEdit,
      cancelEdit,

      // Grouping
      enableGrouping,
      groupBy,
      groups,

      // Processed data
      processedData,
      paginatedData,

      // Animation
      animationType,
      animationDuration,

      // Styles
      styles,

      // Icons
      icons,

      // Additional props
      headerStyle,
      bodyStyle,
      footerStyle,
      rowStyle,
      rowClassName,
      cellStyle,
      cellClassName,
      stickyHeader,
      rowRenderer,
      onRowClick,
      onRowDoubleClick,
      onCellClick,
      onCellDoubleClick,
    }

    // Table styles
    const tableStyles: CSSProperties = {
      ...style,
    }

    if (borderWidth) tableStyles.borderWidth = borderWidth
    if (borderColor) tableStyles.borderColor = borderColor
    if (borderStyle) tableStyles.borderStyle = borderStyle
    if (borderRadius) tableStyles.borderRadius = borderRadius
    if (fontSize) tableStyles.fontSize = fontSize
    if (fontWeight) tableStyles.fontWeight = fontWeight
    if (fontFamily) tableStyles.fontFamily = fontFamily
    if (textColor) tableStyles.color = textColor
    if (backgroundColor) tableStyles.backgroundColor = backgroundColor
    if (boxShadow) tableStyles.boxShadow = boxShadow
    if (focusBoxShadow && focusedCell) tableStyles.boxShadow = focusBoxShadow

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    const variantClasses = {
      default: 'border-collapse',
      striped: 'border-collapse',
      bordered: 'border',
      minimal: 'border-collapse',
      'card-style': 'border rounded-lg shadow-sm',
      compact: 'border-collapse',
    }

    const wrapperClasses = cn(
      'relative w-full overflow-auto',
      stickyHeader && 'max-h-[600px]',
      disabled && 'opacity-50 pointer-events-none'
    )

    const tableClasses = cn(
      'w-full caption-bottom',
      sizeClasses[size],
      variantClasses[variant],
      className
    )

    return (
      <TableContext.Provider value={contextValue}>
        <div className={wrapperClasses}>
          {captionComponent && (
            <div className="sr-only" id={ariaLabelledBy}>
              {captionComponent}
            </div>
          )}
          <table
            ref={mergedRef as any}
            className={tableClasses}
            style={tableStyles}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            role="table"
            {...props}
          >
            {children || (
              <>
                {loading && loadingComponent}
                {!loading && empty && emptyComponent}
                {!loading && !empty && (
                  <>
                    <TableHeader />
                    <TableBody />
                    {columns.some((col) => col.footer) && <TableFooter />}
                  </>
                )}
              </>
            )}
          </table>
        </div>
      </TableContext.Provider>
    )
  }
)

Table.displayName = 'Table'

// Table Header Component
const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, style, ...props }, ref) => {
    const { columns, styles, headerStyle, stickyHeader, variant, selectionMode, enableExpanding } =
      useTable()

    const headerStyles: CSSProperties = {
      ...headerStyle,
      ...style,
    }

    if (styles.headerBackgroundColor) headerStyles.backgroundColor = styles.headerBackgroundColor
    if (styles.headerTextColor) headerStyles.color = styles.headerTextColor
    if (styles.headerPadding) headerStyles.padding = styles.headerPadding

    const headerClasses = cn(
      variant === 'bordered' && 'border-b',
      stickyHeader && 'sticky top-0 z-10 bg-background',
      className
    )

    return (
      <thead ref={ref} className={headerClasses} style={headerStyles} {...props}>
        <tr>
          {enableExpanding && <TableHeaderCell className="w-8" />}
          {selectionMode !== 'none' && <TableSelectAllHeaderCell />}
          {columns.map((column) => (
            <TableHeaderCell key={column.id} column={column} />
          ))}
        </tr>
      </thead>
    )
  }
)

TableHeader.displayName = 'TableHeader'

// Table Body Component
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, style, ...props }, ref) => {
    const {
      paginatedData,
      columns,
      getRowId,
      variant,
      bodyStyle,
      rowRenderer,
      onRowClick,
      onRowDoubleClick,
      selectionMode,
      enableExpanding,
    } = useTable()

    const bodyStyles: CSSProperties = {
      ...bodyStyle,
      ...style,
    }

    const bodyClasses = cn(
      '[&_tr:last-child]:border-0',
      variant === 'striped' && '[&_tr:nth-child(even)]:bg-muted/50',
      className
    )

    return (
      <tbody ref={ref} className={bodyClasses} style={bodyStyles} {...props}>
        {paginatedData.map((row, rowIndex) => {
          const rowId = getRowId(row, rowIndex)
          const rowContent = (
            <>
              <TableRow
                key={rowId}
                row={row}
                rowIndex={rowIndex}
                onClick={onRowClick ? (e) => onRowClick(row, rowIndex, e) : undefined}
                onDoubleClick={
                  onRowDoubleClick ? (e) => onRowDoubleClick(row, rowIndex, e) : undefined
                }
              >
                {enableExpanding && <TableExpandCell rowId={rowId} />}
                {selectionMode !== 'none' && <TableSelectCell rowId={rowId} row={row} />}
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={column.id}
                    row={row}
                    column={column}
                    rowIndex={rowIndex}
                    columnIndex={colIndex}
                  />
                ))}
              </TableRow>
              {enableExpanding && <TableExpandedRow rowId={rowId} row={row} rowIndex={rowIndex} />}
            </>
          )

          return rowRenderer ? (
            <React.Fragment key={rowId}>
              {rowRenderer({ row, rowIndex, children: rowContent })}
            </React.Fragment>
          ) : (
            rowContent
          )
        })}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

// Table Footer Component
const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, style, ...props }, ref) => {
    const { columns, styles, footerStyle, variant, selectionMode, enableExpanding } = useTable()

    const footerStyles: CSSProperties = {
      ...footerStyle,
      ...style,
    }

    if (styles.footerBackgroundColor) footerStyles.backgroundColor = styles.footerBackgroundColor
    if (styles.footerPadding) footerStyles.padding = styles.footerPadding

    const footerClasses = cn('font-medium', variant === 'bordered' && 'border-t', className)

    return (
      <tfoot ref={ref} className={footerClasses} style={footerStyles} {...props}>
        <tr>
          {enableExpanding && <td />}
          {selectionMode !== 'none' && <td />}
          {columns.map((column) => (
            <td key={column.id} className={cn('px-4 py-2', column.footerClassName)}>
              {typeof column.footer === 'function' ? column.footer({ column }) : column.footer}
            </td>
          ))}
        </tr>
      </tfoot>
    )
  }
)

TableFooter.displayName = 'TableFooter'

// Table Row Component
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps & { row: any; rowIndex: number }>(
  ({ className, style, row, rowIndex, status, selected, expanded, disabled, ...props }, ref) => {
    const {
      getRowId,
      selectedRows,
      styles,
      rowStyle,
      rowClassName,
      variant,
      animationType,
      animationDuration,
    } = useTable()

    const rowId = getRowId(row, rowIndex)
    const isSelected = selected ?? selectedRows.has(rowId)

    const rowStyles: CSSProperties = {
      ...(typeof rowStyle === 'function' ? rowStyle(row, rowIndex) : rowStyle),
      ...style,
    }

    if (isSelected && styles.rowSelectedBackground) {
      rowStyles.backgroundColor = styles.rowSelectedBackground
    } else if (rowIndex % 2 === 1 && styles.alternateRowBackground && variant !== 'striped') {
      rowStyles.backgroundColor = styles.alternateRowBackground
    }

    if (animationType !== 'none') {
      rowStyles.transition = `all ${animationDuration}ms ${animationType}`
    }

    const statusClasses = {
      default: '',
      success: 'bg-green-50 hover:bg-green-100',
      warning: 'bg-yellow-50 hover:bg-yellow-100',
      error: 'bg-red-50 hover:bg-red-100',
      info: 'bg-blue-50 hover:bg-blue-100',
    }

    const rowClasses = cn(
      'border-b transition-colors',
      styles.rowHoverBackground ? `hover:bg-[${styles.rowHoverBackground}]` : 'hover:bg-muted/50',
      isSelected && 'bg-muted',
      status && statusClasses[status],
      disabled && 'opacity-50 pointer-events-none',
      variant === 'minimal' && 'border-b-0',
      typeof rowClassName === 'function' ? rowClassName(row, rowIndex) : rowClassName,
      className
    )

    return (
      <tr
        ref={ref}
        className={rowClasses}
        style={rowStyles}
        data-row-index={rowIndex}
        role="row"
        aria-selected={isSelected}
        aria-expanded={expanded}
        aria-disabled={disabled}
        {...props}
      />
    )
  }
)

TableRow.displayName = 'TableRow'

// Table Cell Component
const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps & { row: any; column: ColumnDef<any>; rowIndex: number; columnIndex?: number }
>(({ className, style, row, column, rowIndex, columnIndex, status: _status, ...props }, ref) => {
  const {
    getRowId,
    styles,
    cellStyle,
    cellClassName,
    editingCell,
    editMode,
    startEditing,
    commitEdit,
    cancelEdit,
    onCellClick,
    onCellDoubleClick,
  } = useTable()

  const rowId = getRowId(row, rowIndex)
  const isEditing = editingCell?.rowId === rowId && editingCell?.columnId === column.id
  const value = column.accessorFn ? column.accessorFn(row) : row[column.accessorKey as string]

  const cellStyles: CSSProperties = {
    ...(typeof cellStyle === 'function' ? cellStyle(row, column) : cellStyle),
    ...style,
  }

  if (styles.cellPadding) cellStyles.padding = styles.cellPadding
  if (column.width) cellStyles.width = column.width
  if (column.minWidth) cellStyles.minWidth = column.minWidth
  if (column.maxWidth) cellStyles.maxWidth = column.maxWidth

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const cellClasses = cn(
    'p-4',
    column.align && alignClasses[column.align],
    column.sticky && 'sticky bg-background',
    column.sticky === 'left' && 'left-0',
    column.sticky === 'right' && 'right-0',
    column.hidden && 'hidden',
    column.cellClassName,
    typeof cellClassName === 'function' ? cellClassName(row, column) : cellClassName,
    className
  )

  const handleClick = (e: React.MouseEvent) => {
    onCellClick?.(row, column, rowIndex, e)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    onCellDoubleClick?.(row, column, rowIndex, e)
    if (editMode === 'cell' && column.editable) {
      startEditing(rowId, column.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && editMode === 'cell' && column.editable && !isEditing) {
      e.preventDefault()
      startEditing(rowId, column.id)
    }
  }

  return (
    <td
      ref={ref}
      className={cellClasses}
      style={cellStyles}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={column.editable ? 0 : -1}
      data-column-index={columnIndex}
      role="cell"
      {...props}
    >
      {isEditing && column.editComponent ? (
        column.editComponent({
          value: editingCell.value,
          row,
          column,
          onSave: commitEdit,
          onCancel: cancelEdit,
        })
      ) : isEditing ? (
        <TableEditCell
          value={editingCell.value}
          row={row}
          column={column}
          onSave={commitEdit}
          onCancel={cancelEdit}
        />
      ) : column.cell ? (
        column.cell({ value, row, column, rowIndex })
      ) : (
        String(value ?? '')
      )}
    </td>
  )
})

TableCell.displayName = 'TableCell'

// Table Header Cell Component
const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps & { column?: ColumnDef<any> }
>(
  (
    {
      className,
      style,
      column,
      sorted: _sorted,
      sortable,
      resizable: _resizable,
      reorderable: _reorderable,
      ...props
    },
    ref
  ) => {
    const { sort, toggleSort, enableSorting, styles } = useTable()

    if (!column) {
      return <th ref={ref} className={className} style={style} {...props} />
    }

    const isSortable = sortable ?? (column.sortable !== false && enableSorting)
    const currentSort = sort.find((s) => s.columnId === column.id)
    const sortDirection = currentSort?.direction ?? null

    const headerStyles: CSSProperties = {
      ...style,
    }

    if (column.width) headerStyles.width = column.width
    if (column.minWidth) headerStyles.minWidth = column.minWidth
    if (column.maxWidth) headerStyles.maxWidth = column.maxWidth
    if (styles.headerPadding) headerStyles.padding = styles.headerPadding

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    const headerClasses = cn(
      'h-12 px-4 font-medium text-muted-foreground',
      column.align && alignClasses[column.align],
      column.sticky && 'sticky bg-background',
      column.sticky === 'left' && 'left-0',
      column.sticky === 'right' && 'right-0',
      column.hidden && 'hidden',
      isSortable && 'cursor-pointer select-none hover:text-foreground',
      column.headerClassName,
      className
    )

    const handleClick = (e: React.MouseEvent) => {
      if (isSortable) {
        toggleSort(column.id, e.shiftKey)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && isSortable) {
        e.preventDefault()
        toggleSort(column.id, e.shiftKey)
      }
    }

    return (
      <th
        ref={ref}
        className={headerClasses}
        style={headerStyles}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isSortable ? 0 : -1}
        role="columnheader"
        aria-sort={
          sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none'
        }
        {...props}
      >
        <div className="flex items-center justify-between">
          <span>
            {typeof column.header === 'function' ? column.header({ column }) : column.header}
          </span>
          {isSortable && <TableSortIcon direction={sortDirection} />}
        </div>
      </th>
    )
  }
)

TableHeaderCell.displayName = 'TableHeaderCell'

// Select All Header Cell
const TableSelectAllHeaderCell = () => {
  const { data, selectedRows, toggleAllRowsSelection, selectionMode, isRowSelectable, getRowId } =
    useTable()

  if (selectionMode === 'single') {
    return <th className="w-10 px-2" />
  }

  const selectableRows = data.filter((row) => {
    if (isRowSelectable && !isRowSelectable(row)) return false
    return true
  })

  const allRowIds = selectableRows.map((row, index) => getRowId(row, index))
  const selectedCount = allRowIds.filter((id) => selectedRows.has(id)).length
  const allSelected = selectedCount === allRowIds.length && allRowIds.length > 0
  const indeterminate = selectedCount > 0 && selectedCount < allRowIds.length

  return (
    <th className="w-10 px-2">
      <TableSelectCheckbox
        checked={allSelected}
        indeterminate={indeterminate}
        onChange={toggleAllRowsSelection}
        aria-label="Select all rows"
      />
    </th>
  )
}

// Select Cell
const TableSelectCell = ({ rowId, row }: { rowId: string | number; row: any }) => {
  const { selectedRows, toggleRowSelection, isRowSelectable } = useTable()

  const isSelected = selectedRows.has(rowId)
  const isDisabled = isRowSelectable ? !isRowSelectable(row) : false

  return (
    <td className="w-10 px-2">
      <TableSelectCheckbox
        checked={isSelected}
        onChange={() => toggleRowSelection(rowId)}
        disabled={isDisabled}
        aria-label={`Select row ${rowId}`}
      />
    </td>
  )
}

// Expand Cell
const TableExpandCell = ({ rowId }: { rowId: string | number }) => {
  const { expandedRows, toggleRowExpansion } = useTable()
  const isExpanded = expandedRows.has(rowId)

  return (
    <td className="w-8 px-1">
      <TableExpandButton expanded={isExpanded} onToggle={() => toggleRowExpansion(rowId)} />
    </td>
  )
}

// Expanded Row
const TableExpandedRow = ({
  rowId,
  row,
  rowIndex,
}: {
  rowId: string | number
  row: any
  rowIndex: number
}) => {
  const {
    expandedRows,
    expandedContent,
    columns,
    selectionMode,
    enableExpanding,
    animationType,
    animationDuration,
  } = useTable()

  const isExpanded = expandedRows.has(rowId)
  if (!isExpanded || !expandedContent) return null

  const colSpan = columns.length + (selectionMode !== 'none' ? 1 : 0) + (enableExpanding ? 1 : 0)

  const expandedStyles: CSSProperties = {}
  if (animationType !== 'none') {
    expandedStyles.transition = `all ${animationDuration}ms ${animationType}`
  }

  return (
    <TableExpandedPanel colSpan={colSpan} style={expandedStyles}>
      {expandedContent({ row, rowIndex })}
    </TableExpandedPanel>
  )
}

// Table Sort Icon Component
const TableSortIcon: React.FC<TableSortIconProps> = ({ direction, className, ...props }) => {
  const { icons } = useTable()

  if (direction === 'asc') {
    return (
      <span className={cn('ml-2 h-4 w-4', className)} {...props}>
        {icons.sortAsc || <ChevronUp className="h-4 w-4" />}
      </span>
    )
  }

  if (direction === 'desc') {
    return (
      <span className={cn('ml-2 h-4 w-4', className)} {...props}>
        {icons.sortDesc || <ChevronDown className="h-4 w-4" />}
      </span>
    )
  }

  return (
    <span className={cn('ml-2 h-4 w-4 opacity-50', className)} {...props}>
      {icons.sortNeutral || <ChevronsUpDown className="h-4 w-4" />}
    </span>
  )
}

// Chevrons Up Down Icon (not in lucide-react)
const ChevronsUpDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

// Table Expand Button Component
const TableExpandButton: React.FC<TableExpandButtonProps> = ({
  expanded,
  onToggle,
  className,
  ...props
}) => {
  const { icons } = useTable()

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'inline-flex h-6 w-6 items-center justify-center rounded hover:bg-muted',
        className
      )}
      aria-expanded={expanded}
      aria-label={expanded ? 'Collapse row' : 'Expand row'}
      {...props}
    >
      {expanded
        ? icons.collapse || <ChevronDown className="h-4 w-4" />
        : icons.expand || <ChevronRight className="h-4 w-4" />}
    </button>
  )
}

// Table Select Checkbox Component
const TableSelectCheckbox: React.FC<TableSelectCheckboxProps> = ({
  checked,
  indeterminate,
  onChange,
  className,
  ...props
}) => {
  const { icons } = useTable()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false
    }
  }, [indeterminate])

  return (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          'h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2',
          className
        )}
        {...props}
      />
      {checked && icons.select && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {icons.select}
        </span>
      )}
      {indeterminate && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Minus className="h-3 w-3" />
        </span>
      )}
    </div>
  )
}

// Table Edit Cell Component
const TableEditCell: React.FC<TableEditCellProps> = ({ value, onSave, onCancel }) => {
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSave(editValue)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
  }

  const handleBlur = () => {
    onSave(editValue)
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={editValue ?? ''}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}

// Table Empty Component
const TableEmpty: React.FC<TableEmptyProps> = ({
  message = 'No data available',
  action,
  illustration,
  className,
  ...props
}) => {
  const { columns, selectionMode, enableExpanding } = useTable()
  const colSpan = columns.length + (selectionMode !== 'none' ? 1 : 0) + (enableExpanding ? 1 : 0)

  return (
    <tr>
      <td colSpan={colSpan}>
        <div
          className={cn('flex flex-col items-center justify-center py-12 text-center', className)}
          {...props}
        >
          {illustration && <div className="mb-4">{illustration}</div>}
          <p className="text-sm text-muted-foreground">{message}</p>
          {action && <div className="mt-4">{action}</div>}
        </div>
      </td>
    </tr>
  )
}

// Table Loading Component
const TableLoading: React.FC<TableLoadingProps> = ({
  message = 'Loading...',
  showSkeleton = true,
  skeletonRows = 5,
  className,
  ...props
}) => {
  const { columns, selectionMode, enableExpanding } = useTable()
  const colSpan = columns.length + (selectionMode !== 'none' ? 1 : 0) + (enableExpanding ? 1 : 0)

  if (showSkeleton) {
    return (
      <>
        {Array.from({ length: skeletonRows }).map((_, index) => (
          <tr key={index}>
            {enableExpanding && (
              <td className="w-8 px-1">
                <div className="h-6 w-6 animate-pulse rounded bg-muted" />
              </td>
            )}
            {selectionMode !== 'none' && (
              <td className="w-10 px-2">
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              </td>
            )}
            {columns.map((column) => (
              <td key={column.id} className="p-4">
                <div className="h-4 animate-pulse rounded bg-muted" />
              </td>
            ))}
          </tr>
        ))}
      </>
    )
  }

  return (
    <tr>
      <td colSpan={colSpan}>
        <div className={cn('flex items-center justify-center py-12', className)} {...props}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </td>
    </tr>
  )
}

// Table Expanded Panel Component
const TableExpandedPanel: React.FC<TableExpandedPanelProps> = ({
  colSpan,
  className,
  children,
  ...props
}) => {
  return (
    <tr className={cn('border-b', className)} {...props}>
      <td colSpan={colSpan} className="p-4">
        {children}
      </td>
    </tr>
  )
}

// Table Pagination Component
const TablePagination: React.FC<TablePaginationProps> = ({
  showPageSizeSelector = true,
  showPageNumbers = true,
  showTotalCount = true,
  compact = false,
  className,
  ...props
}) => {
  const {
    pagination,
    setPagination,
    pageCount,
    canPreviousPage,
    canNextPage,
    totalCount,
    pageSizeOptions,
  } = useTable()

  const handlePageChange = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }))
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ pageIndex: 0, pageSize })
  }

  const startItem = pagination.pageIndex * pagination.pageSize + 1
  const endItem = Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)

  return (
    <div
      className={cn('flex items-center justify-between px-2', compact ? 'py-2' : 'py-4', className)}
      {...props}
    >
      {showTotalCount && (
        <div className="text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {totalCount} results
        </div>
      )}

      <div className="flex items-center gap-2">
        {showPageSizeSelector && (
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-8 rounded border px-2 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(0)}
            disabled={!canPreviousPage}
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted disabled:opacity-50"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handlePageChange(pagination.pageIndex - 1)}
            disabled={!canPreviousPage}
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted disabled:opacity-50"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {showPageNumbers && (
            <div className="flex items-center gap-1">
              {Array.from({ length: pageCount }).map((_, index) => {
                // Show first, last, current, and adjacent pages
                if (
                  index === 0 ||
                  index === pageCount - 1 ||
                  Math.abs(index - pagination.pageIndex) <= 1
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      className={cn(
                        'inline-flex h-8 min-w-[2rem] items-center justify-center rounded px-3 text-sm',
                        pagination.pageIndex === index
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      )}
                      aria-label={`Go to page ${index + 1}`}
                      aria-current={pagination.pageIndex === index ? 'page' : undefined}
                    >
                      {index + 1}
                    </button>
                  )
                } else if (
                  index === pagination.pageIndex - 2 ||
                  index === pagination.pageIndex + 2
                ) {
                  return (
                    <span key={index} className="px-1">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          <button
            onClick={() => handlePageChange(pagination.pageIndex + 1)}
            disabled={!canNextPage}
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted disabled:opacity-50"
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => handlePageChange(pageCount - 1)}
            disabled={!canNextPage}
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted disabled:opacity-50"
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Table Filter Component
const TableFilter: React.FC<TableFilterProps> = ({
  column: _column,
  value,
  onChange,
  matchMode: _matchMode = 'contains',
  placeholder = 'Filter...',
  className,
  ...props
}) => {
  const { icons } = useTable()

  return (
    <div className={cn('relative', className)} {...props}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icons.filter || <Filter className="h-4 w-4 text-muted-foreground" />}
      </div>
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-full rounded border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Clear filter"
        >
          {icons.clearFilter || (
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          )}
        </button>
      )}
    </div>
  )
}

// Table Global Filter Component
const TableGlobalFilter: React.FC<TableGlobalFilterProps> = ({
  value,
  onChange,
  placeholder = 'Search all columns...',
  debounceMs = 300,
  className,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue)
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [localValue, onChange, debounceMs])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <div className={cn('relative', className)} {...props}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {localValue && (
        <button
          onClick={() => {
            setLocalValue('')
            onChange('')
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  )
}

// Create compound component interface
interface TableComponent
  extends React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>> {
  Header: typeof TableHeader
  Body: typeof TableBody
  Footer: typeof TableFooter
  Row: typeof TableRow
  Cell: typeof TableCell
  HeaderCell: typeof TableHeaderCell
  Pagination: typeof TablePagination
  Filter: typeof TableFilter
  GlobalFilter: typeof TableGlobalFilter
  SortIcon: typeof TableSortIcon
  ExpandButton: typeof TableExpandButton
  SelectCheckbox: typeof TableSelectCheckbox
  EditCell: typeof TableEditCell
  Empty: typeof TableEmpty
  Loading: typeof TableLoading
  ExpandedPanel: typeof TableExpandedPanel
}

// Attach sub-components
const TableCompound = Table as unknown as TableComponent
TableCompound.Header = TableHeader
TableCompound.Body = TableBody
TableCompound.Footer = TableFooter
TableCompound.Row = TableRow
TableCompound.Cell = TableCell
TableCompound.HeaderCell = TableHeaderCell
TableCompound.Pagination = TablePagination
TableCompound.Filter = TableFilter
TableCompound.GlobalFilter = TableGlobalFilter
TableCompound.SortIcon = TableSortIcon
TableCompound.ExpandButton = TableExpandButton
TableCompound.SelectCheckbox = TableSelectCheckbox
TableCompound.EditCell = TableEditCell
TableCompound.Empty = TableEmpty
TableCompound.Loading = TableLoading
TableCompound.ExpandedPanel = TableExpandedPanel

// Icon Components
const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

const ChevronUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
)

const ChevronLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
)

const ChevronsLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="11 17 6 12 11 7"></polyline>
    <polyline points="18 17 13 12 18 7"></polyline>
  </svg>
)

const ChevronsRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="13 17 18 12 13 7"></polyline>
    <polyline points="6 17 11 12 6 7"></polyline>
  </svg>
)

const Minus: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
)

const Search: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const X: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const Filter: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
)

const Loader2: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
)

export {
  TableCompound as Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHeaderCell,
  TablePagination,
  TableFilter,
  TableGlobalFilter,
  TableSortIcon,
  TableExpandButton,
  TableSelectCheckbox,
  TableEditCell,
  TableEmpty,
  TableLoading,
  TableExpandedPanel,
}
