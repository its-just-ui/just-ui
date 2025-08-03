import React, { useState, useCallback, useMemo, createContext, useContext, useId } from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export type CheckboxVariant =
  | 'default'
  | 'filled'
  | 'outlined'
  | 'ghost'
  | 'toggle'
  | 'switch'
  | 'card'
export type CheckboxSize = 'sm' | 'md' | 'lg'
export type CheckboxStatus = 'default' | 'success' | 'warning' | 'error' | 'info'
export type CheckboxTransition = 'none' | 'fade' | 'scale' | 'slide' | 'bounce'
export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate'

export interface CheckboxContextValue {
  // State
  isChecked: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  isLoading: boolean
  isRequired: boolean

  // Handlers
  onChange: (checked: boolean) => void
  onFocus: () => void
  onBlur: () => void

  // Configuration
  variant: CheckboxVariant
  size: CheckboxSize
  status: CheckboxStatus
  transition: CheckboxTransition

  // IDs
  inputId: string
  labelId?: string
  descriptionId?: string
  helperTextId?: string
  errorTextId?: string

  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  backgroundColor?: string
  checkedBackgroundColor?: string
  indeterminateBackgroundColor?: string
  hoverBackgroundColor?: string
  disabledBackgroundColor?: string
  checkmarkColor?: string
  indeterminateColor?: string
  labelTextColor?: string
  descriptionTextColor?: string
  helperTextColor?: string
  errorTextColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  focusBoxShadow?: string
  checkedBoxShadow?: string
  labelFontSize?: string
  labelTextSize?: string
  labelFontWeight?: string
  labelFontFamily?: string
  descriptionFontSize?: string
  gap?: string
  padding?: string
  paddingX?: string
  paddingY?: string
}

export interface CheckboxGroupContextValue {
  // State
  value: string[]
  onChange: (value: string[]) => void
  isDisabled: boolean
  isRequired: boolean

  // Selection utilities
  isSelected: (itemValue: string) => boolean
  isIndeterminate: boolean
  allSelected: boolean
  selectAll: () => void
  selectNone: () => void
  toggleItem: (itemValue: string) => void

  // Configuration
  variant: CheckboxVariant
  size: CheckboxSize
  status: CheckboxStatus
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  // Core functionality
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void

  // Features
  loading?: boolean
  required?: boolean

  // Styling
  variant?: CheckboxVariant
  size?: CheckboxSize
  status?: CheckboxStatus
  transition?: CheckboxTransition

  // Content
  label?: string
  description?: string
  helperText?: string
  errorText?: string

  // Custom render functions
  renderLabel?: (label: string) => React.ReactNode
  _renderIcon?: (state: CheckboxState) => React.ReactNode
  renderDescription?: (description: string) => React.ReactNode
  renderHelperText?: (text: string) => React.ReactNode
  renderErrorText?: (text: string) => React.ReactNode

  // Icons
  _checkIcon?: React.ReactNode
  _indeterminateIcon?: React.ReactNode
  _loadingIcon?: React.ReactNode

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void

  // Style props - Borders
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string

  // Style props - Colors
  backgroundColor?: string
  checkedBackgroundColor?: string
  indeterminateBackgroundColor?: string
  hoverBackgroundColor?: string
  disabledBackgroundColor?: string
  checkmarkColor?: string
  indeterminateColor?: string

  // Style props - Typography
  labelFontSize?: string
  labelTextSize?: string // Alias for labelFontSize for better UX
  labelFontWeight?: string
  labelFontFamily?: string
  labelTextColor?: string
  descriptionFontSize?: string
  descriptionTextColor?: string
  helperTextColor?: string
  errorTextColor?: string

  // Style props - Focus
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  _focusBorderColor?: string
  _focusBackgroundColor?: string

  // Style props - Shadows
  boxShadow?: string
  focusBoxShadow?: string
  checkedBoxShadow?: string

  // Style props - Spacing
  gap?: string
  padding?: string
  paddingX?: string
  paddingY?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: React.ReactNode

  // State
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void

  // Configuration
  disabled?: boolean
  required?: boolean
  variant?: CheckboxVariant
  size?: CheckboxSize
  status?: CheckboxStatus

  // Content
  label?: string
  description?: string
  helperText?: string
  errorText?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface CheckboxItemProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  value: string
  children?: React.ReactNode
}

// Context
const CheckboxContext = createContext<CheckboxContextValue | null>(null)
const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

