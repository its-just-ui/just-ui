import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { cn } from '@/utils'
import { AnchorContext, useAnchor } from './context'
import { useScrollSpy, useSmoothScroll, useHashSync } from './hooks'
import type {
  AnchorVariant,
  AnchorSize,
  AnchorDirection,
  AnchorPosition,
  ScrollBehavior,
  EasingFunction,
  AnchorContextValue,
  RenderLinkFunction,
  RenderGroupFunction,
  RenderIndicatorFunction,
} from './types'

export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children?: React.ReactNode

  // Controlled/uncontrolled behavior
  activeId?: string | null
  defaultActiveId?: string | null
  onChange?: (activeId: string | null) => void

  // Configuration
  variant?: AnchorVariant
  size?: AnchorSize
  direction?: AnchorDirection
  position?: AnchorPosition
  offset?: number
  scrollBehavior?: ScrollBehavior
  easing?: EasingFunction
  duration?: number

  // Features
  hashSync?: boolean
  scrollSpy?: boolean
  targetIds?: string[]

  // Custom renderers
  _renderLink?: RenderLinkFunction
  _renderGroup?: RenderGroupFunction
  _renderIndicator?: RenderIndicatorFunction

  // Event handlers
  onClick?: (id: string, href: string) => void
  onScrollStart?: (targetId: string) => void
  onScrollEnd?: (targetId: string) => void
  onActiveChange?: (activeId: string | null, previousId: string | null) => void

  // Styling props
  fontSize?: string
  fontWeight?: string
  textColor?: string
  hoverColor?: string
  activeColor?: string
  visitedColor?: string
  borderStyle?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  backgroundColor?: string
  hoverBackgroundColor?: string
  indicatorColor?: string
  lineColor?: string
  dotColor?: string
  focusRingColor?: string
  _focusRingWidth?: string
  _focusOutline?: string
  boxShadow?: string
  gap?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  margin?: string

  // Underline customization
  underlineWidth?: string
  underlineHeight?: string
  _underlineOffset?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  role?: string
}

