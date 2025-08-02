import React, { createContext, useContext, forwardRef, useState, useCallback } from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export interface RadioGroupContextValue {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  loading?: boolean
  variant?: RadioGroupVariant
  size?: RadioGroupSize
  status?: RadioGroupStatus
  name?: string
}

export type RadioGroupVariant = 'default' | 'filled' | 'outlined' | 'ghost' | 'card'
export type RadioGroupSize = 'sm' | 'md' | 'lg'
export type RadioGroupStatus = 'default' | 'success' | 'warning' | 'error'
export type RadioGroupOrientation = 'horizontal' | 'vertical'

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Core props
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  loading?: boolean
  name?: string

  // Visual props
  variant?: RadioGroupVariant
  size?: RadioGroupSize
  status?: RadioGroupStatus
  orientation?: RadioGroupOrientation

  // Label and helper text
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorMessage?: string
  emptyMessage?: string

  // Animation props
  transition?: 'none' | 'slide' | 'fade' | 'bounce' | 'smooth'
  transitionDuration?: number

  // Container styles
  containerClassName?: string
  containerStyle?: React.CSSProperties
  backgroundColor?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  boxShadow?: string

  // Radio group specific styles
  gap?: string
  groupBackgroundColor?: string
  groupBorderWidth?: string
  groupBorderColor?: string
  groupBorderRadius?: string
  groupPadding?: string

  // Label styles
  labelColor?: string
  labelFontSize?: string
  labelFontWeight?: string
  labelFontFamily?: string

  // Helper text styles
  helperTextColor?: string
  helperTextFontSize?: string
  errorMessageColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  focusBoxShadow?: string

  // Custom render props
  renderLabel?: (required?: boolean) => React.ReactNode
  renderOption?: (
    option: RadioOptionProps,
    isSelected: boolean,
    isDisabled?: boolean
  ) => React.ReactNode

  // Status colors
  successColor?: string
  warningColor?: string
  errorColor?: string

  children?: React.ReactNode
}

export interface RadioOptionProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: string
  label?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode

  // Option-specific styles
  optionBackgroundColor?: string
  optionBorderColor?: string
  optionBorderWidth?: string
  optionBorderRadius?: string
  optionPadding?: string

  // Radio button styles
  radioSize?: string
  radioBackgroundColor?: string
  radioBorderColor?: string
  radioBorderWidth?: string
  radioCheckedColor?: string
  radioBoxShadow?: string

  // Label styles for this option
  labelColor?: string
  labelFontSize?: string
  labelFontWeight?: string
  descriptionColor?: string
  descriptionFontSize?: string

  // Focus styles for this option
  focusRingColor?: string
  focusRingWidth?: string
  focusBackgroundColor?: string

  // Hover styles
  hoverBackgroundColor?: string
  hoverBorderColor?: string

  children?: React.ReactNode
}

export interface RadioGroupLabelProps {
  className?: string
  style?: React.CSSProperties
  required?: boolean
  children: React.ReactNode
}

export interface RadioGroupHelperTextProps {
  className?: string
  style?: React.CSSProperties
  id?: string
  children: React.ReactNode
}

// Context
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroup compound components must be used within a RadioGroup component')
  }
  return context
}

// Sub-components
export const RadioGroupLabel = forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ className, style, required, children, ...props }, ref) => {
    const context = useRadioGroupContext()

    const labelStyles = cn(
      'block text-sm font-medium mb-2',
      context.status === 'error' && 'text-red-600',
      context.status === 'success' && 'text-green-600',
      context.status === 'warning' && 'text-yellow-600',
      context.status === 'default' && 'text-gray-700',
      context.disabled && 'text-gray-400',
      className
    )

    return (
      <label ref={ref} className={labelStyles} style={style} {...props}>
        {children}
        {(required || context.required) && <span className="text-red-500 ml-1">*</span>}
      </label>
    )
  }
)

RadioGroupLabel.displayName = 'RadioGroupLabel'

