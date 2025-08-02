import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { cn } from '@/utils'

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  value?: string | string[]
  onChange?: (value: string | string[] | null) => void
  variant?: 'default' | 'filled' | 'outlined' | 'soft' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error' | 'info'
  disabled?: boolean
  loading?: boolean
  removable?: boolean
  selectable?: boolean
  multiple?: boolean
  maxChips?: number
  label?: string
  helperText?: string
  required?: boolean
  emptyMessage?: string
  loadingMessage?: string
  onRemove?: (value: string) => void
  onSelect?: (value: string) => void
  renderChip?: (value: string, isSelected: boolean) => React.ReactNode
  children?: React.ReactNode

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

  // Colors
  backgroundColor?: string
  selectedBackgroundColor?: string
  hoverBackgroundColor?: string
  disabledBackgroundColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string

  // Spacing
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string

  // Icon customization
  iconColor?: string
  removeIconColor?: string
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

  // Container styles
  containerBackgroundColor?: string
  containerBorderColor?: string
  containerBorderWidth?: string
  containerBorderRadius?: string
  containerPadding?: string
  containerGap?: string
}

interface ChipContextValue {
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void
  variant?: 'default' | 'filled' | 'outlined' | 'soft' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error' | 'info'
  disabled?: boolean
  loading?: boolean
  removable?: boolean
  selectable?: boolean
  multiple?: boolean
  maxChips?: number
  onRemove?: (value: string) => void
  onSelect?: (value: string) => void
  renderChip?: (value: string, isSelected: boolean) => React.ReactNode
  emptyMessage?: string
  loadingMessage?: string

  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  placeholderColor?: string
  backgroundColor?: string
  selectedBackgroundColor?: string
  hoverBackgroundColor?: string
  disabledBackgroundColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string
  iconColor?: string
  removeIconColor?: string
  loadingIconColor?: string
  containerBackgroundColor?: string
  containerBorderColor?: string
  containerBorderWidth?: string
  containerBorderRadius?: string
  containerPadding?: string
  containerGap?: string
}

const ChipContext = createContext<ChipContextValue | undefined>(undefined)

