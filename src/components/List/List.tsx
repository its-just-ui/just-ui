import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { cn } from '@/utils'

export interface ListItem {
  id: string
  title: string
  description?: string
  disabled?: boolean
  icon?: React.ReactNode
  avatar?: React.ReactNode
  badge?: React.ReactNode
  action?: React.ReactNode
  [key: string]: any
}

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: ListItem[]
  value?: string | string[] | null
  onChange?: (value: string | string[] | null) => void
  variant?: 'default' | 'bordered' | 'card' | 'minimal' | 'elevated' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error' | 'info'
  disabled?: boolean
  loading?: boolean
  selectable?: boolean
  multiple?: boolean
  maxSelection?: number
  label?: string
  helperText?: string
  required?: boolean
  emptyMessage?: string
  loadingMessage?: string
  onItemClick?: (item: ListItem) => void
  onItemSelect?: (item: ListItem) => void
  renderItem?: (item: ListItem, isSelected: boolean) => React.ReactNode
  children?: React.ReactNode
  
  // Dark mode
  darkMode?: boolean
  darkBackgroundColor?: string
  darkTextColor?: string
  darkBorderColor?: string
  darkHoverBackgroundColor?: string
  darkSelectedBackgroundColor?: string
  darkDisabledBackgroundColor?: string
  darkFocusRingColor?: string
  darkFocusBorderColor?: string
  darkFocusBackgroundColor?: string
  darkBoxShadow?: string
  darkFocusBoxShadow?: string
  darkHoverBoxShadow?: string
  
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
  selectedBackgroundColor?: string
  hoverBackgroundColor?: string
  disabledBackgroundColor?: string
  
  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  
  // Shadows
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string
  
  // Spacing
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string
  
  // Icon customization
  iconColor?: string
  actionIconColor?: string
  loadingIconColor?: string
  
  // Label styles
  labelFontSize?: string
  labelFontWeight?: string
  labelColor?: string
  labelMarginBottom?: string
  
  // Helper text styles
  helperTextFontSize?: string
  helperTextColor?: string
  helperTextMarginTop?: string
  
  // Required asterisk styles
  requiredColor?: string
  
  // Container styles
  containerBackgroundColor?: string
  containerBorderColor?: string
  containerBorderWidth?: string
  containerBorderRadius?: string
  containerPadding?: string
  containerGap?: string
  
  // Item styles
  itemPadding?: string
  itemBorderWidth?: string
  itemBorderColor?: string
  itemBorderRadius?: string
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemSelectedBackgroundColor?: string
  itemSelectedTextColor?: string
  itemDisabledOpacity?: string
  itemGap?: string
  
  // Title styles
  titleFontSize?: string
  titleFontWeight?: string
  titleColor?: string
  titleLineHeight?: string
  
  // Description styles
  descriptionFontSize?: string
  descriptionColor?: string
  descriptionLineHeight?: string
  descriptionMarginTop?: string
  
  // Avatar styles
  avatarSize?: string
  avatarBorderRadius?: string
  avatarBorderWidth?: string
  avatarBorderColor?: string
  
  // Badge styles
  badgeFontSize?: string
  badgePadding?: string
  badgeBorderRadius?: string
  badgeBackgroundColor?: string
  badgeTextColor?: string
  
  // Selection styles
  selectionIndicatorColor?: string
  selectionIndicatorSize?: string
  selectionIndicatorBorderRadius?: string
  selectionIndicatorBorderWidth?: string
  selectionIndicatorBorderColor?: string
  selectionIndicatorBackgroundColor?: string
  selectionIndicatorTextColor?: string
  
  // Animation
  animationDuration?: string
  animationTimingFunction?: string
  animationDelay?: string
  hoverScale?: string
  hoverRotate?: string
  hoverTranslateX?: string
  hoverTranslateY?: string
  
  // Custom CSS
  customCSS?: string
  customContainerCSS?: string
  customItemCSS?: string
}

interface ListContextValue {
  items: ListItem[]
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void
  variant?: 'default' | 'bordered' | 'card' | 'minimal' | 'elevated' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error' | 'info'
  disabled?: boolean
  loading?: boolean
  selectable?: boolean
  multiple?: boolean
  maxSelection?: number
  onItemClick?: (item: ListItem) => void
  onItemSelect?: (item: ListItem) => void
  renderItem?: (item: ListItem, isSelected: boolean) => React.ReactNode
  emptyMessage?: string
  loadingMessage?: string
  
