import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { List, ListContainer, ListItem, ListHeader, ListFooter } from './List'

/**
 * List is a versatile component for displaying selectable or interactive items.
 *
 * ## Features
 * - **Multiple Variants**: 5 visual styles from minimal to elevated designs
 * - **Flexible Sizing**: 3 size options from small to large (sm, md, lg)
 * - **Status States**: Built-in semantic status colors for different contexts
 * - **Interactive Elements**: Support for selection, click handlers, and hover effects
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use ListContainer, ListItem, ListHeader, and ListFooter for full control
 * - **Form Integration**: Works seamlessly in forms with controlled/uncontrolled modes
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Rich Content**: Support for avatars, icons, badges, and custom actions
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <List items={items} />
 * <List items={items} selectable value={selected} onChange={setSelected} />
 * ```
 *
 * ### Interactive Lists:
 * ```tsx
 * <List
 *   items={items}
 *   selectable
 *   multiple
 *   onItemClick={(item) => console.log('clicked:', item)}
 *   onItemSelect={(item) => console.log('selected:', item)}
 * />
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <List items={items} selectable>
 *   <ListHeader>User List</ListHeader>
 *   <ListContainer>
 *     {items.map(item => (
 *       <ListItemData key={item.id} item={item} />
 *     ))}
 *   </ListContainer>
 *   <ListFooter>Total: {items.length}</ListFooter>
 * </List>
 * ```
 *
 * ### With Custom Rendering:
 * ```tsx
 * <List
 *   items={items}
 *   renderItem={(item, isSelected) => (
 *     <div className={isSelected ? 'bg-blue-100' : ''}>
 *       <h3>{item.title}</h3>
 *       <p>{item.description}</p>
 *     </div>
 *   )}
 * />
 * ```
 */
const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    items: {
      control: 'object',
      description: 'Array of list items to display',
      table: {
        category: 'Core Props',
        type: { summary: 'ListItemData[]' },
      },
    },
    value: {
      control: false,
      description: 'The selected item(s). Can be string, string[], or null',
      table: {
        category: 'Core Props',
        type: { summary: 'string | string[] | null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback fired when the value changes',
      table: {
        category: 'Core Props',
        type: { summary: '(value: string | string[] | null) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'card', 'minimal', 'elevated'],
      description: 'Visual style variant of the list',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the list component',
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
      description: 'Disable the list interactions',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required (affects ARIA attributes)',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Enable item selection behavior',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple item selections',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    maxSelection: {
      control: 'number',
      description: 'Maximum number of items that can be selected',
      table: {
        category: 'Core Props',
        type: { summary: 'number' },
      },
    },

    // Content Props
    children: {
      control: false,
      description: 'Main content of the list component',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text above the component',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the component',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no items are available',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'No items found' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown when loading',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    renderItem: {
      control: false,
      description: 'Custom render function for items',
      table: {
        category: 'Content',
        type: { summary: '(item: ListItemData, isSelected: boolean) => React.ReactNode' },
      },
    },

    // Event Handlers
    onItemClick: {
      control: false,
      description: 'Callback fired when an item is clicked',
      table: {
        category: 'Event Handlers',
        type: { summary: '(item: ListItemData) => void' },
      },
    },
    onItemSelect: {
      control: false,
      description: 'Callback fired when an item is selected',
      table: {
        category: 'Event Handlers',
        type: { summary: '(item: ListItemData) => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  {
    id: '1',
    title: 'John Doe',
    description: 'Software Engineer at Tech Corp',
    avatar: (
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
        JD
      </div>
    ),
    badge: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
    ),
    action: <span>→</span>,
  },
  {
    id: '2',
    title: 'Jane Smith',
    description: 'Product Manager at Design Studio',
    avatar: (
      <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
        JS
      </div>
    ),
    badge: (
      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Away</span>
    ),
    action: <span>→</span>,
  },
  {
    id: '3',
    title: 'Bob Johnson',
    description: 'UX Designer at Creative Agency',
    avatar: (
      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
        BJ
      </div>
    ),
    badge: <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Busy</span>,
    action: <span>→</span>,
  },
]

// Simple items without chips, images, or subtext
const simpleItems = [
  {
    id: '1',
    title: 'Home',
  },
  {
    id: '2',
    title: 'About',
  },
  {
    id: '3',
    title: 'Contact',
  },
  {
    id: '4',
    title: 'Services',
  },
]

const techItems = [
  {
    id: 'react',
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    icon: <span>⚛️</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Popular</span>
    ),
  },
  {
    id: 'vue',
    title: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    icon: <span>💚</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Trending</span>
    ),
  },
  {
    id: 'angular',
    title: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
    icon: <span>🅰️</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Enterprise</span>
    ),
  },
]

const statusItems = [
  {
    id: 'success',
    title: 'Success Status',
    description: 'Everything is working correctly',
    icon: <span>✅</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Success</span>
    ),
  },
  {
    id: 'warning',
    title: 'Warning Status',
    description: 'Something needs attention',
    icon: <span>⚠️</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Warning</span>
    ),
  },
  {
    id: 'error',
    title: 'Error Status',
    description: 'Something went wrong',
    icon: <span>❌</span>,
    badge: <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Error</span>,
  },
]

// Wrapper component to handle state for stories
interface ListWithStateProps extends React.ComponentProps<typeof List> {
  value?: string | string[] | null
}

