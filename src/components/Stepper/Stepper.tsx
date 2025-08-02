import React, { createContext, useContext, forwardRef, memo, useCallback, useMemo } from 'react'
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
  /** Whether the step is optional */
  optional?: boolean
  /** Whether the step is editable */
  editable?: boolean
  /** Custom content to display for this step */
  content?: React.ReactNode
  /** Optional validation function for the step */
  validate?: () => boolean | Promise<boolean>
  /** Optional error message for the step */
  errorMessage?: string
  /** Optional animation for the step */
  animation?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
  /** Custom styles for the step */
  customStyles?: React.CSSProperties
  /** Custom colors for this step */
  colors?: {
    /** Background color of the step circle */
    backgroundColor?: string
    /** Text color of the step circle */
    textColor?: string
    /** Border color of the step circle */
    borderColor?: string
    /** Shadow color of the step circle */
    shadowColor?: string
    /** Title color */
    titleColor?: string
    /** Description color */
    descriptionColor?: string
    /** Connector color */
    connectorColor?: string
  }
  /** Custom animation settings for this step */
  animationSettings?: {
    /** Animation duration in milliseconds */
    duration?: number
    /** Animation type */
    type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
    /** Whether animation is enabled */
    enabled?: boolean
  }
  /** Whether to match border color with background color */
  matchBorderColor?: boolean
  /** Whether to show shadow effects */
  showShadow?: boolean
  /** Whether to show visual effects (animations, hover effects, etc.) */
  showEffects?: boolean
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
  variant?: 'horizontal' | 'vertical' | 'compact' | 'center'
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
  /** Whether to use alternative label placement (below icon) */
  alternativeLabel?: boolean
  /** Whether the stepper is linear (steps must be completed in order) */
  linear?: boolean
  /** Whether to show step content inline */
  showStepContent?: boolean
  /** Global color theme for the stepper */
  colors?: {
    /** Primary color for completed steps */
    primary?: string
    /** Secondary color for current step */
    secondary?: string
    /** Error color for error states */
    error?: string
    /** Pending color for pending steps */
    pending?: string
    /** Background color for step circles */
    backgroundColor?: string
    /** Text color for step circles */
    textColor?: string
    /** Border color for step circles */
    borderColor?: string
    /** Connector color */
    connectorColor?: string
    /** Title color */
    titleColor?: string
    /** Description color */
    descriptionColor?: string
  }
  /** Global animation settings */
  animationSettings?: {
    /** Global animation duration in milliseconds */
    duration?: number
    /** Global animation type */
    type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
    /** Whether animations are enabled globally */
    enabled?: boolean
    /** Whether to animate step transitions */
    stepTransitions?: boolean
    /** Whether to animate connector changes */
    connectorAnimations?: boolean
    /** Whether to animate content changes */
    contentAnimations?: boolean
  }
  /** Event handlers */
  onStepClick?: (step: StepperStep, index: number) => void
  onStepComplete?: (step: StepperStep, index: number) => void
  onStepError?: (step: StepperStep, index: number) => void
  /** Custom render functions */
  renderStepIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderStepContent?: (step: StepperStep, index: number) => React.ReactNode
  renderStepTitle?: (step: StepperStep, index: number) => React.ReactNode
  renderStepDescription?: (step: StepperStep, index: number) => React.ReactNode
  renderStepConnector?: (step: StepperStep, index: number) => React.ReactNode
  /** Animation settings */
  animationDuration?: number
  animationType?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
  /** Custom styles */
  customStyles?: React.CSSProperties
  /** Whether to match border color with background color globally */
  matchBorderColor?: boolean
  /** Whether to show shadow effects globally */
  showShadow?: boolean
  /** Whether to show visual effects (animations, hover effects, etc.) globally */
  showEffects?: boolean
}

/**
 * Context value for the stepper component
 */
