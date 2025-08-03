import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
import { cn } from '@/utils/cn'

// ============================================================================
// Types and Interfaces
// ============================================================================

export type ProgressVariant =
  | 'linear'
  | 'circular'
  | 'dashed'
  | 'striped'
  | 'segmented'
  | 'pill'
  | 'bordered'
  | 'minimal'
  | 'bar-with-label'
  | 'overlay-style'
  | 'inverse'

export type ProgressSize = 'sm' | 'md' | 'lg'

export type ProgressStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'paused'
  | 'complete'
  | 'failed'

export type ProgressTransition = 'none' | 'smooth' | 'bounce' | 'elastic' | 'spring'

export type ProgressLabelPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'overlay'
  | 'inside'
  | 'outside'

export interface ProgressSegment {
  id: string
  value: number
  color?: string
  label?: string
  status?: ProgressStatus
}

export interface ProgressThreshold {
  value: number
  color?: string
  label?: string
  callback?: (value: number) => void
}

export interface ProgressSimulationConfig {
  enabled: boolean
  duration?: number
  increment?: number
  interval?: number
  autoComplete?: boolean
  pauseOnHover?: boolean
}

// Extended CSS Properties type for custom CSS properties
type ExtendedCSSProperties = React.CSSProperties & Record<string, string | number>

// Context Types
export interface ProgressContextValue {
  // Core state
  value: number
  bufferValue?: number
  segments: ProgressSegment[]
  isIndeterminate: boolean
  status: ProgressStatus

  // Configuration
  variant: ProgressVariant
  size: ProgressSize
  transition: ProgressTransition

  // Styling
  trackColor?: string
  barColor?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  height?: string
  thickness?: string
  diameter?: string

  // Enhanced styling
  gradient?: string
  trackGradient?: string
  barGradient?: string
  textColor?: string
  percentageColor?: string
  progressColor?: string
  trackBorderColor?: string
  barBorderColor?: string
  trackBorderWidth?: string
  barBorderWidth?: string
  trackOpacity?: number
  barOpacity?: number
  animationDuration?: string
  customCSS?: React.CSSProperties
  boxShadow?: string

  // Typography
  labelFontSize?: string
  labelFontWeight?: string
  labelColor?: string
  labelSize?: ProgressSize
  labelPosition?: ProgressLabelPosition

  // Functions
  onValueChange?: (value: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
  onThresholdCross?: (threshold: ProgressThreshold, value: number) => void

  // Thresholds
  thresholds: ProgressThreshold[]

  // Custom renders
  renderLabel?: (value: number, status: ProgressStatus) => React.ReactNode
  renderIndicator?: (status: ProgressStatus, isIndeterminate: boolean) => React.ReactNode

  // Styling
  barShadow?: string

  // Loading/Status text
  loadingText?: string | React.ReactNode
  showLoadingText?: boolean
  loadingTextPosition?: 'center' | 'bottom' | 'top'
  customLoadingContent?: React.ReactNode

  // Indicator control
  hideIndicator?: boolean

  // Accessibility
  ariaLabel?: string
  ariaDescribedBy?: string

  // IDs for accessibility
  trackId: string
  barId: string
  labelId: string
  descriptionId: string
}

// Component Props
export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onError'> {
  // Core functionality
  value?: number
  bufferValue?: number
  segments?: ProgressSegment[]
  isIndeterminate?: boolean

  // Configuration
  variant?: ProgressVariant
  size?: ProgressSize
  status?: ProgressStatus
  transition?: ProgressTransition

  // Simulation
  simulation?: ProgressSimulationConfig

  // Thresholds
  thresholds?: ProgressThreshold[]

  // Styling
  trackColor?: string
  barColor?: string
  bufferColor?: string
  secondaryBarColor?: string
  _secondaryBarColor?: string
  completeColor?: string
  _completeColor?: string
  errorColor?: string
  _errorColor?: string
  stripeColor?: string
  _stripeColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  _borderWidth?: string
  borderRadius?: string
  boxShadow?: string
  barShadow?: string
  _barShadow?: string

