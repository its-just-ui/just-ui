import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Autocomplete, AutocompleteOption } from './Autocomplete'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Autocomplete is a controlled component that provides a searchable dropdown selection.
 *
 * ## Usage
 *
 * The Autocomplete component requires two main props:
 * - `value`: The currently selected value(s)
 * - `onChange`: A callback function to update the value
 *
 * ### Basic Example:
 * ```tsx
 * const [value, setValue] = useState<AutocompleteOption | null>(null)
 *
 * <Autocomplete
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Select an option"
 * />
 * ```
 *
 * ### Multiple Selection:
 * ```tsx
 * const [values, setValues] = useState<AutocompleteOption[]>([])
 *
 * <Autocomplete
 *   options={options}
 *   value={values}
 *   onChange={setValues}
 *   multiple
 *   placeholder="Select multiple options"
 * />
 * ```
 *
 * ### Option Structure:
 * ```tsx
 * interface AutocompleteOption {
 *   value: string          // Unique identifier
 *   label: string          // Display text
 *   disabled?: boolean     // Optional: disable this option
 *   icon?: React.ReactNode // Optional: icon to display
 *   description?: string   // Optional: additional description
 *   [key: string]: any     // Additional custom properties
 * }
 * ```
 */
const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description:
        'The selected value(s). Can be AutocompleteOption, AutocompleteOption[], or null',
      table: {
        type: { summary: 'AutocompleteOption | AutocompleteOption[] | null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback fired when the value changes',
      table: {
        type: { summary: '(value: AutocompleteOption | AutocompleteOption[] | null) => void' },
      },
    },
    options: {
      control: 'object',
      description: 'Array of options to display',
      table: {
        type: { summary: 'AutocompleteOption[]' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'underlined'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the autocomplete',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state for validation',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'scale', 'flip'],
      description: 'Dropdown animation style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'scale' },
      },
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Dropdown placement',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    searchable: {
      control: 'boolean',
      description: 'Allow searching through options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    creatable: {
      control: 'boolean',
      description: 'Allow creating new options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the autocomplete',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select...' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text above the input',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
      table: {
        type: { summary: 'string' },
      },
    },
    onInputChange: {
      control: false,
      description: 'Callback fired when the input value changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    filterOption: {
      control: false,
      description: 'Custom filter function for options',
      table: {
        type: { summary: '(option: AutocompleteOption, inputValue: string) => boolean' },
      },
    },
    renderOption: {
      control: false,
      description: 'Custom render function for options',
      table: {
        type: { summary: '(option: AutocompleteOption, isSelected: boolean) => React.ReactNode' },
      },
    },
    renderValue: {
      control: false,
      description: 'Custom render function for selected value',
      table: {
        type: { summary: '(value: AutocompleteOption | AutocompleteOption[]) => React.ReactNode' },
      },
    },
    onCreate: {
      control: false,
      description: 'Callback fired when creating a new option (requires creatable=true)',
      table: {
        type: { summary: '(inputValue: string) => void' },
      },
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the dropdown in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 300 },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transition animations in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no options are found',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No options found' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown when loading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

const basicOptions: AutocompleteOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember' },
  { value: 'backbone', label: 'Backbone' },
  { value: 'preact', label: 'Preact' },
  { value: 'alpine', label: 'Alpine.js' },
]

const countryOptions: AutocompleteOption[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'br', label: 'Brazil', icon: '🇧🇷' },
]

const userOptions: AutocompleteOption[] = [
  {
    value: 'john',
    label: 'John Doe',
    description: 'john.doe@example.com',
    icon: (
      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
        JD
      </div>
    ),
  },
  {
    value: 'jane',
    label: 'Jane Smith',
    description: 'jane.smith@example.com',
    icon: (
      <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
        JS
      </div>
    ),
  },
  {
    value: 'bob',
    label: 'Bob Johnson',
    description: 'bob.johnson@example.com',
    icon: (
      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
        BJ
      </div>
    ),
  },
  {
    value: 'alice',
    label: 'Alice Williams',
    description: 'alice.williams@example.com',
    icon: (
      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
        AW
      </div>
    ),
  },
]

