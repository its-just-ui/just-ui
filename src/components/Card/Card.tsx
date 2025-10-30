import React, { useState, useCallback, useMemo } from 'react'
import { cn } from '@/utils'
import { CardContext } from './context'
import type {
  CardVariant,
  CardSize,
  CardStatus,
  CardTransition,
  CardMediaConfig,
  CardBadgeConfig,
  CardAction,
  CardContextValue,
  RenderHeaderFunction,
  RenderMediaFunction,
  RenderBodyFunction,
  RenderFooterFunction,
  RenderOverlayFunction,
  RenderActionsFunction,
  RenderEmptyFunction,
  RenderLoadingFunction,
  ActionClickHandler,
} from './types'

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onDoubleClick'> {
  children?: React.ReactNode

  // Core functionality - controlled/uncontrolled support
  isSelected?: boolean
  defaultSelected?: boolean
  onSelectChange?: (selected: boolean) => void

  isExpanded?: boolean
  defaultExpanded?: boolean
  onExpandChange?: (expanded: boolean) => void

  isLoading?: boolean
  defaultLoading?: boolean
  onLoadingChange?: (loading: boolean) => void

  isDisabled?: boolean
  defaultDisabled?: boolean
  onDisabledChange?: (disabled: boolean) => void

  isFeatured?: boolean
  defaultFeatured?: boolean
  onFeaturedChange?: (featured: boolean) => void

  // Features
  selectable?: boolean
  expandable?: boolean
  showCheckbox?: boolean
  checkboxPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  // Styling variants
  variant?: CardVariant
  size?: CardSize
  status?: CardStatus

  // Transitions
  transition?: CardTransition
  transitionDuration?: number
  hoverElevation?: boolean

  // Content
  title?: string
  subtitle?: string
  description?: string
  metadata?: string
  helperText?: string

  // Media
  media?: CardMediaConfig

  // Badges
  badges?: CardBadgeConfig[]

  // Actions
  actions?: CardAction[]
  primaryAction?: CardAction
  secondaryActions?: CardAction[]

  // Empty/Loading states
  emptyMessage?: string
  emptyIllustration?: React.ReactNode
  emptyAction?: CardAction
  loadingMessage?: string
  skeletonLines?: number

  // Custom render functions
  renderHeader?: RenderHeaderFunction
  renderMedia?: RenderMediaFunction
  renderBody?: RenderBodyFunction
  renderFooter?: RenderFooterFunction
  renderOverlay?: RenderOverlayFunction
  renderActions?: RenderActionsFunction
  renderEmpty?: RenderEmptyFunction
  renderLoading?: RenderLoadingFunction

  // Icons
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
  selectedIcon?: React.ReactNode
  featuredIcon?: React.ReactNode
  loadingIcon?: React.ReactNode

  // Event handlers
  onClick?: () => void
  onDoubleClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onActionClick?: ActionClickHandler

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
  titleTextColor?: string
  bodyTextColor?: string
  metaTextColor?: string
  placeholderColor?: string

  // Colors
  backgroundColor?: string
  hoverBackgroundColor?: string
  selectedBackgroundColor?: string
  disabledBackgroundColor?: string
  featuredBackgroundColor?: string
  overlayColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  hoverBoxShadow?: string
  focusBoxShadow?: string
  featuredBoxShadow?: string

  // Spacing
  padding?: string
  paddingX?: string
  paddingY?: string
  headerPadding?: string
  bodyPadding?: string
  footerPadding?: string
  actionGap?: string
  mediaGap?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  role?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,

      // Controlled/uncontrolled props
      isSelected,
      defaultSelected = false,
      onSelectChange,

      isExpanded,
      defaultExpanded = false,
      onExpandChange,

      isLoading,
      defaultLoading = false,
      onLoadingChange,

      isDisabled,
      defaultDisabled = false,
      onDisabledChange,

      isFeatured,
      defaultFeatured = false,
      onFeaturedChange,

      // Features
      selectable = false,
      expandable = false,
      showCheckbox = false,
      checkboxPosition = 'top-left',

      // Styling
      variant = 'default',
      size = 'md',
      status = 'default',

      // Transitions
      transition = 'smooth',
      transitionDuration = 200,
      hoverElevation = false,

      // Content
      title,
      subtitle,
      description,
      metadata,
      helperText,

      // Media
      media,

      // Badges
      badges,

      // Actions
      actions,
      primaryAction,
      secondaryActions,

      // Empty/Loading states
      emptyMessage = 'No content available',
      emptyIllustration,
      emptyAction,
      loadingMessage = 'Loading...',
      skeletonLines = 3,

      // Custom render functions
      renderHeader,
      renderMedia,
      renderBody,
      renderFooter,
      renderOverlay,
      renderActions: _renderActions,
      renderEmpty,
      renderLoading,

      // Icons
      expandIcon,
      collapseIcon,
      selectedIcon,
      featuredIcon,
      loadingIcon,

      // Event handlers
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onActionClick,

      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      titleTextColor,
      bodyTextColor,
      metaTextColor,
      placeholderColor,
      backgroundColor,
      hoverBackgroundColor,
      selectedBackgroundColor,
      disabledBackgroundColor,
      featuredBackgroundColor,
      overlayColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      hoverBoxShadow,
      focusBoxShadow,
      featuredBoxShadow,
      padding,
      paddingX,
      paddingY,
      headerPadding,
      bodyPadding,
      footerPadding,
      actionGap,
      mediaGap,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': ariaExpanded,
      'aria-selected': ariaSelected,
      role = 'article',

      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalSelected, setInternalSelected] = useState(defaultSelected)
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
    const [internalLoading, setInternalLoading] = useState(defaultLoading)
    const [internalDisabled, setInternalDisabled] = useState(defaultDisabled)
    const [internalFeatured, setInternalFeatured] = useState(defaultFeatured)

    // Determine if controlled or uncontrolled
    const isSelectedControlled = isSelected !== undefined
    const isExpandedControlled = isExpanded !== undefined
    const isLoadingControlled = isLoading !== undefined
    const isDisabledControlled = isDisabled !== undefined
    const isFeaturedControlled = isFeatured !== undefined

    // Current values (controlled takes precedence)
    const currentSelected = isSelectedControlled ? isSelected : internalSelected
    const currentExpanded = isExpandedControlled ? isExpanded : internalExpanded
    const currentLoading = isLoadingControlled ? isLoading : internalLoading
    const currentDisabled = isDisabledControlled ? isDisabled : internalDisabled
    const currentFeatured = isFeaturedControlled ? isFeatured : internalFeatured

    // Handlers that manage both controlled and uncontrolled modes
    const handleSelectChange = useCallback(
      (selected: boolean) => {
        if (!isSelectedControlled) {
          setInternalSelected(selected)
        }
        onSelectChange?.(selected)
      },
      [isSelectedControlled, onSelectChange]
    )

    const handleExpandChange = useCallback(
      (expanded: boolean) => {
        if (!isExpandedControlled) {
          setInternalExpanded(expanded)
        }
        onExpandChange?.(expanded)
      },
      [isExpandedControlled, onExpandChange]
    )

    const handleLoadingChange = useCallback(
      (loading: boolean) => {
        if (!isLoadingControlled) {
          setInternalLoading(loading)
        }
        onLoadingChange?.(loading)
      },
      [isLoadingControlled, onLoadingChange]
    )

    const handleDisabledChange = useCallback(
      (disabled: boolean) => {
        if (!isDisabledControlled) {
          setInternalDisabled(disabled)
        }
        onDisabledChange?.(disabled)
      },
      [isDisabledControlled, onDisabledChange]
    )

    const handleFeaturedChange = useCallback(
      (featured: boolean) => {
        if (!isFeaturedControlled) {
          setInternalFeatured(featured)
        }
        onFeaturedChange?.(featured)
      },
      [isFeaturedControlled, onFeaturedChange]
    )

    // Click handlers
    const handleClick = useCallback(() => {
      if (currentDisabled) return

      if (selectable && !expandable) {
        handleSelectChange(!currentSelected)
      } else if (expandable && !selectable) {
        handleExpandChange(!currentExpanded)
      }

      onClick?.()
    }, [
      currentDisabled,
      selectable,
      expandable,
      currentSelected,
      currentExpanded,
      handleSelectChange,
      handleExpandChange,
      onClick,
    ])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (currentDisabled) return

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleClick()
        }

        if (expandable && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
          event.preventDefault()
          handleExpandChange(event.key === 'ArrowDown')
        }
      },
      [currentDisabled, handleClick, expandable, handleExpandChange]
    )

    // Context value
    const contextValue = useMemo<CardContextValue>(
      () => ({
        isSelected: currentSelected,
        setIsSelected: handleSelectChange,
        isExpanded: currentExpanded,
        setIsExpanded: handleExpandChange,
        isLoading: currentLoading,
        setIsLoading: handleLoadingChange,
        isDisabled: currentDisabled,
        setIsDisabled: handleDisabledChange,
        isFeatured: currentFeatured,
        setIsFeatured: handleFeaturedChange,
        variant,
        size,
        status,
        transition,
        transitionDuration,
        onSelectChange,
        onExpandChange,
        onFeaturedChange,
        onClick,
        onDoubleClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        // Style props
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily,
        titleTextColor,
        bodyTextColor,
        metaTextColor,
        placeholderColor,
        backgroundColor,
        hoverBackgroundColor,
        selectedBackgroundColor,
        disabledBackgroundColor,
        featuredBackgroundColor,
        overlayColor,
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        focusBorderColor,
        focusBackgroundColor,
        boxShadow,
        hoverBoxShadow,
        focusBoxShadow,
        featuredBoxShadow,
        padding,
        paddingX,
        paddingY,
        headerPadding,
        bodyPadding,
        footerPadding,
        actionGap,
        mediaGap,
      }),
      [
        currentSelected,
        handleSelectChange,
        currentExpanded,
        handleExpandChange,
        currentLoading,
        handleLoadingChange,
        currentDisabled,
        handleDisabledChange,
        currentFeatured,
        handleFeaturedChange,
        variant,
        size,
        status,
        transition,
        transitionDuration,
        onSelectChange,
        onExpandChange,
        onFeaturedChange,
        onClick,
        onDoubleClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily,
        titleTextColor,
        bodyTextColor,
        metaTextColor,
        placeholderColor,
        backgroundColor,
        hoverBackgroundColor,
        selectedBackgroundColor,
        disabledBackgroundColor,
        featuredBackgroundColor,
        overlayColor,
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        focusBorderColor,
        focusBackgroundColor,
        boxShadow,
        hoverBoxShadow,
        focusBoxShadow,
        featuredBoxShadow,
        padding,
        paddingX,
        paddingY,
        headerPadding,
        bodyPadding,
        footerPadding,
        actionGap,
        mediaGap,
      ]
    )

    // Base styles
    const baseStyles = 'relative focus:outline-none transition-all'

    // Variant styles
    const variants = {
      default:
        'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm',
      elevated: 'rounded-lg bg-white dark:bg-gray-800 shadow-lg border-0',
      outlined:
        'rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-none',
      flat: 'rounded-lg bg-gray-50 dark:bg-gray-900 border-0 shadow-none',
      glass:
        'rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg',
      'card-with-shadow':
        'rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700',
      interactive:
        'rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
      bordered:
        'rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-600 shadow-none',
      ghost: 'rounded-lg bg-transparent border-0 shadow-none',
    }

    // Size styles
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    // Status styles
    const statusStyles = {
      default: '',
      success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30',
      warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/30',
      error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30',
      info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30',
      featured:
        'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/30 ring-2 ring-purple-200 dark:ring-purple-800',
    }

    // State styles
    const stateStyles = cn(
      currentSelected && 'ring-2 ring-blue-500',
      currentDisabled && 'opacity-50 cursor-not-allowed',
      currentFeatured && 'ring-2 ring-purple-500',
      hoverElevation && 'hover:shadow-lg',
      (selectable || expandable) && !currentDisabled && 'cursor-pointer'
    )

    // Transition styles
    const transitionStyles = {
      none: '',
      slide: `transition-all duration-${transitionDuration} ease-in-out`,
      scale: `transition-transform duration-${transitionDuration} hover:scale-105`,
      fade: `transition-opacity duration-${transitionDuration}`,
      bounce: `transition-all duration-${transitionDuration} ease-bounce`,
      smooth: `transition-all duration-${transitionDuration} ease-out`,
    }

    // Custom styles object
    const customStyles: React.CSSProperties = {}

    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderColor) customStyles.borderColor = borderColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderRadius) customStyles.borderRadius = borderRadius
    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight
    if (fontFamily) customStyles.fontFamily = fontFamily
    if (backgroundColor) customStyles.backgroundColor = backgroundColor
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

    // State-based style overrides
    if (currentSelected && selectedBackgroundColor) {
      customStyles.backgroundColor = selectedBackgroundColor
    }
    if (currentDisabled && disabledBackgroundColor) {
      customStyles.backgroundColor = disabledBackgroundColor
    }
    if (currentFeatured && featuredBackgroundColor) {
      customStyles.backgroundColor = featuredBackgroundColor
    }
    if (currentFeatured && featuredBoxShadow) {
      customStyles.boxShadow = featuredBoxShadow
    }

    const hasContent = !!(
      title ||
      subtitle ||
      description ||
      metadata ||
      children ||
      media ||
      badges ||
      actions ||
      primaryAction ||
      secondaryActions
    )

    return (
      <CardContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            statusStyles[status],
            stateStyles,
            transitionStyles[transition],
            className
          )}
          style={customStyles}
          onClick={handleClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          tabIndex={currentDisabled ? -1 : selectable || expandable ? 0 : undefined}
          role={role}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-expanded={ariaExpanded ?? (expandable ? currentExpanded : undefined)}
          aria-selected={ariaSelected ?? (selectable ? currentSelected : undefined)}
          aria-disabled={currentDisabled}
          data-testid="card"
          {...props}
        >
          {/* Loading state */}
          {currentLoading && renderLoading ? (
            renderLoading()
          ) : currentLoading ? (
            <CardLoading
              message={loadingMessage}
              skeletonLines={skeletonLines}
              icon={loadingIcon}
            />
          ) : null}

          {/* Empty state */}
          {!currentLoading && !hasContent && renderEmpty ? (
            renderEmpty()
          ) : !currentLoading && !hasContent ? (
            <CardEmpty
              message={emptyMessage}
              illustration={emptyIllustration}
              action={emptyAction}
              onActionClick={onActionClick}
            />
          ) : null}

          {/* Normal content */}
          {!currentLoading && hasContent && (
            <>
              {/* Selection checkbox */}
              {showCheckbox && selectable && (
                <CardSelectCheckbox position={checkboxPosition} icon={selectedIcon} />
              )}

              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
                  {badges.map((badge) => (
                    <CardBadge key={badge.id} {...badge} />
                  ))}
                </div>
              )}

              {/* Content wrapper with checkbox spacing */}
              <div
                className={cn(
                  showCheckbox &&
                    selectable &&
                    (checkboxPosition === 'top-left' || checkboxPosition === 'top-right'
                      ? 'pt-8'
                      : checkboxPosition === 'bottom-left' || checkboxPosition === 'bottom-right'
                        ? 'pb-8'
                        : '')
                )}
              >
                {/* Header */}
                {renderHeader ? (
                  renderHeader(currentSelected, currentExpanded, currentDisabled, currentFeatured)
                ) : title || subtitle || expandable ? (
                  <CardHeader
                    title={title}
                    subtitle={subtitle}
                    expandable={expandable}
                    expandIcon={expandIcon}
                    collapseIcon={collapseIcon}
                  />
                ) : null}

                {/* Media */}
                {renderMedia ? (
                  renderMedia(currentSelected, currentExpanded, currentDisabled, currentFeatured)
                ) : media ? (
                  <CardMedia {...media} />
                ) : null}

                {/* Body */}
                {renderBody ? (
                  renderBody(currentSelected, currentExpanded, currentDisabled, currentFeatured)
                ) : description || metadata || children ? (
                  <CardBody description={description} metadata={metadata}>
                    {children}
                  </CardBody>
                ) : null}

                {/* Expandable Panel */}
                {expandable && currentExpanded && (
                  <CardExpandablePanel>
                    {renderBody
                      ? renderBody(
                          currentSelected,
                          currentExpanded,
                          currentDisabled,
                          currentFeatured
                        )
                      : children}
                  </CardExpandablePanel>
                )}

                {/* Footer */}
                {renderFooter ? (
                  renderFooter(currentSelected, currentExpanded, currentDisabled, currentFeatured)
                ) : actions || primaryAction || secondaryActions || helperText ? (
                  <CardFooter
                    actions={actions}
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                    helperText={helperText}
                    onActionClick={onActionClick}
                  />
                ) : null}

                {/* Overlay */}
                {renderOverlay && (
                  <CardOverlay>
                    {renderOverlay(
                      currentSelected,
                      currentExpanded,
                      currentDisabled,
                      currentFeatured
                    )}
                  </CardOverlay>
                )}

                {/* Featured indicator */}
                {currentFeatured && featuredIcon && (
                  <div className="absolute top-2 right-2 text-purple-500">{featuredIcon}</div>
                )}
              </div>
            </>
          )}
        </div>
      </CardContext.Provider>
    )
  }
)

