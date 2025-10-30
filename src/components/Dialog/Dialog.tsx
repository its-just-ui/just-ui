import React, {
  createContext,
  useContext,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils'

// Context for sharing state between Dialog components
interface DialogContextValue {
  isOpen: boolean
  variant: DialogVariant
  size: DialogSize
  status: DialogStatus
  disabled: boolean
  loading: boolean
  onClose?: () => void
  modal: boolean
  customStyles: DialogCustomStyles
  position: DialogPosition
  transition: DialogTransition
  transitionDuration: number
  backdropColor?: string
  backgroundColor?: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

// Type definitions
export type DialogVariant = 'default' | 'filled' | 'outlined' | 'ghost' | 'glass'
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type DialogStatus = 'default' | 'success' | 'warning' | 'error' | 'info'
export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
export type DialogTransition = 'fade' | 'slide' | 'scale' | 'none'

export interface DialogCustomStyles {
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
  margin?: string
  marginX?: string
  marginY?: string

  // Sub-component styles
  overlayStyles?: React.CSSProperties
  contentStyles?: React.CSSProperties
  headerStyles?: React.CSSProperties
  bodyStyles?: React.CSSProperties
  footerStyles?: React.CSSProperties
  titleStyles?: React.CSSProperties
  descriptionStyles?: React.CSSProperties
  closeButtonStyles?: React.CSSProperties
}

export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  // State props
  open: boolean
  onOpenChange: (open: boolean) => void

  // Variant and styling
  variant?: DialogVariant
  size?: DialogSize
  status?: DialogStatus
  position?: DialogPosition

  // Position offset props
  offsetX?: string | number
  offsetY?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  minHeight?: string | number

  // Functional props
  disabled?: boolean
  loading?: boolean
  required?: boolean
  modal?: boolean
  closeOnEsc?: boolean
  closeOnOverlayClick?: boolean
  preventScroll?: boolean
  container?: HTMLElement | null

  // Content
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode

  // Labels and accessibility
  label?: string
  helperText?: string
  'aria-label'?: string
  'aria-describedby'?: string

  // Custom styles
  customStyles?: DialogCustomStyles

  // Event handlers
  onClose?: () => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onOverlayClick?: (event: React.MouseEvent) => void

  // Animation
  transitionDuration?: number
  transition?: DialogTransition

  // Styling
  backdropColor?: string
  backgroundColor?: string

  // Custom render functions
  renderOverlay?: (props: DialogOverlayProps) => React.ReactNode
  renderContent?: (props: DialogContentProps) => React.ReactNode
  renderHeader?: (props: DialogHeaderProps) => React.ReactNode
  renderBody?: (props: DialogBodyProps) => React.ReactNode
  renderFooter?: (props: DialogFooterProps) => React.ReactNode
}

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['overlayStyles']
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['contentStyles']
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['headerStyles']
}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['bodyStyles']
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['footerStyles']
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['titleStyles']
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['descriptionStyles']
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  customStyles?: DialogCustomStyles['closeButtonStyles']
}

// Dialog Overlay component
const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, children, customStyles, onClick, ...props }, ref) => {
    const { isOpen, modal, transition, onClose, disabled, transitionDuration, backdropColor } =
      useDialogContext()

    const overlayStyles = cn(
      'fixed inset-0 z-50 transition-opacity ease-out',
      {
        'bg-black/50': modal && !backdropColor,
        'pointer-events-none': !modal || disabled,
        'opacity-100': isOpen && transition !== 'none',
        'opacity-0': !isOpen && transition !== 'none',
      },
      className
    )

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || e.target !== e.currentTarget) return
      onClick?.(e)
      onClose?.()
    }

    return (
      <div
        ref={ref}
        className={overlayStyles}
        style={{
          transitionDuration: `${transitionDuration}ms`,
          ...(backdropColor && modal && { backgroundColor: backdropColor }),
          ...customStyles,
        }}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    )
  }
)

DialogOverlay.displayName = 'DialogOverlay'

