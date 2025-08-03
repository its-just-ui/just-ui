import { createContext } from 'react'
import type { SelectOption } from './types'

export interface SelectContextValue {
  // State
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  value: SelectOption | SelectOption[] | null
  onChange: (value: SelectOption | SelectOption[] | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  highlightedIndex: number
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>

  // Options
  options: SelectOption[]
  filteredOptions: SelectOption[]

  // Configuration
  multiple: boolean
  disabled: boolean
  loading: boolean
  searchable: boolean
  clearable: boolean
  variant: string
  size: string
  status: string
  transition: string
  transitionDuration: number
  placement: string

  // Messages
  emptyMessage: string
  loadingMessage: string

  // Custom renders
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode
  renderValue?: (value: SelectOption | SelectOption[]) => React.ReactNode
  renderEmpty?: () => React.ReactNode

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

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onOpen?: () => void
  onClose?: () => void
  onSearch?: (query: string) => void
}

export const SelectContext = createContext<SelectContextValue | undefined>(undefined)