export const RadioGroupHelperText = forwardRef<HTMLDivElement, RadioGroupHelperTextProps>(
  ({ className, style, children, ...props }, ref) => {
    const context = useRadioGroupContext()

    const helperStyles = cn(
      'mt-2 text-xs',
      context.status === 'error' && 'text-red-600',
      context.status === 'success' && 'text-green-600',
      context.status === 'warning' && 'text-yellow-600',
      context.status === 'default' && 'text-gray-500',
      context.disabled && 'text-gray-400',
      className
    )

    return (
      <div ref={ref} className={helperStyles} style={style} {...props}>
        {children}
      </div>
    )
  }
)

RadioGroupHelperText.displayName = 'RadioGroupHelperText'

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  (
    {
      value,
      label,
      description,
      disabled = false,
      icon,
      checkedIcon,
      className,
      style,
      children,

      // Option-specific styles
      optionBackgroundColor,
      optionBorderColor,
      optionBorderWidth,
      optionBorderRadius,
      optionPadding,

      // Radio button styles
      radioSize,
      radioBackgroundColor,
      radioBorderColor,
      radioBorderWidth,
      radioCheckedColor: _radioCheckedColor,
      radioBoxShadow,

      // Label styles
      labelColor,
      labelFontSize,
      labelFontWeight,
      descriptionColor,
      descriptionFontSize,

      // Focus styles
      focusRingColor: _focusRingColor,
      focusRingWidth: _focusRingWidth,
      focusBackgroundColor,

      // Hover styles
      hoverBackgroundColor,
      hoverBorderColor,

      ...props
    },
    ref
  ) => {
    const context = useRadioGroupContext()
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const isSelected = context.value === value
    const isDisabled = disabled || context.disabled || context.loading

    const handleChange = useCallback(() => {
      if (!isDisabled && context.onChange) {
        context.onChange(value)
      }
    }, [isDisabled, context, value])

    // Get size dimensions
    const getSizeDimensions = () => {
      const dimensions = {
        sm: { radio: '16px', fontSize: '0.875rem', padding: '0.5rem' },
        md: { radio: '20px', fontSize: '1rem', padding: '0.75rem' },
        lg: { radio: '24px', fontSize: '1.125rem', padding: '1rem' },
      }
      return dimensions[context.size || 'md']
    }

    const dimensions = getSizeDimensions()

    // Get variant styles
    const getVariantStyles = () => {
      const variantStyles = {
        default: cn(
          'border bg-white hover:bg-gray-50',
          isSelected && 'border-blue-500 bg-blue-50',
          context.status === 'error' && 'border-red-300',
          context.status === 'success' && 'border-green-300',
          context.status === 'warning' && 'border-yellow-300',
          !isSelected && context.status === 'default' && 'border-gray-200'
        ),
        filled: cn(
          'border-0 bg-gray-100 hover:bg-gray-200',
          isSelected && 'bg-blue-100',
          context.status === 'error' && isSelected && 'bg-red-100',
          context.status === 'success' && isSelected && 'bg-green-100',
          context.status === 'warning' && isSelected && 'bg-yellow-100'
        ),
        outlined: cn(
          'border-2 bg-transparent hover:bg-gray-50',
          isSelected && 'border-blue-500 bg-blue-50',
          context.status === 'error' && 'border-red-500',
          context.status === 'success' && 'border-green-500',
          context.status === 'warning' && 'border-yellow-500',
          !isSelected && context.status === 'default' && 'border-gray-300'
        ),
        ghost: cn('border-0 bg-transparent hover:bg-gray-100', isSelected && 'bg-blue-100'),
        card: cn(
          'border bg-white hover:bg-gray-50 shadow-sm hover:shadow-md',
          isSelected && 'border-blue-500 bg-blue-50 shadow-md'
        ),
      }
      return variantStyles[context.variant || 'default']
    }

    // Option container styles
    const optionStyles = cn(
      'relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200',
      'focus-within:outline-none',
      getVariantStyles(),
      isDisabled && 'cursor-not-allowed opacity-50',
      isFocused && 'ring-2 ring-offset-1',
      isFocused && context.status === 'error' && 'ring-red-500',
      isFocused && context.status === 'success' && 'ring-green-500',
      isFocused && context.status === 'warning' && 'ring-yellow-500',
      isFocused && context.status === 'default' && 'ring-blue-500',
      className
    )

    // Radio button styles
    const radioStyles = cn(
      'mt-0.5 border-2 rounded-full flex-shrink-0 relative',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      isSelected && 'border-current',
      !isSelected && 'border-gray-300',
      isDisabled && 'cursor-not-allowed',
      context.status === 'error' && 'text-red-500',
      context.status === 'success' && 'text-green-500',
      context.status === 'warning' && 'text-yellow-500',
      context.status === 'default' && 'text-blue-500'
    )

    // Custom styles
    const customOptionStyles: React.CSSProperties = {
      backgroundColor:
        isHovered && hoverBackgroundColor ? hoverBackgroundColor : optionBackgroundColor,
      borderColor: isHovered && hoverBorderColor ? hoverBorderColor : optionBorderColor,
      borderWidth: optionBorderWidth,
      borderRadius: optionBorderRadius,
      padding: optionPadding || dimensions.padding,
      ...(isFocused && focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
      ...style,
    }

    const customRadioStyles: React.CSSProperties = {
      width: radioSize || dimensions.radio,
      height: radioSize || dimensions.radio,
      backgroundColor: radioBackgroundColor,
      borderColor: radioBorderColor,
      borderWidth: radioBorderWidth,
      boxShadow: radioBoxShadow,
      // Note: Focus ring color would be applied here if needed
    }

    const customLabelStyles: React.CSSProperties = {
      color: labelColor,
      fontSize: labelFontSize || dimensions.fontSize,
      fontWeight: labelFontWeight,
    }

    const customDescriptionStyles: React.CSSProperties = {
      color: descriptionColor,
      fontSize: descriptionFontSize,
    }

    return (
      <label
        className={optionStyles}
        style={customOptionStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleChange}
      >
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            name={context.name}
            value={value}
            checked={isSelected}
            disabled={isDisabled}
            required={context.required}
            className="sr-only"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            aria-describedby={description ? `${value}-description` : undefined}
            {...props}
          />

          <div className={radioStyles} style={customRadioStyles}>
            {isSelected && (
              <div className="absolute inset-1 rounded-full bg-current">
                {checkedIcon && (
                  <div className="flex items-center justify-center w-full h-full text-white">
                    {checkedIcon}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {icon && !isSelected && <div className="mb-1 text-gray-400">{icon}</div>}

          {(label || children) && (
            <div className="text-sm font-medium" style={customLabelStyles}>
              {label || children}
            </div>
          )}

          {description && (
            <div
              id={`${value}-description`}
              className="mt-1 text-xs text-gray-500"
              style={customDescriptionStyles}
            >
              {description}
            </div>
          )}
        </div>
      </label>
    )
  }
)

RadioOption.displayName = 'RadioOption'

// Main RadioGroup Component
const RadioGroupBase = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      // Core props
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      loading = false,
      name,

      // Visual props
      variant = 'default',
      size = 'md',
      status = 'default',
      orientation = 'vertical',

      // Content props
      children,
      label,
      helperText,
      errorMessage,
      emptyMessage,

      // Animation props
      transition: _transition = 'smooth',
      transitionDuration: _transitionDuration = 200,

      // Container styles
      className,
      style,
      containerClassName,
      containerStyle,
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding,
      paddingX,
      paddingY,
      boxShadow,

      // Radio group styles
      gap,
      groupBackgroundColor,
      groupBorderWidth,
      groupBorderColor,
      groupBorderRadius,
      groupPadding,

      // Label styles
      labelColor,
      labelFontSize,
      labelFontWeight,
      labelFontFamily,

      // Helper text styles
      helperTextColor,
      helperTextFontSize,
      errorMessageColor,

      // Focus styles
      focusRingColor: _focusRingColor2,
      focusRingWidth: _focusRingWidth2,
      focusRingOffset: _focusRingOffset,
      focusBorderColor: _focusBorderColor,
      focusBackgroundColor: _focusBackgroundColor,
      focusBoxShadow: _focusBoxShadow,

      // Custom render props
      renderLabel,
      renderOption,

      // Status colors
      successColor: _successColor,
      warningColor: _warningColor,
      errorColor: _errorColor,

      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '')

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleChange = useCallback(
      (newValue: string) => {
        if (disabled || loading) return

        if (!isControlled) {
          setUncontrolledValue(newValue)
        }

        onChange?.(newValue)
      },
      [disabled, loading, isControlled, onChange]
    )

    // Extract compound components from children
    let extractedLabel = label
    let extractedHelperText = helperText

    const radioOptions: React.ReactElement[] = []

    if (children) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === RadioGroupLabel) {
            extractedLabel = child.props.children
          } else if (child.type === RadioGroupHelperText) {
            extractedHelperText = child.props.children
          } else if (child.type === RadioOption) {
            radioOptions.push(child)
          }
        }
      })
    }

    // Context value
    const contextValue: RadioGroupContextValue = {
      value,
      onChange: handleChange,
      disabled,
      required,
      loading,
      variant,
      size,
      status,
      name,
    }

    // Container styles
    const containerStyles: React.CSSProperties = {
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding: padding || (paddingX || paddingY ? undefined : '0'),
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      boxShadow,
      ...containerStyle,
    }

    // Group styles
    const groupStyles = cn(
      'space-y-2',
      orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0',
      disabled && 'opacity-50'
    )

    const customGroupStyles: React.CSSProperties = {
      backgroundColor: groupBackgroundColor,
      borderWidth: groupBorderWidth,
      borderColor: groupBorderColor,
      borderRadius: groupBorderRadius,
      padding: groupPadding,
      gap: gap,
      ...style,
    }

    // Label styles
    const customLabelStyles: React.CSSProperties = {
      color: labelColor,
      fontSize: labelFontSize,
      fontWeight: labelFontWeight,
      fontFamily: labelFontFamily,
    }

    // Helper text styles
    const customHelperTextStyles: React.CSSProperties = {
      color: helperTextColor,
      fontSize: helperTextFontSize,
    }

    // Error message styles
    const customErrorStyles: React.CSSProperties = {
      color: errorMessageColor || _errorColor,
      fontSize: helperTextFontSize,
    }

    // Render options
    const renderOptions = () => {
      if (radioOptions.length === 0 && emptyMessage) {
        return <div className="text-sm text-gray-500 italic py-4 text-center">{emptyMessage}</div>
      }

      return radioOptions.map((option) => {
        if (renderOption) {
          return renderOption(
            option.props,
            value === option.props.value,
            disabled || option.props.disabled
          )
        }
        return option
      })
    }

    const labelContent = renderLabel ? renderLabel(required) : extractedLabel

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div className={cn('w-full', containerClassName)} style={containerStyles}>
          {labelContent && (
            <RadioGroupLabel required={required} style={customLabelStyles}>
              {labelContent}
            </RadioGroupLabel>
          )}

          <div
            ref={ref}
            role="radiogroup"
            aria-required={required}
            aria-invalid={status === 'error' || !!errorMessage}
            aria-describedby={
              errorMessage
                ? 'radiogroup-error'
                : extractedHelperText
                  ? 'radiogroup-helper'
                  : undefined
            }
            className={cn(groupStyles, className)}
            style={customGroupStyles}
            {...props}
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
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
                <span className="ml-2 text-sm text-gray-500">Loading options...</span>
              </div>
            ) : (
              renderOptions()
            )}
          </div>

          {extractedHelperText && !errorMessage && (
            <RadioGroupHelperText style={customHelperTextStyles}>
              {extractedHelperText}
            </RadioGroupHelperText>
          )}

          {errorMessage && (
            <RadioGroupHelperText style={customErrorStyles}>{errorMessage}</RadioGroupHelperText>
          )}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroupBase.displayName = 'RadioGroup'

// Compound component interface
interface RadioGroupComponent
  extends React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>> {
  Option: typeof RadioOption
  Label: typeof RadioGroupLabel
  HelperText: typeof RadioGroupHelperText
}

// Compound component exports
const RadioGroup = RadioGroupBase as unknown as RadioGroupComponent
RadioGroup.Option = RadioOption
RadioGroup.Label = RadioGroupLabel
RadioGroup.HelperText = RadioGroupHelperText

export { RadioGroup }
export default RadioGroup