const Anchor = React.forwardRef<HTMLDivElement, AnchorProps>(
  (
    {
      className,
      children,

      // Controlled/uncontrolled
      activeId,
      defaultActiveId = null,
      onChange,

      // Configuration
      variant = 'underline',
      size = 'md',
      direction = 'vertical',
      position = 'static',
      offset = 80,
      scrollBehavior = 'smooth',
      easing = 'ease-out',
      duration = 800,

      // Features
      hashSync = false,
      scrollSpy = true,
      targetIds = [],

      // Custom renderers
      _renderLink,
      _renderGroup,
      _renderIndicator,

      // Event handlers
      onClick,
      onScrollStart,
      onScrollEnd,
      onActiveChange,

      // Style props
      fontSize,
      fontWeight,
      textColor,
      hoverColor,
      activeColor,
      visitedColor,
      borderStyle,
      borderColor,
      borderWidth,
      borderRadius,
      backgroundColor,
      hoverBackgroundColor,
      indicatorColor,
      lineColor,
      dotColor,
      focusRingColor,
      _focusRingWidth,
      focusOutline,
      boxShadow,
      gap,
      padding,
      paddingX,
      paddingY,
      margin,

      // Underline customization
      underlineWidth,
      underlineHeight,
      underlineOffset,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      role = 'navigation',

      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalActiveId, setInternalActiveId] = useState<string | null>(defaultActiveId)
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set())

    // Determine if controlled or uncontrolled
    const isControlled = activeId !== undefined
    const _currentActiveId = isControlled ? activeId : internalActiveId

    // Scroll spy hook
    const scrollSpyActiveId = useScrollSpy(targetIds, {
      offset,
      onChange: scrollSpy && !isControlled ? setInternalActiveId : undefined,
    })

    // Use scroll spy result if not controlled and scroll spy is enabled
    const finalActiveId = isControlled
      ? activeId
      : scrollSpy && scrollSpyActiveId
        ? scrollSpyActiveId
        : internalActiveId

    // Smooth scroll hook
    const scrollToElement = useSmoothScroll({
      behavior: scrollBehavior,
      offset,
      duration,
      easing,
      onScrollStart,
      onScrollEnd,
    })

    // Hash synchronization
    useHashSync(hashSync ? finalActiveId : null, (hash) => {
      if (!isControlled) {
        setInternalActiveId(hash)
      }
      onChange?.(hash)
    })

    // Handle active ID changes
    const previousActiveId = useRef<string | null>(finalActiveId)
    useEffect(() => {
      if (finalActiveId !== previousActiveId.current) {
        onActiveChange?.(finalActiveId, previousActiveId.current)
        previousActiveId.current = finalActiveId
      }
    }, [finalActiveId, onActiveChange])

    // Handlers
    const handleActiveChange = useCallback(
      (newActiveId: string | null) => {
        if (!isControlled) {
          setInternalActiveId(newActiveId)
        }
        onChange?.(newActiveId)
      },
      [isControlled, onChange]
    )

    const addVisitedId = useCallback((id: string) => {
      setVisitedIds((prev) => new Set([...prev, id]))
    }, [])

    const scrollToAnchor = useCallback(
      (id: string, behavior?: ScrollBehavior) => {
        scrollToElement(id, behavior)
        addVisitedId(id)
        if (!isControlled) {
          setInternalActiveId(id)
        }
        onChange?.(id)
      },
      [scrollToElement, addVisitedId, isControlled, onChange]
    )

    // Context value
    const contextValue = useMemo<AnchorContextValue>(
      () => ({
        // State
        activeId: finalActiveId,
        setActiveId: handleActiveChange,
        hoveredId,
        setHoveredId,
        visitedIds,
        addVisitedId,

        // Configuration
        variant,
        size,
        direction,
        position,
        offset,
        scrollBehavior,
        easing,
        duration,

        // Event handlers
        onChange,
        onClick,
        onScrollStart,
        onScrollEnd,
        onActiveChange,

        // Methods
        scrollToAnchor,

        // Style props
        fontSize,
        fontWeight,
        textColor,
        hoverColor,
        activeColor,
        visitedColor,
        borderStyle,
        borderColor,
        borderWidth,
        borderRadius,
        backgroundColor,
        hoverBackgroundColor,
        indicatorColor,
        lineColor,
        dotColor,
        focusRingColor,
        focusRingWidth,
        focusOutline,
        boxShadow,
        gap,
        padding,
        paddingX,
        paddingY,
        margin,

        // Underline customization
        underlineWidth,
        underlineHeight,
        underlineOffset,
      }),
      [
        finalActiveId,
        handleActiveChange,
        hoveredId,
        visitedIds,
        addVisitedId,
        variant,
        size,
        direction,
        position,
        offset,
        scrollBehavior,
        easing,
        duration,
        onChange,
        onClick,
        onScrollStart,
        onScrollEnd,
        onActiveChange,
        scrollToAnchor,
        fontSize,
        fontWeight,
        textColor,
        hoverColor,
        activeColor,
        visitedColor,
        borderStyle,
        borderColor,
        borderWidth,
        borderRadius,
        backgroundColor,
        hoverBackgroundColor,
        indicatorColor,
        lineColor,
        dotColor,
        focusRingColor,
        focusRingWidth,
        focusOutline,
        boxShadow,
        gap,
        padding,
        paddingX,
        paddingY,
        margin,

        // Underline customization
        underlineWidth,
        underlineHeight,
        underlineOffset,
      ]
    )

    // Base styles
    const baseStyles = 'relative'

    // Direction-based layout styles
    const directionStyles = {
      vertical: 'flex flex-col items-stretch',
      horizontal: 'flex flex-row flex-wrap items-center',
    }

    // Position-based styles
    const positionStyles = {
      static: '',
      sticky: 'sticky top-0 z-10',
      fixed: 'fixed top-0 left-0 z-50',
    }

    // Variant styles with direction support
    const getVariantStyles = (variant: AnchorVariant, direction: AnchorDirection) => {
      const baseVariants = {
        underline: direction === 'vertical' ? 'gap-y-1' : 'gap-x-4',
        'side-border': direction === 'vertical' ? 'gap-y-1' : 'gap-x-4',
        filled:
          direction === 'vertical'
            ? 'bg-gray-50 rounded-lg p-4 gap-y-1'
            : 'bg-gray-50 rounded-lg px-4 py-2 gap-x-4',
        minimal: direction === 'vertical' ? 'gap-y-2' : 'gap-x-6',
        dot: direction === 'vertical' ? 'gap-y-2' : 'gap-x-4',
        'icon-based': direction === 'vertical' ? 'gap-y-1' : 'gap-x-3',
        nested: direction === 'vertical' ? 'gap-y-1' : 'gap-x-2',
      }
      return baseVariants[variant]
    }

    // Size styles
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    // Custom styles object
    const customStyles: React.CSSProperties = {}

    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight
    if (backgroundColor) customStyles.backgroundColor = backgroundColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderColor) customStyles.borderColor = borderColor
    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderRadius) customStyles.borderRadius = borderRadius
    if (boxShadow) customStyles.boxShadow = boxShadow
    if (padding) customStyles.padding = padding
    if (paddingX) {
      customStyles.paddingLeft = paddingX
      customStyles.paddingRight = paddingX
    }
    if (paddingY) {
      customStyles.paddingTop = paddingY
      customStyles.paddingBottom = paddingY
    }
    if (margin) customStyles.margin = margin
    if (gap) customStyles.gap = gap

    return (
      <AnchorContext.Provider value={contextValue}>
        <nav
          ref={ref}
          className={cn(
            baseStyles,
            directionStyles[direction],
            positionStyles[position],
            getVariantStyles(variant, direction),
            sizes[size],
            className
          )}
          style={customStyles}
          role={role}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          data-testid="anchor"
          {...props}
        >
          {children}
        </nav>
      </AnchorContext.Provider>
    )
  }
)

