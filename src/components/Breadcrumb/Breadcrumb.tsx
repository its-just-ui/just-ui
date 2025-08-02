import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { cn } from '@/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  disabled?: boolean
  [key: string]: any
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[]
  value?: number | null
  onChange?: (index: number, item: BreadcrumbItem) => void
  onNavigate?: (index: number, item: BreadcrumbItem) => void
  variant?: 'default' | 'solid' | 'bordered' | 'underline' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  separator?: React.ReactNode | string
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  renderCollapsed?: (hiddenItems: BreadcrumbItem[]) => React.ReactNode
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode
  loading?: boolean
  disabled?: boolean
  transition?: 'none' | 'fade' | 'slide' | 'scale'
  transitionDuration?: number
  // Style customization props
  backgroundColor?: string
  textColor?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string
  // Item styles
  itemBackgroundColor?: string
  itemTextColor?: string
  itemHoverBackgroundColor?: string
  itemHoverTextColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  itemDisabledOpacity?: string
  itemPadding?: string
  itemPaddingX?: string
  itemPaddingY?: string
  itemBorderRadius?: string
  // Separator styles
  separatorColor?: string
  separatorSize?: string
  separatorMargin?: string
  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  // Shadow
  boxShadow?: string
  itemBoxShadow?: string
  itemHoverBoxShadow?: string
  // Icon styles
  iconSize?: string
  iconColor?: string
  iconMargin?: string
  children?: React.ReactNode
}

