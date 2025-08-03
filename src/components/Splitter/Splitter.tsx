import React, {
  createContext,
  useContext,
  forwardRef,
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export type SplitterDirection = 'horizontal' | 'vertical'
export type SplitterSize = 'sm' | 'md' | 'lg'
export type SplitterVariant = 'basic' | 'shadowed' | 'bordered' | 'compact'

/**
 * Context value for the Splitter component
 */
export interface SplitterContextValue {
  direction: SplitterDirection
  sizes: number[]
  setSizes: (sizes: number[]) => void
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
  activeHandleIndex: number | null
  setActiveHandleIndex: (index: number | null) => void
  minSize: number
  maxSize: number
  onResize?: (index: number, sizes: number[]) => void
  onDragStart?: (index: number) => void
  onDragEnd?: (index: number) => void
}

/**
 * Base props for the Splitter component
 */
export interface SplitterBaseProps {
  // Core props
  direction?: SplitterDirection
  sizes?: number[]
  initialSizes?: number[]
  minSize?: number
  maxSize?: number
  controlled?: boolean

  // Variants and sizes
  variant?: SplitterVariant
  handleSize?: SplitterSize

  // Event handlers
  onResize?: (index: number, sizes: number[]) => void
  onDragStart?: (index: number) => void
  onDragEnd?: (index: number) => void

  // Styling props
  className?: string
  style?: React.CSSProperties

  // Border styling
  borderWidth?: string | number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderRadius?: string | number

  // Animation
  animateResize?: boolean
  transitionDuration?: string

  // Persistence
  persistSizes?: boolean
  storageKey?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  role?: string
  tabIndex?: number
}

/**
 * Props for the main Splitter component
 */
export interface SplitterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof SplitterBaseProps>,
    SplitterBaseProps {
  children?: React.ReactNode
}

/**
 * Props for individual Splitter panes
 */
export interface SplitterPaneProps {
  index: number
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  minSize?: number
  maxSize?: number
  collapsed?: boolean
}

/**
 * Props for Splitter handles
 */
export interface SplitterHandleProps {
  index: number
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  disabled?: boolean
  'aria-label'?: string
}

// Context
const SplitterContext = createContext<SplitterContextValue | null>(null)

export const useSplitterContext = () => {
  const context = useContext(SplitterContext)
  if (!context) {
    throw new Error('Splitter components must be used within a Splitter')
  }
  return context
}

/**
 * Main Splitter Component
 *
 * A flexible splitter component that allows users to resize panes by dragging handles.
 * Supports both horizontal and vertical layouts with extensive customization options.
 *
 * @example
 * ```tsx
 * <Splitter direction="horizontal" initialSizes={[30, 70]}>
 *   <Splitter.Pane index={0}>
 *     <div>Left Panel</div>
 *   </Splitter.Pane>
 *   <Splitter.Handle index={0} />
 *   <Splitter.Pane index={1}>
 *     <div>Right Panel</div>
 *   </Splitter.Pane>
 * </Splitter>
 * ```
 */
const SplitterComponent = forwardRef<HTMLDivElement, SplitterProps>(
  (
    {
      direction = 'horizontal',
      sizes: controlledSizes,
      initialSizes = [50, 50],
      minSize = 10,
      maxSize = 90,
      controlled = false,
      variant = 'basic',
      handleSize = 'md',
      onResize,
      onDragStart,
      onDragEnd,
      className,
      style,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      animateResize = true,
      transitionDuration = '150ms',
      persistSizes = false,
      storageKey = 'splitter-sizes',
      children,
      ...props
    },
    ref
  ) => {
    const [internalSizes, setInternalSizes] = useState<number[]>(() => {
      if (controlled) return controlledSizes || initialSizes

      // Try to load from localStorage if persistence is enabled
      if (persistSizes && typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem(storageKey)
          if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length === initialSizes.length) {
              return parsed
            }
          }
        } catch (error) {
          console.warn('Failed to load splitter sizes from localStorage:', error)
        }
      }

      return initialSizes
    })

    const [isDragging, setIsDragging] = useState(false)
    const [activeHandleIndex, setActiveHandleIndex] = useState<number | null>(null)

    // Use controlled or uncontrolled sizes
    const currentSizes = controlled ? controlledSizes || internalSizes : internalSizes

    // Save sizes to localStorage when they change
    useEffect(() => {
      if (persistSizes && !controlled && typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, JSON.stringify(currentSizes))
        } catch (error) {
          console.warn('Failed to save splitter sizes to localStorage:', error)
        }
      }
    }, [currentSizes, persistSizes, controlled, storageKey])

    // Update internal sizes when controlled sizes change
    useEffect(() => {
      if (controlled && controlledSizes) {
        setInternalSizes(controlledSizes)
      }
    }, [controlled, controlledSizes])

    const setSizes = useCallback(
      (newSizes: number[]) => {
        if (!controlled) {
          setInternalSizes(newSizes)
        }
        onResize?.(activeHandleIndex ?? 0, newSizes)
      },
      [controlled, onResize, activeHandleIndex]
    )

    const contextValue: SplitterContextValue = {
      direction,
      sizes: currentSizes,
      setSizes,
      isDragging,
      setIsDragging,
      activeHandleIndex,
      setActiveHandleIndex,
      minSize,
      maxSize,
      onResize,
      onDragStart,
      onDragEnd,
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      width: '100%',
      height: '100%',
      borderWidth: borderWidth ? `${borderWidth}px` : undefined,
      borderColor,
      borderStyle,
      borderRadius: borderRadius ? `${borderRadius}px` : undefined,
      transition: animateResize ? `all ${transitionDuration} ease-in-out` : undefined,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }

    return (
      <SplitterContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'splitter',
            `splitter-${direction}`,
            `splitter-${variant}`,
            `splitter-handle-${handleSize}`,
            className
          )}
          style={containerStyle}
          role="separator"
          aria-orientation={direction}
          {...props}
        >
          {children}
        </div>
      </SplitterContext.Provider>
    )
  }
)

