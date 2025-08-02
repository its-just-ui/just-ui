import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Alert, AlertTitle, AlertDescription, AlertIcon, AlertDismissButton } from './Alert'

/**
 * # Alert Component
 * 
 * A comprehensive alert component with multiple variants, sizes, and customization options.
 * 
 * ## Usage
 * ```tsx
 * import { Alert, AlertTitle, AlertDescription } from '@/components/Alert'
 * 
 * // Basic usage
 * <Alert status="success" title="Success!" description="Operation completed successfully." />
 * 
 * // With custom icon
 * <Alert 
 *   status="warning" 
 *   icon={<WarningIcon />}
 *   title="Warning" 
 *   description="Please review this information." 
 * />
 * 
 * // Dismissible alert
 * <Alert 
 *   status="error" 
 *   dismissible 
 *   onDismiss={() => console.log('Alert dismissed')}
 *   title="Error" 
 *   description="Something went wrong." 
 * />
 * ```
 * 
 * ## Features
 * - **Multiple variants**: default, filled, outlined, ghost
 * - **Size options**: sm, md, lg
 * - **Status types**: default, success, warning, error, info
 * - **Dismissible alerts** with keyboard support (Escape key)
 * - **Loading states** with customizable messages
 * - **Disabled states** for form integration
 * - **Custom styling** with granular control
 * - **Accessibility** with proper ARIA attributes
 * - **Compound component** structure for flexible usage
 */

// Wrapper component for controlled state management
const AlertWithState = ({ 
  children, 
  defaultOpen = true,
  onDismiss,
  ...props 
}: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  const handleDismiss = () => {
    setIsOpen(false)
    onDismiss?.()
  }
  
  if (!isOpen) return null
  
  return (
    <Alert {...props} onDismiss={handleDismiss}>
      {children}
    </Alert>
  )
}

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive alert component with multiple variants, sizes, and customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Variant and styling
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost'],
      description: 'The visual variant of the alert',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the alert',
      defaultValue: 'md',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'The status/type of the alert',
      defaultValue: 'default',
    },
    
    // Functional props
    disabled: {
      control: 'boolean',
      description: 'Whether the alert is disabled',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the alert is in a loading state',
      defaultValue: false,
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      defaultValue: false,
    },
    required: {
      control: 'boolean',
      description: 'Whether the alert is required (for form integration)',
      defaultValue: false,
    },
    
    // Content
    title: {
      control: 'text',
      description: 'The title of the alert',
    },
    description: {
      control: 'text',
      description: 'The description text of the alert',
    },
    label: {
      control: 'text',
      description: 'Accessibility label for the alert',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the alert',
    },
    
    // Animation
    transitionDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Duration of transitions in milliseconds',
      defaultValue: 200,
    },
    
    // Event handlers (disabled in controls)
    onChange: { control: false },
    onDismiss: { control: false },
    onFocus: { control: false },
    onBlur: { control: false },
    onKeyDown: { control: false },
    
    // Custom render functions (disabled in controls)
    renderTitle: { control: false },
    renderDescription: { control: false },
    renderIcon: { control: false },
    renderDismissButton: { control: false },
    
    // Custom styles (disabled in controls)
    customStyles: { control: false },
    
    // State props (disabled in controls)
    value: { control: false },
    defaultOpen: { control: false },
    
    // Content props (disabled in controls)
    icon: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Basic Usage Stories
export const Default: Story = {
  args: {
    title: 'Default Alert',
    description: 'This is a default alert with some descriptive text.',
    status: 'default',
    variant: 'default',
    size: 'md',
  },
}

export const Success: Story = {
  args: {
    title: 'Success!',
    description: 'Your operation completed successfully.',
    status: 'success',
    variant: 'default',
    size: 'md',
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Please review this important information.',
    status: 'warning',
    variant: 'default',
    size: 'md',
  },
}

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    status: 'error',
    variant: 'default',
    size: 'md',
  },
}

export const Info: Story = {
  args: {
    title: 'Information',
    description: 'Here is some useful information for you.',
    status: 'info',
    variant: 'default',
    size: 'md',
  },
}

// Variant Showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default" status="success" title="Default Variant" description="This is the default variant." />
      <Alert variant="filled" status="success" title="Filled Variant" description="This is the filled variant." />
      <Alert variant="outlined" status="success" title="Outlined Variant" description="This is the outlined variant." />
      <Alert variant="ghost" status="success" title="Ghost Variant" description="This is the ghost variant." />
    </div>
  ),
}

// Size Showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert size="sm" status="info" title="Small Alert" description="This is a small alert." />
      <Alert size="md" status="info" title="Medium Alert" description="This is a medium alert." />
      <Alert size="lg" status="info" title="Large Alert" description="This is a large alert." />
    </div>
  ),
}