const ListWithState = (props: ListWithStateProps) => {
  const [value, setValue] = useState<string | string[] | null>(
    props.multiple ? props.value || [] : props.value || null
  )

  return <List {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
  },
}

export const Simple: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: simpleItems,
    label: 'Simple Navigation',
  },
}

export const WithLabel: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
    label: 'Team Members',
    helperText: 'Select team members to invite',
  },
}

export const Selectable: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
    selectable: true,
    label: 'Selectable List',
  },
}

export const Multiple: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
    selectable: true,
    multiple: true,
    label: 'Multiple Selection',
    helperText: 'Select multiple team members (max 2)',
    maxSelection: 2,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState items={sampleItems} variant="default" label="Default Variant" />
      <ListWithState items={sampleItems} variant="bordered" label="Bordered Variant" />
      <ListWithState items={sampleItems} variant="card" label="Card Variant" />
      <ListWithState items={sampleItems} variant="minimal" label="Minimal Variant" />
      <ListWithState items={sampleItems} variant="elevated" label="Elevated Variant" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState items={sampleItems} size="sm" label="Small Size" />
      <ListWithState items={sampleItems} size="md" label="Medium Size" />
      <ListWithState items={sampleItems} size="lg" label="Large Size" />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState items={statusItems} status="success" label="Success Status" />
      <ListWithState items={statusItems} status="warning" label="Warning Status" />
      <ListWithState items={statusItems} status="error" label="Error Status" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => <ListWithState items={techItems} label="Technologies with Icons" />,
}

export const Loading: Story = {
  render: () => <ListWithState loading label="Loading State" />,
}

const DisabledComponent = () => {
  const [value] = useState<string[]>(['1'])
  return (
    <List
      items={sampleItems}
      disabled
      label="Disabled List"
      helperText="This list cannot be interacted with"
      value={value}
      onChange={() => {}}
    />
  )
}

export const Disabled: Story = {
  render: () => <DisabledComponent />,
}

export const EmptyState: Story = {
  render: () => (
    <ListWithState
      items={[]}
      label="Empty List"
      emptyMessage="No items available. Add some to get started."
    />
  ),
}

export const CustomRendering: Story = {
  render: () => (
    <ListWithState
      items={sampleItems}
      label="Custom Rendered Items"
      renderItem={(item, isSelected) => (
        <div
          className={`p-4 rounded-lg ${isSelected ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'} border`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>
            {isSelected && <span className="text-blue-500">✓</span>}
          </div>
        </div>
      )}
    />
  ),
}

const ControlledComponent = () => {
  const [value, setValue] = useState<string | null>('1')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue('1')}>
          Select John
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue('2')}>
          Select Jane
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(null)}>
          Clear
        </button>
      </div>
      <List
        items={sampleItems}
        value={value}
        onChange={(newValue) => setValue(newValue as string | null)}
        selectable
        label="Controlled List"
      />
      {value && (
        <p className="text-sm text-gray-600">
          Selected: {sampleItems.find((item) => item.id === value)?.title}
        </p>
      )}
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledComponent />,
}

const CompoundComponentsExample = () => {
  const [value, setValue] = useState<string | string[] | null>(null)

  return (
    <List items={sampleItems} value={value} onChange={setValue} label="Compound Component Usage">
      <ListHeader>Team Members</ListHeader>
      <ListContainer>
        {sampleItems.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ListContainer>
      <ListFooter>Total: {sampleItems.length} members</ListFooter>
    </List>
  )
}

export const CompoundComponents: Story = {
  render: () => <CompoundComponentsExample />,
}

export const CustomStyled: Story = {
  render: () => (
    <ListWithState
      items={sampleItems}
      label="Custom Styled List"
      helperText="This demonstrates custom styling capabilities"
      className="bg-gray-50 rounded-lg p-4"
      style={{
        border: '2px solid #3b82f6',
        borderRadius: '12px',
      }}
    />
  ),
}

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Card Style</h3>
        <ListWithState
          items={sampleItems}
          variant="card"
          label="Card Style List"
          className="bg-white rounded-lg shadow-lg"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Style</h3>
        <ListWithState
          items={sampleItems}
          variant="minimal"
          label="Minimal Style List"
          className="bg-transparent"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Elevated Style</h3>
        <ListWithState
          items={sampleItems}
          variant="elevated"
          label="Elevated Style List"
          className="bg-white rounded-xl shadow-xl"
        />
      </div>
    </div>
  ),
}

// Example showing how to use in a form
const FormExampleComponent = () => {
  const [formData, setFormData] = useState({
    users: [] as string[],
    technologies: [] as string[],
    priority: null as string | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(`Form submitted!\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <List
        items={sampleItems}
        value={formData.users}
        onChange={(value) => setFormData({ ...formData, users: value as string[] })}
        multiple
        selectable
        label="Select Team Members"
        helperText="Choose team members for the project"
      />

      <List
        items={techItems}
        value={formData.technologies}
        onChange={(value) => setFormData({ ...formData, technologies: value as string[] })}
        multiple
        selectable
        maxSelection={3}
        label="Select Technologies"
        helperText="Choose up to 3 technologies"
      />

      <List
        items={statusItems}
        value={formData.priority}
        onChange={(value) => setFormData({ ...formData, priority: value as string | null })}
        selectable
        label="Priority Level"
        helperText="Select the priority level"
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
          onClick={() => setFormData({ users: [], technologies: [], priority: null })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
}
