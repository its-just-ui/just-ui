import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
} from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export interface SliderValue {
  value: number
  percentage: number
}

export interface SliderRange {
  min: number
  max: number
  step: number
}

export interface SliderMark {
  value: number
  label?: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
}

export interface SliderContextValue {
  values: SliderValue[]
  range: SliderRange
  isRange: boolean
  disabled: boolean
  readOnly: boolean
  focused: boolean
  dragging: boolean
  hovered: boolean
  onChange: (values: number[]) => void
  onFocus: () => void
  onBlur: () => void
  onDragStart: () => void
  onDragEnd: () => void
  getValueFromPercentage: (percentage: number) => number
  getPercentageFromValue: (value: number) => number
  snapToStep: (value: number) => number
  formatValue: (value: number) => string
  variant:
    | 'default'
    | 'minimal'
    | 'filled'
    | 'track-only'
    | 'thumbless'
    | 'removed-track'
    | 'inverted-track'
  size: 'sm' | 'md' | 'lg'
  status: 'default' | 'success' | 'warning' | 'error' | 'info'
}

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: number | number[]
  defaultValue?: number | number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  range?: boolean
  variant?:
    | 'default'
    | 'minimal'
    | 'filled'
    | 'track-only'
    | 'thumbless'
    | 'removed-track'
    | 'inverted-track'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error' | 'info'
  label?: React.ReactNode
  labelIcon?: React.ReactNode
  showTooltip?: boolean
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  formatTooltip?: (value: number) => string
  valueLabelDisplay?: 'auto' | 'on' | 'off'
  marks?: SliderMark[]
  showMarks?: boolean
  markStep?: number
  markIcons?: boolean
  onChange?: (values: number[]) => void
  onChangeEnd?: (values: number[]) => void
  onFocus?: () => void
  onBlur?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  transition?: 'none' | 'smooth' | 'bounce'
  transitionDuration?: number
  renderThumb?: (value: SliderValue, index: number) => React.ReactNode
  renderMark?: (mark: SliderMark) => React.ReactNode
  children?: React.ReactNode
}

// Context
const SliderContext = createContext<SliderContextValue | undefined>(undefined)

export const useSlider = () => {
  const context = useContext(SliderContext)
  if (!context) {
    throw new Error('useSlider must be used within a Slider')
  }
  return context
}

