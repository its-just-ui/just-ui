import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react'
import { cn } from '@/utils'

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
  group?: string
  icon?: React.ReactNode
  description?: string
  [key: string]: unknown
}

export interface AutocompleteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: AutocompleteOption[]
  value?: AutocompleteOption | AutocompleteOption[] | null
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void
  onInputChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  multiple?: boolean
  clearable?: boolean
  searchable?: boolean
  creatable?: boolean
  onCreate?: (inputValue: string) => void
  variant?: 'default' | 'filled' | 'outlined' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  helperText?: string
  label?: string
  required?: boolean
  filterOption?: (option: AutocompleteOption, inputValue: string) => boolean
  renderOption?: (option: AutocompleteOption, isSelected: boolean) => React.ReactNode
  renderValue?: (value: AutocompleteOption | AutocompleteOption[]) => React.ReactNode
  groupBy?: (option: AutocompleteOption) => string
  maxHeight?: number
  transition?: 'none' | 'fade' | 'slide' | 'scale' | 'flip'
  transitionDuration?: number
  placement?: 'top' | 'bottom'
  offset?: number
  flip?: boolean
  preventOverflow?: boolean
  emptyMessage?: string
  loadingMessage?: string
  createMessage?: (inputValue: string) => string
  clearIcon?: React.ReactNode
  dropdownIcon?: React.ReactNode
  loadingIcon?: React.ReactNode
  children?: React.ReactNode

  // Border styles
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string

  // Text customization
  fontSize?: string
  fontWeight?: string
  fontFamily?: string

  // Color customization
  backgroundColor?: string
  textColor?: string
  placeholderColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadow options
  boxShadow?: string
  focusBoxShadow?: string

  // Padding and spacing
  padding?: string
  paddingX?: string
  paddingY?: string

  // Dropdown style props
  dropdownBackgroundColor?: string
  dropdownBorderColor?: string
  dropdownBorderWidth?: string
  dropdownBorderRadius?: string
  dropdownBoxShadow?: string
  dropdownZIndex?: string

  // Item styles
  itemPadding?: string
  itemHoverBackgroundColor?: string
  itemSelectedBackgroundColor?: string
  itemSelectedTextColor?: string
  itemHighlightedBackgroundColor?: string
  itemDisabledOpacity?: string

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
}

interface AutocompleteContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: AutocompleteOption | AutocompleteOption[] | null
  onChange: (value: AutocompleteOption | AutocompleteOption[] | null) => void
  inputValue: string
  setInputValue: (value: string) => void
  options: AutocompleteOption[]
  filteredOptions: AutocompleteOption[]
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  multiple: boolean
  disabled?: boolean
  loading?: boolean
  searchable?: boolean
  variant?: 'default' | 'filled' | 'outlined' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  transition?: 'none' | 'fade' | 'slide' | 'scale' | 'flip'
  transitionDuration?: number
  placement?: 'top' | 'bottom'
  renderOption?: (option: AutocompleteOption, isSelected: boolean) => React.ReactNode
  emptyMessage?: string
  loadingMessage?: string
  createMessage?: (inputValue: string) => string
  creatable?: boolean
  onCreate?: (inputValue: string) => void

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
  itemPadding?: string
  itemHoverBackgroundColor?: string
  itemSelectedBackgroundColor?: string
  itemSelectedTextColor?: string
  itemHighlightedBackgroundColor?: string
  itemDisabledOpacity?: string
  iconColor?: string
  clearIconColor?: string
  dropdownIconColor?: string
  loadingIconColor?: string
}

const AutocompleteContext = createContext<AutocompleteContextValue | undefined>(undefined)

export const useAutocomplete = () => {
  const context = useContext(AutocompleteContext)
  if (!context) {
    throw new Error('useAutocomplete must be used within an Autocomplete')
  }
  return context
}

const defaultFilterOption = (option: AutocompleteOption, inputValue: string) => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase())
}

