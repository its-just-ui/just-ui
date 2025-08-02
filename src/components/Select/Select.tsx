import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react'
import { cn } from '@/utils'

// Main option interface - exported first to ensure visibility
export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
  icon?: React.ReactNode
  description?: string
  [key: string]: unknown
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  // Core functionality
  options: SelectOption[]
  value?: SelectOption | SelectOption[] | null
  onChange?: (value: SelectOption | SelectOption[] | null) => void
  defaultValue?: SelectOption | SelectOption[] | null
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  multiple?: boolean
  clearable?: boolean
  searchable?: boolean
  required?: boolean

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
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode
  renderValue?: (value: SelectOption | SelectOption[]) => React.ReactNode
  renderEmpty?: () => React.ReactNode

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
  onKeyDown?: (event: React.KeyboardEvent) => void

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
}

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

const SelectContext = createContext<SelectContextValue | undefined>(undefined)

export const useSelect = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('useSelect must be used within a Select component')
  }
  return context
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options,
      value,
      onChange,
      defaultValue,
      placeholder = 'Select...',
      disabled = false,
      loading = false,
      multiple = false,
      clearable = true,
      searchable = false,
      required = false,
      label,
      helperText,
      errorMessage,
      emptyMessage = 'No options found',
      loadingMessage = 'Loading...',
      variant = 'default',
      size = 'md',
      status = 'default',
      transition = 'scale',
      transitionDuration = 200,
      renderOption,
      renderValue,
      renderEmpty,
      dropdownIcon,
      clearIcon,
      loadingIcon,
      placement = 'bottom',
      offset = 4,
      maxHeight = 300,
      // Style props
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
      dropdownBackgroundColor,
      dropdownBorderColor,
      dropdownBorderWidth,
      dropdownBorderRadius,
      dropdownBoxShadow,
      dropdownZIndex,
      optionPadding,
      optionHoverBackgroundColor,
      optionSelectedBackgroundColor,
      optionSelectedTextColor,
      optionDisabledOpacity,
      iconColor,
      clearIconColor,
      dropdownIconColor,
      loadingIconColor,
      labelFontSize,
      labelFontWeight,
      labelColor,
      labelMarginBottom,
      helperTextFontSize,
      helperTextColor,
      helperTextMarginTop,
      requiredColor,
      // Event handlers
      onFocus,
      onBlur,
      onOpen,
      onClose,
      onSearch,
      onKeyDown,
      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<SelectOption | SelectOption[] | null>(
      defaultValue || (multiple ? [] : null)
    )
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = useCallback(
      (newValue: SelectOption | SelectOption[] | null) => {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [isControlled, onChange]
    )

    const handleOpen = useCallback(() => {
      if (!disabled && !loading) {
        setIsOpen(true)
        onOpen?.()
      }
    }, [disabled, loading, onOpen])

    const handleClose = useCallback(() => {
      setIsOpen(false)
      setSearchQuery('')
      setHighlightedIndex(-1)
      onClose?.()
    }, [onClose])

    const handleSearch = useCallback(
      (query: string) => {
        setSearchQuery(query)
        onSearch?.(query)
      },
      [onSearch]
    )

    const filteredOptions = useMemo(() => {
      if (!searchable || !searchQuery) return options

      return options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [options, searchQuery, searchable])

    const contextValue: SelectContextValue = {
      isOpen,
      setIsOpen: (open: boolean) => (open ? handleOpen() : handleClose()),
      value: currentValue,
      onChange: handleChange,
      searchQuery,
      setSearchQuery: handleSearch,
      highlightedIndex,
      setHighlightedIndex,
      options,
      filteredOptions,
      multiple,
      disabled,
      loading,
      searchable,
      clearable,
      variant,
      size,
      status,
      transition,
      transitionDuration,
      placement,
      emptyMessage,
      loadingMessage,
      renderOption,
      renderValue,
      renderEmpty,
      // Style props
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
      dropdownBackgroundColor,
      dropdownBorderColor,
      dropdownBorderWidth,
      dropdownBorderRadius,
      dropdownBoxShadow,
      dropdownZIndex,
      optionPadding,
      optionHoverBackgroundColor,
      optionSelectedBackgroundColor,
      optionSelectedTextColor,
      optionDisabledOpacity,
      iconColor,
      clearIconColor,
      dropdownIconColor,
      loadingIconColor,
      onFocus,
      onBlur,
      onOpen,
      onClose,
      onSearch,
    }

    const baseStyles = 'relative w-full'
    const hasError = status === 'error' || Boolean(errorMessage)

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // Keyboard navigation logic inline since it needs to access context values
        if (!isOpen) {
          if (
            event.key === 'Enter' ||
            event.key === ' ' ||
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp'
          ) {
            event.preventDefault()
            setIsOpen(true)
            setHighlightedIndex(0)
          }
          onKeyDown?.(event)
          return
        }

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
            break
          case 'ArrowUp':
            event.preventDefault()
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
            break
          case 'Enter':
            event.preventDefault()
            if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
              const option = filteredOptions[highlightedIndex]
              if (!option.disabled) {
                if (multiple && Array.isArray(currentValue)) {
                  const isSelected = currentValue.some((v) => v.value === option.value)
                  if (isSelected) {
                    handleChange(currentValue.filter((v) => v.value !== option.value))
                  } else {
                    handleChange([...currentValue, option])
                  }
                } else {
                  handleChange(option)
                  setIsOpen(false)
                }
              }
            }
            break
          case 'Escape':
            event.preventDefault()
            setIsOpen(false)
            break
          case 'Home':
            event.preventDefault()
            setHighlightedIndex(0)
            break
          case 'End':
            event.preventDefault()
            setHighlightedIndex(filteredOptions.length - 1)
            break
          case 'Tab':
            setIsOpen(false)
            break
          default:
            break
        }
        onKeyDown?.(event)
      },
      [
        isOpen,
        setIsOpen,
        filteredOptions,
        highlightedIndex,
        setHighlightedIndex,
        currentValue,
        handleChange,
        multiple,
        onKeyDown,
      ]
    )

    return (
      <SelectContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(baseStyles, className)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={ariaInvalid || hasError}
          aria-required={ariaRequired || required}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          {label && (
            <label
              className={cn(
                'block mb-1.5 font-medium leading-tight',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                hasError && 'text-red-600',
                disabled && 'opacity-50'
              )}
              style={{
                fontSize: labelFontSize,
                fontWeight: labelFontWeight,
                color: labelColor,
                marginBottom: labelMarginBottom,
              }}
            >
              {label}
              {required && (
                <span className="text-red-500 ml-1" style={{ color: requiredColor }}>
                  *
                </span>
              )}
            </label>
          )}
          {children || (
            <>
              <SelectInput
                placeholder={placeholder}
                dropdownIcon={dropdownIcon}
                clearIcon={clearIcon}
                loadingIcon={loadingIcon}
              />
              <SelectDropdown maxHeight={maxHeight} offset={offset} />
            </>
          )}
          {(helperText || errorMessage) && (
            <p
              className={cn(
                'mt-1.5 leading-tight',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base',
                hasError ? 'text-red-600' : 'text-gray-500'
              )}
              style={{
                fontSize: helperTextFontSize,
                color: helperTextColor,
                marginTop: helperTextMarginTop,
              }}
            >
              {errorMessage || helperText}
            </p>
          )}
        </div>
      </SelectContext.Provider>
    )
  }
)

