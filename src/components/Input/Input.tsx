import React, { createContext, useContext, forwardRef, memo, useState } from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export interface InputContextValue {
  variant: InputVariant
  size: InputSize
  status: InputStatus
  isDisabled: boolean
  isLoading: boolean
  isRequired: boolean
  isFocused: boolean
  hasError: boolean
  hasIcon: boolean
  iconPosition: 'left' | 'right'
  value?: string
  onChange?: (value: string) => void
}

export type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost' | 'underlined'
export type InputSize = 'sm' | 'md' | 'lg'
export type InputStatus = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface InputBaseProps {
  // Core props
  variant?: InputVariant
  size?: InputSize
  status?: InputStatus
  disabled?: boolean
  loading?: boolean
  required?: boolean
  readOnly?: boolean

  // Content props
  label?: string
  helperText?: string
  placeholder?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loadingText?: string
  loadingSpinner?: React.ReactNode

  // Input specific props
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
  autoComplete?: string
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  step?: string | number
  min?: string | number
  max?: string | number

  // Styling props
  className?: string
  style?: React.CSSProperties

  // Border styling
  borderWidth?: string | number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderRadius?: string | number

  // Typography
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  textColor?: string
  placeholderColor?: string

  // Colors
  backgroundColor?: string
  hoverBackgroundColor?: string
  focusBackgroundColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string | number
  focusRingOffset?: string | number
  focusBorderColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string

  // Spacing
  padding?: string | number
  paddingX?: string | number
  paddingY?: string | number
  margin?: string | number
  marginX?: string | number
  marginY?: string | number

  // Layout
  width?: string | number
  height?: string | number
  minWidth?: string | number
  maxWidth?: string | number

  // Transitions
  transitionDuration?: string
  transitionProperty?: string
  transitionTimingFunction?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean

  // Event handlers
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputBaseProps>,
    InputBaseProps {
  value?: string
  defaultValue?: string
  children?: React.ReactNode
}

export interface InputIconProps {
  className?: string
  style?: React.CSSProperties
  color?: string
  size?: string | number
  children: React.ReactNode
}

export interface InputLabelProps {
  className?: string
  style?: React.CSSProperties
  required?: boolean
  children: React.ReactNode
}

export interface InputHelperTextProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

// Context
const InputContext = createContext<InputContextValue | null>(null)

export const useInputContext = () => {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('Input compound components must be used within an Input component')
  }
  return context
}

// Sub-components
export const InputIcon = memo(
  forwardRef<HTMLSpanElement, InputIconProps>(
    ({ className, style, color, size, children, ...props }, ref) => {
      const context = useInputContext()

      const iconStyles = cn(
        'absolute inset-y-0 flex items-center justify-center pointer-events-none',
        context.size === 'sm' && 'w-8',
        context.size === 'md' && 'w-10',
        context.size === 'lg' && 'w-12',
        context.iconPosition === 'left' && 'left-0',
        context.iconPosition === 'right' && 'right-0',
        context.isDisabled && 'opacity-50',
        className
      )

      return (
        <span
          ref={ref}
          className={iconStyles}
          style={{ color, fontSize: size, ...style }}
          {...props}
        >
          {children}
        </span>
      )
    }
  )
)

InputIcon.displayName = 'InputIcon'

export const InputLabel = memo(
  forwardRef<HTMLLabelElement, InputLabelProps>(
    ({ className, style, required, children, ...props }, ref) => {
      const context = useInputContext()

      const labelStyles = cn(
        'block text-sm font-medium mb-1',
        context.status === 'error' && 'text-red-600',
        context.status === 'success' && 'text-green-600',
        context.status === 'warning' && 'text-yellow-600',
        context.status === 'info' && 'text-blue-600',
        context.status === 'default' && 'text-gray-700',
        context.isDisabled && 'text-gray-400',
        className
      )

      return (
        <label ref={ref} className={labelStyles} style={style} {...props}>
          {children}
          {(required || context.isRequired) && <span className="text-red-500 ml-1">*</span>}
        </label>
      )
    }
  )
)

InputLabel.displayName = 'InputLabel'

export const InputHelperText = memo(
  forwardRef<HTMLDivElement, InputHelperTextProps>(
    ({ className, style, children, ...props }, ref) => {
      const context = useInputContext()

      const helperStyles = cn(
        'mt-1 text-xs',
        context.status === 'error' && 'text-red-600',
        context.status === 'success' && 'text-green-600',
        context.status === 'warning' && 'text-yellow-600',
        context.status === 'info' && 'text-blue-600',
        context.status === 'default' && 'text-gray-500',
        context.isDisabled && 'text-gray-400',
        className
      )

      return (
        <div ref={ref} className={helperStyles} style={style} {...props}>
          {children}
        </div>
      )
    }
  )
)

InputHelperText.displayName = 'InputHelperText'