Card.displayName = 'Card'

// Import useCard hook
import { useCard } from './context'

// Sub-components will be implemented here
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  expandable?: boolean
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
  children?: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    { className, title, subtitle, expandable, expandIcon, collapseIcon, children, ...props },
    ref
  ) => {
    const { isExpanded, setIsExpanded, size, headerPadding, titleTextColor } = useCard()

    const handleExpandToggle = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsExpanded(!isExpanded)
    }

    const sizeStyles = {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    }

    const titleSizes = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    }

    const customStyles: React.CSSProperties = {}
    if (headerPadding) customStyles.padding = headerPadding
    if (titleTextColor) customStyles.color = titleTextColor

    return (
      <div
        ref={ref}
        className={cn(sizeStyles[size], 'flex items-center justify-between', className)}
        style={customStyles}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={cn('font-semibold leading-tight truncate', titleSizes[size])}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{subtitle}</p>
          )}
          {children}
        </div>

        {expandable && (
          <button
            type="button"
            onClick={handleExpandToggle}
            className="ml-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded
              ? collapseIcon || (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )
              : expandIcon || (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
          </button>
        )}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'image' | 'video' | 'audio' | 'iframe'
  src: string
  alt?: string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'eager' | 'lazy'
  poster?: string
  controls?: boolean
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      className,
      type,
      src,
      alt,
      aspectRatio = '16/9',
      objectFit = 'cover',
      loading = 'lazy',
      poster,
      controls = true,
      autoplay = false,
      muted = false,
      loop = false,
      ...props
    },
    ref
  ) => {
    const { mediaGap } = useCard()

    const customStyles: React.CSSProperties = {
      aspectRatio,
    }
    if (mediaGap) customStyles.margin = mediaGap

    const objectFitClass = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    }

    const renderMedia = () => {
      switch (type) {
        case 'image':
          return (
            <img
              src={src}
              alt={alt}
              loading={loading}
              className={cn('w-full h-full', objectFitClass[objectFit])}
            />
          )
        case 'video':
          return (
            <video
              src={src}
              poster={poster}
              controls={controls}
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              className={cn('w-full h-full', objectFitClass[objectFit])}
            >
              Your browser does not support the video tag.
            </video>
          )
        case 'audio':
          return (
            <audio
              src={src}
              controls={controls}
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              className="w-full"
            >
              Your browser does not support the audio tag.
            </audio>
          )
        case 'iframe':
          return <iframe src={src} title={alt} className="w-full h-full border-0" allowFullScreen />
        default:
          return null
      }
    }

    return (
      <div ref={ref} className={cn('overflow-hidden', className)} style={customStyles} {...props}>
        {renderMedia()}
      </div>
    )
  }
)

