import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/utils'

// Data interface (renamed to avoid the type/value collision)
export interface DrawerItemData {
  id: string | number
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  group?: string
  badge?: string | number
  description?: string
  href?: string
  onClick?: () => void
  [key: string]: unknown
}

// Alias so external code can still refer to `DrawerItem` as the type
export type DrawerItem = DrawerItemData

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  // Core functionality
  items?: DrawerItemData[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  variant?: 'default' | 'overlay' | 'push' | 'mini' | 'persistent'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'

  // Dimensions
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string

  // Content
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode

  // States
  disabled?: boolean
  loading?: boolean
  collapsible?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void

  // Behavior
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  preventScroll?: boolean
  focusTrap?: boolean
  showCloseIcon?: boolean

  // Labels and messages
  loadingMessage?: string
  emptyMessage?: string

  // Styling variants
  status?: 'default' | 'success' | 'warning' | 'error'

  // Animation and transitions
  transition?: 'none' | 'fade' | 'slide' | 'scale' | 'flip'
  transitionDuration?: number

  // Custom render functions
  renderItem?: (item: DrawerItemData, isActive: boolean) => React.ReactNode
  renderHeader?: () => React.ReactNode
  renderFooter?: () => React.ReactNode
  renderEmpty?: () => React.ReactNode

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
  overlayColor?: string

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

  // Header styles
  headerBackgroundColor?: string
  headerBorderColor?: string
  headerPadding?: string
  headerFontSize?: string
  headerFontWeight?: string
  headerTextColor?: string

  // Footer styles
  footerBackgroundColor?: string
  footerBorderColor?: string
  footerPadding?: string

  // Item styles
  itemPadding?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  itemDisabledOpacity?: string

  // Icon customization
  iconColor?: string

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onItemClick?: (item: DrawerItemData) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onTransitionStart?: () => void
  onTransitionEnd?: () => void

  // Close icon
  closeIcon?: React.ReactNode
  closeIconPosition?: 'left' | 'right'
  closeIconClassName?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-labelledby'?: string
}

export interface DrawerContextValue {
  // State
  open: boolean
  setOpen: (open: boolean) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void

  // Items
  items: DrawerItemData[]

  // Configuration
  position: string
  variant: string
  size: string
  status: string
  transition: string
  transitionDuration: number
  disabled: boolean
  loading: boolean
  collapsible: boolean

  // Dimensions
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string

  // Messages
  loadingMessage: string
  emptyMessage: string

  // Custom renders
  renderItem?: (item: DrawerItemData, isActive: boolean) => React.ReactNode
  renderHeader?: () => React.ReactNode
  renderFooter?: () => React.ReactNode
  renderEmpty?: () => React.ReactNode

  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  backgroundColor?: string
  textColor?: string
  overlayColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  focusBoxShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  headerBackgroundColor?: string
  headerBorderColor?: string
  headerPadding?: string
  headerFontSize?: string
  headerFontWeight?: string
  headerTextColor?: string
  footerBackgroundColor?: string
  footerBorderColor?: string
  footerPadding?: string
  itemPadding?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  itemDisabledOpacity?: string
  iconColor?: string

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onItemClick?: (item: DrawerItemData) => void