export interface StepperContextValue {
  steps: StepperStep[]
  currentStep: number
  variant: 'horizontal' | 'vertical' | 'compact' | 'center'
  size: 'sm' | 'md' | 'lg'
  status: 'default' | 'success' | 'warning' | 'error'
  showStepNumbers: boolean
  showStepDescriptions: boolean
  allowStepClick: boolean
  loading: boolean
  disabled: boolean
  alternativeLabel: boolean
  linear: boolean
  showStepContent: boolean
  colors?: {
    primary?: string
    secondary?: string
    error?: string
    pending?: string
    backgroundColor?: string
    textColor?: string
    borderColor?: string
    connectorColor?: string
    titleColor?: string
    descriptionColor?: string
  }
  animationSettings?: {
    duration?: number
    type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
    enabled?: boolean
    stepTransitions?: boolean
    connectorAnimations?: boolean
    contentAnimations?: boolean
  }
  onStepChange: (stepIndex: number) => void
  onStepClick: (step: StepperStep, index: number) => void
  getStepStatus: (index: number) => 'pending' | 'current' | 'completed' | 'error'
  isStepAccessible: (index: number) => boolean
  renderStepIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderStepContent?: (step: StepperStep, index: number) => React.ReactNode
  renderStepTitle?: (step: StepperStep, index: number) => React.ReactNode
  renderStepDescription?: (step: StepperStep, index: number) => React.ReactNode
  renderStepConnector?: (step: StepperStep, index: number) => React.ReactNode
  animationDuration: number
  animationType: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
  matchBorderColor: boolean
  showShadow: boolean
  showEffects: boolean
}

// Context
const StepperContext = createContext<StepperContextValue | null>(null)

/**
 * Hook to use the stepper context
 * @throws {Error} When used outside of a Stepper component
 */
const useStepperContext = (): StepperContextValue => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper')
  }
  return context
}

