import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Segmented } from './Segmented'
import LivePlayground from '../../../.storybook/components/LivePlayground'

// Icons for examples
const ListIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
)

const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const basicOptions = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
  { label: 'Chart', value: 'chart' },
]

const iconOptions = [
  { label: 'List', value: 'list', icon: <ListIcon /> },
  { label: 'Grid', value: 'grid', icon: <GridIcon /> },
  { label: 'Chart', value: 'chart', icon: <ChartIcon /> },
]

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
  { label: 'Extra Large', value: 'xl' },
]

const disabledOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { label: 'Available', value: 'available' },
]

// Controlled wrapper component for stories
const SegmentedWithState = ({
  defaultValue = 'list',
  ...props
}: {
  defaultValue?: string
  [key: string]: unknown
}) => {
  const [value, setValue] = useState(defaultValue)
  return <Segmented {...props} value={value} onChange={setValue} />
}

/**
 * Segmented is a component for switching between mutually exclusive options, similar to radio buttons but with a more visual interface.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 6 pre-defined visual styles including underline for tabs
 * - **3 Sizes**: Small, medium, and large options
 * - **Smooth Animations**: Sliding indicator animation with 6 transition styles
 * - **Transition Variants**: smooth, bouncy, swift, elastic, instant, and fade animations
 * - **Keyboard Navigation**: Full arrow key support with automatic wrapping
 * - **Icon Support**: Options can include icons alongside labels
 * - **Disabled States**: Individual options or entire component can be disabled
 * - **Extensive Styling**: Over 30 style props for complete customization
 * - **Direction Support**: Horizontal or vertical layouts
 * - **Accessibility**: WAI-ARIA compliant with proper roles and states
 * - **Custom Rendering**: Support for custom option rendering
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Segmented
 *   defaultValue="list"
 *   options={[
 *     { label: 'List', value: 'list' },
 *     { label: 'Grid', value: 'grid' },
 *     { label: 'Chart', value: 'chart' }
 *   ]}
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [view, setView] = useState('list')
 *
 * <Segmented
 *   value={view}
 *   onChange={setView}
 *   options={options}
 * />
 * ```
 *
 * ### With Icons:
 * ```tsx
 * <Segmented
 *   options={[
 *     { label: 'List', value: 'list', icon: <ListIcon /> },
 *     { label: 'Grid', value: 'grid', icon: <GridIcon /> }
 *   ]}
 * />
 * ```
 *
 * ### Tab-like Appearance:
 * ```tsx
 * <Segmented
 *   variant="underline"
 *   options={[
 *     { label: 'Overview', value: 'overview' },
 *     { label: 'Analytics', value: 'analytics' },
 *     { label: 'Reports', value: 'reports' }
 *   ]}
 * />
 * ```
 */