  // Close icon
  showCloseIcon?: boolean
  closeIcon?: React.ReactNode
  closeIconPosition?: 'left' | 'right'
  closeIconClassName?: string
  onOpenChange?: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined)

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawer must be used within a Drawer component')
  }
  return context
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      items = [],
      open,
      onOpenChange,
      defaultOpen = false,
      position = 'left',
      variant = 'default',
      size = 'md',
      title,
      children,
      footer,
      header,
      disabled = false,
      loading = false,
      collapsible = false,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      preventScroll = true,
      focusTrap = true,
      showCloseIcon = false,
      loadingMessage = 'Loading...',
      emptyMessage = 'No items found',
      status = 'default',
      transition = 'slide',
      transitionDuration = 300,
      renderItem,
      renderHeader,
      renderFooter,
      renderEmpty,
      // Dimensions
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      backgroundColor,
      textColor,
      overlayColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      padding,
      paddingX,
      paddingY,
      headerBackgroundColor,
      headerBorderColor,
      headerPadding,
      headerFontSize,
      headerFontWeight,
      headerTextColor,
      footerBackgroundColor,
      footerBorderColor,
      footerPadding,
      itemPadding,
      itemHoverBackgroundColor,
      itemActiveBackgroundColor,
      itemActiveTextColor,
      itemDisabledOpacity,
      iconColor,
      // Event handlers
      onFocus,
      onBlur,
      onItemClick,
      onKeyDown,
      onTransitionStart: _onTransitionStart,
      onTransitionEnd: _onTransitionEnd,
      // Close icon
      closeIcon,
      closeIconPosition = 'right',
      closeIconClassName,
      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [internalCollapsed, setInternalCollapsed] = useState(false)

    const isControlledOpen = open !== undefined
    const currentOpen = isControlledOpen ? open : internalOpen

    const isControlledCollapsed = controlledCollapsed !== undefined
    const currentCollapsed = isControlledCollapsed ? controlledCollapsed : internalCollapsed

    const drawerRef = useRef<HTMLDivElement>(null)

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlledOpen) {
          setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
      },
      [isControlledOpen, onOpenChange]
    )

    const handleCollapsedChange = useCallback(
      (newCollapsed: boolean) => {
        if (!isControlledCollapsed) {
          setInternalCollapsed(newCollapsed)
        }
        onCollapsedChange?.(newCollapsed)
      },
      [isControlledCollapsed, onCollapsedChange]
    )

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !currentOpen) return

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleOpenChange(false)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [closeOnEscape, currentOpen, handleOpenChange])

    // Handle body scroll prevention
    useEffect(() => {
      if (!preventScroll || !currentOpen) return

      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }, [preventScroll, currentOpen])

    // Focus trap
    useEffect(() => {
      if (!focusTrap || !currentOpen || !drawerRef.current) return

      const drawer = drawerRef.current
      const focusableElements = drawer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }

      drawer.addEventListener('keydown', handleTabKey)
      firstElement.focus()

      return () => {
        drawer.removeEventListener('keydown', handleTabKey)
      }
    }, [focusTrap, currentOpen])

    const contextValue: DrawerContextValue = {
      open: currentOpen,
      setOpen: handleOpenChange,
      collapsed: currentCollapsed,
      setCollapsed: handleCollapsedChange,
      items,
      position,
      variant,
      size,
      status,
      transition,
      transitionDuration,
      disabled,
      loading,
      collapsible,
      loadingMessage,
      emptyMessage,
      renderItem,
      renderHeader,
      renderFooter,
      renderEmpty,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      backgroundColor,
      textColor,
      overlayColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      padding,
      paddingX,
      paddingY,
      headerBackgroundColor,
      headerBorderColor,
      headerPadding,
      headerFontSize,
      headerFontWeight,
      headerTextColor,
      footerBackgroundColor,
      footerBorderColor,
      footerPadding,
      itemPadding,
      itemHoverBackgroundColor,
      itemActiveBackgroundColor,
      itemActiveTextColor,
      itemDisabledOpacity,
      iconColor,
      onFocus,
      onBlur,
      onItemClick,
      showCloseIcon,
      closeIcon,
      closeIconPosition: closeIconPosition as 'left' | 'right',
      closeIconClassName,
      onOpenChange: handleOpenChange,
    }

    if (!currentOpen && variant !== 'persistent') {
      return null
    }

    return (
      <DrawerContext.Provider value={contextValue}>
        {variant === 'overlay' && (
          <DrawerOverlay
            onClick={closeOnOverlayClick ? () => handleOpenChange(false) : undefined}
          />
        )}
        <DrawerContainer
          ref={ref}
          className={className}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-labelledby={ariaLabelledby}
          onKeyDown={onKeyDown}
          {...props}
        >
          {(renderHeader || header || title) && (
            <DrawerHeader>{renderHeader ? renderHeader() : header || title}</DrawerHeader>
          )}
          <DrawerContent>{children || <DrawerItemList />}</DrawerContent>
          {(renderFooter || footer) && (
            <DrawerFooter>{renderFooter ? renderFooter() : footer}</DrawerFooter>
          )}
        </DrawerContainer>
      </DrawerContext.Provider>
    )
  }
)

Drawer.displayName = 'Drawer'

