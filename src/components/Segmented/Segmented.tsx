import React, {
  createContext,
  useContext,
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { cn } from '@/utils'

// Types
export type SegmentedVariant = 'solid' | 'outline' | 'ghost' | 'filled' | 'minimal' | 'underline'
export type SegmentedSize = 'sm' | 'md' | 'lg'
export type SegmentedDirection = 'horizontal' | 'vertical'
export type SegmentedTransition = 'smooth' | 'bouncy' | 'swift' | 'elastic' | 'instant' | 'fade'

export interface SegmentedOption {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Core functionality
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: SegmentedOption[]

  // Basic props
  disabled?: boolean
  readOnly?: boolean
  fullWidth?: boolean
  rounded?: boolean
  stretch?: boolean

  // Visual variants
  variant?: SegmentedVariant
  size?: SegmentedSize
  direction?: SegmentedDirection
  transition?: SegmentedTransition

  // Borders
  borderWidth?: string
  borderColor?: string
  borderRadius?: string
  borderStyle?: string

  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string

  // Colors
  backgroundColor?: string
  hoverColor?: string
  activeColor?: string
  selectedTextColor?: string

  // Indicator styles
  indicatorColor?: string
  indicatorTransition?: string
  indicatorBorderRadius?: string

  // Spacing
  padding?: string
  gap?: string
  margin?: string

  // Focus/Hover
  focusRingColor?: string
  focusBorderColor?: string
  hoverShadow?: string

  // Advanced features
  animateIndicator?: boolean
  flexWrap?: boolean

  // Custom render
  renderItem?: (
    option: SegmentedOption,
    isSelected: boolean,
    isDisabled: boolean
  ) => React.ReactNode

  // Accessibility
  'aria-label'?: string
  'aria-labelledby'?: string
}

// Context
interface SegmentedContextValue {
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  variant: SegmentedVariant
  size: SegmentedSize
  direction: SegmentedDirection
  transition: SegmentedTransition
  options: SegmentedOption[]

  // Style props
  borderWidth?: string
  borderColor?: string
  borderRadius?: string
  borderStyle?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  backgroundColor?: string
  hoverColor?: string
  activeColor?: string
  selectedTextColor?: string
  indicatorColor?: string
  indicatorTransition?: string
  indicatorBorderRadius?: string
  padding?: string
  gap?: string
  focusRingColor?: string
  focusBorderColor?: string
  hoverShadow?: string
  animateIndicator?: boolean

  // Custom render
  renderItem?: (
    option: SegmentedOption,
    isSelected: boolean,
    isDisabled: boolean
  ) => React.ReactNode

  // Internal state
  indicatorStyle: React.CSSProperties
  updateIndicator: (element: HTMLElement | null) => void
}

const SegmentedContext = createContext<SegmentedContextValue | null>(null)

export const useSegmented = () => {
  const context = useContext(SegmentedContext)
  if (!context) {
    throw new Error('useSegmented must be used within a Segmented component')
  }
  return context
}

// Main Segmented component
const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      options,
      disabled = false,
      readOnly = false,
      fullWidth = false,
      rounded = false,
      stretch: _stretch = false,
      variant = 'solid',
      size = 'md',
      direction = 'horizontal',
      transition = 'smooth',

      // Style props
      borderWidth,
      borderColor,
      borderRadius,
      borderStyle,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      hoverColor,
      activeColor,
      selectedTextColor,
      indicatorColor,
      indicatorTransition,
      indicatorBorderRadius,
      padding,
      gap,
      margin,
      focusRingColor,
      focusBorderColor,
      hoverShadow,

      // Advanced features
      animateIndicator = true,
      flexWrap = false,

      // Custom render
      renderItem,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,

      className,
      children,
      ...props
    },
    _ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || options[0]?.value || '')
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
    const containerRef = useRef<HTMLDivElement>(null)

    const currentValue = value !== undefined ? value : internalValue

    const handleChange = useCallback(
      (newValue: string) => {
        if (disabled || readOnly) return

        if (value === undefined) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [disabled, readOnly, value, onChange]
    )

    const updateIndicator = useCallback(
      (element: HTMLElement | null) => {
        if (!element || !containerRef.current || !animateIndicator) return

        const container = containerRef.current
        const containerRect = container.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()

        // Define transition styles
        const transitionStyles = {
          smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          bouncy: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          swift: 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
          elastic: 'all 0.8s cubic-bezier(0.68, -0.55, 0.085, 1.35)',
          instant: 'none',
          fade: 'all 0.4s ease-in-out',
        }

        const newStyle: React.CSSProperties = {
          position: 'absolute',
          transition: indicatorTransition || transitionStyles[transition],
          ...(variant === 'underline'
            ? {
                left: elementRect.left - containerRect.left,
                width: elementRect.width,
                height: '2px',
                bottom: 0,
                backgroundColor: indicatorColor || '#3b82f6',
                borderRadius: 0,
              }
            : direction === 'horizontal'
              ? {
                  left: elementRect.left - containerRect.left,
                  width: elementRect.width,
                  height: '100%',
                  top: 0,
                  backgroundColor:
                    indicatorColor || (variant === 'solid' ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)'),
                  borderRadius: indicatorBorderRadius || borderRadius || '0.25rem',
                }
              : {
                  top: elementRect.top - containerRect.top,
                  height: elementRect.height,
                  width: '100%',
                  left: 0,
                  backgroundColor:
                    indicatorColor || (variant === 'solid' ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)'),
                  borderRadius: indicatorBorderRadius || borderRadius || '0.25rem',
                }),
          zIndex: 0,
        }

        setIndicatorStyle(newStyle)
      },
      [
        direction,
        indicatorTransition,
        indicatorColor,
        variant,
        indicatorBorderRadius,
        borderRadius,
        animateIndicator,
        transition,
      ]
    )

    // Keyboard navigation handler
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return

        const { key } = event
        const currentIndex = options.findIndex((option) => option.value === currentValue)
        let newIndex = currentIndex

        if (direction === 'horizontal') {
          if (key === 'ArrowLeft' || key === 'ArrowUp') {
            event.preventDefault()
            newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
          } else if (key === 'ArrowRight' || key === 'ArrowDown') {
            event.preventDefault()
            newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
          }
        } else {
          if (key === 'ArrowUp' || key === 'ArrowLeft') {
            event.preventDefault()
            newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
          } else if (key === 'ArrowDown' || key === 'ArrowRight') {
            event.preventDefault()
            newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
          }
        }

        // Skip disabled options
        while (options[newIndex]?.disabled && newIndex !== currentIndex) {
          if (key === 'ArrowLeft' || key === 'ArrowUp') {
            newIndex = newIndex > 0 ? newIndex - 1 : options.length - 1
          } else {
            newIndex = newIndex < options.length - 1 ? newIndex + 1 : 0
          }
        }

        if (newIndex !== currentIndex && !options[newIndex]?.disabled) {
          handleChange(options[newIndex].value)

          // Focus the new selected item
          setTimeout(() => {
            const newElement = containerRef.current?.querySelector(
              `[data-value="${options[newIndex].value}"]`
            ) as HTMLElement
            newElement?.focus()
          }, 0)
        }
      },
      [disabled, readOnly, direction, options, currentValue, handleChange]
    )

    // Update indicator when value changes
    useEffect(() => {
      if (!animateIndicator) return

      const selectedElement = containerRef.current?.querySelector(
        `[data-value="${currentValue}"]`
      ) as HTMLElement
      if (selectedElement) {
        // Small delay to ensure DOM is rendered
        setTimeout(() => updateIndicator(selectedElement), 0)
      }
    }, [currentValue, updateIndicator, animateIndicator])

    const contextValue: SegmentedContextValue = {
      value: currentValue,
      onChange: handleChange,
      disabled,
      readOnly,
      variant,
      size,
      direction,
      transition,
      options,
      borderWidth,
      borderColor,
      borderRadius,
      borderStyle,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      hoverColor,
      activeColor,
      selectedTextColor,
      indicatorColor,
      indicatorTransition,
      indicatorBorderRadius,
      padding,
      gap,
      focusRingColor,
      focusBorderColor,
      hoverShadow,
      animateIndicator,
      renderItem,
      indicatorStyle,
      updateIndicator,
    }

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    const baseStyles = cn(
      'relative inline-flex',
      variant !== 'underline' && 'bg-gray-100 border border-gray-200',
      direction === 'horizontal' ? 'flex-row' : 'flex-col',
      sizes[size],
      fullWidth && 'w-full',
      rounded && 'rounded-full',
      flexWrap && 'flex-wrap',
      disabled && 'opacity-50 cursor-not-allowed'
    )

    const customStyles: React.CSSProperties = {
      ...(variant !== 'underline' && {
        borderWidth: borderWidth || '1px',
        borderColor: borderColor || '#e5e7eb',
        borderStyle: borderStyle || 'solid',
        borderRadius: borderRadius || (rounded ? '9999px' : '0.5rem'),
        backgroundColor: backgroundColor || '#f3f4f6',
      }),
      fontSize,
      fontWeight,
      fontFamily,
      color: textColor,
      padding: padding || (variant === 'underline' ? '0' : '0.25rem'),
      gap: gap || (variant === 'underline' ? '1.5rem' : '0.25rem'),
      margin,
    }

    return (
      <SegmentedContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          role="radiogroup"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className={cn(baseStyles, className)}
          style={customStyles}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {animateIndicator && variant !== 'underline' && <SegmentedIndicator />}
          {children ||
            options.map((option) => <SegmentedItem key={option.value} option={option} />)}
        </div>
      </SegmentedContext.Provider>
    )
  }
)

