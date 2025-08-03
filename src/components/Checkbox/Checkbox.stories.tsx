import type { StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Checkbox } from './index'

/**
 * Checkbox is a versatile form control that allows users to select one or more options from a set.
 * It supports tri-state logic (checked, unchecked, indeterminate), group management, and extensive customization.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Tri-state Logic**: Supports unchecked, checked, and indeterminate states
 * - **Group Management**: Built-in group component for managing multiple checkboxes
 * - **7 Visual Variants**: Default, filled, outlined, ghost, toggle, switch, and card styles
 * - **3 Sizes**: Small, medium, and large options with consistent spacing
 * - **Status States**: Built-in support for success, warning, error, and info states
 * - **Loading State**: Built-in loading spinner for async operations
 * - **Extensive Styling**: Over 40 style props for complete visual customization
 * - **Accessibility**: Full ARIA support, keyboard navigation, screen reader compatibility
 * - **Form Ready**: Works seamlessly in forms with validation and error handling
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Checkbox
 *   label="Accept terms and conditions"
 *   defaultChecked={false}
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [checked, setChecked] = useState(false)
 *
 * <Checkbox
 *   checked={checked}
 *   onChange={setChecked}
 *   label="Subscribe to newsletter"
 * />
 * ```
 *
 * ### Tri-state Checkbox:
 * ```tsx
 * <Checkbox
 *   indeterminate={true}
 *   label="Select all items"
 * />
 * ```
 *
 * ### Checkbox Groups:
 * ```tsx
 * <Checkbox.Group
 *   label="Select features"
 *   value={selectedFeatures}
 *   onChange={setSelectedFeatures}
 * >
 *   <Checkbox.Item value="feature1" label="Feature 1" />
 *   <Checkbox.Item value="feature2" label="Feature 2" />
 *   <Checkbox.Item value="feature3" label="Feature 3" />
 * </Checkbox.Group>
 * ```
 *
 * ### With Helper Text:
 * ```tsx
 * <Checkbox
 *   label="Marketing emails"
 *   helperText="You can unsubscribe at any time in your settings"
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Checkbox
 *   variant="filled"
 *   size="lg"
 *   checkedBackgroundColor="#10b981"
 *   borderRadius="8px"
 *   focusRingColor="#10b981"
 *   label="Custom styled checkbox"
 * />
 * ```
 */

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core functionality
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when checkbox state changes',
    },

    // Features
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },

    // Styling
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'toggle', 'switch', 'card'],
      description: 'Visual variant of the checkbox',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status state for visual feedback',
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'scale', 'slide', 'bounce'],
      description: 'Animation transition style',
    },

    // Content
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to provide additional guidance',
    },
    errorText: {
      control: 'text',
      description: 'Error message text',
    },

    // Style props - disable complex objects
    renderLabel: { control: false },
    renderIcon: { control: false },
    renderDescription: { control: false },
    renderHelperText: { control: false },
    renderErrorText: { control: false },
    checkIcon: { control: false },
    indeterminateIcon: { control: false },
    loadingIcon: { control: false },
    onFocus: { control: false },
    onBlur: { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// State wrapper for interactive stories
interface CheckboxWithStateProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  [key: string]: unknown
}

const CheckboxWithState = ({
  checked: controlledChecked,
  onChange,
  ...props
}: CheckboxWithStateProps) => {
  const [checked, setChecked] = useState(controlledChecked || false)

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return <Checkbox {...props} checked={checked} onChange={handleChange} />
}

interface CheckboxGroupWithStateProps {
  value?: string[]
  onChange?: (value: string[]) => void
  children?: React.ReactNode
  [key: string]: unknown
}

const CheckboxGroupWithState = ({
  value: controlledValue,
  onChange,
  children,
  ...props
}: CheckboxGroupWithStateProps) => {
  const [value, setValue] = useState<string[]>(controlledValue || [])

  const handleChange = (newValue: string[]) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <Checkbox.Group {...props} value={value} onChange={handleChange}>
      {children}
    </Checkbox.Group>
  )
}

