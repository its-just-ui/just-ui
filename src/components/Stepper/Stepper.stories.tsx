import type { StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Stepper } from './Stepper'
import type { StepperStep } from './Stepper'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Stepper is a comprehensive component for guiding users through multi-step processes.
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
 */
const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'compact', 'center'],
      description: 'Layout variant of the stepper',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the stepper components',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Overall status of the stepper',
    },
    showStepNumbers: {
      control: 'boolean',
      description: 'Show step numbers in the step indicators',
    },
    showStepDescriptions: {
      control: 'boolean',
      description: 'Show step descriptions',
    },
    allowStepClick: {
      control: 'boolean',
      description: 'Allow clicking on steps to navigate',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire stepper',
    },
    alternativeLabel: {
      control: 'boolean',
      description: 'Use alternative label placement (below icon)',
    },
    linear: {
      control: 'boolean',
      description: 'Linear stepper (steps must be completed in order)',
    },
    showStepContent: {
      control: 'boolean',
      description: 'Show step content inline',
    },
    matchBorderColor: {
      control: 'boolean',
      description: 'Match border color with background color',
    },
    showShadow: {
      control: 'boolean',
      description: 'Show shadow effects on step circles',
    },
    showEffects: {
      control: 'boolean',
      description: 'Show visual effects (animations, hover effects, etc.)',
    },
    animationSettings: {
      control: 'object',
      description: 'Animation settings for the stepper',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample steps for basic examples
const sampleSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Step 1',
    description: 'First step description',
  },
  {
    id: '2',
    title: 'Step 2',
    description: 'Second step description',
  },
  {
    id: '3',
    title: 'Step 3',
    description: 'Third step description',
  },
  {
    id: '4',
    title: 'Step 4',
    description: 'Fourth step description',
  },
]

// Steps with error state
const errorSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Step 1',
    description: 'Completed successfully',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Step 2',
    description: 'This step has an error',
    status: 'error',
    errorMessage: 'Something went wrong',
  },
  {
    id: '3',
    title: 'Step 3',
    description: 'Pending step',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Step 4',
    description: 'Future step',
    status: 'pending',
  },
]

// Steps with custom icons
const iconSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Account',
    description: 'Create your account',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Settings',
    description: 'Configure your settings',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Complete',
    description: 'Setup complete',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

// Steps with custom colors and animations
const animatedColoredSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Account Setup',
    description: 'Create your account',
    colors: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      titleColor: '#1e40af',
      connectorColor: '#3b82f6',
      shadowColor: 'rgba(59, 130, 246, 0.3)',
    },
    animationSettings: {
      enabled: true,
      duration: 500,
      type: 'bounce',
    },
  },
  {
    id: '2',
    title: 'Profile Setup',
    description: 'Complete your profile',
    colors: {
      backgroundColor: '#10b981',
      textColor: '#ffffff',
      titleColor: '#059669',
      connectorColor: '#10b981',
      shadowColor: 'rgba(16, 185, 129, 0.3)',
    },
    animationSettings: {
      enabled: true,
      duration: 500,
      type: 'scale',
    },
  },
  {
    id: '3',
    title: 'Preferences',
    description: 'Set your preferences',
    colors: {
      backgroundColor: '#f59e0b',
      textColor: '#ffffff',
      titleColor: '#d97706',
      connectorColor: '#f59e0b',
      shadowColor: 'rgba(245, 158, 11, 0.3)',
    },
    animationSettings: {
      enabled: true,
      duration: 500,
      type: 'slide',
    },
  },
  {
    id: '4',
    title: 'Complete',
    description: "You're all set",
    colors: {
      backgroundColor: '#8b5cf6',
      textColor: '#ffffff',
      titleColor: '#7c3aed',
      connectorColor: '#8b5cf6',
      shadowColor: 'rgba(139, 92, 246, 0.3)',
    },
    animationSettings: {
      enabled: true,
      duration: 500,
      type: 'fade',
    },
  },
]

// Steps with gradient colors
const gradientSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Gradient 1',
    description: 'Purple to pink gradient',
    colors: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      titleColor: '#4c1d95',
      connectorColor: '#667eea',
      shadowColor: 'rgba(102, 126, 234, 0.3)',
    },
  },
  {
    id: '2',
    title: 'Gradient 2',
    description: 'Blue to cyan gradient',
    colors: {
      backgroundColor: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)',
      textColor: '#ffffff',
      titleColor: '#0c4a6e',
      connectorColor: '#0ea5e9',
      shadowColor: 'rgba(14, 165, 233, 0.3)',
    },
  },
  {
    id: '3',
    title: 'Gradient 3',
    description: 'Green to teal gradient',
    colors: {
      backgroundColor: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
      textColor: '#ffffff',
      titleColor: '#065f46',
      connectorColor: '#14b8a6',
      shadowColor: 'rgba(20, 184, 166, 0.3)',
    },
  },
  {
    id: '4',
    title: 'Gradient 4',
    description: 'Orange to red gradient',
    colors: {
      backgroundColor: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
      textColor: '#ffffff',
      titleColor: '#991b1b',
      connectorColor: '#f97316',
      shadowColor: 'rgba(249, 115, 22, 0.3)',
    },
  },
]

