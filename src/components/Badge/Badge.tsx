import React, { createContext, useContext, forwardRef, memo } from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export interface BadgeContextValue {
  variant: BadgeVariant
  size: BadgeSize
  status: BadgeStatus
  isDisabled: boolean
  isLoading: boolean
  isRequired: boolean
  hasIcon: boolean
  hasCloseButton: boolean
  onClose?: () => void
  onIconClick?: () => void
}

export type BadgeVariant =
  | 'default'
  | 'filled'
  | 'outlined'
  | 'ghost'
  | 'solid'
  | 'gradient'
  | 'glass'
  | 'neon'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type BadgeStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'primary'
  | 'secondary'

export interface BadgeBaseProps {
  // Core props
  variant?: BadgeVariant
  size?: BadgeSize
  status?: BadgeStatus
  disabled?: boolean
  loading?: boolean
  required?: boolean
  interactive?: boolean
  animated?: boolean
  animation?: 'pulse' | 'bounce' | 'shake' | 'glow'

  // Content props
  label?: string
  helperText?: string
  icon?: React.ReactNode
  closeButton?: boolean
  onClose?: () => void
  onIconClick?: () => void

  // Loading props
  loadingText?: string
  loadingSpinner?: React.ReactNode

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
  color?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string

  // Transform and hover effects
  scale?: string
  hoverScale?: string
  opacity?: string
  hoverOpacity?: string
  transform?: string
  hoverTransform?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string | number
  focusRingOffset?: string | number
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string

  // Spacing
  padding?: string | number
  paddingX?: string | number
  paddingY?: string | number
  margin?: string | number
  marginX?: string | number
  marginY?: string | number

  // Transitions
  transitionDuration?: string
  transitionProperty?: string
  transitionTimingFunction?: string

  // Animation props
  animationDuration?: number
  animationDelay?: number
  animationIterationCount?: string | number

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

export interface BadgeProps extends BadgeBaseProps {
  children: React.ReactNode
}

export interface BadgeIconProps {
  className?: string
  style?: React.CSSProperties
  color?: string
  size?: string | number
  onClick?: () => void
  children: React.ReactNode
}

export interface BadgeCloseButtonProps {
  className?: string
  style?: React.CSSProperties
  color?: string
  size?: string | number
  onClick?: () => void
  'aria-label'?: string
}

export interface BadgeLabelProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export interface BadgeHelperTextProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

// Context
const BadgeContext = createContext<BadgeContextValue | null>(null)

const useBadgeContext = () => {
  const context = useContext(BadgeContext)
  if (!context) {
    throw new Error('Badge components must be used within a Badge component')
  }
  return context
}

// Sub-components
const BadgeIcon = memo(
  forwardRef<HTMLSpanElement, BadgeIconProps>(
    ({ className, style, color, size, onClick, children, ...props }, ref) => {
      const { isDisabled, onIconClick } = useBadgeContext()

      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center',
            isDisabled && 'opacity-50 cursor-not-allowed',
            !isDisabled && onClick && 'cursor-pointer hover:opacity-80',
            className
          )}
          style={{
            color,
            fontSize: size,
            ...style,
          }}
          onClick={isDisabled ? undefined : onClick || onIconClick}
          {...props}
        >
          {children}
        </span>
      )
    }
  )
)

BadgeIcon.displayName = 'BadgeIcon'

const BadgeCloseButton = memo(
  forwardRef<HTMLButtonElement, BadgeCloseButtonProps>(
    ({ className, style, color, size, onClick, 'aria-label': ariaLabel, ...props }, ref) => {
      const { isDisabled, onClose } = useBadgeContext()

      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            'inline-flex items-center justify-center rounded-full transition-opacity',
            isDisabled && 'opacity-50 cursor-not-allowed',
            !isDisabled && 'hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2',
            className
          )}
          style={{
            color,
            fontSize: size,
            ...style,
          }}
          onClick={isDisabled ? undefined : onClick || onClose}
          aria-label={ariaLabel || 'Remove badge'}
          disabled={isDisabled}
          {...props}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )
    }
  )
)

BadgeCloseButton.displayName = 'BadgeCloseButton'

const BadgeLabel = memo(
  forwardRef<HTMLSpanElement, BadgeLabelProps>(({ className, style, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('font-medium', className)} style={style} {...props}>
        {children}
      </span>
    )
  })
)

BadgeLabel.displayName = 'BadgeLabel'

const BadgeHelperText = memo(
  forwardRef<HTMLSpanElement, BadgeHelperTextProps>(
    ({ className, style, children, ...props }, ref) => {
      return (
        <span ref={ref} className={cn('text-xs opacity-75', className)} style={style} {...props}>
          {children}
        </span>
      )
    }
  )
)