Select.displayName = 'Select'

export interface SelectInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string
  dropdownIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  loadingIcon?: React.ReactNode
}

const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  ({ className, placeholder, dropdownIcon, clearIcon, loadingIcon, ...props }, ref) => {
    const {
      isOpen,
      setIsOpen,
      value,
      onChange,
      searchQuery,
      setSearchQuery,
      highlightedIndex,
      multiple,
      disabled,
      loading,
      searchable,
      clearable,
      variant,
      size,
      status,
      renderValue,
      // Style props
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
      iconColor,
      clearIconColor,
      dropdownIconColor,
      loadingIconColor,
      onFocus,
      onBlur,
    } = useSelect()

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
      if (!disabled && !loading) {
        setIsOpen(!isOpen)
        if (searchable) {
          inputRef.current?.focus()
        }
      }
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(multiple ? [] : null)
      setSearchQuery('')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
      if (!isOpen) {
        setIsOpen(true)
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
      onFocus?.()
    }

    const handleBlur = () => {
      setIsFocused(false)
      onBlur?.()
    }

    const displayValue = useMemo(() => {
      if (searchable && searchQuery && isOpen) return searchQuery
      if (!value) return ''

      if (renderValue) {
        return renderValue(value)
      }

      if (Array.isArray(value)) {
        if (value.length === 0) return ''
        if (value.length === 1) return value[0].label
        return `${value.length} selected`
      }

      return value.label
    }, [value, searchQuery, searchable, isOpen, renderValue])

    const baseStyles =
      'w-full pr-10 transition-all focus:outline-none cursor-pointer flex items-center'

    const variants = {
      default: cn(
        'border rounded-md bg-white',
        status === 'error'
          ? 'border-red-500 focus-within:ring-red-500'
          : 'border-gray-300 focus-within:ring-primary-600',
        'focus-within:ring-2 focus-within:ring-offset-2'
      ),
      filled: cn(
        'border-0 rounded-md',
        status === 'error'
          ? 'bg-red-50 focus-within:bg-red-100'
          : 'bg-gray-100 focus-within:bg-gray-200'
      ),
      outlined: cn(
        'border-2 rounded-md bg-transparent',
        status === 'error'
          ? 'border-red-500 focus-within:border-red-600'
          : 'border-gray-300 focus-within:border-primary-600'
      ),
      ghost: cn(
        'border-0 bg-transparent',
        'focus-within:ring-2 focus-within:ring-offset-2',
        status === 'error' ? 'focus-within:ring-red-500' : 'focus-within:ring-primary-600'
      ),
      underlined: cn(
        'border-0 border-b-2 rounded-none bg-transparent px-0',
        status === 'error'
          ? 'border-red-500 focus-within:border-red-600'
          : 'border-gray-300 focus-within:border-primary-600'
      ),
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm leading-8',
      md: 'h-10 px-4 text-base leading-10',
      lg: 'h-12 px-5 text-lg leading-12',
    }

    const customStyles: React.CSSProperties = {}

    // Apply custom styles
    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderColor) customStyles.borderColor = borderColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderRadius) customStyles.borderRadius = borderRadius
    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight
    if (fontFamily) customStyles.fontFamily = fontFamily
    if (textColor) customStyles.color = textColor
    if (backgroundColor) customStyles.backgroundColor = backgroundColor
    if (boxShadow) customStyles.boxShadow = boxShadow
    if (padding) customStyles.padding = padding
    if (paddingX) {
      customStyles.paddingLeft = paddingX
      customStyles.paddingRight = paddingX
    }
    if (paddingY) {
      customStyles.paddingTop = paddingY
      customStyles.paddingBottom = paddingY
    }

    // Focus styles
    const focusStyles = {
      ...(isFocused && focusBorderColor && { borderColor: focusBorderColor }),
      ...(isFocused && focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
      ...(isFocused && focusBoxShadow && { boxShadow: focusBoxShadow }),
      ...(isFocused &&
        focusRingColor &&
        focusRingWidth && {
          boxShadow: `0 0 0 ${focusRingWidth} ${focusRingColor}${focusRingOffset ? `, 0 0 0 calc(${focusRingWidth} + ${focusRingOffset}) transparent` : ''}`,
        }),
    }

    const defaultDropdownIcon = (
      <svg
        className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )

    const defaultClearIcon = (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )

    const defaultLoadingIcon = (
      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          disabled && 'cursor-not-allowed opacity-50',
          'relative',
          className
        )}
        style={{
          ...customStyles,
          ...focusStyles,
          ...(placeholderColor &&
            ({
              '--placeholder-color': placeholderColor,
            } as React.CSSProperties)),
        }}
        onClick={handleClick}
        {...props}
      >
        {searchable ? (
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 outline-none placeholder:text-gray-400 h-full flex items-center"
            placeholder={!value ? placeholder : ''}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            readOnly={!isOpen}
            aria-autocomplete="list"
            aria-activedescendant={
              highlightedIndex >= 0 ? `select-option-${highlightedIndex}` : undefined
            }
            role="combobox"
          />
        ) : (
          <span
            className={cn('truncate flex items-center h-full', !value && 'text-gray-400')}
            role="combobox"
            aria-readonly="true"
          >
            {displayValue || placeholder}
          </span>
        )}

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1.5">
          {loading && (
            <span className="text-gray-400" style={{ color: loadingIconColor || iconColor }}>
              {loadingIcon || defaultLoadingIcon}
            </span>
          )}
          {clearable && value && !loading && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              style={{ color: clearIconColor || iconColor }}
              onClick={handleClear}
              disabled={disabled}
            >
              {clearIcon || defaultClearIcon}
            </button>
          )}
          <span
            className="text-gray-400 pointer-events-none"
            style={{ color: dropdownIconColor || iconColor }}
          >
            {dropdownIcon || defaultDropdownIcon}
          </span>
        </div>
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'