// Steps with better color matching
const betterColoredSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Account Setup',
    description: 'Create your account',
    colors: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      titleColor: '#3b82f6',
      descriptionColor: '#6b7280',
      connectorColor: '#3b82f6',
      shadowColor: 'rgba(59, 130, 246, 0.3)',
    },
  },
  {
    id: '2',
    title: 'Profile Setup',
    description: 'Complete your profile',
    colors: {
      backgroundColor: '#10b981',
      textColor: '#ffffff',
      titleColor: '#10b981',
      descriptionColor: '#6b7280',
      connectorColor: '#10b981',
      shadowColor: 'rgba(16, 185, 129, 0.3)',
    },
  },
  {
    id: '3',
    title: 'Preferences',
    description: 'Set your preferences',
    colors: {
      backgroundColor: '#f59e0b',
      textColor: '#ffffff',
      titleColor: '#f59e0b',
      descriptionColor: '#6b7280',
      connectorColor: '#f59e0b',
      shadowColor: 'rgba(245, 158, 11, 0.3)',
    },
  },
  {
    id: '4',
    title: 'Complete',
    description: "You're all set",
    colors: {
      backgroundColor: '#8b5cf6',
      textColor: '#ffffff',
      titleColor: '#8b5cf6',
      descriptionColor: '#6b7280',
      connectorColor: '#8b5cf6',
      shadowColor: 'rgba(139, 92, 246, 0.3)',
    },
  },
]

// Stateful component for interactive examples
const StepperWithState: React.FC<{
  steps: StepperStep[]
  initialStep?: number
  variant?: 'horizontal' | 'vertical' | 'compact' | 'center'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  showStepNumbers?: boolean
  showStepDescriptions?: boolean
  allowStepClick?: boolean
  loading?: boolean
  disabled?: boolean
  required?: boolean
  label?: string
  helperText?: string
  errorMessage?: string
  loadingMessage?: string
  alternativeLabel?: boolean
  linear?: boolean
  showStepContent?: boolean
  onStepChange?: (stepIndex: number) => void
  onStepClick?: (step: StepperStep, index: number) => void
  renderStepIcon?: (step: StepperStep, index: number) => React.ReactNode
  renderStepContent?: (step: StepperStep, index: number) => React.ReactNode
  renderStepTitle?: (step: StepperStep, index: number) => React.ReactNode
  renderStepDescription?: (step: StepperStep, index: number) => React.ReactNode
  animationDuration?: number
  animationType?: 'fade' | 'slide' | 'scale' | 'bounce' | 'none'
}> = ({
  steps,
  initialStep = 0,
  variant = 'horizontal',
  size = 'md',
  status = 'default',
  showStepNumbers = true,
  showStepDescriptions = true,
  allowStepClick = true,
  loading = false,
  disabled = false,
  required = false,
  label,
  helperText,
  errorMessage,
  loadingMessage = 'Loading...',
  alternativeLabel = false,
  linear = true,
  showStepContent = false,
  onStepChange,
  onStepClick,
  renderStepIcon,
  renderStepContent,
  renderStepTitle,
  renderStepDescription,
  animationDuration = 300,
  animationType = 'fade',
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    onStepChange?.(stepIndex)
  }

  return (
    <div className="space-y-6">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        variant={variant}
        size={size}
        status={status}
        showStepNumbers={showStepNumbers}
        showStepDescriptions={showStepDescriptions}
        allowStepClick={allowStepClick}
        loading={loading}
        disabled={disabled}
        required={required}
        label={label}
        helperText={helperText}
        errorMessage={errorMessage}
        loadingMessage={loadingMessage}
        alternativeLabel={alternativeLabel}
        linear={linear}
        showStepContent={showStepContent}
        onStepClick={onStepClick}
        renderStepIcon={renderStepIcon}
        renderStepContent={renderStepContent}
        renderStepTitle={renderStepTitle}
        renderStepDescription={renderStepDescription}
        animationDuration={animationDuration}
        animationType={animationType}
      >
        <Stepper.StepList />
        {showStepContent && <Stepper.Content />}
        <Stepper.Navigation
          showPrevious={true}
          showNext={true}
          showComplete={currentStep === steps.length - 1}
          previousText="Previous"
          nextText="Next"
          completeText="Complete"
        />
      </Stepper>
    </div>
  )
}

// Basic horizontal stepper
export const Horizontal: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Vertical stepper
export const Vertical: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'vertical',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Compact stepper
export const Compact: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'compact',
    showStepNumbers: true,
    showStepDescriptions: false,
    allowStepClick: true,
  },
}