/**
 * Stepper Component
 *
 * A comprehensive stepper component for guiding users through multi-step processes.
 * Supports horizontal, vertical, compact, and center layouts with full accessibility features.
 *
 * ## Features
 * - **Multiple Layouts**: Horizontal, vertical, compact, and center layouts
 * - **4 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Custom Colors**: Full color customization for steps, connectors, and text
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 * - **Accessibility**: Full keyboard and screen reader support
 * - **Linear & Non-linear**: Support for both sequential and non-sequential navigation
 * - **Custom Content**: Inline step content with custom rendering
 * - **Loading States**: Built-in loading indicator support
 * - **Form Ready**: Works seamlessly in forms with proper ARIA attributes
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * const steps = [
 *   { id: '1', title: 'Step 1', description: 'First step' },
 *   { id: '2', title: 'Step 2', description: 'Second step' },
 *   { id: '3', title: 'Step 3', description: 'Final step' },
 * ]
 *
 * <Stepper steps={steps} currentStep={0} onStepChange={setCurrentStep}>
 *   <Stepper.StepList />
 *   <Stepper.Content />
 *   <Stepper.Navigation />
 * </Stepper>
 * ```
 *
 * ### With Custom Colors:
 * ```tsx
 * const steps = [
 *   {
 *     id: '1',
 *     title: 'Account Setup',
 *     description: 'Create your account',
 *     colors: {
 *       backgroundColor: '#3b82f6',
 *       textColor: '#ffffff',
 *       titleColor: '#3b82f6',
 *     },
 *   },
 * ]
 * ```
 *
 * ### With Animations:
 * ```tsx
 * <Stepper
 *   steps={steps}
 *   currentStep={0}
 *   animationType="bounce"
 *   animationDuration={500}
 * />
 * ```
 *
 * @example
 * ```tsx
 * const steps = [
 *   { id: '1', title: 'Step 1', description: 'First step' },
 *   { id: '2', title: 'Step 2', description: 'Second step' },
 *   { id: '3', title: 'Step 3', description: 'Final step' },
 * ]
 *
 * <Stepper steps={steps} currentStep={0} onStepChange={setCurrentStep}>
 *   <Stepper.StepList />
 *   <Stepper.Content />
 *   <Stepper.Navigation />
 * </Stepper>
 * ```
 */
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
      alternativeLabel = false,
      linear = true,
      showStepContent = false,
      colors,
      animationSettings,
      children,
      onStepClick,
      onStepComplete: _onStepComplete,
      onStepError: _onStepError,
      renderStepIcon,
      renderStepContent,
      renderStepTitle,
      renderStepDescription,
      renderStepConnector: _renderStepConnector,
      animationDuration = 300,
      animationType = 'fade',
      customStyles,
      className,
      matchBorderColor = false,
      showShadow = true,
      showEffects = true,
      ...props
    },
    ref
  ) => {
    /**
     * Get the status of a step based on its index
     */
    const getStepStatus = useCallback(
      (index: number): 'pending' | 'current' | 'completed' | 'error' => {
        if (index < currentStep) return 'completed'
        if (index === currentStep) return 'current'
        return 'pending'
      },
      [currentStep]
    )

    /**
     * Check if a step is accessible for navigation
     */
    const isStepAccessible = useCallback(
      (index: number): boolean => {
        if (disabled || loading) return false
        if (!allowStepClick) return false
        if (linear) {
          return index <= currentStep || steps[index]?.disabled === false
        }
        return true // Non-linear steppers allow access to all steps
      },
      [disabled, loading, allowStepClick, linear, currentStep, steps]
    )

    /**
     * Handle step click events
     */
    const handleStepClick = useCallback(
      (step: StepperStep, index: number) => {
        if (!isStepAccessible(index)) return
        onStepClick?.(step, index)
        onStepChange?.(index)
      },
      [isStepAccessible, onStepClick, onStepChange]
    )

    // Context value memoized to prevent unnecessary re-renders
    const contextValue = useMemo(
      (): StepperContextValue => ({
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
        alternativeLabel,
        linear,
        showStepContent,
        colors,
        animationSettings,
        onStepChange: onStepChange || (() => {}),
        onStepClick: handleStepClick,
        getStepStatus,
        isStepAccessible,
        renderStepIcon,
        renderStepContent,
        renderStepTitle,
        renderStepDescription,
        renderStepConnector: _renderStepConnector,
        animationDuration,
        animationType,
        matchBorderColor,
        showShadow,
        showEffects,
      }),
      [
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
        alternativeLabel,
        linear,
        showStepContent,
        colors,
        animationSettings,
        onStepChange,
        handleStepClick,
        getStepStatus,
        isStepAccessible,
        renderStepIcon,
        renderStepContent,
        renderStepTitle,
        renderStepDescription,
        _renderStepConnector,
        animationDuration,
        animationType,
        matchBorderColor,
        showShadow,
        showEffects,
      ]
    )

    const baseStyles = cn(
      'flex transition-all duration-200',
      {
        'flex-row': variant === 'horizontal',
        'flex-col': variant === 'vertical',
        'flex-row items-center space-x-2': variant === 'compact',
        'flex-col space-y-4': variant === 'center',
      },
      className
    )

    // Loading state with enhanced animation
    if (loading) {
      return (
        <div ref={ref} className={cn(baseStyles, 'items-center justify-center')} {...props}>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent" />
            <span className="text-sm text-gray-600 font-medium">{loadingMessage}</span>
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
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500'
          )}
          style={customStyles}
          role="navigation"
          aria-label={label || 'Stepper navigation'}
          {...props}
        >
          {label && (
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          <div className="flex-1">{children}</div>

          {helperText && <p className="mt-2 text-sm text-gray-500 leading-relaxed">{helperText}</p>}

          {errorMessage && <p className="mt-2 text-sm text-red-600 font-medium">{errorMessage}</p>}
        </div>
      </StepperContext.Provider>
    )
  }
)

Stepper.displayName = 'Stepper'

/**
 * Props for the Step component
 */
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: StepperStep
  index: number
  renderIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderContent?: (step: StepperStep, index: number) => React.ReactNode
  renderTitle?: (step: StepperStep, index: number) => React.ReactNode
  renderDescription?: (step: StepperStep, index: number) => React.ReactNode
  renderConnector?: (step: StepperStep, index: number) => React.ReactNode
}