export interface SelectDropdownProps extends React.HTMLAttributes<HTMLUListElement> {
  maxHeight?: number
  offset?: number
}

const SelectDropdown = React.forwardRef<HTMLUListElement, SelectDropdownProps>(
  ({ className, maxHeight = 300, offset = 4, children, ...props }, _ref) => {
    const {
      isOpen,
      filteredOptions,
      loading,
      transition,
      transitionDuration,
      placement,
      emptyMessage,
      loadingMessage,
      renderEmpty,
      multiple,
      // Dropdown style props
      dropdownBackgroundColor,
      dropdownBorderColor,
      dropdownBorderWidth,
      dropdownBorderRadius,
      dropdownBoxShadow,
      dropdownZIndex,
    } = useSelect()

    const listRef = useRef<HTMLUListElement>(null)

    if (!isOpen) return null

    const baseStyles = cn(
      'absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-auto',
      placement === 'top' && 'bottom-full mb-1 mt-0'
    )

    const transitions = {
      none: '',
      fade: cn(
        'transition-opacity',
        `duration-${transitionDuration}`,
        isOpen ? 'opacity-100' : 'opacity-0'
      ),
      slide: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      ),
      scale: cn(
        'transition-all origin-top',
        `duration-${transitionDuration}`,
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ),
      flip: cn(
        'transition-all origin-top',
        `duration-${transitionDuration}`,
        isOpen ? 'rotateX-0 opacity-100' : 'rotateX-90 opacity-0'
      ),
    }

    const customDropdownStyles: React.CSSProperties = {
      maxHeight,
      marginTop: offset,
    }

    if (dropdownBackgroundColor) customDropdownStyles.backgroundColor = dropdownBackgroundColor
    if (dropdownBorderColor) customDropdownStyles.borderColor = dropdownBorderColor
    if (dropdownBorderWidth) customDropdownStyles.borderWidth = dropdownBorderWidth
    if (dropdownBorderRadius) customDropdownStyles.borderRadius = dropdownBorderRadius
    if (dropdownBoxShadow) customDropdownStyles.boxShadow = dropdownBoxShadow
    if (dropdownZIndex) customDropdownStyles.zIndex = dropdownZIndex

    return (
      <ul
        ref={listRef}
        className={cn(baseStyles, transitions[transition as keyof typeof transitions], className)}
        style={customDropdownStyles}
        role="listbox"
        aria-multiselectable={multiple}
        {...props}
      >
        {loading ? (
          <li className="px-4 py-3 text-center text-gray-500">{loadingMessage}</li>
        ) : filteredOptions.length === 0 ? (
          renderEmpty ? (
            renderEmpty()
          ) : (
            <li className="px-4 py-3 text-center text-gray-500">{emptyMessage}</li>
          )
        ) : (
          children ||
          filteredOptions.map((option, index) => (
            <SelectOptionComponent key={option.value} option={option} index={index} />
          ))
        )}
      </ul>
    )
  }
)