Anchor.displayName = 'Anchor'

// Sub-components
export interface AnchorLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  level?: number
  icon?: React.ReactNode
  active?: boolean

  // Event handlers
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const AnchorLink = React.forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  (
    {
      className,
      children,
      href,
      disabled = false,
      level = 0,
      icon,
      active,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const {
      activeId,
      hoveredId,
      visitedIds,
      setHoveredId,
      addVisitedId,
      scrollToAnchor,
      variant,
      size,
      direction,
      textColor,
      hoverColor,
      activeColor,
      visitedColor,
      focusRingColor,
      _focusRingWidth,
      _focusOutline,
      underlineWidth,
      underlineHeight,
      _underlineOffset,
      onClick: contextOnClick,
    } = useAnchor()

    const targetId = href.replace('#', '')
    const isActive = active !== undefined ? active : activeId === targetId
    const isHovered = hoveredId === targetId
    const isVisited = visitedIds.has(targetId)

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault()
          return
        }

        e.preventDefault()
        scrollToAnchor(targetId)
        addVisitedId(targetId)
        onClick?.(e)
        contextOnClick?.(targetId, href)
      },
      [disabled, scrollToAnchor, targetId, addVisitedId, onClick, contextOnClick, href]
    )

    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        setHoveredId(targetId)
        onMouseEnter?.()
      }
    }, [disabled, setHoveredId, targetId, onMouseEnter])

    const handleMouseLeave = useCallback(() => {
      if (!disabled) {
        setHoveredId(null)
        onMouseLeave?.()
      }
    }, [disabled, setHoveredId, onMouseLeave])

    // Base styles - use flex instead of inline-flex for proper vertical stacking
    const baseStyles = cn(
      direction === 'vertical'
        ? 'flex items-center gap-2 w-full'
        : 'inline-flex items-center gap-2',
      'no-underline transition-all duration-200',
      'focus:outline-none focus-visible:outline-none active:outline-none',
      'focus:ring-0 focus-visible:ring-0 active:ring-0',
      disabled && 'cursor-not-allowed opacity-50',
      !disabled && 'cursor-pointer hover:transition-colors'
    )

    // Variant-specific styles with direction support
    const getVariantStyles = (variant: AnchorVariant, direction: AnchorDirection) => {
      const styles = {
        underline: cn(
          'relative pb-1 w-full',
          // Use border for underline to ensure it shows up
          isActive && 'border-b-2 border-current',
          !disabled &&
            !isActive &&
            'hover:border-b-2 hover:border-current hover:border-opacity-60 transition-all duration-200'
        ),
        'side-border': cn(
          'relative w-full',
          direction === 'vertical' ? 'pl-4' : 'pb-1',
          isActive &&
            (direction === 'vertical'
              ? 'border-l-2 border-current font-medium'
              : 'border-b-2 border-current font-medium'),
          !disabled &&
            !isActive &&
            (direction === 'vertical'
              ? 'hover:border-l-2 hover:border-current hover:border-opacity-60 transition-all duration-200'
              : 'hover:border-b-2 hover:border-current hover:border-opacity-60 transition-all duration-200')
        ),
        filled: cn(
          'w-full',
          direction === 'vertical' ? 'px-3 py-2 rounded-md' : 'px-4 py-2 rounded-full',
          isActive && 'bg-current/10 font-medium',
          !disabled && 'hover:bg-current/5'
        ),
        minimal: cn(
          direction === 'vertical' ? 'w-full' : 'whitespace-nowrap',
          isActive && 'font-medium',
          !disabled && 'hover:text-current'
        ),
        dot: cn(
          'relative w-full',
          direction === 'vertical' ? 'pl-6' : 'pl-4',
          isActive && 'font-medium'
        ),
        'icon-based': cn('items-center gap-3 w-full', isActive && 'font-medium'),
        nested: cn(
          'w-full', // Ensure full width for proper vertical stacking
          isActive && 'font-medium',
          direction === 'vertical' && level > 0 && `ml-${level * 4}`
        ),
      }
      return styles[variant]
    }

    // Size styles
    const sizeStyles = {
      sm: 'text-sm py-1',
      md: 'text-base py-1.5',
      lg: 'text-lg py-2',
    }

    // Color styles
    const getTextColor = () => {
      if (disabled) return 'text-gray-400'
      if (isActive && activeColor) return ''
      if (isHovered && hoverColor) return ''
      if (isVisited && visitedColor) return ''
      if (textColor) return ''

      if (isActive) return 'text-blue-600'
      if (isHovered) return 'text-blue-500'
      if (isVisited) return 'text-purple-600'
      return 'text-gray-700'
    }

    // Custom styles
    const customStyles: React.CSSProperties = {}
    if (isActive && activeColor) customStyles.color = activeColor
    else if (isHovered && hoverColor) customStyles.color = hoverColor
    else if (isVisited && visitedColor) customStyles.color = visitedColor
    else if (textColor) customStyles.color = textColor

    // Underline customization for underline variant
    if (variant === 'underline' && (underlineWidth || underlineHeight)) {
      if (underlineHeight) {
        customStyles.borderBottomWidth = underlineHeight
      }
      if (underlineWidth && underlineWidth !== '100%') {
        // For custom width, we'll use a pseudo-element approach
        Object.assign(customStyles, {
          '--underline-width': underlineWidth,
          '--underline-height': underlineHeight || '2px',
        })
      }
    }

    // Accessibility styles (keyboard navigation only)
    const focusStyles = cn(
      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
      focusRingColor && 'focus-visible:ring-current'
    )

    if (focusRingColor) {
      customStyles['--tw-ring-color'] = focusRingColor
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          baseStyles,
          getVariantStyles(variant, direction),
          sizeStyles[size],
          getTextColor(),
          focusStyles,
          // Custom underline width handling
          variant === 'underline' &&
            underlineWidth &&
            underlineWidth !== '100%' && [
              'border-b-0', // Remove default border
              'after:absolute after:bottom-0 after:left-0 after:bg-current after:transition-all after:duration-200',
              'after:w-[var(--underline-width)] after:h-[var(--underline-height,2px)]',
              isActive && 'after:opacity-100',
              !disabled && !isActive && 'hover:after:opacity-60',
            ],
          className
        )}
        style={customStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        data-testid="anchor-link"
        {...props}
      >
        {/* Dot indicator for dot variant */}
        {variant === 'dot' && (
          <span
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border',
              isActive ? 'bg-current border-current' : 'bg-transparent border-current/30'
            )}
          />
        )}

        {/* Icon */}
        {icon && <span className="flex-shrink-0 w-4 h-4">{icon}</span>}

        {/* Content */}
        <span className="flex-1">{children}</span>
      </a>
    )
  }
)