CardMedia.displayName = 'CardMedia'

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string
  metadata?: string
  children?: React.ReactNode
}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, description, metadata, children, ...props }, ref) => {
    const { size, bodyPadding, bodyTextColor, metaTextColor } = useCard()

    const sizeStyles = {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    }

    const customStyles: React.CSSProperties = {}
    if (bodyPadding) customStyles.padding = bodyPadding
    if (bodyTextColor) customStyles.color = bodyTextColor

    return (
      <div ref={ref} className={cn(sizeStyles[size], className)} style={customStyles} {...props}>
        {description && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
        )}

        {metadata && (
          <p
            className="text-sm text-gray-500 dark:text-gray-400 mt-2"
            style={{ color: metaTextColor }}
          >
            {metadata}
          </p>
        )}

        {children}
      </div>
    )
  }
)

CardBody.displayName = 'CardBody'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: CardAction[]
  primaryAction?: CardAction
  secondaryActions?: CardAction[]
  helperText?: string
  onActionClick?: ActionClickHandler
  children?: React.ReactNode
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      className,
      actions,
      primaryAction,
      secondaryActions,
      helperText,
      onActionClick,
      children,
      ...props
    },
    ref
  ) => {
    const { size, footerPadding, actionGap } = useCard()

    const sizeStyles = {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    }

    const customStyles: React.CSSProperties = {}
    if (footerPadding) customStyles.padding = footerPadding

    const allActions = [
      ...(actions || []),
      ...(primaryAction ? [primaryAction] : []),
      ...(secondaryActions || []),
    ]

    return (
      <div
        ref={ref}
        className={cn(sizeStyles[size], 'border-t border-gray-100 dark:border-gray-700', className)}
        style={customStyles}
        {...props}
      >
        {helperText && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{helperText}</p>
        )}

        {allActions.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap" style={{ gap: actionGap }}>
            {allActions.map((action) => (
              <CardActions key={action.id} action={action} onActionClick={onActionClick} />
            ))}
          </div>
        )}

        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