// Sub-components
export interface DrawerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DrawerContainer = React.forwardRef<HTMLDivElement, DrawerContainerProps>(
  ({ className, children, ...props }, ref) => {
    const {
      open,
      collapsed,
      position,
      variant,
      size,
      status,
      transition,
      transitionDuration,
      disabled,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      backgroundColor,
      textColor,
      boxShadow,
      padding,
      paddingX,
      paddingY,
    } = useDrawer()

    const baseStyles = cn(
      'fixed flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50',
      !boxShadow && 'shadow-lg',
      disabled && 'pointer-events-none opacity-50'
    )

    const positionStyles = {
      left: cn('top-0 left-0 h-full', open ? 'translate-x-0' : '-translate-x-full'),
      right: cn('top-0 right-0 h-full', open ? 'translate-x-0' : 'translate-x-full'),
      top: cn('top-0 left-0 w-full', open ? 'translate-y-0' : '-translate-y-full'),
      bottom: cn('bottom-0 left-0 w-full', open ? 'translate-y-0' : 'translate-y-full'),
    }

    const variantStyles = {
      default: '',
      overlay: 'z-50',
      push: 'relative',
      mini: collapsed ? 'w-16' : '',
      persistent: 'relative',
    }

    // Default size styles - overridden by custom dimensions
    const sizeStyles = {
      sm: position === 'left' || position === 'right' ? 'w-64' : 'h-48',
      md: position === 'left' || position === 'right' ? 'w-80' : 'h-64',
      lg: position === 'left' || position === 'right' ? 'w-96' : 'h-80',
      xl: position === 'left' || position === 'right' ? 'w-112' : 'h-96',
      full: position === 'left' || position === 'right' ? 'w-full' : 'h-full',
    }

    const statusStyles = {
      default: '',
      success: 'border-green-200',
      warning: 'border-yellow-200',
      error: 'border-red-200',
    }

    const getTransitionClass = () => {
      switch (transition) {
        case 'none':
          return 'transition-none'
        case 'fade':
          return 'transition-opacity ease-in-out'
        case 'slide':
          return 'transition-transform ease-in-out'
        case 'scale':
          return 'transition-all ease-in-out'
        case 'flip':
          return 'transition-all ease-in-out'
        default:
          return 'transition-transform ease-in-out'
      }
    }

    const customStyles: React.CSSProperties = {
      transitionDuration: `${transitionDuration}ms`,
    }

    // Custom dimensions override size styles
    if (width) customStyles.width = width
    if (height) customStyles.height = height
    if (maxWidth) customStyles.maxWidth = maxWidth
    if (maxHeight) customStyles.maxHeight = maxHeight
    if (minWidth) customStyles.minWidth = minWidth
    if (minHeight) customStyles.minHeight = minHeight

    if (borderWidth) customStyles.borderWidth = borderWidth
    if (borderColor) customStyles.borderColor = borderColor
    if (borderStyle) customStyles.borderStyle = borderStyle
    if (borderRadius) customStyles.borderRadius = borderRadius
    if (fontSize) customStyles.fontSize = fontSize
    if (fontWeight) customStyles.fontWeight = fontWeight
    if (fontFamily) customStyles.fontFamily = fontFamily
    if (textColor) customStyles.color = textColor
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

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          positionStyles[position as keyof typeof positionStyles],
          variantStyles[variant as keyof typeof variantStyles],
          // Only apply size styles if no custom dimensions are provided
          !width && !height && sizeStyles[size as keyof typeof sizeStyles],
          statusStyles[status as keyof typeof statusStyles],
          getTransitionClass(),
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

DrawerContainer.displayName = 'DrawerContainer'

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, ...props }, ref) => {
    const { overlayColor, transitionDuration, open } = useDrawer()

    const customStyles: React.CSSProperties = {
      transitionDuration: `${transitionDuration}ms`,
    }
    if (overlayColor) customStyles.backgroundColor = overlayColor

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 bg-black z-40 transition-opacity ease-in-out',
          open ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0',
          className
        )}
        style={customStyles}
        {...props}
      />
    )
  }
)

DrawerOverlay.displayName = 'DrawerOverlay'

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const {
      headerBackgroundColor,
      headerBorderColor,
      headerPadding,
      headerFontSize,
      headerFontWeight,
      headerTextColor,
      showCloseIcon,
      closeIcon,
      closeIconPosition,
      closeIconClassName,
      onOpenChange,
    } = useDrawer()

    const customStyles: React.CSSProperties = {}
    if (headerBackgroundColor) customStyles.backgroundColor = headerBackgroundColor
    if (headerBorderColor) customStyles.borderColor = headerBorderColor
    if (headerPadding) customStyles.padding = headerPadding
    if (headerFontSize) customStyles.fontSize = headerFontSize
    if (headerFontWeight) customStyles.fontWeight = headerFontWeight
    if (headerTextColor) customStyles.color = headerTextColor

    const defaultCloseIcon = (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 5L5 15M5 5L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

    return (
      <div
        ref={ref}
        className={cn(
          'flex-shrink-0 border-b border-gray-200 dark:border-gray-700 p-4 font-semibold text-gray-900 dark:text-gray-100',
          className
        )}
        style={customStyles}
        {...props}
      >
        <div className="flex items-center justify-between">
          {closeIconPosition === 'left' && showCloseIcon && (
            <button
              onClick={() => onOpenChange?.(false)}
              className={cn(
                'p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                closeIconClassName
              )}
              aria-label="Close drawer"
            >
              {closeIcon || defaultCloseIcon}
            </button>
          )}
          <div className="flex-1">{children}</div>
          {closeIconPosition === 'right' && showCloseIcon && (
            <button
              onClick={() => onOpenChange?.(false)}
              className={cn(
                'p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                closeIconClassName
              )}
              aria-label="Close drawer"
            >
              {closeIcon || defaultCloseIcon}
            </button>
          )}
        </div>
      </div>
    )
  }
)