// Hook to use checkbox context
export const useCheckbox = () => {
  const context = useContext(CheckboxContext)
  if (!context) {
    throw new Error('useCheckbox must be used within a Checkbox component')
  }
  return context
}

// Hook to use checkbox group context
export const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext)
  return context // Can be null if not in a group
}

// Main Checkbox Component
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      children,

      // Core functionality
      checked,
      defaultChecked = false,
      indeterminate = false,
      onChange,

      // Features
      loading = false,
      required = false,
      disabled = false,

      // Styling
      variant = 'default',
      size = 'md',
      status = 'default',
      transition = 'scale',

      // Content
      label,
      description,
      helperText,
      errorText,

      // Custom render functions
      renderLabel,
      _renderIcon,
      renderDescription,
      renderHelperText,
      renderErrorText,

      // Icons
      _checkIcon,
      _indeterminateIcon,
      _loadingIcon,

      // Event handlers
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,

      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      backgroundColor,
      checkedBackgroundColor,
      indeterminateBackgroundColor,
      hoverBackgroundColor,
      disabledBackgroundColor,
      checkmarkColor,
      indeterminateColor,
      labelFontSize,
      labelTextSize,
      labelFontWeight,
      labelFontFamily,
      labelTextColor,
      descriptionFontSize,
      descriptionTextColor,
      helperTextColor,
      errorTextColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      _focusBorderColor,
      _focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      checkedBoxShadow,
      gap,
      padding,
      paddingX,
      paddingY,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,

      ...props
    },
    ref
  ) => {
    // Group context (currently unused but available for future extensions)
    // const groupContext = useCheckboxGroup()

    // IDs
    const inputId = useId()
    const labelId = label ? `${inputId}-label` : undefined
    const descriptionId = description ? `${inputId}-description` : undefined
    const helperTextId = helperText ? `${inputId}-helper` : undefined
    const errorTextId = errorText ? `${inputId}-error` : undefined

    // Internal state for uncontrolled mode
    const [internalChecked, setInternalChecked] = useState(defaultChecked)

    // Determine if controlled
    const isControlled = checked !== undefined
    const currentChecked = isControlled ? checked : internalChecked

    // Handlers
    const handleChange = useCallback(
      (newChecked: boolean) => {
        if (!isControlled) {
          setInternalChecked(newChecked)
        }
        onChange?.(newChecked)
      },
      [isControlled, onChange]
    )

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || loading) return
        handleChange(event.target.checked)
      },
      [disabled, loading, handleChange]
    )

    const handleFocus = useCallback(() => {
      onFocus?.()
    }, [onFocus])

    const handleBlur = useCallback(() => {
      onBlur?.()
    }, [onBlur])

    // Context value
    const contextValue = useMemo<CheckboxContextValue>(
      () => ({
        isChecked: currentChecked,
        isIndeterminate: indeterminate,
        isDisabled: disabled,
        isLoading: loading,
        isRequired: required,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        variant,
        size,
        status,
        transition,
        inputId,
        labelId,
        descriptionId,
        helperTextId,
        errorTextId,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        backgroundColor,
        checkedBackgroundColor,
        indeterminateBackgroundColor,
        hoverBackgroundColor,
        disabledBackgroundColor,
        checkmarkColor,
        indeterminateColor,
        labelTextColor,
        descriptionTextColor,
        helperTextColor,
        errorTextColor,
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        boxShadow,
        focusBoxShadow,
        checkedBoxShadow,
        labelFontSize,
        labelTextSize,
        labelFontWeight,
        labelFontFamily,
        descriptionFontSize,
        gap,
        padding,
        paddingX,
        paddingY,
      }),
      [
        currentChecked,
        indeterminate,
        disabled,
        loading,
        required,
        handleChange,
        handleFocus,
        handleBlur,
        variant,
        size,
        status,
        transition,
        inputId,
        labelId,
        descriptionId,
        helperTextId,
        errorTextId,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        backgroundColor,
        checkedBackgroundColor,
        indeterminateBackgroundColor,
        hoverBackgroundColor,
        disabledBackgroundColor,
        checkmarkColor,
        indeterminateColor,
        labelTextColor,
        descriptionTextColor,
        helperTextColor,
        errorTextColor,
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        boxShadow,
        focusBoxShadow,
        checkedBoxShadow,
        labelFontSize,
        labelTextSize,
        labelFontWeight,
        labelFontFamily,
        descriptionFontSize,
        gap,
        padding,
        paddingX,
        paddingY,
      ]
    )

    // Base styles
    const baseStyles = 'relative flex items-start'

    // Size styles
    const sizeStyles = {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    }

    // Custom styles
    const customStyles: React.CSSProperties = {}
    if (gap) customStyles.gap = gap
    if (padding) customStyles.padding = padding
    if (paddingX) {
      customStyles.paddingLeft = paddingX
      customStyles.paddingRight = paddingX
    }
    if (paddingY) {
      customStyles.paddingTop = paddingY
      customStyles.paddingBottom = paddingY
    }

    // Compute aria-describedby
    const computedAriaDescribedby =
      [ariaDescribedby, descriptionId, helperTextId, errorTextId].filter(Boolean).join(' ') ||
      undefined

    return (
      <CheckboxContext.Provider value={contextValue}>
        <div
          className={cn(baseStyles, sizeStyles[size], className)}
          style={customStyles}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Input */}
          <CheckboxInput
            ref={ref}
            checked={currentChecked}
            onChange={handleInputChange}
            disabled={disabled || loading}
            required={required}
            aria-label={ariaLabel}
            aria-describedby={computedAriaDescribedby}
            {...props}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            {label && (renderLabel ? renderLabel(label) : <CheckboxLabel>{label}</CheckboxLabel>)}

            {/* Description */}
            {description &&
              (renderDescription ? (
                renderDescription(description)
              ) : (
                <CheckboxDescription>{description}</CheckboxDescription>
              ))}

            {/* Helper Text */}
            {helperText &&
              !errorText &&
              (renderHelperText ? (
                renderHelperText(helperText)
              ) : (
                <CheckboxHelperText>{helperText}</CheckboxHelperText>
              ))}

            {/* Error Text */}
            {errorText &&
              (renderErrorText ? (
                renderErrorText(errorText)
              ) : (
                <CheckboxErrorText>{errorText}</CheckboxErrorText>
              ))}

            {/* Custom children */}
            {children}
          </div>
        </div>
      </CheckboxContext.Provider>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// Sub-components
