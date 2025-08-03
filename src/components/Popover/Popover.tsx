import React, { useState, useCallback, useMemo, useEffect, useRef, useId, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils'
import { PopoverContext } from './context'
import { calculatePopoverPosition } from './positioning'
import type {
  PopoverVariant,
  PopoverSize,
  PopoverPosition,
  PopoverTransition,
  PopoverTrigger,
  PopoverTone,
  PopoverAnimationConfig,
  PopoverEventHandlers,
  PopoverContextValue,
  RenderContentFunction,
  RenderTriggerFunction,
} from './types'

export interface PopoverProps extends PopoverEventHandlers {
  children?: React.ReactNode

  // Core functionality - controlled/uncontrolled support
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  // Positioning and behavior
  position?: PopoverPosition
  trigger?: PopoverTrigger
  closeOnBlur?: boolean
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean

  // Styling variants
  variant?: PopoverVariant
  size?: PopoverSize
  tone?: PopoverTone

  // Arrow
  hasArrow?: boolean

  // Animation
  transition?: PopoverTransition
  enterDuration?: number
  exitDuration?: number
  easing?: string

  // Portal
  portalContainer?: Element | null

  // Focus management
  initialFocus?: React.RefObject<HTMLElement>
  returnFocus?: boolean

  // Render props
  renderContent?: RenderContentFunction
  renderTrigger?: RenderTriggerFunction

  // Comprehensive styling props
  // Borders
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string

  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  headingColor?: string
  descriptionColor?: string

  // Colors
  backgroundColor?: string
  textColor?: string
  shadowColor?: string
  arrowColor?: string

  // Focus styles
  focusBorderColor?: string
  focusRingColor?: string
  focusRingOffset?: string

  // Shadows
  boxShadow?: string
  hoverShadow?: string
  focusBoxShadow?: string

  // Spacing
  padding?: string
  margin?: string
  gap?: string
  offset?: string
  arrowSize?: string

  // Fine-tuned positioning offsets
  offsetTop?: number
  offsetBottom?: number
  offsetLeft?: number
  offsetRight?: number

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  role?: string
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,

      // Controlled/uncontrolled props
      open,
      defaultOpen = false,
      onOpenChange,

      // Positioning and behavior
      position = 'bottom',
      trigger = 'click',
      closeOnBlur = true,
      closeOnEscape = true,
      closeOnOutsideClick = true,

      // Styling
      variant = 'default',
      size = 'md',
      tone = 'light',

      // Arrow
      hasArrow = true,

      // Animation
      transition = 'fade',
      enterDuration = 200,
      exitDuration = 150,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',

      // Portal
      portalContainer: _portalContainer,

      // Focus management
      initialFocus,
      returnFocus = true,

      // Render props
      renderContent: _renderContent,
      renderTrigger: _renderTrigger,

      // Event handlers
      onClose,
      onOpen,
      onEscapeKeyDown,
      onOutsideClick,
      onAnimationStart: _onAnimationStart,
      onAnimationEnd: _onAnimationEnd,
      onEnter: _onEnter,
      onExit: _onExit,
      onFocus: _onFocus,
      onBlur: _onBlur,
      onMouseEnter: _onMouseEnter,
      onMouseLeave: _onMouseLeave,

      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      headingColor,
      descriptionColor,
      backgroundColor,
      textColor,
      shadowColor,
      arrowColor,
      focusBorderColor,
      focusRingColor,
      focusRingOffset,
      boxShadow,
      hoverShadow,
      focusBoxShadow,
      padding,
      margin,
      gap,
      offset,
      arrowSize,

      // Fine-tuned positioning offsets
      offsetTop = 0,
      offsetBottom = 0,
      offsetLeft = 0,
      offsetRight = 0,

      // Accessibility
      'aria-label': _ariaLabel,
      'aria-describedby': _ariaDescribedby,
      role: _role = 'dialog',

      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalOpen, setInternalOpen] = useState(defaultOpen)

    // Determine if controlled or uncontrolled
    const isControlled = open !== undefined

    // Current value (controlled takes precedence)
    const currentOpen = isControlled ? open : internalOpen

    // Handler that manages both controlled and uncontrolled modes
    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)

        if (newOpen) {
          onOpen?.()
        } else {
          onClose?.()
        }
      },
      [isControlled, onOpenChange, onOpen, onClose]
    )

    // Refs for positioning and focus management
    const triggerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)

    // Generate unique IDs
    const triggerId = useId()
    const contentId = useId()
    const titleId = useId()
    const descriptionId = useId()

    // Animation config
    const animation = useMemo<PopoverAnimationConfig>(
      () => ({
        enterDuration,
        exitDuration,
        easing,
        animationType: transition,
      }),
      [enterDuration, exitDuration, easing, transition]
    )

    // Handle escape key
    useEffect(() => {
      if (!currentOpen || !closeOnEscape) return

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          handleOpenChange(false)
          onEscapeKeyDown?.(event)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [currentOpen, closeOnEscape, handleOpenChange, onEscapeKeyDown])

    // Handle outside clicks
    useEffect(() => {
      if (!currentOpen || !closeOnOutsideClick) return

      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node

        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          handleOpenChange(false)
          onOutsideClick?.(event)
        }
      }

      document.addEventListener('mousedown', handleOutsideClick)
      return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [currentOpen, closeOnOutsideClick, handleOpenChange, onOutsideClick])

    // Focus management
    useEffect(() => {
      if (currentOpen && initialFocus?.current) {
        initialFocus.current.focus()
      }
    }, [currentOpen, initialFocus])

    // Return focus effect
    useEffect(() => {
      const currentTrigger = triggerRef.current
      return () => {
        if (!currentOpen && returnFocus && currentTrigger) {
          currentTrigger.focus()
        }
      }
    }, [currentOpen, returnFocus])

    // Context value
    const contextValue = useMemo<PopoverContextValue>(
      () => ({
        open: currentOpen,
        setOpen: handleOpenChange,
        position,
        trigger,
        variant,
        size,
        tone,
        closeOnBlur,
        closeOnEscape,
        closeOnOutsideClick,
        hasArrow,
        triggerId,
        contentId,
        titleId,
        descriptionId,
        arrowRef,
        triggerRef,
        contentRef,
        animation,
        onOpenChange,
        onClose,
        onOpen,

        // Style props
        borderColor,
        borderWidth,
        borderRadius,
        borderStyle,
        backgroundColor,
        textColor,
        shadowColor,
        arrowColor,
        fontSize,
        fontWeight,
        fontFamily,
        headingColor,
        descriptionColor,
        padding,
        margin,
        gap,
        offset,
        arrowSize,
        offsetTop,
        offsetBottom,
        offsetLeft,
        offsetRight,
        focusBorderColor,
        focusRingColor,
        focusRingOffset,
        boxShadow,
        hoverShadow,
        focusBoxShadow,
      }),
      [
        currentOpen,
        handleOpenChange,
        position,
        trigger,
        variant,
        size,
        tone,
        closeOnBlur,
        closeOnEscape,
        closeOnOutsideClick,
        hasArrow,
        triggerId,
        contentId,
        titleId,
        descriptionId,
        animation,
        onOpenChange,
        onClose,
        onOpen,
        borderColor,
        borderWidth,
        borderRadius,
        borderStyle,
        backgroundColor,
        textColor,
        shadowColor,
        arrowColor,
        fontSize,
        fontWeight,
        fontFamily,
        headingColor,
        descriptionColor,
        padding,
        margin,
        gap,
        offset,
        arrowSize,
        offsetTop,
        offsetBottom,
        offsetLeft,
        offsetRight,
        focusBorderColor,
        focusRingColor,
        focusRingOffset,
        boxShadow,
        hoverShadow,
        focusBoxShadow,
      ]
    )

    return (
      <PopoverContext.Provider value={contextValue}>
        <div ref={ref} role="group" {...props}>
          {children}
        </div>
      </PopoverContext.Provider>
    )
  }
)