const _groupedOptions: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'orange', label: 'Orange', group: 'Fruits' },
  { value: 'strawberry', label: 'Strawberry', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
  { value: 'spinach', label: 'Spinach', group: 'Vegetables' },
  { value: 'chicken', label: 'Chicken', group: 'Meat' },
  { value: 'beef', label: 'Beef', group: 'Meat' },
  { value: 'pork', label: 'Pork', group: 'Meat' },
]

// Wrapper component to handle state for stories
const AutocompleteWithState = (props: React.ComponentProps<typeof Autocomplete>) => {
  const [value, setValue] = useState<AutocompleteOption | AutocompleteOption[] | null>(
    props.multiple ? [] : null
  )

  return <Autocomplete {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Select a framework',
  },
}

export const WithLabel: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: basicOptions,
    label: 'Frontend Framework',
    placeholder: 'Choose your framework',
    helperText: 'Select the framework you want to use',
  },
}

export const Multiple: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: basicOptions,
    multiple: true,
    placeholder: 'Select frameworks',
    label: 'Preferred Frameworks',
  },
}

export const Searchable: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: countryOptions,
    searchable: true,
    placeholder: 'Search countries...',
    label: 'Country',
  },
}

export const WithIcons: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: countryOptions,
    placeholder: 'Select a country',
    label: 'Country',
  },
}

export const WithDescriptions: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: userOptions,
    placeholder: 'Select a user',
    label: 'Assign to',
    size: 'lg',
  },
}

export const Variants: Story = {
  args: { options: basicOptions },
  render: () => (
    <div className="space-y-6">
      <AutocompleteWithState
        options={basicOptions}
        variant="default"
        placeholder="Default variant"
        label="Default"
      />
      <AutocompleteWithState
        options={basicOptions}
        variant="filled"
        placeholder="Filled variant"
        label="Filled"
      />
      <AutocompleteWithState
        options={basicOptions}
        variant="outlined"
        placeholder="Outlined variant"
        label="Outlined"
      />
      <AutocompleteWithState
        options={basicOptions}
        variant="underlined"
        placeholder="Underlined variant"
        label="Underlined"
      />
    </div>
  ),
}

export const Sizes: Story = {
  args: { options: basicOptions },
  render: () => (
    <div className="space-y-6">
      <AutocompleteWithState
        options={basicOptions}
        size="sm"
        placeholder="Small size"
        label="Small"
      />
      <AutocompleteWithState
        options={basicOptions}
        size="md"
        placeholder="Medium size"
        label="Medium"
      />
      <AutocompleteWithState
        options={basicOptions}
        size="lg"
        placeholder="Large size"
        label="Large"
      />
    </div>
  ),
}

export const States: Story = {
  args: { options: basicOptions },
  render: () => (
    <div className="space-y-6">
      <AutocompleteWithState
        options={basicOptions}
        status="success"
        placeholder="Success state"
        label="Success"
        helperText="Great choice!"
      />
      <AutocompleteWithState
        options={basicOptions}
        status="warning"
        placeholder="Warning state"
        label="Warning"
        helperText="Please review your selection"
      />
      <AutocompleteWithState
        options={basicOptions}
        status="error"
        placeholder="Error state"
        label="Error"
        helperText="This field is required"
        required
      />
    </div>
  ),
}

export const Transitions: Story = {
  args: { options: basicOptions },
  render: () => (
    <div className="space-y-6">
      <AutocompleteWithState
        options={basicOptions}
        transition="fade"
        placeholder="Fade transition"
        label="Fade"
      />
      <AutocompleteWithState
        options={basicOptions}
        transition="slide"
        placeholder="Slide transition"
        label="Slide"
      />
      <AutocompleteWithState
        options={basicOptions}
        transition="scale"
        placeholder="Scale transition"
        label="Scale"
      />
      <AutocompleteWithState
        options={basicOptions}
        transition="flip"
        placeholder="Flip transition"
        label="Flip"
      />
    </div>
  ),
}