  // Dark mode
  darkMode?: boolean
  darkBackgroundColor?: string
  darkTextColor?: string
  darkBorderColor?: string
  darkHoverBackgroundColor?: string
  darkSelectedBackgroundColor?: string
  darkDisabledBackgroundColor?: string
  darkFocusRingColor?: string
  darkFocusBorderColor?: string
  darkFocusBackgroundColor?: string
  darkBoxShadow?: string
  darkFocusBoxShadow?: string
  darkHoverBoxShadow?: string
  
  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  backgroundColor?: string
  selectedBackgroundColor?: string
  hoverBackgroundColor?: string
  disabledBackgroundColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string
  iconColor?: string
  actionIconColor?: string
  loadingIconColor?: string
  containerBackgroundColor?: string
  containerBorderColor?: string
  containerBorderWidth?: string
  containerBorderRadius?: string
  containerPadding?: string
  containerGap?: string
  itemPadding?: string
  itemBorderWidth?: string
  itemBorderColor?: string
  itemBorderRadius?: string
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemSelectedBackgroundColor?: string
  itemSelectedTextColor?: string
  itemDisabledOpacity?: string
  itemGap?: string
  titleFontSize?: string
  titleFontWeight?: string
  titleColor?: string
  titleLineHeight?: string
  descriptionFontSize?: string
  descriptionColor?: string
  descriptionLineHeight?: string
  descriptionMarginTop?: string
  avatarSize?: string
  avatarBorderRadius?: string
  avatarBorderWidth?: string
  avatarBorderColor?: string
  badgeFontSize?: string
  badgePadding?: string
  badgeBorderRadius?: string
  badgeBackgroundColor?: string
  badgeTextColor?: string
  selectionIndicatorColor?: string
  selectionIndicatorSize?: string
  selectionIndicatorBorderRadius?: string
  selectionIndicatorBorderWidth?: string
  selectionIndicatorBorderColor?: string
  selectionIndicatorBackgroundColor?: string
  selectionIndicatorTextColor?: string
  animationDuration?: string
  animationTimingFunction?: string
  animationDelay?: string
  hoverScale?: string
  hoverRotate?: string
  hoverTranslateX?: string
  hoverTranslateY?: string
  customCSS?: string
  customContainerCSS?: string
  customItemCSS?: string
}

const ListContext = createContext<ListContextValue | undefined>(undefined)

