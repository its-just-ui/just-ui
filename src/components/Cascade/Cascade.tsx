import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  createContext,
  useContext,
} from 'react'
import { cn } from '@/utils'
import type { CascadeOption, CascadeValue } from './types'

// Types and Interfaces
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
  levels: any[]
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
  onKeyDown?: (event: React.KeyboardEvent) => void
}

export interface CascadeBaseProps {
  // Core functionality
  options: CascadeOption[]
  value?: CascadeValue | CascadeValue[] | null
  onChange?: (value: CascadeValue | CascadeValue[] | null) => void
  defaultValue?: CascadeValue | CascadeValue[] | null
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  multiple?: boolean
  clearable?: boolean
  searchable?: boolean
  required?: boolean
  showPath?: boolean
  maxLevels?: number

  // Labels and messages
  label?: string
  helperText?: string
  errorMessage?: string
  emptyMessage?: string
  loadingMessage?: string

  // Styling variants
  variant?: 'default' | 'filled' | 'outlined' | 'ghost' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'

  // Animation and transitions
  transition?: 'none' | 'fade' | 'slide' | 'scale' | 'flip'
  transitionDuration?: number

  // Custom render functions
  renderOption?: (option: CascadeOption, isSelected: boolean, level: number) => React.ReactNode
  renderValue?: (value: CascadeValue | CascadeValue[]) => React.ReactNode
  renderEmpty?: () => React.ReactNode
  renderPath?: (path: CascadeValue[]) => React.ReactNode

  // Icons
  dropdownIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  loadingIcon?: React.ReactNode

  // Dropdown positioning
  placement?: 'top' | 'bottom'
  offset?: number
  maxHeight?: number

  // Border styles
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string

  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  placeholderColor?: string

  // Colors
  backgroundColor?: string
  hoverBackgroundColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string

  // Spacing
  padding?: string
  paddingX?: string
  paddingY?: string

  // Dropdown styles
  dropdownBackgroundColor?: string
  dropdownBorderColor?: string
  dropdownBorderWidth?: string
  dropdownBorderRadius?: string
  dropdownBoxShadow?: string
  dropdownZIndex?: string

  // Option styles
  optionPadding?: string
  optionHoverBackgroundColor?: string
  optionSelectedBackgroundColor?: string
  optionSelectedTextColor?: string
  optionDisabledOpacity?: string

  // Icon customization
  iconColor?: string
  clearIconColor?: string
  dropdownIconColor?: string
  loadingIconColor?: string
  pathSeparatorColor?: string
  pathSeparator?: string

  // Label styles
  labelFontSize?: string
  labelFontWeight?: string
  labelColor?: string
  labelMarginBottom?: string

  // Helper text styles
  helperTextFontSize?: string
  helperTextColor?: string
  helperTextMarginTop?: string

  // Required asterisk styles
  requiredColor?: string

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onOpen?: () => void
  onClose?: () => void
  onSearch?: (query: string) => void
  onLevelChange?: (level: number) => void
  onKeyDown?: (event: React.KeyboardEvent) => void

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
}

export interface CascadeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof CascadeBaseProps>,
    CascadeBaseProps {
  children?: React.ReactNode
}

export interface CascadeInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string
  dropdownIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  loadingIcon?: React.ReactNode
}

export interface CascadeDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number
  offset?: number
}

export interface CascadeOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  option: CascadeOption
  level: number
  index: number
}

export interface CascadeEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export interface CascadePathProps extends React.HTMLAttributes<HTMLDivElement> {
  path: CascadeValue[]
  separator?: string
}

// Context
const CascadeContext = createContext<CascadeContextValue | undefined>(undefined)

// Hook
export const useCascade = () => {
  const context = useContext(CascadeContext)
  if (!context) {
    throw new Error('useCascade must be used within a Cascade component')
  }
  return context
}

// Default icons
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.25"
    />
    <path d="m4.93 4.93 4.24 4.24" stroke="currentColor" strokeWidth="2" />
  </svg>
)