// Main Input Component
const InputBase = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        // Core props
        variant = 'default',
        size = 'md',
        status = 'default',
        disabled = false,
        loading = false,
        required = false,
        readOnly = false,

        // Content props
        children,
        label,
        helperText,
        placeholder,
        icon,
        iconPosition = 'left',
        loadingText,
        loadingSpinner,

        // Input specific props
        type = 'text',
        value,
        defaultValue,
        autoComplete,
        autoFocus,
        maxLength,
        minLength,
        pattern,
        step,
        min,
        max,

        // Styling props
        className,
        style = {},

        // Border styling
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,

        // Typography
        fontSize,
        fontWeight,
        fontFamily,
        textColor,
        placeholderColor,

        // Colors
        backgroundColor,
        focusBackgroundColor,

        // Focus styles
        focusBorderColor,

        // Shadows
        boxShadow,
        focusBoxShadow,

        // Spacing
        padding,
        paddingX,
        paddingY,
        margin,
        marginX,
        marginY,

        // Layout
        width,
        height,
        minWidth,
        maxWidth,

        // Transitions
        transitionDuration = '150ms',
        transitionProperty = 'all',
        transitionTimingFunction = 'ease-in-out',

        // Event handlers
        onFocus,
        onBlur,
        onChange,
        onKeyDown,
        onKeyUp,
        onClick,

        // Rest of props
        ...props
      },
      ref
    ) => {
      const [isFocused, setIsFocused] = useState(false)

      const isDisabled = disabled || loading
      const hasError = status === 'error'
      const hasIcon = Boolean(icon)

      // Extract compound components from children
      let extractedLabel = label
      let extractedHelperText = helperText
      let extractedIcon = icon

      if (children) {
        React.Children.forEach(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === InputLabel) {
              extractedLabel = child.props.children
            } else if (child.type === InputHelperText) {
              extractedHelperText = child.props.children
            } else if (child.type === InputIcon) {
              extractedIcon = child.props.children
            }
          }
        })
      }

      // Context value
      const contextValue: InputContextValue = {
        variant,
        size,
        status,
        isDisabled,
        isLoading: loading,
        isRequired: required,
        isFocused,
        hasError,
        hasIcon: Boolean(extractedIcon || icon),
        iconPosition,
        value: typeof value === 'string' ? value : undefined,
        onChange: onChange
          ? (val: string) =>
              onChange({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>)
          : undefined,
      }

      // Base styles
      const baseStyles = cn(
        'relative flex items-center w-full transition-all',
        'focus-within:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )

      // Variant styles
      const variantStyles = {
        default: cn(
          'border bg-white dark:bg-gray-800',
          'focus-within:ring-2 focus-within:ring-offset-1',
          hasError && 'border-red-500 focus-within:ring-red-500',
          status === 'success' && 'border-green-500 focus-within:ring-green-500',
          status === 'warning' && 'border-yellow-500 focus-within:ring-yellow-500',
          status === 'info' && 'border-blue-500 focus-within:ring-blue-500',
          status === 'default' && 'border-gray-300 focus-within:ring-blue-500'
        ),
        filled: cn(
          'border-0 bg-gray-100',
          'focus-within:ring-2 focus-within:ring-offset-1',
          hasError && 'bg-red-50 focus-within:ring-red-500',
          status === 'success' && 'bg-green-50 focus-within:ring-green-500',
          status === 'warning' && 'bg-yellow-50 focus-within:ring-yellow-500',
          status === 'info' && 'bg-blue-50 focus-within:ring-blue-500',
          status === 'default' && 'focus-within:ring-blue-500'
        ),
        outlined: cn(
          'border-2 bg-transparent',
          'focus-within:ring-0',
          hasError && 'border-red-500 focus-within:border-red-600',
          status === 'success' && 'border-green-500 focus-within:border-green-600',
          status === 'warning' && 'border-yellow-500 focus-within:border-yellow-600',
          status === 'info' && 'border-blue-500 focus-within:border-blue-600',
          status === 'default' && 'border-gray-300 focus-within:border-blue-500'
        ),
        ghost: cn(
          'border-0 bg-transparent',
          'focus-within:ring-2 focus-within:ring-offset-1',
          hasError && 'focus-within:ring-red-500',
          status === 'success' && 'focus-within:ring-green-500',
          status === 'warning' && 'focus-within:ring-yellow-500',
          status === 'info' && 'focus-within:ring-blue-500',
          status === 'default' && 'focus-within:ring-blue-500'
        ),
        underlined: cn(
          'border-0 border-b-2 bg-transparent rounded-none',
          'focus-within:ring-0',
          hasError && 'border-red-500 focus-within:border-red-600',
          status === 'success' && 'border-green-500 focus-within:border-green-600',
          status === 'warning' && 'border-yellow-500 focus-within:border-yellow-600',
          status === 'info' && 'border-blue-500 focus-within:border-blue-600',
          status === 'default' && 'border-gray-300 focus-within:border-blue-500'
        ),
      }

      // Size styles
      const sizeStyles = {
        sm: cn(
          'h-8 text-xs rounded-md',
          variant !== 'underlined' && 'px-2',
          hasIcon && iconPosition === 'left' && 'pl-8',
          hasIcon && iconPosition === 'right' && 'pr-8'
        ),
        md: cn(
          'h-10 text-sm rounded-md',
          variant !== 'underlined' && 'px-3',
          hasIcon && iconPosition === 'left' && 'pl-10',
          hasIcon && iconPosition === 'right' && 'pr-10'
        ),
        lg: cn(
          'h-12 text-base rounded-lg',
          variant !== 'underlined' && 'px-4',
          hasIcon && iconPosition === 'left' && 'pl-12',
          hasIcon && iconPosition === 'right' && 'pr-12'
        ),
      }

      // Custom styles object
      const customStyles: React.CSSProperties = {
        ...style,
        // Border
        ...(borderWidth && {
          borderWidth: typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
        }),
        ...(borderColor && { borderColor }),
        ...(borderStyle && { borderStyle }),
        ...(borderRadius && {
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        }),
        // Typography
        ...(fontSize && { fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize }),
        ...(fontWeight && { fontWeight }),
        ...(fontFamily && { fontFamily }),
        ...(textColor && { color: textColor }),
        // Colors
        ...(backgroundColor && { backgroundColor }),
        // Shadows
        ...(boxShadow && { boxShadow }),
        // Spacing
        ...(padding && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
        ...(paddingX && {
          paddingLeft: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
          paddingRight: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
        }),
        ...(paddingY && {
          paddingTop: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
          paddingBottom: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
        }),
        ...(margin && { margin: typeof margin === 'number' ? `${margin}px` : margin }),
        ...(marginX && {
          marginLeft: typeof marginX === 'number' ? `${marginX}px` : marginX,
          marginRight: typeof marginX === 'number' ? `${marginX}px` : marginX,
        }),
        ...(marginY && {
          marginTop: typeof marginY === 'number' ? `${marginY}px` : marginY,
          marginBottom: typeof marginY === 'number' ? `${marginY}px` : marginY,
        }),
        // Layout
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
        ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
        ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
        // Transition
        ...(transitionDuration && { transitionDuration }),
        ...(transitionProperty && { transitionProperty }),
        ...(transitionTimingFunction && { transitionTimingFunction }),
        // Focus states
        ...(isFocused && focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
        ...(isFocused && focusBorderColor && { borderColor: focusBorderColor }),
        ...(isFocused && focusBoxShadow && { boxShadow: focusBoxShadow }),
      }

      // Input styles
      const inputStyles = cn(
        'w-full bg-transparent border-0 outline-none',
        'placeholder:text-gray-400',
        loading && 'cursor-wait',
        readOnly && 'cursor-default',
        className
      )

      // Event handlers
      const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true)
        onFocus?.(event)
      }

      const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false)
        onBlur?.(event)
      }

      // Render wrapper
      const renderWrapper = () => {
        if (!extractedLabel && !extractedHelperText) {
          return renderInput()
        }

        return (
          <div className="w-full">
            {extractedLabel && <InputLabel required={required}>{extractedLabel}</InputLabel>}
            {renderInput()}
            {extractedHelperText && <InputHelperText>{extractedHelperText}</InputHelperText>}
          </div>
        )
      }

      // Render input
      const renderInput = () => (
        <div
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], 'relative')}
          style={customStyles}
        >
          {(extractedIcon || icon) && iconPosition === 'left' && (
            <InputIcon>{extractedIcon || icon}</InputIcon>
          )}

          <input
            ref={ref}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={loading ? loadingText || 'Loading...' : placeholder}
            disabled={isDisabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            step={step}
            min={min}
            max={max}
            className={inputStyles}
            style={{
              ...(placeholderColor &&
                ({ '--placeholder-color': placeholderColor } as React.CSSProperties)),
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onClick={onClick}
            aria-invalid={hasError}
            aria-required={required}
            {...props}
          />

          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {loadingSpinner || (
                <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
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
            </div>
          )}

          {(extractedIcon || icon) && iconPosition === 'right' && !loading && (
            <InputIcon>{extractedIcon || icon}</InputIcon>
          )}
        </div>
      )

      return <InputContext.Provider value={contextValue}>{renderWrapper()}</InputContext.Provider>
    }
  )
)

InputBase.displayName = 'Input'

// Compound component interface
interface InputComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  Icon: typeof InputIcon
  Label: typeof InputLabel
  HelperText: typeof InputHelperText
}

// Compound component exports
const Input = InputBase as unknown as InputComponent
Input.Icon = InputIcon
Input.Label = InputLabel
Input.HelperText = InputHelperText

export { Input }
export default Input
