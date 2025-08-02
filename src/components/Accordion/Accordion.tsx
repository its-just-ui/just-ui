import React, { createContext, useContext, useState, useCallback } from 'react'
import { cn } from '@/utils'

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  collapsible?: boolean
  variant?: 'default' | 'bordered' | 'filled' | 'separated' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  transition?: 'none' | 'fade' | 'slide' | 'collapse' | 'zoom' | 'smooth'
  transitionDuration?: number
  expandIcon?: React.ReactNode
  expandIconPosition?: 'start' | 'end'
  loading?: boolean
  loadingMessage?: string
  emptyMessage?: string
  // Container style props
  backgroundColor?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string
  boxShadow?: string
  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  // Item style props
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemBorderWidth?: string
  itemBorderColor?: string
  itemBorderStyle?: string
  itemBorderRadius?: string
  itemPadding?: string
  itemPaddingX?: string
  itemPaddingY?: string
  itemBoxShadow?: string
  itemGap?: string
  // Trigger style props
  triggerBackgroundColor?: string
  triggerHoverBackgroundColor?: string
  triggerActiveBackgroundColor?: string
  triggerTextColor?: string
  triggerHoverTextColor?: string
  triggerActiveTextColor?: string
  triggerFontSize?: string
  triggerFontWeight?: string
  triggerPadding?: string
  triggerPaddingX?: string
  triggerPaddingY?: string
  triggerBorderRadius?: string
  // Content style props
  contentBackgroundColor?: string
  contentTextColor?: string
  contentFontSize?: string
  contentPadding?: string
  contentPaddingX?: string
  contentPaddingY?: string
  contentBorderWidth?: string
  contentBorderColor?: string
  contentBorderStyle?: string
  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  focusBoxShadow?: string
  // Icon styles
  iconSize?: string
  iconColor?: string
  iconHoverColor?: string
  iconActiveColor?: string
  iconRotation?: string
  // Divider styles
  dividerColor?: string
  dividerWidth?: string
  dividerStyle?: string
  // Status colors
  successColor?: string
  warningColor?: string
  errorColor?: string
  children: React.ReactNode
}