export const useList = () => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useList must be used within a List')
  }
  return context
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({
    className,
    items = [],
    value,
    onChange,
    variant = 'default',
    size = 'md',
    status = 'default',
    disabled = false,
    loading = false,
    selectable = false,
    multiple = false,
    maxSelection,
    label,
    helperText,
    required = false,
    emptyMessage = 'No items found',
    loadingMessage = 'Loading...',
    onItemClick,
    onItemSelect,
    renderItem,
    children: _children,
    // Dark mode
    darkMode = false,
    darkBackgroundColor,
    darkTextColor,
    darkBorderColor,
    darkHoverBackgroundColor,
    darkSelectedBackgroundColor,
    darkDisabledBackgroundColor,
    darkFocusRingColor,
    darkFocusBorderColor,
    darkFocusBackgroundColor,
    darkBoxShadow,
    darkFocusBoxShadow,
    darkHoverBoxShadow,
    // Style props
    borderWidth,
    borderColor,
    borderStyle,
    borderRadius,
    fontSize,
    fontWeight,
    fontFamily,
    textColor,
    backgroundColor,
    selectedBackgroundColor,
    hoverBackgroundColor,
    disabledBackgroundColor,
    focusRingColor,
    focusRingWidth,
    focusRingOffset,
    focusBorderColor,
    focusBackgroundColor,
    boxShadow,
    focusBoxShadow,
    hoverBoxShadow,
    padding,
    paddingX,
    paddingY,
    gap,
    iconColor,
    actionIconColor,
    loadingIconColor,
    labelFontSize,
    labelFontWeight,
    labelColor,
    labelMarginBottom,
    helperTextFontSize,
    helperTextColor,
    helperTextMarginTop,
    requiredColor,
    containerBackgroundColor,
    containerBorderColor,
    containerBorderWidth,
    containerBorderRadius,
    containerPadding,
    containerGap,
    itemPadding,
    itemBorderWidth,
    itemBorderColor,
    itemBorderRadius,
    itemBackgroundColor,
    itemHoverBackgroundColor,
    itemSelectedBackgroundColor,
    itemSelectedTextColor,
    itemDisabledOpacity,
    itemGap,
    titleFontSize,
    titleFontWeight,
    titleColor,
    titleLineHeight,
    descriptionFontSize,
    descriptionColor,
    descriptionLineHeight,
    descriptionMarginTop,
    avatarSize,
    avatarBorderRadius,
    avatarBorderWidth,
    avatarBorderColor,
    badgeFontSize,
    badgePadding,
    badgeBorderRadius,
    badgeBackgroundColor,
    badgeTextColor,
    selectionIndicatorColor,
    selectionIndicatorSize,
    selectionIndicatorBorderRadius,
    selectionIndicatorBorderWidth,
    selectionIndicatorBorderColor,
    selectionIndicatorBackgroundColor,
    selectionIndicatorTextColor,
    animationDuration,
    animationTimingFunction,
    animationDelay,
    hoverScale,
    hoverRotate,
    hoverTranslateX,
    hoverTranslateY,
    customCSS,
    customContainerCSS,
    customItemCSS,
    ...props
  }, ref) => {
    const handleChange = useCallback((newValue: string | string[] | null) => {
      if (onChange) {
        onChange(newValue)
      }
    }, [onChange])

    const handleItemSelect = useCallback((item: ListItem) => {
      if (onItemSelect) {
        onItemSelect(item)
      }
      
      if (selectable) {
        if (multiple && Array.isArray(value)) {
          const isSelected = value.includes(item.id)
          if (isSelected) {
            const newValue = value.filter(v => v !== item.id)
            handleChange(newValue.length > 0 ? newValue : null)
          } else {
            if (maxSelection && value.length >= maxSelection) return
            handleChange([...value, item.id])
          }
        } else {
          handleChange(item.id)
        }
      }
    }, [value, multiple, maxSelection, selectable, onItemSelect, handleChange])

    const baseStyles = 'relative'

    return (
      <ListContext.Provider
        value={{
          items,
          value: value || null,
          onChange: handleChange,
          variant,
          size,
          status,
          disabled,
          loading,
          selectable,
          multiple,
          maxSelection,
          onItemClick,
          onItemSelect: handleItemSelect,
          renderItem,
          emptyMessage,
          loadingMessage,
          // Dark mode
          darkMode,
          darkBackgroundColor,
          darkTextColor,
          darkBorderColor,
          darkHoverBackgroundColor,
          darkSelectedBackgroundColor,
          darkDisabledBackgroundColor,
          darkFocusRingColor,
          darkFocusBorderColor,
          darkFocusBackgroundColor,
          darkBoxShadow,
          darkFocusBoxShadow,
          darkHoverBoxShadow,
          // Style props
          borderWidth,
          borderColor,
          borderStyle,
          borderRadius,
          fontSize,
          fontWeight,
          fontFamily,
          textColor,
          backgroundColor,
          selectedBackgroundColor,
          hoverBackgroundColor,
          disabledBackgroundColor,
          focusRingColor,
          focusRingWidth,
          focusRingOffset,
          focusBorderColor,
          focusBackgroundColor,
          boxShadow,
          focusBoxShadow,
          hoverBoxShadow,
          padding,
          paddingX,
          paddingY,
          gap,
          iconColor,
          actionIconColor,
          loadingIconColor,
          containerBackgroundColor,
          containerBorderColor,
          containerBorderWidth,
          containerBorderRadius,
          containerPadding,
          containerGap,
          itemPadding,
          itemBorderWidth,
          itemBorderColor,
          itemBorderRadius,
          itemBackgroundColor,
          itemHoverBackgroundColor,
          itemSelectedBackgroundColor,
          itemSelectedTextColor,
          itemDisabledOpacity,
          itemGap,
          titleFontSize,
          titleFontWeight,
          titleColor,
          titleLineHeight,
          descriptionFontSize,
          descriptionColor,
          descriptionLineHeight,
          descriptionMarginTop,
          avatarSize,
          avatarBorderRadius,
          avatarBorderWidth,
          avatarBorderColor,
          badgeFontSize,
          badgePadding,
          badgeBorderRadius,
          badgeBackgroundColor,
          badgeTextColor,
          selectionIndicatorColor,
          selectionIndicatorSize,
          selectionIndicatorBorderRadius,
          selectionIndicatorBorderWidth,
          selectionIndicatorBorderColor,
          selectionIndicatorBackgroundColor,
          selectionIndicatorTextColor,
          animationDuration,
          animationTimingFunction,
          animationDelay,
          hoverScale,
          hoverRotate,
          hoverTranslateX,
          hoverTranslateY,
          customCSS,
          customContainerCSS,
          customItemCSS,
        }}
      >
        <div
          ref={ref}
          className={cn(baseStyles, className)}
          style={{
            ...(customCSS && { '--custom-css': customCSS } as any),
          }}
          {...props}
        >
          {label && (
            <label 
              className={cn(
                'block mb-2 font-medium',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                status === 'error' && 'text-red-600',
                disabled && 'opacity-50',
                darkMode && 'text-gray-200'
              )}
              style={{
                fontSize: labelFontSize,
                fontWeight: labelFontWeight,
                color: darkMode ? darkTextColor || '#e5e7eb' : labelColor,
                marginBottom: labelMarginBottom,
              }}
            >
              {label}
              {required && (
                <span 
                  className="text-red-500 ml-1"
                  style={{ color: requiredColor }}
                >
                  *
                </span>
              )}
            </label>
          )}
          {_children || <ListContainer />}
          {helperText && (
            <p 
              className={cn(
                'mt-2',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base',
                status === 'success' && 'text-green-600',
                status === 'warning' && 'text-yellow-600',
                status === 'error' && 'text-red-600',
                status === 'default' && 'text-gray-500',
                darkMode && 'text-gray-400'
              )}
              style={{
                fontSize: helperTextFontSize,
                color: darkMode ? darkTextColor || '#9ca3af' : helperTextColor,
                marginTop: helperTextMarginTop,
              }}
            >
              {helperText}
            </p>
          )}
        </div>
      </ListContext.Provider>
    )
  }
)