// Main Slider Component
const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      readOnly = false,
      required = false,
      name,
      range = false,
      variant = 'default',
      size = 'md',
      status = 'default',
      label,
      labelIcon,
      showTooltip = true,
      tooltipPosition = 'top',
      formatTooltip,
      valueLabelDisplay = 'auto',
      marks,
      showMarks = false,
      markStep,
      markIcons = false,
      onChange,
      onChangeEnd,
      onFocus,
      onBlur,
      onDragStart,
      onDragEnd,
      onKeyDown,
      transition = 'smooth',
      transitionDuration = 200,
      renderThumb,
      renderMark,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValues, setUncontrolledValues] = useState<number[]>(() => {
      const initialValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      return initialValue.map((v) => Math.max(min, Math.min(max, v)))
    })

    const [focused, setFocused] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)

    const trackRef = useRef<HTMLDivElement>(null)
    const isControlled = controlledValue !== undefined
    const values = useMemo(
      () =>
        isControlled
          ? Array.isArray(controlledValue)
            ? controlledValue
            : [controlledValue]
          : uncontrolledValues,
      [isControlled, controlledValue, uncontrolledValues]
    )

    const rangeConfig: SliderRange = { min, max, step }

    // Utility functions
    const snapToStep = useCallback(
      (value: number): number => {
        const steps = Math.round((value - min) / step)
        return min + steps * step
      },
      [min, step]
    )

    const getValueFromPercentage = useCallback(
      (percentage: number): number => {
        const clampedPercentage = Math.max(0, Math.min(100, percentage))
        const value = min + (clampedPercentage / 100) * (max - min)
        return snapToStep(value)
      },
      [min, max, snapToStep]
    )

    const getPercentageFromValue = useCallback(
      (value: number): number => {
        const clampedValue = Math.max(min, Math.min(max, value))
        return ((clampedValue - min) / (max - min)) * 100
      },
      [min, max]
    )

    const formatValue = useCallback(
      (value: number): string => {
        if (formatTooltip) return formatTooltip(value)
        return value.toString()
      },
      [formatTooltip]
    )

    // Event handlers
    const handleChange = useCallback(
      (newValues: number[]) => {
        if (disabled || readOnly) return

        const clampedValues = newValues.map((v) => Math.max(min, Math.min(max, snapToStep(v))))

        if (!isControlled) {
          setUncontrolledValues(clampedValues)
        }

        onChange?.(clampedValues)
      },
      [disabled, readOnly, min, max, isControlled, onChange, snapToStep]
    )

    const handleFocus = useCallback(() => {
      setFocused(true)
      onFocus?.()
    }, [onFocus])

    const handleBlur = useCallback(() => {
      setFocused(false)
      onBlur?.()
    }, [onBlur])

    const handleDragStart = useCallback(() => {
      setDragging(true)
      onDragStart?.()
    }, [onDragStart])

    const handleDragEnd = useCallback(() => {
      setDragging(false)
      onChangeEnd?.(values)
      onDragEnd?.()
    }, [onDragEnd, onChangeEnd, values])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled || readOnly) return

        const currentValue = values[0]
        let newValue = currentValue

        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowDown':
            event.preventDefault()
            newValue = Math.max(min, currentValue - step)
            break
          case 'ArrowRight':
          case 'ArrowUp':
            event.preventDefault()
            newValue = Math.min(max, currentValue + step)
            break
          case 'PageDown':
            event.preventDefault()
            newValue = Math.max(min, currentValue - step * 10)
            break
          case 'PageUp':
            event.preventDefault()
            newValue = Math.min(max, currentValue + step * 10)
            break
          case 'Home':
            event.preventDefault()
            newValue = min
            break
          case 'End':
            event.preventDefault()
            newValue = max
            break
          default:
            onKeyDown?.(event)
            return
        }

        handleChange([newValue])
      },
      [disabled, readOnly, values, min, max, step, handleChange, onKeyDown]
    )

    // Get status colors - MUI-like colors
    const statusColors = useMemo(() => {
      const colors = {
        default: {
          track: '#e0e0e0',
          range: '#1976d2',
          thumb: '#1976d2',
          focus: '#1976d2',
        },
        success: {
          track: '#e0e0e0',
          range: '#2e7d32',
          thumb: '#2e7d32',
          focus: '#2e7d32',
        },
        warning: {
          track: '#e0e0e0',
          range: '#ed6c02',
          thumb: '#ed6c02',
          focus: '#ed6c02',
        },
        error: {
          track: '#e0e0e0',
          range: '#d32f2f',
          thumb: '#d32f2f',
          focus: '#d32f2f',
        },
        info: {
          track: '#e0e0e0',
          range: '#0288d1',
          thumb: '#0288d1',
          focus: '#0288d1',
        },
      }

      return colors[status]
    }, [status])

    // Get size dimensions - Compact like MUI
    const dimensions = useMemo(() => {
      const sizeDimensions = {
        sm: {
          trackHeight: '2px',
          thumbSize: '8px',
          padding: '4px',
          labelFontSize: '0.75rem',
        },
        md: {
          trackHeight: '4px',
          thumbSize: '12px',
          padding: '6px',
          labelFontSize: '0.875rem',
        },
        lg: {
          trackHeight: '6px',
          thumbSize: '16px',
          padding: '8px',
          labelFontSize: '1rem',
        },
      }
      return sizeDimensions[size]
    }, [size])

    // Convert values to SliderValue format
    const sliderValues: SliderValue[] = values.map((value) => ({
      value,
      percentage: getPercentageFromValue(value),
    }))

    const handleTrackClick = useCallback(
      (event: React.MouseEvent) => {
        if (disabled || readOnly) return

        const trackElement = event.currentTarget as HTMLElement
        const trackRect = trackElement.getBoundingClientRect()
        const percentage = ((event.clientX - trackRect.left) / trackRect.width) * 100
        const newValue = getValueFromPercentage(percentage)

        // For range sliders, determine which thumb to move
        if (range && sliderValues.length > 1) {
          const distances = sliderValues.map((sv) => Math.abs(sv.value - newValue))
          const closestIndex = distances.indexOf(Math.min(...distances))
          const newValues = [...values]
          newValues[closestIndex] = newValue
          handleChange(newValues)
        } else {
          handleChange([newValue])
        }
      },
      [disabled, readOnly, range, sliderValues, values, getValueFromPercentage, handleChange]
    )

    // Context value
    const contextValue: SliderContextValue = {
      values: sliderValues,
      range: rangeConfig,
      isRange: range,
      disabled,
      readOnly,
      focused,
      dragging,
      hovered,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      getValueFromPercentage,
      getPercentageFromValue,
      snapToStep,
      formatValue,
      variant,
      size,
      status,
    }

    // Determine if tooltip should be visible
    const shouldShowTooltip =
      showTooltip &&
      (valueLabelDisplay === 'on' ||
        (valueLabelDisplay === 'auto' && (focused || dragging || tooltipVisible)))

    return (
      <SliderContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('relative', className)}
          style={style}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={values[0]}
          aria-valuetext={formatValue(values[0])}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          tabIndex={disabled || readOnly ? -1 : 0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          {...props}
        >
          {label && (
            <div
              className="mb-2 flex items-center gap-2"
              style={{
                color: '#374151',
                fontSize: dimensions.labelFontSize,
                fontWeight: '500',
                marginBottom: '0.5rem',
              }}
            >
              {labelIcon && (
                <span className="flex-shrink-0" style={{ fontSize: '0.875em' }}>
                  {labelIcon}
                </span>
              )}
              <span>{label}</span>
            </div>
          )}

          <div
            ref={trackRef}
            className="relative slider-track"
            role="slider"
            tabIndex={disabled || readOnly ? -1 : 0}
            onMouseDown={handleTrackClick}
            onKeyDown={handleKeyDown}
            style={{
              padding: dimensions.padding,
              position: 'relative',
              width: '100%',
              height: dimensions.trackHeight,
              backgroundColor: statusColors.track,
              borderRadius: '9999px',
              transition:
                transition === 'none' ? 'none' : `all ${transitionDuration}ms ease-in-out`,
              cursor: disabled || readOnly ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              marginBottom: '24px',
              ...(focused && {
                outline: 'none',
                boxShadow: `0 0 0 2px ${statusColors.focus}`,
              }),
            }}
          >
            {/* Background track - only show for non-removed-track variants */}
            {variant !== 'removed-track' && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: statusColors.track,
                  borderRadius: '9999px',
                }}
              />
            )}

            {/* Active range */}
            {sliderValues.length > 0 && variant !== 'removed-track' && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: statusColors.range,
                  borderRadius: '9999px',
                  left: variant === 'inverted-track' ? `${sliderValues[0].percentage}%` : '0%',
                  right:
                    variant === 'inverted-track'
                      ? '0%'
                      : range && sliderValues.length > 1
                        ? `${Math.max(0, 100 - sliderValues[1].percentage)}%`
                        : `${Math.max(0, 100 - sliderValues[0].percentage)}%`,
                }}
              />
            )}

            {/* Marks */}
            {showMarks && (marks || markStep) && (
              <SliderMarks
                marks={marks}
                markStep={markStep}
                markIcons={markIcons}
                renderMark={renderMark}
              />
            )}

            {/* Thumbs */}
            {variant !== 'thumbless' &&
              sliderValues.map((sliderValue, index) => (
                <SliderThumb
                  key={index}
                  value={sliderValue}
                  index={index}
                  renderThumb={renderThumb}
                  showTooltip={shouldShowTooltip}
                  tooltipPosition={tooltipPosition}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onValueChange={(newValue) => {
                    const newValues = [...values]
                    newValues[index] = newValue
                    handleChange(newValues)
                  }}
                  onTooltipVisibilityChange={setTooltipVisible}
                />
              ))}

            {/* Hidden input for form integration */}
            <input
              type="hidden"
              name={name}
              value={values.join(',')}
              required={required}
              disabled={disabled}
            />
          </div>

          {children}
        </div>
      </SliderContext.Provider>
    )
  }
)

