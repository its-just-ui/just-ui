import React, { createContext, useContext, forwardRef, memo } from 'react'
import { cn } from '@/utils'

/**
 * Represents a single step in the stepper component
 */
export interface StepperStep {
  /** Unique identifier for the step */
  id: string
  /** Title displayed for the step */
  title: string
  /** Optional description for the step */
  description?: string
  /** Optional icon to display instead of step number */
  icon?: React.ReactNode
  /** Current status of the step */
  status?: 'pending' | 'current' | 'completed' | 'error'
  /** Whether the step is disabled */
  disabled?: boolean
  /** Custom content to display for this step */
  content?: React.ReactNode
}

/**
 * Props for the main Stepper component
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of steps to display */
  steps: StepperStep[]
  /** Current active step index */
  currentStep?: number
  /** Callback when step changes */
  onStepChange?: (stepIndex: number) => void
  /** Layout variant of the stepper */
  variant?: 'horizontal' | 'vertical' | 'compact'
  /** Size of the stepper components */
  size?: 'sm' | 'md' | 'lg'
  /** Overall status of the stepper */
  status?: 'default' | 'success' | 'warning' | 'error'
  /** Show step numbers in the step indicators */
  showStepNumbers?: boolean
  /** Show step descriptions */
  showStepDescriptions?: boolean
  /** Allow clicking on steps to navigate */
  allowStepClick?: boolean
  /** Show loading state */
  loading?: boolean
  /** Message to show during loading */
  loadingMessage?: string
  /** Disable the entire stepper */
  disabled?: boolean
  /** Mark as required field */
  required?: boolean
  /** Label for the stepper */
  label?: string
  /** Helper text below the stepper */
  helperText?: string
  /** Error message to display */
  errorMessage?: string
  // Styling props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  backgroundColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  focusBoxShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  // Sub-component styles
  completedStepColor?: string
  currentStepColor?: string
  pendingStepColor?: string
  errorStepColor?: string
  connectorColor?: string
  connectorWidth?: string
  // Custom render functions
  renderStepIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderStepContent?: (step: StepperStep, index: number) => React.ReactNode
  // Event handlers
  onStepClick?: (step: StepperStep, index: number) => void
  onStepComplete?: (step: StepperStep, index: number) => void
  onStepError?: (step: StepperStep, index: number) => void
}

export interface StepperContextValue {
  steps: StepperStep[]
  currentStep: number
  variant: 'horizontal' | 'vertical' | 'compact'
  size: 'sm' | 'md' | 'lg'
  status: 'default' | 'success' | 'warning' | 'error'
  showStepNumbers: boolean
  showStepDescriptions: boolean
  allowStepClick: boolean
  loading: boolean
  disabled: boolean
  onStepChange: (stepIndex: number) => void
  onStepClick: (step: StepperStep, index: number) => void
  getStepStatus: (index: number) => 'pending' | 'current' | 'completed' | 'error'
  isStepAccessible: (index: number) => boolean
}

// Context
const StepperContext = createContext<StepperContextValue | null>(null)

const useStepperContext = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper')
  }
  return context
}

