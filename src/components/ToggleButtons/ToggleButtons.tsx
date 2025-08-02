import React, { createContext, useContext, forwardRef, useState, useCallback } from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export type ToggleButtonsVariant = 'default' | 'filled' | 'outlined' | 'ghost' | 'elevated'
export type ToggleButtonsSize = 'sm' | 'md' | 'lg'
export type ToggleButtonsStatus = 'default' | 'success' | 'warning' | 'error'
export type ToggleButtonsOrientation = 'horizontal' | 'vertical'
export type ToggleButtonsSelectionMode = 'single' | 'multiple'

export interface ToggleButtonsContextValue {
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  disabled?: boolean
  required?: boolean
  loading?: boolean
  variant?: ToggleButtonsVariant
  size?: ToggleButtonsSize
  status?: ToggleButtonsStatus
  selectionMode?: ToggleButtonsSelectionMode
  name?: string
}

export interface ToggleButtonsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Core props
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  disabled?: boolean
  required?: boolean
  loading?: boolean
  name?: string
  selectionMode?: ToggleButtonsSelectionMode

  // Visual props
  variant?: ToggleButtonsVariant
  size?: ToggleButtonsSize
  status?: ToggleButtonsStatus
  orientation?: ToggleButtonsOrientation
  fullWidth?: boolean
  exclusive?: boolean

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

  // Group specific styles
  gap?: string
  groupBackgroundColor?: string
  groupBorderWidth?: string
  groupBorderColor?: string
  groupBorderRadius?: string
  groupPadding?: string

  // Button styles
  buttonBorderRadius?: string

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
  renderButton?: (
    button: ToggleButtonProps,
    isSelected: boolean,
    isDisabled?: boolean
  ) => React.ReactNode

  // Status colors
  successColor?: string
  warningColor?: string
  errorColor?: string

  children?: React.ReactNode
}

export interface ToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string
  label?: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  disabled?: boolean
  loading?: boolean
  loadingIcon?: React.ReactNode

  // Button-specific styles
  buttonBackgroundColor?: string
  buttonBackgroundColorSelected?: string
  buttonBorderColor?: string
  buttonBorderColorSelected?: string
  buttonBorderWidth?: string
  buttonBorderRadius?: string
  buttonPadding?: string
  buttonTextColor?: string
  buttonTextColorSelected?: string
  buttonBoxShadow?: string
  buttonBoxShadowSelected?: string

  // Label styles
  labelColor?: string
  labelColorSelected?: string
  labelFontSize?: string
  labelFontWeight?: string

  // Icon styles
  iconColor?: string
  iconColorSelected?: string
  iconSize?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusBackgroundColor?: string

  // Hover styles
  hoverBackgroundColor?: string
  hoverBorderColor?: string
  hoverTextColor?: string
  hoverScale?: string

  // Active styles
  activeBackgroundColor?: string
  activeScale?: string

  // Custom render
  renderContent?: (isSelected: boolean, isDisabled?: boolean) => React.ReactNode

  children?: React.ReactNode
}

export interface ToggleButtonsLabelProps {
  className?: string
  style?: React.CSSProperties
  required?: boolean
  children: React.ReactNode
}

export interface ToggleButtonsHelperTextProps {
  className?: string
  style?: React.CSSProperties
  id?: string
  children: React.ReactNode
}

// Context
const ToggleButtonsContext = createContext<ToggleButtonsContextValue | null>(null)

export const useToggleButtonsContext = () => {
  const context = useContext(ToggleButtonsContext)
  if (!context) {
    throw new Error(
      'ToggleButtons compound components must be used within a ToggleButtons component'
    )
  }
  return context
}

