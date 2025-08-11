import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Alert, AlertTitle, AlertDescription, AlertIcon, AlertDismissButton } from './Alert'
import LivePlayground from '../../../.storybook/components/LivePlayground'

// Wrapper component for controlled state management
const AlertWithState = ({
  children,
  dismissible = false,
  onDismiss,
  defaultOpen = true,
  ...props
}: React.ComponentProps<typeof Alert> & { defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleDismiss = () => {
    setIsOpen(false)
    onDismiss?.()
  }

  if (!isOpen) return null

  return (
    <Alert {...props} dismissible={dismissible} onDismiss={handleDismiss}>
      {children}
    </Alert>
  )
}

/**
 * Alert is a notification component that displays important information to users with extensive customization options.
 *
 * ## Features
 * - **Multiple Variants**: 4 visual styles from subtle backgrounds to solid fills
 * - **Size Options**: 3 size variants (sm, md, lg) for different contexts
 * - **Status States**: Built-in semantic colors for success, warning, error, and info states
 * - **Dismissible Alerts**: Optional close button with keyboard support (Escape key)
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use AlertTitle, AlertDescription, AlertIcon, and AlertDismissButton for full control
 * - **Extensive Styling**: Over 40 style props for complete visual customization
 * - **Smooth Transitions**: Customizable fade/slide animations with timing control
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Custom Rendering**: Override default rendering with custom render functions
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Alert status="success" title="Success!" description="Operation completed successfully." />
 * ```
 *
 * ### With Custom Icon:
 * ```tsx
 * <Alert
 *   status="warning"
 *   icon={<WarningIcon />}
 *   title="Warning"
 *   description="Please review this information."
 * />
 * ```
 *
 * ### Dismissible Alert:
 * ```tsx
 * <Alert
 *   status="error"
 *   dismissible
 *   onDismiss={() => console.log('Alert dismissed')}
 *   title="Error"
 *   description="Something went wrong."
 * />
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <Alert>
 *   <AlertIcon>⚠️</AlertIcon>
 *   <AlertTitle>Custom Alert</AlertTitle>
 *   <AlertDescription>This alert uses compound components.</AlertDescription>
 *   <AlertDismissButton />
 * </Alert>
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Alert
 *   backgroundColor="#fef3c7"
 *   borderColor="#f59e0b"
 *   textColor="#92400e"
 *   borderRadius="12px"
 *   padding="16px"
 * >
 *   Custom styled alert content
 * </Alert>
 * ```
 */
const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the alert',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the alert component',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status state for semantic coloring',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the alert interactions',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button and enable dismissal',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required (affects ARIA attributes)',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Content Props
    title: {
      control: 'text',
      description: 'Title content for the alert',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: 'Description content for the alert',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    icon: {
      control: false,
      description: 'Custom icon element',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    children: {
      control: false,
      description: 'Additional content or compound components',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessibility label for the alert',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the alert',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    // Custom Styles
    customStyles: {
      control: 'object',
      description: 'Custom styling options for the alert',
      table: {
        category: 'Custom Styles',
        type: { summary: 'AlertCustomStyles' },
      },
    },

    // Animation & Transitions
    transitionDuration: {
      control: 'number',
      description: 'Duration of transitions in milliseconds',
      table: {
        category: 'Animation',
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    _transitionType: {
      control: 'select',
      options: ['fade', 'slide', 'scale', 'none'],
      description: 'Type of transition animation',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
        defaultValue: { summary: 'fade' },
      },
    },

    // Event Handlers
    onDismiss: {
      control: false,
      description: 'Callback when alert is dismissed',
      table: {
        category: 'Event Handlers',
        type: { summary: '() => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Key down event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.KeyboardEvent) => void' },
      },
    },

    // Custom Render Functions
    renderTitle: {
      control: false,
      description: 'Custom render function for title',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: AlertTitleProps) => React.ReactNode' },
      },
    },
    renderDescription: {
      control: false,
      description: 'Custom render function for description',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: AlertDescriptionProps) => React.ReactNode' },
      },
    },
    renderIcon: {
      control: false,
      description: 'Custom render function for icon',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: AlertIconProps) => React.ReactNode' },
      },
    },
    renderDismissButton: {
      control: false,
      description: 'Custom render function for dismiss button',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: AlertDismissButtonProps) => React.ReactNode' },
      },
    },

    // Accessibility
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: 'text',
      description: 'ARIA described by reference',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <AlertWithState {...args} />,
  args: {
    title: 'Default Alert',
    description: 'This is a default alert with no specific status.',
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Alert (no props)</h3>
        <Alert>Basic alert content</Alert>
        <p className="text-xs text-gray-500 mt-2">All default styles applied</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Title and Description</h3>
        <Alert title="Information" description="This alert has both title and description." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Icon</h3>
        <Alert icon="ℹ️" title="With Icon" description="This alert includes a custom icon." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Helper Text</h3>
        <Alert
          title="Alert with Helper"
          description="This alert has additional helper text below."
          helperText="Additional context or instructions can go here."
        />
      </div>
    </div>
  ),
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <Alert
          variant="default"
          status="info"
          title="Default Variant"
          description="Subtle background with border styling."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <Alert
          variant="filled"
          status="success"
          title="Filled Variant"
          description="Solid background with high contrast text."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <Alert
          variant="outlined"
          status="warning"
          title="Outlined Variant"
          description="Transparent background with colored border."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Ghost</h3>
        <Alert
          variant="ghost"
          status="error"
          title="Ghost Variant"
          description="Minimal styling with subtle background."
        />
      </div>
    </div>
  ),
  args: {},
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Small</h3>
        <Alert
          size="sm"
          status="info"
          title="Small Alert"
          description="Compact size for minimal space usage."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Medium (Default)</h3>
        <Alert
          size="md"
          status="success"
          title="Medium Alert"
          description="Standard size for most use cases."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Large</h3>
        <Alert
          size="lg"
          status="warning"
          title="Large Alert"
          description="Larger size for important notifications or detailed content."
        />
      </div>
    </div>
  ),
  args: {},
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <Alert status="default" title="Default Status" description="Standard neutral coloring." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <Alert status="success" title="Success!" description="Operation completed successfully." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <Alert
          status="warning"
          title="Warning"
          description="Please review this information carefully."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <Alert status="error" title="Error" description="Something went wrong. Please try again." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Info Status</h3>
        <Alert
          status="info"
          title="Information"
          description="Here's some helpful information for you."
        />
      </div>
    </div>
  ),
  args: {},
}

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Normal State</h3>
        <Alert title="Normal Alert" description="Standard interactive alert." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled State</h3>
        <Alert
          disabled
          title="Disabled Alert"
          description="This alert is disabled and non-interactive."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading State</h3>
        <Alert loading title="Loading Alert" description="This alert is in a loading state." />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required State</h3>
        <Alert required title="Required Alert" description="This alert is marked as required." />
      </div>
    </div>
  ),
  args: {},
}