export interface CardActionsProps {
  action: CardAction
  onActionClick?: ActionClickHandler
}

const CardActions = React.memo<CardActionsProps>(({ action, onActionClick }) => {
  const { isDisabled } = useCard()

  const handleClick = () => {
    if (action.disabled || isDisabled || action.loading) return
    action.onClick?.()
    onActionClick?.(action.id, action)
  }

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary:
      'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-800',
    ghost:
      'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={action.disabled || isDisabled || action.loading}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
        variants[action.variant || 'secondary']
      )}
    >
      {action.loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
      ) : action.icon ? (
        action.icon
      ) : null}
      {action.label}
    </button>
  )
})

CardActions.displayName = 'CardActions'

export type CardBadgeProps = CardBadgeConfig

const CardBadge = React.memo<CardBadgeProps>(
  ({ label, variant = 'default', icon, position = 'top-right', color, backgroundColor }) => {
    const variants = {
      default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      primary: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    }

    const positions = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
    }

    const customStyles: React.CSSProperties = {}
    if (color) customStyles.color = color
    if (backgroundColor) customStyles.backgroundColor = backgroundColor

    return (
      <span
        className={cn(
          'absolute z-10 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
          variants[variant],
          positions[position]
        )}
        style={customStyles}
      >
        {icon}
        {label}
      </span>
    )
  }
)