Popover.displayName = 'Popover'

// Trigger component
export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  asChild?: boolean
}

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ children, asChild = false, onClick, onMouseEnter, onMouseLeave, onBlur, ...props }, ref) => {
    const { open, setOpen, trigger, triggerId, contentId, triggerRef, closeOnBlur } =
      React.useContext(PopoverContext)!

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (trigger === 'click') {
          setOpen(!open)
        }
        onClick?.(event)
      },
      [trigger, open, setOpen, onClick]
    )

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (trigger === 'hover') {
          setOpen(true)
        }
        onMouseEnter?.(event)
      },
      [trigger, setOpen, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (trigger === 'hover') {
          setOpen(false)
        }
        onMouseLeave?.(event)
      },
      [trigger, setOpen, onMouseLeave]
    )

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        if (closeOnBlur) {
          setOpen(false)
        }
        onBlur?.(event)
      },
      [closeOnBlur, setOpen, onBlur]
    )

    const triggerProps = {
      ref: (node: HTMLElement | null) => {
        if (node) {
          ;(triggerRef as React.MutableRefObject<HTMLElement>).current = node
        }
        if (typeof ref === 'function') ref(node as HTMLElement)
        else if (ref) ref.current = node as HTMLElement
      },
      id: triggerId,
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': open,
      'aria-controls': open ? contentId : undefined,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onBlur: handleBlur,
      ...props,
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, triggerProps)
    }

    return (
      <button type="button" {...triggerProps}>
        {children}
      </button>
    )
  }
)

