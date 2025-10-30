import React, { createContext, useContext, forwardRef, useMemo, useCallback } from 'react'
import { cn } from '@/utils'

// Context for sharing state between Alert components
interface AlertContextValue {
  variant: AlertVariant
  size: AlertSize
  status: AlertStatus
  disabled: boolean
  loading: boolean
  dismissible: boolean
  onDismiss?: () => void
  customStyles: AlertCustomStyles
}

const AlertContext = createContext<AlertContextValue | null>(null)

const useAlertContext = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('Alert components must be used within an Alert')
  }
  return context
}

// Type definitions
export type AlertVariant = 'default' | 'filled' | 'outlined' | 'ghost'
export type AlertSize = 'sm' | 'md' | 'lg'
export type AlertStatus = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface AlertCustomStyles {
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
  background?: string

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

  // Sub-component styles
  titleStyles?: React.CSSProperties
  descriptionStyles?: React.CSSProperties
  iconStyles?: React.CSSProperties
  dismissButtonStyles?: React.CSSProperties
}

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  // State props
  value?: boolean
  onChange?: (value: boolean) => void
  defaultOpen?: boolean

  // Variant and styling
  variant?: AlertVariant
  size?: AlertSize
  status?: AlertStatus

  // Functional props
  disabled?: boolean
  loading?: boolean
  dismissible?: boolean
  required?: boolean

  // Content
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode

  // Labels and accessibility
  label?: string
  helperText?: string
  'aria-label'?: string
  'aria-describedby'?: string

  // Custom styles
  customStyles?: AlertCustomStyles

  // Event handlers
  onDismiss?: () => void
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void

  // Animation
  transitionDuration?: number
  _transitionType?: 'fade' | 'slide' | 'scale' | 'none'

  // Custom render functions
  renderTitle?: (props: AlertTitleProps) => React.ReactNode
  renderDescription?: (props: AlertDescriptionProps) => React.ReactNode
  renderIcon?: (props: AlertIconProps) => React.ReactNode
  renderDismissButton?: (props: AlertDismissButtonProps) => React.ReactNode
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  customStyles?: AlertCustomStyles['titleStyles']
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
  customStyles?: AlertCustomStyles['descriptionStyles']
}

export interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  customStyles?: AlertCustomStyles['iconStyles']
}

export interface AlertDismissButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  customStyles?: AlertCustomStyles['dismissButtonStyles']
  onDismiss?: () => void
}