List.displayName = 'List'

export interface ListContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ListContainer = React.forwardRef<HTMLDivElement, ListContainerProps>(
  ({ className, children: _children, ...props }, ref) => {
    const {
      items,
      loading,
      loadingMessage,
      emptyMessage,
      darkMode,
      // Container style props
      containerBackgroundColor,
      containerBorderColor,
      containerBorderWidth,
      containerBorderRadius,
      containerPadding,
      containerGap,
      customContainerCSS,
    } = useList()

    const baseStyles = cn(
      'flex flex-col',
      'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
      darkMode && 'focus-within:ring-blue-400'
    )

    // Build custom container styles
    const customContainerStyles: React.CSSProperties = {}
    
    if (darkMode) {
      customContainerStyles.backgroundColor = darkMode ? '#1f2937' : containerBackgroundColor
      customContainerStyles.borderColor = darkMode ? '#374151' : containerBorderColor
    } else {
      if (containerBackgroundColor) customContainerStyles.backgroundColor = containerBackgroundColor
      if (containerBorderColor) customContainerStyles.borderColor = containerBorderColor
    }
    
    if (containerBorderWidth) customContainerStyles.borderWidth = containerBorderWidth
    if (containerBorderRadius) customContainerStyles.borderRadius = containerBorderRadius
    if (containerPadding) customContainerStyles.padding = containerPadding
    if (containerGap) customContainerStyles.gap = containerGap

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-center items-center py-8', className)}
          style={{
            ...customContainerStyles,
            ...(customContainerCSS && { '--custom-container-css': customContainerCSS } as any),
          }}
          {...props}
        >
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{loadingMessage}</span>
        </div>
      )
    }

    if (!items || items.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-center items-center py-8', className)}
          style={{
            ...customContainerStyles,
            ...(customContainerCSS && { '--custom-container-css': customContainerCSS } as any),
          }}
          {...props}
        >
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{emptyMessage}</span>
        </div>
      )
    }

    return (
              <div
          ref={ref}
          className={cn(baseStyles, className)}
          style={{
            ...customContainerStyles,
            ...(customContainerCSS && { '--custom-container-css': customContainerCSS } as any),
          }}
          {...props}
        >
          {_children || (
            <>
              {items.map((item) => (
                <ListItem key={item.id} item={item} />
              ))}
            </>
          )}
        </div>
    )
  }
)