export const Loading: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: [],
    loading: true,
    placeholder: 'Loading options...',
    label: 'Loading State',
  },
}

const DisabledComponent = () => {
  const [value] = useState<AutocompleteOption>(basicOptions[0])
  return (
    <Autocomplete
      options={basicOptions}
      disabled
      placeholder="Disabled autocomplete"
      label="Disabled Field"
      value={value}
      onChange={() => {}}
    />
  )
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
  },
  render: () => <DisabledComponent />,
}

export const DisabledOptions: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: [
      { value: 'available1', label: 'Available Option 1' },
      { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
      { value: 'available2', label: 'Available Option 2' },
      { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
      { value: 'available3', label: 'Available Option 3' },
    ],
    placeholder: 'Some options are disabled',
    label: 'Mixed Availability',
  },
}

const CreatableComponent = () => {
  const [options, setOptions] = useState(basicOptions)
  const [value, setValue] = useState<AutocompleteOption | null>(null)

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(value) => setValue(value as AutocompleteOption | null)}
      creatable
      searchable
      onCreate={(inputValue) => {
        const newOption = {
          value: inputValue.toLowerCase().replace(/\s+/g, '-'),
          label: inputValue,
        }
        setOptions([...options, newOption])
        setValue(newOption)
      }}
      placeholder="Type to create new..."
      label="Creatable Options"
      helperText="Type and press enter to create new options"
    />
  )
}

export const Creatable: Story = {
  args: {
    options: basicOptions,
  },
  render: () => <CreatableComponent />,
}

export const CustomRendering: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: userOptions,
    placeholder: 'Select a user',
    label: 'Custom Option Rendering',
    renderOption: (option, isSelected) => (
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-3">
          {option.icon}
          <div>
            <div className={isSelected ? 'font-semibold' : ''}>{option.label}</div>
            <div className="text-xs text-gray-500">{option.description}</div>
          </div>
        </div>
        {isSelected && <span className="text-green-500">✓</span>}
      </div>
    ),
    renderValue: (value) => {
      if (Array.isArray(value)) {
        return `${value.length} users selected`
      }
      return value.label
    },
  },
}

export const TopPlacement: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: basicOptions,
    placement: 'top',
    placeholder: 'Opens upward',
    label: 'Top Placement',
  },
  decorators: [
    (Story) => (
      <div style={{ marginTop: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

const ControlledComponent = () => {
  const [value, setValue] = useState<AutocompleteOption | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(basicOptions[0])}>
          Select React
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(basicOptions[1])}>
          Select Vue
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(null)}>
          Clear
        </button>
      </div>
      <Autocomplete
        options={basicOptions}
        value={value}
        onChange={(value) => setValue(value as AutocompleteOption | null)}
        placeholder="Controlled autocomplete"
        label="Controlled Value"
      />
      {value && (
        <p className="text-sm text-gray-600">
          Selected: {value.label} ({value.value})
        </p>
      )}
    </div>
  )
}

export const Controlled: Story = {
  args: { options: basicOptions },
  render: () => <ControlledComponent />,
}

const AsyncSearchComponent = () => {
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<AutocompleteOption | null>(null)

  const handleInputChange = (value: string) => {
    if (!value) {
      setOptions([])
      return
    }

    setLoading(true)
    setTimeout(() => {
      const filtered = basicOptions.filter((opt) =>
        opt.label.toLowerCase().includes(value.toLowerCase())
      )
      setOptions(filtered)
      setLoading(false)
    }, 1000)
  }

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(value) => setValue(value as AutocompleteOption | null)}
      loading={loading}
      searchable
      onInputChange={handleInputChange}
      placeholder="Type to search..."
      label="Async Search"
      helperText="Results are loaded asynchronously"
    />
  )
}