PopoverTrigger.displayName = 'PopoverTrigger'

// Content component
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  portalContainer?: Element | null
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, portalContainer, style, ...props }, ref) => {
    const {
      open,
      position,
      variant,
      size,
      tone,
      contentId,
      titleId,
      descriptionId,
      contentRef,
      triggerRef,
      hasArrow,
      animation,
      offset,
      offsetTop,
      offsetBottom,
      offsetLeft,
      offsetRight,

      // Style props
      borderColor,
      borderWidth,
      borderRadius,
      borderStyle,
      backgroundColor,
      textColor,
      fontSize,
      fontWeight,
      fontFamily,
      padding,
      boxShadow,
    } = React.useContext(PopoverContext)!

    const [positioningResult, setPositioningResult] = useState<ReturnType<
      typeof calculatePopoverPosition
    > | null>(null)

    // Update position when popover opens or trigger/content changes
    useEffect(() => {
      if (!open || !triggerRef.current) {
        setPositioningResult(null)
        return
      }

      const updatePosition = () => {
        if (triggerRef.current && contentRef.current) {
          try {
            const positioning = calculatePopoverPosition(
              triggerRef.current,
              contentRef.current,
              position,
              hasArrow,
              parseInt(offset || '8'),
              offsetTop || 0,
              offsetBottom || 0,
              offsetLeft || 0,
              offsetRight || 0
            )
            setPositioningResult(positioning)
          } catch (error) {
            console.error('Error calculating popover position:', error)
            // Fallback positioning
            const triggerRect = triggerRef.current.getBoundingClientRect()
            setPositioningResult({
              top: triggerRect.bottom + 8,
              left: triggerRect.left,
              actualPosition: position,
            })
          }
        }
      }

      // Use requestAnimationFrame to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        updatePosition()
      }, 0)

      // Update position on scroll/resize
      const handleUpdate = () => updatePosition()
      window.addEventListener('scroll', handleUpdate, true)
      window.addEventListener('resize', handleUpdate)

      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('scroll', handleUpdate, true)
        window.removeEventListener('resize', handleUpdate)
      }
    }, [
      open,
      position,
      hasArrow,
      offset,
      offsetTop,
      offsetBottom,
      offsetLeft,
      offsetRight,
      triggerRef,
      contentRef,
    ])

    if (!open) return null

    // Base styles
    const baseStyles = 'outline-none'

    // Variant styles
    const variants = {
      default: 'bg-white border border-gray-200 shadow-lg',
      bordered: 'bg-white border-2 border-gray-300 shadow-md',
      shadowed: 'bg-white border-0 shadow-xl',
      filled: 'bg-gray-50 border border-gray-200 shadow-sm',
      translucent: 'bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-lg',
      minimal: 'bg-white border border-gray-100 shadow-sm',
    }

    // Size styles
    const sizes = {
      sm: 'text-sm max-w-xs',
      md: 'text-base max-w-sm',
      lg: 'text-lg max-w-md',
    }

    // Tone styles
    const tones = {
      light: '',
      dark: 'bg-gray-900 text-white border-gray-700',
      info: 'bg-blue-50 text-blue-900 border-blue-200',
      danger: 'bg-red-50 text-red-900 border-red-200',
      success: 'bg-green-50 text-green-900 border-green-200',
      warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    }

    // Padding styles
    const paddingStyles = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }

    // Border radius styles
    const radiusStyles = {
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
    }

    // Animation styles
    const getAnimationStyles = () => {
      switch (animation.animationType) {
        case 'fade':
          return `transition-opacity duration-${animation.enterDuration} ${animation.easing}`
        case 'scale':
          return `transition-all duration-${animation.enterDuration} ${animation.easing} animate-in zoom-in-95`
        case 'slide':
          return `transition-all duration-${animation.enterDuration} ${animation.easing} animate-in slide-in-from-top-2`
        case 'pop':
          return `transition-all duration-${animation.enterDuration} ${animation.easing} animate-in zoom-in-95 slide-in-from-bottom-2`
        default:
          return ''
      }
    }

    // Get fallback position based on trigger if positioning not calculated yet
    const getFallbackPosition = () => {
      if (!triggerRef.current) return { top: 0, left: 0 }
      const rect = triggerRef.current.getBoundingClientRect()
      const pos = {
        top: rect.bottom + 8,
        left: rect.left,
      }
      return pos
    }

    const fallbackPos = getFallbackPosition()

    // Custom styles object
    const customStyles: React.CSSProperties = {
      ...style,
      position: 'fixed',
      top: positioningResult?.top ?? fallbackPos.top,
      left: positioningResult?.left ?? fallbackPos.left,
      zIndex: 9999,
    }

    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderColor) customStyles.borderColor = borderColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderRadius) customStyles.borderRadius = borderRadius
    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight
    if (fontFamily) customStyles.fontFamily = fontFamily
    if (backgroundColor) customStyles.backgroundColor = backgroundColor
    if (textColor) customStyles.color = textColor
    if (boxShadow) customStyles.boxShadow = boxShadow
    if (padding) customStyles.padding = padding

    const content = (
      <div
        ref={(node) => {
          if (contentRef) {
            ;(contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        id={contentId}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          tones[tone],
          !padding && paddingStyles[size],
          !borderRadius && radiusStyles[size],
          getAnimationStyles(),
          className
        )}
        style={customStyles}
        role="dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...props}
      >
        {children}
      </div>
    )

    // Render in portal
    const container = portalContainer || document.body
    return createPortal(content, container)
  }
)