export const useChip = () => {
  const context = useContext(ChipContext)
  if (!context) {
    throw new Error('useChip must be used within a Chip')
  }
  return context
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      value,
      onChange,
      variant = 'default',
      size = 'md',
      status = 'default',
      disabled = false,
      loading = false,
      removable = false,
      selectable = false,
      multiple = false,
      maxChips,
      label,
      helperText,
      required = false,
      emptyMessage = 'No chips selected',
      loadingMessage = 'Loading...',
      onRemove,
      onSelect,
      renderChip,
      children,
      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      selectedBackgroundColor,
      hoverBackgroundColor,
      disabledBackgroundColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      hoverBoxShadow,
      padding,
      paddingX,
      paddingY,
      gap,
      iconColor,
      removeIconColor,
      loadingIconColor,
      labelFontSize,
      labelFontWeight,
      labelColor,
      labelMarginBottom,
      helperTextFontSize,
      helperTextColor,
      helperTextMarginTop,
      requiredColor,
      containerBackgroundColor,
      containerBorderColor,
      containerBorderWidth,
      containerBorderRadius,
      containerPadding,
      containerGap,
      ...props
    },
    ref
  ) => {
    const handleChange = useCallback(
      (newValue: string | string[] | null) => {
        if (onChange) {
          onChange(newValue)
        }
      },
      [onChange]
    )

    const handleRemove = useCallback(
      (chipValue: string) => {
        if (onRemove) {
          onRemove(chipValue)
        }

        if (Array.isArray(value)) {
          const newValue = value.filter((v) => v !== chipValue)
          handleChange(newValue.length > 0 ? newValue : null)
        } else if (value === chipValue) {
          handleChange(null)
        }
      },
      [value, onRemove, handleChange]
    )

    const handleSelect = useCallback(
      (chipValue: string) => {
        if (onSelect) {
          onSelect(chipValue)
        }

        if (multiple && Array.isArray(value)) {
          const isSelected = value.includes(chipValue)
          if (isSelected) {
            const newValue = value.filter((v) => v !== chipValue)
            handleChange(newValue.length > 0 ? newValue : null)
          } else {
            if (maxChips && value.length >= maxChips) return
            handleChange([...value, chipValue])
          }
        } else {
          handleChange(chipValue)
        }
      },
      [value, multiple, maxChips, onSelect, handleChange]
    )

    const baseStyles = 'relative'

    return (
      <ChipContext.Provider
        value={{
          value: value || null,
          onChange: handleChange,
          variant,
          size,
          status,
          disabled,
          loading,
          removable,
          selectable,
          multiple,
          maxChips,
          onRemove: handleRemove,
          onSelect: handleSelect,
          renderChip,
          emptyMessage,
          loadingMessage,
          // Style props
          borderWidth,
          borderColor,
          borderStyle,
          borderRadius,
          fontSize,
          fontWeight,
          fontFamily,
          textColor,
          backgroundColor,
          selectedBackgroundColor,
          hoverBackgroundColor,
          disabledBackgroundColor,
          focusRingColor,
          focusRingWidth,
          focusRingOffset,
          focusBorderColor,
          focusBackgroundColor,
          boxShadow,
          focusBoxShadow,
          hoverBoxShadow,
          padding,
          paddingX,
          paddingY,
          gap,
          iconColor,
          removeIconColor,
          loadingIconColor,
          containerBackgroundColor,
          containerBorderColor,
          containerBorderWidth,
          containerBorderRadius,
          containerPadding,
          containerGap,
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
          {children || <ChipContainer />}
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
      </ChipContext.Provider>
    )
  }
)

Chip.displayName = 'Chip'

export interface ChipContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ChipContainer = React.forwardRef<HTMLDivElement, ChipContainerProps>(
  ({ className, children, ...props }, ref) => {
    const {
      value,
      loading,
      loadingMessage,
      emptyMessage,
      // Container style props
      containerBackgroundColor,
      containerBorderColor,
      containerBorderWidth,
      containerBorderRadius,
      containerPadding,
      containerGap,
    } = useChip()

    const baseStyles = cn(
      'flex flex-wrap items-center gap-2 min-h-[2.5rem]',
      'border border-gray-200 rounded-md bg-white',
      'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2'
    )

    // Build custom container styles
    const customContainerStyles: React.CSSProperties = {}

    if (containerBackgroundColor) customContainerStyles.backgroundColor = containerBackgroundColor
    if (containerBorderColor) customContainerStyles.borderColor = containerBorderColor
    if (containerBorderWidth) customContainerStyles.borderWidth = containerBorderWidth
    if (containerBorderRadius) customContainerStyles.borderRadius = containerBorderRadius
    if (containerPadding) customContainerStyles.padding = containerPadding
    if (containerGap) customContainerStyles.gap = containerGap

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-center', className)}
          style={customContainerStyles}
          {...props}
        >
          <span className="text-gray-500">{loadingMessage}</span>
        </div>
      )
    }

    if (!value || (Array.isArray(value) && value.length === 0)) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-center', className)}
          style={customContainerStyles}
          {...props}
        >
          <span className="text-gray-500">{emptyMessage}</span>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(baseStyles, className)} style={customContainerStyles} {...props}>
        {children || (
          <>
            {Array.isArray(value) ? (
              value.map((chipValue) => <ChipItem key={chipValue} value={chipValue} />)
            ) : (
              <ChipItem value={value} />
            )}
          </>
        )}
      </div>
    )
  }
)

ChipContainer.displayName = 'ChipContainer'

export interface ChipItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  icon?: React.ReactNode
  avatar?: React.ReactNode
}