export const AsyncSearch: Story = {
  args: { options: [] },
  render: () => <AsyncSearchComponent />,
}

export const CustomIcons: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Custom icons',
    clearIcon: <span>✕</span>,
    dropdownIcon: <span>▼</span>,
    loadingIcon: <span>⟳</span>,
  },
}

export const EmptyState: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: [],
    placeholder: 'No options available',
    emptyMessage: 'No frameworks found. Try searching for something else.',
    label: 'Empty State',
  },
}

export const LongList: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Select from many options',
    label: 'Long List',
    maxHeight: 200,
  },
}

export const CustomStyled: Story = {
  render: (args) => <AutocompleteWithState {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Custom styled autocomplete',
    label: 'Custom Styled Component',
    helperText: 'This demonstrates custom styling capabilities',
    // Border styles
    borderWidth: '2px',
    borderColor: '#3b82f6',
    borderStyle: 'solid',
    borderRadius: '12px',
    // Text customization
    fontSize: '16px',
    fontWeight: '500',
    textColor: '#1e293b',
    placeholderColor: '#94a3b8',
    // Colors
    backgroundColor: '#f8fafc',
    // Focus styles
    focusRingColor: '#3b82f6',
    focusRingWidth: '3px',
    focusBorderColor: '#2563eb',
    focusBackgroundColor: '#ffffff',
    // Shadow
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    focusBoxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    // Padding
    paddingX: '16px',
    paddingY: '12px',
    // Dropdown styles
    dropdownBackgroundColor: '#ffffff',
    dropdownBorderColor: '#e2e8f0',
    dropdownBorderRadius: '12px',
    dropdownBoxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    // Item styles
    itemPadding: '12px 16px',
    itemHoverBackgroundColor: '#f1f5f9',
    itemSelectedBackgroundColor: '#dbeafe',
    itemSelectedTextColor: '#1e40af',
    itemHighlightedBackgroundColor: '#f8fafc',
    // Icon colors
    iconColor: '#64748b',
    clearIconColor: '#ef4444',
    dropdownIconColor: '#3b82f6',
    // Label styles
    labelFontSize: '18px',
    labelFontWeight: '600',
    labelColor: '#0f172a',
    labelMarginBottom: '8px',
    // Helper text styles
    helperTextFontSize: '14px',
    helperTextColor: '#64748b',
    helperTextMarginTop: '6px',
    // Required color
    requiredColor: '#dc2626',
  },
}