export const DismissibleAlerts: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Dismissible</h3>
        <AlertWithState
          dismissible
          title="Dismissible Alert"
          description="Click the × button to dismiss this alert."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Custom Dismiss Handler</h3>
        <AlertWithState
          dismissible
          status="warning"
          title="Custom Dismiss"
          description="This alert logs when dismissed."
          onDismiss={() => console.log('Alert was dismissed!')}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Keyboard Dismissible</h3>
        <AlertWithState
          dismissible
          status="info"
          title="Keyboard Support"
          description="Focus this alert and press Escape to dismiss it."
        />
        <p className="text-xs text-gray-500 mt-2">Tab to focus, then press Escape</p>
      </div>
    </div>
  ),
  args: {},
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Emoji Icons</h3>
        <div className="space-y-3">
          <Alert
            icon="✅"
            status="success"
            title="Success"
            description="Operation completed successfully."
          />
          <Alert
            icon="⚠️"
            status="warning"
            title="Warning"
            description="Please review this information."
          />
          <Alert icon="❌" status="error" title="Error" description="Something went wrong." />
          <Alert
            icon="ℹ️"
            status="info"
            title="Information"
            description="Here's some helpful information."
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">SVG Icons</h3>
        <Alert
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          status="info"
          title="Custom SVG Icon"
          description="This alert uses a custom SVG icon."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Complex Icon</h3>
        <Alert
          icon={
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          }
          title="Complex Icon"
          description="This alert uses a more complex icon element."
        />
      </div>
    </div>
  ),
  args: {},
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <Alert
          customStyles={{
            backgroundColor: '#fef3c7',
            borderColor: '#f59e0b',
            textColor: '#92400e',
          }}
          title="Custom Colors"
          description="This alert uses custom color styling."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rounded Corners</h3>
        <Alert
          customStyles={{
            borderRadius: '16px',
            backgroundColor: '#dbeafe',
            borderColor: '#3b82f6',
          }}
          title="Rounded Alert"
          description="This alert has custom border radius."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Shadow</h3>
        <Alert
          customStyles={{
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
          }}
          title="Shadow Alert"
          description="This alert has a custom box shadow."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Padding</h3>
        <Alert
          customStyles={{
            padding: '24px',
            backgroundColor: '#f0fdf4',
            borderColor: '#16a34a',
          }}
          title="Spacious Alert"
          description="This alert has custom padding for more breathing room."
        />
      </div>
    </div>
  ),
  args: {},
}

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Compound Usage</h3>
        <Alert>
          <AlertIcon>🔔</AlertIcon>
          <AlertTitle>Compound Alert</AlertTitle>
          <AlertDescription>
            This alert is built using compound components for maximum flexibility.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Dismiss Button</h3>
        <AlertWithState>
          <AlertIcon>⚠️</AlertIcon>
          <AlertTitle>Warning Alert</AlertTitle>
          <AlertDescription>This is a dismissible compound alert.</AlertDescription>
          <AlertDismissButton />
        </AlertWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Mixed Content</h3>
        <Alert status="success">
          <AlertIcon>✅</AlertIcon>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              View Changes
            </button>
            <button className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50">
              Undo
            </button>
          </div>
        </Alert>
      </div>
    </div>
  ),
  args: {},
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Form Validation Alerts</h3>
        <div className="space-y-4">
          <Alert
            status="error"
            title="Form Validation Failed"
            description="Please correct the following errors before submitting:"
          >
            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
              <li>Email address is required</li>
              <li>Password must be at least 8 characters</li>
              <li>Terms and conditions must be accepted</li>
            </ul>
          </Alert>

          <Alert
            status="success"
            dismissible
            title="Form Submitted Successfully"
            description="Your information has been saved and you will receive a confirmation email shortly."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">System Status Alerts</h3>
        <div className="space-y-4">
          <Alert
            status="warning"
            icon="🚧"
            title="Scheduled Maintenance"
            description="The system will be undergoing maintenance on Sunday, March 15th from 2:00 AM to 6:00 AM EST."
          />

          <Alert
            status="info"
            icon="📢"
            title="New Feature Available"
            description="We've added dark mode support! You can enable it in your account settings."
          >
            <div className="mt-3">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Try Dark Mode
              </button>
            </div>
          </Alert>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">E-commerce Alerts</h3>
        <div className="space-y-4">
          <Alert
            status="success"
            dismissible
            title="Item Added to Cart"
            description="1x Wireless Headphones has been added to your cart."
          >
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                View Cart
              </button>
              <button className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50">
                Continue Shopping
              </button>
            </div>
          </Alert>

          <Alert
            status="warning"
            title="Limited Stock"
            description="Only 3 items left in stock! Order soon to avoid disappointment."
          />
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All alerts have proper ARIA attributes and are announced by screen readers.
        </p>

        <Alert
          aria-label="Important security update notification"
          status="warning"
          title="Security Update Available"
          description="A security update is available for your account. Please update your password."
          helperText="This update is recommended for all users."
        />

        <Alert
          dismissible
          status="error"
          title="Error with detailed description"
          description="An error occurred while processing your request."
          aria-describedby="error-details"
          helperText="If this error persists, please contact support at support@example.com"
        />

        <Alert
          status="info"
          title="Keyboard Navigation"
          description="This alert can be focused and dismissed with the Escape key when dismissible."
          dismissible
        />

        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Accessibility features:</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• All alerts have role=&quot;alert&quot; for screen reader announcement</li>
            <li>• Dismissible alerts are keyboard accessible (Tab + Escape)</li>
            <li>• Proper ARIA labels and descriptions</li>
            <li>• Color is not the only indicator of status</li>
            <li>• Sufficient color contrast ratios</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components from Just UI are available in scope (Alert,
        AlertTitle, AlertDescription, AlertIcon, AlertDismissButton).
      </p>
      <LivePlayground
        code={`<Alert status="info">
  <AlertIcon>ℹ️</AlertIcon>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>This is a live playground.</AlertDescription>
  <AlertDismissButton />
</Alert>`}
      />
    </div>
  ),
  args: {},
}