const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      className,
      options,
      value,
      onChange,
      onInputChange,
      placeholder = 'Select...',
      disabled = false,
      loading = false,
      multiple = false,
      clearable = true,
      searchable = true,
      creatable = false,
      onCreate,
      variant = 'default',
      size = 'md',
      status = 'default',
      helperText,
      label,
      required = false,
      filterOption = defaultFilterOption,
      renderOption,
      renderValue,
      groupBy: _groupBy,
      maxHeight = 300,
      transition = 'scale',
      transitionDuration = 200,
      placement = 'bottom',
      offset = 4,
      flip: _flip = true,
      preventOverflow: _preventOverflow = true,
      emptyMessage = 'No options found',
      loadingMessage = 'Loading...',
      createMessage = (inputValue) => `Create "${inputValue}"`,
      clearIcon,
      dropdownIcon,
      loadingIcon,
      children,
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
      itemPadding,
      itemHoverBackgroundColor,
      itemSelectedBackgroundColor,
      itemSelectedTextColor,
      itemHighlightedBackgroundColor,
      itemDisabledOpacity,
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
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)

    const filteredOptions = useMemo(() => {
      if (!searchable || !inputValue) return options

      const filtered = options.filter((option) => filterOption(option, inputValue))

      if (creatable && inputValue && !filtered.some((opt) => opt.label === inputValue)) {
        filtered.push({
          value: inputValue,
          label: createMessage(inputValue),
          __isCreate: true,
        })
      }

      return filtered
    }, [options, inputValue, searchable, filterOption, creatable, createMessage])

    const handleChange = useCallback(
      (newValue: AutocompleteOption | AutocompleteOption[] | null) => {
        if (onChange) {
          onChange(newValue)
        }
        if (!multiple) {
          setOpen(false)
          setInputValue('')
        }
      },
      [onChange, multiple]
    )

    const handleInputChange = useCallback(
      (value: string) => {
        setInputValue(value)
        if (onInputChange) {
          onInputChange(value)
        }
        if (!open && value) {
          setOpen(true)
        }
      },
      [onInputChange, open]
    )

    const baseStyles = 'relative w-full'

    return (
      <AutocompleteContext.Provider
        value={{
          open,
          setOpen,
          value: value || null,
          onChange: handleChange,
          inputValue,
          setInputValue: handleInputChange,
          options,
          filteredOptions,
          highlightedIndex,
          setHighlightedIndex,
          multiple,
          disabled,
          loading,
          searchable,
          variant,
          size,
          status,
          transition,
          transitionDuration,
          placement,
          renderOption,
          emptyMessage,
          loadingMessage,
          createMessage,
          creatable,
          onCreate,
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
          itemPadding,
          itemHoverBackgroundColor,
          itemSelectedBackgroundColor,
          itemSelectedTextColor,
          itemHighlightedBackgroundColor,
          itemDisabledOpacity,
          iconColor,
          clearIconColor,
          dropdownIconColor,
          loadingIconColor,
        }}
      >
        <div ref={ref} className={cn(baseStyles, className)} {...props}>
          {label && (
            <label
              className={cn(
                'block mb-2 font-medium',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                status === 'error' && 'text-red-600',
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
              <AutocompleteInput
                placeholder={placeholder}
                clearable={clearable}
                clearIcon={clearIcon}
                dropdownIcon={dropdownIcon}
                loadingIcon={loadingIcon}
                renderValue={renderValue}
              />
              <AutocompleteList maxHeight={maxHeight} offset={offset} />
            </>
          )}
          {helperText && (
            <p
              className={cn(
                'mt-2',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base',
                status === 'success' && 'text-green-600',
                status === 'warning' && 'text-yellow-600',
                status === 'error' && 'text-red-600',
                status === 'default' && 'text-gray-500'
              )}
              style={{
                fontSize: helperTextFontSize,
                color: helperTextColor,
                marginTop: helperTextMarginTop,
              }}
            >
              {helperText}
            </p>
          )}
        </div>
      </AutocompleteContext.Provider>
    )
  }
)

Autocomplete.displayName = 'Autocomplete'

export interface AutocompleteInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  clearable?: boolean
  clearIcon?: React.ReactNode
  dropdownIcon?: React.ReactNode
  loadingIcon?: React.ReactNode
  renderValue?: (value: AutocompleteOption | AutocompleteOption[]) => React.ReactNode
}