// Center layout stepper
export const Center: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'center',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    alternativeLabel: true,
  },
}

// Colored steps with better color matching
export const ColoredSteps: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: betterColoredSteps,
    variant: 'horizontal',
    showStepNumbers: false,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Animated colored steps
export const AnimatedColoredSteps: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: animatedColoredSteps,
    variant: 'horizontal',
    showStepNumbers: false,
    showStepDescriptions: true,
    allowStepClick: true,
    animationType: 'bounce',
    animationDuration: 500,
  },
}

// Gradient steps
export const GradientSteps: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: gradientSteps,
    variant: 'horizontal',
    showStepNumbers: false,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Error state
export const ErrorState: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: errorSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    currentStep: 1,
  },
}

// With icons
export const WithIcons: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: iconSteps,
    variant: 'horizontal',
    showStepNumbers: false,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Without animations
export const WithoutAnimations: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    animationType: 'none',
    animationDuration: 0,
  },
}

// Different sizes
export const SmallSize: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    size: 'sm',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

export const LargeSize: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    size: 'lg',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Alternative label placement
export const AlternativeLabels: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    alternativeLabel: true,
  },
}

// Non-linear stepper
export const NonLinear: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    linear: false,
  },
}

// Loading state
export const Loading: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    loading: true,
    loadingMessage: 'Processing...',
  },
}

// Disabled state
export const Disabled: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    disabled: true,
  },
}

// With content
export const WithContent: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: [
      {
        id: '1',
        title: 'Step 1',
        description: 'First step',
        content: (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Step 1 Content</h3>
            <p className="text-blue-700">This is the content for step 1.</p>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Step 2',
        description: 'Second step',
        content: (
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Step 2 Content</h3>
            <p className="text-green-700">This is the content for step 2.</p>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Step 3',
        description: 'Third step',
        content: (
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Step 3 Content</h3>
            <p className="text-purple-700">This is the content for step 3.</p>
          </div>
        ),
      },
    ],
    variant: 'horizontal',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
    showStepContent: true,
  },
}

export const WithoutEffects: Story = {
  render: (args) => (
    <Stepper {...args}>
      <Stepper.StepList />
      <Stepper.Content />
      <Stepper.Navigation />
    </Stepper>
  ),
  args: {
    steps: sampleSteps,
    currentStep: 1,
    showEffects: false,
    showShadow: false,
  },
}

export const WithBorderColorMatching: Story = {
  render: (args) => (
    <Stepper {...args}>
      <Stepper.StepList />
      <Stepper.Content />
      <Stepper.Navigation />
    </Stepper>
  ),
  args: {
    steps: betterColoredSteps,
    currentStep: 1,
    matchBorderColor: true,
  },
}

export const WithoutShadow: Story = {
  render: (args) => (
    <Stepper {...args}>
      <Stepper.StepList />
      <Stepper.Content />
      <Stepper.Navigation />
    </Stepper>
  ),
  args: {
    steps: betterColoredSteps,
    currentStep: 1,
    showShadow: false,
  },
}

export const MinimalStyle: Story = {
  render: (args) => (
    <Stepper {...args}>
      <Stepper.StepList />
      <Stepper.Content />
      <Stepper.Navigation />
    </Stepper>
  ),
  args: {
    steps: sampleSteps,
    currentStep: 1,
    showEffects: false,
    showShadow: false,
    matchBorderColor: true,
  },
}

export const CustomBorderColors: Story = {
  render: (args) => (
    <Stepper {...args}>
      <Stepper.StepList />
      <Stepper.Content />
      <Stepper.Navigation />
    </Stepper>
  ),
  args: {
    steps: [
      {
        id: '1',
        title: 'Account Setup',
        description: 'Create your account',
        colors: {
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          borderColor: '#1d4ed8',
          titleColor: '#3b82f6',
        },
      },
      {
        id: '2',
        title: 'Profile Setup',
        description: 'Complete your profile',
        colors: {
          backgroundColor: '#10b981',
          textColor: '#ffffff',
          borderColor: '#047857',
          titleColor: '#10b981',
        },
      },
      {
        id: '3',
        title: 'Preferences',
        description: 'Set your preferences',
        colors: {
          backgroundColor: '#f59e0b',
          textColor: '#ffffff',
          borderColor: '#d97706',
          titleColor: '#f59e0b',
        },
      },
    ],
    currentStep: 1,
  },
}

export const Playground: StoryObj<typeof meta> = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Stepper).
      </p>
      <LivePlayground
        code={`<Stepper
  steps={[{ id: '1', title: 'Step 1' }, { id: '2', title: 'Step 2' }, { id: '3', title: 'Step 3' }]}
  currentStep={0}
>
  <Stepper.StepList />
  <Stepper.Content />
  <Stepper.Navigation />
</Stepper>`}
      />
    </div>
  ),
  args: {},
}