// Main Stepper Component
const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep = 0,
      onStepChange,
      variant = 'horizontal',
      size = 'md',
      status = 'default',
      showStepNumbers = true,
      showStepDescriptions = true,
      allowStepClick = true,
      loading = false,
      loadingMessage = 'Loading...',
      disabled = false,
      required = false,
      label,
      helperText,
      errorMessage,
      className,
      children,
      // Styling props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusBorderColor,
      focusBackgroundColor,
      boxShadow,
      focusBoxShadow,
      padding,
      paddingX,
      paddingY,
      // Sub-component styles
      _connectorColor,
      _connectorWidth,
      _completedStepColor,
      _currentStepColor,
      _pendingStepColor,
      _errorStepColor,
      // Custom render functions
      _renderStepIcon,
      _renderStepContent,
      // Event handlers
      _onStepClick,
      _onStepComplete,
      _onStepError,
      ...props
    },
    ref
  ) => {
    const getStepStatus = (index: number): 'pending' | 'current' | 'completed' | 'error' => {
      if (index < currentStep) return 'completed'
      if (index === currentStep) return 'current'
      return 'pending'
    }

    const isStepAccessible = (index: number): boolean => {
      if (disabled || loading) return false
      if (!allowStepClick) return false
      return index <= currentStep || steps[index]?.disabled === false
    }

    const handleStepClick = (step: StepperStep, index: number) => {
      if (!isStepAccessible(index)) return
      _onStepClick?.(step, index)
      onStepChange?.(index)
    }

    const contextValue: StepperContextValue = {
      steps,
      currentStep,
      variant,
      size,
      status,
      showStepNumbers,
      showStepDescriptions,
      allowStepClick,
      loading,
      disabled,
      onStepChange: onStepChange || (() => {}),
      onStepClick: handleStepClick,
      getStepStatus,
      isStepAccessible,
    }

    const baseStyles = cn(
      'flex transition-all duration-200',
      {
        'flex-row': variant === 'horizontal',
        'flex-col': variant === 'vertical',
        'flex-row items-center space-x-2': variant === 'compact',
      },
      className
    )

    const containerStyles = {
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      color: textColor,
      backgroundColor,
      boxShadow,
      padding,
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
    }

    const focusStyles = {
      '--focus-ring-color': focusRingColor,
      '--focus-ring-width': focusRingWidth,
      '--focus-ring-offset': focusRingOffset,
      '--focus-border-color': focusBorderColor,
      '--focus-background-color': focusBackgroundColor,
      '--focus-box-shadow': focusBoxShadow,
    } as React.CSSProperties

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, 'items-center justify-center')}
          style={{ ...containerStyles, ...focusStyles }}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-current"></div>
            <span className="text-sm text-gray-600">{loadingMessage}</span>
          </div>
        </div>
      )
    }

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            baseStyles,
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
          )}
          style={{ ...containerStyles, ...focusStyles }}
          role="navigation"
          aria-label={label || 'Stepper navigation'}
          {...props}
        >
          {label && (
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          <div className="flex-1">{children}</div>

          {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}

          {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
        </div>
      </StepperContext.Provider>
    )
  }
)

Stepper.displayName = 'Stepper'

// Step Component
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: StepperStep
  index: number
  renderIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderContent?: (step: StepperStep, index: number) => React.ReactNode
}

const Step = memo(
  forwardRef<HTMLDivElement, StepProps>(
    ({ step, index, renderIcon, renderContent, className, ...props }, ref) => {
      const {
        variant,
        size,
        showStepNumbers,
        showStepDescriptions,
        isStepAccessible,
        getStepStatus,
        onStepClick,
      } = useStepperContext()

      const status = step.status || getStepStatus(index)
      const isAccessible = isStepAccessible(index)

      const stepSizes = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
      }

      const stepVariants = {
        horizontal: 'flex items-center',
        vertical: 'flex flex-col items-start space-y-2',
        compact: 'flex items-center space-x-2',
      }

      const statusColors = {
        completed:
          'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200',
        current:
          'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-200',
        pending: 'bg-gray-100 text-gray-600 border-2 border-gray-200',
        error: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-200',
      }

      const handleClick = () => {
        if (isAccessible) {
          onStepClick(step, index)
        }
      }

      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center transition-all duration-300 ease-in-out',
            stepVariants[variant],
            {
              'cursor-pointer hover:opacity-80 hover:scale-105 transform': isAccessible,
              'cursor-not-allowed opacity-50': !isAccessible,
            },
            className
          )}
          onClick={handleClick}
          role="button"
          tabIndex={isAccessible ? 0 : -1}
          aria-label={`Step ${index + 1}: ${step.title}`}
          aria-current={status === 'current' ? 'step' : undefined}
          {...props}
        >
          {/* Step Icon/Number */}
          <div
            className={cn(
              'flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out',
              stepSizes[size],
              statusColors[status],
              {
                'border-green-500 shadow-lg shadow-green-200': status === 'completed',
                'border-blue-500 shadow-lg shadow-blue-200': status === 'current',
                'border-gray-300': status === 'pending',
                'border-red-500 shadow-lg shadow-red-200': status === 'error',
              }
            )}
          >
            {renderIcon ? (
              renderIcon(step, index)
            ) : step.icon ? (
              step.icon
            ) : showStepNumbers ? (
              <span className="font-medium">{status === 'completed' ? '✓' : index + 1}</span>
            ) : null}
          </div>

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <span
                className={cn('font-medium transition-colors duration-200', {
                  'text-gray-900': status === 'current',
                  'text-green-600': status === 'completed',
                  'text-gray-500': status === 'pending',
                  'text-red-600': status === 'error',
                })}
              >
                {step.title}
              </span>

              {showStepDescriptions && step.description && (
                <span className="text-sm text-gray-500 mt-1">{step.description}</span>
              )}
            </div>

            {renderContent && renderContent(step, index)}
            {step.content && step.content}
          </div>
        </div>
      )
    }
  )
)

Step.displayName = 'Step'

// Connector Component
export interface ConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