// Cascade Input Component
const CascadeInput = React.forwardRef<HTMLDivElement, CascadeInputProps>(
  ({ className, placeholder, dropdownIcon, clearIcon, loadingIcon, ...props }, ref) => {
    const {
      isOpen,
      setIsOpen,
      value,
      onChange,
      searchQuery,
      setSearchQuery,
      disabled,
      loading,
      clearable,
      searchable,
      placeholder: contextPlaceholder,
      renderValue,
      renderPath,
      showPath,
      onFocus,
      onBlur,
      onSearch,

      // Style props
      variant,
      size,
      status,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      backgroundColor,
      textColor,
      placeholderColor,
      boxShadow,
      padding,
      paddingX,
      paddingY,
      clearIconColor,
      dropdownIconColor,
      loadingIconColor,
    } = useCascade()

    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
      if (!disabled && !loading) {
        setIsOpen(!isOpen)
      }
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(null)
      setSearchQuery('')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (searchable) {
        setSearchQuery(e.target.value)
        onSearch?.(e.target.value)
      }
    }

    const handleFocus = () => {
      onFocus?.()
    }

    const handleBlur = () => {
      onBlur?.()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !isOpen) {
        setIsOpen(true)
      }
    }

    const renderDisplayValue = () => {
      if (!value) return null

      if (renderValue) {
        return renderValue(value)
      }

      if (Array.isArray(value)) {
        return value.map((v) => v.label).join(', ')
      }

      if (showPath && renderPath && Array.isArray(value)) {
        return renderPath(value)
      }

      return Array.isArray(value) ? value[0]?.label : value.label
    }

    const baseClasses = cn(
      'relative flex items-center justify-between w-full cursor-pointer',
      'transition-all duration-200 ease-in-out',
      {
        // Variants
        'bg-white border border-gray-300': variant === 'default',
        'bg-gray-50 border border-gray-300': variant === 'filled',
        'bg-transparent border border-gray-300': variant === 'outlined',
        'bg-transparent border-none': variant === 'ghost',
        'bg-transparent border-b border-gray-300 rounded-none': variant === 'underlined',

        // Sizes
        'text-sm px-3 py-2': size === 'sm',
        'text-base px-4 py-2.5': size === 'md',
        'text-lg px-4 py-3': size === 'lg',

        // Status
        'border-red-500': status === 'error',
        'border-yellow-500': status === 'warning',
        'border-green-500': status === 'success',

        // States
        'opacity-50 cursor-not-allowed': disabled,
        'hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20':
          !disabled,
        'ring-2 ring-blue-500/20 border-blue-500': isOpen && !disabled,
      }
    )

    const style: React.CSSProperties = {
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      backgroundColor,
      color: textColor,
      boxShadow,
      padding,
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        style={style}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        {...props}
      >
        <div className="flex-1 min-w-0">
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={placeholder || contextPlaceholder}
              className="w-full bg-transparent outline-none"
              style={{ color: textColor }}
              autoFocus
            />
          ) : (
            <div className="truncate" style={{ color: value ? textColor : placeholderColor }}>
              {renderDisplayValue() || placeholder || contextPlaceholder}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 ml-2">
          {loading && (
            <div className="animate-spin" style={{ color: loadingIconColor }}>
              {loadingIcon || <SpinnerIcon />}
            </div>
          )}

          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-100 rounded"
              style={{ color: clearIconColor }}
            >
              {clearIcon || <XIcon />}
            </button>
          )}

          <div
            className={cn('transition-transform duration-200', {
              'rotate-180': isOpen,
            })}
            style={{ color: dropdownIconColor }}
          >
            {dropdownIcon || <ChevronDownIcon />}
          </div>
        </div>
      </div>
    )
  }
)

CascadeInput.displayName = 'CascadeInput'

