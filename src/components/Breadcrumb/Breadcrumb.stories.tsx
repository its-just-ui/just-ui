import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemComponent,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from './Breadcrumb'

/**
 * Breadcrumb is a navigation component that shows the user's current location within a website's hierarchy.
 *
 * ## Usage
 *
 * The Breadcrumb component can be used in both controlled and uncontrolled modes:
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Electronics', href: '/products/electronics' },
 *     { label: 'Laptops' }
 *   ]}
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [activeIndex, setActiveIndex] = useState<number | null>(null)
 *
 * <Breadcrumb
 *   items={items}
 *   value={activeIndex}
 *   onChange={(index, item) => {
 *     setActiveIndex(index)
 *     // Handle navigation
 *   }}
 * />
 * ```
 *
 * ### Item Structure:
 * ```tsx
 * interface BreadcrumbItem {
 *   label: string          // Display text
 *   href?: string          // Optional link URL
 *   icon?: React.ReactNode // Optional icon
 *   disabled?: boolean     // Optional disabled state
 *   [key: string]: any     // Additional custom properties
 * }
 * ```
 *
 * ### Custom Rendering:
 * You can also use the compound components for full control:
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbLink item={{ label: 'Home', href: '/' }} index={0} />
 *   <BreadcrumbSeparator />
 *   <BreadcrumbLink item={{ label: 'Products' }} index={1} isLast />
 * </Breadcrumb>
 * ```
 */