BadgeHelperText.displayName = 'BadgeHelperText'

// Main Badge Component
const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      // Core props
      variant = 'default',
      size = 'md',
      status = 'default',
      disabled = false,
      loading = false,
      required = false,

      // Content props
      label,
      helperText,
      icon,
      closeButton = false,
      onClose,
      onIconClick,

      // Loading props
      loadingSpinner,

      // Styling props
      className,
      style,

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

      // Colors
      backgroundColor,
      color,

      // Focus styles
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
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

      // Transitions
      transitionDuration = '150ms',
      transitionProperty = 'all',
      transitionTimingFunction = 'ease-in-out',

      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,

      // Event handlers
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,

      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all'

    // Variant styles
    const variants = {
      default:
        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600',
      filled: 'bg-blue-500 text-white',
      outlined: 'bg-transparent border border-blue-500 text-blue-600',
      ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
      solid: 'bg-blue-600 text-white',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      glass:
        'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200',
      neon: 'bg-cyan-400 text-cyan-900 shadow-lg shadow-cyan-400/50',
    }

    // Size styles
    const sizes = {
      xs: 'px-1.5 py-0.5 text-xs',
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-sm',
      xl: 'px-4 py-2 text-base',
      '2xl': 'px-5 py-2.5 text-lg',
    }

    // Status styles
    const statusStyles = {
      default: '',
      success:
        'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
      warning:
        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
      error:
        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
      info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
      primary:
        'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
      secondary:
        'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600',
    }

    // Disabled styles
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

    // Loading styles
    const loadingStyles = loading ? 'opacity-75 cursor-wait' : ''

    // Required styles
    const requiredStyles = required ? 'ring-1 ring-red-500' : ''

    // Custom styles object
    const customStyles: React.CSSProperties = {
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderStyle: borderStyle,
      borderRadius: borderRadius,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      color: textColor || color,
      backgroundColor: backgroundColor,
      boxShadow: boxShadow,
      padding: padding,
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      margin: margin,
      marginLeft: marginX,
      marginRight: marginX,
      marginTop: marginY,
      marginBottom: marginY,
      transitionDuration,
      transitionProperty,
      transitionTimingFunction,
      ...style,
    }

    // Focus styles
    const focusStyles = {
      '--tw-ring-color': focusRingColor,
      '--tw-ring-width': focusRingWidth,
      '--tw-ring-offset-width': focusRingOffset,
      '--tw-ring-offset-color': focusBorderColor,
      '--tw-ring-offset-shadow': focusBoxShadow,
    } as React.CSSProperties

    // Context value
    const contextValue: BadgeContextValue = {
      variant,
      size,
      status,
      isDisabled: disabled,
      isLoading: loading,
      isRequired: required,
      hasIcon: !!icon,
      hasCloseButton: closeButton,
      onClose,
      onIconClick,
    }

    return (
      <BadgeContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            statusStyles[status],
            disabledStyles,
            loadingStyles,
            requiredStyles,
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            className
          )}
          style={{
            ...customStyles,
            ...focusStyles,
          }}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={ariaInvalid}
          aria-required={ariaRequired}
          onClick={disabled ? undefined : onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          {...props}
        >
          {loading && (
            <span className="mr-1">
              {loadingSpinner || (
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
            </span>
          )}

          {icon && !loading && <BadgeIcon className="mr-1">{icon}</BadgeIcon>}

          {label && <BadgeLabel>{label}</BadgeLabel>}

          {children}

          {closeButton && !loading && <BadgeCloseButton className="ml-1" />}

          {helperText && <BadgeHelperText className="ml-2">{helperText}</BadgeHelperText>}
        </div>
      </BadgeContext.Provider>
    )
  }
)

Badge.displayName = 'Badge'

// Compound component interface
interface BadgeComponent
  extends React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>> {
  Icon: typeof BadgeIcon
  CloseButton: typeof BadgeCloseButton
  Label: typeof BadgeLabel
  HelperText: typeof BadgeHelperText
}

// Compound component exports
const BadgeWithSubComponents = Badge as BadgeComponent
BadgeWithSubComponents.Icon = BadgeIcon
BadgeWithSubComponents.CloseButton = BadgeCloseButton
BadgeWithSubComponents.Label = BadgeLabel
BadgeWithSubComponents.HelperText = BadgeHelperText

export { BadgeWithSubComponents as Badge, BadgeIcon, BadgeCloseButton, BadgeLabel, BadgeHelperText }