PopoverContent.displayName = 'PopoverContent'

// Arrow component
export interface PopoverArrowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional className for styling the arrow */
  className?: string
}

const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, style, ...props }, ref) => {
    const {
      hasArrow,
      open,
      position,
      arrowRef,
      triggerRef,
      contentRef,
      variant: _variant,
      tone,
      arrowColor,
      arrowSize,
      offset,
      offsetTop,
      offsetBottom,
      offsetLeft,
      offsetRight,
    } = React.useContext(PopoverContext)!

    const [arrowPosition, setArrowPosition] = useState<React.CSSProperties>({})

    // Calculate arrow position when popover is open
    useEffect(() => {
      if (!open || !hasArrow || !triggerRef.current || !contentRef.current) {
        return
      }

      const updateArrowPosition = () => {
        if (triggerRef.current && contentRef.current) {
          const positioning = calculatePopoverPosition(
            triggerRef.current,
            contentRef.current,
            position,
            hasArrow,
            parseInt(offset || '8'),
            offsetTop || 0,
            offsetBottom || 0,
            offsetLeft || 0,
            offsetRight || 0
          )

          if (positioning.arrowPosition) {
            setArrowPosition(positioning.arrowPosition)
          }
        }
      }

      updateArrowPosition()

      // Update on scroll/resize
      const handleUpdate = () => updateArrowPosition()
      window.addEventListener('scroll', handleUpdate, true)
      window.addEventListener('resize', handleUpdate)

      return () => {
        window.removeEventListener('scroll', handleUpdate, true)
        window.removeEventListener('resize', handleUpdate)
      }
    }, [
      open,
      hasArrow,
      position,
      offset,
      offsetTop,
      offsetBottom,
      offsetLeft,
      offsetRight,
      triggerRef,
      contentRef,
    ])

    if (!hasArrow) return null

    // Arrow styles based on variant and tone
    const getArrowColor = () => {
      if (arrowColor) return arrowColor

      switch (tone) {
        case 'dark':
          return '#1f2937'
        case 'info':
          return '#dbeafe'
        case 'danger':
          return '#fef2f2'
        case 'success':
          return '#f0fdf4'
        case 'warning':
          return '#fffbeb'
        default:
          return '#ffffff'
      }
    }

    const customStyles: React.CSSProperties = {
      ...style,
      ...arrowPosition,
      width: arrowSize || '8px',
      height: arrowSize || '8px',
      backgroundColor: getArrowColor(),
    }

    return (
      <div
        ref={(node) => {
          if (arrowRef) {
            ;(arrowRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className={cn('absolute border border-inherit', className)}
        style={customStyles}
        {...props}
      />
    )
  }
)

PopoverArrow.displayName = 'PopoverArrow'

// Title component
export interface PopoverTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ children, className, level = 3, style, ...props }, ref) => {
    const { titleId, size, headingColor, fontSize, fontWeight } = React.useContext(PopoverContext)!

    // Size-based title styles
    const titleSizes = {
      sm: 'text-sm font-medium',
      md: 'text-base font-semibold',
      lg: 'text-lg font-semibold',
    }

    const customStyles: React.CSSProperties = { ...style }
    if (headingColor) customStyles.color = headingColor
    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight

    // Use createElement to avoid TypeScript issues with dynamic components
    return React.createElement(
      `h${level}`,
      {
        ref,
        id: titleId,
        className: cn('leading-none', titleSizes[size], className),
        style: customStyles,
        ...props,
      },
      children
    )
  }
)