// Cascade Dropdown Component
const CascadeDropdown = React.forwardRef<HTMLDivElement, CascadeDropdownProps>(
  ({ className, maxHeight, offset, children, ...props }, ref) => {
    const {
      isOpen,
      placement,

      dropdownBackgroundColor,
      dropdownBorderColor,
      dropdownBorderWidth,
      dropdownBorderRadius,
      dropdownBoxShadow,
      dropdownZIndex,
    } = useCascade()

    if (!isOpen) return null

    const baseClasses = cn(
      'absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg',
      'transition-all duration-200 ease-in-out',
      {
        'top-full mt-1': placement === 'bottom',
        'bottom-full mb-1': placement === 'top',
      }
    )

    const style: React.CSSProperties = {
      backgroundColor: dropdownBackgroundColor,
      borderColor: dropdownBorderColor,
      borderWidth: dropdownBorderWidth,
      borderRadius: dropdownBorderRadius,
      boxShadow: dropdownBoxShadow,
      zIndex: dropdownZIndex,
      maxHeight,
      transform: `translateY(${offset || 0}px)`,
    }

    return (
      <div ref={ref} className={cn(baseClasses, className)} style={style} {...props}>
        {children}
      </div>
    )
  }
)

CascadeDropdown.displayName = 'CascadeDropdown'

// Cascade Option Component
const CascadeOptionComponent = React.forwardRef<HTMLDivElement, CascadeOptionProps>(
  ({ className, option, level, index, ...props }, ref) => {
    const {
      value,
      onChange,
      highlightedIndex,
      setHighlightedIndex,
      activeLevel,
      setActiveLevel,
      renderOption,
      optionPadding,

      optionSelectedBackgroundColor,
      optionSelectedTextColor,
      optionDisabledOpacity,
      onLevelChange,
    } = useCascade()

    const isSelected = Array.isArray(value)
      ? value.some((v) => v.value === option.value)
      : value?.value === option.value

    const isHighlighted = highlightedIndex === index && activeLevel === level
    const hasChildren = option.children && option.children.length > 0

    const handleClick = () => {
      if (option.disabled) return

      if (hasChildren) {
        setActiveLevel(level + 1)
        onLevelChange?.(level + 1)
      } else {
        const newValue: CascadeValue = {
          value: option.value,
          label: option.label,
          path: [option.value],
          level,
        }
        onChange(newValue)
      }
    }

    const handleMouseEnter = () => {
      setHighlightedIndex(index)
    }

    const baseClasses = cn(
      'flex items-center justify-between px-3 py-2 cursor-pointer',
      'transition-colors duration-150 ease-in-out',
      {
        'opacity-50 cursor-not-allowed': option.disabled,
        'hover:bg-gray-100': !option.disabled,
        'bg-blue-50 text-blue-700': isSelected,
        'bg-gray-100': isHighlighted,
      }
    )

    const style: React.CSSProperties = {
      padding: optionPadding,
      backgroundColor: isSelected ? optionSelectedBackgroundColor : undefined,
      color: isSelected ? optionSelectedTextColor : undefined,
      opacity: option.disabled ? optionDisabledOpacity : undefined,
    }

    if (renderOption) {
      return (
        <div
          ref={ref}
          className={cn(baseClasses, className)}
          style={style}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled}
          {...props}
        >
          {renderOption(option, isSelected, level)}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        role="option"
        aria-selected={isSelected}
        aria-disabled={option.disabled}
        {...props}
      >
        <div className="flex items-center gap-2">
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          <span className="flex-1">{option.label}</span>
          {option.description && (
            <span className="text-sm text-gray-500">{option.description}</span>
          )}
        </div>
        {hasChildren && <ChevronDownIcon />}
      </div>
    )
  }
)

CascadeOptionComponent.displayName = 'CascadeOption'

// Cascade Empty Component
const CascadeEmpty = React.forwardRef<HTMLDivElement, CascadeEmptyProps>(
  ({ className, children, ...props }, ref) => {
    const { emptyMessage, renderEmpty } = useCascade()

    const baseClasses = cn('px-3 py-2 text-sm text-gray-500 text-center')

    return (
      <div ref={ref} className={cn(baseClasses, className)} {...props}>
        {renderEmpty ? renderEmpty() : children || emptyMessage}
      </div>
    )
  }
)

CascadeEmpty.displayName = 'CascadeEmpty'

// Cascade Path Component
const CascadePath = React.forwardRef<HTMLDivElement, CascadePathProps>(
  ({ className, path, separator = ' / ', ...props }, ref) => {
    const { pathSeparatorColor, pathSeparator: contextSeparator } = useCascade()

    const baseClasses = cn('flex items-center gap-1 text-sm')

    const separatorToUse = contextSeparator || separator

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        style={{ color: pathSeparatorColor }}
        {...props}
      >
        {path.map((item, index) => (
          <React.Fragment key={item.value}>
            <span>{item.label}</span>
            {index < path.length - 1 && <span>{separatorToUse}</span>}
          </React.Fragment>
        ))}
      </div>
    )
  }
)