interface AccordionContextValue {
  value: string[]
  onItemToggle: (itemValue: string) => void
  disabled?: boolean
  variant?: 'default' | 'bordered' | 'filled' | 'separated' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  transition?: 'none' | 'fade' | 'slide' | 'collapse' | 'zoom' | 'smooth'
  transitionDuration?: number
  expandIcon?: React.ReactNode
  expandIconPosition?: 'start' | 'end'
  loading?: boolean
  // Pass through all style props
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemBorderWidth?: string
  itemBorderColor?: string
  itemBorderStyle?: string
  itemBorderRadius?: string
  itemPadding?: string
  itemPaddingX?: string
  itemPaddingY?: string
  itemBoxShadow?: string
  itemGap?: string
  triggerBackgroundColor?: string
  triggerHoverBackgroundColor?: string
  triggerActiveBackgroundColor?: string
  triggerTextColor?: string
  triggerHoverTextColor?: string
  triggerActiveTextColor?: string
  triggerFontSize?: string
  triggerFontWeight?: string
  triggerPadding?: string
  triggerPaddingX?: string
  triggerPaddingY?: string
  triggerBorderRadius?: string
  contentBackgroundColor?: string
  contentTextColor?: string
  contentFontSize?: string
  contentPadding?: string
  contentPaddingX?: string
  contentPaddingY?: string
  contentBorderWidth?: string
  contentBorderColor?: string
  contentBorderStyle?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  focusBoxShadow?: string
  iconSize?: string
  iconColor?: string
  iconHoverColor?: string
  iconActiveColor?: string
  iconRotation?: string
  dividerColor?: string
  dividerWidth?: string
  dividerStyle?: string
  successColor?: string
  warningColor?: string
  errorColor?: string
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

export const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion')
  }
  return context
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = 'single',
      defaultValue,
      value: controlledValue,
      onValueChange,
      disabled = false,
      collapsible = true,
      variant = 'default',
      size = 'md',
      status = 'default',
      transition = 'collapse',
      transitionDuration = 300,
      expandIcon,
      expandIconPosition = 'end',
      loading = false,
      loadingMessage = 'Loading...',
      emptyMessage = 'No items to display',
      // Style props with defaults
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding,
      paddingX,
      paddingY,
      gap,
      boxShadow,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      // Item styles
      itemBackgroundColor,
      itemHoverBackgroundColor,
      itemActiveBackgroundColor,
      itemBorderWidth,
      itemBorderColor,
      itemBorderStyle,
      itemBorderRadius,
      itemPadding,
      itemPaddingX,
      itemPaddingY,
      itemBoxShadow,
      itemGap,
      // Trigger styles
      triggerBackgroundColor,
      triggerHoverBackgroundColor,
      triggerActiveBackgroundColor,
      triggerTextColor,
      triggerHoverTextColor,
      triggerActiveTextColor,
      triggerFontSize,
      triggerFontWeight,
      triggerPadding,
      triggerPaddingX,
      triggerPaddingY,
      triggerBorderRadius,
      // Content styles
      contentBackgroundColor,
      contentTextColor,
      contentFontSize,
      contentPadding,
      contentPaddingX,
      contentPaddingY,
      contentBorderWidth,
      contentBorderColor,
      contentBorderStyle,
      // Focus styles
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
      focusBorderColor,
      focusBackgroundColor,
      focusBoxShadow,
      // Icon styles
      iconSize,
      iconColor,
      iconHoverColor,
      iconActiveColor,
      iconRotation,
      // Divider styles
      dividerColor,
      dividerWidth,
      dividerStyle,
      // Status colors
      successColor,
      warningColor,
      errorColor,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      }
      return []
    })

    const value =
      controlledValue !== undefined
        ? Array.isArray(controlledValue)
          ? controlledValue
          : [controlledValue]
        : uncontrolledValue

    const onItemToggle = useCallback(
      (itemValue: string) => {
        let newValue: string[]

        if (type === 'single') {
          if (value.includes(itemValue) && collapsible) {
            newValue = []
          } else {
            newValue = [itemValue]
          }
        } else {
          if (value.includes(itemValue)) {
            newValue = value.filter((v) => v !== itemValue)
          } else {
            newValue = [...value, itemValue]
          }
        }

        if (controlledValue === undefined) {
          setUncontrolledValue(newValue)
        }

        if (onValueChange) {
          onValueChange(type === 'single' ? newValue[0] || '' : newValue)
        }
      },
      [value, type, collapsible, controlledValue, onValueChange]
    )

    // Default styles based on variant and status
    const getDefaultStyles = () => {
      const statusColors = {
        default: { border: '#e5e7eb', text: '#374151' },
        success: { border: successColor || '#10b981', text: successColor || '#10b981' },
        warning: { border: warningColor || '#f59e0b', text: warningColor || '#f59e0b' },
        error: { border: errorColor || '#ef4444', text: errorColor || '#ef4444' },
      }

      const currentStatus = statusColors[status]

      return {
        backgroundColor: backgroundColor || (variant === 'filled' ? '#f3f4f6' : 'transparent'),
        borderWidth:
          borderWidth || (variant === 'bordered' || variant === 'outlined' ? '1px' : '0'),
        borderColor: borderColor || currentStatus.border,
        borderStyle: borderStyle || 'solid',
        borderRadius: borderRadius || (variant === 'separated' ? '0' : '0.5rem'),
        padding:
          padding ||
          (paddingX || paddingY
            ? undefined
            : variant === 'filled' || variant === 'bordered'
              ? '0.5rem'
              : '0'),
        gap: gap || (variant === 'separated' ? '0.5rem' : '0'),
        fontSize: fontSize || (size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem'),
        fontWeight: fontWeight || '400',
        textColor: textColor || currentStatus.text,
        boxShadow:
          boxShadow ||
          (variant === 'bordered' || variant === 'outlined'
            ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            : 'none'),
      }
    }

    const defaultStyles = getDefaultStyles()

    const baseStyles = 'w-full'

    const variants = {
      default: '',
      bordered: 'border overflow-hidden',
      filled: 'p-2',
      separated: 'space-y-2',
      outlined: 'border',
    }

    const customStyles: React.CSSProperties = {
      backgroundColor: defaultStyles.backgroundColor,
      borderWidth: defaultStyles.borderWidth,
      borderColor: defaultStyles.borderColor,
      borderStyle: defaultStyles.borderStyle,
      borderRadius: defaultStyles.borderRadius,
      padding: defaultStyles.padding,
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      gap: defaultStyles.gap,
      boxShadow: defaultStyles.boxShadow,
      fontSize: defaultStyles.fontSize,
      fontWeight: defaultStyles.fontWeight,
      fontFamily,
      color: defaultStyles.textColor,
      ...style,
    }

    return (
      <AccordionContext.Provider
        value={{
          value,
          onItemToggle,
          disabled,
          variant,
          size,
          status,
          transition,
          transitionDuration,
          expandIcon,
          expandIconPosition,
          loading,
          // Pass through all style props
          itemBackgroundColor,
          itemHoverBackgroundColor,
          itemActiveBackgroundColor,
          itemBorderWidth,
          itemBorderColor,
          itemBorderStyle,
          itemBorderRadius,
          itemPadding,
          itemPaddingX,
          itemPaddingY,
          itemBoxShadow,
          itemGap,
          triggerBackgroundColor,
          triggerHoverBackgroundColor,
          triggerActiveBackgroundColor,
          triggerTextColor,
          triggerHoverTextColor,
          triggerActiveTextColor,
          triggerFontSize,
          triggerFontWeight,
          triggerPadding,
          triggerPaddingX,
          triggerPaddingY,
          triggerBorderRadius,
          contentBackgroundColor,
          contentTextColor,
          contentFontSize,
          contentPadding,
          contentPaddingX,
          contentPaddingY,
          contentBorderWidth,
          contentBorderColor,
          contentBorderStyle,
          focusRingColor,
          focusRingWidth,
          focusRingOffset,
          focusRingOffsetColor,
          focusBorderColor,
          focusBackgroundColor,
          focusBoxShadow,
          iconSize,
          iconColor,
          iconHoverColor,
          iconActiveColor,
          iconRotation,
          dividerColor,
          dividerWidth,
          dividerStyle,
          successColor,
          warningColor,
          errorColor,
        }}
      >
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            disabled && 'opacity-50 cursor-not-allowed',
            loading && 'animate-pulse',
            className
          )}
          style={customStyles}
          {...props}
        >
          {loading ? (
            <div className="text-center py-8 text-gray-500">{loadingMessage}</div>
          ) : React.Children.count(children) === 0 ? (
            <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
          ) : (
            children
          )}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled, children, style, ...props }, ref) => {
    const {
      variant,
      size,
      status: _status,
      itemBackgroundColor,
      itemBorderWidth,
      itemBorderColor,
      itemBorderStyle,
      itemBorderRadius,
      itemPadding,
      itemPaddingX,
      itemPaddingY,
      itemBoxShadow,
      itemGap,
      dividerColor,
      dividerWidth,
      dividerStyle,
    } = useAccordion()

    const baseStyles = 'group'

    const variants = {
      default: cn('border-b last:border-b-0', dividerColor && `border-b-[${dividerColor}]`),
      bordered: 'border-b last:border-b-0',
      filled: 'bg-white rounded-md mb-2 last:mb-0 shadow-sm',
      separated: 'bg-white border rounded-lg shadow-sm',
      outlined: 'border-b last:border-b-0',
    }

    const sizes = {
      sm: '',
      md: '',
      lg: '',
    }

    const getDefaultItemStyles = () => {
      return {
        backgroundColor:
          itemBackgroundColor ||
          (variant === 'filled' || variant === 'separated' ? '#ffffff' : 'transparent'),
        borderWidth: itemBorderWidth || (variant === 'separated' ? '1px' : '0'),
        borderColor: itemBorderColor || '#e5e7eb',
        borderStyle: itemBorderStyle || 'solid',
        borderRadius:
          itemBorderRadius || (variant === 'filled' || variant === 'separated' ? '0.375rem' : '0'),
        padding: itemPadding || (itemPaddingX || itemPaddingY ? undefined : '0'),
        gap: itemGap || '0',
        boxShadow:
          itemBoxShadow ||
          (variant === 'filled' || variant === 'separated'
            ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            : 'none'),
      }
    }

    const defaultItemStyles = getDefaultItemStyles()

    const customStyles: React.CSSProperties = {
      backgroundColor: defaultItemStyles.backgroundColor,
      borderWidth: defaultItemStyles.borderWidth,
      borderColor: defaultItemStyles.borderColor,
      borderStyle: defaultItemStyles.borderStyle,
      borderRadius: defaultItemStyles.borderRadius,
      padding: defaultItemStyles.padding,
      paddingLeft: itemPaddingX,
      paddingRight: itemPaddingX,
      paddingTop: itemPaddingY,
      paddingBottom: itemPaddingY,
      gap: defaultItemStyles.gap,
      boxShadow: defaultItemStyles.boxShadow,
      borderBottomWidth:
        dividerWidth ||
        (variant === 'default' || variant === 'bordered' || variant === 'outlined' ? '1px' : '0'),
      borderBottomColor: dividerColor || '#e5e7eb',
      borderBottomStyle: (dividerStyle || 'solid') as React.CSSProperties['borderBottomStyle'],
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant || 'default'],
          sizes[size || 'md'],
          disabled && 'opacity-50',
          className
        )}
        data-state={value}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, disabled, style, ...props }, ref) => {
    const {
      value,
      onItemToggle,
      disabled: accordionDisabled,
      size,
      expandIcon,
      expandIconPosition,
      triggerBackgroundColor,
      triggerHoverBackgroundColor,
      triggerActiveBackgroundColor,
      triggerTextColor,
      triggerHoverTextColor,
      triggerActiveTextColor,
      triggerFontSize,
      triggerFontWeight,
      triggerPadding,
      triggerPaddingX,
      triggerPaddingY,
      triggerBorderRadius,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
      focusBorderColor,
      focusBackgroundColor,
      focusBoxShadow,
      iconSize,
      iconColor,
      iconHoverColor,
      iconActiveColor,
      iconRotation,
    } = useAccordion()
    const item = useContext(AccordionItemContext)

    if (!item) {
      throw new Error('AccordionTrigger must be used within an AccordionItem')
    }

    const isOpen = value.includes(item.value)
    const isDisabled = disabled || accordionDisabled || item.disabled
    const [isHovered, setIsHovered] = useState(false)

    const baseStyles =
      'flex w-full items-center justify-between text-left transition-all focus:outline-none focus-visible:ring'

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const getDefaultTriggerStyles = () => {
      return {
        backgroundColor: isOpen
          ? triggerActiveBackgroundColor || 'transparent'
          : isHovered
            ? triggerHoverBackgroundColor || '#f9fafb'
            : triggerBackgroundColor || 'transparent',
        color: isOpen
          ? triggerActiveTextColor || '#1f2937'
          : isHovered
            ? triggerHoverTextColor || '#111827'
            : triggerTextColor || '#374151',
        fontSize:
          triggerFontSize || (size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem'),
        fontWeight: triggerFontWeight || '500',
        padding:
          triggerPadding ||
          (triggerPaddingX || triggerPaddingY
            ? undefined
            : size === 'sm'
              ? '0.75rem'
              : size === 'lg'
                ? '1.25rem'
                : '1rem'),
        borderRadius: triggerBorderRadius || '0',
        '--tw-ring-color': focusRingColor || '#3b82f6',
        '--tw-ring-width': focusRingWidth || '2px',
        '--tw-ring-offset-width': focusRingOffset || '2px',
        '--tw-ring-offset-color': focusRingOffsetColor || '#ffffff',
      }
    }

    const defaultTriggerStyles = getDefaultTriggerStyles()

    const customStyles: React.CSSProperties = {
      ...defaultTriggerStyles,
      ...(triggerPaddingX && { paddingLeft: triggerPaddingX, paddingRight: triggerPaddingX }),
      ...(triggerPaddingY && { paddingTop: triggerPaddingY, paddingBottom: triggerPaddingY }),
      ...(focusBorderColor && { borderColor: focusBorderColor }),
      ...(focusBoxShadow && { boxShadow: focusBoxShadow }),
      ...style,
    } as React.CSSProperties

    const defaultIcon = (
      <svg
        className={cn('shrink-0 transition-transform', isOpen && `rotate-${iconRotation || '180'}`)}
        style={{
          width: iconSize || '1rem',
          height: iconSize || '1rem',
          color: isOpen
            ? iconActiveColor || 'currentColor'
            : isHovered
              ? iconHoverColor || 'currentColor'
              : iconColor || 'currentColor',
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )

    const icon = expandIcon || defaultIcon

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          baseStyles,
          sizes[size || 'md'],
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={isDisabled}
        onClick={() => onItemToggle(item.value)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => {
          if (focusBackgroundColor) {
            // Apply focus background color
          }
        }}
        aria-expanded={isOpen}
        style={customStyles}
        {...props}
      >
        {expandIconPosition === 'start' && <span className="mr-2">{icon}</span>}
        <span className="flex-1">{children}</span>
        {expandIconPosition === 'end' && <span className="ml-2">{icon}</span>}
      </button>
    )
  }
)

AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  forceMount?: boolean
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, forceMount = false, style, ...props }, ref) => {
    const {
      value,
      size,
      transition,
      transitionDuration,
      contentBackgroundColor,
      contentTextColor,
      contentFontSize,
      contentPadding,
      contentPaddingX,
      contentPaddingY,
      contentBorderWidth,
      contentBorderColor,
      contentBorderStyle,
    } = useAccordion()
    const item = useContext(AccordionItemContext)

    if (!item) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }

    const isOpen = value.includes(item.value)

    if (!forceMount && !isOpen) {
      return null
    }

    const baseStyles = 'overflow-hidden'

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const transitions = {
      none: '',
      fade: cn(
        'transition-opacity',
        `duration-${transitionDuration}`,
        isOpen ? 'opacity-100' : 'opacity-0'
      ),
      slide: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'translate-y-0' : '-translate-y-2'
      ),
      collapse: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'max-h-96' : 'max-h-0'
      ),
      zoom: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ),
      smooth: cn(
        'transition-all ease-in-out',
        `duration-${transitionDuration}`,
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      ),
    }

    const getDefaultContentStyles = () => {
      return {
        backgroundColor: contentBackgroundColor || 'transparent',
        color: contentTextColor || '#4b5563',
        fontSize:
          contentFontSize || (size === 'sm' ? '0.875rem' : size === 'lg' ? '1rem' : '0.875rem'),
        padding:
          contentPadding ||
          (contentPaddingX || contentPaddingY
            ? undefined
            : size === 'sm'
              ? '0.75rem'
              : size === 'lg'
                ? '1.25rem'
                : '1rem'),
        borderWidth: contentBorderWidth || '0',
        borderColor: contentBorderColor || '#e5e7eb',
        borderStyle: contentBorderStyle || 'solid',
      }
    }

    const defaultContentStyles = getDefaultContentStyles()

    const customStyles: React.CSSProperties = {
      backgroundColor: defaultContentStyles.backgroundColor,
      color: defaultContentStyles.color,
      fontSize: defaultContentStyles.fontSize,
      padding: defaultContentStyles.padding,
      paddingLeft: contentPaddingX,
      paddingRight: contentPaddingX,
      paddingTop: contentPaddingY,
      paddingBottom: contentPaddingY,
      borderWidth: defaultContentStyles.borderWidth,
      borderColor: defaultContentStyles.borderColor,
      borderStyle: defaultContentStyles.borderStyle,
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, transitions[transition || 'collapse'], className)}
        hidden={!forceMount && !isOpen}
        {...props}
      >
        <div className={cn(sizes[size || 'md'])} style={customStyles}>
          {children}
        </div>
      </div>
    )
  }
)

AccordionContent.displayName = 'AccordionContent'

interface AccordionItemContextValue {
  value: string
  disabled?: boolean
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined)

const AccordionItemWrapper = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value, disabled }}>
        <AccordionItem ref={ref} value={value} disabled={disabled} {...props} />
      </AccordionItemContext.Provider>
    )
  }
)

AccordionItemWrapper.displayName = 'AccordionItem'

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }
