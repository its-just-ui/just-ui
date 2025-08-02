import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input, InputProps } from './Input'

/**
 * Input is a versatile form input component with extensive customization options and compound architecture.
 *
 * ## Features
 * - **Multiple Variants**: 5 visual styles including default, filled, outlined, ghost, and underlined
 * - **Flexible Sizing**: 3 size options (sm, md, lg) with proper spacing and typography
 * - **Status States**: Built-in semantic status colors for different contexts (default, success, warning, error, info)
 * - **Interactive Elements**: Support for icons, loading states, labels, and helper text
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use Input.Icon, Input.Label, and Input.HelperText for flexible composition
 * - **Built-in Labels**: Integrated label and helper text with status-based styling
 * - **Extensive Styling**: Over 50 style props for complete visual customization
 * - **Input Types**: Support for all HTML input types with proper validation
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Form Integration**: Works seamlessly in forms with validation and state management
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Input placeholder="Enter text..." />
 * <Input variant="filled" size="lg" placeholder="Large filled input" />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [value, setValue] = useState('')
 *
 * <Input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="Controlled input"
 * />
 * ```
 *
 * ### With Icons and States:
 * ```tsx
 * <Input
 *   icon={<SearchIcon />}
 *   placeholder="Search..."
 *   loading={isLoading}
 * />
 * ```
 *
 * ### With Labels and Helper Text:
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 *   required
 * />
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <Input type="email" placeholder="Enter your email" required>
 *   <Input.Label>Email Address</Input.Label>
 *   <Input.Icon>📧</Input.Icon>
 *   <Input.HelperText>We'll never share your email</Input.HelperText>
 * </Input>
 * ```
 *
 * ### Form Integration:
 * ```tsx
 * <form onSubmit={handleSubmit}>
 *   <Input
 *     label="Full Name"
 *     placeholder="Enter your name"
 *     required
 *     status={errors.name ? 'error' : 'default'}
 *     helperText={errors.name || 'Enter your full legal name'}
 *   />
 * </form>
 * ```
 */

// Controlled Input Component for Stories
const InputWithState = ({
  value: initialValue = '',
  onChange,
  ...props
}: InputProps & { onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChange?.(event)
  }

  return <Input {...props} value={value} onChange={handleChange} />
}

// Form Integration Component
const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('Form submitted successfully!')
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-6">Registration Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            status={errors.firstName ? 'error' : 'default'}
            helperText={errors.firstName}
            required
            disabled={isSubmitting}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            status={errors.lastName ? 'error' : 'default'}
            helperText={errors.lastName}
            required
            disabled={isSubmitting}
          />
        </div>

        <Input
          type="email"
          label="Email Address"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          status={errors.email ? 'error' : 'default'}
          helperText={errors.email || 'We will send verification to this email'}
          icon={<span>📧</span>}
          required
          disabled={isSubmitting}
        />

        <Input
          type="tel"
          label="Phone Number"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange('phone')}
          status={errors.phone ? 'error' : 'default'}
          helperText={errors.phone}
          icon={<span>📱</span>}
          required
          disabled={isSubmitting}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange('password')}
          status={errors.password ? 'error' : 'default'}
          helperText={errors.password || 'Must be at least 8 characters'}
          icon={<span>🔒</span>}
          required
          disabled={isSubmitting}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          status={errors.confirmPassword ? 'error' : 'default'}
          helperText={errors.confirmPassword}
          icon={<span>🔒</span>}
          required
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input is a versatile form input component with extensive customization options and compound architecture.

## Features
- **Multiple Variants**: 5 visual styles including default, filled, outlined, ghost, and underlined
- **Flexible Sizing**: 3 size options (sm, md, lg) with proper spacing and typography
- **Status States**: Built-in semantic status colors for different contexts (default, success, warning, error, info)
- **Interactive Elements**: Support for icons, loading states, labels, and helper text
- **Loading & Disabled States**: Handle async operations and disabled states gracefully
- **Compound Components**: Use Input.Icon, Input.Label, and Input.HelperText for flexible composition
- **Built-in Labels**: Integrated label and helper text with status-based styling
- **Extensive Styling**: Over 50 style props for complete visual customization
- **Input Types**: Support for all HTML input types with proper validation
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Form Integration**: Works seamlessly in forms with validation and state management

## Usage

### Basic Usage:
\`\`\`tsx
<Input placeholder="Enter text..." />
<Input variant="filled" size="lg" placeholder="Large filled input" />
\`\`\`

### Controlled Usage:
\`\`\`tsx
const [value, setValue] = useState('')

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Controlled input"
/>
\`\`\`

### With Icons and States:
\`\`\`tsx
<Input
  icon={<SearchIcon />}
  placeholder="Search..."
  loading={isLoading}
/>
\`\`\`

### With Labels and Helper Text:
\`\`\`tsx
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  required
/>
\`\`\`

### Compound Component Usage:
\`\`\`tsx
<Input type="email" placeholder="Enter your email" required>
  <Input.Label>Email Address</Input.Label>
  <Input.Icon>📧</Input.Icon>
  <Input.HelperText>We'll never share your email</Input.HelperText>
</Input>
\`\`\`

### Form Integration:
\`\`\`tsx
<form onSubmit={handleSubmit}>
  <Input
    label="Full Name"
    placeholder="Enter your name"
    required
    status={errors.name ? 'error' : 'default'}
    helperText={errors.name || 'Enter your full legal name'}
  />
</form>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core props
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'underlined'],
      description: 'Visual variant of the input',
      defaultValue: 'default',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      defaultValue: 'md',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status/validation state of the input',
      defaultValue: 'default',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark input as required',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Make input read-only',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Content props
    label: {
      control: 'text',
      description: 'Label text for the input',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Icon element to display',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon',
      defaultValue: 'left',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Text to show when loading',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    // Input specific props
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
      ],
      description: 'HTML input type',
      defaultValue: 'text',
      table: {
        category: 'Input',
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Controlled value',
      table: {
        category: 'Input',
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled usage',
      table: {
        category: 'Input',
        type: { summary: 'string' },
      },
    },
    autoComplete: {
      control: 'text',
      description: 'HTML autocomplete attribute',
      table: {
        category: 'Input',
        type: { summary: 'string' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto focus on mount',
      table: {
        category: 'Input',
        type: { summary: 'boolean' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
      table: {
        category: 'Input',
        type: { summary: 'number' },
      },
    },
    minLength: {
      control: 'number',
      description: 'Minimum character length',
      table: {
        category: 'Input',
        type: { summary: 'number' },
      },
    },

    // Event handlers
    onChange: {
      control: false,
      description: 'Change event handler',
      table: {
        category: 'Events',
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler',
      table: {
        category: 'Events',
        type: { summary: '(event: FocusEvent<HTMLInputElement>) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler',
      table: {
        category: 'Events',
        type: { summary: '(event: FocusEvent<HTMLInputElement>) => void' },
      },
    },

    // Styling props
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Border width',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Text color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    fontSize: {
      control: 'text',
      description: 'Font size',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    width: {
      control: 'text',
      description: 'Width',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: 'Height',
      table: {
        category: 'Styling',
        type: { summary: 'string | number' },
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

// Variants Showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Variants</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Default</label>
            <InputWithState variant="default" placeholder="Default input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Filled</label>
            <InputWithState variant="filled" placeholder="Filled input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Outlined</label>
            <InputWithState variant="outlined" placeholder="Outlined input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ghost</label>
            <InputWithState variant="ghost" placeholder="Ghost input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Underlined</label>
            <InputWithState variant="underlined" placeholder="Underlined input" />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Sizes Showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Sizes</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Small</label>
            <InputWithState size="sm" placeholder="Small input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Medium (Default)</label>
            <InputWithState size="md" placeholder="Medium input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Large</label>
            <InputWithState size="lg" placeholder="Large input" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="space-y-3">
          <InputWithState size="sm" icon={<span>🔍</span>} placeholder="Small with icon" />
          <InputWithState size="md" icon={<span>📧</span>} placeholder="Medium with icon" />
          <InputWithState size="lg" icon={<span>👤</span>} placeholder="Large with icon" />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Status States
export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status States</h3>
        <div className="space-y-3">
          <InputWithState
            status="default"
            placeholder="Default state"
            helperText="This is a default input"
          />
          <InputWithState
            status="success"
            placeholder="Success state"
            helperText="Input is valid"
            icon={<span>✅</span>}
          />
          <InputWithState
            status="warning"
            placeholder="Warning state"
            helperText="Please review this field"
            icon={<span>⚠️</span>}
          />
          <InputWithState
            status="error"
            placeholder="Error state"
            helperText="This field is required"
            icon={<span>❌</span>}
          />
          <InputWithState
            status="info"
            placeholder="Info state"
            helperText="Additional information"
            icon={<span>ℹ️</span>}
          />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Types</h3>
        <div className="space-y-3">
          <InputWithState type="text" placeholder="Text input" icon={<span>📝</span>} />
          <InputWithState type="email" placeholder="Email input" icon={<span>📧</span>} />
          <InputWithState type="password" placeholder="Password input" icon={<span>🔒</span>} />
          <InputWithState type="number" placeholder="Number input" icon={<span>🔢</span>} />
          <InputWithState type="tel" placeholder="Phone input" icon={<span>📱</span>} />
          <InputWithState type="url" placeholder="URL input" icon={<span>🔗</span>} />
          <InputWithState type="search" placeholder="Search input" icon={<span>🔍</span>} />
          <InputWithState type="date" icon={<span>📅</span>} />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Loading and Disabled States
export const LoadingAndDisabled: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Loading & Disabled States</h3>
        <div className="space-y-3">
          <InputWithState loading placeholder="Loading..." loadingText="Checking availability..." />
          <InputWithState disabled placeholder="Disabled input" value="Cannot edit this" />
          <InputWithState readOnly placeholder="Read-only input" value="Read-only value" />
          <InputWithState
            loading
            variant="filled"
            icon={<span>🔍</span>}
            placeholder="Searching..."
          />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// With Labels and Helper Text
export const WithLabelsAndHelperText: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Built-in Labels and Helper Text</h3>
        <div className="space-y-4">
          <InputWithState
            type="email"
            placeholder="Enter your email"
            icon={<span>📧</span>}
            label="Email Address"
            helperText="We'll never share your email with anyone"
            required
          />

          <InputWithState
            type="password"
            placeholder="Enter password"
            icon={<span>🔒</span>}
            status="warning"
            label="Password"
            helperText="Must be at least 8 characters long"
          />

          <InputWithState
            type="tel"
            placeholder="+1 (555) 123-4567"
            icon={<span>📱</span>}
            status="success"
            label="Phone Number"
            helperText="Valid phone number format"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compound Component Usage</h3>
        <div className="space-y-4">
          <Input type="email" placeholder="Enter your email" required>
            <Input.Label required>Email Address (Compound)</Input.Label>
            <Input.Icon>📧</Input.Icon>
            <Input.HelperText>This uses compound component syntax</Input.HelperText>
          </Input>

          <Input type="password" placeholder="Enter password" status="warning">
            <Input.Label>Password (Compound)</Input.Label>
            <Input.Icon>🔒</Input.Icon>
            <Input.HelperText>Must be at least 8 characters long</Input.HelperText>
          </Input>
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling</h3>
        <div className="space-y-3">
          <InputWithState
            placeholder="Custom colors"
            backgroundColor="#f0f9ff"
            borderColor="#0ea5e9"
            textColor="#0c4a6e"
            borderRadius="12px"
            icon={<span style={{ color: '#0ea5e9' }}>🎨</span>}
          />

          <InputWithState
            placeholder="Custom typography"
            fontSize="16px"
            fontWeight="600"
            fontFamily="monospace"
            borderWidth="2px"
            borderColor="#8b5cf6"
            icon={<span>⌨️</span>}
          />

          <InputWithState
            placeholder="Custom spacing"
            padding="16px 20px"
            borderRadius="20px"
            backgroundColor="#fef3c7"
            borderColor="#f59e0b"
            icon={<span>📏</span>}
          />

          <InputWithState
            placeholder="Box shadow"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            borderColor="#10b981"
            focusBoxShadow="0 8px 25px -8px rgba(16, 185, 129, 0.5)"
            icon={<span>✨</span>}
          />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Form Integration
export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}

// Controlled vs Uncontrolled Component
const ControlledVsUncontrolledComponent = () => {
  const [controlledValue, setControlledValue] = useState('Controlled value')

  return (
    <div className="space-y-6 w-80">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Controlled vs Uncontrolled</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Controlled Input</label>
          <Input
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Controlled input"
          />
          <div className="text-xs text-gray-500 mt-1">Value: {controlledValue}</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Uncontrolled Input</label>
          <Input defaultValue="Default value" placeholder="Uncontrolled input" />
          <div className="text-xs text-gray-500 mt-1">Uses defaultValue prop</div>
        </div>
      </div>
    </div>
  )
}

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => <ControlledVsUncontrolledComponent />,
  args: {
    placeholder: 'Button content will be overridden by render function',
  },
}
