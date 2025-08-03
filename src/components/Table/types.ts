import { ReactNode, CSSProperties, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

// Base types
export type TableVariant = 'default' | 'striped' | 'bordered' | 'minimal' | 'card-style' | 'compact'
export type TableSize = 'sm' | 'md' | 'lg'
export type TableStatus = 'default' | 'success' | 'warning' | 'error' | 'info'
export type SortDirection = 'asc' | 'desc' | null
export type SelectionMode = 'none' | 'single' | 'multiple'
export type EditMode = 'none' | 'cell' | 'row' | 'inline'
export type FilterMatchMode =
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'equals'
  | 'notEquals'
  | 'custom'
export type PaginationMode = 'client' | 'server'
export type AnimationType = 'fade' | 'slide' | 'scale' | 'none'

// Column definition
export interface ColumnDef<TData = any> {
  id: string
  accessorKey?: keyof TData | string
  accessorFn?: (row: TData) => any
  header?: string | ((props: { column: ColumnDef<TData> }) => ReactNode)
  cell?: (props: {
    value: any
    row: TData
    column: ColumnDef<TData>
    rowIndex: number
  }) => ReactNode
  footer?: string | ((props: { column: ColumnDef<TData> }) => ReactNode)
  width?: number | string
  minWidth?: number
  maxWidth?: number
  sortable?: boolean
  sortingFn?: (rowA: TData, rowB: TData, columnId: string) => number
  filterable?: boolean
  filterFn?: (row: TData, columnId: string, filterValue: any) => boolean
  editable?: boolean
  editComponent?: (props: {
    value: any
    row: TData
    column: ColumnDef<TData>
    onSave: (value: any) => void
    onCancel: () => void
  }) => ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
  headerClassName?: string
  cellClassName?: string | ((props: { row: TData; value: any }) => string)
  footerClassName?: string
  sticky?: 'left' | 'right'
  hidden?: boolean
  group?: string
  meta?: Record<string, any>
}

// Sort descriptor
export interface SortDescriptor {
  columnId: string
  direction: SortDirection
}

// Filter descriptor
export interface FilterDescriptor {
  columnId: string
  value: any
  matchMode?: FilterMatchMode
}

// Selection model
export type SelectionModel = Set<string | number>

// Pagination state
export interface PaginationState {
  pageIndex: number
  pageSize: number
}

// Expanded state
export type ExpandedState = Set<string | number>

// Editing state
export interface EditingState {
  rowId: string | number
  columnId: string
  value: any
}

// Group definition
export interface GroupDef<TData = any> {
  columnId: string
  aggregationFn?: (rows: TData[]) => any
  header?: (props: { group: GroupDef<TData>; rows: TData[]; value: any }) => ReactNode
}

// Row data shape
export interface RowData {
  id: string | number
  [key: string]: any
}

// Table base props
export interface TableBaseProps<TData extends RowData = RowData> {
  // Data
  data: TData[]
  columns: ColumnDef<TData>[]
  getRowId?: (row: TData, index: number) => string | number

  // Variants & Styling
  variant?: TableVariant
  size?: TableSize

  // States
  loading?: boolean
  loadingComponent?: ReactNode
  empty?: boolean
  emptyComponent?: ReactNode
  disabled?: boolean

  // Selection
  selectionMode?: SelectionMode
  selectedRows?: SelectionModel
  defaultSelectedRows?: SelectionModel
  onSelectionChange?: (selection: SelectionModel) => void
  isRowSelectable?: (row: TData) => boolean

  // Sorting
  enableSorting?: boolean
  sort?: SortDescriptor[]
  defaultSort?: SortDescriptor[]
  onSortChange?: (sort: SortDescriptor[]) => void
  enableMultiSort?: boolean
  maxMultiSortColCount?: number

  // Filtering
  enableFiltering?: boolean
  filters?: FilterDescriptor[]
  defaultFilters?: FilterDescriptor[]
  onFiltersChange?: (filters: FilterDescriptor[]) => void
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void

  // Pagination
  enablePagination?: boolean
  paginationMode?: PaginationMode
  pagination?: PaginationState
  defaultPagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  totalCount?: number
  pageSizeOptions?: number[]

  // Expansion
  enableExpanding?: boolean
  expandedRows?: ExpandedState
  defaultExpandedRows?: ExpandedState
  onExpandedChange?: (expanded: ExpandedState) => void
  expandedContent?: (props: { row: TData; rowIndex: number }) => ReactNode

  // Editing
  editMode?: EditMode
  editingCell?: EditingState | null
  onEditingCellChange?: (editing: EditingState | null) => void
  onEditCommit?: (
    rowId: string | number,
    columnId: string,
    value: any,
    row: TData
  ) => void | Promise<void>
  onEditCancel?: (rowId: string | number, columnId: string) => void

  // Grouping
  enableGrouping?: boolean
  groupBy?: string[]
  groups?: GroupDef<TData>[]

  // Virtualization
  enableVirtualization?: boolean
  virtualizer?: unknown // Virtualization library instance

  // Features
  enableColumnResizing?: boolean
  enableColumnReordering?: boolean
  enableRowReordering?: boolean
  stickyHeader?: boolean
  stickyColumns?: boolean

  // Handlers
  onRowClick?: (row: TData, rowIndex: number, event: React.MouseEvent) => void
  onRowDoubleClick?: (row: TData, rowIndex: number, event: React.MouseEvent) => void
  onCellClick?: (
    row: TData,
    column: ColumnDef<TData>,
    rowIndex: number,
    event: React.MouseEvent
  ) => void
  onCellDoubleClick?: (
    row: TData,
    column: ColumnDef<TData>,
    rowIndex: number,
    event: React.MouseEvent
  ) => void

  // Custom renderers
  rowRenderer?: (props: { row: TData; rowIndex: number; children: ReactNode }) => ReactNode
  noDataRenderer?: () => ReactNode
  loadingRenderer?: () => ReactNode

  // Animation
  animationType?: AnimationType
  animationDuration?: number

  // Style customization props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  headerTextColor?: string
  backgroundColor?: string
  headerBackgroundColor?: string
  footerBackgroundColor?: string
  rowHoverBackground?: string
  rowSelectedBackground?: string
  alternateRowBackground?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  focusBoxShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  headerPadding?: string
  cellPadding?: string
  footerPadding?: string

  // Sub-component style overrides
  headerStyle?: CSSProperties
  headerClassName?: string
  bodyStyle?: CSSProperties
  bodyClassName?: string
  footerStyle?: CSSProperties
  footerClassName?: string
  rowStyle?: CSSProperties | ((row: TData, rowIndex: number) => CSSProperties)
  rowClassName?: string | ((row: TData, rowIndex: number) => string)
  cellStyle?: CSSProperties | ((row: TData, column: ColumnDef<TData>) => CSSProperties)
  cellClassName?: string | ((row: TData, column: ColumnDef<TData>) => string)

  // Icon customization
  sortAscIcon?: ReactNode
  sortDescIcon?: ReactNode
  sortNeutralIcon?: ReactNode
  expandIcon?: ReactNode
  collapseIcon?: ReactNode
  selectIcon?: ReactNode
  selectAllIcon?: ReactNode
  filterIcon?: ReactNode
  clearFilterIcon?: ReactNode

  // Accessibility
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  captionComponent?: ReactNode
}

// Table context value
export interface TableContextValue<TData extends RowData = RowData> {
  // Data & columns
  data: TData[]
  columns: ColumnDef<TData>[]
  getRowId: (row: TData, index: number) => string | number

  // Variants & styling
  variant: TableVariant
  size: TableSize

  // States
  loading: boolean
  empty: boolean
  disabled: boolean

  // Selection
  selectionMode: SelectionMode
  selectedRows: SelectionModel
  setSelectedRows: (selection: SelectionModel | ((prev: SelectionModel) => SelectionModel)) => void
  isRowSelectable?: (row: TData) => boolean
  toggleRowSelection: (rowId: string | number) => void
  toggleAllRowsSelection: () => void

  // Sorting
  enableSorting: boolean
  sort: SortDescriptor[]
  setSort: (sort: SortDescriptor[] | ((prev: SortDescriptor[]) => SortDescriptor[])) => void
  toggleSort: (columnId: string, multiSort?: boolean) => void

  // Filtering
  enableFiltering: boolean
  filters: FilterDescriptor[]
  setFilters: (
    filters: FilterDescriptor[] | ((prev: FilterDescriptor[]) => FilterDescriptor[])
  ) => void
  globalFilter: string
  setGlobalFilter: (value: string) => void

  // Pagination
  enablePagination: boolean
  paginationMode: PaginationMode
  pagination: PaginationState
  setPagination: (
    pagination: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void
  totalCount: number
  pageSizeOptions: number[]
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean

  // Expansion
  enableExpanding: boolean
  expandedRows: ExpandedState
  setExpandedRows: (expanded: ExpandedState | ((prev: ExpandedState) => ExpandedState)) => void
  toggleRowExpansion: (rowId: string | number) => void
  expandedContent?: (props: { row: TData; rowIndex: number }) => ReactNode

  // Editing
  editMode: EditMode
  editingCell: EditingState | null
  setEditingCell: (editing: EditingState | null) => void
  startEditing: (rowId: string | number, columnId: string) => void
  commitEdit: (value: any) => void
  cancelEdit: () => void

  // Grouping
  enableGrouping: boolean
  groupBy: string[]
  groups: GroupDef<TData>[]

  // Processed data
  processedData: TData[]
  paginatedData: TData[]

  // Animation
  animationType: AnimationType
  animationDuration: number

  // All style props
  styles: Record<string, any>

  // Icon components
  icons: {
    sortAsc?: ReactNode
    sortDesc?: ReactNode
    sortNeutral?: ReactNode
    expand?: ReactNode
    collapse?: ReactNode
    select?: ReactNode
    selectAll?: ReactNode
    filter?: ReactNode
    clearFilter?: ReactNode
  }

  // Additional props from TableBaseProps
  headerStyle?: CSSProperties
  bodyStyle?: CSSProperties
  footerStyle?: CSSProperties
  rowStyle?: CSSProperties | ((row: TData, rowIndex: number) => CSSProperties)
  rowClassName?: string | ((row: TData, rowIndex: number) => string)
  cellStyle?: CSSProperties | ((row: TData, column: ColumnDef<TData>) => CSSProperties)
  cellClassName?: string | ((row: TData, column: ColumnDef<TData>) => string)
  stickyHeader?: boolean
  rowRenderer?: (props: { row: TData; rowIndex: number; children: ReactNode }) => ReactNode
  onRowClick?: (row: TData, rowIndex: number, event: React.MouseEvent) => void
  onRowDoubleClick?: (row: TData, rowIndex: number, event: React.MouseEvent) => void
  onCellClick?: (
    row: TData,
    column: ColumnDef<TData>,
    rowIndex: number,
    event: React.MouseEvent
  ) => void
  onCellDoubleClick?: (
    row: TData,
    column: ColumnDef<TData>,
    rowIndex: number,
    event: React.MouseEvent
  ) => void
}

// Component prop interfaces
export interface TableProps<TData extends RowData = RowData>
  extends Omit<HTMLAttributes<HTMLTableElement>, 'onSelect' | 'onChange'>,
    TableBaseProps<TData> {}

export type TableHeaderProps = ThHTMLAttributes<HTMLTableSectionElement>

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  status?: TableStatus
  selected?: boolean
  expanded?: boolean
  disabled?: boolean
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  status?: TableStatus
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sorted?: SortDirection
  sortable?: boolean
  resizable?: boolean
  reorderable?: boolean
}

export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement> {
  showPageSizeSelector?: boolean
  showPageNumbers?: boolean
  showTotalCount?: boolean
  compact?: boolean
}

export interface TableFilterProps extends HTMLAttributes<HTMLDivElement> {
  column: ColumnDef<any>
  value: any
  onChange: (value: any) => void
  matchMode?: FilterMatchMode
  placeholder?: string
}

export interface TableGlobalFilterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export interface TableSortIconProps extends HTMLAttributes<HTMLSpanElement> {
  direction: SortDirection
}

export interface TableExpandButtonProps extends HTMLAttributes<HTMLButtonElement> {
  expanded: boolean
  onToggle: () => void
}

export interface TableSelectCheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean
  indeterminate?: boolean
  onChange: () => void
  disabled?: boolean
}

export interface TableEditCellProps<TData = any> {
  value: any
  row: TData
  column: ColumnDef<TData>
  onSave: (value: any) => void
  onCancel: () => void
}

export interface TableEmptyProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
  action?: ReactNode
  illustration?: ReactNode
}

export interface TableLoadingProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
  showSkeleton?: boolean
  skeletonRows?: number
}

export interface TableExpandedPanelProps extends HTMLAttributes<HTMLTableRowElement> {
  colSpan: number
}