ListContainer.displayName = 'ListContainer'

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: ListItem
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ className, item, children: _children, ...props }, ref) => {
    const {
      value,
      variant,
      size,
      status: _status,
      disabled,
      selectable,
      multiple,
      onItemClick,
      onItemSelect,
      renderItem,
      darkMode,
      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      selectedBackgroundColor,
      hoverBackgroundColor: _hoverBackgroundColor,
      disabledBackgroundColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      hoverBoxShadow,
      padding,
      paddingX,
      paddingY,
      gap,
      iconColor,
      actionIconColor,
      itemPadding,
      itemBorderWidth,
      itemBorderColor,
      itemBorderRadius,
      itemBackgroundColor,
      itemHoverBackgroundColor: _itemHoverBackgroundColor,
      itemSelectedBackgroundColor: _itemSelectedBackgroundColor,
      itemSelectedTextColor: _itemSelectedTextColor,
      itemDisabledOpacity: _itemDisabledOpacity,
      itemGap,
      titleFontSize,
      titleFontWeight,
      titleColor,
      titleLineHeight,
      descriptionFontSize,
      descriptionColor,
      descriptionLineHeight,
      descriptionMarginTop,
      avatarSize,
      avatarBorderRadius,
      avatarBorderWidth,
      avatarBorderColor,
      badgeFontSize,
      badgePadding,
      badgeBorderRadius,
      badgeBackgroundColor,
      badgeTextColor,
      selectionIndicatorColor: _selectionIndicatorColor,
      selectionIndicatorSize,
      selectionIndicatorBorderRadius,
      selectionIndicatorBorderWidth,
      selectionIndicatorBorderColor,
      selectionIndicatorBackgroundColor,
      selectionIndicatorTextColor,
      animationDuration,
      animationTimingFunction,
      animationDelay,
      hoverScale,
      hoverRotate,
      hoverTranslateX,
      hoverTranslateY,
      customItemCSS,
    } = useList()

    const isSelected = useMemo(() => {
      if (Array.isArray(value)) {
        return value.includes(item.id)
      }
      return value === item.id
    }, [value, item.id])

    const handleClick = () => {
      if (disabled || item.disabled) return
      if (onItemClick) {
        onItemClick(item)
      }
      if (selectable) {
        onItemSelect?.(item)
      }
    }

    const baseStyles = cn(
      'flex items-center gap-3 p-4 transition-all cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled && 'cursor-not-allowed opacity-50',
      item.disabled && 'cursor-not-allowed opacity-50',
      selectable && !disabled && !item.disabled && 'cursor-pointer',
      darkMode && 'focus:ring-blue-400'
    )

    const variants = {
      default: cn(
        'border-b border-gray-200 last:border-b-0',
        'hover:bg-gray-50 focus:ring-gray-400',
        darkMode && 'border-gray-700 hover:bg-gray-800 focus:ring-blue-400'
      ),
      bordered: cn(
        'border border-gray-200 rounded-md',
        'hover:bg-gray-50 focus:ring-gray-400',
        darkMode && 'border-gray-700 hover:bg-gray-800 focus:ring-blue-400'
      ),
      card: cn(
        'border border-gray-200 rounded-lg shadow-sm',
        'hover:shadow-md focus:ring-gray-400',
        darkMode && 'border-gray-700 bg-gray-800 hover:bg-gray-700 focus:ring-blue-400'
      ),
      minimal: cn(
        'border-0',
        'hover:bg-gray-50 focus:ring-gray-400',
        darkMode && 'hover:bg-gray-800 focus:ring-blue-400'
      ),
      elevated: cn(
        'border border-gray-200 rounded-lg shadow-md',
        'hover:shadow-lg focus:ring-gray-400',
        darkMode && 'border-gray-700 bg-gray-800 hover:bg-gray-700 focus:ring-blue-400'
      ),
      glass: cn(
        'border border-white/20 rounded-lg backdrop-blur-sm',
        'hover:bg-white/10 focus:ring-blue-400',
        darkMode && 'border-gray-600 hover:bg-gray-700/50'
      ),
      gradient: cn(
        'border-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600',
        'hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400',
        darkMode && 'from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800'
      ),
    }

    const sizes = {
      sm: 'p-3 gap-2',
      md: 'p-4 gap-3',
      lg: 'p-6 gap-4',
    }

    // Build custom styles
    const customStyles: React.CSSProperties = {}
    
    // Dark mode overrides
    if (darkMode) {
      customStyles.backgroundColor = darkMode ? '#1f2937' : backgroundColor
      customStyles.color = darkMode ? '#f9fafb' : textColor
      customStyles.borderColor = darkMode ? '#374151' : borderColor
    } else {
      // Border styles
      if (borderWidth) customStyles.borderWidth = borderWidth
      if (borderColor) customStyles.borderColor = borderColor
      if (borderStyle) customStyles.borderStyle = borderStyle
      if (borderRadius) customStyles.borderRadius = borderRadius
      
      // Text styles
      if (fontSize) customStyles.fontSize = fontSize
      if (fontWeight) customStyles.fontWeight = fontWeight
      if (fontFamily) customStyles.fontFamily = fontFamily
      if (textColor) customStyles.color = textColor
      
      // Background
      if (backgroundColor) customStyles.backgroundColor = backgroundColor
    }
    
    if (isSelected && selectedBackgroundColor) {
      customStyles.backgroundColor = darkMode ? darkMode ? '#1e40af' : selectedBackgroundColor : selectedBackgroundColor
    }
    if (disabled && disabledBackgroundColor) {
      customStyles.backgroundColor = darkMode ? '#374151' : disabledBackgroundColor
    }
    
    // Shadow
    if (boxShadow) customStyles.boxShadow = boxShadow
    if (isSelected && focusBoxShadow) customStyles.boxShadow = focusBoxShadow
    
    // Padding
    if (padding) customStyles.padding = padding
    if (paddingX) {
      customStyles.paddingLeft = paddingX
      customStyles.paddingRight = paddingX
    }
    if (paddingY) {
      customStyles.paddingTop = paddingY
      customStyles.paddingBottom = paddingY
    }
    
    // Gap
    if (gap) customStyles.gap = gap

    // Item-specific styles
    if (itemPadding) customStyles.padding = itemPadding
    if (itemBorderWidth) customStyles.borderWidth = itemBorderWidth
    if (itemBorderColor) customStyles.borderColor = itemBorderColor
    if (itemBorderRadius) customStyles.borderRadius = itemBorderRadius
    if (itemBackgroundColor) customStyles.backgroundColor = itemBackgroundColor
    if (itemGap) customStyles.gap = itemGap

    // Animation
    if (animationDuration) customStyles.transitionDuration = animationDuration
    if (animationTimingFunction) customStyles.transitionTimingFunction = animationTimingFunction
    if (animationDelay) customStyles.transitionDelay = animationDelay

    // Focus styles
    const focusStyles = {
      ...(focusBorderColor && { borderColor: focusBorderColor }),
      ...(focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
      ...(focusBoxShadow && { boxShadow: focusBoxShadow }),
      ...(focusRingColor && focusRingWidth && {
        boxShadow: `0 0 0 ${focusRingWidth} ${focusRingColor}${focusRingOffset ? `, 0 0 0 calc(${focusRingWidth} + ${focusRingOffset}) transparent` : ''}`,
      }),
    }

    // Hover transform styles
    const hoverStyles = {
      ...(hoverScale && { transform: `scale(${hoverScale})` }),
      ...(hoverRotate && { transform: `rotate(${hoverRotate})` }),
      ...(hoverTranslateX && hoverTranslateY && { transform: `translate(${hoverTranslateX}, ${hoverTranslateY})` }),
    }

    if (renderItem) {
      return (
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant || 'default'],
            sizes[size || 'md'],
            className
          )}
          style={{
            ...customStyles,
            ...(hoverBoxShadow && {
              ':hover': { boxShadow: hoverBoxShadow },
            } as any),
            ...(customItemCSS && { css: customItemCSS }),
          }}
          onClick={handleClick}
          {...props}
        >
          {renderItem(item, isSelected)}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant || 'default'],
          sizes[size || 'md'],
          className
        )}
        style={{
          ...customStyles,
          ...(hoverBoxShadow && {
            ':hover': { boxShadow: hoverBoxShadow },
          } as any),
          ...(customItemCSS && { css: customItemCSS }),
        }}
        onClick={handleClick}
        {...props}
      >
        {selectable && (
          <div 
            className="flex-shrink-0"
            style={{
              width: selectionIndicatorSize || '20px',
              height: selectionIndicatorSize || '20px',
              borderRadius: selectionIndicatorBorderRadius || '4px',
              borderWidth: selectionIndicatorBorderWidth || '2px',
              borderColor: selectionIndicatorBorderColor || (darkMode ? '#6b7280' : '#d1d5db'),
              backgroundColor: isSelected 
                ? (selectionIndicatorBackgroundColor || (darkMode ? '#3b82f6' : '#3b82f6'))
                : 'transparent',
              color: selectionIndicatorTextColor || '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isSelected && (
              multiple ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              ) : (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="6"/>
                </svg>
              )
            )}
          </div>
        )}
        
        {item.avatar && (
          <div 
            className="flex-shrink-0"
            style={{
              width: avatarSize || '40px',
              height: avatarSize || '40px',
              borderRadius: avatarBorderRadius || '50%',
              borderWidth: avatarBorderWidth || '0',
              borderColor: avatarBorderColor || 'transparent',
            }}
          >
            {item.avatar}
          </div>
        )}
        
        {item.icon && (
          <span 
            className="flex-shrink-0"
            style={{ color: iconColor || (darkMode ? '#9ca3af' : '#6b7280') }}
          >
            {item.icon}
          </span>
        )}
        
        <div className="flex-1 min-w-0">
          <div 
            className="font-medium"
            style={{
              fontSize: titleFontSize,
              fontWeight: titleFontWeight,
              color: darkMode ? '#f9fafb' : (titleColor || '#111827'),
              lineHeight: titleLineHeight,
            }}
          >
            {item.title}
          </div>
          {item.description && (
            <div 
              className="text-gray-500 mt-1"
              style={{
                fontSize: descriptionFontSize,
                color: darkMode ? '#9ca3af' : (descriptionColor || '#6b7280'),
                lineHeight: descriptionLineHeight,
                marginTop: descriptionMarginTop,
              }}
            >
              {item.description}
            </div>
          )}
        </div>
        
        {item.badge && (
          <div 
            className="flex-shrink-0"
            style={{
              fontSize: badgeFontSize,
              padding: badgePadding,
              borderRadius: badgeBorderRadius,
              backgroundColor: badgeBackgroundColor || (darkMode ? '#374151' : '#f3f4f6'),
              color: badgeTextColor || (darkMode ? '#d1d5db' : '#374151'),
            }}
          >
            {item.badge}
          </div>
        )}
        
        {item.action && (
          <div 
            className="flex-shrink-0"
            style={{ color: actionIconColor || (darkMode ? '#9ca3af' : '#6b7280') }}
          >
            {item.action}
          </div>
        )}
      </div>
    )
  }
)

ListItem.displayName = 'ListItem'

export interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { size, darkMode } = useList()

    const baseStyles = cn(
      'px-4 py-2 font-medium text-gray-700 bg-gray-50 border-b border-gray-200',
      darkMode && 'text-gray-200 bg-gray-800 border-gray-700'
    )

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size || 'md'], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ListHeader.displayName = 'ListHeader'

export interface ListFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ListFooter = React.forwardRef<HTMLDivElement, ListFooterProps>(
  ({ className, children, ...props }, ref) => {
    const { size, darkMode } = useList()

    const baseStyles = cn(
      'px-4 py-2 text-gray-500 bg-gray-50 border-t border-gray-200',
      darkMode && 'text-gray-400 bg-gray-800 border-gray-700'
    )

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size || 'md'], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ListFooter.displayName = 'ListFooter'

export { List, ListContainer, ListItem, ListHeader, ListFooter } 