// Dialog Content component
const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, customStyles, style, ...props }, ref) => {
    const { isOpen, size, variant, position, transition, transitionDuration, backgroundColor } =
      useDialogContext()

    // Base positioning styles
    const getPositionStyles = () => {
      const basePosition = 'fixed z-50'

      switch (position) {
        case 'center':
          return `${basePosition} top-1/2 left-1/2`
        case 'top':
          return `${basePosition} top-4 left-1/2`
        case 'bottom':
          return `${basePosition} bottom-4 left-1/2`
        case 'left':
          return `${basePosition} left-4 top-1/2`
        case 'right':
          return `${basePosition} right-4 top-1/2`
        case 'top-left':
          return `${basePosition} top-4 left-4`
        case 'top-right':
          return `${basePosition} top-4 right-4`
        case 'bottom-left':
          return `${basePosition} bottom-4 left-4`
        case 'bottom-right':
          return `${basePosition} bottom-4 right-4`
        default:
          return `${basePosition} top-1/2 left-1/2`
      }
    }

    // Get transform styles based on position and transition
    const getTransformStyles = () => {
      if (!isOpen && transition === 'none') return ''

      const transforms = []

      // Base position transforms (always applied)
      if (position === 'center' || position === 'top' || position === 'bottom') {
        transforms.push('-translate-x-1/2')
      }
      if (position === 'center' || position === 'left' || position === 'right') {
        transforms.push('-translate-y-1/2')
      }

      // Transition transforms
      if (transition === 'scale') {
        transforms.push(isOpen ? 'scale-100' : 'scale-95')
      } else if (transition === 'slide') {
        if (position === 'top' || position === 'top-left' || position === 'top-right') {
          transforms.push(isOpen ? 'translate-y-0' : '-translate-y-full')
        } else if (
          position === 'bottom' ||
          position === 'bottom-left' ||
          position === 'bottom-right'
        ) {
          transforms.push(isOpen ? 'translate-y-0' : 'translate-y-full')
        } else if (position === 'left') {
          transforms.push(isOpen ? 'translate-x-0' : '-translate-x-full')
        } else if (position === 'right') {
          transforms.push(isOpen ? 'translate-x-0' : 'translate-x-full')
        } else if (position === 'center') {
          // For center position, slide from bottom
          transforms.push(isOpen ? 'translate-y-0' : 'translate-y-full')
        }
      }

      return transforms.join(' ')
    }

    const contentStyles = cn(
      getPositionStyles(),
      getTransformStyles(),
      'transition-all ease-out overflow-hidden',
      // Opacity for fade and scale transitions
      {
        'opacity-100': isOpen || transition === 'slide' || transition === 'none',
        'opacity-0': !isOpen && (transition === 'fade' || transition === 'scale'),
      },
      // Size variants with max-height to prevent viewport overflow
      {
        'w-full max-w-sm': size === 'sm',
        'w-full max-w-lg': size === 'md',
        'w-full max-w-2xl': size === 'lg',
        'w-full max-w-4xl': size === 'xl',
        'w-screen h-screen max-w-full': size === 'full',
      },
      // Add max-height for non-full sizes
      size !== 'full' && 'max-h-[calc(100vh-2rem)]',
      // Variant styles (only apply if no custom backgroundColor)
      !backgroundColor && {
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg':
          variant === 'default',
        'bg-gray-900 dark:bg-gray-950 text-white shadow-xl': variant === 'filled',
        'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600':
          variant === 'outlined',
        'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm': variant === 'ghost',
        'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl':
          variant === 'glass',
      },
      // Always apply variant borders and shadows
      {
        'border border-gray-200 dark:border-gray-700 shadow-lg':
          variant === 'default' && backgroundColor,
        'shadow-xl': variant === 'filled' && backgroundColor,
        'border-2 border-gray-300 dark:border-gray-600': variant === 'outlined' && backgroundColor,
        'backdrop-blur-sm': variant === 'ghost' && backgroundColor,
        'backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl':
          variant === 'glass' && backgroundColor,
      },
      // Default rounded corners except for full size
      size !== 'full' && 'rounded-lg',
      // Ensure content is scrollable
      'flex flex-col',
      className
    )

    return (
      <div
        ref={ref}
        className={contentStyles}
        style={{
          transitionDuration: `${transitionDuration}ms`,
          ...(backgroundColor && { backgroundColor }),
          ...customStyles,
          ...style,
        }}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
      </div>
    )
  }
)