/**
 * Individual Step Component
 *
 * Represents a single step in the stepper with customizable rendering options.
 */
const Step = memo(
  forwardRef<HTMLDivElement, StepProps>(
    (
      {
        step,
        index,
        renderIcon,
        renderContent,
        renderTitle,
        renderDescription,
        renderConnector: _renderConnector,
        className,
        ...props
      },
      ref
    ) => {
      const {
        variant,
        size,
        showStepNumbers,
        showStepDescriptions,
        isStepAccessible,
        getStepStatus,
        onStepClick,
        alternativeLabel,
        renderStepIcon,
        renderStepContent,
        renderStepTitle,
        renderStepDescription,
        renderStepConnector: _renderStepConnector,
        animationDuration,
        animationType,
        matchBorderColor,
        showShadow,
        showEffects,
      } = useStepperContext()

      const status = step.status || getStepStatus(index)
      const isAccessible = isStepAccessible(index)

      const stepSizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
      }

      const stepVariants = {
        horizontal: alternativeLabel
          ? 'flex flex-col items-center space-y-3'
          : 'flex items-center space-x-4',
        vertical: 'flex flex-col items-start space-y-4',
        compact: 'flex items-center space-x-3',
        center: 'flex flex-col items-center space-y-3',
      }

      const statusColors = {
        completed: 'bg-primary-600 text-white',
        current: 'bg-primary-600 text-white',
        pending: 'bg-gray-100 text-gray-600 border border-gray-300',
        error: 'bg-red-600 text-white',
      }

      // Default colors that match the background
      const getDefaultColors = (status: string) => {
        switch (status) {
          case 'completed':
            return {
              backgroundColor: '#3b82f6',
              textColor: '#ffffff',
              titleColor: '#3b82f6',
              descriptionColor: '#6b7280',
            }
          case 'current':
            return {
              backgroundColor: '#3b82f6',
              textColor: '#ffffff',
              titleColor: '#3b82f6',
              descriptionColor: '#6b7280',
            }
          case 'error':
            return {
              backgroundColor: '#ef4444',
              textColor: '#ffffff',
              titleColor: '#ef4444',
              descriptionColor: '#6b7280',
            }
          default:
            return {
              backgroundColor: '#f3f4f6',
              textColor: '#6b7280',
              titleColor: '#6b7280',
              descriptionColor: '#9ca3af',
            }
        }
      }

      const animationClasses = {
        fade: 'animate-fade-in',
        slide: 'animate-slide-in',
        scale: 'animate-scale-in',
        bounce: 'animate-bounce-in',
        none: '',
      }

      const handleClick = useCallback(() => {
        if (isAccessible) {
          onStepClick(step, index)
        }
      }, [isAccessible, onStepClick, step, index])

      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleClick()
          }
        },
        [handleClick]
      )

      // Get the background color for border matching
      const backgroundColor =
        step.colors?.backgroundColor || getDefaultColors(status).backgroundColor
      const borderColor =
        step.colors?.borderColor || (matchBorderColor ? backgroundColor : undefined)
      const shadowStyle =
        showShadow && step.colors?.shadowColor
          ? `0 4px 14px 0 ${step.colors.shadowColor}`
          : undefined

      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center transition-all duration-200',
            stepVariants[variant],
            showEffects && animationClasses[animationType],
            {
              'cursor-pointer hover:opacity-80 hover:scale-105 transform':
                isAccessible && showEffects,
              'cursor-not-allowed opacity-50': !isAccessible,
            },
            className
          )}
          style={{
            animationDuration: `${animationDuration}ms`,
            ...step.customStyles,
          }}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={isAccessible ? 0 : -1}
          aria-label={`Step ${index + 1}: ${step.title}`}
          aria-current={status === 'current' ? 'step' : undefined}
          {...props}
        >
          {/* Step Icon/Number with enhanced styling */}
          <div
            className={cn(
              'flex items-center justify-center rounded-full border-2 transition-all duration-300',
              stepSizes[size],
              !step.colors && statusColors[status],
              {
                'border-gray-300': status === 'pending' && !borderColor,
                'animate-pulse': status === 'current' && showEffects,
              }
            )}
            style={{
              backgroundColor: backgroundColor,
              color: step.colors?.textColor || getDefaultColors(status).textColor,
              borderColor: borderColor,
              boxShadow: shadowStyle,
            }}
          >
            {renderIcon ? (
              renderIcon(step, index)
            ) : renderStepIcon ? (
              renderStepIcon(step, index)
            ) : step.icon ? (
              step.icon
            ) : showStepNumbers ? (
              <span className="font-medium">
                {status === 'completed' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
            ) : null}
          </div>

          {/* Step Content with enhanced styling */}
          <div className={cn('flex-1 min-w-0', alternativeLabel && 'text-center')}>
            <div className="flex flex-col space-y-2">
              {renderTitle ? (
                renderTitle(step, index)
              ) : renderStepTitle ? (
                renderStepTitle(step, index)
              ) : (
                <span
                  className={cn('font-semibold text-base transition-colors duration-200', {
                    'text-gray-900': status === 'current' && !step.colors?.titleColor,
                    'text-primary-600': status === 'completed' && !step.colors?.titleColor,
                    'text-gray-500': status === 'pending' && !step.colors?.titleColor,
                    'text-red-600': status === 'error' && !step.colors?.titleColor,
                  })}
                  style={{
                    color: step.colors?.titleColor || getDefaultColors(status).titleColor,
                  }}
                >
                  {step.title}
                  {step.optional && <span className="text-xs text-gray-400 ml-2">(Optional)</span>}
                </span>
              )}

              {showStepDescriptions &&
                step.description &&
                (renderDescription ? (
                  renderDescription(step, index)
                ) : renderStepDescription ? (
                  renderStepDescription(step, index)
                ) : (
                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        step.colors?.descriptionColor || getDefaultColors(status).descriptionColor,
                    }}
                  >
                    {step.description}
                  </span>
                ))}

              {step.errorMessage && status === 'error' && (
                <span className="text-xs text-red-600 mt-1">{step.errorMessage}</span>
              )}
            </div>

            {renderContent && renderContent(step, index)}
            {renderStepContent && renderStepContent(step, index)}
            {step.content && step.content}
          </div>
        </div>
      )
    }
  )
)