AnchorLink.displayName = 'AnchorLink'

export interface AnchorGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  title?: string
  level?: number
  collapsible?: boolean
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

const AnchorGroup = React.forwardRef<HTMLDivElement, AnchorGroupProps>(
  (
    {
      className,
      children,
      title,
      level = 0,
      collapsible = false,
      defaultExpanded = true,
      expanded,
      onExpandedChange,
      ...props
    },
    ref
  ) => {
    const { size, gap } = useAnchor()
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)

    const isControlled = expanded !== undefined
    const isExpanded = isControlled ? expanded : internalExpanded

    const handleToggle = useCallback(() => {
      if (!collapsible) return

      const newExpanded = !isExpanded
      if (!isControlled) {
        setInternalExpanded(newExpanded)
      }
      onExpandedChange?.(newExpanded)
    }, [collapsible, isExpanded, isControlled, onExpandedChange])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleToggle()
        }
      },
      [collapsible, handleToggle]
    )

    // Size styles for title
    const titleSizes = {
      sm: 'text-xs font-semibold',
      md: 'text-sm font-semibold',
      lg: 'text-base font-semibold',
    }

    // Level-based indentation with proper spacing
    const getIndentationStyles = (level: number) => {
      if (level === 0) return ''
      const indentMap: Record<number, string> = {
        1: 'ml-4 pl-2 border-l border-gray-100',
        2: 'ml-8 pl-3 border-l border-gray-100',
        3: 'ml-12 pl-4 border-l border-gray-100',
      }
      return indentMap[level] || `ml-${level * 4} pl-${level + 1} border-l border-gray-100`
    }

    const indentationClass = getIndentationStyles(level)

    // Custom styles
    const customStyles: React.CSSProperties = {}
    if (gap) customStyles.gap = gap

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-y-2 w-full', indentationClass, className)}
        style={customStyles}
        {...props}
      >
        {title && (
          <div
            className={cn(
              'flex items-center justify-between',
              collapsible && 'cursor-pointer select-none',
              titleSizes[size],
              'text-gray-900 uppercase tracking-wide'
            )}
            onClick={collapsible ? handleToggle : undefined}
            onKeyDown={collapsible ? handleKeyDown : undefined}
            tabIndex={collapsible ? 0 : undefined}
            role={collapsible ? 'button' : undefined}
            aria-expanded={collapsible ? isExpanded : undefined}
            aria-controls={
              collapsible ? `group-${title.replace(/\s+/g, '-').toLowerCase()}` : undefined
            }
          >
            <span>{title}</span>
            {collapsible && (
              <svg
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isExpanded ? 'rotate-90' : 'rotate-0'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        )}

        {isExpanded && (
          <div
            className={cn(
              'flex flex-col gap-y-1 w-full',
              title && 'mt-2',
              // Improved nested spacing
              level === 0 && title ? 'ml-0' : title ? 'ml-1' : 'ml-0'
            )}
            id={
              collapsible && title ? `group-${title.replace(/\s+/g, '-').toLowerCase()}` : undefined
            }
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)

AnchorGroup.displayName = 'AnchorGroup'

export interface AnchorIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right'
  animated?: boolean
  width?: string
  color?: string
}

const AnchorIndicator = React.forwardRef<HTMLDivElement, AnchorIndicatorProps>(
  ({ className, position = 'left', animated = true, width = '2px', color, ...props }, ref) => {
    const { activeId, variant, indicatorColor } = useAnchor()
    const [indicatorStyle, setIndicatorStyle] = useState<{
      top: number
      height: number
      opacity: number
    }>({
      top: 0,
      height: 0,
      opacity: 0,
    })

    useEffect(() => {
      if (!activeId) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      // Find the active link element
      const activeElement = document.querySelector(`a[href="#${activeId}"]`)
      if (!activeElement) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      const rect = activeElement.getBoundingClientRect()
      const container = activeElement.closest('[data-testid="anchor"]')

      if (!container) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      const containerRect = container.getBoundingClientRect()
      const relativeTop = rect.top - containerRect.top

      setIndicatorStyle({
        top: relativeTop,
        height: rect.height,
        opacity: 1,
      })
    }, [activeId])

    // Don't render for variants that don't use indicators
    if (variant === 'underline' || variant === 'filled' || variant === 'dot') {
      return null
    }

    const baseStyles = cn(
      'absolute transition-all duration-300 ease-out rounded-full',
      position === 'left' ? 'left-0' : 'right-0',
      !animated && 'transition-none'
    )

    const customStyles: React.CSSProperties = {
      width,
      top: `${indicatorStyle.top}px`,
      height: `${indicatorStyle.height}px`,
      opacity: indicatorStyle.opacity,
      backgroundColor: color || indicatorColor || '#3b82f6',
      transform: `translateY(${indicatorStyle.height > 0 ? '0' : '-50%'})`,
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, className)}
        style={customStyles}
        data-testid="anchor-indicator"
        {...props}
      />
    )
  }
)