const meta: Meta<typeof Segmented> = {
  title: 'Components/Segmented',
  component: Segmented,
  parameters: {
    layout: 'centered',
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
      action: 'changed',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    options: {
      control: 'object',
      description: 'Array of options to display',
      table: {
        type: { summary: 'SegmentedOption[]' },
        defaultValue: { summary: '[]' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'filled', 'minimal', 'underline'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'SegmentedVariant' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the segmented control',
      table: {
        type: { summary: 'SegmentedSize' },
        defaultValue: { summary: 'md' },
      },
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of options',
      table: {
        type: { summary: 'SegmentedDirection' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    transition: {
      control: 'select',
      options: ['smooth', 'bouncy', 'swift', 'elastic', 'instant', 'fade'],
      description: 'Animation style for transitions',
      table: {
        type: { summary: 'SegmentedTransition' },
        defaultValue: { summary: 'smooth' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the component read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width of the container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Use fully rounded corners',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    animateIndicator: {
      control: 'boolean',
      description: 'Enable animated sliding indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius for the component and items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0.5rem' },
      },
    },
    // Hide complex props from controls
    renderItem: {
      control: false,
      description: 'Custom render function for items',
      table: {
        type: { summary: '(option, isSelected, isDisabled) => ReactNode' },
      },
    },
    children: {
      control: false,
      description: 'Custom children instead of auto-generated items',
      table: { disable: true },
    },
  },
  args: {
    options: basicOptions,
    variant: 'solid',
    size: 'md',
    direction: 'horizontal',
    disabled: false,
    readOnly: false,
    fullWidth: false,
    rounded: false,
    animateIndicator: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Stories
export const Default: Story = {
  render: (args) => <SegmentedWithState {...args} />,
}

export const WithIcons: Story = {
  args: {
    options: iconOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
  parameters: {
    layout: 'padded',
  },
}

// Variant Stories
export const VariantSolid: Story = {
  args: {
    variant: 'solid',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const VariantOutline: Story = {
  args: {
    variant: 'outline',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const VariantGhost: Story = {
  args: {
    variant: 'ghost',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const VariantFilled: Story = {
  args: {
    variant: 'filled',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const VariantMinimal: Story = {
  args: {
    variant: 'minimal',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const VariantUnderline: Story = {
  args: {
    variant: 'underline',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

// Size Stories
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const SizeMedium: Story = {
  args: {
    size: 'md',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

// State Stories
export const WithDisabledOptions: Story = {
  args: {
    options: disabledOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    options: basicOptions,
    defaultValue: 'grid',
  },
  render: (args) => <SegmentedWithState {...args} />,
}

// Custom Styling
export const CustomColors: Story = {
  args: {
    options: basicOptions,
    backgroundColor: '#fef3c7',
    indicatorColor: '#f59e0b',
    selectedTextColor: '#92400e',
    borderColor: '#fbbf24',
    borderRadius: '12px',
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const CustomBorderRadius: Story = {
  args: {
    options: basicOptions,
    borderRadius: '20px',
  },
  render: (args) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Solid variant with 20px radius</h3>
        <SegmentedWithState {...args} variant="solid" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Outline variant with 20px radius</h3>
        <SegmentedWithState {...args} variant="outline" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Ghost variant with 20px radius</h3>
        <SegmentedWithState {...args} variant="ghost" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Underline variant (radius not applied)</h3>
        <SegmentedWithState {...args} variant="underline" />
      </div>
    </div>
  ),
}

export const Rounded: Story = {
  args: {
    rounded: true,
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const NoAnimation: Story = {
  args: {
    animateIndicator: false,
    options: basicOptions,
  },
  render: (args) => <SegmentedWithState {...args} />,
}

// Transition Variants
export const TransitionVariants: Story = {
  args: {
    options: basicOptions,
  },
  render: (args) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Smooth (default)</h3>
        <SegmentedWithState {...args} transition="smooth" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Bouncy</h3>
        <SegmentedWithState {...args} transition="bouncy" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Swift</h3>
        <SegmentedWithState {...args} transition="swift" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Elastic</h3>
        <SegmentedWithState {...args} transition="elastic" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Instant</h3>
        <SegmentedWithState {...args} transition="instant" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Fade</h3>
        <SegmentedWithState {...args} transition="fade" variant="filled" />
      </div>
    </div>
  ),
}

// Complex Examples
export const ManyOptions: Story = {
  args: {
    options: [
      { label: 'Jan', value: 'jan' },
      { label: 'Feb', value: 'feb' },
      { label: 'Mar', value: 'mar' },
      { label: 'Apr', value: 'apr' },
      { label: 'May', value: 'may' },
      { label: 'Jun', value: 'jun' },
    ],
    size: 'sm',
  },
  render: (args) => <SegmentedWithState {...args} />,
}

export const LongLabels: Story = {
  args: {
    options: [
      { label: 'Dashboard Overview', value: 'dashboard' },
      { label: 'Analytics Report', value: 'analytics' },
      { label: 'User Management', value: 'users' },
    ],
    fullWidth: true,
  },
  render: (args) => <SegmentedWithState {...args} />,
  parameters: {
    layout: 'padded',
  },
}

export const CustomRenderItem: Story = {
  args: {
    options: sizeOptions,
    renderItem: (option, isSelected, isDisabled) => (
      <div
        className={`px-4 py-2 font-medium transition-all ${
          isSelected
            ? 'bg-blue-500 text-white rounded-lg shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {option.label}
      </div>
    ),
  },
  render: (args) => <SegmentedWithState {...args} />,
}

// Real-world Examples
// Content switcher component
const ContentSwitcherExample = () => {
  const [view, setView] = useState('list')
  const [content] = useState({
    list: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    grid: ['A', 'B', 'C', 'D'],
    chart: ['📊', '📈', '📉', '📋'],
  })

  return (
    <div className="w-full max-w-md space-y-4">
      <Segmented value={view} onChange={setView} options={iconOptions} fullWidth />
      <div className="border rounded-lg p-4 min-h-[120px]">
        {view === 'list' && (
          <ul className="space-y-2">
            {content.list.map((item, i) => (
              <li key={i} className="p-2 bg-gray-50 rounded">
                {item}
              </li>
            ))}
          </ul>
        )}
        {view === 'grid' && (
          <div className="grid grid-cols-2 gap-2">
            {content.grid.map((item, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-50 rounded flex items-center justify-center text-lg font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        )}
        {view === 'chart' && (
          <div className="flex justify-center items-center space-x-4 h-full">
            {content.chart.map((item, i) => (
              <div key={i} className="text-2xl">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const ContentSwitcher: Story = {
  render: () => <ContentSwitcherExample />,
  parameters: {
    layout: 'padded',
  },
}

// Filter example component
const FilterExampleComponent = () => {
  const [filter, setFilter] = useState('all')
  const items = [
    { name: 'Task 1', status: 'active' },
    { name: 'Task 2', status: 'completed' },
    { name: 'Task 3', status: 'active' },
    { name: 'Task 4', status: 'pending' },
    { name: 'Task 5', status: 'completed' },
  ]

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
  ]

  const filteredItems = filter === 'all' ? items : items.filter((item) => item.status === filter)

  return (
    <div className="w-full max-w-md space-y-4">
      <Segmented
        value={filter}
        onChange={setFilter}
        options={filterOptions}
        variant="outline"
        size="sm"
      />
      <div className="space-y-2">
        {filteredItems.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span>{item.name}</span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                item.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : item.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const FilterExample: Story = {
  render: () => <FilterExampleComponent />,
  parameters: {
    layout: 'padded',
  },
}

// Accessibility demonstration
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        <p>Try keyboard navigation:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">←</kbd> /{' '}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">→</kbd> Navigate horizontally
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">↑</kbd> /{' '}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">↓</kbd> Navigate vertically
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> Focus component
          </li>
        </ul>
      </div>
      <SegmentedWithState options={iconOptions} />
      <SegmentedWithState options={basicOptions} direction="vertical" variant="outline" />
    </div>
  ),
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Segmented).
      </p>
      <LivePlayground
        code={`<Segmented defaultValue="list" options={[{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Chart', value: 'chart' }]} />`}
      />
    </div>
  ),
  args: {},
}