Slider.displayName = 'Slider'

// Track Component
export interface SliderTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ className, children, ...props }, ref) => {
    const { disabled, readOnly } = useSlider()

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{
          cursor: disabled || readOnly ? 'not-allowed' : 'pointer',
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SliderTrack.displayName = 'SliderTrack'

// Range Component
export interface SliderRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>(
  ({ className, children, ...props }, ref) => {
    const { values, isRange } = useSlider()

    if (values.length === 0) return null

    const leftPercentage = values[0].percentage
    const rightPercentage = isRange && values.length > 1 ? values[1].percentage : 100

    return (
      <div
        ref={ref}
        className={cn('absolute inset-0', className)}
        style={{
          left: `${leftPercentage}%`,
          right: `${100 - rightPercentage}%`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SliderRange.displayName = 'SliderRange'

// Thumb Component
export interface SliderThumbProps extends React.HTMLAttributes<HTMLDivElement> {
  value: SliderValue
  index: number
  renderThumb?: (value: SliderValue, index: number) => React.ReactNode
  showTooltip?: boolean
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  onValueChange?: (value: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  onTooltipVisibilityChange?: (visible: boolean) => void
}

const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  (
    {
      className,
      value,
      index,
      renderThumb,
      showTooltip = true,
      tooltipPosition = 'top',
      onValueChange,
      onDragStart,
      onDragEnd,
      onTooltipVisibilityChange,
      ...props
    },
    _ref
  ) => {
    const { disabled, readOnly, getValueFromPercentage, formatValue, size, status } = useSlider()

    const [isDragging, setIsDragging] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [hovered, setHovered] = useState(false)
    const thumbRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled || readOnly) return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
        onDragStart?.()
      },
      [disabled, readOnly, onDragStart]
    )

    const handleMouseUp = useCallback(() => {
      if (isDragging) {
        setIsDragging(false)
        onDragEnd?.()
      }
    }, [isDragging, onDragEnd])

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !onValueChange) return

        const trackElement = document.querySelector('.slider-track') as HTMLElement
        if (!trackElement) return

        const trackRect = trackElement.getBoundingClientRect()
        const percentage = Math.max(
          0,
          Math.min(100, ((e.clientX - trackRect.left) / trackRect.width) * 100)
        )
        const newValue = getValueFromPercentage(percentage)

        // Prevent unnecessary updates for small movements
        const currentValue = value.value
        if (Math.abs(newValue - currentValue) > 0.1) {
          onValueChange(newValue)
        }
      },
      [isDragging, onValueChange, getValueFromPercentage, value.value]
    )

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }
      }
    }, [isDragging, handleMouseMove, handleMouseUp])

    // Get size dimensions
    const dimensions = useMemo(() => {
      const sizeDimensions = {
        sm: { thumbSize: '8px' },
        md: { thumbSize: '12px' },
        lg: { thumbSize: '16px' },
      }
      return sizeDimensions[size]
    }, [size])

    // Get status colors
    const statusColors = useMemo(() => {
      const colors = {
        default: { thumb: '#1976d2' },
        success: { thumb: '#2e7d32' },
        warning: { thumb: '#ed6c02' },
        error: { thumb: '#d32f2f' },
        info: { thumb: '#0288d1' },
      }
      return colors[status]
    }, [status])

    const thumbStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: `${Math.max(0, Math.min(100, value.percentage))}%`,
      transform: isDragging
        ? 'translate(-50%, -50%) scale(1.2)'
        : hovered && !disabled
          ? 'translate(-50%, -50%) scale(1.1)'
          : 'translate(-50%, -50%)',
      width: dimensions.thumbSize,
      height: dimensions.thumbSize,
      backgroundColor: statusColors.thumb,
      border: '2px solid #ffffff',
      borderRadius: '50%',
      boxShadow: isDragging
        ? '0 0 0 8px rgba(25, 118, 210, 0.16)'
        : hovered && !disabled
          ? '0 0 0 6px rgba(25, 118, 210, 0.12)'
          : '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      cursor: disabled || readOnly ? 'not-allowed' : 'grab',
      zIndex: isDragging ? 10 : 1,
      transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    const handleTooltipVisibilityChange = (visible: boolean) => {
      setTooltipVisible(visible)
      onTooltipVisibilityChange?.(visible)
    }

    return (
      <>
        <div
          ref={thumbRef}
          className={cn('absolute', className)}
          style={thumbStyles}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => {
            setHovered(true)
            handleTooltipVisibilityChange(true)
          }}
          onMouseLeave={() => {
            setHovered(false)
            handleTooltipVisibilityChange(false)
          }}
          {...props}
        >
          {renderThumb ? renderThumb(value, index) : null}
        </div>

        {showTooltip && tooltipVisible && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: tooltipPosition === 'bottom' ? '100%' : '-30px',
              left: `${value.percentage}%`,
              transform: 'translateX(-50%)',
              backgroundColor: '#374151',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              zIndex: 20,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            {formatValue(value.value)}
          </div>
        )}
      </>
    )
  }
)

