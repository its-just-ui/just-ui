import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SelectCompound as Select } from './Select'
import type { SelectOption } from './types'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Select is a dropdown component that allows users to choose from a list of options.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 5 pre-defined visual styles (default, filled, outlined, ghost, underlined)
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Multiple Selection**: Support for single and multiple selection modes
 * - **Search & Filter**: Optional searchable dropdown with filtering
 * - **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Escape
 * - **Accessibility**: Complete ARIA attributes and screen reader support
 * - **Loading & Disabled States**: Built-in loading and disabled state handling
 * - **Custom Rendering**: Flexible option and value rendering
 * - **Extensive Styling**: Over 60 style props for complete customization
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * const options = [
 *   { value: '1', label: 'Option 1' },
 *   { value: '2', label: 'Option 2' },
 *   { value: '3', label: 'Option 3' }
 * ]
 *
 * <Select
 *   options={options}
 *   placeholder="Select an option..."
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [value, setValue] = useState(null)
 *
 * <Select
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Choose option"
 * />
 * ```
 *
 * ### With Labels and Helper Text:
 * ```tsx
 * <Select
 *   options={options}
 *   label="Choose your preference"
 *   helperText="Select the option that best fits your needs"
 *   required
 * />
 * ```
 *
 * ### Multiple Selection:
 * ```tsx
 * <Select
 *   options={options}
 *   multiple
 *   placeholder="Select multiple options..."
 * />
 * ```
 *
 * ### Searchable:
 * ```tsx
 * <Select
 *   options={options}
 *   searchable
 *   placeholder="Search and select..."
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Select
 *   options={options}
 *   variant="filled"
 *   size="lg"
 *   backgroundColor="#f0f9ff"
 *   borderColor="#3b82f6"
 * />
 * ```
 */
const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core props
    options: {
      control: false,
      description: 'Array of options to display in the dropdown',
      table: {
        type: { summary: 'SelectOption[]' },
      },
    },
    value: {
      control: false,
      description: 'Controlled value (single option or array for multiple)',
      table: {
        type: { summary: 'SelectOption | SelectOption[] | null' },
      },
    },
    defaultValue: {
      control: false,
      description: 'Default value for uncontrolled mode',
      table: {
        type: { summary: 'SelectOption | SelectOption[] | null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when selection changes',
      table: {
        type: { summary: '(value: SelectOption | SelectOption[] | null) => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select...' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select component',
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
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button to reset selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Labels and messages
    label: {
      control: 'text',
      description: 'Label text for the select',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the select',
      table: {
        type: { summary: 'string' },
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
      description: 'Message shown when no options are available',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No options found' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown during loading state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },

    // Styling variants
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'underlined'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select component',
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

    // Animation
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'scale', 'flip'],
      description: 'Animation style for dropdown',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'scale' },
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

    // Custom render functions
    renderOption: {
      control: false,
      description: 'Custom render function for options',
      table: {
        category: 'Custom Render',
        type: { summary: '(option: SelectOption, isSelected: boolean) => React.ReactNode' },
      },
    },
    renderValue: {
      control: false,
      description: 'Custom render function for selected value display',
      table: {
        category: 'Custom Render',
        type: { summary: '(value: SelectOption | SelectOption[]) => React.ReactNode' },
      },
    },
    renderEmpty: {
      control: false,
      description: 'Custom render function for empty state',
      table: {
        category: 'Custom Render',
        type: { summary: '() => React.ReactNode' },
      },
    },

    // Dropdown positioning
    placement: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Dropdown placement relative to input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    offset: {
      control: 'number',
      description: 'Distance between input and dropdown',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 4 },
      },
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of dropdown in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 300 },
      },
    },

    // Border styles
    borderWidth: {
      control: 'text',
      description: 'Border width',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },
    borderStyle: {
      control: 'text',
      description: 'Border style',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },

    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontFamily: {
      control: 'text',
      description: 'Font family',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Text color',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    placeholderColor: {
      control: 'color',
      description: 'Placeholder text color',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },

    // Colors
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Colors',
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
    focusRingOffset: {
      control: 'text',
      description: 'Focus ring offset',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusBorderColor: {
      control: 'color',
      description: 'Border color on focus',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusBackgroundColor: {
      control: 'color',
      description: 'Background color on focus',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },

    // Shadows
    boxShadow: {
      control: 'text',
      description: 'Box shadow',
      table: {
        category: 'Shadows',
        type: { summary: 'string' },
      },
    },
    focusBoxShadow: {
      control: 'text',
      description: 'Box shadow on focus',
      table: {
        category: 'Shadows',
        type: { summary: 'string' },
      },
    },

    // Spacing
    padding: {
      control: 'text',
      description: 'Padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    paddingX: {
      control: 'text',
      description: 'Horizontal padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    paddingY: {
      control: 'text',
      description: 'Vertical padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },

    // Dropdown styles
    dropdownBackgroundColor: {
      control: 'color',
      description: 'Dropdown background color',
      table: {
        category: 'Dropdown Styles',
        type: { summary: 'string' },
      },
    },
    dropdownBorderColor: {
      control: 'color',
      description: 'Dropdown border color',
      table: {
        category: 'Dropdown Styles',
        type: { summary: 'string' },
      },
    },
    dropdownBorderWidth: {
      control: 'text',
      description: 'Dropdown border width',
      table: {
        category: 'Dropdown Styles',
        type: { summary: 'string' },
      },
    },
    dropdownBorderRadius: {
      control: 'text',
      description: 'Dropdown border radius',
      table: {
        category: 'Dropdown Styles',
        type: { summary: 'string' },
      },
    },
    dropdownBoxShadow: {
      control: 'text',
      description: 'Dropdown box shadow',
      table: {
        category: 'Dropdown Styles',
        type: { summary: 'string' },
      },
    },

    // Option styles
    optionPadding: {
      control: 'text',
      description: 'Option padding',
      table: {
        category: 'Option Styles',
        type: { summary: 'string' },
      },
    },
    optionHoverBackgroundColor: {
      control: 'color',
      description: 'Option background color on hover',
      table: {
        category: 'Option Styles',
        type: { summary: 'string' },
      },
    },
    optionSelectedBackgroundColor: {
      control: 'color',
      description: 'Selected option background color',
      table: {
        category: 'Option Styles',
        type: { summary: 'string' },
      },
    },
    optionSelectedTextColor: {
      control: 'color',
      description: 'Selected option text color',
      table: {
        category: 'Option Styles',
        type: { summary: 'string' },
      },
    },

    // Icon customization
    iconColor: {
      control: 'color',
      description: 'Default icon color',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    clearIconColor: {
      control: 'color',
      description: 'Clear icon color',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    dropdownIconColor: {
      control: 'color',
      description: 'Dropdown icon color',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },

    // Label styles
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
    labelColor: {
      control: 'color',
      description: 'Label text color',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },

    // Helper text styles
    helperTextFontSize: {
      control: 'text',
      description: 'Helper text font size',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },
    helperTextColor: {
      control: 'color',
      description: 'Helper text color',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },

    // Event handlers
    onFocus: {
      control: false,
      description: 'Callback when select receives focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Callback when select loses focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onOpen: {
      control: false,
      description: 'Callback when dropdown opens',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      control: false,
      description: 'Callback when dropdown closes',
      table: {
        type: { summary: '() => void' },
      },
    },
    onSearch: {
      control: false,
      description: 'Callback when search query changes',
      table: {
        type: { summary: '(query: string) => void' },
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

const optionsWithIcons: SelectOption[] = [
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'settings', label: 'Settings', icon: '⚙️' },
  { value: 'profile', label: 'Profile', icon: '👤' },
  { value: 'notifications', label: 'Notifications', icon: '🔔' },
  { value: 'help', label: 'Help', icon: '❓' },
]

const optionsWithDescriptions: SelectOption[] = [
  { value: 'basic', label: 'Basic Plan', description: 'Perfect for individuals' },
  { value: 'pro', label: 'Pro Plan', description: 'Great for small teams' },
  { value: 'enterprise', label: 'Enterprise Plan', description: 'For large organizations' },
]

const optionsWithDisabled: SelectOption[] = [
  { value: 'option1', label: 'Available Option 1' },
  { value: 'option2', label: 'Available Option 2' },
  { value: 'option3', label: 'Disabled Option', disabled: true },
  { value: 'option4', label: 'Available Option 4' },
  { value: 'option5', label: 'Another Disabled', disabled: true },
]

// Wrapper component for controlled stories
const SelectWithState = ({
  defaultValue,
  onChange,
  multiple = false,
  ...props
}: Omit<React.ComponentProps<typeof Select>, 'value' | 'onChange'> & {
  defaultValue?: SelectOption | SelectOption[] | null
  onChange?: (value: SelectOption | SelectOption[] | null) => void
}) => {
  const [value, setValue] = useState<SelectOption | SelectOption[] | null>(
    defaultValue || (multiple ? [] : null)
  )

  const handleChange = (newValue: SelectOption | SelectOption[] | null) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return <Select {...props} value={value} onChange={handleChange} multiple={multiple} />
}

export const Default: Story = {
  render: (args) => <SelectWithState {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
  },
}

export const ShowingDefaults: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Default Select (minimal props)</h3>
        <Select options={basicOptions} />
        <p className="text-xs text-gray-500">All default styles applied</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Placeholder</h3>
        <Select options={basicOptions} placeholder="Choose your fruit" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Default Value</h3>
        <Select options={basicOptions} defaultValue={basicOptions[1]} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Label and Helper Text</h3>
        <Select
          options={basicOptions}
          label="Favorite Fruit"
          helperText="Choose your preferred fruit from the list"
          placeholder="Select..."
        />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Default</h3>
        <SelectWithState variant="default" options={basicOptions} placeholder="Default variant" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Filled</h3>
        <SelectWithState variant="filled" options={basicOptions} placeholder="Filled variant" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Outlined</h3>
        <SelectWithState variant="outlined" options={basicOptions} placeholder="Outlined variant" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Ghost</h3>
        <SelectWithState variant="ghost" options={basicOptions} placeholder="Ghost variant" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Underlined</h3>
        <SelectWithState
          variant="underlined"
          options={basicOptions}
          placeholder="Underlined variant"
        />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="flex items-end gap-6">
        <div className="flex-1">
          <SelectWithState size="sm" options={basicOptions} placeholder="Small" />
        </div>
        <div className="flex-1">
          <SelectWithState size="md" options={basicOptions} placeholder="Medium" />
        </div>
        <div className="flex-1">
          <SelectWithState size="lg" options={basicOptions} placeholder="Large" />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-medium text-gray-700">All sizes with labels</h3>
        <div className="space-y-4">
          <SelectWithState
            size="sm"
            options={basicOptions}
            label="Small Select"
            placeholder="Choose option"
          />
          <SelectWithState
            size="md"
            options={basicOptions}
            label="Medium Select"
            placeholder="Choose option"
          />
          <SelectWithState
            size="lg"
            options={basicOptions}
            label="Large Select"
            placeholder="Choose option"
          />
        </div>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Default Status</h3>
        <SelectWithState status="default" options={basicOptions} placeholder="Default status" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Success Status</h3>
        <SelectWithState
          status="success"
          options={basicOptions}
          placeholder="Success status"
          helperText="Selection validated successfully"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Warning Status</h3>
        <SelectWithState
          status="warning"
          options={basicOptions}
          placeholder="Warning status"
          helperText="Please review your selection"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Error Status</h3>
        <SelectWithState
          status="error"
          options={basicOptions}
          placeholder="Error status"
          errorMessage="This field is required"
        />
      </div>
    </div>
  ),
}

export const MultipleSelection: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Multiple Selection</h3>
        <SelectWithState
          multiple
          options={basicOptions}
          placeholder="Select multiple fruits..."
          label="Favorite Fruits"
          helperText="You can select multiple options"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Multiple with Default Values</h3>
        <SelectWithState
          multiple
          options={basicOptions}
          defaultValue={[basicOptions[0], basicOptions[2]]}
          placeholder="Select fruits..."
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Multiple with Icons</h3>
        <SelectWithState
          multiple
          options={optionsWithIcons}
          placeholder="Select features..."
          label="Dashboard Features"
        />
      </div>
    </div>
  ),
}

export const SearchableSelect: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Searchable Single</h3>
        <SelectWithState
          searchable
          options={basicOptions}
          placeholder="Search and select..."
          label="Search Fruits"
          helperText="Type to filter options"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Searchable Multiple</h3>
        <SelectWithState
          searchable
          multiple
          options={optionsWithIcons}
          placeholder="Search features..."
          label="Search Dashboard Features"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Large Searchable List</h3>
        <SelectWithState
          searchable
          options={[
            { value: 'afghanistan', label: 'Afghanistan' },
            { value: 'albania', label: 'Albania' },
            { value: 'algeria', label: 'Algeria' },
            { value: 'argentina', label: 'Argentina' },
            { value: 'australia', label: 'Australia' },
            { value: 'austria', label: 'Austria' },
            { value: 'belgium', label: 'Belgium' },
            { value: 'brazil', label: 'Brazil' },
            { value: 'canada', label: 'Canada' },
            { value: 'china', label: 'China' },
            { value: 'france', label: 'France' },
            { value: 'germany', label: 'Germany' },
            { value: 'india', label: 'India' },
            { value: 'japan', label: 'Japan' },
            { value: 'usa', label: 'United States' },
          ]}
          placeholder="Search countries..."
          label="Country"
        />
      </div>
    </div>
  ),
}

export const States: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Disabled</h3>
        <Select disabled options={basicOptions} placeholder="Disabled select" />
        <Select disabled options={basicOptions} defaultValue={basicOptions[1]} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Loading</h3>
        <Select
          loading
          options={basicOptions}
          placeholder="Loading..."
          loadingMessage="Fetching options..."
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Empty Options</h3>
        <Select options={[]} placeholder="No options available" emptyMessage="No fruits found" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Disabled Options</h3>
        <SelectWithState
          options={optionsWithDisabled}
          placeholder="Some options disabled"
          helperText="Try selecting different options"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Required Field</h3>
        <SelectWithState
          required
          options={basicOptions}
          label="Required Selection"
          placeholder="Please make a selection"
          helperText="This field is mandatory"
        />
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Options with Icons</h3>
        <SelectWithState
          options={optionsWithIcons}
          placeholder="Select a feature..."
          label="Dashboard Features"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Options with Descriptions</h3>
        <SelectWithState
          options={optionsWithDescriptions}
          placeholder="Choose your plan..."
          label="Subscription Plan"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Icons</h3>
        <SelectWithState
          options={[
            {
              value: 'react',
              label: 'React',
              icon: <div className="w-4 h-4 bg-blue-500 rounded"></div>,
            },
            {
              value: 'vue',
              label: 'Vue',
              icon: <div className="w-4 h-4 bg-green-500 rounded"></div>,
            },
            {
              value: 'angular',
              label: 'Angular',
              icon: <div className="w-4 h-4 bg-red-500 rounded"></div>,
            },
          ]}
          placeholder="Select framework..."
          label="Frontend Framework"
        />
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Scale Transition (Default)</h3>
        <SelectWithState transition="scale" options={basicOptions} placeholder="Scale animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fade Transition</h3>
        <SelectWithState transition="fade" options={basicOptions} placeholder="Fade animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slide Transition</h3>
        <SelectWithState transition="slide" options={basicOptions} placeholder="Slide animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Flip Transition</h3>
        <SelectWithState transition="flip" options={basicOptions} placeholder="Flip animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Transition</h3>
        <SelectWithState transition="none" options={basicOptions} placeholder="No animation" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slow Transition</h3>
        <SelectWithState
          transition="scale"
          transitionDuration={500}
          options={basicOptions}
          placeholder="500ms duration"
        />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <SelectWithState
          options={basicOptions}
          placeholder="Purple theme"
          backgroundColor="#faf5ff"
          borderColor="#e9d5ff"
          borderWidth="2px"
          focusBorderColor="#9333ea"
          textColor="#7c3aed"
          dropdownBackgroundColor="#fefbff"
          optionSelectedBackgroundColor="#e9d5ff"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rounded Style</h3>
        <SelectWithState
          options={basicOptions}
          placeholder="Rounded corners"
          borderRadius="20px"
          dropdownBorderRadius="16px"
          variant="outlined"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Shadows</h3>
        <SelectWithState
          options={basicOptions}
          placeholder="Shadow effects"
          boxShadow="0 10px 25px rgba(0, 0, 0, 0.1)"
          dropdownBoxShadow="0 20px 40px rgba(0, 0, 0, 0.15)"
          focusBoxShadow="0 0 0 3px rgba(99, 102, 241, 0.1)"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Typography</h3>
        <SelectWithState
          options={basicOptions}
          placeholder="Custom font"
          fontSize="18px"
          fontWeight="600"
          label="Custom Typography"
          labelFontSize="16px"
          labelFontWeight="700"
          helperText="Using custom font styles"
          helperTextFontSize="14px"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Minimal Design</h3>
        <SelectWithState
          options={basicOptions}
          placeholder="Minimal style"
          variant="ghost"
          borderRadius="0"
          focusRingColor="transparent"
          backgroundColor="transparent"
          className="border-b-2 border-gray-300 rounded-none focus-within:border-gray-900"
        />
      </div>
    </div>
  ),
}

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState<{
    country: SelectOption | null
    interests: SelectOption[]
    priority: SelectOption | null
    notifications: SelectOption | null
  }>({
    country: null,
    interests: [],
    priority: null,
    notifications: null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <h3 className="text-lg font-medium">User Preferences</h3>

      <Select
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
        ]}
        value={formData.country}
        onChange={(value) => setFormData({ ...formData, country: value as SelectOption | null })}
        label="Country"
        placeholder="Select your country"
        required
      />

      <Select
        multiple
        options={[
          { value: 'tech', label: 'Technology' },
          { value: 'sports', label: 'Sports' },
          { value: 'music', label: 'Music' },
          { value: 'travel', label: 'Travel' },
          { value: 'food', label: 'Food' },
        ]}
        value={formData.interests}
        onChange={(value) =>
          setFormData({ ...formData, interests: (value as SelectOption[]) || [] })
        }
        label="Interests"
        placeholder="Select your interests"
        helperText="Choose multiple topics that interest you"
      />

      <Select
        options={[
          { value: 'low', label: 'Low Priority' },
          { value: 'medium', label: 'Medium Priority' },
          { value: 'high', label: 'High Priority' },
          { value: 'urgent', label: 'Urgent' },
        ]}
        value={formData.priority}
        onChange={(value) => setFormData({ ...formData, priority: value as SelectOption | null })}
        label="Support Priority"
        status="warning"
        helperText="This affects response time"
      />

      <Select
        options={[
          { value: 'email', label: 'Email Only' },
          { value: 'sms', label: 'SMS Only' },
          { value: 'both', label: 'Email and SMS' },
          { value: 'none', label: 'No Notifications' },
        ]}
        value={formData.notifications}
        onChange={(value) =>
          setFormData({ ...formData, notifications: value as SelectOption | null })
        }
        label="Notification Preference"
        placeholder="Choose notification method"
        clearable={false}
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
  args: {
    options: basicOptions,
  },
  render: () => <FormIntegrationComponent />,
}

export const CustomRendering: Story = {
  args: {
    options: optionsWithDescriptions,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Option Rendering</h3>
        <SelectWithState
          options={optionsWithDescriptions}
          placeholder="Choose plan..."
          renderOption={(option, isSelected) => (
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
              {isSelected && <span className="text-green-500">✓</span>}
            </div>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Value Display</h3>
        <SelectWithState
          multiple
          options={basicOptions}
          placeholder="Select fruits..."
          renderValue={(value) => {
            if (Array.isArray(value) && value.length > 0) {
              return `${value.length} fruit${value.length > 1 ? 's' : ''} selected`
            }
            return ''
          }}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Empty State</h3>
        <Select
          options={[]}
          placeholder="No options..."
          renderEmpty={() => (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <div className="text-gray-500">No items found</div>
              <div className="text-sm text-gray-400">Try a different search term</div>
            </div>
          )}
        />
      </div>
    </div>
  ),
}

export const AccessibilityExample: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All selects support keyboard navigation. Try using Tab, Arrow keys, Enter, Escape, and
          Space.
        </p>

        <Select
          options={basicOptions}
          label="Screen reader friendly"
          placeholder="Try keyboard navigation"
          helperText="Use arrow keys to navigate, Enter to select, Escape to close"
          aria-label="Example select for accessibility demonstration"
        />

        <Select
          searchable
          options={optionsWithIcons}
          label="Searchable with keyboard support"
          placeholder="Type to search, use arrows to navigate"
          helperText="Supports both typing and keyboard navigation"
        />

        <Select
          multiple
          options={basicOptions}
          label="Multiple selection"
          placeholder="Select multiple with keyboard"
          helperText="Use Enter to toggle selections, Escape to close"
          aria-describedby="multi-select-help"
        />

        <Select
          required
          options={basicOptions}
          label="Required field"
          status="error"
          errorMessage="This field is required for accessibility compliance"
          aria-invalid={true}
          aria-required={true}
        />
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">E-commerce Product Filter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
          <SelectWithState
            searchable
            options={[
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
              { value: 'books', label: 'Books' },
              { value: 'home', label: 'Home & Garden' },
              { value: 'sports', label: 'Sports' },
            ]}
            label="Category"
            placeholder="All categories"
            size="sm"
          />

          <Select
            options={[
              { value: 'low-high', label: 'Price: Low to High' },
              { value: 'high-low', label: 'Price: High to Low' },
              { value: 'newest', label: 'Newest First' },
              { value: 'rating', label: 'Highest Rated' },
            ]}
            label="Sort By"
            placeholder="Relevance"
            size="sm"
          />

          <Select
            multiple
            options={[
              { value: 'free-shipping', label: 'Free Shipping' },
              { value: 'on-sale', label: 'On Sale' },
              { value: 'in-stock', label: 'In Stock' },
              { value: 'prime', label: 'Prime Eligible' },
            ]}
            label="Filters"
            placeholder="Add filters"
            size="sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">User Profile Settings</h3>
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg max-w-md">
          <SelectWithState
            searchable
            options={[
              { value: 'en', label: 'English', icon: '🇺🇸' },
              { value: 'es', label: 'Español', icon: '🇪🇸' },
              { value: 'fr', label: 'Français', icon: '🇫🇷' },
              { value: 'de', label: 'Deutsch', icon: '🇩🇪' },
              { value: 'ja', label: '日本語', icon: '🇯🇵' },
            ]}
            label="Language"
            defaultValue={{ value: 'en', label: 'English', icon: '🇺🇸' }}
          />

          <Select
            options={[
              { value: 'auto', label: 'Auto (System)' },
              { value: 'light', label: 'Light Theme' },
              { value: 'dark', label: 'Dark Theme' },
            ]}
            label="Theme"
            defaultValue={{ value: 'auto', label: 'Auto (System)' }}
          />

          <Select
            options={[
              { value: 'utc', label: 'UTC' },
              { value: 'est', label: 'Eastern (EST)' },
              { value: 'pst', label: 'Pacific (PST)' },
              { value: 'cet', label: 'Central European (CET)' },
              { value: 'jst', label: 'Japan (JST)' },
            ]}
            label="Timezone"
            searchable
            placeholder="Select timezone"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dashboard Configuration</h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
          <SelectWithState
            multiple
            options={[
              { value: 'analytics', label: 'Analytics', icon: '📊' },
              { value: 'sales', label: 'Sales', icon: '💰' },
              { value: 'users', label: 'Users', icon: '👥' },
              { value: 'performance', label: 'Performance', icon: '⚡' },
              { value: 'support', label: 'Support', icon: '🎧' },
            ]}
            label="Visible Widgets"
            placeholder="Select widgets to display"
            helperText="Choose which widgets to show on your dashboard"
            variant="filled"
          />

          <Select
            options={[
              { value: '1', label: '1 Column' },
              { value: '2', label: '2 Columns' },
              { value: '3', label: '3 Columns' },
              { value: '4', label: '4 Columns' },
            ]}
            label="Layout"
            defaultValue={{ value: '2', label: '2 Columns' }}
            variant="filled"
          />
        </div>
      </div>
    </div>
  ),
}

export const Playground: StoryObj<typeof meta> = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Select).
      </p>
      <LivePlayground
        code={`<Select options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} placeholder="Choose..." />`}
      />
    </div>
  ),
}