const ChipItem = React.forwardRef<HTMLDivElement, ChipItemProps>(
  ({ className, value, icon, avatar, children, ...props }, ref) => {
    const {
      value: selectedValue,
      variant,
      size,
      status,
      disabled,
      removable,
      selectable,
      multiple: _multiple,
      onRemove,
      onSelect,
      renderChip,
      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      selectedBackgroundColor,
      hoverBackgroundColor: _hoverBackgroundColor,
      disabledBackgroundColor,
      focusRingColor: _focusRingColor,
      focusRingWidth: _focusRingWidth,
      focusRingOffset: _focusRingOffset,
      focusBorderColor: _focusBorderColor,
      focusBackgroundColor: _focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      hoverBoxShadow,
      padding,
      paddingX,
      paddingY,
      gap,
      iconColor,
      removeIconColor,
    } = useChip()

    const isSelected = useMemo(() => {
      if (Array.isArray(selectedValue)) {
        return selectedValue.includes(value)
      }
      return selectedValue === value
    }, [selectedValue, value])

    const handleClick = () => {
      if (disabled) return
      if (selectable) {
        onSelect?.(value)
      }
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (disabled) return
      onRemove?.(value)
    }

    const baseStyles = cn(
      'inline-flex items-center gap-1 rounded-full font-medium transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled && 'cursor-not-allowed opacity-50',
      selectable && !disabled && 'cursor-pointer'
    )

    const variants = {
      default: cn(
        'border border-gray-300 bg-white text-gray-700',
        'hover:bg-gray-50 focus:ring-gray-400',
        isSelected && 'bg-gray-100 border-gray-400'
      ),
      filled: cn(
        'border-0',
        status === 'success' && 'bg-green-100 text-green-800',
        status === 'warning' && 'bg-yellow-100 text-yellow-800',
        status === 'error' && 'bg-red-100 text-red-800',
        status === 'info' && 'bg-blue-100 text-blue-800',
        status === 'default' && 'bg-gray-100 text-gray-800',
        isSelected && 'bg-gray-200'
      ),
      outlined: cn(
        'border-2 bg-transparent',
        status === 'success' && 'border-green-500 text-green-700',
        status === 'warning' && 'border-yellow-500 text-yellow-700',
        status === 'error' && 'border-red-500 text-red-700',
        status === 'info' && 'border-blue-500 text-blue-700',
        status === 'default' && 'border-gray-300 text-gray-700',
        isSelected && 'border-gray-500 bg-gray-50'
      ),
      soft: cn(
        'border-0',
        status === 'success' && 'bg-green-50 text-green-700',
        status === 'warning' && 'bg-yellow-50 text-yellow-700',
        status === 'error' && 'bg-red-50 text-red-700',
        status === 'info' && 'bg-blue-50 text-blue-700',
        status === 'default' && 'bg-gray-50 text-gray-700',
        isSelected && 'bg-gray-100'
      ),
      gradient: cn(
        'border-0 text-white',
        status === 'success' && 'bg-gradient-to-r from-green-400 to-green-600',
        status === 'warning' && 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        status === 'error' && 'bg-gradient-to-r from-red-400 to-red-600',
        status === 'info' && 'bg-gradient-to-r from-blue-400 to-blue-600',
        status === 'default' && 'bg-gradient-to-r from-gray-400 to-gray-600',
        isSelected && 'bg-gradient-to-r from-gray-500 to-gray-700'
      ),
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    }

    // Build custom styles
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
    if (isSelected && selectedBackgroundColor)
      customStyles.backgroundColor = selectedBackgroundColor
    if (disabled && disabledBackgroundColor) customStyles.backgroundColor = disabledBackgroundColor

    // Shadow
    if (boxShadow) customStyles.boxShadow = boxShadow
    if (isSelected && focusBoxShadow) customStyles.boxShadow = focusBoxShadow

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

    // Gap
    if (gap) customStyles.gap = gap

    // Focus styles (commented out as not currently used)
    // const focusStyles = {
    //   ...(focusBorderColor && { borderColor: focusBorderColor }),
    //   ...(focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
    //   ...(focusBoxShadow && { boxShadow: focusBoxShadow }),
    //   ...(focusRingColor && focusRingWidth && {
    //     boxShadow: `0 0 0 ${focusRingWidth} ${focusRingColor}${focusRingOffset ? `, 0 0 0 calc(${focusRingWidth} + ${focusRingOffset}) transparent` : ''}`,
    //   }),
    // }

    const defaultRemoveIcon = (
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )

    if (renderChip) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, variants[variant || 'default'], sizes[size || 'md'], className)}
          style={{
            ...customStyles,
            ...(hoverBoxShadow &&
              ({
                ':hover': { boxShadow: hoverBoxShadow },
              } as any)),
          }}
          onClick={handleClick}
          {...props}
        >
          {renderChip(value, isSelected)}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant || 'default'], sizes[size || 'md'], className)}
        style={{
          ...customStyles,
          ...(hoverBoxShadow &&
            ({
              ':hover': { boxShadow: hoverBoxShadow },
            } as any)),
        }}
        onClick={handleClick}
        {...props}
      >
        {avatar && <span className="flex-shrink-0">{avatar}</span>}
        {icon && (
          <span className="flex-shrink-0" style={{ color: iconColor }}>
            {icon}
          </span>
        )}
        <span className="flex-shrink-0">{children || value}</span>
        {removable && (
          <button
            type="button"
            className="flex-shrink-0 ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
            style={{ color: removeIconColor || iconColor }}
            onClick={handleRemove}
            disabled={disabled}
          >
            {defaultRemoveIcon}
          </button>
        )}
      </div>
    )
  }
)

