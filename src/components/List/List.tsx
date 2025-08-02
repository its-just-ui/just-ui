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
  [key: string]: unknown
}

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: ListItem[]
  value?: string | string[] | null
  onChange?: (value: string | string[] | null) => void
  variant?: 'default' | 'bordered' | 'card' | 'minimal' | 'elevated'
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

  // Custom styles
  className?: string
  style?: React.CSSProperties
}

interface ListContextValue {
  items: ListItem[]
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void
  variant?: 'default' | 'bordered' | 'card' | 'minimal' | 'elevated'
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
  (
    {
      className,
      style,
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
      ...props
    },
    ref
  ) => {
    const handleChange = useCallback(
      (newValue: string | string[] | null) => {
        if (onChange) {
          onChange(newValue)
        }
      },
      [onChange]
    )

    const handleItemSelect = useCallback(
      (item: ListItem) => {
        if (onItemSelect) {
          onItemSelect(item)
        }

        if (selectable) {
          if (multiple && Array.isArray(value)) {
            const isSelected = value.includes(item.id)
            if (isSelected) {
              const newValue = value.filter((v) => v !== item.id)
              handleChange(newValue.length > 0 ? newValue : null)
            } else {
              if (maxSelection && value.length >= maxSelection) return
              handleChange([...value, item.id])
            }
          } else {
            handleChange(item.id)
          }
        }
      },
      [value, multiple, maxSelection, selectable, onItemSelect, handleChange]
    )

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
        }}
      >
        <div ref={ref} className={cn(baseStyles, className)} style={style} {...props}>
          {label && (
            <label
              className={cn(
                'block mb-2 font-medium',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                status === 'error' && 'text-red-600',
                disabled && 'opacity-50'
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
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
                status === 'default' && 'text-gray-500'
              )}
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
    const { items, loading, loadingMessage, emptyMessage } = useList()

    const baseStyles = cn(
      'flex flex-col',
      'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2'
    )

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-center items-center py-8', className)}
          {...props}
        >
          <span className="text-gray-500">{loadingMessage}</span>
        </div>
      )
    }

    if (!items || items.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'justify-center items-center py-8', className)}
          {...props}
        >
          <span className="text-gray-500">{emptyMessage}</span>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(baseStyles, className)} {...props}>
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
      disabled,
      selectable,
      multiple,
      onItemClick,
      onItemSelect,
      renderItem,
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
      selectable && !disabled && !item.disabled && 'cursor-pointer'
    )

    const variants = {
      default: cn(
        'border-b border-gray-200 last:border-b-0',
        'hover:bg-gray-50 focus:ring-gray-400'
      ),
      bordered: cn('border border-gray-200 rounded-md', 'hover:bg-gray-50 focus:ring-gray-400'),
      card: cn(
        'border border-gray-200 rounded-lg shadow-sm',
        'hover:shadow-md focus:ring-gray-400'
      ),
      minimal: cn('border-0', 'hover:bg-gray-50 focus:ring-gray-400'),
      elevated: cn(
        'border border-gray-200 rounded-lg shadow-md',
        'hover:shadow-lg focus:ring-gray-400'
      ),
    }

    const sizes = {
      sm: 'p-3 gap-2',
      md: 'p-4 gap-3',
      lg: 'p-6 gap-4',
    }

    if (renderItem) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, variants[variant || 'default'], sizes[size || 'md'], className)}
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
        className={cn(baseStyles, variants[variant || 'default'], sizes[size || 'md'], className)}
        onClick={handleClick}
        {...props}
      >
        {selectable && (
          <div className="flex-shrink-0 w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
            {isSelected &&
              (multiple ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-blue-600"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              ))}
          </div>
        )}

        {item.avatar && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">{item.avatar}</div>
        )}

        {item.icon && <span className="flex-shrink-0 text-gray-500">{item.icon}</span>}

        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900">{item.title}</div>
          {item.description && <div className="text-gray-500 mt-1">{item.description}</div>}
        </div>

        {item.badge && <div className="flex-shrink-0">{item.badge}</div>}

        {item.action && <div className="flex-shrink-0 text-gray-400">{item.action}</div>}
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
    const { size } = useList()

    const baseStyles = cn('px-4 py-2 font-medium text-gray-700 bg-gray-50 border-b border-gray-200')

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div ref={ref} className={cn(baseStyles, sizes[size || 'md'], className)} {...props}>
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
    const { size } = useList()

    const baseStyles = cn('px-4 py-2 text-gray-500 bg-gray-50 border-t border-gray-200')

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div ref={ref} className={cn(baseStyles, sizes[size || 'md'], className)} {...props}>
        {children}
      </div>
    )
  }
)

ListFooter.displayName = 'ListFooter'

export { List, ListContainer, ListItem, ListHeader, ListFooter }
