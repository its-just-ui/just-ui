import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Cascade } from './Cascade'
import type { CascadeOption, CascadeValue } from './types'

const meta: Meta<typeof Cascade> = {
  title: 'Components/Cascade',
  component: Cascade,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A hierarchical selection component that allows users to select from nested options in a cascading dropdown.

## Features

- **Multi-level Selection**: Navigate through nested options with clear visual hierarchy
- **Search Functionality**: Search through options at any level
- **Path Display**: Show the complete selection path
- **Customizable**: Extensive styling and behavior customization
- **Accessible**: Full keyboard navigation and screen reader support
- **TypeScript**: Complete type safety with comprehensive interfaces

## Usage

\`\`\`tsx
import { Cascade } from 'just-ui'

const options = [
  {
    value: 'asia',
    label: 'Asia',
    children: [
      {
        value: 'china',
        label: 'China',
        children: [
          { value: 'beijing', label: 'Beijing' },
          { value: 'shanghai', label: 'Shanghai' }
        ]
      },
      {
        value: 'japan',
        label: 'Japan',
        children: [
          { value: 'tokyo', label: 'Tokyo' },
          { value: 'osaka', label: 'Osaka' }
        ]
      }
    ]
  }
]

<Cascade
  options={options}
  placeholder="Select a location..."
  onChange={(value) => console.log(value)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'underlined'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'scale', 'flip'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data for stories
const locationOptions: CascadeOption[] = [
  {
    value: 'asia',
    label: 'Asia',
    children: [
      {
        value: 'china',
        label: 'China',
        children: [
          { value: 'beijing', label: 'Beijing' },
          { value: 'shanghai', label: 'Shanghai' },
          { value: 'guangzhou', label: 'Guangzhou' },
        ],
      },
      {
        value: 'japan',
        label: 'Japan',
        children: [
          { value: 'tokyo', label: 'Tokyo' },
          { value: 'osaka', label: 'Osaka' },
          { value: 'kyoto', label: 'Kyoto' },
        ],
      },
      {
        value: 'korea',
        label: 'South Korea',
        children: [
          { value: 'seoul', label: 'Seoul' },
          { value: 'busan', label: 'Busan' },
        ],
      },
    ],
  },
  {
    value: 'europe',
    label: 'Europe',
    children: [
      {
        value: 'france',
        label: 'France',
        children: [
          { value: 'paris', label: 'Paris' },
          { value: 'lyon', label: 'Lyon' },
          { value: 'marseille', label: 'Marseille' },
        ],
      },
      {
        value: 'germany',
        label: 'Germany',
        children: [
          { value: 'berlin', label: 'Berlin' },
          { value: 'munich', label: 'Munich' },
          { value: 'hamburg', label: 'Hamburg' },
        ],
      },
    ],
  },
  {
    value: 'americas',
    label: 'Americas',
    children: [
      {
        value: 'usa',
        label: 'United States',
        children: [
          { value: 'new-york', label: 'New York' },
          { value: 'los-angeles', label: 'Los Angeles' },
          { value: 'chicago', label: 'Chicago' },
        ],
      },
      {
        value: 'canada',
        label: 'Canada',
        children: [
          { value: 'toronto', label: 'Toronto' },
          { value: 'vancouver', label: 'Vancouver' },
          { value: 'montreal', label: 'Montreal' },
        ],
      },
    ],
  },
]

const categoryOptions: CascadeOption[] = [
  {
    value: 'electronics',
    label: 'Electronics',
    children: [
      {
        value: 'computers',
        label: 'Computers',
        children: [
          { value: 'laptops', label: 'Laptops' },
          { value: 'desktops', label: 'Desktops' },
          { value: 'tablets', label: 'Tablets' },
        ],
      },
      {
        value: 'phones',
        label: 'Phones',
        children: [
          { value: 'smartphones', label: 'Smartphones' },
          { value: 'feature-phones', label: 'Feature Phones' },
        ],
      },
    ],
  },
  {
    value: 'clothing',
    label: 'Clothing',
    children: [
      {
        value: 'mens',
        label: "Men's",
        children: [
          { value: 'shirts', label: 'Shirts' },
          { value: 'pants', label: 'Pants' },
          { value: 'shoes', label: 'Shoes' },
        ],
      },
      {
        value: 'womens',
        label: "Women's",
        children: [
          { value: 'dresses', label: 'Dresses' },
          { value: 'tops', label: 'Tops' },
          { value: 'skirts', label: 'Skirts' },
        ],
      },
    ],
  },
]

// Basic Story
export const Default: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location...',
    label: 'Location',
    helperText: 'Choose your preferred location',
  },
}

// Controlled Story
const ControlledComponent = () => {
  const [value, setValue] = useState<CascadeValue | null>(null)

  return (
    <div className="space-y-4">
      <Cascade
        options={locationOptions}
        value={value}
        onChange={(newValue) => {
          if (Array.isArray(newValue)) {
            setValue(newValue[0] || null)
          } else {
            setValue(newValue)
          }
        }}
        placeholder="Select a location..."
        label="Controlled Cascade"
        helperText="This is a controlled component"
      />
      <div className="text-sm text-gray-600">
        Selected: {value ? `${value.label} (${value.value})` : 'None'}
      </div>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledComponent />,
}

// With Search
export const WithSearch: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Search and select a location...',
    searchable: true,
    label: 'Searchable Cascade',
    helperText: 'Type to search through options',
  },
}

// With Path Display
export const WithPath: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location...',
    showPath: true,
    label: 'Cascade with Path',
    helperText: 'Shows the complete selection path',
  },
}

// Multiple Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Cascade
        options={locationOptions}
        placeholder="Default variant"
        variant="default"
        label="Default"
      />
      <Cascade
        options={locationOptions}
        placeholder="Filled variant"
        variant="filled"
        label="Filled"
      />
      <Cascade
        options={locationOptions}
        placeholder="Outlined variant"
        variant="outlined"
        label="Outlined"
      />
      <Cascade
        options={locationOptions}
        placeholder="Ghost variant"
        variant="ghost"
        label="Ghost"
      />
      <Cascade
        options={locationOptions}
        placeholder="Underlined variant"
        variant="underlined"
        label="Underlined"
      />
    </div>
  ),
}

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Cascade options={locationOptions} placeholder="Small size" size="sm" label="Small" />
      <Cascade options={locationOptions} placeholder="Medium size" size="md" label="Medium" />
      <Cascade options={locationOptions} placeholder="Large size" size="lg" label="Large" />
    </div>
  ),
}

// Status States
export const StatusStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Cascade
        options={locationOptions}
        placeholder="Default status"
        status="default"
        label="Default"
      />
      <Cascade
        options={locationOptions}
        placeholder="Success status"
        status="success"
        label="Success"
      />
      <Cascade
        options={locationOptions}
        placeholder="Warning status"
        status="warning"
        label="Warning"
      />
      <Cascade
        options={locationOptions}
        placeholder="Error status"
        status="error"
        errorMessage="This field is required"
        label="Error"
      />
    </div>
  ),
}

// With Custom Styling
export const CustomStyling: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Custom styled cascade...',
    label: 'Custom Styled',
    helperText: 'With custom colors and styling',
    backgroundColor: '#f8fafc',
    borderColor: '#3b82f6',
    borderRadius: '12px',
    focusRingColor: '#3b82f6',
    dropdownBackgroundColor: '#ffffff',
    dropdownBorderRadius: '8px',
    dropdownBoxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    optionHoverBackgroundColor: '#eff6ff',
    optionSelectedBackgroundColor: '#3b82f6',
    optionSelectedTextColor: '#ffffff',
  },
}

// With Icons
export const WithIcons: Story = {
  args: {
    options: [
      {
        value: 'folder',
        label: 'Documents',
        icon: '📁',
        children: [
          {
            value: 'work',
            label: 'Work',
            icon: '💼',
            children: [
              { value: 'reports', label: 'Reports', icon: '📊' },
              { value: 'presentations', label: 'Presentations', icon: '📈' },
            ],
          },
          {
            value: 'personal',
            label: 'Personal',
            icon: '👤',
            children: [
              { value: 'photos', label: 'Photos', icon: '📷' },
              { value: 'videos', label: 'Videos', icon: '🎥' },
            ],
          },
        ],
      },
    ],
    placeholder: 'Select a folder...',
    label: 'File System',
    helperText: 'Navigate through your file system',
  },
}

// Loading State
export const Loading: Story = {
  args: {
    options: [],
    placeholder: 'Loading options...',
    loading: true,
    label: 'Loading Cascade',
    helperText: 'Options are being loaded',
  },
}

// Disabled State
export const Disabled: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Disabled cascade...',
    disabled: true,
    label: 'Disabled Cascade',
    helperText: 'This cascade is disabled',
  },
}

// With Clear Button
const WithClearComponent = () => {
  const [value, setValue] = useState<CascadeValue | null>({
    value: 'beijing',
    label: 'Beijing',
    path: ['asia', 'china', 'beijing'],
    level: 2,
  })

  return (
    <Cascade
      options={locationOptions}
      value={value}
      onChange={(newValue) => {
        if (Array.isArray(newValue)) {
          setValue(newValue[0] || null)
        } else {
          setValue(newValue)
        }
      }}
      placeholder="Select a location..."
      clearable
      label="Clearable Cascade"
      helperText="Click the X to clear the selection"
    />
  )
}

export const WithClear: Story = {
  render: () => <WithClearComponent />,
}

// Custom Render Functions
export const CustomRender: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select with custom rendering...',
    label: 'Custom Render',
    helperText: 'With custom option and value rendering',
    renderOption: (option, isSelected, level) => (
      <div className="flex items-center gap-2">
        <span className="text-lg">🌍</span>
        <span className={isSelected ? 'font-semibold' : ''}>{option.label}</span>
        <span className="text-xs text-gray-500">(Level {level})</span>
      </div>
    ),
    renderValue: (value) => {
      if (Array.isArray(value)) {
        return <span className="font-semibold text-blue-600">{value[0]?.label}</span>
      }
      return <span className="font-semibold text-blue-600">{value?.label}</span>
    },
  },
}

// Complex Example
const ComplexExampleComponent = () => {
  const [selectedValue, setSelectedValue] = useState<CascadeValue | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Product Category Selector</h3>
        <Cascade
          options={categoryOptions}
          value={selectedValue}
          onChange={(newValue) => {
            if (Array.isArray(newValue)) {
              setSelectedValue(newValue[0] || null)
            } else {
              setSelectedValue(newValue)
            }
          }}
          placeholder="Select a product category..."
          searchable
          showPath
          clearable
          label="Product Category"
          helperText="Navigate through product categories to find what you're looking for"
          variant="filled"
          size="lg"
        />
      </div>

      {selectedValue && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Selected Category:</h4>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Value:</strong> {selectedValue.value}
            </p>
            <p>
              <strong>Label:</strong> {selectedValue.label}
            </p>
            <p>
              <strong>Level:</strong> {selectedValue.level}
            </p>
            <p>
              <strong>Path:</strong> {selectedValue.path.join(' → ')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export const ComplexExample: Story = {
  render: () => <ComplexExampleComponent />,
}