SliderThumb.displayName = 'SliderThumb'

// Label Component
export interface SliderLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const SliderLabel = forwardRef<HTMLLabelElement, SliderLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { disabled, readOnly } = useSlider()

    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none',
          disabled && 'cursor-not-allowed opacity-50',
          readOnly && 'cursor-default',
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)

SliderLabel.displayName = 'SliderLabel'

// Input Component
export interface SliderInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  index?: number
}

const SliderInput = forwardRef<HTMLInputElement, SliderInputProps>(
  ({ className, index = 0, ...props }, ref) => {
    const { values, disabled, readOnly, onChange } = useSlider()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      const newValues = [...values.map((v) => v.value)]
      newValues[index] = newValue
      onChange(newValues)
    }

    return (
      <input
        ref={ref}
        type="number"
        className={cn('sr-only', className)}
        value={values[index]?.value || 0}
        onChange={handleChange}
        disabled={disabled || readOnly}
        {...props}
      />
    )
  }
)

SliderInput.displayName = 'SliderInput'

// Marks Component
export interface SliderMarksProps extends React.HTMLAttributes<HTMLDivElement> {
  marks?: SliderMark[]
  markStep?: number
  markIcons?: boolean
  renderMark?: (mark: SliderMark) => React.ReactNode
}