const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
      },
    },
    value: {
      control: false,
      description: 'Currently active item index (for controlled mode)',
      table: {
        type: { summary: 'number | null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when an item is clicked',
      table: {
        type: { summary: '(index: number, item: BreadcrumbItem) => void' },
      },
    },
    onNavigate: {
      control: false,
      description: 'Callback for navigation (separate from onChange)',
      table: {
        type: { summary: '(index: number, item: BreadcrumbItem) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'bordered', 'underline', 'pills'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the breadcrumb',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    separator: {
      control: 'text',
      description: 'Custom separator between items',
      table: {
        type: { summary: 'React.ReactNode | string' },
      },
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to display before collapsing',
      table: {
        type: { summary: 'number' },
      },
    },
    itemsBeforeCollapse: {
      control: 'number',
      description: 'Number of items to show before collapsed section',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    itemsAfterCollapse: {
      control: 'number',
      description: 'Number of items to show after collapsed section',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
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
    disabled: {
      control: 'boolean',
      description: 'Disable all items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'scale'],
      description: 'Transition animation for items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transitions in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    renderItem: {
      control: false,
      description: 'Custom render function for items',
      table: {
        type: {
          summary: '(item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode',
        },
      },
    },
    renderCollapsed: {
      control: false,
      description: 'Custom render function for collapsed items',
      table: {
        type: { summary: '(hiddenItems: BreadcrumbItem[]) => React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops', href: '/products/electronics/laptops' },
  { label: 'Gaming Laptops' },
]

const iconItems: BreadcrumbItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    label: 'Documents',
    href: '/documents',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: 'Projects',
    href: '/documents/projects',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: 'Q4 Report',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

const longPath: BreadcrumbItem[] = [
  { label: 'Root', href: '/' },
  { label: 'Level 1', href: '/level1' },
  { label: 'Level 2', href: '/level1/level2' },
  { label: 'Level 3', href: '/level1/level2/level3' },
  { label: 'Level 4', href: '/level1/level2/level3/level4' },
  { label: 'Level 5', href: '/level1/level2/level3/level4/level5' },
  { label: 'Level 6', href: '/level1/level2/level3/level4/level5/level6' },
  { label: 'Current Page' },
]

// Wrapper component for controlled stories
const BreadcrumbWithState = (props: any) => {
  const [value, setValue] = useState<number | null>(null)

  return (
    <Breadcrumb
      {...props}
      value={value}
      onChange={(index, item) => {
        setValue(index)
        console.log('Breadcrumb clicked:', index, item)
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => <BreadcrumbWithState {...args} />,
  args: {
    items: basicItems,
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Default Breadcrumb (no props except items)
        </h3>
        <Breadcrumb items={basicItems} />
        <p className="text-xs text-gray-500 mt-1">
          Default separator: &gt; | Default colors and styles applied
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Icons (default icon styles)</h3>
        <Breadcrumb items={iconItems} />
        <p className="text-xs text-gray-500 mt-1">Icons use currentColor by default</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Pills Variant (default pill styles)
        </h3>
        <Breadcrumb items={basicItems} variant="pills" />
        <p className="text-xs text-gray-500 mt-1">Pills have default hover and active colors</p>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: (args) => <BreadcrumbWithState {...args} />,
  args: {
    items: iconItems,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
        <BreadcrumbWithState items={basicItems} variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Solid</h3>
        <BreadcrumbWithState items={basicItems} variant="solid" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Bordered</h3>
        <BreadcrumbWithState items={basicItems} variant="bordered" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Underline</h3>
        <BreadcrumbWithState items={basicItems} variant="underline" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Pills</h3>
        <BreadcrumbWithState items={basicItems} variant="pills" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
        <BreadcrumbWithState items={basicItems} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Medium</h3>
        <BreadcrumbWithState items={basicItems} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
        <BreadcrumbWithState items={basicItems} size="lg" />
      </div>
    </div>
  ),
}

export const CustomSeparators: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Slash Separator</h3>
        <BreadcrumbWithState items={basicItems} separator="/" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Dot Separator</h3>
        <BreadcrumbWithState items={basicItems} separator="•" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Arrow Separator</h3>
        <BreadcrumbWithState items={basicItems} separator="→" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Icon Separator</h3>
        <BreadcrumbWithState
          items={basicItems}
          separator={
            <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          }
        />
      </div>
    </div>
  ),
}

export const CollapsedItems: Story = {
  render: (args) => <BreadcrumbWithState {...args} />,
  args: {
    items: longPath,
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 2,
    renderCollapsed: (hiddenItems) => (
      <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
        {hiddenItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </a>
        ))}
      </div>
    ),
  },
}

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">All Disabled</h3>
        <Breadcrumb items={basicItems} disabled />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Individual Items Disabled</h3>
        <BreadcrumbWithState
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products', disabled: true },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops', disabled: true },
          ]}
        />
      </div>
    </div>
  ),
}

export const LoadingState: Story = {
  render: (args) => <Breadcrumb {...args} />,
  args: {
    items: basicItems,
    loading: true,
  },
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Fade Transition</h3>
        <BreadcrumbWithState items={basicItems} transition="fade" transitionDuration={300} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Scale Transition</h3>
        <BreadcrumbWithState items={basicItems} transition="scale" transitionDuration={200} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Slide Transition</h3>
        <BreadcrumbWithState items={basicItems} transition="slide" transitionDuration={250} />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: (args) => <BreadcrumbWithState {...args} />,
  args: {
    items: basicItems,
    // Container styles
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    // Text styles
    fontSize: '15px',
    fontWeight: '500',
    textColor: '#475569',
    // Item styles
    itemHoverBackgroundColor: '#e2e8f0',
    itemHoverTextColor: '#1e293b',
    itemActiveBackgroundColor: '#3b82f6',
    itemActiveTextColor: '#ffffff',
    itemPadding: '6px 12px',
    itemBorderRadius: '6px',
    // Separator styles
    separatorColor: '#cbd5e1',
    separatorSize: '20px',
    // Focus styles
    focusRingColor: '#3b82f6',
    focusRingWidth: '2px',
    focusRingOffset: '2px',
  },
}

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Modern Gradient</h3>
        <Breadcrumb
          items={iconItems}
          variant="solid"
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          textColor="#ffffff"
          itemHoverBackgroundColor="rgba(255, 255, 255, 0.2)"
          itemHoverTextColor="#ffffff"
          itemBorderRadius="9999px"
          itemPaddingX="16px"
          itemPaddingY="8px"
          separatorColor="#ffffff"
          borderRadius="16px"
          padding="8px"
          boxShadow="0 10px 25px -5px rgba(102, 126, 234, 0.3)"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Flat</h3>
        <Breadcrumb
          items={basicItems}
          backgroundColor="#ffffff"
          borderWidth="0"
          borderRadius="0"
          textColor="#6b7280"
          itemHoverTextColor="#111827"
          fontSize="14px"
          fontWeight="400"
          separatorColor="#e5e7eb"
          separatorSize="16px"
          padding="16px 0"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dark Mode</h3>
        <Breadcrumb
          items={iconItems}
          backgroundColor="#1f2937"
          textColor="#9ca3af"
          borderRadius="8px"
          padding="12px 16px"
          itemHoverBackgroundColor="#374151"
          itemHoverTextColor="#f3f4f6"
          itemActiveBackgroundColor="#4b5563"
          itemActiveTextColor="#ffffff"
          itemPadding="6px 12px"
          itemBorderRadius="6px"
          separatorColor="#4b5563"
          focusRingColor="#60a5fa"
          boxShadow="0 1px 3px rgba(0, 0, 0, 0.3)"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Outlined Pills</h3>
        <Breadcrumb
          items={basicItems}
          variant="pills"
          backgroundColor="#ffffff"
          borderWidth="2px"
          borderColor="#e5e7eb"
          borderStyle="solid"
          borderRadius="9999px"
          padding="6px"
          textColor="#6b7280"
          itemBackgroundColor="#ffffff"
          itemHoverBackgroundColor="#f9fafb"
          itemHoverTextColor="#4b5563"
          itemActiveBackgroundColor="#6366f1"
          itemActiveTextColor="#ffffff"
          itemBorderRadius="9999px"
          itemPaddingX="20px"
          itemPaddingY="8px"
          itemBoxShadow="0 1px 2px rgba(0, 0, 0, 0.05)"
          itemHoverBoxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          separatorColor="#e5e7eb"
          gap="8px"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Material Design</h3>
        <Breadcrumb
          items={basicItems}
          backgroundColor="#ffffff"
          textColor="#5f6368"
          fontSize="14px"
          fontWeight="500"
          itemHoverBackgroundColor="rgba(0, 0, 0, 0.04)"
          itemHoverTextColor="#202124"
          itemActiveTextColor="#1a73e8"
          itemPadding="8px 12px"
          itemBorderRadius="4px"
          separatorColor="#dadce0"
          focusRingColor="#1a73e8"
          focusRingWidth="2px"
        />
      </div>
    </div>
  ),
}

const CustomRenderingComponent = () => {
  const [value, setValue] = useState<number | null>(null)

  return (
    <Breadcrumb
      items={iconItems}
      value={value}
      onChange={setValue}
      renderItem={(item, index, isLast) => (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isLast ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
          {!isLast && <span className="text-xs text-gray-500">({index + 1})</span>}
        </div>
      )}
      separator={
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      }
    />
  )
}

export const CustomRendering: Story = {
  render: () => <CustomRenderingComponent />,
}

const ControlledWithNavigationComponent = () => {
  const [value, setValue] = useState<number | null>(2)
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <Breadcrumb
        items={basicItems}
        value={value}
        onChange={(index, _item) => {
          setValue(index)
        }}
        onNavigate={(index, item) => {
          setNavigationHistory([...navigationHistory, `Navigated to: ${item.label}`])
        }}
        variant="bordered"
      />

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-medium mb-2">Active Index: {value ?? 'None'}</h4>
        <div className="space-y-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            onClick={() => setValue(0)}
          >
            Go to Home
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            onClick={() => setValue(2)}
          >
            Go to Electronics
          </button>
          <button
            className="px-3 py-1 bg-gray-500 text-white rounded"
            onClick={() => setValue(null)}
          >
            Clear Selection
          </button>
        </div>

        {navigationHistory.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Navigation History:</h4>
            <ul className="text-sm text-gray-600">
              {navigationHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export const ControlledWithNavigation: Story = {
  render: () => <ControlledWithNavigationComponent />,
}

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Using Compound Components</h3>
        <Breadcrumb>
          <ol className="flex items-center space-x-2">
            <BreadcrumbItemComponent
              index={0}
              item={{ label: 'Home', href: '/', icon: '🏠' }}
              isLast={false}
            />
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItemComponent
              index={1}
              item={{ label: 'Products', href: '/products' }}
              isLast={false}
            />
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItemComponent index={2} item={{ label: 'Current Page' }} isLast={true} />
          </ol>
        </Breadcrumb>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Custom Layout with BreadcrumbLink
        </h3>
        <Breadcrumb variant="solid" size="lg">
          <div className="flex items-center gap-4">
            <BreadcrumbLink item={{ label: '🏠 Home', href: '/' }} index={0} />
            <span className="text-gray-400">|</span>
            <BreadcrumbLink item={{ label: '📁 Documents', href: '/docs' }} index={1} />
            <span className="text-gray-400">|</span>
            <BreadcrumbLink item={{ label: '📄 Report' }} index={2} isLast />
          </div>
        </Breadcrumb>
      </div>
    </div>
  ),
}

const RealWorldExampleComponent = () => {
  const [currentPath, setCurrentPath] = useState('/products/electronics/laptops/gaming')

  const pathToBreadcrumbs = (path: string): BreadcrumbItem[] => {
    const segments = path.split('/').filter(Boolean)
    return [
      { label: 'Home', href: '/' },
      ...segments.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: '/' + segments.slice(0, index + 1).join('/'),
      })),
    ]
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <Breadcrumb
          items={pathToBreadcrumbs(currentPath)}
          variant="underline"
          onNavigate={(index, item) => {
            if (item.href) {
              setCurrentPath(item.href)
            }
          }}
          itemHoverTextColor="#2563eb"
          itemActiveTextColor="#1d4ed8"
          focusRingColor="#2563eb"
        />
      </div>

      <div className="p-4 bg-white border rounded-lg">
        <h3 className="font-medium mb-2">Simulate Navigation:</h3>
        <div className="space-x-2">
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPath('/products')}
          >
            Go to Products
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPath('/products/electronics/phones')}
          >
            Go to Phones
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPath('/blog/articles/tech/latest')}
          >
            Go to Blog
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">Current path: {currentPath}</p>
      </div>
    </div>
  )
}

export const RealWorldExample: Story = {
  render: () => <RealWorldExampleComponent />,
}
