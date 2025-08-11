import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Switch is a toggle component that allows users to switch between two states (on/off, true/false).
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 5 pre-defined visual styles
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 * - **Extensive Styling**: Over 50 style props for complete customization
 * - **Loading State**: Built-in loading indicator support
 * - **Label Support**: Flexible label positioning and custom rendering
 * - **Accessibility**: Full keyboard and screen reader support
 * - **Form Ready**: Works seamlessly in forms with name and value props
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Switch
 *   defaultChecked={false}
 *   label="Enable notifications"
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [enabled, setEnabled] = useState(false)
 *
 * <Switch
 *   checked={enabled}
 *   onChange={setEnabled}
 *   label="Enable feature"
 * />
 * ```
 *
 * ### With Helper Text:
 * ```tsx
 * <Switch
 *   label="Auto-save"
 *   helperText="Automatically save changes every 5 minutes"
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Switch
 *   trackBackgroundColorChecked="#10b981"
 *   thumbIcon={<MoonIcon />}
 *   thumbIconChecked={<SunIcon />}
 * />
 * ```
 */
const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when checked state changes',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Make the switch required in forms',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'flat', 'elevated'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
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
    label: {
      control: 'text',
      description: 'Label text for the switch',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the label relative to the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'end' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the switch',
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
    transition: {
      control: 'select',
      options: ['none', 'slide', 'fade', 'bounce', 'smooth'],
      description: 'Animation style for the thumb',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'slide' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transition in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
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
    // Track styles
    trackBackgroundColor: {
      control: 'color',
      description: 'Track background color when unchecked',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    trackBackgroundColorChecked: {
      control: 'color',
      description: 'Track background color when checked',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    trackBorderWidth: {
      control: 'text',
      description: 'Track border width',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    trackBorderColor: {
      control: 'color',
      description: 'Track border color',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    trackBorderRadius: {
      control: 'text',
      description: 'Track border radius',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    trackWidth: {
      control: 'text',
      description: 'Track width',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    trackHeight: {
      control: 'text',
      description: 'Track height',
      table: {
        category: 'Track Styles',
        type: { summary: 'string' },
      },
    },
    // Thumb styles
    thumbBackgroundColor: {
      control: 'color',
      description: 'Thumb background color',
      table: {
        category: 'Thumb Styles',
        type: { summary: 'string' },
      },
    },
    thumbSize: {
      control: 'text',
      description: 'Thumb size (width and height)',
      table: {
        category: 'Thumb Styles',
        type: { summary: 'string' },
      },
    },
    thumbBorderRadius: {
      control: 'text',
      description: 'Thumb border radius',
      table: {
        category: 'Thumb Styles',
        type: { summary: 'string' },
      },
    },
    thumbBoxShadow: {
      control: 'text',
      description: 'Thumb box shadow',
      table: {
        category: 'Thumb Styles',
        type: { summary: 'string' },
      },
    },
    thumbIcon: {
      control: false,
      description: 'Icon to show in thumb when unchecked',
      table: {
        category: 'Thumb Styles',
        type: { summary: 'React.ReactNode' },
      },
    },
    thumbIconChecked: {
      control: false,
      description: 'Icon to show in thumb when checked',
      table: {
        category: 'Thumb Styles',
        type: { summary: 'React.ReactNode' },
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
        type: { summary: '(checked: boolean, disabled?: boolean) => React.ReactNode' },
      },
    },
    renderThumb: {
      control: false,
      description: 'Custom render function for thumb content',
      table: {
        category: 'Custom Render',
        type: { summary: '(checked: boolean, disabled?: boolean) => React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const SwitchWithState = ({
  defaultChecked = false,
  onChange,
  ...props
}: React.ComponentProps<typeof Switch> & { defaultChecked?: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return <Switch {...props} checked={checked} onChange={handleChange} />
}

export const Default: Story = {
  render: (args) => <SwitchWithState {...args} />,
  args: {
    label: 'Enable notifications',
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Switch (no props)</h3>
        <Switch />
        <p className="text-xs text-gray-500 mt-2">All default styles applied</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Label</h3>
        <Switch label="Enable feature" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Checked</h3>
        <Switch defaultChecked label="Started as checked" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Helper Text</h3>
        <Switch label="Auto-save" helperText="Automatically save your work every 5 minutes" />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <SwitchWithState variant="default" label="Default variant" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <SwitchWithState variant="filled" label="Filled variant" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <SwitchWithState variant="outlined" label="Outlined variant" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Flat</h3>
        <SwitchWithState variant="flat" label="Flat variant" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Elevated</h3>
        <SwitchWithState variant="elevated" label="Elevated variant" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <SwitchWithState size="sm" label="Small" />
        <SwitchWithState size="md" label="Medium" />
        <SwitchWithState size="lg" label="Large" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">All sizes with same label</h3>
        <SwitchWithState size="sm" label="Enable notifications" />
        <SwitchWithState size="md" label="Enable notifications" />
        <SwitchWithState size="lg" label="Enable notifications" />
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <SwitchWithState status="default" label="Default status" defaultChecked />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <SwitchWithState status="success" label="Success status" defaultChecked />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <SwitchWithState status="warning" label="Warning status" defaultChecked />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <SwitchWithState
          status="error"
          label="Error status"
          defaultChecked
          errorMessage="This setting has an error"
        />
      </div>
    </div>
  ),
}

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Label at End (Default)</h3>
        <SwitchWithState label="Label on the right" labelPosition="end" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Label at Start</h3>
        <SwitchWithState label="Label on the left" labelPosition="start" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Label Spacing</h3>
        <SwitchWithState label="Extra space between" labelPosition="end" labelSpacing="1.5rem" />
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slide Transition (Default)</h3>
        <SwitchWithState transition="slide" label="Slide animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Bounce Transition</h3>
        <SwitchWithState transition="bounce" label="Bounce animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Smooth Transition</h3>
        <SwitchWithState transition="smooth" label="Smooth animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fade Transition</h3>
        <SwitchWithState transition="fade" label="Fade animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Transition</h3>
        <SwitchWithState transition="none" label="No animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slow Transition</h3>
        <SwitchWithState transition="smooth" transitionDuration={600} label="600ms duration" />
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled</h3>
        <div className="space-y-3">
          <Switch disabled label="Disabled unchecked" />
          <Switch disabled defaultChecked label="Disabled checked" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading</h3>
        <div className="space-y-3">
          <Switch
            loading
            label="Loading state"
            loadingIcon={
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.25"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
          <Switch loading defaultChecked label="Loading while checked" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required</h3>
        <Switch required label="Required field" helperText="This field is required" />
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Check/Cross Icons</h3>
        <SwitchWithState
          label="With icons"
          thumbIcon={
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
          thumbIconChecked={
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
          thumbIconColor="#ef4444"
          thumbIconColorChecked="#10b981"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Sun/Moon Icons</h3>
        <SwitchWithState
          label="Dark mode"
          size="lg"
          thumbIcon={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          }
          thumbIconChecked={
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          }
          trackBackgroundColor="#1f2937"
          trackBackgroundColorChecked="#fbbf24"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Number Icons</h3>
        <SwitchWithState
          label="Binary switch"
          thumbIcon={<span className="text-xs font-bold">0</span>}
          thumbIconChecked={<span className="text-xs font-bold">1</span>}
          variant="outlined"
        />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Gradient Track</h3>
        <SwitchWithState
          label="Gradient colors"
          trackBackgroundColor="#e0e7ff"
          trackBackgroundColorChecked="linear-gradient(to right, #6366f1, #8b5cf6)"
          thumbBackgroundColor="#6366f1"
          size="lg"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <SwitchWithState
          label="Purple theme"
          trackBackgroundColor="#faf5ff"
          trackBackgroundColorChecked="#9333ea"
          trackBorderColor="#e9d5ff"
          trackBorderWidth="2px"
          thumbBackgroundColor="#9333ea"
          thumbBackgroundColorChecked="#ffffff"
          labelColor="#7c3aed"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Square Switch</h3>
        <SwitchWithState
          label="Square design"
          trackBorderRadius="4px"
          thumbBorderRadius="2px"
          trackHeight="28px"
          trackWidth="56px"
          thumbSize="24px"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Minimal Design</h3>
        <SwitchWithState
          label="Minimal"
          variant="flat"
          trackBackgroundColor="#f3f4f6"
          trackBackgroundColorChecked="#111827"
          thumbBoxShadow="none"
          focusRingColor="#111827"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Neumorphic</h3>
        <div className="p-8 bg-gray-200 rounded-lg">
          <SwitchWithState
            label="Neumorphic style"
            trackBackgroundColor="#e5e7eb"
            trackBackgroundColorChecked="#3b82f6"
            trackBoxShadow="inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff"
            thumbBackgroundColor="#ffffff"
            thumbBoxShadow="3px 3px 6px #b8b9be, -3px -3px 6px #ffffff"
            size="lg"
          />
        </div>
      </div>
    </div>
  ),
}

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
    updates: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <h3 className="text-lg font-medium">Notification Preferences</h3>

      <Switch
        name="notifications"
        checked={formData.notifications}
        onChange={(checked) => setFormData({ ...formData, notifications: checked })}
        label="Email notifications"
        helperText="Receive email updates about your account activity"
      />

      <Switch
        name="marketing"
        checked={formData.marketing}
        onChange={(checked) => setFormData({ ...formData, marketing: checked })}
        label="Marketing emails"
        helperText="Receive tips, updates and offers from our team"
      />

      <Switch
        name="analytics"
        checked={formData.analytics}
        onChange={(checked) => setFormData({ ...formData, analytics: checked })}
        label="Usage analytics"
        helperText="Help us improve by sharing anonymous usage data"
        required
      />

      <Switch
        name="updates"
        checked={formData.updates}
        onChange={(checked) => setFormData({ ...formData, updates: checked })}
        label="Beta features"
        helperText="Get early access to new features"
        status="warning"
      />

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Save Preferences
      </button>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-medium mb-2">Current Values:</h4>
        <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

export const CustomLabels: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Dynamic Label</h3>
        <SwitchWithState
          renderLabel={(checked) => (
            <span>
              Status: <strong>{checked ? 'Active' : 'Inactive'}</strong>
            </span>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Label with Icon</h3>
        <SwitchWithState
          label={
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Push notifications
            </span>
          }
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rich Label Content</h3>
        <SwitchWithState
          label={
            <div>
              <div className="font-medium">Advanced mode</div>
              <div className="text-sm text-gray-500">Enable experimental features</div>
            </div>
          }
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Thumb Content</h3>
        <SwitchWithState
          size="lg"
          renderThumb={(checked) => (
            <span className="text-xs font-bold">{checked ? 'ON' : 'OFF'}</span>
          )}
        />
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Privacy Settings</h3>
        <div className="space-y-4 p-4 border rounded-lg">
          <SwitchWithState
            defaultChecked
            label="Profile visibility"
            helperText="Make your profile visible to other users"
            status="success"
          />

          <SwitchWithState
            label="Show online status"
            helperText="Let others see when you're online"
          />

          <SwitchWithState
            label="Allow friend requests"
            helperText="Other users can send you friend requests"
            defaultChecked
          />

          <SwitchWithState
            label="Location sharing"
            helperText="Share your location with trusted contacts"
            status="warning"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Feature Toggles</h3>
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <SwitchWithState
            variant="elevated"
            defaultChecked
            label="Auto-save"
            helperText="Automatically save changes as you work"
            thumbIconChecked={
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

          <SwitchWithState
            variant="elevated"
            label="Spell check"
            helperText="Check spelling as you type"
            defaultChecked
          />

          <SwitchWithState
            variant="elevated"
            label="Code suggestions"
            helperText="Show AI-powered code suggestions"
            loading
          />

          <SwitchWithState
            variant="elevated"
            disabled
            label="Advanced AI features"
            helperText="Premium feature - upgrade to enable"
          />
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
          All switches are keyboard accessible. Try tabbing through them and using Space to toggle.
        </p>

        <SwitchWithState
          label="Screen reader friendly"
          helperText="This switch has proper ARIA attributes"
          aria-label="Enable screen reader friendly mode"
        />

        <SwitchWithState
          label="High contrast mode"
          variant="outlined"
          trackBorderWidth="3px"
          focusRingWidth="3px"
          focusRingColor="#000000"
        />

        <SwitchWithState
          label="Large click area"
          size="lg"
          containerStyle={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}
        />

        <SwitchWithState
          label="Error state with description"
          status="error"
          errorMessage="This setting is currently unavailable"
          aria-invalid="true"
          aria-describedby="switch-error"
        />
      </div>
    </div>
  ),
}

export const ComplexLayouts: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Two-factor authentication</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <SwitchWithState size="lg" status="success" defaultChecked />
        </div>
        <div className="text-sm text-green-600">✓ Two-factor authentication is enabled</div>
      </div>

      <div className="space-y-2">
        {[
          { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
          { id: 'bluetooth', label: 'Bluetooth', icon: '🔵' },
          { id: 'airplane', label: 'Airplane Mode', icon: '✈️' },
          { id: 'hotspot', label: 'Personal Hotspot', icon: '📡' },
        ].map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </span>
            <Switch variant="flat" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Monday', checked: true },
          { label: 'Tuesday', checked: true },
          { label: 'Wednesday', checked: true },
          { label: 'Thursday', checked: true },
          { label: 'Friday', checked: true },
          { label: 'Saturday', checked: false },
          { label: 'Sunday', checked: false },
        ].map((day) => (
          <Switch
            key={day.label}
            defaultChecked={day.checked}
            label={day.label}
            size="sm"
            variant="outlined"
          />
        ))}
      </div>
    </div>
  ),
}

export const Playground: StoryObj<typeof meta> = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Switch).
      </p>
      <LivePlayground
        code={`<div className="space-y-2">
  <Switch label="Enable notifications" defaultChecked={false} />
  <Switch label="Dark mode" defaultChecked />
</div>`}
      />
    </div>
  ),
}