Step.displayName = 'Step'

/**
 * Props for the Connector component
 */
export interface ConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

/**
 * Connector Component
 *
 * Renders the line connecting steps in the stepper with enhanced animations.
 */
const Connector = memo(
  forwardRef<HTMLDivElement, ConnectorProps>(({ index, className, ...props }, ref) => {
    const { variant, steps, getStepStatus, animationDuration, alternativeLabel } =
      useStepperContext()
    const nextStep = steps[index + 1]

    const isLastStep = index === steps.length - 1
    const nextStepStatus = getStepStatus(index + 1)

    if (isLastStep) return null

    const connectorVariants = {
      horizontal: alternativeLabel ? 'flex-1 h-0.5 mx-2 mt-4' : 'flex-1 h-0.5 mx-2',
      vertical: 'w-0.5 h-8 ml-4',
      compact: 'flex-1 h-0.5 mx-1',
      center: 'w-0.5 h-4 mx-auto mt-2',
    }

    const connectorColors = {
      completed: 'bg-primary-600',
      current: 'bg-primary-600',
      pending: 'bg-gray-200',
      error: 'bg-red-600',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-300 ease-in-out',
          connectorVariants[variant],
          !nextStep?.colors?.connectorColor && connectorColors[nextStepStatus],
          {
            'animate-pulse': nextStepStatus === 'current',
          },
          className
        )}
        style={{
          animationDuration: `${animationDuration}ms`,
          backgroundColor: nextStep?.colors?.connectorColor,
        }}
        {...props}
      />
    )
  })
)