Segmented.displayName = 'Segmented'

// SegmentedItem component
interface SegmentedItemProps {
  option: SegmentedOption
}

const SegmentedItem: React.FC<SegmentedItemProps> = ({ option }) => {
  const {
    value: selectedValue,
    onChange,
    disabled: groupDisabled,
    readOnly,
    variant,
    size,
    direction: _direction2,
    transition,
    borderRadius,
    fontSize,
    fontWeight,
    fontFamily,
    textColor,
    hoverColor,
    activeColor,
    selectedTextColor,
    padding,
    focusRingColor,
    focusBorderColor,
    hoverShadow,
    renderItem,
    updateIndicator,
  } = useSegmented()

  const itemRef = useRef<HTMLButtonElement>(null)
  const isSelected = selectedValue === option.value
  const isDisabled = groupDisabled || option.disabled

  const handleClick = () => {
    if (isDisabled || readOnly) return
    onChange(option.value)
  }

  // Update indicator position when this item becomes selected
  useEffect(() => {
    if (isSelected && itemRef.current) {
      updateIndicator(itemRef.current)
    }
  }, [isSelected, updateIndicator])

  if (renderItem) {
    return (
      <div data-value={option.value} onClick={handleClick}>
        {renderItem(option, isSelected, Boolean(isDisabled))}
      </div>
    )
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  }

  // Define transition durations
  const transitionDurations = {
    smooth: 'duration-300',
    bouncy: 'duration-500',
    swift: 'duration-150',
    elastic: 'duration-700',
    instant: 'duration-0',
    fade: 'duration-400',
  }

  const transitionTiming = {
    smooth: 'ease-in-out',
    bouncy: 'ease-in-out',
    swift: 'ease-out',
    elastic: 'ease-in-out',
    instant: '',
    fade: 'ease-in-out',
  }

  const transitionClass = `transition-all ${transitionDurations[transition]} ${transitionTiming[transition]}`

  const variants = {
    solid: cn(
      'bg-transparent hover:bg-white/10',
      transitionClass,
      isSelected && 'text-white bg-transparent'
    ),
    outline: cn(
      'bg-transparent hover:bg-gray-50',
      transitionClass,
      isSelected && 'bg-white border-gray-300 shadow-sm'
    ),
    ghost: cn(
      'bg-transparent hover:bg-gray-100',
      transitionClass,
      isSelected && 'bg-gray-200 text-gray-900'
    ),
    filled: cn(
      'bg-transparent hover:bg-gray-50',
      transitionClass,
      isSelected && 'bg-blue-50 text-blue-700'
    ),
    minimal: cn(
      'bg-transparent hover:bg-gray-50',
      transitionClass,
      isSelected && 'text-blue-600 bg-transparent'
    ),
    underline: cn(
      'bg-transparent hover:text-gray-700 border-b-2',
      transitionClass,
      isSelected ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent'
    ),
  }

  const baseStyles = cn(
    'relative z-10 flex items-center justify-center gap-2 font-medium transition-all',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    sizes[size],
    variants[variant],
    isDisabled && 'cursor-not-allowed opacity-50'
  )

  const customStyles: React.CSSProperties = {
    borderRadius: borderRadius || '0.25rem',
    fontSize,
    fontWeight,
    fontFamily,
    color: isSelected ? selectedTextColor : textColor,
    padding,
    ...(hoverColor && { ':hover': { backgroundColor: hoverColor } }),
    ...(activeColor && { ':active': { backgroundColor: activeColor } }),
    ...(hoverShadow && { ':hover': { boxShadow: hoverShadow } }),
    ...(focusRingColor && { '--tw-ring-color': focusRingColor }),
    ...(focusBorderColor && { '--tw-ring-offset-color': focusBorderColor }),
  }

  return (
    <button
      ref={itemRef}
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-value={option.value}
      className={baseStyles}
      style={customStyles}
      onClick={handleClick}
      disabled={isDisabled}
      tabIndex={isSelected ? 0 : -1}
    >
      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
      <span>{option.label}</span>
    </button>
  )
}

SegmentedItem.displayName = 'SegmentedItem'

// SegmentedIndicator component
const SegmentedIndicator = () => {
  const { indicatorStyle, animateIndicator } = useSegmented()

  if (!animateIndicator) return null

  return <div style={indicatorStyle} />
}

SegmentedIndicator.displayName = 'SegmentedIndicator'

// Export compound component
interface SegmentedComponent
  extends React.ForwardRefExoticComponent<SegmentedProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof SegmentedItem
  Indicator: typeof SegmentedIndicator
}

const SegmentedCompound = Segmented as SegmentedComponent
SegmentedCompound.Item = SegmentedItem
SegmentedCompound.Indicator = SegmentedIndicator

export { SegmentedCompound as Segmented }
export default SegmentedCompound