const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  (
    { className, clearable = true, clearIcon, dropdownIcon, loadingIcon, renderValue, ...props },
    _ref
  ) => {
    const {
      open,
      setOpen,
      value,
      onChange,
      inputValue,
      setInputValue,
      multiple,
      disabled,
      loading,
      searchable,
      variant,
      size,
      status,
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
    } = useAutocomplete()

    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(multiple ? [] : null)
      setInputValue('')
      inputRef.current?.focus()
    }

    const handleInputClick = () => {
      if (!disabled) {
        setOpen(!open)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (props.onFocus) {
        props.onFocus(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (props.onBlur) {
        props.onBlur(e)
      }
    }

    const displayValue = useMemo(() => {
      if (inputValue && searchable) return inputValue
      if (!value) return ''

      if (renderValue) {
        return renderValue(value)
      }

      if (Array.isArray(value)) {
        return value.map((v) => v.label).join(', ')
      }

      return value.label
    }, [value, inputValue, searchable, renderValue])

    const baseStyles = 'w-full pr-10 transition-all focus:outline-none'

    const variants = {
      default: cn(
        'border rounded-md bg-white',
        status === 'error'
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-primary-600',
        'focus:ring-2 focus:ring-offset-2'
      ),
      filled: cn(
        'border-0 rounded-md',
        status === 'error' ? 'bg-red-50 focus:bg-red-100' : 'bg-gray-100 focus:bg-gray-200'
      ),
      outlined: cn(
        'border-2 rounded-md bg-transparent',
        status === 'error'
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-primary-600'
      ),
      underlined: cn(
        'border-0 border-b-2 rounded-none bg-transparent px-0',
        status === 'error'
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-primary-600'
      ),
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    }

    const defaultDropdownIcon = (
      <svg
        className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
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

    // Build custom styles object
    const customStyles: React.CSSProperties = {}

    // Border styles
    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderColor) customStyles.borderColor = borderColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderRadius) customStyles.borderRadius = borderRadius

    // Text styles
    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight
    if (fontFamily) customStyles.fontFamily = fontFamily
    if (textColor) customStyles.color = textColor

    // Background
    if (backgroundColor) customStyles.backgroundColor = backgroundColor

    // Shadow
    if (boxShadow) customStyles.boxShadow = boxShadow

    // Padding
    if (padding) customStyles.padding = padding
    if (paddingX) {
      customStyles.paddingLeft = paddingX
      customStyles.paddingRight = paddingX
    }
    if (paddingY) {
      customStyles.paddingTop = paddingY
      customStyles.paddingBottom = paddingY
    }

    // Create focus styles
    const focusStyles = {
      ...(focusBorderColor && { borderColor: focusBorderColor }),
      ...(focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
      ...(focusBoxShadow && { boxShadow: focusBoxShadow }),
      ...(focusRingColor &&
        focusRingWidth && {
          boxShadow: `0 0 0 ${focusRingWidth} ${focusRingColor}${focusRingOffset ? `, 0 0 0 calc(${focusRingWidth} + ${focusRingOffset}) transparent` : ''}`,
        }),
    }

    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={cn(
            baseStyles,
            variants[variant || 'default'],
            sizes[size || 'md'],
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          style={{
            ...customStyles,
            ...(isFocused && focusStyles),
            ...(placeholderColor &&
              ({
                '--placeholder-color': placeholderColor,
              } as React.CSSProperties)),
          }}
          value={displayValue as string}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={!searchable}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
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

AutocompleteInput.displayName = 'AutocompleteInput'

export interface AutocompleteListProps extends React.HTMLAttributes<HTMLUListElement> {
  maxHeight?: number
  offset?: number
}

const AutocompleteList = React.forwardRef<HTMLUListElement, AutocompleteListProps>(
  ({ className, maxHeight = 300, offset = 4, children, ...props }, _ref) => {
    const {
      open,
      filteredOptions,
      loading,
      transition,
      transitionDuration,
      placement,
      emptyMessage,
      loadingMessage,
      // Dropdown style props
      dropdownBackgroundColor,
      dropdownBorderColor,
      dropdownBorderWidth,
      dropdownBorderRadius,
      dropdownBoxShadow,
      dropdownZIndex,
    } = useAutocomplete()

    const listRef = useRef<HTMLUListElement>(null)

    if (!open) return null

    const baseStyles = cn(
      'absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-auto',
      placement === 'top' && 'bottom-full mb-1 mt-0'
    )

    const transitions = {
      none: '',
      fade: cn(
        'transition-opacity',
        `duration-${transitionDuration}`,
        open ? 'opacity-100' : 'opacity-0'
      ),
      slide: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      ),
      scale: cn(
        'transition-all origin-top',
        `duration-${transitionDuration}`,
        open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ),
      flip: cn(
        'transition-all origin-top',
        `duration-${transitionDuration}`,
        open ? 'rotateX-0 opacity-100' : 'rotateX-90 opacity-0'
      ),
    }

    // Build custom dropdown styles
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
        className={cn(baseStyles, transitions[transition || 'scale'], className)}
        style={customDropdownStyles}
        {...props}
      >
        {loading ? (
          <li className="px-4 py-3 text-center text-gray-500">{loadingMessage}</li>
        ) : filteredOptions.length === 0 ? (
          <li className="px-4 py-3 text-center text-gray-500">{emptyMessage}</li>
        ) : (
          children ||
          filteredOptions.map((option, index) => (
            <AutocompleteItem key={option.value} option={option} index={index} />
          ))
        )}
      </ul>
    )
  }
)

AutocompleteList.displayName = 'AutocompleteList'

export interface AutocompleteItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  option: AutocompleteOption
  index: number
}

const AutocompleteItem = React.forwardRef<HTMLLIElement, AutocompleteItemProps>(
  ({ className, option, index, ...props }, ref) => {
    const {
      value,
      onChange,
      multiple,
      highlightedIndex,
      setHighlightedIndex,
      size,
      renderOption,
      creatable,
      onCreate,
      setOpen,
      setInputValue,
      // Item style props
      itemPadding,
      itemHoverBackgroundColor,
      itemSelectedBackgroundColor,
      itemSelectedTextColor,
      itemHighlightedBackgroundColor,
      itemDisabledOpacity,
    } = useAutocomplete()

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

      if (option.__isCreate && creatable && onCreate) {
        onCreate(option.value)
        setInputValue('')
        if (!multiple) {
          setOpen(false)
        }
        return
      }

      if (multiple && Array.isArray(value)) {
        if (isSelected) {
          onChange(value.filter((v) => v.value !== option.value))
        } else {
          onChange([...value, option])
        }
      } else {
        onChange(option)
        setInputValue('')
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
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    }

    const stateStyles = cn(
      isHighlighted && !option.disabled && 'bg-gray-100',
      isSelected && 'bg-primary-50 text-primary-700',
      !option.disabled && 'hover:bg-gray-100'
    )

    // Build custom item styles
    const customItemStyles: React.CSSProperties = {}

    if (itemPadding) customItemStyles.padding = itemPadding
    if (option.disabled && itemDisabledOpacity) customItemStyles.opacity = itemDisabledOpacity

    // State-based styles
    if (isSelected) {
      if (itemSelectedBackgroundColor)
        customItemStyles.backgroundColor = itemSelectedBackgroundColor
      if (itemSelectedTextColor) customItemStyles.color = itemSelectedTextColor
    } else if (isHighlighted && !option.disabled && itemHighlightedBackgroundColor) {
      customItemStyles.backgroundColor = itemHighlightedBackgroundColor
    }

    if (renderOption) {
      return (
        <li
          ref={ref}
          className={cn(baseStyles, sizes[size || 'md'], stateStyles, className)}
          style={customItemStyles}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseOver={(e) => {
            if (!option.disabled && itemHoverBackgroundColor && !isSelected && !isHighlighted) {
              ;(e.currentTarget as HTMLLIElement).style.backgroundColor = itemHoverBackgroundColor
            }
          }}
          onMouseOut={(e) => {
            if (!option.disabled && itemHoverBackgroundColor && !isSelected && !isHighlighted) {
              ;(e.currentTarget as HTMLLIElement).style.backgroundColor = ''
            }
          }}
          {...props}
        >
          {renderOption(option, isSelected)}
        </li>
      )
    }

    return (
      <li
        ref={ref}
        className={cn(baseStyles, sizes[size || 'md'], stateStyles, className)}
        style={customItemStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseOver={(e) => {
          if (!option.disabled && itemHoverBackgroundColor && !isSelected && !isHighlighted) {
            ;(e.currentTarget as HTMLLIElement).style.backgroundColor = itemHoverBackgroundColor
          }
        }}
        onMouseOut={(e) => {
          if (!option.disabled && itemHoverBackgroundColor && !isSelected && !isHighlighted) {
            ;(e.currentTarget as HTMLLIElement).style.backgroundColor = ''
          }
        }}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
            <div>
              <div>{option.label}</div>
              {option.description && (
                <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
              )}
            </div>
          </div>
          {isSelected && (
            <svg className="h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
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

AutocompleteItem.displayName = 'AutocompleteItem'

export interface AutocompleteEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const AutocompleteEmpty = React.forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  ({ className, children, ...props }, ref) => {
    const { size, emptyMessage } = useAutocomplete()

    const sizes = {
      sm: 'px-3 py-6 text-sm',
      md: 'px-4 py-8 text-base',
      lg: 'px-5 py-10 text-lg',
    }

    return (
      <div
        ref={ref}
        className={cn('text-center text-gray-500', sizes[size || 'md'], className)}
        {...props}
      >
        {children || emptyMessage}
      </div>
    )
  }
)

AutocompleteEmpty.displayName = 'AutocompleteEmpty'

export { Autocomplete, AutocompleteInput, AutocompleteList, AutocompleteItem, AutocompleteEmpty }