interface BreadcrumbContextValue {
  items: BreadcrumbItem[]
  value: number | null
  onChange?: (index: number, item: BreadcrumbItem) => void
  onNavigate?: (index: number, item: BreadcrumbItem) => void
  variant?: 'default' | 'solid' | 'bordered' | 'underline' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  separator?: React.ReactNode | string
  disabled?: boolean
  loading?: boolean
  transition?: 'none' | 'fade' | 'slide' | 'scale'
  transitionDuration?: number
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode
  // Style props
  itemBackgroundColor?: string
  itemTextColor?: string
  itemHoverBackgroundColor?: string
  itemHoverTextColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  itemDisabledOpacity?: string
  itemPadding?: string
  itemPaddingX?: string
  itemPaddingY?: string
  itemBorderRadius?: string
  separatorColor?: string
  separatorSize?: string
  separatorMargin?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  itemBoxShadow?: string
  itemHoverBoxShadow?: string
  iconSize?: string
  iconColor?: string
  iconMargin?: string
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(undefined)

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumb must be used within a Breadcrumb')
  }
  return context
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      items = [],
      value,
      onChange,
      onNavigate,
      variant = 'default',
      size = 'md',
      separator,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      renderCollapsed,
      renderItem,
      loading = false,
      disabled = false,
      transition = 'none',
      transitionDuration = 200,
      // Style props
      backgroundColor,
      textColor,
      fontSize,
      fontWeight,
      fontFamily,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding,
      paddingX,
      paddingY,
      gap,
      itemBackgroundColor,
      itemTextColor,
      itemHoverBackgroundColor,
      itemHoverTextColor,
      itemActiveBackgroundColor,
      itemActiveTextColor,
      itemDisabledOpacity,
      itemPadding,
      itemPaddingX,
      itemPaddingY,
      itemBorderRadius,
      separatorColor,
      separatorSize,
      separatorMargin,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
      boxShadow,
      itemBoxShadow,
      itemHoverBoxShadow,
      iconSize,
      iconColor,
      iconMargin,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [collapsedOpen, setCollapsedOpen] = useState(false)

    const processedItems = useMemo(() => {
      if (!maxItems || items.length <= maxItems) {
        return items
      }

      const itemsBefore = items.slice(0, itemsBeforeCollapse)
      const itemsAfter = items.slice(items.length - itemsAfterCollapse)
      const hiddenItems = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse)

      return [...itemsBefore, { __collapsed: true, items: hiddenItems }, ...itemsAfter]
    }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse])

    const baseStyles = 'flex items-center flex-wrap'

    const variants = {
      default: '',
      solid: 'bg-gray-100 rounded-lg p-2',
      bordered: 'border border-gray-200 rounded-lg p-2',
      underline: 'border-b border-gray-200 pb-2',
      pills: 'gap-2',
    }

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const defaultSeparator = separator || (
      <span
        className="mx-2"
        style={{
          color: separatorColor || '#6b7280',
          margin: separatorMargin || '0 0.5rem',
          fontSize: separatorSize || '1rem',
        }}
      >
        &gt;
      </span>
    )

    const customStyles: React.CSSProperties = {
      backgroundColor:
        backgroundColor ||
        (variant === 'solid'
          ? '#f3f4f6'
          : variant === 'bordered' || variant === 'underline'
            ? 'transparent'
            : undefined),
      color: textColor || '#374151',
      fontSize: fontSize || (size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem'),
      fontWeight: fontWeight || '400',
      fontFamily,
      borderWidth:
        borderWidth ||
        (variant === 'bordered' ? '1px' : variant === 'underline' ? '0 0 1px 0' : '0'),
      borderColor: borderColor || '#e5e7eb',
      borderStyle: borderStyle || 'solid',
      borderRadius:
        borderRadius || (variant === 'solid' || variant === 'bordered' ? '0.5rem' : '0'),
      padding:
        padding ||
        (paddingX || paddingY
          ? undefined
          : variant === 'solid' || variant === 'bordered'
            ? '0.5rem'
            : variant === 'underline'
              ? '0 0 0.5rem 0'
              : '0'),
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      gap: gap || '0',
      boxShadow:
        boxShadow ||
        (variant === 'solid' || variant === 'bordered'
          ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          : 'none'),
      ...style,
    }

    return (
      <BreadcrumbContext.Provider
        value={{
          items,
          value: value ?? null,
          onChange,
          onNavigate,
          variant,
          size,
          separator: defaultSeparator,
          disabled,
          loading,
          transition,
          transitionDuration,
          renderItem,
          itemBackgroundColor,
          itemTextColor,
          itemHoverBackgroundColor,
          itemHoverTextColor,
          itemActiveBackgroundColor,
          itemActiveTextColor,
          itemDisabledOpacity,
          itemPadding,
          itemPaddingX,
          itemPaddingY,
          itemBorderRadius,
          separatorColor,
          separatorSize,
          separatorMargin,
          focusRingColor,
          focusRingWidth,
          focusRingOffset,
          focusRingOffsetColor,
          itemBoxShadow,
          itemHoverBoxShadow,
          iconSize,
          iconColor,
          iconMargin,
        }}
      >
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            disabled && 'opacity-50 cursor-not-allowed',
            loading && 'animate-pulse',
            className
          )}
          style={customStyles}
          {...props}
        >
          {children || (
            <ol className="flex items-center flex-wrap" style={{ gap }}>
              {processedItems.map((item, index) => {
                if (item.__collapsed) {
                  return (
                    <React.Fragment key={`collapsed-${index}`}>
                      {index > 0 && defaultSeparator}
                      <BreadcrumbItem
                        index={index}
                        item={{ label: '...', __collapsed: true, items: item.items }}
                        isLast={false}
                        renderCollapsed={renderCollapsed}
                        collapsedOpen={collapsedOpen}
                        setCollapsedOpen={setCollapsedOpen}
                      />
                    </React.Fragment>
                  )
                }

                return (
                  <React.Fragment key={`item-${index}-${item.label}`}>
                    {index > 0 && defaultSeparator}
                    <BreadcrumbItem
                      index={index}
                      item={item}
                      isLast={index === processedItems.length - 1}
                    />
                  </React.Fragment>
                )
              })}
            </ol>
          )}
        </nav>
      </BreadcrumbContext.Provider>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'