CardBadge.displayName = 'CardBadge'

export interface CardSelectCheckboxProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  icon?: React.ReactNode
}

const CardSelectCheckbox = React.memo<CardSelectCheckboxProps>(
  ({ position = 'top-left', icon }) => {
    const { isSelected, setIsSelected, isDisabled } = useCard()

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isDisabled) {
        setIsSelected(!isSelected)
      }
    }

    const positions = {
      'top-left': 'top-3 left-3',
      'top-right': 'top-3 right-3',
      'bottom-left': 'bottom-3 left-3',
      'bottom-right': 'bottom-3 right-3',
    }

    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isDisabled}
        className={cn(
          'absolute z-10 w-5 h-5 rounded border-2 border-gray-300 bg-white flex items-center justify-center transition-all',
          isSelected && 'border-blue-500 bg-blue-500',
          isDisabled && 'opacity-50 cursor-not-allowed',
          positions[position]
        )}
        aria-label={isSelected ? 'Deselect card' : 'Select card'}
      >
        {isSelected &&
          (icon || (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ))}
      </button>
    )
  }
)

CardSelectCheckbox.displayName = 'CardSelectCheckbox'

export interface CardOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardOverlay = React.forwardRef<HTMLDivElement, CardOverlayProps>(
  ({ className, children, ...props }, ref) => {
    const { overlayColor } = useCard()

    const customStyles: React.CSSProperties = {}
    if (overlayColor) customStyles.backgroundColor = overlayColor

    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-0 bg-black/50 flex items-center justify-center z-20',
          className
        )}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardOverlay.displayName = 'CardOverlay'