// Status Showcase
export const Statuses: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert status="default" title="Default Status" description="This is a default status alert." />
      <Alert status="success" title="Success Status" description="This is a success status alert." />
      <Alert status="warning" title="Warning Status" description="This is a warning status alert." />
      <Alert status="error" title="Error Status" description="This is an error status alert." />
      <Alert status="info" title="Info Status" description="This is an info status alert." />
    </div>
  ),
}

// Interactive Examples
export const DismissibleAlert: Story = {
  render: () => (
    <AlertWithState
      status="warning"
      dismissible
      title="Dismissible Alert"
      description="This alert can be dismissed by clicking the X button or pressing Escape."
      onDismiss={() => console.log('Alert dismissed')}
    />
  ),
}

export const LoadingAlert: Story = {
  args: {
    title: 'Loading Alert',
    description: 'This alert is in a loading state.',
    loading: true,
    status: 'info',
  },
}

export const DisabledAlert: Story = {
  args: {
    title: 'Disabled Alert',
    description: 'This alert is disabled and cannot be interacted with.',
    disabled: true,
    status: 'default',
  },
}

// Custom Icon Examples
export const WithCustomIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        status="success"
        icon={
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        }
        title="Success with Icon"
        description="This alert has a custom success icon."
      />
      
      <Alert
        status="warning"
        icon={
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        }
        title="Warning with Icon"
        description="This alert has a custom warning icon."
      />
    </div>
  ),
}

// Form Integration Example
const FormIntegrationComponent = () => {
  const [alerts, setAlerts] = useState<Array<{ id: number; type: string; message: string }>>([])
  
  const addAlert = (type: string, message: string) => {
    const newAlert = { id: Date.now(), type, message }
    setAlerts(prev => [...prev, newAlert])
  }
  
  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => addAlert('success', 'Form submitted successfully!')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Success
        </button>
        <button
          onClick={() => addAlert('error', 'Please fix the errors in the form.')}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Add Error
        </button>
        <button
          onClick={() => addAlert('warning', 'Some fields are missing.')}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Add Warning
        </button>
      </div>
      
      <div className="space-y-2">
        {alerts.map(alert => (
          <AlertWithState
            key={alert.id}
            status={alert.type as any}
            dismissible
            title={alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            description={alert.message}
            onDismiss={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </div>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

// Custom Styling Examples
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        status="success"
        title="Custom Styled Alert"
        description="This alert has custom styling applied."
        customStyles={{
          backgroundColor: '#f0f9ff',
          borderColor: '#0ea5e9',
          textColor: '#0c4a6e',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        }}
      />
      
      <Alert
        status="warning"
        title="Gradient Background"
        description="This alert has a gradient background."
        customStyles={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderColor: '#f59e0b',
          textColor: '#92400e',
          borderRadius: '8px',
        }}
      />
    </div>
  ),
}

// Advanced Usage Examples
export const CompoundComponentUsage: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert status="info" size="lg">
        <AlertIcon>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </AlertIcon>
        <AlertTitle>Compound Component</AlertTitle>
        <AlertDescription>
          This alert uses the compound component pattern with separate AlertIcon, AlertTitle, and AlertDescription components.
        </AlertDescription>
        <AlertDismissButton />
      </Alert>
    </div>
  ),
}

export const CustomRenderFunctions: Story = {
  render: () => (
    <Alert
      status="success"
      title="Custom Rendered Alert"
      description="This alert uses custom render functions."
      renderTitle={(props) => (
        <h3 className="text-xl font-bold text-green-800" {...props}>
          {props.children}
        </h3>
      )}
      renderDescription={(props) => (
        <p className="text-green-700 italic" {...props}>
          {props.children}
        </p>
      )}
      renderDismissButton={(props) => (
        <button
          {...props}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Close
        </button>
      )}
    />
  ),
}

// Accessibility Examples
export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        status="error"
        label="Critical error alert"
        helperText="This alert provides additional context for screen readers."
        title="Accessibility Alert"
        description="This alert includes proper ARIA attributes and helper text for better accessibility."
      />
      
      <Alert
        status="warning"
        dismissible
        label="Dismissible warning alert"
        title="Keyboard Accessible"
        description="This alert can be dismissed using the Escape key or by clicking the dismiss button."
      />
    </div>
  ),
}

// Real-world Usage Examples
const NotificationSystemComponent = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Profile Updated', message: 'Your profile has been successfully updated.' },
    { id: 2, type: 'warning', title: 'Storage Warning', message: 'You are running low on storage space.' },
    { id: 3, type: 'error', title: 'Connection Lost', message: 'Your connection has been interrupted.' },
  ])
  
  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }
  
  return (
    <div className="fixed top-4 right-4 space-y-2 w-96">
      {notifications.map(notification => (
        <AlertWithState
          key={notification.id}
          status={notification.type as any}
          dismissible
          title={notification.title}
          description={notification.message}
          onDismiss={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

export const NotificationSystem: Story = {
  render: () => <NotificationSystemComponent />,
}