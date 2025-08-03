import React, { createContext, useContext, useState, useCallback, forwardRef } from 'react'
import { cn } from '@/utils'

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Core props
  currentPage?: number
  defaultCurrentPage?: number
  totalPages?: number
  totalItems?: number
  itemsPerPage?: number
  onChange?: (page: number) => void
  disabled?: boolean
  _required?: boolean
  type?: 'pagination' | 'table'

  // Visual props
  variant?: 'default' | 'filled' | 'outlined' | 'flat' | 'elevated' | 'circular' | 'square'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  shape?: 'rounded' | 'circular' | 'square'

  // Display props
  showFirstLast?: boolean
  showPrevNext?: boolean
  showPageNumbers?: boolean
  showPageInfo?: boolean
  showItemsPerPage?: boolean
  showTotalItems?: boolean
  maxPageNumbers?: number

  // Table pagination props
  isTablePagination?: boolean
  labelDisplayedRows?: (from: number, to: number, count: number) => string
  labelRowsPerPage?: string
  rowsPerPageOptions?: number[]

  // Label props
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorMessage?: string

  // Animation props
  _transition?: 'none' | 'slide' | 'fade' | 'bounce' | 'smooth'
  transitionDuration?: number

  // Loading state
  loading?: boolean
  _loadingIcon?: React.ReactNode

  // Container styles
  containerClassName?: string
  containerStyle?: React.CSSProperties
  backgroundColor?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  boxShadow?: string

  // Button styles
  buttonBackgroundColor?: string
  _buttonBackgroundColorHover?: string
  _buttonBackgroundColorActive?: string
  buttonBackgroundColorDisabled?: string
  buttonBackgroundColorCurrent?: string
  _buttonBackgroundColorCurrentHover?: string
  buttonBorderWidth?: string
  buttonBorderColor?: string
  _buttonBorderColorHover?: string
  _buttonBorderColorActive?: string
  buttonBorderColorDisabled?: string
  buttonBorderColorCurrent?: string
  buttonBorderStyle?: string
  buttonBorderRadius?: string
  buttonPadding?: string
  buttonPaddingX?: string
  buttonPaddingY?: string
  buttonBoxShadow?: string
  _buttonBoxShadowHover?: string
  _buttonBoxShadowActive?: string
  buttonBoxShadowDisabled?: string
  buttonBoxShadowCurrent?: string

  // Text styles
  textColor?: string
  _textColorHover?: string
  _textColorActive?: string
  textColorDisabled?: string
  textColorCurrent?: string
  _textColorCurrentHover?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string

  // Icon styles
  iconColor?: string
  _iconColorHover?: string
  _iconColorActive?: string
  iconColorDisabled?: string
  _iconColorCurrent?: string
  _iconColorCurrentHover?: string
  iconSize?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  _focusRingOffset?: string
  _focusRingOffsetColor?: string
  _focusBorderColor?: string
  _focusBackgroundColor?: string
  focusBoxShadow?: string

  // Spacing
  gap?: string
  buttonGap?: string

  // Custom render props
  renderButton?: (page: number, isCurrent: boolean, disabled: boolean) => React.ReactNode
  renderFirstButton?: (disabled: boolean) => React.ReactNode
  renderLastButton?: (disabled: boolean) => React.ReactNode
  renderPrevButton?: (disabled: boolean) => React.ReactNode
  renderNextButton?: (disabled: boolean) => React.ReactNode
  renderPageInfo?: (currentPage: number, totalPages: number, totalItems?: number) => React.ReactNode
  renderItemsPerPage?: (
    itemsPerPage: number,
    onItemsPerPageChange: (value: number) => void
  ) => React.ReactNode

  // Custom icons
  firstIcon?: React.ReactNode
  lastIcon?: React.ReactNode
  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode

  // Status colors
  successColor?: string
  warningColor?: string
  errorColor?: string

  children?: React.ReactNode
}

interface PaginationContextValue {
  currentPage: number
  totalPages: number
  totalItems?: number
  itemsPerPage: number
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined' | 'flat' | 'elevated' | 'circular' | 'square'
  status?: 'default' | 'success' | 'warning' | 'error'
  onChange?: (page: number) => void
}

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined)