CascadePath.displayName = 'CascadePath'

// Main Cascade Component
const Cascade = React.forwardRef<HTMLDivElement, CascadeProps>(
  (
    {
      className,
      options,
      value,
      onChange,
      defaultValue,
      placeholder = 'Select options...',
      disabled = false,
      loading = false,
      multiple = false,
      clearable = false,
      searchable = false,
      required = false,
      showPath = false,
      maxLevels = 3,
      label,
      helperText,
      errorMessage,
      emptyMessage = 'No options available',
      loadingMessage = 'Loading...',
      variant = 'default',
      size = 'md',
      status = 'default',
      transition = 'fade',
      transitionDuration = 200,
      renderOption,
      renderValue,
      renderEmpty,
      renderPath,
      dropdownIcon,
      clearIcon,
      loadingIcon,
      placement = 'bottom',
      offset = 0,
      maxHeight = 300,
      onFocus,
      onBlur,
      onOpen,
      onClose,
      onSearch,
      onLevelChange,

      children,
      ...props
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [activeLevel, setActiveLevel] = useState(0)
    const [internalValue, setInternalValue] = useState<CascadeValue | CascadeValue[] | null>(
      value || defaultValue || null
    )

    const containerRef = useRef<HTMLDivElement>(null)

    // Update internal value when external value changes
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    // Handle open/close events
    useEffect(() => {
      if (isOpen) {
        onOpen?.()
      } else {
        onClose?.()
      }
    }, [isOpen, onOpen, onClose])

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const handleChange = useCallback(
      (newValue: CascadeValue | CascadeValue[] | null) => {
        setInternalValue(newValue)
        onChange?.(newValue)
      },
      [onChange]
    )

    const handleSearch = useCallback(
      (query: string) => {
        setSearchQuery(query)
        onSearch?.(query)
      },
      [onSearch]
    )

    const handleLevelChange = useCallback(
      (level: number) => {
        setActiveLevel(level)
        onLevelChange?.(level)
      },
      [onLevelChange]
    )

    // Get current level options
    const getOptionsForLevel = useCallback(
      (level: number, selectedPath: (string | number)[] = []): CascadeOption[] => {
        if (level === 0) return options

        let currentOptions = options
        for (let i = 0; i < level && i < selectedPath.length; i++) {
          const pathValue = selectedPath[i]
          const option = currentOptions.find((opt) => opt.value === pathValue)
          if (!option || !option.children) return []
          currentOptions = option.children
        }

        return currentOptions
      },
      [options]
    )

    const currentLevelOptions = useMemo(() => {
      const selectedPath = Array.isArray(internalValue)
        ? internalValue[0]?.path || []
        : internalValue?.path || []

      return getOptionsForLevel(activeLevel, selectedPath)
    }, [activeLevel, internalValue, getOptionsForLevel])

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return currentLevelOptions

      return currentLevelOptions.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [currentLevelOptions, searchQuery])

    const contextValue = useMemo(
      () => ({
        // State
        isOpen,
        setIsOpen,
        value: internalValue,
        onChange: handleChange,
        searchQuery,
        setSearchQuery: handleSearch,
        highlightedIndex,
        setHighlightedIndex,
        activeLevel,
        setActiveLevel: handleLevelChange,

        // Options and levels
        options,
        levels: [],
        filteredOptions,

        // Configuration
        multiple,
        disabled,
        loading,
        searchable,
        clearable,
        showPath,
        maxLevels,
        variant,
        size,
        status,
        transition,
        transitionDuration,
        placement,

        // Messages
        emptyMessage,
        loadingMessage,
        placeholder,

        // Custom renders
        renderOption,
        renderValue,
        renderEmpty,
        renderPath,

        // Style props
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        borderStyle: props.borderStyle,
        borderRadius: props.borderRadius,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
        placeholderColor: props.placeholderColor,
        focusRingColor: props.focusRingColor,
        focusRingWidth: props.focusRingWidth,
        focusRingOffset: props.focusRingOffset,
        focusBorderColor: props.focusBorderColor,
        focusBackgroundColor: props.focusBackgroundColor,
        boxShadow: props.boxShadow,
        focusBoxShadow: props.focusBoxShadow,
        padding: props.padding,
        paddingX: props.paddingX,
        paddingY: props.paddingY,
        dropdownBackgroundColor: props.dropdownBackgroundColor,
        dropdownBorderColor: props.dropdownBorderColor,
        dropdownBorderWidth: props.dropdownBorderWidth,
        dropdownBorderRadius: props.dropdownBorderRadius,
        dropdownBoxShadow: props.dropdownBoxShadow,
        dropdownZIndex: props.dropdownZIndex,
        optionPadding: props.optionPadding,
        optionHoverBackgroundColor: props.optionHoverBackgroundColor,
        optionSelectedBackgroundColor: props.optionSelectedBackgroundColor,
        optionSelectedTextColor: props.optionSelectedTextColor,
        optionDisabledOpacity: props.optionDisabledOpacity,
        iconColor: props.iconColor,
        clearIconColor: props.clearIconColor,
        dropdownIconColor: props.dropdownIconColor,
        loadingIconColor: props.loadingIconColor,
        pathSeparatorColor: props.pathSeparatorColor,
        pathSeparator: props.pathSeparator,

        // Event handlers
        onFocus,
        onBlur,
        onOpen,
        onClose,
        onSearch: handleSearch,
        onLevelChange: handleLevelChange,
      }),
      [
        isOpen,
        internalValue,
        handleChange,
        searchQuery,
        handleSearch,
        highlightedIndex,
        activeLevel,
        handleLevelChange,
        options,
        filteredOptions,
        multiple,
        disabled,
        loading,
        searchable,
        clearable,
        showPath,
        maxLevels,
        variant,
        size,
        status,
        transition,
        transitionDuration,
        placement,
        emptyMessage,
        loadingMessage,
        placeholder,
        renderOption,
        renderValue,
        renderEmpty,
        renderPath,
        onFocus,
        onBlur,
        onOpen,
        onClose,
        onLevelChange,
        props,
      ]
    )

    const baseClasses = cn('relative w-full', {
      'opacity-50 pointer-events-none': disabled,
    })

    return (
      <CascadeContext.Provider value={contextValue}>
        <div ref={containerRef} className={cn(baseClasses, className)} {...props}>
          {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          <CascadeInput
            placeholder={placeholder}
            dropdownIcon={dropdownIcon}
            clearIcon={clearIcon}
            loadingIcon={loadingIcon}
          />

          <CascadeDropdown maxHeight={maxHeight} offset={offset}>
            {loading ? (
              <CascadeEmpty>{loadingMessage}</CascadeEmpty>
            ) : filteredOptions.length === 0 ? (
              <CascadeEmpty>{emptyMessage}</CascadeEmpty>
            ) : (
              <div className="py-1">
                {filteredOptions.map((option, index) => (
                  <CascadeOptionComponent
                    key={option.value}
                    option={option}
                    level={activeLevel}
                    index={index}
                  />
                ))}
              </div>
            )}
          </CascadeDropdown>

          {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}

          {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}

          {children}
        </div>
      </CascadeContext.Provider>
    )
  }
)

Cascade.displayName = 'Cascade'

// Compound component pattern
interface CascadeComponent
  extends React.ForwardRefExoticComponent<CascadeProps & React.RefAttributes<HTMLDivElement>> {
  Input: typeof CascadeInput
  Dropdown: typeof CascadeDropdown
  Option: typeof CascadeOptionComponent
  Empty: typeof CascadeEmpty
  Path: typeof CascadePath
}

const CascadeComponent = Cascade as CascadeComponent
CascadeComponent.Input = CascadeInput
CascadeComponent.Dropdown = CascadeDropdown
CascadeComponent.Option = CascadeOptionComponent
CascadeComponent.Empty = CascadeEmpty
CascadeComponent.Path = CascadePath

export { CascadeComponent as Cascade }