SplitterComponent.displayName = 'Splitter'

/**
 * Splitter Pane Component
 *
 * Represents a resizable pane within the splitter. Each pane can be resized
 * by dragging the handles between them.
 *
 * @example
 * ```tsx
 * <Splitter.Pane index={0}>
 *   <div>Content for this pane</div>
 * </Splitter.Pane>
 * ```
 */
const SplitterPane = forwardRef<HTMLDivElement, SplitterPaneProps>(
  (
    {
      index,
      children,
      className,
      style,
      minSize: paneMinSize,
      maxSize: paneMaxSize,
      collapsed = false,
      ...props
    },
    ref
  ) => {
    const { direction, sizes } = useSplitterContext()

    const paneStyle: React.CSSProperties = {
      flex: collapsed ? '0 0 0px' : `0 0 ${sizes[index] || 0}%`,
      minWidth: direction === 'horizontal' ? `${paneMinSize || 0}px` : undefined,
      minHeight: direction === 'vertical' ? `${paneMinSize || 0}px` : undefined,
      maxWidth: direction === 'horizontal' ? `${paneMaxSize || 100}%` : undefined,
      maxHeight: direction === 'vertical' ? `${paneMaxSize || 100}%` : undefined,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn('splitter-pane', className)}
        style={paneStyle}
        data-index={index}
        data-collapsed={collapsed}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SplitterPane.displayName = 'SplitterPane'

/**
 * Splitter Handle Component
 *
 * Represents a draggable handle between panes that allows users to resize
 * the adjacent panes by dragging.
 *
 * @example
 * ```tsx
 * <Splitter.Handle index={0} />
 * ```
 */
const SplitterHandle = forwardRef<HTMLDivElement, SplitterHandleProps>(
  (
    {
      index,
      children,
      className,
      style,
      icon,
      disabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    _ref
  ) => {
    const {
      direction,
      isDragging,
      setIsDragging,
      activeHandleIndex,
      setActiveHandleIndex,
      sizes,
      setSizes,
      onDragStart,
      onDragEnd,
    } = useSplitterContext()

    const handleRef = useRef<HTMLDivElement>(null)
    const startPos = useRef<number>(0)
    const startSizes = useRef<number[]>([])
    const isActiveHandle = activeHandleIndex === index

    const handleMouseDown = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) return

        event.preventDefault()
        event.stopPropagation()

        // Prevent text selection during drag
        document.body.style.userSelect = 'none'
        document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize'

        setIsDragging(true)
        setActiveHandleIndex(index)
        onDragStart?.(index)

        const pos = direction === 'horizontal' ? event.clientX : event.clientY
        startPos.current = pos
        startSizes.current = [...sizes]

        const handleMouseMove = (moveEvent: MouseEvent) => {
          moveEvent.preventDefault()
          moveEvent.stopPropagation()

          const currentPos = direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY
          const delta = currentPos - startPos.current

          // Get the splitter container (the main splitter div)
          const splitterContainer = handleRef.current?.closest('.splitter') as HTMLElement
          if (splitterContainer) {
            const containerRect = splitterContainer.getBoundingClientRect()
            const containerSize =
              direction === 'horizontal' ? containerRect.width : containerRect.height
            const deltaPercent = (delta / containerSize) * 100

            const newSizes = [...startSizes.current]
            const currentSize = newSizes[index]
            const nextSize = newSizes[index + 1]

            if (currentSize !== undefined && nextSize !== undefined) {
              const newCurrentSize = Math.max(10, Math.min(90, currentSize + deltaPercent))
              const newNextSize = 100 - newCurrentSize

              newSizes[index] = newCurrentSize
              newSizes[index + 1] = newNextSize

              setSizes(newSizes)
            }
          }
        }

        const handleMouseUp = (upEvent: MouseEvent) => {
          upEvent.preventDefault()
          upEvent.stopPropagation()

          setIsDragging(false)
          setActiveHandleIndex(null)
          onDragEnd?.(index)

          // Restore normal cursor and text selection
          document.body.style.userSelect = ''
          document.body.style.cursor = ''

          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        // Use passive: false to ensure preventDefault works
        document.addEventListener('mousemove', handleMouseMove, { passive: false })
        document.addEventListener('mouseup', handleMouseUp, { passive: false })
      },
      [
        disabled,
        direction,
        index,
        setIsDragging,
        setActiveHandleIndex,
        onDragStart,
        onDragEnd,
        sizes,
        setSizes,
      ]
    )

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return

        const step = event.shiftKey ? 10 : 1
        let delta = 0

        switch (event.key) {
          case 'ArrowLeft':
            if (direction === 'horizontal') delta = -step
            break
          case 'ArrowRight':
            if (direction === 'horizontal') delta = step
            break
          case 'ArrowUp':
            if (direction === 'vertical') delta = -step
            break
          case 'ArrowDown':
            if (direction === 'vertical') delta = step
            break
          default:
            return
        }

        if (delta !== 0) {
          event.preventDefault()
          const newSizes = [...sizes]
          const currentSize = newSizes[index]
          const nextSize = newSizes[index + 1]

          if (currentSize && nextSize) {
            const newCurrentSize = Math.max(10, Math.min(90, currentSize + delta))
            const newNextSize = 100 - newCurrentSize

            newSizes[index] = newCurrentSize
            newSizes[index + 1] = newNextSize

            setSizes(newSizes)
          }
        }
      },
      [disabled, direction, index, sizes, setSizes]
    )

    const handleStyle: React.CSSProperties = {
      position: 'relative',
      backgroundColor: isDragging ? '#3b82f6' : '#e5e7eb',
      cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 150ms ease-in-out',
      width: direction === 'horizontal' ? '12px' : '100%',
      height: direction === 'vertical' ? '12px' : '100%',
      minWidth: direction === 'horizontal' ? '12px' : undefined,
      minHeight: direction === 'vertical' ? '12px' : undefined,
      zIndex: 10,
      border: isActiveHandle ? '2px solid #3b82f6' : '1px solid #d1d5db',
      boxShadow: isDragging ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
      flexShrink: 0,
      ...style,
    }

    const defaultIcon =
      direction === 'horizontal' ? (
        <div className="w-1 h-6 bg-current opacity-50" />
      ) : (
        <div className="h-1 w-6 bg-current opacity-50" />
      )

    return (
      <div
        ref={handleRef}
        className={cn(
          'splitter-handle',
          `splitter-handle-${direction}`,
          isDragging && 'splitter-handle-dragging',
          disabled && 'splitter-handle-disabled',
          className
        )}
        style={handleStyle}
        role="separator"
        aria-orientation={direction}
        aria-label={ariaLabel || `Resize pane ${index + 1}`}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children || icon || defaultIcon}
      </div>
    )
  }
)

SplitterHandle.displayName = 'SplitterHandle'

// Compound component structure
const Splitter = Object.assign(SplitterComponent, {
  Pane: memo(SplitterPane),
  Handle: memo(SplitterHandle),
}) as React.ForwardRefExoticComponent<SplitterProps & React.RefAttributes<HTMLDivElement>> & {
  Pane: typeof SplitterPane
  Handle: typeof SplitterHandle
}

export { Splitter }