  // Enhanced styling props
  gradient?: string
  trackGradient?: string
  barGradient?: string
  textColor?: string
  percentageColor?: string
  progressColor?: string
  trackBorderColor?: string
  barBorderColor?: string
  trackBorderWidth?: string
  barBorderWidth?: string
  trackOpacity?: number
  barOpacity?: number
  animationDuration?: string
  customCSS?: React.CSSProperties

  // Focus styling
  focusRingColor?: string
  _focusRingColor?: string
  focusRingWidth?: string
  _focusRingWidth?: string
  focusRingOffset?: string
  _focusRingOffset?: string
  focusBoxShadow?: string
  _focusBoxShadow?: string

  // Dimensions
  height?: string
  thickness?: string
  _thickness?: string
  diameter?: string
  width?: string

  // Typography
  labelFontSize?: string
  labelFontWeight?: string
  labelFontFamily?: string
  _labelFontFamily?: string
  labelColor?: string
  labelSize?: ProgressSize
  labelPosition?: ProgressLabelPosition
  descriptionFontSize?: string
  _descriptionFontSize?: string
  descriptionColor?: string
  _descriptionColor?: string

  // Spacing
  padding?: string
  margin?: string
  gap?: string
  _gap?: string

  // Custom render functions
  renderLabel?: (value: number, status: ProgressStatus) => React.ReactNode
  _renderLabel?: (value: number, status: ProgressStatus) => React.ReactNode
  renderTrack?: () => React.ReactNode
  _renderTrack?: () => React.ReactNode
  renderBar?: (value: number) => React.ReactNode
  _renderBar?: (value: number) => React.ReactNode
  renderThreshold?: (threshold: ProgressThreshold) => React.ReactNode
  _renderThreshold?: (threshold: ProgressThreshold) => React.ReactNode
  renderIndicator?: (status: ProgressStatus, isIndeterminate: boolean) => React.ReactNode
  _renderIndicator?: (status: ProgressStatus, isIndeterminate: boolean) => React.ReactNode
  renderTooltip?: (value: number, status: ProgressStatus) => React.ReactNode
  _renderTooltip?: (value: number, status: ProgressStatus) => React.ReactNode

  // Event handlers
  onChange?: (value: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
  onThresholdCross?: (threshold: ProgressThreshold, value: number) => void
  onPause?: () => void
  _onPause?: () => void
  onResume?: () => void
  _onResume?: () => void
  onCancel?: () => void
  _onCancel?: () => void

  // Accessibility
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string

  // Loading/Status text
  loadingText?: string | React.ReactNode
  showLoadingText?: boolean
  loadingTextPosition?: 'center' | 'bottom' | 'top'
  customLoadingContent?: React.ReactNode

  // Indicator control
  hideIndicator?: boolean

  // Children
  children?: React.ReactNode
}

export interface ProgressTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional props can be added here in the future */
  __placeholder?: never
}

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  segment?: ProgressSegment
  /** Additional props can be added here in the future */
  __placeholder?: never
}

export interface ProgressLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  format?: 'percentage' | 'fraction' | 'custom'
  showValue?: boolean
  customContent?: React.ReactNode
}

export interface ProgressValueDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  content?: string
}

export interface ProgressThresholdMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold: ProgressThreshold
}

export interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'spinner' | 'check' | 'error' | 'custom'
  customIcon?: React.ReactNode
}

export interface ProgressContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional props can be added here in the future */
  __placeholder?: never
}

// ============================================================================
// Context
// ============================================================================

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a Progress component')
  }
  return context
}

// ============================================================================
// Utility Functions
// ============================================================================

const clampValue = (value: number, min = 0, max = 100): number => {
  return Math.max(min, Math.min(max, value))
}

const getStatusColor = (status: ProgressStatus): string => {
  const statusColors = {
    default: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    paused: '#6b7280',
    complete: '#10b981',
    failed: '#ef4444',
  }
  return statusColors[status] || statusColors.default
}