const SliderMarks = forwardRef<HTMLDivElement, SliderMarksProps>(
  ({ className, marks, markStep, markIcons, renderMark, ...props }, ref) => {
    const { range, getPercentageFromValue } = useSlider()

    const markPositions = useMemo(() => {
      if (marks) {
        return marks.map((mark) => ({
          ...mark,
          percentage: getPercentageFromValue(mark.value),
        }))
      }

      if (markStep) {
        const positions = []
        for (let i = range.min; i <= range.max; i += markStep) {
          positions.push({
            value: i,
            percentage: getPercentageFromValue(i),
          })
        }
        return positions
      }

      return []
    }, [marks, markStep, range, getPercentageFromValue])

    return (
      <div ref={ref} className={cn('absolute inset-0', className)} {...props}>
        {markPositions.map((mark, index) => (
          <div
            key={index}
            className="absolute top-0 w-1 h-full bg-gray-300 transform -translate-x-1/2"
            style={{ left: `${mark.percentage}%` }}
            onClick={mark.onClick}
          >
            {renderMark ? (
              renderMark(mark)
            ) : (
              <div
                className="mt-4 text-xs text-gray-600 text-center whitespace-nowrap"
                style={{
                  minWidth: '40px',
                  marginLeft: '8px',
                  transform: 'rotate(0deg)',
                  transformOrigin: 'center',
                }}
              >
                {mark.icon && markIcons && (
                  <div className="mb-1 flex justify-center">
                    <span style={{ fontSize: '0.75em' }}>{mark.icon}</span>
                  </div>
                )}
                {mark.label}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
)

SliderMarks.displayName = 'SliderMarks'

// Create compound component type
interface SliderComponent
  extends React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>> {
  Track: typeof SliderTrack
  Range: typeof SliderRange
  Thumb: typeof SliderThumb
  Label: typeof SliderLabel
  Input: typeof SliderInput
  Marks: typeof SliderMarks
}

// Attach sub-components
const SliderComponent = Slider as SliderComponent
SliderComponent.Track = SliderTrack
SliderComponent.Range = SliderRange
SliderComponent.Thumb = SliderThumb
SliderComponent.Label = SliderLabel
SliderComponent.Input = SliderInput
SliderComponent.Marks = SliderMarks

export { SliderComponent as Slider }
