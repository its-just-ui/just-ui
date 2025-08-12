import React, { forwardRef, useState } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import './OccasionList.css'

export interface OccasionListItem {
  id: string | number
  primary: React.ReactNode
  secondary?: React.ReactNode
  avatar?: string
  actions?: React.ReactNode
  disabled?: boolean
  selected?: boolean
  metadata?: React.ReactNode
}

export interface OccasionListProps {
  items: OccasionListItem[]
  variant?: 'default' | 'bordered' | 'separated' | 'compact'
  size?: 'small' | 'medium' | 'large'
  selectable?: boolean
  multiSelect?: boolean
  hoverable?: boolean
  divided?: boolean
  loading?: boolean
  emptyMessage?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  onItemClick?: (item: OccasionListItem, index: number) => void
  onSelectionChange?: (selectedIds: (string | number)[]) => void
  renderItem?: (item: OccasionListItem, index: number) => React.ReactNode
  sortable?: boolean
  onSort?: (items: OccasionListItem[]) => void
  occasionTheme?: boolean
  decorateItems?: boolean
  virtualScroll?: boolean
  maxHeight?: string | number
  className?: string
}

export const OccasionList = forwardRef<HTMLDivElement, OccasionListProps>(
  (
    {
      items,
      variant = 'default',
      size = 'medium',
      selectable = false,
      multiSelect = false,
      hoverable = true,
      divided = false,
      loading = false,
      emptyMessage = 'No items to display',
      header,
      footer,
      onItemClick,
      onSelectionChange,
      renderItem,
      sortable = false,
      onSort,
      occasionTheme = true,
      decorateItems = false,
      virtualScroll = false,
      maxHeight,
      className = '',
    },
    ref
  ) => {
    const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())
    const [draggedItem, setDraggedItem] = useState<OccasionListItem | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    const { getAssets, activeOccasion } = useOccasion() as {
      getAssets: (scope: string) => React.ReactNode
      activeOccasion: string | null
    }

    const decoration = occasionTheme ? getAssets('adjacent') : null

    const handleItemClick = (item: OccasionListItem, index: number) => {
      if (item.disabled) return

      if (selectable) {
        const newSelected = new Set(selectedIds)

        if (multiSelect) {
          if (newSelected.has(item.id)) {
            newSelected.delete(item.id)
          } else {
            newSelected.add(item.id)
          }
        } else {
          newSelected.clear()
          if (!selectedIds.has(item.id)) {
            newSelected.add(item.id)
          }
        }

        setSelectedIds(newSelected)
        onSelectionChange?.(Array.from(newSelected))
      }

      onItemClick?.(item, index)
    }

    const handleDragStart = (e: React.DragEvent, item: OccasionListItem) => {
      if (!sortable) return
      setDraggedItem(item)
      e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
      if (!sortable) return
      e.preventDefault()
      setDragOverIndex(index)
    }

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
      if (!sortable || !draggedItem) return
      e.preventDefault()

      const dragIndex = items.findIndex((item) => item.id === draggedItem.id)
      if (dragIndex === dropIndex) return

      const newItems = [...items]
      newItems.splice(dragIndex, 1)
      newItems.splice(dropIndex, 0, draggedItem)

      onSort?.(newItems)
      setDraggedItem(null)
      setDragOverIndex(null)
    }

    const occasionClass = occasionTheme && activeOccasion ? `occasion-${activeOccasion}` : ''

    const classes = [
      'occasion-list',
      `occasion-list--${variant}`,
      `occasion-list--${size}`,
      hoverable && 'occasion-list--hoverable',
      divided && 'occasion-list--divided',
      loading && 'occasion-list--loading',
      virtualScroll && 'occasion-list--virtual',
      occasionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const listStyle = maxHeight ? { maxHeight, overflowY: 'auto' as const } : undefined

    const renderListItem = (item: OccasionListItem, index: number) => {
      const isSelected = selectedIds.has(item.id) || item.selected

      if (renderItem) {
        return renderItem(item, index)
      }

      return (
        <li
          key={item.id}
          className={[
            'occasion-list__item',
            isSelected && 'occasion-list__item--selected',
            item.disabled && 'occasion-list__item--disabled',
            dragOverIndex === index && 'occasion-list__item--drag-over',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleItemClick(item, index)}
          draggable={sortable && !item.disabled}
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          role={selectable ? 'option' : 'listitem'}
          aria-selected={isSelected}
          aria-disabled={item.disabled}
        >
          {selectable && (
            <span className="occasion-list__checkbox" aria-hidden="true">
              {isSelected ? '☑' : '☐'}
            </span>
          )}

          {item.avatar && (
            <div className="occasion-list__media">
              <img src={item.avatar} alt="" className="occasion-list__avatar" />
            </div>
          )}

          <div className="occasion-list__content">
            <div className="occasion-list__primary">{item.primary}</div>
            {item.secondary && <div className="occasion-list__secondary">{item.secondary}</div>}
            {item.metadata && <div className="occasion-list__metadata">{item.metadata}</div>}
          </div>

          {decorateItems && decoration && (
            <span className="occasion-list__decoration" aria-hidden="true">
              {decoration}
            </span>
          )}

          {item.actions && (
            <div className="occasion-list__actions" onClick={(e) => e.stopPropagation()}>
              {item.actions}
            </div>
          )}

          {sortable && !item.disabled && (
            <span className="occasion-list__drag-handle" aria-label="Drag to reorder">
              ⋮⋮
            </span>
          )}
        </li>
      )
    }

    return (
      <div ref={ref} className={classes}>
        {header && <div className="occasion-list__header">{header}</div>}

        <ul
          className="occasion-list__items"
          style={listStyle}
          role={selectable ? 'listbox' : 'list'}
        >
          {loading ? (
            <li className="occasion-list__loader">
              <div className="occasion-list__spinner" />
              <span>Loading items...</span>
            </li>
          ) : items.length === 0 ? (
            <li className="occasion-list__empty">{emptyMessage}</li>
          ) : (
            items.map((item, index) => renderListItem(item, index))
          )}
        </ul>

        {footer && <div className="occasion-list__footer">{footer}</div>}
      </div>
    )
  }
)

OccasionList.displayName = 'OccasionList'
