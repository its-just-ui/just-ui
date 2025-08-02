import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

/**
 * RadioGroup is a set of checkable buttons where no more than one can be selected at a time.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 5 pre-defined visual styles including card layout
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Flexible Layout**: Horizontal and vertical orientations
 * - **Extensive Styling**: Over 50 style props for complete customization
 * - **Loading State**: Built-in loading indicator support
 * - **Custom Options**: Support for icons, descriptions, and custom content
 * - **Accessibility**: Full keyboard and screen reader support with proper ARIA attributes
 * - **Form Ready**: Works seamlessly in forms with name and value props
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <RadioGroup defaultValue="option1" label="Choose an option">
 *   <RadioGroup.Option value="option1" label="Option 1" />
 *   <RadioGroup.Option value="option2" label="Option 2" />
 *   <RadioGroup.Option value="option3" label="Option 3" />
 * </RadioGroup>
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [value, setValue] = useState('option1')
 *
 * <RadioGroup value={value} onChange={setValue} label="Choose an option">
 *   <RadioGroup.Option value="option1" label="Option 1" />
 *   <RadioGroup.Option value="option2" label="Option 2" />
 * </RadioGroup>
 * ```
 *
 * ### With Descriptions:
 * ```tsx
 * <RadioGroup label="Select a plan">
 *   <RadioGroup.Option
 *     value="basic"
 *     label="Basic Plan"
 *     description="Perfect for individuals getting started"
 *   />
 *   <RadioGroup.Option
 *     value="pro"
 *     label="Pro Plan"
 *     description="Best for growing teams and businesses"
 *   />
 * </RadioGroup>
 * ```
 *
 * ### Card Variant:
 * ```tsx
 * <RadioGroup variant="card" orientation="horizontal">
 *   <RadioGroup.Option value="monthly" label="Monthly" description="$9/month" />
 *   <RadioGroup.Option value="yearly" label="Yearly" description="$90/year" />
 * </RadioGroup>
 * ```
 */
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value for uncontrolled mode',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire radio group',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Make the radio group required in forms',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'card'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio options',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state for visual feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of radio options',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the radio group',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio group',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (overrides helper text)',
      table: {
        type: { summary: 'string' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when no options are available',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
      table: {
        type: { summary: 'string' },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'slide', 'fade', 'bounce', 'smooth'],
      description: 'Animation style for transitions',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'smooth' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transitions in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    // Group styles
    gap: {
      control: 'text',
      description: 'Gap between radio options',
      table: {
        category: 'Group Styles',
        type: { summary: 'string' },
      },
    },
    groupBackgroundColor: {
      control: 'color',
      description: 'Background color of the options container',
      table: {
        category: 'Group Styles',
        type: { summary: 'string' },
      },
    },
    groupBorderColor: {
      control: 'color',
      description: 'Border color of the options container',
      table: {
        category: 'Group Styles',
        type: { summary: 'string' },
      },
    },
    groupBorderRadius: {
      control: 'text',
      description: 'Border radius of the options container',
      table: {
        category: 'Group Styles',
        type: { summary: 'string' },
      },
    },
    // Label styles
    labelColor: {
      control: 'color',
      description: 'Label text color',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelFontSize: {
      control: 'text',
      description: 'Label font size',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelFontWeight: {
      control: 'text',
      description: 'Label font weight',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    // Focus styles
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusRingWidth: {
      control: 'text',
      description: 'Focus ring width',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    // Custom render
    renderLabel: {
      control: false,
      description: 'Custom render function for label',
      table: {
        category: 'Custom Render',
        type: { summary: '(required?: boolean) => React.ReactNode' },
      },
    },
    renderOption: {
      control: false,
      description: 'Custom render function for radio options',
      table: {
        category: 'Custom Render',
        type: {
          summary:
            '(option: RadioOptionProps, isSelected: boolean, isDisabled?: boolean) => React.ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const RadioGroupWithState = ({
  defaultValue = '',
  onChange,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroup> & { defaultValue?: string }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <RadioGroup {...props} value={value} onChange={handleChange}>
      {children}
    </RadioGroup>
  )
}

export const Default: Story = {
  render: (args) => (
    <RadioGroupWithState {...args} label="Choose your favorite option">
      <RadioGroup.Option value="option1" label="Option 1" />
      <RadioGroup.Option value="option2" label="Option 2" />
      <RadioGroup.Option value="option3" label="Option 3" />
    </RadioGroupWithState>
  ),
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default RadioGroup (no props)</h3>
        <RadioGroup>
          <RadioGroup.Option value="a" label="Option A" />
          <RadioGroup.Option value="b" label="Option B" />
          <RadioGroup.Option value="c" label="Option C" />
        </RadioGroup>
        <p className="text-xs text-gray-500 mt-2">All default styles applied</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Label</h3>
        <RadioGroup label="Select an option">
          <RadioGroup.Option value="1" label="First choice" />
          <RadioGroup.Option value="2" label="Second choice" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Selected</h3>
        <RadioGroup defaultValue="yes" label="Do you agree?">
          <RadioGroup.Option value="yes" label="Yes, I agree" />
          <RadioGroup.Option value="no" label="No, I disagree" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Helper Text</h3>
        <RadioGroup
          label="Notification frequency"
          helperText="Choose how often you want to receive notifications"
        >
          <RadioGroup.Option value="daily" label="Daily" />
          <RadioGroup.Option value="weekly" label="Weekly" />
          <RadioGroup.Option value="monthly" label="Monthly" />
        </RadioGroup>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <RadioGroupWithState variant="default" label="Default variant">
          <RadioGroup.Option value="option1" label="Option 1" />
          <RadioGroup.Option value="option2" label="Option 2" />
          <RadioGroup.Option value="option3" label="Option 3" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <RadioGroupWithState variant="filled" label="Filled variant">
          <RadioGroup.Option value="option1" label="Option 1" />
          <RadioGroup.Option value="option2" label="Option 2" />
          <RadioGroup.Option value="option3" label="Option 3" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <RadioGroupWithState variant="outlined" label="Outlined variant">
          <RadioGroup.Option value="option1" label="Option 1" />
          <RadioGroup.Option value="option2" label="Option 2" />
          <RadioGroup.Option value="option3" label="Option 3" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Ghost</h3>
        <RadioGroupWithState variant="ghost" label="Ghost variant">
          <RadioGroup.Option value="option1" label="Option 1" />
          <RadioGroup.Option value="option2" label="Option 2" />
          <RadioGroup.Option value="option3" label="Option 3" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Card</h3>
        <RadioGroupWithState variant="card" label="Card variant">
          <RadioGroup.Option
            value="option1"
            label="Option 1"
            description="This is the first option"
          />
          <RadioGroup.Option
            value="option2"
            label="Option 2"
            description="This is the second option"
          />
          <RadioGroup.Option
            value="option3"
            label="Option 3"
            description="This is the third option"
          />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Small</h3>
          <RadioGroupWithState size="sm" label="Small radio group">
            <RadioGroup.Option value="option1" label="Small option 1" />
            <RadioGroup.Option value="option2" label="Small option 2" />
          </RadioGroupWithState>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Medium (Default)</h3>
          <RadioGroupWithState size="md" label="Medium radio group">
            <RadioGroup.Option value="option1" label="Medium option 1" />
            <RadioGroup.Option value="option2" label="Medium option 2" />
          </RadioGroupWithState>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Large</h3>
          <RadioGroupWithState size="lg" label="Large radio group">
            <RadioGroup.Option value="option1" label="Large option 1" />
            <RadioGroup.Option value="option2" label="Large option 2" />
          </RadioGroupWithState>
        </div>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <RadioGroupWithState status="default" label="Choose an option" defaultValue="option1">
          <RadioGroup.Option value="option1" label="Option 1" />
          <RadioGroup.Option value="option2" label="Option 2" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <RadioGroupWithState status="success" label="Great choice!" defaultValue="option1">
          <RadioGroup.Option value="option1" label="Recommended option" />
          <RadioGroup.Option value="option2" label="Alternative option" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <RadioGroupWithState status="warning" label="Choose carefully" defaultValue="option1">
          <RadioGroup.Option value="option1" label="Safe option" />
          <RadioGroup.Option value="option2" label="Risky option" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <RadioGroupWithState
          status="error"
          label="Selection required"
          errorMessage="Please select one of the available options"
        >
          <RadioGroup.Option value="option1" label="Fix option 1" />
          <RadioGroup.Option value="option2" label="Fix option 2" />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Vertical (Default)</h3>
        <RadioGroupWithState orientation="vertical" label="Choose your preference">
          <RadioGroup.Option
            value="option1"
            label="Option 1"
            description="First choice description"
          />
          <RadioGroup.Option
            value="option2"
            label="Option 2"
            description="Second choice description"
          />
          <RadioGroup.Option
            value="option3"
            label="Option 3"
            description="Third choice description"
          />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Horizontal</h3>
        <RadioGroupWithState orientation="horizontal" label="Quick selection">
          <RadioGroup.Option value="yes" label="Yes" />
          <RadioGroup.Option value="no" label="No" />
          <RadioGroup.Option value="maybe" label="Maybe" />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Horizontal with Cards</h3>
        <RadioGroupWithState orientation="horizontal" variant="card" label="Choose your plan">
          <RadioGroup.Option value="basic" label="Basic" description="$9/month" />
          <RadioGroup.Option value="pro" label="Pro" description="$19/month" />
          <RadioGroup.Option value="enterprise" label="Enterprise" description="$49/month" />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Options with Descriptions</h3>
        <RadioGroupWithState label="Select your subscription plan">
          <RadioGroup.Option
            value="starter"
            label="Starter Plan"
            description="Perfect for individuals just getting started. Includes basic features and 5GB storage."
          />
          <RadioGroup.Option
            value="professional"
            label="Professional Plan"
            description="Best for growing teams. Includes advanced features, 50GB storage, and priority support."
          />
          <RadioGroup.Option
            value="enterprise"
            label="Enterprise Plan"
            description="For large organizations. Unlimited storage, custom integrations, and dedicated support."
          />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Short Descriptions</h3>
        <RadioGroupWithState variant="outlined" label="Delivery method">
          <RadioGroup.Option
            value="standard"
            label="Standard Delivery"
            description="5-7 business days"
          />
          <RadioGroup.Option
            value="express"
            label="Express Delivery"
            description="2-3 business days"
          />
          <RadioGroup.Option
            value="overnight"
            label="Overnight Delivery"
            description="Next business day"
          />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Payment Methods</h3>
        <RadioGroupWithState variant="card" label="Choose payment method">
          <RadioGroup.Option
            value="credit"
            label="Credit Card"
            description="Visa, Mastercard, American Express"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            }
            checkedIcon={
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          />
          <RadioGroup.Option
            value="paypal"
            label="PayPal"
            description="Pay with your PayPal account"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.421c-.315-.178-.7-.322-1.15-.421C18.75 5.882 18.063 5.8 17.217 5.8h-7.218L8.776 14.8h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.137-1.012-4.287z" />
              </svg>
            }
            checkedIcon={
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          />
          <RadioGroup.Option
            value="apple"
            label="Apple Pay"
            description="Touch ID or Face ID"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            }
            checkedIcon={
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Contact Methods</h3>
        <RadioGroupWithState size="lg" label="How would you like to be contacted?">
          <RadioGroup.Option
            value="email"
            label="Email"
            description="We'll send updates to your email"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <RadioGroup.Option
            value="phone"
            label="Phone"
            description="We'll call you directly"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
          />
          <RadioGroup.Option
            value="sms"
            label="SMS"
            description="Text messages to your phone"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            }
          />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled</h3>
        <div className="space-y-4">
          <RadioGroup disabled label="Disabled radio group">
            <RadioGroup.Option value="option1" label="All options disabled" />
            <RadioGroup.Option value="option2" label="Cannot select any" />
          </RadioGroup>

          <RadioGroup label="Mixed disabled states">
            <RadioGroup.Option value="enabled1" label="This option is enabled" />
            <RadioGroup.Option value="disabled1" label="This option is disabled" disabled />
            <RadioGroup.Option value="enabled2" label="This option is also enabled" />
          </RadioGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading</h3>
        <RadioGroup loading label="Loading radio group" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required</h3>
        <RadioGroup required label="Required selection" helperText="You must choose one option">
          <RadioGroup.Option value="option1" label="Option 1" />
          <RadioGroup.Option value="option2" label="Option 2" />
          <RadioGroup.Option value="option3" label="Option 3" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Empty State</h3>
        <RadioGroup
          label="No options available"
          emptyMessage="No options are currently available. Please check back later."
        />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <RadioGroupWithState
          label="Custom themed radio group"
          labelColor="#7c3aed"
          groupBackgroundColor="#faf5ff"
          groupBorderColor="#e9d5ff"
          groupBorderWidth="2px"
          groupBorderRadius="12px"
          groupPadding="1rem"
        >
          <RadioGroup.Option
            value="purple"
            label="Purple theme"
            radioCheckedColor="#7c3aed"
            labelColor="#7c3aed"
          />
          <RadioGroup.Option
            value="violet"
            label="Violet theme"
            radioCheckedColor="#8b5cf6"
            labelColor="#8b5cf6"
          />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Card with Custom Styling</h3>
        <RadioGroupWithState variant="card" orientation="horizontal" label="Premium plans">
          <RadioGroup.Option
            value="pro"
            label="Pro Plan"
            description="$19/month"
            optionBackgroundColor="#f0f9ff"
            optionBorderColor="#0ea5e9"
            optionBorderWidth="2px"
            radioCheckedColor="#0ea5e9"
          />
          <RadioGroup.Option
            value="premium"
            label="Premium Plan"
            description="$39/month"
            optionBackgroundColor="#fefce8"
            optionBorderColor="#eab308"
            optionBorderWidth="2px"
            radioCheckedColor="#eab308"
          />
          <RadioGroup.Option
            value="enterprise"
            label="Enterprise Plan"
            description="$99/month"
            optionBackgroundColor="#f0fdf4"
            optionBorderColor="#22c55e"
            optionBorderWidth="2px"
            radioCheckedColor="#22c55e"
          />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rounded Design</h3>
        <RadioGroupWithState label="Rounded options">
          <RadioGroup.Option
            value="option1"
            label="Super rounded option"
            optionBorderRadius="9999px"
            optionPadding="1rem 1.5rem"
            optionBackgroundColor="#f3f4f6"
            hoverBackgroundColor="#e5e7eb"
          />
          <RadioGroup.Option
            value="option2"
            label="Another rounded option"
            optionBorderRadius="9999px"
            optionPadding="1rem 1.5rem"
            optionBackgroundColor="#f3f4f6"
            hoverBackgroundColor="#e5e7eb"
          />
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Large Radio Buttons</h3>
        <RadioGroupWithState label="Large radio design">
          <RadioGroup.Option
            value="large1"
            label="Large radio option 1"
            radioSize="32px"
            labelFontSize="1.125rem"
          />
          <RadioGroup.Option
            value="large2"
            label="Large radio option 2"
            radioSize="32px"
            labelFontSize="1.125rem"
          />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    plan: 'basic',
    billing: 'monthly',
    notifications: 'email',
    privacy: 'public',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h3 className="text-lg font-medium">Account Setup</h3>

      <RadioGroup
        name="plan"
        value={formData.plan}
        onChange={(value) => setFormData({ ...formData, plan: value })}
        label="Choose your plan"
        helperText="You can upgrade or downgrade at any time"
        variant="card"
        required
      >
        <RadioGroup.Option
          value="basic"
          label="Basic Plan"
          description="Perfect for individuals. $9/month, 10GB storage, basic support."
        />
        <RadioGroup.Option
          value="pro"
          label="Pro Plan"
          description="Great for teams. $19/month, 100GB storage, priority support."
        />
        <RadioGroup.Option
          value="enterprise"
          label="Enterprise Plan"
          description="For organizations. $49/month, unlimited storage, dedicated support."
        />
      </RadioGroup>

      <RadioGroup
        name="billing"
        value={formData.billing}
        onChange={(value) => setFormData({ ...formData, billing: value })}
        label="Billing frequency"
        orientation="horizontal"
      >
        <RadioGroup.Option value="monthly" label="Monthly" description="Pay monthly" />
        <RadioGroup.Option value="yearly" label="Yearly" description="Save 20%" />
      </RadioGroup>

      <RadioGroup
        name="notifications"
        value={formData.notifications}
        onChange={(value) => setFormData({ ...formData, notifications: value })}
        label="Notification preferences"
        size="sm"
      >
        <RadioGroup.Option value="email" label="Email notifications" />
        <RadioGroup.Option value="sms" label="SMS notifications" />
        <RadioGroup.Option value="push" label="Push notifications" />
        <RadioGroup.Option value="none" label="No notifications" />
      </RadioGroup>

      <RadioGroup
        name="privacy"
        value={formData.privacy}
        onChange={(value) => setFormData({ ...formData, privacy: value })}
        label="Profile visibility"
        status="warning"
      >
        <RadioGroup.Option
          value="public"
          label="Public"
          description="Anyone can see your profile"
        />
        <RadioGroup.Option
          value="friends"
          label="Friends only"
          description="Only friends can see your profile"
        />
        <RadioGroup.Option
          value="private"
          label="Private"
          description="Only you can see your profile"
        />
      </RadioGroup>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Create Account
      </button>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h4 className="font-medium mb-2">Current Values:</h4>
        <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Using Compound Components</h3>
        <RadioGroupWithState>
          <RadioGroup.Label>Choose your preferred programming language</RadioGroup.Label>
          <RadioGroup.Option
            value="javascript"
            label="JavaScript"
            description="Dynamic and versatile"
          />
          <RadioGroup.Option
            value="typescript"
            label="TypeScript"
            description="JavaScript with type safety"
          />
          <RadioGroup.Option value="python" label="Python" description="Simple and powerful" />
          <RadioGroup.Option value="rust" label="Rust" description="Fast and memory-safe" />
          <RadioGroup.HelperText>This will help us customize your experience</RadioGroup.HelperText>
        </RadioGroupWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Custom Label with Required Indicator
        </h3>
        <RadioGroupWithState required>
          <RadioGroup.Label required>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Important Selection
            </span>
          </RadioGroup.Label>
          <RadioGroup.Option value="option1" label="Critical option" />
          <RadioGroup.Option value="option2" label="Important option" />
          <RadioGroup.HelperText>
            <span className="text-red-600">This choice cannot be changed later</span>
          </RadioGroup.HelperText>
        </RadioGroupWithState>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Survey Question</h3>
        <div className="p-6 border rounded-lg bg-white">
          <RadioGroupWithState
            label="How satisfied are you with our service?"
            variant="outlined"
            size="lg"
          >
            <RadioGroup.Option
              value="very-satisfied"
              label="Very Satisfied"
              description="Excellent experience, exceeded expectations"
              icon={<span className="text-2xl">😍</span>}
            />
            <RadioGroup.Option
              value="satisfied"
              label="Satisfied"
              description="Good experience, met expectations"
              icon={<span className="text-2xl">😊</span>}
            />
            <RadioGroup.Option
              value="neutral"
              label="Neutral"
              description="Average experience, neither good nor bad"
              icon={<span className="text-2xl">😐</span>}
            />
            <RadioGroup.Option
              value="dissatisfied"
              label="Dissatisfied"
              description="Poor experience, below expectations"
              icon={<span className="text-2xl">😞</span>}
            />
            <RadioGroup.Option
              value="very-dissatisfied"
              label="Very Dissatisfied"
              description="Terrible experience, far below expectations"
              icon={<span className="text-2xl">😠</span>}
            />
          </RadioGroupWithState>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pricing Selector</h3>
        <div className="p-6 bg-gray-50 rounded-lg">
          <RadioGroupWithState
            variant="card"
            orientation="horizontal"
            label="Choose your subscription"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <RadioGroup.Option
              value="starter"
              label="Starter"
              description={
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    $9<span className="text-sm font-normal">/month</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• 5 projects</li>
                    <li>• 10GB storage</li>
                    <li>• Email support</li>
                  </ul>
                </div>
              }
            />
            <RadioGroup.Option
              value="professional"
              label="Professional"
              description={
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    $19<span className="text-sm font-normal">/month</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• 25 projects</li>
                    <li>• 100GB storage</li>
                    <li>• Priority support</li>
                    <li>• Advanced features</li>
                  </ul>
                </div>
              }
            />
            <RadioGroup.Option
              value="enterprise"
              label="Enterprise"
              description={
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    $49<span className="text-sm font-normal">/month</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Unlimited projects</li>
                    <li>• 1TB storage</li>
                    <li>• 24/7 phone support</li>
                    <li>• Custom integrations</li>
                  </ul>
                </div>
              }
            />
          </RadioGroupWithState>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Settings Panel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <RadioGroupWithState size="sm" label="Theme" defaultValue="light">
              <RadioGroup.Option value="light" label="Light mode" />
              <RadioGroup.Option value="dark" label="Dark mode" />
              <RadioGroup.Option value="auto" label="Follow system" />
            </RadioGroupWithState>

            <RadioGroupWithState size="sm" label="Language" defaultValue="en">
              <RadioGroup.Option value="en" label="English" />
              <RadioGroup.Option value="es" label="Español" />
              <RadioGroup.Option value="fr" label="Français" />
              <RadioGroup.Option value="de" label="Deutsch" />
            </RadioGroupWithState>
          </div>

          <div className="space-y-4">
            <RadioGroupWithState size="sm" label="Notification frequency" defaultValue="daily">
              <RadioGroup.Option value="realtime" label="Real-time" />
              <RadioGroup.Option value="daily" label="Daily digest" />
              <RadioGroup.Option value="weekly" label="Weekly summary" />
              <RadioGroup.Option value="never" label="Never" />
            </RadioGroupWithState>

            <RadioGroupWithState size="sm" label="Auto-save" defaultValue="5min">
              <RadioGroup.Option value="1min" label="Every minute" />
              <RadioGroup.Option value="5min" label="Every 5 minutes" />
              <RadioGroup.Option value="15min" label="Every 15 minutes" />
              <RadioGroup.Option value="never" label="Manual only" />
            </RadioGroupWithState>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All radio groups are keyboard accessible. Use Tab to navigate between groups, arrow keys
          to navigate within a group, and Space to select.
        </p>

        <RadioGroupWithState
          label="Screen reader friendly"
          helperText="This radio group has proper ARIA attributes and roles"
          name="accessibility-demo"
        >
          <RadioGroup.Option value="option1" label="First accessible option" />
          <RadioGroup.Option value="option2" label="Second accessible option" />
          <RadioGroup.Option value="option3" label="Third accessible option" />
        </RadioGroupWithState>

        <RadioGroupWithState
          label="High contrast mode"
          variant="outlined"
          focusRingWidth="4px"
          focusRingColor="#000000"
          name="high-contrast"
        >
          <RadioGroup.Option
            value="contrast1"
            label="High contrast option 1"
            optionBorderWidth="3px"
            focusRingWidth="4px"
          />
          <RadioGroup.Option
            value="contrast2"
            label="High contrast option 2"
            optionBorderWidth="3px"
            focusRingWidth="4px"
          />
        </RadioGroupWithState>

        <RadioGroupWithState label="Large click areas" size="lg" variant="card" name="large-areas">
          <RadioGroup.Option
            value="large1"
            label="Large clickable area"
            description="Easier to click for users with motor disabilities"
            optionPadding="1.5rem"
          />
          <RadioGroup.Option
            value="large2"
            label="Another large area"
            description="Better accessibility for touch devices"
            optionPadding="1.5rem"
          />
        </RadioGroupWithState>

        <RadioGroupWithState
          label="Error state with description"
          status="error"
          errorMessage="This selection is currently unavailable due to system maintenance"
          name="error-demo"
        >
          <RadioGroup.Option value="error1" label="Unavailable option 1" disabled />
          <RadioGroup.Option value="error2" label="Unavailable option 2" disabled />
        </RadioGroupWithState>
      </div>
    </div>
  ),
}