AnchorIndicator.displayName = 'AnchorIndicator'

export interface AnchorContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  anchorId: string
  title?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  offset?: number
}

const AnchorContent = React.forwardRef<HTMLDivElement, AnchorContentProps>(
  ({ className, children, anchorId, title, level = 2, offset, ...props }, ref) => {
    // Try to get context, but don't fail if not available
    let contextOffset = 80 // default fallback
    try {
      const context = useAnchor()
      contextOffset = context.offset
    } catch {
      // Component used outside Anchor context, use fallback
    }
    const actualOffset = offset ?? contextOffset

    // Generate heading component based on level
    const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements

    // Heading styles based on level
    const headingStyles = {
      1: 'text-4xl font-bold',
      2: 'text-3xl font-bold',
      3: 'text-2xl font-semibold',
      4: 'text-xl font-semibold',
      5: 'text-lg font-medium',
      6: 'text-base font-medium',
    }

    // Add scroll margin to account for fixed headers and prevent overlap
    const customStyles: React.CSSProperties = {
      scrollMarginTop: `${actualOffset}px`,
      paddingTop: `${Math.max(actualOffset * 0.3, 20)}px`, // Add padding to prevent content overlap
    }

    // Dynamic scroll margin class based on offset
    const getScrollMarginClass = (offset: number) => {
      if (offset <= 40) return 'scroll-mt-10'
      if (offset <= 80) return 'scroll-mt-20'
      if (offset <= 120) return 'scroll-mt-32'
      return 'scroll-mt-40'
    }

    return (
      <section
        ref={ref}
        id={anchorId}
        className={cn(
          'relative',
          getScrollMarginClass(actualOffset),
          'mb-8', // Add consistent bottom margin
          className
        )}
        style={customStyles}
        data-testid="anchor-content"
        {...props}
      >
        {title && (
          <HeadingComponent
            className={cn(
              'mb-6 text-gray-900 leading-tight',
              headingStyles[level],
              // Add extra spacing for larger headings
              level <= 2 && 'mb-8'
            )}
          >
            {title}
          </HeadingComponent>
        )}
        <div className="space-y-4">{children}</div>
      </section>
    )
  }
)

AnchorContent.displayName = 'AnchorContent'

// Compound component interface
interface AnchorComponent
  extends React.ForwardRefExoticComponent<AnchorProps & React.RefAttributes<HTMLDivElement>> {
  Link: typeof AnchorLink
  Group: typeof AnchorGroup
  Indicator: typeof AnchorIndicator
  Content: typeof AnchorContent
}

// Create compound component
const AnchorCompound = Anchor as unknown as AnchorComponent
AnchorCompound.Link = AnchorLink
AnchorCompound.Group = AnchorGroup
AnchorCompound.Indicator = AnchorIndicator
AnchorCompound.Content = AnchorContent

export { Anchor, AnchorLink, AnchorGroup, AnchorIndicator, AnchorContent }
export default AnchorCompound