SelectDropdown.displayName = 'SelectDropdown'

export interface SelectOptionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  option: SelectOption
  index: number
}

const SelectOptionComponent = React.forwardRef<HTMLLIElement, SelectOptionProps>(
  ({ className, option, index, ...props }, ref) => {
    const {
      value,
      onChange,
      multiple,
      highlightedIndex,
      setHighlightedIndex,
      setIsOpen,
      size,
      renderOption,
      // Option style props
      optionPadding,
      optionHoverBackgroundColor,
      optionSelectedBackgroundColor,
      optionSelectedTextColor,
      optionDisabledOpacity,
    } = useSelect()

    const isSelected = useMemo(() => {
      if (!value) return false
      if (Array.isArray(value)) {
        return value.some((v) => v.value === option.value)
      }
      return value.value === option.value
    }, [value, option])

    const isHighlighted = highlightedIndex === index

    const handleClick = () => {
      if (option.disabled) return

      if (multiple && Array.isArray(value)) {
        if (isSelected) {
          onChange(value.filter((v) => v.value !== option.value))
        } else {
          onChange([...value, option])
        }
      } else {
        onChange(option)
        setIsOpen(false)
      }
    }

    const handleMouseEnter = () => {
      setHighlightedIndex(index)
    }

    const baseStyles = cn(
      'cursor-pointer transition-colors',
      option.disabled && 'cursor-not-allowed opacity-50'
    )

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    }

    const stateStyles = cn(
      isHighlighted && !option.disabled && 'bg-gray-100',
      isSelected && 'bg-primary-50 text-primary-700',
      !option.disabled && 'hover:bg-gray-100'
    )

    const customOptionStyles: React.CSSProperties = {}

    if (optionPadding) customOptionStyles.padding = optionPadding
    if (option.disabled && optionDisabledOpacity) customOptionStyles.opacity = optionDisabledOpacity

    // State-based styles
    if (isSelected) {
      if (optionSelectedBackgroundColor)
        customOptionStyles.backgroundColor = optionSelectedBackgroundColor
      if (optionSelectedTextColor) customOptionStyles.color = optionSelectedTextColor
    } else if (isHighlighted && !option.disabled && optionHoverBackgroundColor) {
      customOptionStyles.backgroundColor = optionHoverBackgroundColor
    }

    if (renderOption) {
      return (
        <li
          ref={ref}
          id={`select-option-${index}`}
          className={cn(baseStyles, sizes[size as keyof typeof sizes], stateStyles, className)}
          style={customOptionStyles}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled}
          {...props}
        >
          {renderOption(option, isSelected)}
        </li>
      )
    }

    return (
      <li
        ref={ref}
        id={`select-option-${index}`}
        className={cn(baseStyles, sizes[size as keyof typeof sizes], stateStyles, className)}
        style={customOptionStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        role="option"
        aria-selected={isSelected}
        aria-disabled={option.disabled}
        {...props}
      >
        <div className="flex items-center justify-between min-h-[1.5rem]">
          <div className="flex items-center gap-2.5">
            {option.icon && <span className="flex-shrink-0 flex items-center">{option.icon}</span>}
            <div className="min-w-0 flex-1">
              <div className="truncate">{option.label}</div>
              {option.description && (
                <div className="text-xs text-gray-500 mt-0.5 truncate">{option.description}</div>
              )}
            </div>
          </div>
          {isSelected && (
            <svg
              className="h-4 w-4 text-primary-600 flex-shrink-0 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </li>
    )
  }
)

SelectOptionComponent.displayName = 'SelectOption'

export interface SelectEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const SelectEmpty = React.forwardRef<HTMLDivElement, SelectEmptyProps>(
  ({ className, children, ...props }, ref) => {
    const { size, emptyMessage } = useSelect()

    const sizes = {
      sm: 'px-3 py-6 text-sm',
      md: 'px-4 py-8 text-base',
      lg: 'px-5 py-10 text-lg',
    }

    return (
      <div
        ref={ref}
        className={cn('text-center text-gray-500', sizes[size as keyof typeof sizes], className)}
        {...props}
      >
        {children || emptyMessage}
      </div>
    )
  }
)

SelectEmpty.displayName = 'SelectEmpty'

// Compound component interface
interface SelectComponent
  extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>> {
  Input: typeof SelectInput
  Dropdown: typeof SelectDropdown
  Option: typeof SelectOptionComponent
  Empty: typeof SelectEmpty
}

// Create compound component
const SelectCompound = Select as unknown as SelectComponent
SelectCompound.Input = SelectInput
SelectCompound.Dropdown = SelectDropdown
SelectCompound.Option = SelectOptionComponent
SelectCompound.Empty = SelectEmpty

export {
  SelectCompound,
  SelectInput,
  SelectDropdown,
  SelectOptionComponent as SelectOption,
  SelectEmpty,
}
export default SelectCompound