const Connector = memo(
  forwardRef<HTMLDivElement, ConnectorProps>(({ index, className, ...props }, ref) => {
    const { variant, steps, getStepStatus } = useStepperContext()

    const isLastStep = index === steps.length - 1
    const nextStepStatus = getStepStatus(index + 1)

    if (isLastStep) return null

    const connectorVariants = {
      horizontal: 'flex-1 h-0.5 mx-2',
      vertical: 'w-0.5 h-8 ml-4',
      compact: 'flex-1 h-0.5 mx-1',
    }

    const connectorColors = {
      completed: 'bg-gradient-to-r from-green-500 to-emerald-500',
      current: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      pending: 'bg-gray-200',
      error: 'bg-gradient-to-r from-red-500 to-pink-500',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-300 ease-in-out rounded-full',
          connectorVariants[variant],
          connectorColors[nextStepStatus],
          className
        )}
        {...props}
      />
    )
  })
)

Connector.displayName = 'Connector'

// StepList Component
export interface StepListProps extends React.HTMLAttributes<HTMLDivElement> {
  renderStepIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderStepContent?: (step: StepperStep, index: number) => React.ReactNode
}

const StepList = memo(
  forwardRef<HTMLDivElement, StepListProps>(
    ({ renderStepIcon, renderStepContent, className, ...props }, ref) => {
      const { steps, variant } = useStepperContext()

      const listVariants = {
        horizontal: 'flex items-center',
        vertical: 'flex flex-col space-y-4',
        compact: 'flex items-center space-x-2',
      }

      return (
        <div ref={ref} className={cn(listVariants[variant], className)} {...props}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Step
                step={step}
                index={index}
                renderIcon={renderStepIcon}
                renderContent={renderStepContent}
              />
              <Connector index={index} />
            </React.Fragment>
          ))}
        </div>
      )
    }
  )
)

StepList.displayName = 'StepList'

// Content Component
export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  renderContent?: (step: StepperStep, index: number) => React.ReactNode
}

const Content = memo(
  forwardRef<HTMLDivElement, ContentProps>(({ renderContent, className, ...props }, ref) => {
    const { steps, currentStep } = useStepperContext()
    const currentStepData = steps[currentStep]

    if (!currentStepData) return null

    return (
      <div
        ref={ref}
        className={cn('mt-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm', className)}
        {...props}
      >
        {renderContent ? (
          renderContent(currentStepData, currentStep)
        ) : currentStepData.content ? (
          currentStepData.content
        ) : (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{currentStepData.title}</h3>
            {currentStepData.description && (
              <p className="text-gray-600">{currentStepData.description}</p>
            )}
          </div>
        )}
      </div>
    )
  })
)

Content.displayName = 'Content'

// Navigation Component
export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  showPrevious?: boolean
  showNext?: boolean
  showComplete?: boolean
  previousText?: string
  nextText?: string
  completeText?: string
  onPrevious?: () => void
  onNext?: () => void
  onComplete?: () => void
}

const Navigation = memo(
  forwardRef<HTMLDivElement, NavigationProps>(
    (
      {
        showPrevious = true,
        showNext = true,
        showComplete = true,
        previousText = 'Previous',
        nextText = 'Next',
        completeText = 'Complete',
        onPrevious,
        onNext,
        onComplete,
        className,
        ...props
      },
      ref
    ) => {
      const { steps, currentStep, onStepChange, disabled } = useStepperContext()

      const isFirstStep = currentStep === 0
      const isLastStep = currentStep === steps.length - 1
      const canGoNext = currentStep < steps.length - 1

      const handlePrevious = () => {
        if (!isFirstStep && !disabled) {
          onPrevious?.()
          onStepChange(currentStep - 1)
        }
      }

      const handleNext = () => {
        if (canGoNext && !disabled) {
          onNext?.()
          onStepChange(currentStep + 1)
        }
      }

      const handleComplete = () => {
        if (isLastStep && !disabled) {
          onComplete?.()
        }
      }

      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-between mt-6', className)}
          {...props}
        >
          <div className="flex space-x-2">
            {showPrevious && !isFirstStep && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={disabled}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {previousText}
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            {showNext && canGoNext && (
              <button
                type="button"
                onClick={handleNext}
                disabled={disabled}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {nextText}
              </button>
            )}

            {showComplete && isLastStep && (
              <button
                type="button"
                onClick={handleComplete}
                disabled={disabled}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 border border-transparent rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {completeText}
              </button>
            )}
          </div>
        </div>
      )
    }
  )
)

Navigation.displayName = 'Navigation'

// Compound component structure
const StepperRoot = Object.assign(Stepper, {
  Step,
  StepList,
  Content,
  Navigation,
})

export { StepperRoot as Stepper, Step, StepList, Content, Navigation }