DrawerHeader.displayName = 'DrawerHeader'

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => {
    const { loading, loadingMessage } = useDrawer()

    return (
      <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props}>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
              <span className="text-gray-600 dark:text-gray-400">{loadingMessage}</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    )
  }
)

DrawerContent.displayName = 'DrawerContent'

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => {
    const { footerBackgroundColor, footerBorderColor, footerPadding } = useDrawer()

    const customStyles: React.CSSProperties = {}
    if (footerBackgroundColor) customStyles.backgroundColor = footerBackgroundColor
    if (footerBorderColor) customStyles.borderColor = footerBorderColor
    if (footerPadding) customStyles.padding = footerPadding

    return (
      <div
        ref={ref}
        className={cn('flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4', className)}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DrawerFooter.displayName = 'DrawerFooter'

export interface DrawerItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DrawerItemList = React.forwardRef<HTMLDivElement, DrawerItemListProps>(
  ({ className, ...props }, ref) => {
    const { items, renderEmpty, emptyMessage } = useDrawer()

    if (items.length === 0) {
      return (
        <div ref={ref} className={cn('p-4', className)} {...props}>
          {renderEmpty ? (
            renderEmpty()
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <div className="text-4xl mb-2">📂</div>
              <div>{emptyMessage}</div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('py-2', className)} {...props}>
        {items.map((item, index) => (
          <DrawerItemComponent key={item.id || index} item={item} />
        ))}
      </div>
    )
  }
)

DrawerItemList.displayName = 'DrawerItemList'

export interface DrawerItemProps extends React.HTMLAttributes<HTMLElement> {
  item: DrawerItemData
}

const DrawerItemComponent = React.forwardRef<HTMLElement, DrawerItemProps>(
  ({ className, item, ...props }, ref) => {
    const { collapsed, renderItem, onItemClick, itemPadding, itemDisabledOpacity, iconColor } =
      useDrawer()

    const [isActive, setIsActive] = useState(false)

    const handleClick = useCallback(() => {
      if (item.disabled) return
      item.onClick?.()
      onItemClick?.(item)
    }, [item, onItemClick])

    const customStyles: React.CSSProperties = {}
    if (itemPadding) customStyles.padding = itemPadding
    if (item.disabled && itemDisabledOpacity) customStyles.opacity = itemDisabledOpacity

    if (renderItem) {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} className={className} {...props}>
          {renderItem(item, isActive)}
        </div>
      )
    }

    if (item.href) {
      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2 text-left transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none',
            item.disabled && 'cursor-not-allowed opacity-50',
            !item.disabled && 'cursor-pointer',
            className
          )}
          style={customStyles}
          href={item.href}
          onClick={handleClick}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {item.icon && (
            <span className="flex-shrink-0 flex items-center" style={{ color: iconColor }}>
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                {item.label}
                {item.badge && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <div className="truncate text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.description}
                </div>
              )}
            </div>
          )}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-2 text-left transition-colors',
          'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
          item.disabled && 'cursor-not-allowed opacity-50',
          !item.disabled && 'cursor-pointer',
          className
        )}
        style={customStyles}
        disabled={item.disabled}
        onClick={handleClick}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {item.icon && (
          <span className="flex-shrink-0 flex items-center" style={{ color: iconColor }}>
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="truncate font-medium text-gray-900 dark:text-gray-100">
              {item.label}
              {item.badge && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <div className="truncate text-sm text-gray-500 mt-0.5">{item.description}</div>
            )}
          </div>
        )}
      </button>
    )
  }
)

DrawerItemComponent.displayName = 'DrawerItem'

// Compound component interface
interface DrawerComponent
  extends React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>> {
  Container: typeof DrawerContainer
  Overlay: typeof DrawerOverlay
  Header: typeof DrawerHeader
  Content: typeof DrawerContent
  Footer: typeof DrawerFooter
  ItemList: typeof DrawerItemList
  Item: typeof DrawerItemComponent
}

// Create compound component
const DrawerCompound = Drawer as unknown as DrawerComponent
DrawerCompound.Container = DrawerContainer
DrawerCompound.Overlay = DrawerOverlay
DrawerCompound.Header = DrawerHeader
DrawerCompound.Content = DrawerContent
DrawerCompound.Footer = DrawerFooter
DrawerCompound.ItemList = DrawerItemList
DrawerCompound.Item = DrawerItemComponent

export {
  DrawerCompound,
  DrawerContainer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  DrawerItemList,
  DrawerItemComponent as DrawerItem,
}
export default DrawerCompound