// Default Stories
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    label: 'Pre-selected option',
    defaultChecked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading state',
    loading: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Required field',
    required: true,
    description: 'This field is required',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive email updates about your account activity and important changes.',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Marketing emails',
    helperText: 'You can unsubscribe at any time in your settings',
  },
}

export const WithError: Story = {
  args: {
    label: 'Terms and conditions',
    errorText: 'You must accept the terms to continue',
    status: 'error',
  },
}

// Controlled Examples
export const Controlled: Story = {
  args: { label: 'Controlled checkbox' },
  render: () => {
    return <CheckboxWithState label="Controlled checkbox" />
  },
}

// Component for tri-state story
const TriStateExample = () => {
  const [state, setState] = useState<'unchecked' | 'checked' | 'indeterminate'>('unchecked')

  const handleChange = () => {
    setState((prev) => {
      if (prev === 'unchecked') return 'indeterminate'
      if (prev === 'indeterminate') return 'checked'
      return 'unchecked'
    })
  }

  return (
    <div className="space-y-4">
      <Checkbox
        label={`Current state: ${state}`}
        checked={state === 'checked'}
        indeterminate={state === 'indeterminate'}
        onChange={handleChange}
      />
      <p className="text-sm text-gray-600">
        Click to cycle through: unchecked → indeterminate → checked → unchecked
      </p>
    </div>
  )
}

export const TriState: Story = {
  args: { label: 'Tri-state checkbox' },
  render: () => <TriStateExample />,
}