DialogContent.displayName = 'DialogContent'

// Dialog Header component
const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useDialogContext()

    const headerStyles = cn(
      'flex items-center justify-between border-b',
      {
        'p-4': size === 'sm',
        'p-6': size === 'md' || size === 'lg',
        'p-8': size === 'xl' || size === 'full',
      },
      className
    )

    return (
      <div ref={ref} className={headerStyles} style={customStyles} {...props}>
        {children}
      </div>
    )
  }
)

DialogHeader.displayName = 'DialogHeader'

// Dialog Body component
const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useDialogContext()

    const bodyStyles = cn(
      'overflow-y-auto flex-1 min-h-0',
      {
        'p-4': size === 'sm',
        'p-6': size === 'md' || size === 'lg',
        'p-8': size === 'xl' || size === 'full',
      },
      className
    )

    return (
      <div ref={ref} className={bodyStyles} style={customStyles} {...props}>
        {children}
      </div>
    )
  }
)

DialogBody.displayName = 'DialogBody'

// Dialog Footer component
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useDialogContext()

    const footerStyles = cn(
      'flex items-center justify-end gap-2 border-t',
      {
        'p-4': size === 'sm',
        'p-6': size === 'md' || size === 'lg',
        'p-8': size === 'xl' || size === 'full',
      },
      className
    )

    return (
      <div ref={ref} className={footerStyles} style={customStyles} {...props}>
        {children}
      </div>
    )
  }
)

DialogFooter.displayName = 'DialogFooter'

// Dialog Title component
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useDialogContext()

    const titleStyles = cn(
      'font-semibold leading-none tracking-tight',
      {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg' || size === 'xl',
        'text-3xl': size === 'full',
      },
      className
    )

    return (
      <h2 ref={ref} className={titleStyles} style={customStyles} {...props}>
        {children}
      </h2>
    )
  }
)

DialogTitle.displayName = 'DialogTitle'