export const usePagination = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePagination must be used within a Pagination')
  }
  return context
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage: controlledCurrentPage,
      defaultCurrentPage = 1,
      totalPages = 1,
      totalItems,
      itemsPerPage = 10,
      onChange,
      disabled = false,
      _required = false,
      variant = 'default',
      size = 'md',
      status = 'default',
      shape,
      type = 'pagination',
      showFirstLast = true,
      showPrevNext = true,
      showPageNumbers = true,
      showPageInfo = false,
      showItemsPerPage = false,
      showTotalItems = false,
      maxPageNumbers = 5,
      labelDisplayedRows,
      labelRowsPerPage = 'Rows per page:',
      rowsPerPageOptions = [5, 10, 25, 50],
      label,
      helperText,
      errorMessage,
      _transition = 'smooth',
      transitionDuration = 200,
      loading = false,
      _loadingIcon,
      // Container styles
      containerClassName,
      containerStyle,
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding,
      paddingX,
      paddingY,
      boxShadow,
      // Button styles
      buttonBackgroundColor,
      _buttonBackgroundColorHover,
      _buttonBackgroundColorActive,
      buttonBackgroundColorDisabled,
      buttonBackgroundColorCurrent,
      _buttonBackgroundColorCurrentHover,
      buttonBorderWidth,
      buttonBorderColor,
      _buttonBorderColorHover,
      _buttonBorderColorActive,
      buttonBorderColorDisabled,
      buttonBorderColorCurrent,
      buttonBorderStyle,
      buttonBorderRadius,
      buttonPadding,
      buttonPaddingX,
      buttonPaddingY,
      buttonBoxShadow,
      _buttonBoxShadowHover,
      _buttonBoxShadowActive,
      buttonBoxShadowDisabled,
      buttonBoxShadowCurrent,
      // Text styles
      textColor,
      _textColorHover,
      _textColorActive,
      textColorDisabled,
      textColorCurrent,
      _textColorCurrentHover,
      fontSize,
      fontWeight,
      fontFamily,
      // Icon styles
      iconColor,
      _iconColorHover,
      _iconColorActive,
      iconColorDisabled,
      _iconColorCurrent,
      _iconColorCurrentHover,
      iconSize,
      // Focus styles
      focusRingColor,
      focusRingWidth,
      _focusRingOffset,
      _focusRingOffsetColor,
      _focusBorderColor,
      _focusBackgroundColor,
      focusBoxShadow,
      // Spacing
      gap,
      buttonGap,
      // Custom render
      renderButton,
      renderFirstButton,
      renderLastButton,
      renderPrevButton,
      renderNextButton,
      renderPageInfo: customRenderPageInfo,
      renderItemsPerPage,
      // Custom icons
      firstIcon,
      lastIcon,
      prevIcon,
      nextIcon,
      // Status colors
      successColor,
      warningColor,
      errorColor,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCurrentPage, setUncontrolledCurrentPage] = useState(defaultCurrentPage)
    const [isFocused, setIsFocused] = useState(false)

    const isControlled = controlledCurrentPage !== undefined
    const currentPage = isControlled ? controlledCurrentPage : uncontrolledCurrentPage

    const handlePageChange = useCallback(
      (page: number) => {
        if (disabled || loading || page < 1 || page > totalPages) return

        if (!isControlled) {
          setUncontrolledCurrentPage(page)
        }

        onChange?.(page)
      },
      [disabled, loading, isControlled, onChange, totalPages]
    )

    // Get status colors
    const getStatusColors = () => {
      const statusColors = {
        default: { primary: '#3b82f6', hover: '#2563eb', active: '#1d4ed8' },
        success: { primary: successColor || '#10b981', hover: '#059669', active: '#047857' },
        warning: { primary: warningColor || '#f59e0b', hover: '#d97706', active: '#b45309' },
        error: { primary: errorColor || '#ef4444', hover: '#dc2626', active: '#b91c1c' },
      }

      return statusColors[status]
    }

    const statusColors = getStatusColors()

    // Get size dimensions
    const getSizeDimensions = () => {
      const dimensions = {
        sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', iconSize: '1rem' },
        md: { padding: '0.5rem 1rem', fontSize: '1rem', iconSize: '1.25rem' },
        lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', iconSize: '1.5rem' },
      }

      return dimensions[size]
    }

    const dimensions = getSizeDimensions()

    // Default styles based on variant
    const getDefaultStyles = () => {
      const variantStyles = {
        default: {
          button: {
            backgroundColor: buttonBackgroundColor || '#ffffff',
            borderColor: buttonBorderColor || '#d1d5db',
            borderWidth: buttonBorderWidth || '1px',
            boxShadow: buttonBoxShadow || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || statusColors.primary,
            borderColor: buttonBorderColorCurrent || statusColors.primary,
            color: textColorCurrent || '#ffffff',
            boxShadow: buttonBoxShadowCurrent || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
        filled: {
          button: {
            backgroundColor: buttonBackgroundColor || '#f3f4f6',
            borderColor: buttonBorderColor || 'transparent',
            borderWidth: buttonBorderWidth || '0',
            boxShadow: buttonBoxShadow || 'none',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || statusColors.primary,
            borderColor: buttonBorderColorCurrent || statusColors.primary,
            color: textColorCurrent || '#ffffff',
            boxShadow: buttonBoxShadowCurrent || 'none',
          },
        },
        outlined: {
          button: {
            backgroundColor: buttonBackgroundColor || 'transparent',
            borderColor: buttonBorderColor || '#d1d5db',
            borderWidth: buttonBorderWidth || '1px',
            boxShadow: buttonBoxShadow || 'none',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || 'transparent',
            borderColor: buttonBorderColorCurrent || statusColors.primary,
            color: textColorCurrent || statusColors.primary,
            boxShadow: buttonBoxShadowCurrent || 'none',
          },
        },
        flat: {
          button: {
            backgroundColor: buttonBackgroundColor || 'transparent',
            borderColor: buttonBorderColor || 'transparent',
            borderWidth: buttonBorderWidth || '0',
            boxShadow: buttonBoxShadow || 'none',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || statusColors.primary,
            borderColor: buttonBorderColorCurrent || 'transparent',
            color: textColorCurrent || '#ffffff',
            boxShadow: buttonBoxShadowCurrent || 'none',
          },
        },
        elevated: {
          button: {
            backgroundColor: buttonBackgroundColor || '#ffffff',
            borderColor: buttonBorderColor || 'transparent',
            borderWidth: buttonBorderWidth || '0',
            boxShadow:
              buttonBoxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || statusColors.primary,
            borderColor: buttonBorderColorCurrent || statusColors.primary,
            color: textColorCurrent || '#ffffff',
            boxShadow:
              buttonBoxShadowCurrent ||
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        circular: {
          button: {
            backgroundColor: buttonBackgroundColor || '#ffffff',
            borderColor: buttonBorderColor || '#d1d5db',
            borderWidth: buttonBorderWidth || '1px',
            boxShadow: buttonBoxShadow || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || statusColors.primary,
            borderColor: buttonBorderColorCurrent || statusColors.primary,
            color: textColorCurrent || '#ffffff',
            boxShadow: buttonBoxShadowCurrent || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
        square: {
          button: {
            backgroundColor: buttonBackgroundColor || '#ffffff',
            borderColor: buttonBorderColor || '#d1d5db',
            borderWidth: buttonBorderWidth || '1px',
            boxShadow: buttonBoxShadow || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
          current: {
            backgroundColor: buttonBackgroundColorCurrent || statusColors.primary,
            borderColor: buttonBorderColorCurrent || statusColors.primary,
            color: textColorCurrent || '#ffffff',
            boxShadow: buttonBoxShadowCurrent || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
      }

      return variantStyles[variant]
    }

    const defaultStyles = getDefaultStyles()

    // Generate page numbers to display
    const getPageNumbers = () => {
      if (!showPageNumbers) return []

      const pages: (number | string)[] = []
      const halfMax = Math.floor(maxPageNumbers / 2)

      if (totalPages <= maxPageNumbers) {
        // Show all pages if total is less than max
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show pages around current page
        let start = Math.max(1, currentPage - halfMax)
        const end = Math.min(totalPages, start + maxPageNumbers - 1)

        // Adjust start if we're near the end
        if (end === totalPages) {
          start = Math.max(1, end - maxPageNumbers + 1)
        }

        // Add first page and ellipsis if needed
        if (start > 1) {
          pages.push(1)
          if (start > 2) {
            pages.push('...')
          }
        }

        // Add pages in range
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        // Add last page and ellipsis if needed
        if (end < totalPages) {
          if (end < totalPages - 1) {
            pages.push('...')
          }
          pages.push(totalPages)
        }
      }

      return pages
    }

    const pageNumbers = getPageNumbers()

    // Button styles
    const getButtonStyles = (isCurrent: boolean = false, isDisabled: boolean = false) => {
      // Determine border radius based on shape and variant
      let borderRadius = buttonBorderRadius
      if (!borderRadius) {
        if (shape === 'circular' || variant === 'circular') {
          borderRadius = '50%'
        } else if (shape === 'square' || variant === 'square') {
          borderRadius = '0'
        } else {
          borderRadius = '0.375rem'
        }
      }

      const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: buttonPadding || dimensions.padding,
        paddingLeft: buttonPaddingX,
        paddingRight: buttonPaddingX,
        paddingTop: buttonPaddingY,
        paddingBottom: buttonPaddingY,
        fontSize: fontSize || dimensions.fontSize,
        fontWeight: fontWeight || '500',
        fontFamily,
        borderWidth: defaultStyles.button.borderWidth,
        borderColor: isCurrent
          ? defaultStyles.current.borderColor
          : isDisabled
            ? buttonBorderColorDisabled || '#e5e7eb'
            : defaultStyles.button.borderColor,
        borderStyle: buttonBorderStyle || 'solid',
        borderRadius,
        backgroundColor: isCurrent
          ? defaultStyles.current.backgroundColor
          : isDisabled
            ? buttonBackgroundColorDisabled || '#f9fafb'
            : defaultStyles.button.backgroundColor,
        color: isCurrent
          ? defaultStyles.current.color
          : isDisabled
            ? textColorDisabled || '#9ca3af'
            : textColor || '#374151',
        boxShadow: isCurrent
          ? defaultStyles.current.boxShadow
          : isDisabled
            ? buttonBoxShadowDisabled || 'none'
            : defaultStyles.button.boxShadow,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transition: `all ${transitionDuration}ms ease-in-out`,
        minWidth: '2.5rem',
        height: '2.5rem',
      }

      return baseStyles
    }

    // Container styles
    const containerStyles: React.CSSProperties = {
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding: padding || (paddingX || paddingY ? undefined : '0'),
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      boxShadow,
      ...containerStyle,
    }

    // Focus styles
    const focusStyles: React.CSSProperties = isFocused
      ? {
          outline: 'none',
          boxShadow:
            focusBoxShadow ||
            `0 0 0 ${focusRingWidth || '2px'} ${focusRingColor || statusColors.primary}`,
        }
      : {}

    const renderPageButton = (page: number | string, isCurrent: boolean = false) => {
      if (typeof page === 'string') {
        return (
          <span
            key={`ellipsis-${page}`}
            className="px-3 py-2 text-gray-500"
            style={{
              fontSize: fontSize || dimensions.fontSize,
              fontWeight: fontWeight || '500',
            }}
          >
            {page}
          </span>
        )
      }

      const isDisabled = disabled || loading || page === currentPage

      if (renderButton) {
        return renderButton(page, isCurrent, isDisabled)
      }

      return (
        <button
          key={page}
          type="button"
          disabled={isDisabled}
          onClick={() => handlePageChange(page)}
          style={{
            ...getButtonStyles(isCurrent, isDisabled),
            ...focusStyles,
          }}
          className={cn(
            'inline-flex items-center justify-center',
            isDisabled && 'cursor-not-allowed opacity-50',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={`Go to page ${page}`}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {loading && isCurrent
            ? _loadingIcon || (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                </svg>
              )
            : page}
        </button>
      )
    }

    const renderNavigationButton = (
      type: 'first' | 'last' | 'prev' | 'next',
      disabled: boolean
    ) => {
      const isDisabled = disabled || loading

      const getIcon = () => {
        // Check for custom icons first
        const customIcons = {
          first: firstIcon,
          last: lastIcon,
          prev: prevIcon,
          next: nextIcon,
        }

        const customIcon = customIcons[type]
        if (customIcon) {
          return customIcon
        }

        // Default icons
        switch (type) {
          case 'first':
            return (
              <svg
                width={iconSize || dimensions.iconSize}
                height={iconSize || dimensions.iconSize}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            )
          case 'last':
            return (
              <svg
                width={iconSize || dimensions.iconSize}
                height={iconSize || dimensions.iconSize}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            )
          case 'prev':
            return (
              <svg
                width={iconSize || dimensions.iconSize}
                height={iconSize || dimensions.iconSize}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )
          case 'next':
            return (
              <svg
                width={iconSize || dimensions.iconSize}
                height={iconSize || dimensions.iconSize}
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
            )
        }
      }

      const getLabel = () => {
        switch (type) {
          case 'first':
            return 'Go to first page'
          case 'last':
            return 'Go to last page'
          case 'prev':
            return 'Go to previous page'
          case 'next':
            return 'Go to next page'
        }
      }

      const getTargetPage = () => {
        switch (type) {
          case 'first':
            return 1
          case 'last':
            return totalPages
          case 'prev':
            return Math.max(1, currentPage - 1)
          case 'next':
            return Math.min(totalPages, currentPage + 1)
        }
      }

      const renderFunction = {
        first: renderFirstButton,
        last: renderLastButton,
        prev: renderPrevButton,
        next: renderNextButton,
      }[type]

      if (renderFunction) {
        return renderFunction(isDisabled)
      }

      return (
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => handlePageChange(getTargetPage())}
          style={{
            ...getButtonStyles(false, isDisabled),
            color: isDisabled ? iconColorDisabled || '#9ca3af' : iconColor || '#6b7280',
          }}
          className={cn(
            'inline-flex items-center justify-center',
            isDisabled && 'cursor-not-allowed opacity-50',
            className
          )}
          aria-label={getLabel()}
        >
          {getIcon()}
        </button>
      )
    }

    const renderPageInfoContent = () => {
      if (!showPageInfo) return null

      if (customRenderPageInfo) {
        return customRenderPageInfo(currentPage, totalPages, totalItems)
      }

      return (
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
          {totalItems && ` (${totalItems} total items)`}
        </div>
      )
    }

    const renderItemsPerPageSelector = () => {
      if (!showItemsPerPage) return null

      const handleItemsPerPageChange = (value: number) => {
        // This would typically trigger a parent callback to update items per page
        console.log('Items per page changed to:', value)
      }

      if (renderItemsPerPage) {
        return renderItemsPerPage(itemsPerPage, handleItemsPerPageChange)
      }

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{labelRowsPerPage}</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }

    // Handle table pagination mode
    if (type === 'table') {
      const from = (currentPage - 1) * itemsPerPage + 1
      const to = Math.min(currentPage * itemsPerPage, totalItems || 0)

      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-between', containerClassName)}
          style={containerStyles}
          role="navigation"
          aria-label="table pagination navigation"
          {...props}
        >
          <div className="flex items-center gap-4">
            {renderItemsPerPageSelector()}
            <div className="text-sm text-gray-600">
              {labelDisplayedRows
                ? labelDisplayedRows(from, to, totalItems || 0)
                : `${from}-${to} of ${totalItems || 0}`}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {showFirstLast && renderNavigationButton('first', currentPage === 1)}
            {showPrevNext && renderNavigationButton('prev', currentPage === 1)}
            {showPrevNext && renderNavigationButton('next', currentPage === totalPages)}
            {showFirstLast && renderNavigationButton('last', currentPage === totalPages)}
          </div>
        </div>
      )
    }

    // Regular pagination mode
    return (
      <PaginationContext.Provider
        value={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          disabled,
          loading,
          size,
          variant,
          status,
          onChange,
        }}
      >
        <div
          ref={ref}
          className={cn('flex flex-col items-center justify-center', containerClassName)}
          style={containerStyles}
          role="navigation"
          aria-label="pagination navigation"
          {...props}
        >
          {label && <div className="mb-2 text-sm font-medium text-gray-700">{label}</div>}

          <div
            className="inline-flex items-center justify-center"
            style={{ gap: gap || buttonGap || '0.25rem' }}
          >
            {showFirstLast && renderNavigationButton('first', currentPage === 1)}
            {showPrevNext && renderNavigationButton('prev', currentPage === 1)}

            {pageNumbers.map((page) => renderPageButton(page, page === currentPage))}

            {showPrevNext && renderNavigationButton('next', currentPage === totalPages)}
            {showFirstLast && renderNavigationButton('last', currentPage === totalPages)}
          </div>

          {(showPageInfo || showItemsPerPage || showTotalItems) && (
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
              {renderPageInfoContent()}
              {renderItemsPerPageSelector()}
              {showTotalItems && totalItems && <span>Total: {totalItems} items</span>}
            </div>
          )}

          {helperText && !errorMessage && (
            <div className="mt-2 text-sm text-gray-500">{helperText}</div>
          )}

          {errorMessage && <div className="mt-2 text-sm text-red-500">{errorMessage}</div>}

          {children}
        </div>
      </PaginationContext.Provider>
    )
  }
)

Pagination.displayName = 'Pagination'

// Export sub-components for compound pattern
export interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: number
  isCurrent?: boolean
  disabled?: boolean
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, page, isCurrent = false, disabled = false, children, ...props }, ref) => {
    const { onChange } = usePagination()

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={() => onChange?.(page)}
        className={cn(
          'inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isCurrent && 'bg-blue-600 text-white border-blue-600',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        aria-current={isCurrent ? 'page' : undefined}
        {...props}
      >
        {children || page}
      </button>
    )
  }
)

PaginationButton.displayName = 'PaginationButton'

export interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const PaginationInfo = forwardRef<HTMLDivElement, PaginationInfoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('text-sm text-gray-600', className)} {...props}>
        {children}
      </div>
    )
  }
)

PaginationInfo.displayName = 'PaginationInfo'

export { Pagination, PaginationButton, PaginationInfo }
