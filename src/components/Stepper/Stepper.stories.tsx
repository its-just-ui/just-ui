import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper, Step, StepList, Content, Navigation } from './Stepper'
import type { StepperStep } from './Stepper'

/**
 * # Stepper Component
 * 
 * A comprehensive stepper component for guiding users through multi-step processes with beautiful animations and modern design.
 * 
 * ## Features
 * - **Compound Component Architecture**: Use `Stepper.Step`, `Stepper.StepList`, `Stepper.Content`, and `Stepper.Navigation`
 * - **Multiple Variants**: Horizontal, vertical, and compact layouts
 * - **Controlled Component**: Full control over step state and navigation
 * - **Accessibility**: ARIA attributes and keyboard navigation
 * - **Customization**: Extensive styling and behavior options
 * - **Beautiful Animations**: Smooth transitions and hover effects
 * - **Modern Design**: Clean, professional appearance with shadows and gradients
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
        component: 'A comprehensive stepper component for multi-step processes with compound component architecture and beautiful animations.',
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
    onStepComplete: {
      action: 'step completed',
      description: 'Called when step is completed',
    },
    onStepError: {
      action: 'step error',
      description: 'Called when step has error',
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

// Beautiful sample steps with modern content
const modernSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Account Setup',
    description: 'Create your account and profile',
    icon: <span className="text-lg">👤</span>,
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Preferences',
    description: 'Customize your experience',
    icon: <span className="text-lg">⚙️</span>,
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalize Your Experience</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">Use dark theme for better experience</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Notifications</h4>
                <p className="text-sm text-gray-600">Receive important updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '3',
    title: 'Verification',
    description: 'Verify your account',
    icon: <span className="text-lg">✅</span>,
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Verify Your Account</h3>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">📧</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Check Your Email</h4>
              <p className="text-gray-600">We've sent a verification link to your email address.</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Resend Email
            </button>
          </div>
        </div>
      </div>
    ),
  },
]

// E-commerce checkout steps
const checkoutSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Cart Review',
    description: 'Review your items',
    content: (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">iPhone 15 Pro</h4>
              <p className="text-sm text-gray-600">256GB, Space Black</p>
              <p className="text-lg font-semibold text-gray-900">$999.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Qty: 1</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>$999.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>$999.00</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Shipping',
    description: 'Enter shipping details',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="123 Main St"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10001"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '3',
    title: 'Payment',
    description: 'Secure payment',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-medium text-gray-900 mb-2">Payment Methods</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
              <input type="radio" name="payment" className="text-blue-600" defaultChecked />
              <span>💳 Credit Card</span>
            </label>
            <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
              <input type="radio" name="payment" className="text-blue-600" />
              <span>📱 Apple Pay</span>
            </label>
            <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
              <input type="radio" name="payment" className="text-blue-600" />
              <span>🅿️ PayPal</span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="MM/YY"
            />
          </div>
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
  onStepComplete?: (step: StepperStep, index: number) => void
  onStepError?: (step: StepperStep, index: number) => void
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
  onStepComplete,
  onStepError,
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
        onStepComplete={onStepComplete}
        onStepError={onStepError}
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
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    variant: 'horizontal',
    size: 'md',
    showStepNumbers: true,
    showStepDescriptions: true,
    allowStepClick: true,
  },
}

// Modern Account Setup
export const ModernAccountSetup: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    variant: 'horizontal',
    size: 'lg',
    label: 'Account Setup',
    helperText: 'Complete all steps to create your account',
    required: true,
  },
}

// E-commerce Checkout
export const EcommerceCheckout: Story = {
  render: (args) => (
    <StepperWithState
      steps={checkoutSteps}
      {...args}
    />
  ),
  args: {
    variant: 'horizontal',
    size: 'md',
    label: 'Checkout Process',
    helperText: 'Complete your purchase securely',
  },
}

// Vertical Layout
export const Vertical: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    variant: 'vertical',
    size: 'md',
  },
}

// Compact Layout
export const Compact: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    variant: 'compact',
    size: 'md',
  },
}

// Different Sizes
export const Small: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    size: 'lg',
  },
}

// States
export const Loading: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    loading: true,
    loadingMessage: 'Processing your information...',
  },
}

export const Disabled: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    disabled: true,
  },
}

export const WithError: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    errorMessage: 'Please complete all required fields before proceeding.',
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
  render: (args) => (
    <StepperWithState
      steps={stepsWithIcons}
      {...args}
    />
  ),
  args: {
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
  render: (args) => (
    <StepperWithState
      steps={stepsWithError}
      {...args}
    />
  ),
  args: {
    currentStep: 1,
  },
}

// Custom Styling
export const CustomStyling: Story = {
  render: (args) => (
    <StepperWithState
      steps={modernSteps}
      {...args}
    />
  ),
  args: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderWidth: '1px',
    borderRadius: '8px',
    padding: '16px',
    textColor: '#1e293b',
    focusRingColor: '#3b82f6',
    focusRingWidth: '2px',
  },
}

// Async Data Example
const asyncSteps: StepperStep[] = [
  {
    id: '1',
    title: 'Data Loading',
    description: 'Loading user data',
  },
  {
    id: '2',
    title: 'Processing',
    description: 'Processing information',
  },
  {
    id: '3',
    title: 'Complete',
    description: 'All done!',
  },
]

export const AsyncData: Story = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    const handleNext = () => {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsLoading(false)
      }, 2000)
    }

    return (
      <div className="max-w-4xl mx-auto">
        <Stepper
          steps={asyncSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          loading={isLoading}
          loadingMessage="Processing..."
          {...args}
        >
          <StepList />
          <Content />
          <Navigation
            onNext={handleNext}
            nextText={isLoading ? 'Processing...' : 'Next'}
          />
        </Stepper>
      </div>
    )
  },
  args: {
    variant: 'horizontal',
  },
}

// Compound Component Usage
export const CompoundComponent: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0)

    return (
      <div className="max-w-4xl mx-auto">
        <Stepper
          steps={modernSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          {...args}
        >
          <StepList>
            {modernSteps.map((step, index) => (
              <Step key={step.id} step={step} index={index} />
            ))}
          </StepList>
          <Content />
          <Navigation />
        </Stepper>
      </div>
    )
  },
  args: {
    variant: 'horizontal',
  },
}

// Custom Render Functions
export const CustomRenders: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(0)

    const renderCustomIcon = (step: StepperStep, index: number) => {
      const icons = ['🚀', '⚙️', '🎉']
      return <span className="text-xl">{icons[index]}</span>
    }

    const renderCustomContent = (step: StepperStep, index: number) => (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Custom Content for {step.title}
        </h3>
        <p className="text-gray-700">
          This is custom content for step {index + 1} with beautiful styling.
        </p>
      </div>
    )

    return (
      <div className="max-w-4xl mx-auto">
        <Stepper
          steps={modernSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          renderStepIcon={renderCustomIcon}
          renderStepContent={renderCustomContent}
          {...args}
        >
          <StepList />
          <Content />
          <Navigation />
        </Stepper>
      </div>
    )
  },
  args: {
    variant: 'horizontal',
    showStepNumbers: false,
  },
} 