export interface CheckboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // Additional props can be added here in the future
  variant?: CheckboxVariant
}

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ className, style, ...props }, ref) => {
    const {
      isChecked,
      isIndeterminate,
      isDisabled,
      isLoading,
      variant,
      size,
      status,
      transition,
      inputId,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      backgroundColor,
      checkedBackgroundColor,
      indeterminateBackgroundColor,
      // hoverBackgroundColor, // TODO: Implement hover styles
      disabledBackgroundColor,
      // checkmarkColor, // Used in icon components
      // indeterminateColor, // Used in icon components
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor: _focusBorderColor,
      // focusBackgroundColor, // TODO: Implement focus background styles
      boxShadow,
      // focusBoxShadow, // TODO: Implement focus shadow styles
      checkedBoxShadow,
    } = useCheckbox()

    // Base styles
    const baseStyles =
      'relative flex items-center justify-center shrink-0 border-2 focus:outline-none'

    // Variant styles
    const variantStyles = {
      default: 'border-gray-300 bg-white',
      filled: 'border-gray-400 bg-gray-50',
      outlined: 'border-gray-400 bg-transparent',
      ghost: 'border-transparent bg-gray-100',
      toggle: 'border-gray-300 bg-white rounded-full',
      switch: 'border-gray-300 bg-white rounded-full',
      card: 'border-gray-200 bg-white shadow-sm',
    }

    // Size styles
    const sizeStyles = {
      sm: 'w-4 h-4 rounded',
      md: 'w-5 h-5 rounded-md',
      lg: 'w-6 h-6 rounded-lg',
    }

    // Status styles
    const statusStyles = {
      default: '',
      success: 'border-green-500',
      warning: 'border-yellow-500',
      error: 'border-red-500',
      info: 'border-blue-500',
    }

    // State styles
    const stateStyles = cn(
      isChecked && 'bg-blue-600 border-blue-600',
      isIndeterminate && 'bg-blue-600 border-blue-600',
      isDisabled && 'opacity-50 cursor-not-allowed',
      isLoading && 'opacity-60 cursor-wait',
      !isDisabled && !isLoading && 'cursor-pointer hover:border-gray-400'
    )

    // Transition styles
    const transitionStyles = {
      none: '',
      fade: 'transition-opacity duration-200',
      scale: 'transition-all duration-200 hover:scale-105',
      slide: 'transition-all duration-200',
      bounce: 'transition-all duration-300 ease-bounce',
    }

    // Custom styles
    const customStyles: React.CSSProperties = { ...style }

    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderColor) customStyles.borderColor = borderColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderRadius) customStyles.borderRadius = borderRadius
    if (backgroundColor && !isChecked && !isIndeterminate)
      customStyles.backgroundColor = backgroundColor
    if (checkedBackgroundColor && isChecked) customStyles.backgroundColor = checkedBackgroundColor
    if (indeterminateBackgroundColor && isIndeterminate)
      customStyles.backgroundColor = indeterminateBackgroundColor
    if (disabledBackgroundColor && isDisabled)
      customStyles.backgroundColor = disabledBackgroundColor
    if (boxShadow) customStyles.boxShadow = boxShadow
    if (checkedBoxShadow && (isChecked || isIndeterminate))
      customStyles.boxShadow = checkedBoxShadow

    // Focus styles
    const focusStyles = [
      'focus:ring-2',
      focusRingColor ? '' : 'focus:ring-blue-500',
      focusRingOffset ? '' : 'focus:ring-offset-2',
    ]
      .filter(Boolean)
      .join(' ')

    // Add CSS custom properties for Tailwind
    type ExtendedCSSProperties = React.CSSProperties & Record<string, string>

    if (focusRingColor) {
      ;(customStyles as ExtendedCSSProperties)['--tw-ring-color'] = focusRingColor
    }
    if (focusRingWidth) {
      ;(customStyles as ExtendedCSSProperties)['--tw-ring-width'] = focusRingWidth
    }
    if (focusRingOffset) {
      ;(customStyles as ExtendedCSSProperties)['--tw-ring-offset-width'] = focusRingOffset
    }
    if (_focusBorderColor) {
      ;(customStyles as ExtendedCSSProperties)['--tw-ring-offset-color'] = _focusBorderColor
    }

    return (
      <div className="relative">
        <input ref={ref} id={inputId} type="checkbox" className="sr-only" {...props} />
        <div
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            statusStyles[status],
            stateStyles,
            transitionStyles[transition],
            focusStyles,
            className
          )}
          style={customStyles}
        >
          {isLoading ? (
            <CheckboxLoadingIcon />
          ) : isIndeterminate ? (
            <CheckboxIndeterminateIcon />
          ) : isChecked ? (
            <CheckboxCheckIcon />
          ) : null}
        </div>
      </div>
    )
  }
)