// Sub-components
export const ToggleButtonsLabel = forwardRef<HTMLLabelElement, ToggleButtonsLabelProps>(
  ({ className, style, required, children, ...props }, ref) => {
    const context = useToggleButtonsContext()

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

ToggleButtonsLabel.displayName = 'ToggleButtonsLabel'

export const ToggleButtonsHelperText = forwardRef<HTMLDivElement, ToggleButtonsHelperTextProps>(
  ({ className, style, children, ...props }, ref) => {
    const context = useToggleButtonsContext()

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

ToggleButtonsHelperText.displayName = 'ToggleButtonsHelperText'

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      value,
      label,
      icon,
      iconPosition = 'start',
      disabled = false,
      loading = false,
      loadingIcon,
      className,
      style,
      children,

      // Button-specific styles
      buttonBackgroundColor,
      buttonBackgroundColorSelected,
      buttonBorderColor,
      buttonBorderColorSelected,
      buttonBorderWidth,
      buttonBorderRadius,
      buttonPadding,
      buttonTextColor,
      buttonTextColorSelected,
      buttonBoxShadow,
      buttonBoxShadowSelected,

      // Label styles
      labelColor,
      labelColorSelected,
      labelFontSize,
      labelFontWeight,

      // Icon styles
      iconColor,
      iconColorSelected,
      iconSize,

      // Focus styles
      focusRingColor,
      focusRingWidth,
      focusBackgroundColor,

      // Hover styles
      hoverBackgroundColor,
      hoverBorderColor,
      hoverTextColor,
      hoverScale,

      // Active styles
      activeBackgroundColor,
      activeScale,

      // Custom render
      renderContent,

      ...props
    },
    ref
  ) => {
    const context = useToggleButtonsContext()
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const isSelected = Array.isArray(context.value)
      ? context.value.includes(value)
      : context.value === value

    const isDisabled = disabled || context.disabled || context.loading

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!isDisabled && context.onChange) {
          if (context.selectionMode === 'multiple' && Array.isArray(context.value)) {
            const newValue = isSelected
              ? context.value.filter((v) => v !== value)
              : [...context.value, value]
            context.onChange(newValue)
          } else {
            context.onChange(value)
          }
        }
      },
      [isDisabled, context, value, isSelected]
    )

    // Get size dimensions
    const getSizeDimensions = () => {
      const dimensions = {
        sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', iconSize: '1rem' },
        md: { padding: '0.625rem 1.25rem', fontSize: '1rem', iconSize: '1.25rem' },
        lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', iconSize: '1.5rem' },
      }
      return dimensions[context.size || 'md']
    }

    const dimensions = getSizeDimensions()

    // Get variant styles
    const getVariantStyles = () => {
      const variantStyles = {
        default: cn(
          'border bg-white hover:bg-gray-50',
          isSelected && 'border-blue-500 bg-blue-50 text-blue-700',
          context.status === 'error' && 'border-red-300',
          context.status === 'success' && 'border-green-300',
          context.status === 'warning' && 'border-yellow-300',
          !isSelected && context.status === 'default' && 'border-gray-300 text-gray-700'
        ),
        filled: cn(
          'border-0',
          isSelected
            ? cn(
                'bg-blue-600 text-white',
                context.status === 'error' && 'bg-red-600',
                context.status === 'success' && 'bg-green-600',
                context.status === 'warning' && 'bg-yellow-600'
              )
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ),
        outlined: cn(
          'border-2 bg-transparent',
          isSelected
            ? cn(
                'border-blue-500 text-blue-600',
                context.status === 'error' && 'border-red-500 text-red-600',
                context.status === 'success' && 'border-green-500 text-green-600',
                context.status === 'warning' && 'border-yellow-500 text-yellow-600'
              )
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        ),
        ghost: cn(
          'border-0 bg-transparent',
          isSelected
            ? cn(
                'bg-blue-100 text-blue-700',
                context.status === 'error' && 'bg-red-100 text-red-700',
                context.status === 'success' && 'bg-green-100 text-green-700',
                context.status === 'warning' && 'bg-yellow-100 text-yellow-700'
              )
            : 'text-gray-700 hover:bg-gray-100'
        ),
        elevated: cn(
          'border-0 bg-white shadow-md hover:shadow-lg',
          isSelected && 'bg-blue-50 text-blue-700 shadow-xl',
          !isSelected && 'text-gray-700'
        ),
      }
      return variantStyles[context.variant || 'default']
    }

    // Button styles
    const buttonStyles = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
      getVariantStyles(),
      isDisabled && 'cursor-not-allowed opacity-50',
      isFocused && context.status === 'error' && 'ring-red-500',
      isFocused && context.status === 'success' && 'ring-green-500',
      isFocused && context.status === 'warning' && 'ring-yellow-500',
      isFocused && context.status === 'default' && 'ring-blue-500',
      className
    )

    // Custom styles
    const customButtonStyles: React.CSSProperties = {
      backgroundColor: isSelected
        ? buttonBackgroundColorSelected || (isHovered ? hoverBackgroundColor : undefined)
        : buttonBackgroundColor || (isHovered ? hoverBackgroundColor : undefined),
      borderColor: isSelected
        ? buttonBorderColorSelected || (isHovered ? hoverBorderColor : undefined)
        : buttonBorderColor || (isHovered ? hoverBorderColor : undefined),
      borderWidth: buttonBorderWidth,
      borderRadius: buttonBorderRadius || '0.375rem',
      padding: buttonPadding || dimensions.padding,
      color: isSelected
        ? buttonTextColorSelected || (isHovered ? hoverTextColor : undefined)
        : buttonTextColor || (isHovered ? hoverTextColor : undefined),
      boxShadow: isSelected ? buttonBoxShadowSelected : buttonBoxShadow,
      transform: `scale(${isActive && activeScale ? activeScale : isHovered && hoverScale ? hoverScale : '1'})`,
      ...(isFocused && focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
      ...(isFocused &&
        ({
          '--tw-ring-color': focusRingColor,
          '--tw-ring-width': focusRingWidth,
        } as React.CSSProperties)),
      ...(isActive && activeBackgroundColor && { backgroundColor: activeBackgroundColor }),
      ...style,
    }

    // Label styles
    const customLabelStyles: React.CSSProperties = {
      color: isSelected && labelColorSelected ? labelColorSelected : labelColor,
      fontSize: labelFontSize || dimensions.fontSize,
      fontWeight: labelFontWeight,
    }

    // Icon styles
    const customIconStyles: React.CSSProperties = {
      color: isSelected && iconColorSelected ? iconColorSelected : iconColor,
      width: iconSize || dimensions.iconSize,
      height: iconSize || dimensions.iconSize,
    }

    const renderButtonContent = () => {
      if (renderContent) {
        return renderContent(isSelected, isDisabled)
      }

      if (loading) {
        return (
          <>
            {loadingIcon || (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
            )}
            <span className="ml-2">Loading...</span>
          </>
        )
      }

      return (
        <>
          {icon && iconPosition === 'start' && (
            <span className="inline-flex items-center justify-center mr-2" style={customIconStyles}>
              {icon}
            </span>
          )}
          {(label || children) && <span style={customLabelStyles}>{label || children}</span>}
          {icon && iconPosition === 'end' && (
            <span className="inline-flex items-center justify-center ml-2" style={customIconStyles}>
              {icon}
            </span>
          )}
        </>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        value={value}
        disabled={isDisabled}
        className={buttonStyles}
        style={customButtonStyles}
        onClick={handleClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        aria-pressed={isSelected}
        aria-disabled={isDisabled}
        role="button"
        {...props}
      >
        {renderButtonContent()}
      </button>
    )
  }
)

ToggleButton.displayName = 'ToggleButton'

// Main ToggleButtons Component
const ToggleButtonsBase = forwardRef<HTMLDivElement, ToggleButtonsProps>(
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
      selectionMode = 'single',

      // Visual props
      variant = 'default',
      size = 'md',
      status = 'default',
      orientation = 'horizontal',
      fullWidth = false,
      exclusive: _exclusive = false,

      // Content props
      children,
      label,
      helperText,
      errorMessage,
      emptyMessage,

      // Animation props
      transition = 'smooth',
      transitionDuration = 200,

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

      // Group styles
      gap,
      groupBackgroundColor,
      groupBorderWidth,
      groupBorderColor,
      groupBorderRadius,
      groupPadding,

      // Button styles
      buttonBorderRadius,

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
      focusRingColor: _focusRingColor,
      focusRingWidth: _focusRingWidth,
      focusRingOffset: _focusRingOffset,
      focusBorderColor: _focusBorderColor,
      focusBackgroundColor: _focusBackgroundColor,
      focusBoxShadow: _focusBoxShadow,

      // Custom render props
      renderLabel,
      renderButton,

      // Status colors
      successColor: _successColor,
      warningColor: _warningColor,
      errorColor,

      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
      defaultValue || (selectionMode === 'multiple' ? [] : '')
    )

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleChange = useCallback(
      (newValue: string | string[]) => {
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

    const toggleButtons: React.ReactElement[] = []

    if (children) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === ToggleButtonsLabel) {
            extractedLabel = child.props.children
          } else if (child.type === ToggleButtonsHelperText) {
            extractedHelperText = child.props.children
          } else if (child.type === ToggleButton) {
            toggleButtons.push(child)
          }
        }
      })
    }

    // Context value
    const contextValue: ToggleButtonsContextValue = {
      value,
      onChange: handleChange,
      disabled,
      required,
      loading,
      variant,
      size,
      status,
      selectionMode,
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
      'inline-flex',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      fullWidth && 'w-full',
      disabled && 'opacity-50'
    )

    const customGroupStyles: React.CSSProperties = {
      backgroundColor: groupBackgroundColor,
      borderWidth: groupBorderWidth,
      borderColor: groupBorderColor,
      borderRadius: groupBorderRadius || '0.375rem',
      padding: groupPadding,
      gap: gap || '0.25rem',
      transition: transition !== 'none' ? `all ${transitionDuration}ms ease-in-out` : undefined,
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
      color: errorMessageColor || errorColor,
      fontSize: helperTextFontSize,
    }

    // Render buttons
    const renderButtons = () => {
      if (toggleButtons.length === 0 && emptyMessage) {
        return <div className="text-sm text-gray-500 italic py-4 text-center">{emptyMessage}</div>
      }

      return toggleButtons.map((button, index) => {
        if (renderButton) {
          return renderButton(
            button.props,
            Array.isArray(value)
              ? value.includes(button.props.value)
              : value === button.props.value,
            disabled || button.props.disabled
          )
        }

        // Add rounded corners based on position
        const isFirst = index === 0
        const isLast = index === toggleButtons.length - 1
        const positionStyles: React.CSSProperties = {}

        // Get the button's border radius (from props or default)
        const buttonRadius = button.props.buttonBorderRadius || buttonBorderRadius || '0.375rem'

        if (orientation === 'horizontal' && toggleButtons.length > 1) {
          if (isFirst) {
            positionStyles.borderTopLeftRadius = buttonRadius
            positionStyles.borderBottomLeftRadius = buttonRadius
            positionStyles.borderTopRightRadius = '0'
            positionStyles.borderBottomRightRadius = '0'
          } else if (isLast) {
            positionStyles.borderTopLeftRadius = '0'
            positionStyles.borderBottomLeftRadius = '0'
            positionStyles.borderTopRightRadius = buttonRadius
            positionStyles.borderBottomRightRadius = buttonRadius
          } else {
            positionStyles.borderRadius = '0'
          }
          if (!isFirst) {
            positionStyles.marginLeft = '-1px'
          }
        } else {
          // For vertical orientation or single button, use full border radius
          positionStyles.borderRadius = buttonRadius
        }

        return React.cloneElement(button, {
          key: button.props.value,
          style: { ...button.props.style, ...positionStyles },
          className: cn(button.props.className, fullWidth && 'flex-1'),
        })
      })
    }

    const labelContent = renderLabel ? renderLabel(required) : extractedLabel

    return (
      <ToggleButtonsContext.Provider value={contextValue}>
        <div className={cn('w-full', containerClassName)} style={containerStyles}>
          {labelContent && (
            <ToggleButtonsLabel required={required} style={customLabelStyles}>
              {labelContent}
            </ToggleButtonsLabel>
          )}

          <div
            ref={ref}
            role="group"
            aria-required={required}
            aria-invalid={status === 'error' || !!errorMessage}
            aria-describedby={
              errorMessage
                ? 'togglebuttons-error'
                : extractedHelperText
                  ? 'togglebuttons-helper'
                  : undefined
            }
            className={cn(groupStyles, className)}
            style={customGroupStyles}
            {...props}
          >
            {loading ? (
              <div className="flex items-center justify-center py-4">
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
                <span className="ml-2 text-sm text-gray-500">Loading buttons...</span>
              </div>
            ) : (
              renderButtons()
            )}
          </div>

          {extractedHelperText && !errorMessage && (
            <ToggleButtonsHelperText id="togglebuttons-helper" style={customHelperTextStyles}>
              {extractedHelperText}
            </ToggleButtonsHelperText>
          )}

          {errorMessage && (
            <ToggleButtonsHelperText id="togglebuttons-error" style={customErrorStyles}>
              {errorMessage}
            </ToggleButtonsHelperText>
          )}
        </div>
      </ToggleButtonsContext.Provider>
    )
  }
)

ToggleButtonsBase.displayName = 'ToggleButtons'

// Compound component interface
interface ToggleButtonsComponent
  extends React.ForwardRefExoticComponent<
    ToggleButtonsProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: typeof ToggleButton
  Label: typeof ToggleButtonsLabel
  HelperText: typeof ToggleButtonsHelperText
}

// Compound component exports
const ToggleButtons = ToggleButtonsBase as unknown as ToggleButtonsComponent
ToggleButtons.Button = ToggleButton
ToggleButtons.Label = ToggleButtonsLabel
ToggleButtons.HelperText = ToggleButtonsHelperText

export { ToggleButtons }
export default ToggleButtons