const getSizeStyles = (size: ProgressSize, variant: ProgressVariant) => {
  if (variant === 'circular') {
    const sizes = {
      sm: { diameter: '32px', strokeWidth: '2px' },
      md: { diameter: '48px', strokeWidth: '3px' },
      lg: { diameter: '64px', strokeWidth: '4px' },
    }
    return sizes[size]
  }

  const sizes = {
    sm: { height: '4px', fontSize: '12px' },
    md: { height: '8px', fontSize: '14px' },
    lg: { height: '12px', fontSize: '16px' },
  }
  return sizes[size]
}

const isCircularSizeStyles = (
  styles: Record<string, string>
): styles is { diameter: string; strokeWidth: string } => {
  return 'diameter' in styles
}

// ============================================================================
// Sub-components
// ============================================================================

const ProgressTrack = React.forwardRef<HTMLDivElement, ProgressTrackProps>(function ProgressTrack(
  { className, ...props },
  ref
) {
  const context = useProgress()

  const trackStyles: ExtendedCSSProperties = useMemo(() => {
    const baseStyles: ExtendedCSSProperties = {}

    if (context.backgroundColor) baseStyles.backgroundColor = context.backgroundColor
    if (context.trackColor) baseStyles.backgroundColor = context.trackColor
    if (context.trackGradient) baseStyles.background = context.trackGradient
    if (context.borderColor) baseStyles.borderColor = context.borderColor
    if (context.trackBorderColor) baseStyles.borderColor = context.trackBorderColor
    if (context.trackBorderWidth) baseStyles.borderWidth = context.trackBorderWidth
    if (context.borderRadius) baseStyles.borderRadius = context.borderRadius
    if (context.height && context.variant !== 'circular') baseStyles.height = context.height
    if (context.boxShadow) baseStyles.boxShadow = context.boxShadow
    if (context.trackOpacity !== undefined) baseStyles.opacity = context.trackOpacity
    if (context.animationDuration) baseStyles.transitionDuration = context.animationDuration

    // Apply custom CSS
    if (context.customCSS) {
      Object.assign(baseStyles, context.customCSS)
    }

    return baseStyles
  }, [context])

  if (context.variant === 'circular') {
    const sizeStyles = getSizeStyles(context.size, context.variant)
    const diameter = isCircularSizeStyles(sizeStyles) ? sizeStyles.diameter : '48px'
    const size = context.diameter || diameter

    return (
      <div
        ref={ref}
        className={cn('relative flex items-center justify-center', className)}
        style={{ width: size, height: size, ...trackStyles }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          viewBox={`0 0 ${parseInt(size)} ${parseInt(size)}`}
        >
          <circle
            cx="50%"
            cy="50%"
            r={`${(parseInt(size) - 8) / 2}`}
            fill="none"
            stroke={context.trackColor || '#e5e7eb'}
            strokeWidth="4"
          />
        </svg>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      id={context.trackId}
      className={cn(
        'relative w-full overflow-hidden',
        'bg-gray-200 dark:bg-gray-700',
        context.variant === 'pill' && 'rounded-full',
        context.variant === 'bordered' && 'border border-gray-300',
        context.variant === 'minimal' && 'bg-transparent',
        className
      )}
      style={trackStyles}
      {...props}
    />
  )
})

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { className, value: propValue, segment, ...props },
  ref
) {
  const context = useProgress()
  const value = propValue ?? context.value

  const barStyles: ExtendedCSSProperties = useMemo(() => {
    const baseStyles: ExtendedCSSProperties = {}

    const color =
      segment?.color || context.barColor || context.progressColor || getStatusColor(context.status)

    // Handle gradient or solid color
    if (context.barGradient || context.gradient) {
      baseStyles.background = context.barGradient || context.gradient
    } else {
      baseStyles.backgroundColor = color
    }

    if (context.barBorderColor) baseStyles.borderColor = context.barBorderColor
    if (context.barBorderWidth) baseStyles.borderWidth = context.barBorderWidth
    if (context.barShadow) baseStyles.boxShadow = context.barShadow
    if (context.borderRadius) baseStyles.borderRadius = context.borderRadius
    if (context.barOpacity !== undefined) baseStyles.opacity = context.barOpacity

    // Transition styles
    const duration = context.animationDuration || '0.3s'
    if (context.transition !== 'none') {
      const transitions = {
        smooth: `all ${duration} ease-in-out`,
        bounce: `all ${duration} cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
        elastic: `all ${duration} cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        spring: `all ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      }
      baseStyles.transition = transitions[context.transition]
    }

    return baseStyles
  }, [context, segment])

  if (context.variant === 'circular') {
    const sizeStyles = getSizeStyles(context.size, context.variant)
    const diameter = isCircularSizeStyles(sizeStyles) ? sizeStyles.diameter : '48px'
    const size = context.diameter || diameter
    const radius = (parseInt(size) - 8) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <svg
        ref={ref as React.LegacyRef<SVGSVGElement>}
        width={size}
        height={size}
        className="absolute inset-0 transform -rotate-90"
        viewBox={`0 0 ${parseInt(size)} ${parseInt(size)}`}
      >
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={barStyles.backgroundColor as string}
          strokeWidth="4"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            context.transition !== 'none' && 'transition-all duration-300 ease-in-out',
            className
          )}
        />
      </svg>
    )
  }

  if (context.isIndeterminate) {
    return (
      <div
        ref={ref}
        id={context.barId}
        className={cn(
          'absolute inset-y-0 left-0',
          'bg-current animate-pulse',
          context.variant === 'striped' &&
            'bg-gradient-to-r from-transparent via-current to-transparent',
          className
        )}
        style={{
          ...barStyles,
          width: '40%',
          animation: 'progress-indeterminate 2s ease-in-out infinite',
        }}
        {...props}
      />
    )
  }

  const clampedValue = clampValue(value)

  return (
    <div
      ref={ref}
      id={context.barId}
      className={cn(
        'absolute inset-y-0 left-0',
        'bg-current',
        context.variant === 'striped' &&
          'bg-gradient-to-r from-current to-current bg-[length:20px_20px]',
        context.variant === 'dashed' && 'border-r-2 border-dashed border-white',
        className
      )}
      style={{
        ...barStyles,
        width: `${clampedValue}%`,
      }}
      {...props}
    />
  )
})

const ProgressLabel = React.forwardRef<HTMLSpanElement, ProgressLabelProps>(function ProgressLabel(
  { className, format = 'percentage', showValue = true, customContent, ...props },
  ref
) {
  const context = useProgress()

  const labelStyles: ExtendedCSSProperties = useMemo(() => {
    const baseStyles: ExtendedCSSProperties = {}

    // Font styles
    if (context.labelFontSize) baseStyles.fontSize = context.labelFontSize
    if (context.labelFontWeight) baseStyles.fontWeight = context.labelFontWeight
    if (context.labelColor) baseStyles.color = context.labelColor
    if (context.textColor) baseStyles.color = context.textColor
    if (context.percentageColor) baseStyles.color = context.percentageColor

    // Size-based font size if no explicit font size is set
    if (!context.labelFontSize && context.labelSize) {
      const sizeFontMap = {
        sm: '12px',
        md: '14px',
        lg: '16px',
      }
      baseStyles.fontSize = sizeFontMap[context.labelSize]
    }

    // Position-based styling
    const position = context.labelPosition || 'outside'

    if (
      position === 'overlay' ||
      position === 'inside' ||
      context.variant === 'bar-with-label' ||
      context.variant === 'overlay-style'
    ) {
      baseStyles.position = 'absolute'
      baseStyles.top = '50%'
      baseStyles.left = '50%'
      baseStyles.transform = 'translate(-50%, -50%)'
      baseStyles.zIndex = '10'
      baseStyles.pointerEvents = 'none'
      if (position === 'inside' || context.variant === 'bar-with-label') {
        baseStyles.color = baseStyles.color || '#ffffff'
      }
    }

    return baseStyles
  }, [context])

  const getFormattedValue = () => {
    if (customContent) return customContent
    if (!showValue) return null
    if (context.isIndeterminate) return 'Loading...'

    const value = clampValue(context.value)

    switch (format) {
      case 'fraction':
        return `${Math.round(value)}/100`
      case 'percentage':
      default:
        return `${Math.round(value)}%`
    }
  }

  if (context.renderLabel) {
    return (
      <span
        ref={ref}
        id={context.labelId}
        className={cn('text-sm font-medium', className)}
        style={labelStyles}
        {...props}
      >
        {context.renderLabel(context.value, context.status)}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      id={context.labelId}
      className={cn(
        'text-sm font-medium',
        context.variant === 'circular' && 'absolute inset-0 flex items-center justify-center',
        className
      )}
      style={labelStyles}
      {...props}
    >
      {getFormattedValue()}
    </span>
  )
})

const ProgressValueDescription = React.forwardRef<HTMLSpanElement, ProgressValueDescriptionProps>(
  function ProgressValueDescription({ className, content, ...props }, ref) {
    const context = useProgress()

    const getDescription = () => {
      if (content) return content
      if (context.isIndeterminate) return 'Loading in progress'

      const value = clampValue(context.value)
      return `${Math.round(value)}% complete`
    }

    return (
      <span ref={ref} id={context.descriptionId} className={cn('sr-only', className)} {...props}>
        {getDescription()}
      </span>
    )
  }
)

const ProgressThresholdMarker = React.forwardRef<HTMLDivElement, ProgressThresholdMarkerProps>(
  function ProgressThresholdMarker({ className, threshold, ...props }, ref) {
    const context = useProgress()

    if (context.variant === 'circular') {
      // For circular progress, thresholds could be shown as tick marks
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'absolute top-0 bottom-0 w-0.5 z-10',
          'bg-gray-400 dark:bg-gray-500',
          className
        )}
        style={{
          left: `${threshold.value}%`,
          backgroundColor: threshold.color,
        }}
        title={threshold.label || `${threshold.value}%`}
        {...props}
      />
    )
  }
)

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  function ProgressIndicator({ className, type = 'spinner', customIcon, ...props }, ref) {
    const context = useProgress()

    const getIndicatorContent = () => {
      if (customIcon) return customIcon
      if (context.renderIndicator) {
        return context.renderIndicator(context.status, context.isIndeterminate)
      }

      switch (type) {
        case 'check':
          return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )
        case 'error':
          return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )
        case 'spinner':
        default:
          return (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )
      }
    }

    if (context.status === 'complete' || context.status === 'failed' || context.isIndeterminate) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center',
            context.variant === 'circular' && 'absolute inset-0',
            className
          )}
          {...props}
        >
          {getIndicatorContent()}
        </div>
      )
    }

    return null
  }
)

const ProgressContainer = React.forwardRef<HTMLDivElement, ProgressContainerProps>(
  function ProgressContainer({ className, children, ...props }, ref) {
    const context = useProgress()

    return (
      <div
        ref={ref}
        className={cn(
          'relative',
          context.variant === 'circular' ? 'inline-flex' : 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// ============================================================================
// Main Progress Component
// ============================================================================

const ProgressComponent = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      // Core functionality
      value = 0,
      bufferValue,
      segments = [],
      isIndeterminate = false,

      // Configuration
      variant = 'linear',
      size = 'md',
      status = 'default',
      transition = 'smooth',

      // Simulation
      simulation,

      // Thresholds
      thresholds = [],

      // Styling
      trackColor,
      barColor,
      bufferColor,
      _secondaryBarColor,
      _completeColor,
      _errorColor,
      _stripeColor,
      backgroundColor,
      borderColor,
      _borderWidth,
      borderRadius,
      boxShadow,
      _barShadow,

      // Enhanced styling props
      gradient,
      trackGradient,
      barGradient,
      textColor,
      percentageColor,
      progressColor,
      trackBorderColor,
      barBorderColor,
      trackBorderWidth,
      barBorderWidth,
      trackOpacity,
      barOpacity,
      animationDuration,
      customCSS,

      // Focus styling
      _focusRingColor,
      _focusRingWidth,
      _focusRingOffset,
      _focusBoxShadow,

      // Dimensions
      height,
      _thickness,
      diameter,
      width,

      // Typography
      labelFontSize,
      labelFontWeight,
      _labelFontFamily,
      labelColor,
      labelSize,
      labelPosition = 'outside',
      _descriptionFontSize,
      _descriptionColor,

      // Spacing
      padding,
      margin,
      _gap,

      // Custom render functions
      _renderLabel,
      _renderTrack,
      _renderBar,
      _renderThreshold,
      _renderIndicator,
      _renderTooltip,

      // Event handlers
      onChange,
      onComplete,
      onError,
      onThresholdCross,
      _onPause,
      _onResume,
      _onCancel,

      // Loading/Status text
      loadingText,
      showLoadingText = false,
      loadingTextPosition = 'center',
      customLoadingContent,

      // Indicator control
      hideIndicator = false,

      // Accessibility
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,

      // Standard props
      className,
      children,
      ...props
    },
    ref
  ) => {
    // ============================================================================
    // State and IDs
    // ============================================================================

    const trackId = useId()
    const barId = useId()
    const labelId = useId()
    const descriptionId = useId()

    const [currentValue, setCurrentValue] = useState(value)
    const [currentStatus, setCurrentStatus] = useState(status)
    const [simulationState, setSimulationState] = useState({
      isRunning: false,
      isPaused: false,
      intervalId: null as NodeJS.Timeout | null,
    })

    // ============================================================================
    // Simulation Logic
    // ============================================================================

    const startSimulation = useCallback(() => {
      if (!simulation?.enabled || simulationState.isRunning) return

      const { increment = 1, interval = 50, autoComplete = true } = simulation

      const incrementValue = increment

      const intervalId = setInterval(() => {
        setCurrentValue((prev) => {
          const newValue = prev + incrementValue

          if (newValue >= 100) {
            setSimulationState((state) => ({ ...state, isRunning: false }))
            if (autoComplete) {
              setCurrentStatus('complete')
              onComplete?.()
            }
            return 100
          }

          return newValue
        })
      }, interval)

      setSimulationState((state) => ({
        ...state,
        isRunning: true,
        intervalId,
      }))
    }, [simulation, simulationState.isRunning, onComplete])

    // const pauseSimulation = useCallback(() => {
    //   if (simulationState.intervalId) {
    //     clearInterval(simulationState.intervalId)
    //     setSimulationState(state => ({
    //       ...state,
    //       isRunning: false,
    //       isPaused: true,
    //       intervalId: null
    //     }))
    //     setCurrentStatus('paused')
    //     onPause?.()
    //   }
    // }, [simulationState.intervalId, onPause])

    // const resumeSimulation = useCallback(() => {
    //   if (simulationState.isPaused) {
    //     setSimulationState(state => ({ ...state, isPaused: false }))
    //     setCurrentStatus('default')
    //     startSimulation()
    //     onResume?.()
    //   }
    // }, [simulationState.isPaused, startSimulation, onResume])

    // const cancelSimulation = useCallback(() => {
    //   if (simulationState.intervalId) {
    //     clearInterval(simulationState.intervalId)
    //   }
    //   setSimulationState({
    //     isRunning: false,
    //     isPaused: false,
    //     intervalId: null
    //   })
    //   setCurrentValue(0)
    //   setCurrentStatus('default')
    //   onCancel?.()
    // }, [simulationState.intervalId, onCancel])

    // ============================================================================
    // Effects
    // ============================================================================

    // Sync external value with internal state
    useEffect(() => {
      if (!simulation?.enabled) {
        setCurrentValue(value)
      }
    }, [value, simulation?.enabled])

    // Sync external status with internal state
    useEffect(() => {
      if (!simulation?.enabled) {
        setCurrentStatus(status)
      }
    }, [status, simulation?.enabled])

    // Auto-start simulation
    useEffect(() => {
      if (simulation?.enabled && !simulationState.isRunning && !simulationState.isPaused) {
        startSimulation()
      }

      return () => {
        if (simulationState.intervalId) {
          clearInterval(simulationState.intervalId)
        }
      }
    }, [
      simulation?.enabled,
      startSimulation,
      simulationState.isRunning,
      simulationState.isPaused,
      simulationState.intervalId,
    ])

    // Threshold crossing detection
    useEffect(() => {
      thresholds.forEach((threshold) => {
        if (currentValue >= threshold.value && onThresholdCross) {
          threshold.callback?.(currentValue)
          onThresholdCross(threshold, currentValue)
        }
      })
    }, [currentValue, thresholds, onThresholdCross])

    // Value change callback
    useEffect(() => {
      onChange?.(currentValue)
    }, [currentValue, onChange])

    // Completion detection
    useEffect(() => {
      if (currentValue >= 100 && currentStatus !== 'complete') {
        setCurrentStatus('complete')
        onComplete?.()
      }
    }, [currentValue, currentStatus, onComplete])

    // ============================================================================
    // Context Value
    // ============================================================================

    const contextValue: ProgressContextValue = useMemo(
      () => ({
        // Core state
        value: currentValue,
        bufferValue,
        segments,
        isIndeterminate,
        status: currentStatus,

        // Configuration
        variant,
        size,
        transition,

        // Styling
        trackColor,
        barColor,
        backgroundColor,
        borderColor,
        borderRadius,
        height,
        diameter,
        boxShadow,

        // Enhanced styling
        gradient,
        trackGradient,
        barGradient,
        textColor,
        percentageColor,
        progressColor,
        trackBorderColor,
        barBorderColor,
        trackBorderWidth,
        barBorderWidth,
        trackOpacity,
        barOpacity,
        animationDuration,
        customCSS,

        // Typography
        labelFontSize,
        labelFontWeight,
        labelColor,
        labelSize,
        labelPosition,

        // Functions
        onValueChange: onChange,
        onComplete,
        onError,
        onThresholdCross,

        // Thresholds
        thresholds,

        // Loading/Status text
        loadingText,
        showLoadingText,
        loadingTextPosition,
        customLoadingContent,

        // Indicator control
        hideIndicator,

        // Accessibility
        ariaLabel,
        ariaDescribedBy,

        // IDs
        trackId,
        barId,
        labelId,
        descriptionId,
      }),
      [
        currentValue,
        bufferValue,
        segments,
        isIndeterminate,
        currentStatus,
        variant,
        size,
        transition,
        trackColor,
        barColor,
        backgroundColor,
        borderColor,
        borderRadius,
        height,
        diameter,
        boxShadow,
        gradient,
        trackGradient,
        barGradient,
        textColor,
        percentageColor,
        progressColor,
        trackBorderColor,
        barBorderColor,
        trackBorderWidth,
        barBorderWidth,
        trackOpacity,
        barOpacity,
        animationDuration,
        customCSS,
        labelFontSize,
        labelFontWeight,
        labelColor,
        labelSize,
        labelPosition,
        onChange,
        onComplete,
        onError,
        onThresholdCross,
        thresholds,
        loadingText,
        showLoadingText,
        loadingTextPosition,
        customLoadingContent,
        hideIndicator,
        ariaLabel,
        ariaDescribedBy,
        trackId,
        barId,
        labelId,
        descriptionId,
      ]
    )

    // ============================================================================
    // Styles
    // ============================================================================

    const containerStyles: ExtendedCSSProperties = useMemo(() => {
      const baseStyles: ExtendedCSSProperties = {}

      if (width) baseStyles.width = width
      if (padding) baseStyles.padding = padding
      if (margin) baseStyles.margin = margin
      if (boxShadow) baseStyles.boxShadow = boxShadow

      return baseStyles
    }, [width, padding, margin, boxShadow])

    const sizeStyles = getSizeStyles(size, variant)
    const defaultHeight = isCircularSizeStyles(sizeStyles) ? undefined : sizeStyles.height

    // ============================================================================
    // Render
    // ============================================================================

    return (
      <ProgressContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'relative',
            variant === 'circular' ? 'inline-flex items-center justify-center relative' : 'w-full',
            className
          )}
          style={{
            ...containerStyles,
            ...(!variant.includes('circular') && { height: height || defaultHeight }),
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isIndeterminate ? undefined : Math.round(currentValue)}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy || descriptionId}
          {...props}
        >
          {children || (
            <>
              <ProgressTrack />
              <ProgressBar />
              {bufferValue && (
                <ProgressBar
                  value={bufferValue}
                  className="opacity-50"
                  style={{ backgroundColor: bufferColor }}
                />
              )}
              {segments.map((segment) => (
                <ProgressBar key={segment.id} segment={segment} value={segment.value} />
              ))}
              {thresholds.map((threshold, index) => (
                <ProgressThresholdMarker key={index} threshold={threshold} />
              ))}
              {/* Circular progress loading text */}
              {variant === 'circular' && showLoadingText && (
                <div
                  className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    loadingTextPosition === 'center' && 'text-center',
                    'pointer-events-none z-10'
                  )}
                  style={{
                    ...(textColor && { color: textColor }),
                    ...(percentageColor && { color: percentageColor }),
                  }}
                >
                  {customLoadingContent || (
                    <span className="text-sm font-medium">
                      {isIndeterminate
                        ? loadingText || 'Loading...'
                        : loadingText || `${Math.round(currentValue)}%`}
                    </span>
                  )}
                </div>
              )}
              {(() => {
                const position = labelPosition || 'outside'
                const isOverlayPosition =
                  position === 'overlay' ||
                  position === 'inside' ||
                  variant === 'bar-with-label' ||
                  variant === 'overlay-style'

                if (isOverlayPosition) {
                  return <ProgressLabel />
                }

                switch (position) {
                  case 'top':
                    return (
                      <>
                        <div className="flex justify-between items-center mb-3">
                          <ProgressLabel />
                          <ProgressValueDescription />
                        </div>
                      </>
                    )
                  case 'bottom':
                  case 'outside':
                  default:
                    return (
                      <div className="flex justify-between items-center mt-2 mb-2">
                        <ProgressLabel />
                        <ProgressValueDescription />
                      </div>
                    )
                  case 'left':
                    return (
                      <div className="flex items-center gap-3 mb-2">
                        <ProgressLabel />
                        <div className="flex-1" />
                      </div>
                    )
                  case 'right':
                    return (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1" />
                        <ProgressLabel />
                      </div>
                    )
                }
              })()}
              {!hideIndicator && <ProgressIndicator />}
            </>
          )}
        </div>
      </ProgressContext.Provider>
    )
  }
)

ProgressComponent.displayName = 'Progress'

// ============================================================================
// Attach Sub-components
// ============================================================================

type ProgressWithSubcomponentsType = typeof ProgressComponent & {
  Track: typeof ProgressTrack
  Bar: typeof ProgressBar
  Label: typeof ProgressLabel
  ValueDescription: typeof ProgressValueDescription
  ThresholdMarker: typeof ProgressThresholdMarker
  Indicator: typeof ProgressIndicator
  Container: typeof ProgressContainer
}

const ProgressWithSubcomponents = ProgressComponent as ProgressWithSubcomponentsType

ProgressWithSubcomponents.Track = ProgressTrack
ProgressWithSubcomponents.Bar = ProgressBar
ProgressWithSubcomponents.Label = ProgressLabel
ProgressWithSubcomponents.ValueDescription = ProgressValueDescription
ProgressWithSubcomponents.ThresholdMarker = ProgressThresholdMarker
ProgressWithSubcomponents.Indicator = ProgressIndicator
ProgressWithSubcomponents.Container = ProgressContainer

// ============================================================================
// Exports
// ============================================================================

export { ProgressWithSubcomponents as Progress }
export {
  ProgressTrack,
  ProgressBar,
  ProgressLabel,
  ProgressValueDescription,
  ProgressThresholdMarker,
  ProgressIndicator,
  ProgressContainer,
}