export const StyleVariations: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Gradient Style</h3>
        <AutocompleteWithState
          options={countryOptions}
          placeholder="Select a country"
          borderWidth="0"
          borderRadius="16px"
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          textColor="#ffffff"
          placeholderColor="rgba(255, 255, 255, 0.7)"
          fontSize="18px"
          fontWeight="600"
          padding="16px 20px"
          dropdownBackgroundColor="#ffffff"
          dropdownBorderRadius="16px"
          dropdownBoxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          itemHoverBackgroundColor="#f3f4f6"
          itemSelectedBackgroundColor="#e0e7ff"
          iconColor="#ffffff"
          clearIconColor="#ffffff"
          dropdownIconColor="#ffffff"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Flat Style</h3>
        <AutocompleteWithState
          options={basicOptions}
          placeholder="Choose framework"
          label="Framework"
          borderWidth="0"
          borderRadius="0"
          backgroundColor="#f9fafb"
          textColor="#111827"
          fontSize="14px"
          padding="12px"
          focusBackgroundColor="#f3f4f6"
          dropdownBackgroundColor="#ffffff"
          dropdownBorderWidth="0"
          dropdownBorderRadius="0"
          dropdownBoxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          itemPadding="10px 12px"
          itemHoverBackgroundColor="#f9fafb"
          itemSelectedBackgroundColor="#f3f4f6"
          itemSelectedTextColor="#111827"
          labelFontSize="13px"
          labelFontWeight="400"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dark Mode Style</h3>
        <AutocompleteWithState
          options={userOptions}
          placeholder="Search users..."
          searchable
          borderWidth="1px"
          borderColor="#374151"
          borderRadius="8px"
          backgroundColor="#1f2937"
          textColor="#f9fafb"
          placeholderColor="#9ca3af"
          fontSize="15px"
          focusBorderColor="#60a5fa"
          focusRingColor="#60a5fa"
          focusRingWidth="2px"
          dropdownBackgroundColor="#1f2937"
          dropdownBorderColor="#374151"
          dropdownBorderRadius="8px"
          itemHoverBackgroundColor="#374151"
          itemSelectedBackgroundColor="#4b5563"
          itemSelectedTextColor="#f9fafb"
          iconColor="#9ca3af"
          clearIconColor="#ef4444"
          dropdownIconColor="#9ca3af"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rounded Pill Style</h3>
        <AutocompleteWithState
          options={basicOptions}
          placeholder="Select option"
          borderWidth="2px"
          borderColor="#e5e7eb"
          borderRadius="9999px"
          backgroundColor="#ffffff"
          padding="12px 24px"
          fontSize="15px"
          focusBorderColor="#8b5cf6"
          focusRingColor="#8b5cf6"
          focusRingWidth="3px"
          focusRingOffset="2px"
          dropdownBorderRadius="16px"
          dropdownBoxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          itemPadding="8px 24px"
          itemHoverBackgroundColor="#faf5ff"
          itemSelectedBackgroundColor="#ede9fe"
          itemSelectedTextColor="#7c3aed"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Material Design Style</h3>
        <AutocompleteWithState
          options={basicOptions}
          placeholder="Select value"
          label="Material Style"
          variant="underlined"
          borderWidth="0"
          fontSize="16px"
          fontWeight="400"
          textColor="#212121"
          paddingX="0"
          paddingY="8px"
          focusBorderColor="#1976d2"
          dropdownBackgroundColor="#ffffff"
          dropdownBorderRadius="4px"
          dropdownBoxShadow="0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)"
          itemPadding="16px"
          itemHoverBackgroundColor="rgba(0, 0, 0, 0.04)"
          itemSelectedBackgroundColor="rgba(25, 118, 210, 0.08)"
          itemSelectedTextColor="#1976d2"
          labelFontSize="12px"
          labelFontWeight="400"
          labelColor="#757575"
        />
      </div>
    </div>
  ),
}

// Example showing how to use in a form
const FormExampleComponent = () => {
  const [formData, setFormData] = useState({
    framework: null as AutocompleteOption | null,
    country: null as AutocompleteOption | null,
    skills: [] as AutocompleteOption[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(`Form submitted!\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Autocomplete
        options={basicOptions}
        value={formData.framework}
        onChange={(value) =>
          setFormData({ ...formData, framework: value as AutocompleteOption | null })
        }
        label="Preferred Framework"
        placeholder="Select a framework"
        required
        helperText="Choose your primary framework"
      />

      <Autocomplete
        options={countryOptions}
        value={formData.country}
        onChange={(value) =>
          setFormData({ ...formData, country: value as AutocompleteOption | null })
        }
        label="Country"
        placeholder="Select your country"
        required
      />

      <Autocomplete
        options={basicOptions}
        value={formData.skills}
        onChange={(value) => setFormData({ ...formData, skills: value as AutocompleteOption[] })}
        multiple
        label="Skills"
        placeholder="Select your skills"
        helperText="Select all that apply"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setFormData({ framework: null, country: null, skills: [] })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export const FormExample: Story = {
  args: {
    options: basicOptions,
  },
  render: () => <FormExampleComponent />,
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components from Just UI are available in scope (Autocomplete).
      </p>
      <LivePlayground
        code={`<Autocomplete
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
  value={null}
  onChange={() => {}}
  placeholder="Search..."
/>`}
      />
    </div>
  ),
  args: {},
}