PopoverTitle.displayName = 'PopoverTitle'

// Description component
export interface PopoverDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ children, className, style, ...props }, ref) => {
    const { descriptionId, size, descriptionColor, fontSize } = React.useContext(PopoverContext)!

    // Size-based description styles
    const descriptionSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    const customStyles: React.CSSProperties = { ...style }
    if (descriptionColor) customStyles.color = descriptionColor
    if (fontSize) customStyles.fontSize = fontSize

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn('text-gray-600 leading-relaxed', descriptionSizes[size], className)}
        style={customStyles}
        {...props}
      >
        {children}
      </p>
    )
  }
)

PopoverDescription.displayName = 'PopoverDescription'

// Close component
export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  asChild?: boolean
}

const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ children, asChild = false, onClick, ...props }, ref) => {
    const { setOpen } = React.useContext(PopoverContext)!

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false)
        onClick?.(event)
      },
      [setOpen, onClick]
    )

    const closeProps = {
      ref,
      onClick: handleClick,
      ...props,
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, closeProps)
    }

    return (
      <button type="button" {...closeProps}>
        {children || (
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    )
  }
)

PopoverClose.displayName = 'PopoverClose'

// Export all components
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
}

// Compound component interface
interface PopoverComponent
  extends React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<HTMLDivElement>> {
  Trigger: typeof PopoverTrigger
  Content: typeof PopoverContent
  Arrow: typeof PopoverArrow
  Title: typeof PopoverTitle
  Description: typeof PopoverDescription
  Close: typeof PopoverClose
}

// Create compound component
const PopoverCompound = Popover as unknown as PopoverComponent
PopoverCompound.Trigger = PopoverTrigger
PopoverCompound.Content = PopoverContent
PopoverCompound.Arrow = PopoverArrow
PopoverCompound.Title = PopoverTitle
PopoverCompound.Description = PopoverDescription
PopoverCompound.Close = PopoverClose

export default PopoverCompound