CheckboxInput.displayName = 'CheckboxInput'

// Icon components
const CheckboxCheckIcon = React.memo(() => {
  const { size, checkmarkColor } = useCheckbox()

  const sizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const customStyles: React.CSSProperties = {}
  if (checkmarkColor) customStyles.color = checkmarkColor

  return (
    <svg
      className={cn('text-white', sizeStyles[size])}
      style={customStyles}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
})

CheckboxCheckIcon.displayName = 'CheckboxCheckIcon'

const CheckboxIndeterminateIcon = React.memo(() => {
  const { size, indeterminateColor } = useCheckbox()

  const sizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const customStyles: React.CSSProperties = {}
  if (indeterminateColor) customStyles.color = indeterminateColor

  return (
    <svg
      className={cn('text-white', sizeStyles[size])}
      style={customStyles}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
})

CheckboxIndeterminateIcon.displayName = 'CheckboxIndeterminateIcon'

const CheckboxLoadingIcon = React.memo(() => {
  const { size } = useCheckbox()

  const sizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <svg
      className={cn('animate-spin text-gray-400', sizeStyles[size])}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
})

CheckboxLoadingIcon.displayName = 'CheckboxLoadingIcon'

// Sub-components
export interface CheckboxLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const CheckboxLabel = React.forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  ({ className, style, children, ...props }, ref) => {
    const {
      inputId,
      labelId,
      isDisabled,
      size,
      labelFontSize,
      labelTextSize,
      labelFontWeight,
      labelFontFamily,
      labelTextColor,
    } = useCheckbox()

    // Size styles
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    // Custom styles
    const customStyles: React.CSSProperties = { ...style }
    if (labelFontSize || labelTextSize) customStyles.fontSize = labelTextSize || labelFontSize
    if (labelFontWeight) customStyles.fontWeight = labelFontWeight
    if (labelFontFamily) customStyles.fontFamily = labelFontFamily
    if (labelTextColor) customStyles.color = labelTextColor

    return (
      <label
        ref={ref}
        id={labelId}
        htmlFor={inputId}
        className={cn(
          'font-medium leading-tight',
          sizeStyles[size],
          isDisabled && 'opacity-50 cursor-not-allowed',
          !isDisabled && 'cursor-pointer',
          className
        )}
        style={customStyles}
        {...props}
      >
        {children}
      </label>
    )
  }
)

CheckboxLabel.displayName = 'CheckboxLabel'

// Description component
export interface CheckboxDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CheckboxDescription = React.forwardRef<HTMLParagraphElement, CheckboxDescriptionProps>(
  ({ className, style, children, ...props }, ref) => {
    const { descriptionId, isDisabled, size, descriptionFontSize, descriptionTextColor } =
      useCheckbox()

    // Size styles
    const sizeStyles = {
      sm: 'text-xs mt-1',
      md: 'text-sm mt-1',
      lg: 'text-base mt-2',
    }

    // Custom styles
    const customStyles: React.CSSProperties = { ...style }
    if (descriptionFontSize) customStyles.fontSize = descriptionFontSize
    if (descriptionTextColor) customStyles.color = descriptionTextColor

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn('text-gray-600', sizeStyles[size], isDisabled && 'opacity-50', className)}
        style={customStyles}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CheckboxDescription.displayName = 'CheckboxDescription'

// Helper text component
export interface CheckboxHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CheckboxHelperText = React.forwardRef<HTMLParagraphElement, CheckboxHelperTextProps>(
  ({ className, style, children, ...props }, ref) => {
    const { helperTextId, isDisabled, size, helperTextColor } = useCheckbox()

    // Size styles
    const sizeStyles = {
      sm: 'text-xs mt-1',
      md: 'text-sm mt-1',
      lg: 'text-base mt-2',
    }

    // Custom styles
    const customStyles: React.CSSProperties = { ...style }
    if (helperTextColor) customStyles.color = helperTextColor

    return (
      <p
        ref={ref}
        id={helperTextId}
        className={cn('text-gray-500', sizeStyles[size], isDisabled && 'opacity-50', className)}
        style={customStyles}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CheckboxHelperText.displayName = 'CheckboxHelperText'

// Error text component
export interface CheckboxErrorTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CheckboxErrorText = React.forwardRef<HTMLParagraphElement, CheckboxErrorTextProps>(
  ({ className, style, children, ...props }, ref) => {
    const { errorTextId, isDisabled, size, errorTextColor } = useCheckbox()

    // Size styles
    const sizeStyles = {
      sm: 'text-xs mt-1',
      md: 'text-sm mt-1',
      lg: 'text-base mt-2',
    }

    // Custom styles
    const customStyles: React.CSSProperties = { ...style }
    if (errorTextColor) customStyles.color = errorTextColor

    return (
      <p
        ref={ref}
        id={errorTextId}
        className={cn('text-red-600', sizeStyles[size], isDisabled && 'opacity-50', className)}
        style={customStyles}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CheckboxErrorText.displayName = 'CheckboxErrorText'

// Group component
const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      children,
      className,
      value,
      defaultValue = [],
      onChange,
      disabled = false,
      required = false,
      variant = 'default',
      size = 'md',
      status = 'default',
      label,
      description,
      helperText,
      errorText,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = useCallback(
      (newValue: string[]) => {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [isControlled, onChange]
    )

    const groupUtils = useMemo(() => {
      const isSelected = (itemValue: string) => currentValue.includes(itemValue)
      const toggleItem = (itemValue: string) => {
        const newValue = isSelected(itemValue)
          ? currentValue.filter((v) => v !== itemValue)
          : [...currentValue, itemValue]
        handleChange(newValue)
      }
      const selectAll = () => {}
      const selectNone = () => handleChange([])
      const allSelected = false
      const isIndeterminate = currentValue.length > 0 && !allSelected

      return { isSelected, toggleItem, selectAll, selectNone, allSelected, isIndeterminate }
    }, [currentValue, handleChange])

    const contextValue = useMemo<CheckboxGroupContextValue>(
      () => ({
        value: currentValue,
        onChange: handleChange,
        isDisabled: disabled,
        isRequired: required,
        variant,
        size,
        status,
        ...groupUtils,
      }),
      [currentValue, handleChange, disabled, required, variant, size, status, groupUtils]
    )

    const groupId = useId()
    const labelId = label ? `${groupId}-label` : undefined
    const descriptionId = description ? `${groupId}-description` : undefined
    const helperTextId = helperText ? `${groupId}-helper` : undefined
    const errorTextId = errorText ? `${groupId}-error` : undefined

    const computedAriaDescribedby =
      [ariaDescribedby, descriptionId, helperTextId, errorTextId].filter(Boolean).join(' ') ||
      undefined

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('space-y-2', className)}
          role="group"
          aria-label={ariaLabel}
          aria-describedby={computedAriaDescribedby}
          aria-required={required}
          {...props}
        >
          {label && (
            <div id={labelId} className="font-medium text-gray-900">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}
          {description && (
            <p id={descriptionId} className="text-sm text-gray-600">
              {description}
            </p>
          )}
          <div className="space-y-2">{children}</div>
          {helperText && !errorText && (
            <p id={helperTextId} className="text-sm text-gray-500">
              {helperText}
            </p>
          )}
          {errorText && (
            <p id={errorTextId} className="text-sm text-red-600">
              {errorText}
            </p>
          )}
        </div>
      </CheckboxGroupContext.Provider>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

// Item component for use within groups
const CheckboxItem = React.forwardRef<HTMLInputElement, CheckboxItemProps>(
  ({ value, children, ...props }, ref) => {
    const groupContext = useCheckboxGroup()

    if (!groupContext) {
      throw new Error('CheckboxItem must be used within a CheckboxGroup')
    }

    const { isSelected, toggleItem, isDisabled, variant, size, status } = groupContext

    const handleChange = useCallback(() => {
      toggleItem(value)
    }, [toggleItem, value])

    return (
      <Checkbox
        ref={ref}
        checked={isSelected(value)}
        onChange={handleChange}
        disabled={isDisabled}
        variant={variant}
        size={size}
        status={status}
        {...props}
      >
        {children}
      </Checkbox>
    )
  }
)

CheckboxItem.displayName = 'CheckboxItem'

// Select All component
export interface CheckboxSelectAllProps
  extends Omit<CheckboxProps, 'checked' | 'indeterminate' | 'onChange'> {
  children?: React.ReactNode
}

const CheckboxSelectAll = React.forwardRef<HTMLInputElement, CheckboxSelectAllProps>(
  ({ children, ...props }, ref) => {
    const groupContext = useCheckboxGroup()

    if (!groupContext) {
      throw new Error('CheckboxSelectAll must be used within a CheckboxGroup')
    }

    const { allSelected, isIndeterminate, selectAll, selectNone } = groupContext

    const handleChange = useCallback(
      (checked: boolean) => {
        if (checked) {
          selectAll()
        } else {
          selectNone()
        }
      },
      [selectAll, selectNone]
    )

    return (
      <Checkbox
        ref={ref}
        checked={allSelected}
        indeterminate={isIndeterminate}
        onChange={handleChange}
        {...props}
      >
        {children}
      </Checkbox>
    )
  }
)

CheckboxSelectAll.displayName = 'CheckboxSelectAll'

// Compound component interface
interface CheckboxComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Input: typeof CheckboxInput
  Label: typeof CheckboxLabel
  Description: typeof CheckboxDescription
  HelperText: typeof CheckboxHelperText
  ErrorText: typeof CheckboxErrorText
  Group: typeof CheckboxGroup
  Item: typeof CheckboxItem
  SelectAll: typeof CheckboxSelectAll
}

// Attach sub-components
const CheckboxCompound = Checkbox as CheckboxComponent
CheckboxCompound.Input = CheckboxInput
CheckboxCompound.Label = CheckboxLabel
CheckboxCompound.Description = CheckboxDescription
CheckboxCompound.HelperText = CheckboxHelperText
CheckboxCompound.ErrorText = CheckboxErrorText
CheckboxCompound.Group = CheckboxGroup
CheckboxCompound.Item = CheckboxItem
CheckboxCompound.SelectAll = CheckboxSelectAll

export {
  CheckboxCompound as Checkbox,
  CheckboxInput,
  CheckboxLabel,
  CheckboxDescription,
  CheckboxHelperText,
  CheckboxErrorText,
  CheckboxGroup,
  CheckboxItem,
  CheckboxSelectAll,
  CheckboxCheckIcon,
  CheckboxIndeterminateIcon,
  CheckboxLoadingIcon,
}

export default CheckboxCompound