Connector.displayName = 'Connector'

/**
 * Props for the StepList component
 */
export interface StepListProps extends React.HTMLAttributes<HTMLDivElement> {
  renderStepIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderStepContent?: (step: StepperStep, index: number) => React.ReactNode
  renderStepTitle?: (step: StepperStep, index: number) => React.ReactNode
  renderStepDescription?: (step: StepperStep, index: number) => React.ReactNode
  renderStepConnector?: (step: StepperStep, index: number) => React.ReactNode
}

/**
 * StepList Component
 *
 * Renders all steps with their connectors in the appropriate layout.
 */
const StepList = memo(
  forwardRef<HTMLDivElement, StepListProps>(
    (
      {
        renderStepIcon,
        renderStepContent,
        renderStepTitle,
        renderStepDescription,
        renderStepConnector,
        className,
        ...props
      },
      ref
    ) => {
      const { steps, variant, alternativeLabel } = useStepperContext()

      const listVariants = {
        horizontal: alternativeLabel ? 'flex items-center justify-center' : 'flex items-center',
        vertical: 'flex flex-col space-y-4',
        compact: 'flex items-center space-x-2',
        center: 'flex flex-col space-y-4',
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
                renderTitle={renderStepTitle}
                renderDescription={renderStepDescription}
                renderConnector={renderStepConnector}
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

/**
 * Props for the Content component
 */
export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  renderContent?: (step: StepperStep, index: number) => React.ReactNode
}

/**
 * Content Component
 *
 * Renders the content for the current step with enhanced styling and animations.
 */
const Content = memo(
  forwardRef<HTMLDivElement, ContentProps>(({ renderContent, className, ...props }, ref) => {
    const {
      steps,
      currentStep,
      renderStepContent,
      animationDuration,
      animationType,
      showStepContent,
    } = useStepperContext()
    const currentStepData = steps[currentStep]

    if (!currentStepData || !showStepContent) return null

    const animationClasses = {
      fade: 'animate-fade-in',
      slide: 'animate-slide-in',
      scale: 'animate-scale-in',
      bounce: 'animate-bounce-in',
      none: '',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mt-6 p-6 border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-300',
          animationClasses[animationType],
          className
        )}
        style={{
          animationDuration: `${animationDuration}ms`,
        }}
        {...props}
      >
        {renderContent ? (
          renderContent(currentStepData, currentStep)
        ) : renderStepContent ? (
          renderStepContent(currentStepData, currentStep)
        ) : currentStepData.content ? (
          currentStepData.content
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{currentStepData.title}</h3>
            {currentStepData.description && (
              <p className="text-gray-600 leading-relaxed">{currentStepData.description}</p>
            )}
          </div>
        )}
      </div>
    )
  })
)

Content.displayName = 'Content'

/**
 * Props for the Navigation component
 */
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

/**
 * Navigation Component
 *
 * Provides navigation buttons for the stepper with enhanced styling and animations.
 */
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

      const handlePrevious = useCallback(() => {
        if (!isFirstStep && !disabled) {
          onPrevious?.()
          onStepChange(currentStep - 1)
        }
      }, [isFirstStep, disabled, onPrevious, onStepChange, currentStep])

      const handleNext = useCallback(() => {
        if (canGoNext && !disabled) {
          onNext?.()
          onStepChange(currentStep + 1)
        }
      }, [canGoNext, disabled, onNext, onStepChange, currentStep])

      const handleComplete = useCallback(() => {
        if (isLastStep && !disabled) {
          onComplete?.()
        }
      }, [isLastStep, disabled, onComplete])

      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-between mt-6 space-x-4', className)}
          {...props}
        >
          <div className="flex space-x-3">
            {showPrevious && !isFirstStep && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {previousText}
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {showNext && canGoNext && (
              <button
                type="button"
                onClick={handleNext}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {nextText}
              </button>
            )}

            {showComplete && isLastStep && (
              <button
                type="button"
                onClick={handleComplete}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
