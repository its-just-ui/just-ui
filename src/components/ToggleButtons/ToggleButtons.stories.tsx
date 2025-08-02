import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToggleButtons } from './ToggleButtons'

/**
 * ToggleButtons is a versatile component that allows users to select one or multiple options from a group of buttons.
 *
 * ## Features
 * - **Single & Multiple Selection**: Supports both single and multiple selection modes
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 5 pre-defined visual styles (default, filled, outlined, ghost, elevated)
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 * - **Extensive Styling**: Over 60 style props for complete customization
 * - **Loading State**: Built-in loading indicator support
 * - **Full Accessibility**: Complete keyboard navigation and ARIA support
 * - **Compound Components**: Flexible architecture with Label and HelperText sub-components
 * - **Icon Support**: Built-in icon support with customizable positioning
 *
 * ## Usage
 *
 * ### Basic Usage (Single Selection):
 * ```tsx
 * <ToggleButtons defaultValue="bold">
 *   <ToggleButtons.Button value="bold" icon={<IconBold />} />
 *   <ToggleButtons.Button value="italic" icon={<IconItalic />} />
 *   <ToggleButtons.Button value="underline" icon={<IconUnderline />} />
 * </ToggleButtons>
 * ```
 *
 * ### Multiple Selection:
 * ```tsx
 * const [selected, setSelected] = useState<string[]>(['bold'])
 *
 * <ToggleButtons
 *   value={selected}
 *   onChange={setSelected}
 *   selectionMode="multiple"
 * >
 *   <ToggleButtons.Button value="bold" label="Bold" />
 *   <ToggleButtons.Button value="italic" label="Italic" />
 *   <ToggleButtons.Button value="underline" label="Underline" />
 * </ToggleButtons>
 * ```
 *
 * ### With Custom Styling:
 * ```tsx
 * <ToggleButtons
 *   variant="filled"
 *   buttonBackgroundColorSelected="#3b82f6"
 *   buttonTextColorSelected="#ffffff"
 *   groupBorderRadius="12px"
 * >
 *   <ToggleButtons.Button value="option1" label="Option 1" />
 *   <ToggleButtons.Button value="option2" label="Option 2" />
 * </ToggleButtons>
 * ```
 */