export interface BreadcrumbItemComponentProps extends React.LiHTMLAttributes<HTMLLIElement> {
  index: number
  item: BreadcrumbItem & { __collapsed?: boolean; items?: BreadcrumbItem[] }
  isLast: boolean
  renderCollapsed?: (hiddenItems: BreadcrumbItem[]) => React.ReactNode
  collapsedOpen?: boolean
  setCollapsedOpen?: (open: boolean) => void
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemComponentProps>(
  (
    {
      className,
      index,
      item,
      isLast,
      renderCollapsed,
      collapsedOpen,
      setCollapsedOpen,
      style,
      ...props
    },
    ref
  ) => {
    const {
      value,
      onChange,
      onNavigate,
      variant,
      size,
      disabled: breadcrumbDisabled,
      transition,
      transitionDuration,
      renderItem,
      itemBackgroundColor,
      itemTextColor,
      itemHoverBackgroundColor,
      itemHoverTextColor,
      itemActiveBackgroundColor,
      itemActiveTextColor,
      itemDisabledOpacity,
      itemPadding,
      itemPaddingX,
      itemPaddingY,
      itemBorderRadius,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
      itemBoxShadow,
      itemHoverBoxShadow,
      iconSize,
      iconColor,
      iconMargin,
    } = useBreadcrumb()

    const [isHovered, setIsHovered] = useState(false)
    const isActive = value === index
    const isDisabled = item.disabled || breadcrumbDisabled

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (isDisabled || isLast) {
          e.preventDefault()
          return
        }

        if (item.__collapsed && setCollapsedOpen) {
          e.preventDefault()
          setCollapsedOpen(!collapsedOpen)
          return
        }

        if (onChange) {
          onChange(index, item)
        }

        if (onNavigate) {
          onNavigate(index, item)
        }
      },
      [isDisabled, isLast, item, onChange, onNavigate, index, setCollapsedOpen, collapsedOpen]
    )

    if (renderItem && !item.__collapsed) {
      const customElement = renderItem(item, index, isLast)
      return (
        <li ref={ref} className={className} {...props}>
          {customElement}
        </li>
      )
    }

    const baseStyles = cn(
      'inline-flex items-center transition-all cursor-pointer',
      'focus:outline-none focus-visible:ring',
      isLast && 'font-medium cursor-default',
      isDisabled && 'cursor-not-allowed'
    )

    const variantStyles = {
      default: '',
      solid: '',
      bordered: '',
      underline: '',
      pills: cn('rounded-full px-3 py-1', !isLast && !isDisabled && 'hover:bg-gray-100'),
    }

    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const transitions = {
      none: '',
      fade: `transition-opacity duration-${transitionDuration}`,
      slide: `transition-transform duration-${transitionDuration}`,
      scale: `transition-transform duration-${transitionDuration} hover:scale-105`,
    }

    const customStyles: React.CSSProperties = {
      backgroundColor: isActive
        ? itemActiveBackgroundColor || (variant === 'pills' ? '#3b82f6' : 'transparent')
        : isHovered
          ? itemHoverBackgroundColor || (variant === 'pills' ? '#f3f4f6' : 'transparent')
          : itemBackgroundColor || 'transparent',
      color: isActive
        ? itemActiveTextColor || (variant === 'pills' ? '#ffffff' : '#3b82f6')
        : isHovered
          ? itemHoverTextColor || '#1f2937'
          : itemTextColor || '#4b5563',
      opacity: isDisabled ? itemDisabledOpacity || '0.5' : undefined,
      padding:
        itemPadding ||
        (itemPaddingX || itemPaddingY
          ? undefined
          : variant === 'pills'
            ? '0.25rem 0.75rem'
            : '0.25rem 0.5rem'),
      paddingLeft: itemPaddingX,
      paddingRight: itemPaddingX,
      paddingTop: itemPaddingY,
      paddingBottom: itemPaddingY,
      borderRadius: itemBorderRadius || (variant === 'pills' ? '9999px' : '0.375rem'),
      boxShadow: isHovered ? itemHoverBoxShadow || 'none' : itemBoxShadow || 'none',
      ...style,
    }

    const focusStyles: React.CSSProperties = {
      '--tw-ring-color': focusRingColor || '#3b82f6',
      '--tw-ring-offset-width': focusRingOffset || '2px',
      '--tw-ring-offset-color': focusRingOffsetColor || '#ffffff',
      '--tw-ring-width': focusRingWidth || '2px',
    } as React.CSSProperties