// Dialog Description component
const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, customStyles, ...props }, ref) => {
    const { size } = useDialogContext()

    const descriptionStyles = cn(
      'text-muted-foreground',
      {
        'text-sm mt-1': size === 'sm',
        'text-sm mt-2': size === 'md',
        'text-base mt-2': size === 'lg' || size === 'xl' || size === 'full',
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

DialogDescription.displayName = 'DialogDescription'

// Dialog Close component
const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, customStyles, onClick, ...props }, ref) => {
    const { disabled, loading, onClose } = useDialogContext()

    const closeStyles = cn(
      'rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
      {
        'opacity-50 cursor-not-allowed': disabled || loading,
      },
      className
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onClose?.()
    }

    return (
      <button
        ref={ref}
        type="button"
        className={closeStyles}
        style={customStyles}
        onClick={handleClick}
        disabled={disabled || loading}
        aria-label="Close dialog"
        {...props}
      >
        {children || (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

DialogClose.displayName = 'DialogClose'

// Main Dialog component
const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      className,
      variant = 'default',
      size = 'md',
      status = 'default',
      position = 'center',
      offsetX,
      offsetY,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      disabled = false,
      loading = false,
      required = false,
      modal = true,
      closeOnEsc = true,
      closeOnOverlayClick = true,
      preventScroll = true,
      container,
      title,
      description,
      children,
      label,
      helperText,
      customStyles = {},
      onClose,
      onEscapeKeyDown,
      onOverlayClick,
      transitionDuration = 200,
      transition = 'scale',
      backdropColor,
      backgroundColor,
      renderOverlay,
      renderContent,
      renderHeader,
      renderBody,
      renderFooter,
      ...props
    },
    _ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null)

    // Handle close
    const handleClose = useCallback(() => {
      if (disabled || loading) return
      onOpenChange(false)
      onClose?.()
    }, [disabled, loading, onOpenChange, onClose])

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEsc || disabled) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onEscapeKeyDown?.(e)
          handleClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, closeOnEsc, disabled, handleClose, onEscapeKeyDown])

    // Handle overlay click
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (!closeOnOverlayClick || disabled) return
        onOverlayClick?.(e)
        handleClose()
      },
      [closeOnOverlayClick, disabled, handleClose, onOverlayClick]
    )

    // Lock body scroll when modal is open
    useEffect(() => {
      if (!modal || !open || !preventScroll) return

      const originalStyle = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      return () => {
        document.body.style.overflow = originalStyle
        document.body.style.paddingRight = originalPaddingRight
      }
    }, [modal, open, preventScroll])

    // Context value
    const contextValue = useMemo<DialogContextValue>(
      () => ({
        isOpen: open,
        variant,
        size,
        status,
        disabled,
        loading,
        onClose: handleClose,
        modal,
        customStyles,
        position,
        transition,
        transitionDuration,
        backdropColor,
        backgroundColor,
      }),
      [
        open,
        variant,
        size,
        status,
        disabled,
        loading,
        handleClose,
        modal,
        customStyles,
        position,
        transition,
        transitionDuration,
        backdropColor,
        backgroundColor,
      ]
    )

    // Inline styles with position offsets
    const contentInlineStyles: React.CSSProperties = {
      transitionDuration: `${transitionDuration}ms`,
      ...(offsetX !== undefined && {
        left: typeof offsetX === 'number' ? `${offsetX}px` : offsetX,
      }),
      ...(offsetY !== undefined && {
        top: typeof offsetY === 'number' ? `${offsetY}px` : offsetY,
      }),
      ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
      ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
      ...(minHeight && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
      ...customStyles.contentStyles,
    }

    if (!open) return null

    const overlay = renderOverlay ? (
      renderOverlay({
        customStyles: customStyles.overlayStyles,
        onClick: handleOverlayClick,
      })
    ) : (
      <DialogOverlay onClick={handleOverlayClick} customStyles={customStyles.overlayStyles} />
    )

    const content = (
      <>
        {title &&
          (renderHeader ? (
            renderHeader({
              children: (
                <>
                  <DialogTitle customStyles={customStyles.titleStyles}>{title}</DialogTitle>
                  {description && (
                    <DialogDescription customStyles={customStyles.descriptionStyles}>
                      {description}
                    </DialogDescription>
                  )}
                </>
              ),
              customStyles: customStyles.headerStyles,
            })
          ) : (
            <DialogHeader customStyles={customStyles.headerStyles}>
              <div className="flex-1">
                <DialogTitle customStyles={customStyles.titleStyles}>{title}</DialogTitle>
                {description && (
                  <DialogDescription customStyles={customStyles.descriptionStyles}>
                    {description}
                  </DialogDescription>
                )}
              </div>
              <DialogClose customStyles={customStyles.closeButtonStyles} />
            </DialogHeader>
          ))}

        {renderBody ? (
          renderBody({
            children,
            customStyles: customStyles.bodyStyles,
          })
        ) : (
          <DialogBody customStyles={customStyles.bodyStyles}>{children}</DialogBody>
        )}

        {renderFooter && renderFooter({ customStyles: customStyles.footerStyles })}
      </>
    )

    const dialogContent = renderContent ? (
      renderContent({
        children: content,
        customStyles: contentInlineStyles,
      })
    ) : (
      <DialogContent
        className={className}
        style={contentInlineStyles}
        customStyles={contentInlineStyles}
      >
        {content}
      </DialogContent>
    )

    const dialogElement = (
      <DialogContext.Provider value={contextValue}>
        <div
          ref={dialogRef}
          aria-label={label}
          aria-describedby={helperText ? 'dialog-helper' : undefined}
          aria-required={required}
          aria-disabled={disabled}
          aria-busy={loading}
          {...props}
        >
          {overlay}
          {dialogContent}

          {helperText && (
            <div id="dialog-helper" className="sr-only">
              {helperText}
            </div>
          )}
        </div>
      </DialogContext.Provider>
    )

    // Use portal to render dialog at document body level
    const portalContainer = container || (typeof document !== 'undefined' ? document.body : null)

    if (!portalContainer) return null

    return createPortal(dialogElement, portalContainer)
  }
)

Dialog.displayName = 'Dialog'

// Export compound components
export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