const meta: Meta<typeof ToggleButtons> = {
  title: 'Components/ToggleButtons',
  component: ToggleButtons,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'Current selected value(s)',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled mode',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: string | string[]) => void' },
      },
    },
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Selection mode - single or multiple',
      table: {
        type: { summary: 'single | multiple' },
        defaultValue: { summary: 'single' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'elevated'],
      description: 'Visual variant of the toggle buttons',
      table: {
        type: { summary: 'default | filled | outlined | ghost | elevated' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle buttons',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state of the component',
      table: {
        type: { summary: 'default | success | warning | error' },
        defaultValue: { summary: 'default' },
      },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all buttons',
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
    fullWidth: {
      control: 'boolean',
      description: 'Make buttons take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the toggle button group',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the buttons',
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
      description: 'Transition effect',
      table: {
        type: { summary: 'none | slide | fade | bounce | smooth' },
        defaultValue: { summary: 'smooth' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between buttons',
      table: {
        type: { summary: 'string' },
      },
    },
    groupBorderRadius: {
      control: 'text',
      description: 'Border radius for the button group',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonBorderRadius: {
      control: 'text',
      description: 'Border radius for individual buttons',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0.375rem' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButtons>

// Wrapper component for controlled stories
const ToggleButtonsWithState = ({
  defaultValue,
  selectionMode = 'single',
  children,
  ...props
}: React.ComponentProps<typeof ToggleButtons> & {
  defaultValue?: string | string[]
  children?: React.ReactNode
}) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <ToggleButtons value={value} onChange={setValue} selectionMode={selectionMode} {...props}>
      {children}
    </ToggleButtons>
  )
}

// Basic stories
export const Default: Story = {
  render: () => (
    <ToggleButtonsWithState defaultValue="bold">
      <ToggleButtons.Button
        value="bold"
        icon={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>B</span>}
      />
      <ToggleButtons.Button
        value="italic"
        icon={<span style={{ fontStyle: 'italic', fontSize: '16px' }}>I</span>}
      />
      <ToggleButtons.Button
        value="underline"
        icon={<span style={{ textDecoration: 'underline', fontSize: '16px' }}>U</span>}
      />
    </ToggleButtonsWithState>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <ToggleButtonsWithState defaultValue="left">
      <ToggleButtons.Button value="left" icon="◀" label="Left" />
      <ToggleButtons.Button value="center" icon="▬" label="Center" />
      <ToggleButtons.Button value="right" icon="▶" label="Right" />
    </ToggleButtonsWithState>
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <ToggleButtonsWithState defaultValue={['bold']} selectionMode="multiple">
      <ToggleButtons.Button
        value="bold"
        icon={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>B</span>}
        label="Bold"
      />
      <ToggleButtons.Button
        value="italic"
        icon={<span style={{ fontStyle: 'italic', fontSize: '16px' }}>I</span>}
        label="Italic"
      />
      <ToggleButtons.Button
        value="underline"
        icon={<span style={{ textDecoration: 'underline', fontSize: '16px' }}>U</span>}
        label="Underline"
      />
    </ToggleButtonsWithState>
  ),
}

// Variant stories
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="default">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Filled</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="filled">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Outlined</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="outlined">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Ghost</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="ghost">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Elevated</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="elevated">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>
    </div>
  ),
}

// Size stories
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <ToggleButtonsWithState defaultValue="option1" size="sm">
          <ToggleButtons.Button value="option1" label="Small 1" />
          <ToggleButtons.Button value="option2" label="Small 2" />
          <ToggleButtons.Button value="option3" label="Small 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <ToggleButtonsWithState defaultValue="option1" size="md">
          <ToggleButtons.Button value="option1" label="Medium 1" />
          <ToggleButtons.Button value="option2" label="Medium 2" />
          <ToggleButtons.Button value="option3" label="Medium 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <ToggleButtonsWithState defaultValue="option1" size="lg">
          <ToggleButtons.Button value="option1" label="Large 1" />
          <ToggleButtons.Button value="option2" label="Large 2" />
          <ToggleButtons.Button value="option3" label="Large 3" />
        </ToggleButtonsWithState>
      </div>
    </div>
  ),
}

// Status stories
export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <ToggleButtonsWithState defaultValue="option1" status="default">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Success</h3>
        <ToggleButtonsWithState defaultValue="option1" status="success">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Warning</h3>
        <ToggleButtonsWithState defaultValue="option1" status="warning">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Error</h3>
        <ToggleButtonsWithState defaultValue="option1" status="error">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>
    </div>
  ),
}

// Interactive states
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Normal</h3>
        <ToggleButtonsWithState defaultValue="option1">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disabled</h3>
        <ToggleButtonsWithState defaultValue="option1" disabled>
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading</h3>
        <ToggleButtonsWithState defaultValue="option1" loading>
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Individual Disabled</h3>
        <ToggleButtonsWithState defaultValue="option1">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" disabled />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>
    </div>
  ),
}

// Orientation
export const Orientation: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Horizontal</h3>
        <ToggleButtonsWithState defaultValue="option1" orientation="horizontal">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Vertical</h3>
        <ToggleButtonsWithState defaultValue="option1" orientation="vertical">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>
    </div>
  ),
}

// With compound components
export const WithCompoundComponents: Story = {
  render: () => (
    <ToggleButtonsWithState defaultValue="light" variant="filled">
      <ToggleButtons.Label>Theme Selection</ToggleButtons.Label>
      <ToggleButtons.Button value="light" icon="☀️" label="Light" />
      <ToggleButtons.Button value="dark" icon="🌙" label="Dark" />
      <ToggleButtons.Button value="system" icon="💻" label="System" />
      <ToggleButtons.HelperText>Choose your preferred theme</ToggleButtons.HelperText>
    </ToggleButtonsWithState>
  ),
}