// Main Alert component
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      status = 'default',
      disabled = false,
      loading = false,
      dismissible = false,
      required = false,
      title,
      description,
      icon,
      children,
      label,
      helperText,
      customStyles = {},
      onDismiss,
      onFocus,
      onBlur,
      onKeyDown,
      transitionDuration = 200,
      _transitionType = 'fade',
      renderTitle,
      renderDescription,
      renderIcon,
      renderDismissButton,
      ...props
    },
    ref
  ) => {
    // State management for controlled/uncontrolled
    const [isOpen, setIsOpen] = React.useState(true)

    const handleDismiss = useCallback(() => {
      if (disabled || loading) return
      setIsOpen(false)
      onDismiss?.()
    }, [disabled, loading, onDismiss])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && dismissible) {
        handleDismiss()
      }
      onKeyDown?.(event)
    }

    // Context value
    const contextValue = useMemo(
      () => ({
        variant,
        size,
        status,
        disabled,
        loading,
        dismissible,
        onDismiss: handleDismiss,
        customStyles,
      }),
      [variant, size, status, disabled, loading, dismissible, customStyles, handleDismiss]
    )

    // Base styles with customization
    const baseStyles = cn(
      'relative w-full rounded-lg border transition-all',
      // Size variants
      {
        'p-2 text-sm': size === 'sm',
        'p-4 text-base': size === 'md',
        'p-6 text-lg': size === 'lg',
      },
      // Variant and status combinations
      {
        // Default variant
        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100':
          variant === 'default' && status === 'default',
        'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200':
          variant === 'default' && status === 'success',
        'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200':
          variant === 'default' && status === 'warning',
        'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200':
          variant === 'default' && status === 'error',
        'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200':
          variant === 'default' && status === 'info',

        // Filled variant
        'bg-gray-900 dark:bg-gray-950 border-gray-900 dark:border-gray-950 text-white':
          variant === 'filled' && status === 'default',
        'bg-green-600 border-green-600 text-white': variant === 'filled' && status === 'success',
        'bg-yellow-600 border-yellow-600 text-white': variant === 'filled' && status === 'warning',
        'bg-red-600 border-red-600 text-white': variant === 'filled' && status === 'error',
        'bg-blue-600 border-blue-600 text-white': variant === 'filled' && status === 'info',

        // Outlined variant
        'bg-transparent border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100':
          variant === 'outlined' && status === 'default',
        'bg-transparent border-green-500 text-green-700 dark:text-green-300':
          variant === 'outlined' && status === 'success',
        'bg-transparent border-yellow-500 text-yellow-700 dark:text-yellow-300':
          variant === 'outlined' && status === 'warning',
        'bg-transparent border-red-500 text-red-700 dark:text-red-300':
          variant === 'outlined' && status === 'error',
        'bg-transparent border-blue-500 text-blue-700 dark:text-blue-300':
          variant === 'outlined' && status === 'info',

        // Ghost variant
        'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-900 dark:text-gray-100':
          variant === 'ghost' && status === 'default',
        'bg-green-100 dark:bg-green-900/30 border-transparent text-green-900 dark:text-green-200':
          variant === 'ghost' && status === 'success',
        'bg-yellow-100 dark:bg-yellow-900/30 border-transparent text-yellow-900 dark:text-yellow-200':
          variant === 'ghost' && status === 'warning',
        'bg-red-100 dark:bg-red-900/30 border-transparent text-red-900 dark:text-red-200':
          variant === 'ghost' && status === 'error',
        'bg-blue-100 dark:bg-blue-900/30 border-transparent text-blue-900 dark:text-blue-200':
          variant === 'ghost' && status === 'info',
      },
      // States
      {
        'opacity-50 cursor-not-allowed': disabled,
        'animate-pulse': loading,
      },
      className
    )

    // Inline styles from customStyles
    const inlineStyles: React.CSSProperties = {
      borderWidth: customStyles.borderWidth,
      borderColor: customStyles.borderColor,
      borderStyle: customStyles.borderStyle,
      borderRadius: customStyles.borderRadius,
      fontSize: customStyles.fontSize,
      fontWeight: customStyles.fontWeight,
      fontFamily: customStyles.fontFamily,
      color: customStyles.textColor,
      backgroundColor: customStyles.backgroundColor,
      padding: customStyles.padding,
      paddingLeft: customStyles.paddingX,
      paddingRight: customStyles.paddingX,
      paddingTop: customStyles.paddingY,
      paddingBottom: customStyles.paddingY,
      boxShadow: customStyles.boxShadow,
      transitionDuration: `${transitionDuration}ms`,
      ...customStyles,
    }

    // Focus styles would be applied via CSS or inline styles when needed

    if (!isOpen) return null

    return (
      <AlertContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={baseStyles}
          style={inlineStyles}
          role="alert"
          aria-label={label || 'Alert'}
          aria-describedby={helperText ? 'alert-helper' : undefined}
          aria-required={required}
          aria-disabled={disabled}
          aria-busy={loading}
          tabIndex={dismissible ? 0 : undefined}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          <div className="flex items-start gap-3">
            {icon &&
              (renderIcon ? (
                renderIcon({ children: icon, customStyles: customStyles.iconStyles })
              ) : (
                <AlertIcon>{icon}</AlertIcon>
              ))}

            <div className="flex-1 min-w-0">
              {title &&
                (renderTitle ? (
                  renderTitle({ children: title, customStyles: customStyles.titleStyles })
                ) : (
                  <AlertTitle>{title}</AlertTitle>
                ))}

              {description &&
                (renderDescription ? (
                  renderDescription({
                    children: description,
                    customStyles: customStyles.descriptionStyles,
                  })
                ) : (
                  <AlertDescription>{description}</AlertDescription>
                ))}

              {children}
            </div>

            {dismissible &&
              (renderDismissButton ? (
                renderDismissButton({
                  onDismiss: handleDismiss,
                  customStyles: customStyles.dismissButtonStyles,
                })
              ) : (
                <AlertDismissButton onDismiss={handleDismiss} />
              ))}
          </div>

          {helperText && (
            <div id="alert-helper" className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {helperText}
            </div>
          )}
        </div>
      </AlertContext.Provider>
    )
  }
)

Alert.displayName = 'Alert'

// AlertTitle component
const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useAlertContext()

    const titleStyles = cn(
      'font-medium leading-none tracking-tight',
      {
        'text-sm mb-1': size === 'sm',
        'text-base mb-1': size === 'md',
        'text-lg mb-2': size === 'lg',
      },
      className
    )

    return (
      <h5 ref={ref} className={titleStyles} style={customStyles} {...props}>
        {children}
      </h5>
    )
  }
)

AlertTitle.displayName = 'AlertTitle'

// AlertDescription component
const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useAlertContext()

    const descriptionStyles = cn(
      'leading-relaxed',
      {
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
        'text-base': size === 'lg',
      },
      className
    )

    return (
      <p ref={ref} className={descriptionStyles} style={customStyles} {...props}>
        {children}
      </p>
    )
  }
)

AlertDescription.displayName = 'AlertDescription'

// AlertIcon component
const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useAlertContext()

    const iconStyles = cn(
      'flex-shrink-0',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
      },
      className
    )

    return (
      <div ref={ref} className={iconStyles} style={customStyles} {...props}>
        {children}
      </div>
    )
  }
)

AlertIcon.displayName = 'AlertIcon'

// AlertDismissButton component
const AlertDismissButton = forwardRef<HTMLButtonElement, AlertDismissButtonProps>(
  ({ className, children, customStyles, onDismiss, ...props }, ref) => {
    const { size, disabled, loading } = useAlertContext()

    const buttonStyles = cn(
      'flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        'opacity-50 cursor-not-allowed': disabled || loading,
      },
      className
    )

    return (
      <button
        ref={ref}
        type="button"
        className={buttonStyles}
        style={customStyles}
        onClick={onDismiss}
        disabled={disabled || loading}
        aria-label="Dismiss alert"
        {...props}
      >
        {children || (
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    )
  }
)

AlertDismissButton.displayName = 'AlertDismissButton'

export { Alert, AlertTitle, AlertDescription, AlertIcon, AlertDismissButton }