// Variants
export const Variants: Story = {
  args: { label: 'Checkbox variants' },
  render: () => (
    <div className="space-y-4">
      <CheckboxWithState variant="default" label="Default" />
      <CheckboxWithState variant="filled" label="Filled" />
      <CheckboxWithState variant="outlined" label="Outlined" />
      <CheckboxWithState variant="ghost" label="Ghost" />
      <CheckboxWithState variant="toggle" label="Toggle" />
      <CheckboxWithState variant="switch" label="Switch" />
      <CheckboxWithState variant="card" label="Card" />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  args: { label: 'Checkbox sizes' },
  render: () => (
    <div className="space-y-4">
      <CheckboxWithState size="sm" label="Small checkbox" />
      <CheckboxWithState size="md" label="Medium checkbox" />
      <CheckboxWithState size="lg" label="Large checkbox" />
    </div>
  ),
}

// Status States
export const StatusStates: Story = {
  args: { label: 'Status states' },
  render: () => (
    <div className="space-y-4">
      <CheckboxWithState status="default" label="Default status" />
      <CheckboxWithState status="success" label="Success status" />
      <CheckboxWithState status="warning" label="Warning status" />
      <CheckboxWithState status="error" label="Error status" />
      <CheckboxWithState status="info" label="Info status" />
    </div>
  ),
}

// Transitions
export const Transitions: Story = {
  args: { label: 'Transition effects' },
  render: () => (
    <div className="space-y-4">
      <CheckboxWithState transition="none" label="No transition" />
      <CheckboxWithState transition="fade" label="Fade transition" />
      <CheckboxWithState transition="scale" label="Scale transition" />
      <CheckboxWithState transition="slide" label="Slide transition" />
      <CheckboxWithState transition="bounce" label="Bounce transition" />
    </div>
  ),
}

// Group Examples
export const BasicGroup: Story = {
  args: { label: 'Checkbox group' },
  render: () => (
    <CheckboxGroupWithState label="Select your interests" description="Choose all that apply">
      <Checkbox.Item value="technology" label="Technology" />
      <Checkbox.Item value="design" label="Design" />
      <Checkbox.Item value="business" label="Business" />
      <Checkbox.Item value="marketing" label="Marketing" />
    </CheckboxGroupWithState>
  ),
}

// Component for select all example
const SelectAllExample = () => {
  const [value, setValue] = useState<string[]>([])
  const options = ['option1', 'option2', 'option3', 'option4']

  const allSelected = options.every((option) => value.includes(option))
  const someSelected = value.length > 0 && !allSelected

  const handleSelectAll = () => {
    if (allSelected) {
      setValue([])
    } else {
      setValue(options)
    }
  }

  return (
    <div className="space-y-4">
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={handleSelectAll}
        label="Select all options"
      />
      <hr className="border-gray-200" />
      <Checkbox.Group value={value} onChange={setValue}>
        <Checkbox.Item value="option1" label="Option 1" />
        <Checkbox.Item value="option2" label="Option 2" />
        <Checkbox.Item value="option3" label="Option 3" />
        <Checkbox.Item value="option4" label="Option 4" />
      </Checkbox.Group>
    </div>
  )
}

export const GroupWithSelectAll: Story = {
  args: { label: 'Group with select all' },
  render: () => <SelectAllExample />,
}

// Component for validation example
const ValidationExample = () => {
  const [value, setValue] = useState<string[]>([])
  const [showError, setShowError] = useState(false)

  const handleSubmit = () => {
    if (value.length === 0) {
      setShowError(true)
    } else {
      setShowError(false)
      alert(`Selected: ${value.join(', ')}`)
    }
  }

  return (
    <div className="space-y-4">
      <CheckboxGroupWithState
        label="Required selection"
        description="Select at least one option"
        required
        errorText={showError ? 'Please select at least one option' : undefined}
        value={value}
        onChange={(newValue: string[]) => {
          setValue(newValue)
          if (newValue.length > 0) setShowError(false)
        }}
      >
        <Checkbox.Item value="feature1" label="Feature 1" />
        <Checkbox.Item value="feature2" label="Feature 2" />
        <Checkbox.Item value="feature3" label="Feature 3" />
      </CheckboxGroupWithState>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  )
}

export const GroupWithError: Story = {
  args: { label: 'Group with validation' },
  render: () => <ValidationExample />,
}

// Custom Styling
export const CustomStyling: Story = {
  args: { label: 'Custom styling' },
  render: () => (
    <div className="space-y-6">
      <CheckboxWithState
        label="Custom colors"
        checkedBackgroundColor="#10b981"
        checkmarkColor="#ffffff"
        focusRingColor="#10b981"
        borderColor="#10b981"
      />
      <CheckboxWithState
        label="Custom border radius"
        borderRadius="12px"
        checkedBackgroundColor="#8b5cf6"
        focusRingColor="#8b5cf6"
      />
      <CheckboxWithState
        label="Custom typography"
        labelFontSize="18px"
        labelFontWeight="600"
        labelTextColor="#374151"
        description="With custom description styling"
        descriptionFontSize="14px"
        descriptionTextColor="#6b7280"
      />
      <CheckboxWithState
        label="Custom spacing and shadows"
        gap="16px"
        padding="8px"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        checkedBoxShadow="0 4px 6px -1px rgba(59, 130, 246, 0.3)"
      />
    </div>
  ),
}

// Accessibility Demo
export const AccessibilityDemo: Story = {
  args: { label: 'Accessibility features' },
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Keyboard Navigation</h3>
        <p className="text-sm text-gray-700 mb-4">
          Use Tab to focus, Space or Enter to toggle checkboxes
        </p>
        <div className="space-y-2">
          <CheckboxWithState label="First checkbox" />
          <CheckboxWithState label="Second checkbox" />
          <CheckboxWithState label="Third checkbox" />
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Screen Reader Support</h3>
        <CheckboxWithState
          label="Checkbox with full ARIA support"
          description="This checkbox is properly labeled and described for screen readers"
          aria-label="Custom aria label"
          required
        />
      </div>

      <div className="p-4 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Form Integration</h3>
        <form className="space-y-2">
          <CheckboxWithState name="newsletter" label="Subscribe to newsletter" required />
          <CheckboxWithState
            name="terms"
            label="I agree to the terms and conditions"
            required
            errorText="This field is required"
          />
        </form>
      </div>
    </div>
  ),
}