    if (item.__collapsed && renderCollapsed) {
      return (
        <li ref={ref} className="relative" {...props}>
          <button
            className={cn(
              baseStyles,
              variantStyles[variant || 'default'],
              sizeStyles[size || 'md'],
              className
            )}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...customStyles, ...focusStyles }}
            aria-expanded={collapsedOpen}
            aria-label="Show hidden items"
          >
            ...
          </button>
          {collapsedOpen && (
            <div className="absolute top-full left-0 mt-2 z-10">
              {renderCollapsed(item.items || [])}
            </div>
          )}
        </li>
      )
    }

    const content = (
      <>
        {item.icon && (
          <span
            className="flex-shrink-0"
            style={{
              fontSize:
                iconSize || (size === 'sm' ? '1rem' : size === 'lg' ? '1.25rem' : '1.125rem'),
              color: iconColor || 'currentColor',
              marginRight: iconMargin || '0.5rem',
            }}
          >
            {item.icon}
          </span>
        )}
        <span>{item.label}</span>
      </>
    )

    return (
      <li ref={ref} {...props}>
        {item.href && !isLast && !isDisabled ? (
          <a
            href={item.href}
            className={cn(
              baseStyles,
              variantStyles[variant || 'default'],
              sizeStyles[size || 'md'],
              transitions[transition || 'none'],
              className
            )}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...customStyles, ...focusStyles }}
            aria-current={isLast ? 'page' : undefined}
          >
            {content}
          </a>
        ) : (
          <span
            className={cn(
              baseStyles,
              variantStyles[variant || 'default'],
              sizeStyles[size || 'md'],
              transitions[transition || 'none'],
              className
            )}
            onClick={!isLast && !isDisabled ? handleClick : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...customStyles, ...focusStyles }}
            role={!isLast && !isDisabled ? 'button' : undefined}
            tabIndex={!isLast && !isDisabled ? 0 : undefined}
            aria-current={isLast ? 'page' : undefined}
          >
            {content}
          </span>
        )}
      </li>
    )
  }
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    const { separator, separatorColor, separatorSize, separatorMargin } = useBreadcrumb()

    const customStyles: React.CSSProperties = {
      color: separatorColor || '#6b7280',
      fontSize: separatorSize || '1rem',
      margin: separatorMargin || '0 0.5rem',
    }

    return (
      <span
        ref={ref}
        className={cn('mx-2', className)}
        style={customStyles}
        aria-hidden="true"
        {...props}
      >
        {children || separator}
      </span>
    )
  }
)

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item: BreadcrumbItem
  index: number
  isLast?: boolean
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, item, index, isLast = false, style, ...props }, ref) => {
    const {
      value,
      onChange,
      onNavigate,
      size,
      disabled,
      itemTextColor,
      itemHoverTextColor,
      itemActiveTextColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
    } = useBreadcrumb()

    const [isHovered, setIsHovered] = useState(false)
    const isActive = value === index
    const isDisabled = item.disabled || disabled

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled || isLast) {
          e.preventDefault()
          return
        }

        if (!item.href) {
          e.preventDefault()
        }

        if (onChange) {
          onChange(index, item)
        }

        if (onNavigate) {
          onNavigate(index, item)
        }
      },
      [isDisabled, isLast, item, onChange, onNavigate, index]
    )

    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const customStyles: React.CSSProperties = {
      color: isActive
        ? itemActiveTextColor || '#3b82f6'
        : isHovered
          ? itemHoverTextColor || '#1f2937'
          : itemTextColor || '#4b5563',
      opacity: isDisabled ? '0.5' : undefined,
      '--tw-ring-color': focusRingColor || '#3b82f6',
      '--tw-ring-offset-width': focusRingOffset || '2px',
      '--tw-ring-offset-color': focusRingOffsetColor || '#ffffff',
      '--tw-ring-width': focusRingWidth || '2px',
      ...style,
    } as React.CSSProperties

    return (
      <a
        ref={ref}
        href={item.href || '#'}
        className={cn(
          'inline-flex items-center transition-colors',
          'focus:outline-none focus-visible:ring',
          sizeStyles[size || 'md'],
          isLast && 'font-medium pointer-events-none',
          isDisabled && 'cursor-not-allowed',
          !isLast && !isDisabled && 'hover:text-primary-600',
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={customStyles}
        aria-current={isLast ? 'page' : undefined}
        aria-disabled={isDisabled}
        {...props}
      >
        {item.icon && <span className="mr-2 flex-shrink-0">{item.icon}</span>}
        {item.label}
      </a>
    )
  }
)

BreadcrumbLink.displayName = 'BreadcrumbLink'

export {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemComponent,
  BreadcrumbSeparator,
  BreadcrumbLink,
}
