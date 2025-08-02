import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper, Step, StepList, Content, Navigation } from './Stepper'
import type { StepperStep } from './Stepper'

/**
 * # Stepper Component
 *
 * A comprehensive stepper component for guiding users through multi-step processes.
 *
 * ## Features
 * - **Compound Component Architecture**: Use `Stepper.Step`, `Stepper.StepList`, `Stepper.Content`, and `Stepper.Navigation`
 * - **Multiple Variants**: Horizontal, vertical, and compact layouts
 * - **Controlled Component**: Full control over step state and navigation
 * - **Accessibility**: ARIA attributes and keyboard navigation
 * - **Customization**: Extensive styling and behavior options
 *
 * ## Basic Usage
 * ```tsx
 * import { Stepper } from '@/components'
 *
 * const steps = [
 *   { id: '1', title: 'Step 1', description: 'First step' },
 *   { id: '2', title: 'Step 2', description: 'Second step' },
 *   { id: '3', title: 'Step 3', description: 'Final step' },
 * ]
 *
 * function MyStepper() {
 *   const [currentStep, setCurrentStep] = useState(0)
 *
 *   return (
 *     <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep}>
 *       <Stepper.StepList />
 *       <Stepper.Content />
 *       <Stepper.Navigation />
 *     </Stepper>
 *   )
 * }
 * ```
 */

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive stepper component for multi-step processes with compound component architecture.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'compact'],
      description: 'Layout variant of the stepper',
      defaultValue: 'horizontal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the stepper components',
      defaultValue: 'md',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Overall status of the stepper',
      defaultValue: 'default',
    },
    showStepNumbers: {
      control: 'boolean',
      description: 'Show step numbers in the step indicators',
      defaultValue: true,
    },
    showStepDescriptions: {
      control: 'boolean',
      description: 'Show step descriptions',
      defaultValue: true,
    },
    allowStepClick: {
      control: 'boolean',
      description: 'Allow clicking on steps to navigate',
      defaultValue: true,
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire stepper',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: 'Label for the stepper',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the stepper',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    loadingMessage: {
      control: 'text',
      description: 'Message to show during loading',
      defaultValue: 'Loading...',
    },
    // Event handlers
    onStepChange: {
      action: 'step changed',
      description: 'Called when step changes',
    },
    onStepClick: {
      action: 'step clicked',
      description: 'Called when step is clicked',
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

// Sample steps data
const sampleSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Personal Information',
    description: 'Enter your basic details',
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Address',
    description: 'Provide your address information',
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Enter street address"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="State"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '3',
    title: 'Review',
    description: 'Review and confirm your information',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john@example.com
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, City, State
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="confirm"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="confirm" className="ml-2 block text-sm text-gray-900">
            I confirm that all information is correct
          </label>
        </div>
      </div>
    ),
  },
]

// Wrapper component for controlled state
const StepperWithState: React.FC<{
  steps: StepperStep[]
  initialStep?: number
  variant?: 'horizontal' | 'vertical' | 'compact'
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
  onStepChange?: (stepIndex: number) => void
  onStepClick?: (step: StepperStep, index: number) => void
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
  onStepChange,
  onStepClick,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    onStepChange?.(stepIndex)
  }

  return (
    <div className="max-w-4xl mx-auto">
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
        onStepClick={onStepClick}
      >
        <StepList />
        <Content />
        <Navigation />
      </Stepper>
    </div>
  )
}

// Basic Usage
export const Basic: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    size: 'md',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Horizontal Variant
export const Horizontal: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
    size: 'md',
  },
}

// Vertical Variant
export const Vertical: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'vertical',
    size: 'md',
  },
}

// Compact Variant
export const Compact: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'compact',
    size: 'md',
  },
}

// Different Sizes
export const Small: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    size: 'sm',
  },
}

export const Large: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    size: 'lg',
  },
}

// States
export const Loading: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    loading: true,
    loadingMessage: 'Processing your information...',
  },
}

export const Disabled: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    disabled: true,
  },
}

export const WithError: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    errorMessage: 'Please complete all required fields before proceeding.',
  },
}

export const WithLabel: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: sampleSteps,
    label: 'Registration Process',
    helperText: 'Complete all steps to finish your registration',
    required: true,
  },
}

// Custom Icons
const stepsWithIcons: StepperStep[] = [
  {
    id: '1',
    title: 'Account Setup',
    description: 'Create your account',
    icon: <span className="text-lg">👤</span>,
  },
  {
    id: '2',
    title: 'Profile Details',
    description: 'Add your information',
    icon: <span className="text-lg">📝</span>,
  },
  {
    id: '3',
    title: 'Verification',
    description: 'Verify your account',
    icon: <span className="text-lg">✅</span>,
  },
]

export const WithIcons: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: stepsWithIcons,
    showStepNumbers: false,
  },
}

// Error State Steps
const stepsWithError: StepperStep[] = [
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
  },
  {
    id: '3',
    title: 'Step 3',
    description: 'Pending',
    status: 'pending',
  },
]

export const WithErrorStates: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: stepsWithError,
    currentStep: 1,
  },
}

// Form Integration Example
const formSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Personal Info',
    description: 'Basic information',
    content: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            required
          />
        </div>
      </form>
    ),
  },
  {
    id: '2',
    title: 'Contact',
    description: 'Contact information',
    content: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </form>
    ),
  },
  {
    id: '3',
    title: 'Preferences',
    description: 'Your preferences',
    content: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Newsletter</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Subscribe to newsletter</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notifications</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Receive notifications</span>
            </label>
          </div>
        </div>
      </form>
    ),
  },
]

export const FormIntegration: Story = {
  render: (args) => <StepperWithState {...args} />,
  args: {
    steps: formSteps,
    label: 'User Registration',
    helperText: 'Please complete all required fields',
    required: true,
  },
}

// Compound Component Usage
const CompoundComponentDemo: React.FC<any> = (args) => {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = (args as any).steps || sampleSteps

  return (
    <div className="max-w-4xl mx-auto">
      <Stepper currentStep={currentStep} onStepChange={setCurrentStep} steps={steps} {...args}>
        <StepList>
          {steps.map((step, index) => (
            <Step key={step.id} step={step} index={index} />
          ))}
        </StepList>
        <Content />
        <Navigation />
      </Stepper>
    </div>
  )
}

export const CompoundComponent: Story = {
  render: (args) => <CompoundComponentDemo {...args} />,
  args: {
    steps: sampleSteps,
    variant: 'horizontal',
  },
}
