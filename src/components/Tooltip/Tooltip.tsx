import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
  useRef,
  useEffect,
} from 'react'
import { cn } from '@/utils'

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'content'> {
  // Core props
  isOpen?: boolean
  defaultIsOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  disabled?: boolean

  // Content props
  content?: React.ReactNode
  title?: string
  description?: string

  // Visual props
  variant?: 'default' | 'filled' | 'outlined' | 'flat' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'

  // Positioning props
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'
  offset?: number
  delayOpen?: number
  delayClose?: number
  autoPlacement?: boolean

  // Trigger props
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  showArrow?: boolean
  arrowSize?: number
  arrowColor?: string

  // Animation props
  transition?: 'none' | 'fade' | 'slide' | 'scale' | 'bounce'
  transitionDuration?: number

  // Container styles
  containerClassName?: string
  containerStyle?: React.CSSProperties
  maxWidth?: string
  minWidth?: string
  width?: string

  // Content styles
  contentBackgroundColor?: string
  contentBorderWidth?: string
  contentBorderColor?: string
  contentBorderRadius?: string
  contentPadding?: string
  contentBoxShadow?: string

  // Typography styles
  titleColor?: string
  titleFontSize?: string
  titleFontWeight?: string
  titleFontFamily?: string
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: string
  descriptionFontFamily?: string

  // Hover styles
  hoverBackgroundColor?: string
  hoverBorderColor?: string
  hoverBoxShadow?: string

  // Status colors
  successColor?: string
  warningColor?: string
  errorColor?: string

  // Custom render props
  renderContent?: (isOpen: boolean) => React.ReactNode
  renderTrigger?: (isOpen: boolean, triggerProps: any) => React.ReactNode

  children?: React.ReactNode
}

interface TooltipContextValue {
  isOpen: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined' | 'flat' | 'elevated'
  status?: 'default' | 'success' | 'warning' | 'error'
  placement?: string
  onOpenChange?: (isOpen: boolean) => void
  triggerProps: any
}

const TooltipContext = createContext<TooltipContextValue | undefined>(undefined)

