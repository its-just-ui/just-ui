export interface CascadeOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
  children?: CascadeOption[]
  [key: string]: unknown
}

export interface CascadeValue {
  value: string | number
  label: string
  path: (string | number)[]
  level: number
}

export interface CascadeLevel {
  options: CascadeOption[]
  selectedOption?: CascadeOption
  level: number
}

export interface CascadeContextValue {
  // State
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  value: CascadeValue | CascadeValue[] | null
  onChange: (value: CascadeValue | CascadeValue[] | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  highlightedIndex: number
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  activeLevel: number
  setActiveLevel: (level: number) => void

  // Options and levels
  options: CascadeOption[]
  levels: CascadeLevel[]
  filteredOptions: CascadeOption[]

  // Configuration
  multiple: boolean
  disabled: boolean
  loading: boolean
  searchable: boolean
  clearable: boolean
  showPath: boolean
  maxLevels: number
  variant: string
  size: string
  status: string
  transition: string
  transitionDuration: number
  placement: string

  // Messages
  emptyMessage: string
  loadingMessage: string
  placeholder: string

  // Custom renders
  renderOption?: (option: CascadeOption, isSelected: boolean, level: number) => React.ReactNode
  renderValue?: (value: CascadeValue | CascadeValue[]) => React.ReactNode
  renderEmpty?: () => React.ReactNode
  renderPath?: (path: CascadeValue[]) => React.ReactNode

  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  backgroundColor?: string
  textColor?: string
  placeholderColor?: string
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
  dropdownBackgroundColor?: string
  dropdownBorderColor?: string
  dropdownBorderWidth?: string
  dropdownBorderRadius?: string
  dropdownBoxShadow?: string
  dropdownZIndex?: string
  optionPadding?: string
  optionHoverBackgroundColor?: string
  optionSelectedBackgroundColor?: string
  optionSelectedTextColor?: string
  optionDisabledOpacity?: string
  iconColor?: string
  clearIconColor?: string
  dropdownIconColor?: string
  loadingIconColor?: string
  pathSeparatorColor?: string
  pathSeparator?: string

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onOpen?: () => void
  onClose?: () => void
  onSearch?: (query: string) => void
  onLevelChange?: (level: number) => void
}