export interface CardExpandablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardExpandablePanel = React.forwardRef<HTMLDivElement, CardExpandablePanelProps>(
  ({ className, children, ...props }, ref) => {
    const { transition, transitionDuration, size, bodyPadding } = useCard()

    const sizeStyles = {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    }

    const transitionStyles = {
      none: '',
      slide: `transition-all duration-${transitionDuration} ease-in-out`,
      scale: `transition-transform duration-${transitionDuration}`,
      fade: `transition-opacity duration-${transitionDuration}`,
      bounce: `transition-all duration-${transitionDuration} ease-bounce`,
      smooth: `transition-all duration-${transitionDuration} ease-out`,
    }

    const customStyles: React.CSSProperties = {}
    if (bodyPadding) customStyles.padding = bodyPadding

    return (
      <div
        ref={ref}
        className={cn(
          'border-t border-gray-100 bg-gray-50',
          sizeStyles[size],
          transitionStyles[transition],
          className
        )}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardExpandablePanel.displayName = 'CardExpandablePanel'

export interface CardLoadingProps {
  message?: string
  skeletonLines?: number
  icon?: React.ReactNode
}

const CardLoading = React.memo<CardLoadingProps>(
  ({ message = 'Loading...', skeletonLines = 3, icon }) => {
    const { size } = useCard()

    const sizeStyles = {
      sm: 'px-4 py-8',
      md: 'px-6 py-12',
      lg: 'px-8 py-16',
    }

    const defaultIcon = (
      <svg className="w-6 h-6 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
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
    )

    return (
      <div
        className={cn('flex flex-col items-center justify-center text-center', sizeStyles[size])}
      >
        <div className="mb-4">{icon || defaultIcon}</div>

        <p className="text-gray-500 mb-4">{message}</p>

        <div className="w-full max-w-xs space-y-2">
          {Array.from({ length: skeletonLines }).map((_, index) => (
            <div
              key={index}
              className="h-4 bg-gray-200 rounded animate-pulse"
              style={{ width: `${80 + Math.random() * 20}%` }}
            />
          ))}
        </div>
      </div>
    )
  }
)

CardLoading.displayName = 'CardLoading'

export interface CardEmptyProps {
  message?: string
  illustration?: React.ReactNode
  action?: CardAction
  onActionClick?: ActionClickHandler
}

const CardEmpty = React.memo<CardEmptyProps>(
  ({ message = 'No content available', illustration, action, onActionClick }) => {
    const { size } = useCard()

    const sizeStyles = {
      sm: 'px-4 py-8',
      md: 'px-6 py-12',
      lg: 'px-8 py-16',
    }

    const defaultIllustration = (
      <svg
        className="w-16 h-16 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    )

    return (
      <div
        className={cn('flex flex-col items-center justify-center text-center', sizeStyles[size])}
      >
        <div className="mb-4">{illustration || defaultIllustration}</div>

        <p className="text-gray-500 mb-4">{message}</p>

        {action && <CardActions action={action} onActionClick={onActionClick} />}
      </div>
    )
  }
)

CardEmpty.displayName = 'CardEmpty'

// Export all components
export {
  Card,
  CardHeader,
  CardMedia,
  CardBody,
  CardFooter,
  CardActions,
  CardBadge,
  CardSelectCheckbox,
  CardOverlay,
  CardExpandablePanel,
  CardLoading,
  CardEmpty,
}

// Compound component interface
interface CardComponent
  extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader
  Media: typeof CardMedia
  Body: typeof CardBody
  Footer: typeof CardFooter
  Actions: typeof CardActions
  Badge: typeof CardBadge
  SelectCheckbox: typeof CardSelectCheckbox
  Overlay: typeof CardOverlay
  ExpandablePanel: typeof CardExpandablePanel
  Loading: typeof CardLoading
  Empty: typeof CardEmpty
}

// Create compound component
const CardCompound = Card as unknown as CardComponent
CardCompound.Header = CardHeader
CardCompound.Media = CardMedia
CardCompound.Body = CardBody
CardCompound.Footer = CardFooter
CardCompound.Actions = CardActions
CardCompound.Badge = CardBadge
CardCompound.SelectCheckbox = CardSelectCheckbox
CardCompound.Overlay = CardOverlay
CardCompound.ExpandablePanel = CardExpandablePanel
CardCompound.Loading = CardLoading
CardCompound.Empty = CardEmpty

export default CardCompound