const useTooltip = () => {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('useTooltip must be used within a Tooltip')
  }
  return context
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      isOpen: controlledIsOpen,
      defaultIsOpen = false,
      onOpenChange,
      disabled = false,
      content,
      title,
      description,
      variant = 'default',
      size = 'md',
      status = 'default',
      placement = 'top',
      offset = 4,
      delayOpen = 0,
      delayClose = 0,
      autoPlacement = true,
      trigger = 'hover',
      showArrow = false,
      arrowSize = 4,
      arrowColor,
      transition = 'fade',
      transitionDuration = 200,
      // Container styles
      containerClassName,
      containerStyle,
      maxWidth,
      minWidth,
      width,
      // Content styles
      contentBackgroundColor,
      contentBorderWidth,
      contentBorderColor,
      contentBorderRadius,
      contentPadding,
      contentBoxShadow,
      // Typography styles
      titleColor,
      titleFontSize,
      titleFontWeight,
      titleFontFamily,
      descriptionColor,
      descriptionFontSize,
      descriptionFontWeight,
      descriptionFontFamily,
      // Hover styles
      hoverBackgroundColor,
      hoverBorderColor,
      hoverBoxShadow,
      // Status colors
      successColor,
      warningColor,
      errorColor,
      // Custom render
      renderContent,
      renderTrigger,
      children,
      style,
      ...props
    },
    _ref
  ) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen)
    const [isHovered, setIsHovered] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [currentPlacement, setCurrentPlacement] = useState(placement)

    const triggerRef = useRef<HTMLElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const isControlled = controlledIsOpen !== undefined
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen

    // Get status colors
    const getStatusColors = () => {
      const statusColors = {
        default: {
          background: '#1f2937',
          border: '#374151',
          text: '#ffffff',
          arrow: '#1f2937',
        },
        success: {
          background: successColor || '#10b981',
          border: successColor || '#059669',
          text: '#ffffff',
          arrow: successColor || '#10b981',
        },
        warning: {
          background: warningColor || '#f59e0b',
          border: warningColor || '#d97706',
          text: '#ffffff',
          arrow: warningColor || '#f59e0b',
        },
        error: {
          background: errorColor || '#ef4444',
          border: errorColor || '#dc2626',
          text: '#ffffff',
          arrow: errorColor || '#ef4444',
        },
      }

      return statusColors[status]
    }

    const statusColors = getStatusColors()

    // Get size dimensions - much smaller like MUI
    const getSizeDimensions = () => {
      const dimensions = {
        sm: {
          padding: '0.25rem 0.5rem',
          fontSize: '0.75rem',
          arrowSize: 3,
          maxWidth: '120px',
        },
        md: {
          padding: '0.375rem 0.75rem',
          fontSize: '0.875rem',
          arrowSize: 4,
          maxWidth: '160px',
        },
        lg: {
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          arrowSize: 5,
          maxWidth: '200px',
        },
      }

      return dimensions[size]
    }

    const dimensions = getSizeDimensions()

    // Default styles based on variant - more like MUI
    const getDefaultStyles = () => {
      const variantStyles = {
        default: {
          background: contentBackgroundColor || statusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || statusColors.border}`
            : 'none',
          boxShadow: contentBoxShadow || '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
        filled: {
          background: contentBackgroundColor || statusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || statusColors.border}`
            : 'none',
          boxShadow: contentBoxShadow || '0 1px 4px rgba(0, 0, 0, 0.12)',
        },
        outlined: {
          background: contentBackgroundColor || 'transparent',
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || statusColors.border}`
            : '1px solid #d1d5db',
          boxShadow: contentBoxShadow || '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
        flat: {
          background: contentBackgroundColor || statusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || statusColors.border}`
            : 'none',
          boxShadow: contentBoxShadow || 'none',
        },
        elevated: {
          background: contentBackgroundColor || statusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || statusColors.border}`
            : 'none',
          boxShadow: contentBoxShadow || '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }

      return variantStyles[variant]
    }

    const defaultStyles = getDefaultStyles()

    // Calculate position relative to trigger - improved like MUI
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft
      const scrollY = window.pageYOffset || document.documentElement.scrollTop

      let top = 0
      let left = 0
      let newPlacement = currentPlacement

      // Calculate base position
      switch (currentPlacement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - offset
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          break
        case 'bottom':
          top = triggerRect.bottom + offset
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          break
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          left = triggerRect.left - tooltipRect.width - offset
          break
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          left = triggerRect.right + offset
          break
        case 'top-start':
          top = triggerRect.top - tooltipRect.height - offset
          left = triggerRect.left
          break
        case 'top-end':
          top = triggerRect.top - tooltipRect.height - offset
          left = triggerRect.right - tooltipRect.width
          break
        case 'bottom-start':
          top = triggerRect.bottom + offset
          left = triggerRect.left
          break
        case 'bottom-end':
          top = triggerRect.bottom + offset
          left = triggerRect.right - tooltipRect.width
          break
        case 'left-start':
          top = triggerRect.top
          left = triggerRect.left - tooltipRect.width - offset
          break
        case 'left-end':
          top = triggerRect.bottom - tooltipRect.height
          left = triggerRect.left - tooltipRect.width - offset
          break
        case 'right-start':
          top = triggerRect.top
          left = triggerRect.right + offset
          break
        case 'right-end':
          top = triggerRect.bottom - tooltipRect.height
          left = triggerRect.right + offset
          break
      }

      // Auto-placement logic - improved
      if (autoPlacement) {
        // Check horizontal overflow
        if (left < 0) {
          if (currentPlacement.includes('left')) {
            newPlacement = currentPlacement.replace('left', 'right') as any
          } else if (currentPlacement.includes('right')) {
            newPlacement = currentPlacement.replace('right', 'left') as any
          }
        }
        if (left + tooltipRect.width > viewportWidth) {
          if (currentPlacement.includes('right')) {
            newPlacement = currentPlacement.replace('right', 'left') as any
          } else if (currentPlacement.includes('left')) {
            newPlacement = currentPlacement.replace('left', 'right') as any
          }
        }

        // Check vertical overflow
        if (top < 0) {
          if (currentPlacement.includes('top')) {
            newPlacement = currentPlacement.replace('top', 'bottom') as any
          } else if (currentPlacement.includes('bottom')) {
            newPlacement = currentPlacement.replace('bottom', 'top') as any
          }
        }
        if (top + tooltipRect.height > viewportHeight) {
          if (currentPlacement.includes('bottom')) {
            newPlacement = currentPlacement.replace('bottom', 'top') as any
          } else if (currentPlacement.includes('top')) {
            newPlacement = currentPlacement.replace('top', 'bottom') as any
          }
        }
      }

      // Recalculate position if placement changed
      if (newPlacement !== currentPlacement) {
        setCurrentPlacement(newPlacement)
        return
      }

      // Ensure tooltip stays within viewport bounds
      left = Math.max(0, Math.min(left, viewportWidth - tooltipRect.width))
      top = Math.max(0, Math.min(top, viewportHeight - tooltipRect.height))

      setPosition({
        top: top + scrollY,
        left: left + scrollX,
      })
    }, [currentPlacement, offset, autoPlacement])

    // Handle open/close
    const handleOpen = useCallback(() => {
      if (disabled) return

      const openTooltip = () => {
        if (!isControlled) {
          setUncontrolledIsOpen(true)
        }
        onOpenChange?.(true)
      }

      if (delayOpen > 0) {
        timeoutRef.current = setTimeout(openTooltip, delayOpen)
      } else {
        openTooltip()
      }
    }, [disabled, isControlled, onOpenChange, delayOpen])

    const handleClose = useCallback(() => {
      const closeTooltip = () => {
        if (!isControlled) {
          setUncontrolledIsOpen(false)
        }
        onOpenChange?.(false)
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (delayClose > 0) {
        timeoutRef.current = setTimeout(closeTooltip, delayClose)
      } else {
        closeTooltip()
      }
    }, [isControlled, onOpenChange, delayClose])

    // Event handlers
    const handleMouseEnter = useCallback(() => {
      if (trigger === 'hover') {
        setIsHovered(true)
        handleOpen()
      }
    }, [trigger, handleOpen])

    const handleMouseLeave = useCallback(() => {
      if (trigger === 'hover') {
        setIsHovered(false)
        handleClose()
      }
    }, [trigger, handleClose])

    const handleFocus = useCallback(() => {
      if (trigger === 'focus') {
        handleOpen()
      }
    }, [trigger, handleOpen])

    const handleBlur = useCallback(() => {
      if (trigger === 'focus') {
        handleClose()
      }
    }, [trigger, handleClose])

    const handleClick = useCallback(() => {
      if (trigger === 'click') {
        if (isOpen) {
          handleClose()
        } else {
          handleOpen()
        }
      }
    }, [trigger, isOpen, handleOpen, handleClose])

    // Update position when tooltip opens or placement changes
    useEffect(() => {
      if (isOpen && tooltipRef.current) {
        const timer = setTimeout(calculatePosition, 10)
        return () => clearTimeout(timer)
      }
    }, [isOpen, currentPlacement, calculatePosition])

    // Update position on scroll and resize
    useEffect(() => {
      if (isOpen) {
        const handleScroll = () => calculatePosition()
        const handleResize = () => calculatePosition()

        window.addEventListener('scroll', handleScroll, true)
        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('scroll', handleScroll, true)
          window.removeEventListener('resize', handleResize)
        }
      }
    }, [isOpen, calculatePosition])

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    // Tooltip styles - much smaller like MUI
    const tooltipStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 9999,
      top: position.top,
      left: position.left,
      backgroundColor:
        isHovered && hoverBackgroundColor ? hoverBackgroundColor : defaultStyles.background,
      border:
        isHovered && hoverBorderColor ? `1px solid ${hoverBorderColor}` : defaultStyles.border,
      borderRadius: contentBorderRadius || '0.25rem',
      padding: contentPadding || dimensions.padding,
      boxShadow: isHovered && hoverBoxShadow ? hoverBoxShadow : defaultStyles.boxShadow,
      maxWidth: maxWidth || dimensions.maxWidth,
      minWidth: minWidth,
      width: width,
      fontSize: dimensions.fontSize,
      color: statusColors.text,
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      pointerEvents: isOpen ? 'auto' : 'none',
      transition:
        transition === 'none'
          ? 'none'
          : transition === 'bounce'
            ? `all ${transitionDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
            : `all ${transitionDuration}ms ease-in-out`,
      lineHeight: '1.4',
      whiteSpace: 'nowrap',
      ...style,
    }

    // Arrow styles
    const getArrowStyles = () => {
      const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      }

      const arrowColorValue = arrowColor || statusColors.arrow
      const arrowSizeValue = arrowSize || dimensions.arrowSize

      switch (currentPlacement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          arrowStyles.bottom = `-${arrowSizeValue}px`
          arrowStyles.left = '50%'
          arrowStyles.transform = 'translateX(-50%)'
          arrowStyles.borderWidth = `${arrowSizeValue}px ${arrowSizeValue}px 0 ${arrowSizeValue}px`
          arrowStyles.borderColor = `${arrowColorValue} transparent transparent transparent`
          break
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          arrowStyles.top = `-${arrowSizeValue}px`
          arrowStyles.left = '50%'
          arrowStyles.transform = 'translateX(-50%)'
          arrowStyles.borderWidth = `0 ${arrowSizeValue}px ${arrowSizeValue}px ${arrowSizeValue}px`
          arrowStyles.borderColor = `transparent transparent ${arrowColorValue} transparent`
          break
        case 'left':
        case 'left-start':
        case 'left-end':
          arrowStyles.right = `-${arrowSizeValue}px`
          arrowStyles.top = '50%'
          arrowStyles.transform = 'translateY(-50%)'
          arrowStyles.borderWidth = `${arrowSizeValue}px 0 ${arrowSizeValue}px ${arrowSizeValue}px`
          arrowStyles.borderColor = `transparent transparent transparent ${arrowColorValue}`
          break
        case 'right':
        case 'right-start':
        case 'right-end':
          arrowStyles.left = `-${arrowSizeValue}px`
          arrowStyles.top = '50%'
          arrowStyles.transform = 'translateY(-50%)'
          arrowStyles.borderWidth = `${arrowSizeValue}px ${arrowSizeValue}px ${arrowSizeValue}px 0`
          arrowStyles.borderColor = `transparent ${arrowColorValue} transparent transparent`
          break
      }

      return arrowStyles
    }

    const arrowStyles = getArrowStyles()

    // Trigger props
    const triggerProps = {
      ref: triggerRef as React.Ref<HTMLDivElement>,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: handleClick,
      tabIndex: trigger === 'focus' ? 0 : undefined,
      'aria-describedby': isOpen ? 'tooltip-content' : undefined,
    }

    const renderTooltipContent = () => {
      if (renderContent) {
        return renderContent(isOpen)
      }

      return (
        <div id="tooltip-content">
          {title && (
            <div
              style={{
                color: titleColor || statusColors.text,
                fontSize: titleFontSize || dimensions.fontSize,
                fontWeight: titleFontWeight || '500',
                fontFamily: titleFontFamily,
                marginBottom: description ? '0.125rem' : 0,
              }}
            >
              {title}
            </div>
          )}
          {description && (
            <div
              style={{
                color: descriptionColor || statusColors.text,
                fontSize: descriptionFontSize || '0.75rem',
                fontWeight: descriptionFontWeight || '400',
                fontFamily: descriptionFontFamily,
                opacity: 0.9,
              }}
            >
              {description}
            </div>
          )}
          {content && <div>{content}</div>}
        </div>
      )
    }

    return (
      <TooltipContext.Provider
        value={{
          isOpen,
          disabled,
          size,
          variant,
          status,
          placement: currentPlacement,
          onOpenChange,
          triggerProps,
        }}
      >
        <div className={cn('relative inline-block', containerClassName)} style={containerStyle}>
          {renderTrigger ? (
            renderTrigger(isOpen, triggerProps)
          ) : (
            <div {...triggerProps} className={cn('inline-block', className)}>
              {children}
            </div>
          )}

          <div
            ref={tooltipRef}
            className={cn('tooltip', className)}
            style={tooltipStyles}
            {...props}
          >
            {showArrow && <div style={arrowStyles} />}
            {renderTooltipContent()}
          </div>
        </div>
      </TooltipContext.Provider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

// Export a simplified TooltipTrigger component for custom layouts
export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { triggerProps } = useTooltip()

    return (
      <div ref={ref} className={cn('inline-block', className)} {...triggerProps} {...props}>
        {children}
      </div>
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'

// Export a simplified TooltipContent component for custom layouts
export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useTooltip()

    return (
      <div
        ref={ref}
        className={cn('tooltip-content', className)}
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TooltipContent.displayName = 'TooltipContent'

export { Tooltip, TooltipTrigger, TooltipContent, useTooltip }