// Real-world Examples
// Component for form consent example
const FormConsentExample = () => {
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })

  const updateConsent = (key: keyof typeof consents) => (checked: boolean) => {
    setConsents((prev) => ({ ...prev, [key]: checked }))
  }

  const canSubmit = consents.terms && consents.privacy

  return (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-medium">Create Account</h3>

      <Checkbox
        checked={consents.terms}
        onChange={updateConsent('terms')}
        required
        status={!consents.terms ? 'error' : 'default'}
        label="I agree to the Terms of Service"
        errorText={!consents.terms ? 'Required' : undefined}
      />

      <Checkbox
        checked={consents.privacy}
        onChange={updateConsent('privacy')}
        required
        status={!consents.privacy ? 'error' : 'default'}
        label="I agree to the Privacy Policy"
        errorText={!consents.privacy ? 'Required' : undefined}
      />

      <Checkbox
        checked={consents.marketing}
        onChange={updateConsent('marketing')}
        label="Send me marketing emails"
        description="Optional - You can change this anytime in settings"
      />

      <button
        disabled={!canSubmit}
        className={`w-full px-4 py-2 rounded font-medium ${
          canSubmit
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Create Account
      </button>
    </div>
  )
}

export const FormConsent: Story = {
  args: { label: 'Form consent example' },
  render: () => <FormConsentExample />,
}

// Component for settings panel example
const SettingsPanelExample = () => {
  const [settings, setSettings] = useState({
    notifications: ['email'],
    privacy: ['analytics'],
    features: [],
  })

  return (
    <div className="max-w-2xl space-y-8">
      <h3 className="text-xl font-semibold">Account Settings</h3>

      <CheckboxGroupWithState
        label="Notification Preferences"
        description="Choose how you'd like to be notified"
        value={settings.notifications}
        onChange={(value: string[]) => setSettings((prev) => ({ ...prev, notifications: value }))}
      >
        <Checkbox.Item value="email" label="Email notifications" />
        <Checkbox.Item value="sms" label="SMS notifications" />
        <Checkbox.Item value="push" label="Push notifications" />
        <Checkbox.Item value="browser" label="Browser notifications" />
      </CheckboxGroupWithState>

      <CheckboxGroupWithState
        label="Privacy Settings"
        description="Control your data and privacy preferences"
        value={settings.privacy}
        onChange={(value: string[]) => setSettings((prev) => ({ ...prev, privacy: value }))}
      >
        <Checkbox.Item
          value="analytics"
          label="Allow analytics tracking"
          description="Help us improve our service by sharing anonymous usage data"
        />
        <Checkbox.Item
          value="marketing"
          label="Personalized marketing"
          description="Receive targeted content based on your interests"
        />
        <Checkbox.Item
          value="third-party"
          label="Third-party integrations"
          description="Allow connections with external services"
        />
      </CheckboxGroupWithState>

      <CheckboxGroupWithState
        label="Beta Features"
        description="Try new features before they're released"
        helperText="These features may be unstable"
        value={settings.features}
        onChange={(value: string[]) => setSettings((prev) => ({ ...prev, features: value }))}
      >
        <Checkbox.Item value="new-ui" label="New user interface" />
        <Checkbox.Item value="ai-features" label="AI-powered features" />
        <Checkbox.Item value="advanced-analytics" label="Advanced analytics" />
      </CheckboxGroupWithState>
    </div>
  )
}

export const SettingsPanel: Story = {
  args: { label: 'Settings panel example' },
  render: () => <SettingsPanelExample />,
}