ChipItem.displayName = 'ChipItem'

export interface ChipInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  placeholder?: string
  onAdd?: (value: string) => void
  validateInput?: (value: string) => boolean | string
}

const ChipInput = React.forwardRef<HTMLInputElement, ChipInputProps>(
  ({ className, placeholder = 'Add chip...', onAdd, validateInput, ...props }, ref) => {
    const {
      value,
      onChange,
      multiple,
      maxChips,
      disabled,
      size,
      // Style props
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      placeholderColor,
    } = useChip()

    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault()
        const trimmedValue = inputValue.trim()
        if (trimmedValue) {
          if (validateInput) {
            const validation = validateInput(trimmedValue)
            if (validation === true) {
              addChip(trimmedValue)
            } else if (typeof validation === 'string') {
              // Show error message
              console.warn(validation)
            }
          } else {
            addChip(trimmedValue)
          }
        }
      } else if (e.key === 'Backspace' && !inputValue && Array.isArray(value) && value.length > 0) {
        // Remove last chip on backspace
        const newValue = value.slice(0, -1)
        onChange(newValue.length > 0 ? newValue : null)
      }
    }

    const addChip = (chipValue: string) => {
      if (onAdd) {
        onAdd(chipValue)
      }

      if (multiple && Array.isArray(value)) {
        if (!value.includes(chipValue) && (!maxChips || value.length < maxChips)) {
          onChange([...value, chipValue])
        }
      } else {
        onChange(chipValue)
      }
      setInputValue('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }

    const baseStyles = cn('flex-1 min-w-0 bg-transparent outline-none', 'placeholder:text-gray-400')

    const sizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    // Build custom input styles
    const customInputStyles: React.CSSProperties = {}

    if (fontSize) customInputStyles.fontSize = fontSize
    if (fontWeight) customInputStyles.fontWeight = fontWeight
    if (fontFamily) customInputStyles.fontFamily = fontFamily
    if (textColor) customInputStyles.color = textColor
    if (placeholderColor) {
      ;(customInputStyles as any)['--placeholder-color'] = placeholderColor
    }

    return (
      <input
        ref={ref}
        type="text"
        className={cn(baseStyles, sizes[size || 'md'], className)}
        style={customInputStyles}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    )
  }
)

ChipInput.displayName = 'ChipInput'

export { Chip, ChipContainer, ChipItem, ChipInput }