// With form validation
export const WithFormValidation: Story = {
  render: () => (
    <div className="space-y-4">
      <ToggleButtonsWithState
        defaultValue=""
        label="Select your preference"
        helperText="Choose at least one option"
        required
      >
        <ToggleButtons.Button value="yes" icon="✓" label="Yes" />
        <ToggleButtons.Button value="no" icon="✗" label="No" />
      </ToggleButtonsWithState>

      <ToggleButtonsWithState
        defaultValue=""
        label="Select features"
        errorMessage="Please select at least one feature"
        status="error"
        selectionMode="multiple"
      >
        <ToggleButtons.Button value="feature1" label="Feature 1" />
        <ToggleButtons.Button value="feature2" label="Feature 2" />
        <ToggleButtons.Button value="feature3" label="Feature 3" />
      </ToggleButtonsWithState>
    </div>
  ),
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Fully Rounded (Pills)</h3>
        <ToggleButtonsWithState
          defaultValue="option1"
          variant="filled"
          buttonBackgroundColor="#f3f4f6"
          buttonBackgroundColorSelected="#3b82f6"
          buttonTextColor="#374151"
          buttonTextColorSelected="#ffffff"
          buttonBorderRadius="9999px"
          gap="4px"
        >
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Square Buttons</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="outlined" buttonBorderRadius="0">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large Border Radius</h3>
        <ToggleButtonsWithState defaultValue="option1" variant="default" buttonBorderRadius="12px">
          <ToggleButtons.Button value="option1" label="Option 1" />
          <ToggleButtons.Button value="option2" label="Option 2" />
          <ToggleButtons.Button value="option3" label="Option 3" />
        </ToggleButtonsWithState>
      </div>

      <ToggleButtonsWithState
        defaultValue="option1"
        variant="outlined"
        buttonBorderColorSelected="#10b981"
        buttonTextColorSelected="#10b981"
        buttonBorderWidth="2px"
        focusRingColor="#10b981"
        groupGap="8px"
      >
        <ToggleButtons.Button value="option1" icon="✨" label="Magic" />
        <ToggleButtons.Button value="option2" icon="✓" label="Done" />
        <ToggleButtons.Button value="option3" icon="✗" label="Cancel" />
      </ToggleButtonsWithState>
    </div>
  ),
}

// Full width
export const FullWidth: Story = {
  render: () => (
    <div className="space-y-4" style={{ width: '400px' }}>
      <ToggleButtonsWithState defaultValue="option1" fullWidth>
        <ToggleButtons.Button value="option1" label="Option 1" />
        <ToggleButtons.Button value="option2" label="Option 2" />
        <ToggleButtons.Button value="option3" label="Option 3" />
      </ToggleButtonsWithState>

      <ToggleButtonsWithState defaultValue="option1" fullWidth variant="filled">
        <ToggleButtons.Button value="option1" icon="◀" />
        <ToggleButtons.Button value="option2" icon="▬" />
        <ToggleButtons.Button value="option3" icon="▶" />
      </ToggleButtonsWithState>
    </div>
  ),
}

// Icon positions
export const IconPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <ToggleButtonsWithState defaultValue="start">
        <ToggleButtons.Button value="start" icon="◀" iconPosition="start" label="Start" />
        <ToggleButtons.Button value="end" icon="▶" iconPosition="end" label="End" />
      </ToggleButtonsWithState>
    </div>
  ),
}

// Empty state
export const EmptyState: Story = {
  render: () => <ToggleButtons defaultValue="" emptyMessage="No options available" />,
}

// Uncontrolled
export const Uncontrolled: Story = {
  render: () => (
    <ToggleButtons defaultValue="bold">
      <ToggleButtons.Button value="bold" icon="B" />
      <ToggleButtons.Button value="italic" icon="I" />
      <ToggleButtons.Button value="underline" icon="U" />
    </ToggleButtons>
  ),
}

// Form example
const FormExampleComponent = () => {
  const [textFormat, setTextFormat] = useState<string[]>(['bold'])
  const [alignment, setAlignment] = useState('left')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Text format: ${textFormat.join(', ')}\nAlignment: ${alignment}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <ToggleButtons
        value={textFormat}
        onChange={setTextFormat}
        selectionMode="multiple"
        label="Text Formatting"
        helperText="Select formatting options"
        required
      >
        <ToggleButtons.Button
          value="bold"
          icon={<span style={{ fontWeight: 'bold' }}>B</span>}
          label="Bold"
        />
        <ToggleButtons.Button
          value="italic"
          icon={<span style={{ fontStyle: 'italic' }}>I</span>}
          label="Italic"
        />
        <ToggleButtons.Button
          value="underline"
          icon={<span style={{ textDecoration: 'underline' }}>U</span>}
          label="Underline"
        />
      </ToggleButtons>

      <ToggleButtons value={alignment} onChange={setAlignment} label="Text Alignment" required>
        <ToggleButtons.Button value="left" icon="◀" label="Left" />
        <ToggleButtons.Button value="center" icon="▬" label="Center" />
        <ToggleButtons.Button value="right" icon="▶" label="Right" />
      </ToggleButtons>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  )
}

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
}
