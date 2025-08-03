import React, { useState, useCallback, forwardRef, useRef, useEffect, useMemo, useId } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils'
import { TooltipContext } from './context'
import { useTooltipContext } from './hooks'
import type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipPlacement,
} from './types'
import type { TooltipContextValue } from './context'

// Re-export types for convenience
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipSize,
  TooltipVariant,
  TooltipStatus,
  TooltipPlacement,
  TooltipTransition,
  TooltipCustomStyles,
} from './types'

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
      offset = 8,
      delayOpen = 0,
      delayClose = 0,
      autoPlacement = true,
      // Fine-tuning position
      offsetX = 0,
      offsetY = 0,
      nudgeLeft = 0,
      nudgeRight = 0,
      nudgeTop = 0,
      nudgeBottom = 0,
      trigger = 'hover',
      showArrow = true,
      arrowSize = 6,
      arrowColor,
      transition = 'fade',
      transitionDuration = 200,
      // Container styles
      containerClassName,
      containerStyle,
      maxWidth,
      minWidth,
      width,
      // Custom styles
      customStyles = {},
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
      // States
      loading = false,
      loadingMessage = 'Loading...',
      emptyMessage = 'No content',
      required = false,
      // Labels
      label,
      helperText,
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
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [currentPlacement, setCurrentPlacement] = useState(placement)

    const triggerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()
    const contentId = useId()

    const isControlled = controlledIsOpen !== undefined
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen

    // Get status colors
    const getStatusColors = useMemo(() => {
      const statusColors = {
        default: {
          background: '#1f2937',
          border: '#374151',
          text: '#ffffff',
          arrow: '#1f2937',
        },
        success: {
          background: '#10b981',
          border: '#059669',
          text: '#ffffff',
          arrow: '#10b981',
        },
        warning: {
          background: '#f59e0b',
          border: '#d97706',
          text: '#ffffff',
          arrow: '#f59e0b',
        },
        error: {
          background: '#ef4444',
          border: '#dc2626',
          text: '#ffffff',
          arrow: '#ef4444',
        },
      }

      return statusColors[status]
    }, [status])

    // Get size dimensions
    const getSizeDimensions = useMemo(() => {
      const dimensions = {
        sm: {
          padding: '0.25rem 0.5rem',
          fontSize: '0.75rem',
          arrowSize: 4,
          maxWidth: '120px',
        },
        md: {
          padding: '0.375rem 0.75rem',
          fontSize: '0.875rem',
          arrowSize: 6,
          maxWidth: '180px',
        },
        lg: {
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          arrowSize: 8,
          maxWidth: '240px',
        },
      }

      return dimensions[size]
    }, [size])

    // Default styles based on variant
    const getDefaultStyles = useMemo(() => {
      const variantStyles = {
        default: {
          background: contentBackgroundColor || getStatusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || getStatusColors.border}`
            : 'none',
          boxShadow:
            contentBoxShadow ||
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        filled: {
          background: contentBackgroundColor || getStatusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || getStatusColors.border}`
            : 'none',
          boxShadow:
            contentBoxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        outlined: {
          background: contentBackgroundColor || 'rgba(255, 255, 255, 0.95)',
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || getStatusColors.border}`
            : `1px solid ${getStatusColors.border}`,
          boxShadow:
            contentBoxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        flat: {
          background: contentBackgroundColor || getStatusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || getStatusColors.border}`
            : 'none',
          boxShadow: contentBoxShadow || 'none',
        },
        elevated: {
          background: contentBackgroundColor || getStatusColors.background,
          border: contentBorderWidth
            ? `${contentBorderWidth} solid ${contentBorderColor || getStatusColors.border}`
            : 'none',
          boxShadow:
            contentBoxShadow ||
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }

      return variantStyles[variant]
    }, [
      variant,
      contentBackgroundColor,
      contentBorderWidth,
      contentBorderColor,
      contentBoxShadow,
      getStatusColors,
    ])

    // Calculate position relative to trigger
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !contentRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
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
          top = triggerRect.top - contentRect.height - offset
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
          break
        case 'bottom':
          top = triggerRect.bottom + offset
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
          break
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
          left = triggerRect.left - contentRect.width - offset
          break
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
          left = triggerRect.right + offset
          break
        case 'top-start':
          top = triggerRect.top - contentRect.height - offset
          left = triggerRect.left
          break
        case 'top-end':
          top = triggerRect.top - contentRect.height - offset
          left = triggerRect.right - contentRect.width
          break
        case 'bottom-start':
          top = triggerRect.bottom + offset
          left = triggerRect.left
          break
        case 'bottom-end':
          top = triggerRect.bottom + offset
          left = triggerRect.right - contentRect.width
          break
        case 'left-start':
          top = triggerRect.top
          left = triggerRect.left - contentRect.width - offset
          break
        case 'left-end':
          top = triggerRect.bottom - contentRect.height
          left = triggerRect.left - contentRect.width - offset
          break
        case 'right-start':
          top = triggerRect.top
          left = triggerRect.right + offset
          break
        case 'right-end':
          top = triggerRect.bottom - contentRect.height
          left = triggerRect.right + offset
          break
      }

      // Auto-placement logic
      if (autoPlacement) {
        // Check horizontal overflow
        if (left < 0) {
          if (currentPlacement.includes('left')) {
            newPlacement = currentPlacement.replace('left', 'right') as TooltipPlacement
          } else if (currentPlacement.includes('right')) {
            newPlacement = currentPlacement.replace('right', 'left') as TooltipPlacement
          }
        }
        if (left + contentRect.width > viewportWidth) {
          if (currentPlacement.includes('right')) {
            newPlacement = currentPlacement.replace('right', 'left') as TooltipPlacement
          } else if (currentPlacement.includes('left')) {
            newPlacement = currentPlacement.replace('left', 'right') as TooltipPlacement
          }
        }

        // Check vertical overflow
        if (top < 0) {
          if (currentPlacement.includes('top')) {
            newPlacement = currentPlacement.replace('top', 'bottom') as TooltipPlacement
          }
        }
        if (top + contentRect.height > viewportHeight) {
          if (currentPlacement.includes('bottom')) {
            newPlacement = currentPlacement.replace('bottom', 'top') as TooltipPlacement
          }
        }
      }

      // Recalculate position if placement changed
      if (newPlacement !== currentPlacement) {
        setCurrentPlacement(newPlacement)
        return
      }

      // Apply fine-tuning offsets
      left += offsetX
      top += offsetY

      // Apply nudge adjustments (nudgeRight moves right, nudgeLeft moves left)
      left += nudgeRight - nudgeLeft
      top += nudgeBottom - nudgeTop

      // Ensure tooltip stays within viewport bounds
      left = Math.max(8, Math.min(left, viewportWidth - contentRect.width - 8))
      top = Math.max(8, Math.min(top, viewportHeight - contentRect.height - 8))

      setPosition({
        top: top + scrollY,
        left: left + scrollX,
      })
    }, [
      currentPlacement,
      offset,
      autoPlacement,
      offsetX,
      offsetY,
      nudgeLeft,
      nudgeRight,
      nudgeTop,
      nudgeBottom,
    ])

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
        handleOpen()
      }
    }, [trigger, handleOpen])

    const handleMouseLeave = useCallback(() => {
      if (trigger === 'hover') {
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
      if (isOpen && contentRef.current) {
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

    // Trigger props
    const triggerProps = useMemo(
      () => ({
        ref: triggerRef as React.Ref<HTMLDivElement>,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClick: handleClick,
        tabIndex: trigger === 'focus' ? 0 : undefined,
        'aria-describedby': isOpen ? contentId : undefined,
        'aria-expanded': trigger === 'click' ? isOpen : undefined,
      }),
      [
        handleMouseEnter,
        handleMouseLeave,
        handleFocus,
        handleBlur,
        handleClick,
        trigger,
        isOpen,
        contentId,
      ]
    )

    // Tooltip content styles
    const contentStyles: React.CSSProperties = useMemo(
      () => ({
        position: 'absolute',
        zIndex: 9999,
        top: position.top,
        left: position.left,
        backgroundColor: getDefaultStyles.background,
        border: getDefaultStyles.border,
        borderRadius: contentBorderRadius || customStyles.borderRadius || '0.375rem',
        padding: contentPadding || customStyles.padding || getSizeDimensions.padding,
        boxShadow: getDefaultStyles.boxShadow,
        maxWidth: maxWidth || getSizeDimensions.maxWidth,
        minWidth: minWidth,
        width: width,
        fontSize: customStyles.fontSize || getSizeDimensions.fontSize,
        fontWeight: customStyles.fontWeight,
        fontFamily: customStyles.fontFamily,
        color: customStyles.textColor || getStatusColors.text,
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition:
          transition === 'none'
            ? 'none'
            : transition === 'bounce'
              ? `all ${transitionDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
              : transition === 'scale'
                ? `all ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms ease-in-out`
                : `all ${transitionDuration}ms ease-in-out`,
        transform:
          transition === 'scale'
            ? isOpen
              ? 'scale(1)'
              : 'scale(0.8)'
            : transition === 'slide'
              ? isOpen
                ? 'translateY(0)'
                : `translateY(-${offset}px)`
              : 'none',
        lineHeight: '1.4',
        whiteSpace: size === 'sm' ? 'nowrap' : 'normal',
        ...customStyles.contentStyles,
        ...style,
      }),
      [
        position,
        getDefaultStyles,
        contentBorderRadius,
        contentPadding,
        maxWidth,
        minWidth,
        width,
        getSizeDimensions,
        getStatusColors,
        isOpen,
        transition,
        transitionDuration,
        offset,
        size,
        customStyles,
        style,
      ]
    )

    // Arrow styles
    const getArrowStyles = useCallback(() => {
      if (!showArrow) return {}

      const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      }

      const arrowColorValue = arrowColor || getStatusColors.arrow
      const arrowSizeValue = arrowSize || getSizeDimensions.arrowSize

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

      return { ...arrowStyles, ...customStyles.arrowStyles }
    }, [
      showArrow,
      arrowColor,
      arrowSize,
      currentPlacement,
      getStatusColors,
      getSizeDimensions,
      customStyles.arrowStyles,
    ])

    const renderTooltipContent = () => {
      if (renderContent) {
        return renderContent(isOpen)
      }

      if (loading) {
        return (
          <div className="flex items-center gap-2">
            <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.25"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            {loadingMessage}
          </div>
        )
      }

      if (!content && !title && !description) {
        return <div className="text-gray-400">{emptyMessage}</div>
      }

      return (
        <div id={contentId}>
          {title && (
            <div
              style={{
                color: titleColor || getStatusColors.text,
                fontSize: titleFontSize || getSizeDimensions.fontSize,
                fontWeight: titleFontWeight || '500',
                fontFamily: titleFontFamily,
                marginBottom: description ? '0.125rem' : 0,
              }}
            >
              {title}
              {required && <span className="text-red-400 ml-1">*</span>}
            </div>
          )}
          {description && (
            <div
              style={{
                color: descriptionColor || getStatusColors.text,
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
          {label && <div className="mt-1 text-xs opacity-80">{label}</div>}
          {helperText && <div className="mt-1 text-xs opacity-70">{helperText}</div>}
        </div>
      )
    }

    const contextValue: TooltipContextValue = {
      isOpen,
      disabled,
      size,
      variant,
      status,
      placement: currentPlacement,
      onOpenChange,
      triggerProps,
      contentId,
    }

    return (
      <TooltipContext.Provider value={contextValue}>
        <div className={cn('relative inline-block', containerClassName)} style={containerStyle}>
          {renderTrigger ? (
            renderTrigger(isOpen, triggerProps)
          ) : (
            <div {...triggerProps} className={cn('inline-block', className)}>
              {children}
            </div>
          )}

          {typeof document !== 'undefined' &&
            createPortal(
              <div
                ref={contentRef}
                className={cn('tooltip-content', className)}
                style={contentStyles}
                role="tooltip"
                aria-hidden={!isOpen}
                {...props}
              >
                {showArrow && <div style={getArrowStyles()} />}
                {renderTooltipContent()}
              </div>,
              document.body
            )}
        </div>
      </TooltipContext.Provider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

// Export a TooltipTrigger component for compound usage
const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { triggerProps } = useTooltipContext()

    return (
      <div ref={ref} className={cn('inline-block', className)} {...triggerProps} {...props}>
        {children}
      </div>
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'

// Export a TooltipContent component for compound usage
const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, style, ...props }, ref) => {
    const { isOpen, contentId } = useTooltipContext()

    if (typeof document === 'undefined') return null

    return createPortal(
      <div
        ref={ref}
        id={contentId}
        className={cn('tooltip-content', className)}
        style={{
          position: 'absolute',
          zIndex: 9999,
          backgroundColor: '#1f2937',
          color: '#ffffff',
          padding: '0.375rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 200ms ease-in-out',
          ...style,
        }}
        role="tooltip"
        aria-hidden={!isOpen}
        {...props}
      >
        {children}
      </div>,
      document.body
    )
  }
)

TooltipContent.displayName = 'TooltipContent'

export { Tooltip, TooltipTrigger, TooltipContent }
