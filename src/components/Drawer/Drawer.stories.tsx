import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DrawerCompound as Drawer, type DrawerItem } from './Drawer'
import { cn } from '../../utils/cn'

/**
 * Drawer is a flexible slide-out panel component that provides navigation, content, or controls.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Positions**: Support for left, right, top, bottom placement
 * - **5 Variants**: Default, overlay, push, mini, and persistent styles
 * - **5 Sizes**: From small to full-screen options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Collapsible**: Optional collapsible/mini mode for navigation drawers
 * - **Focus Management**: Automatic focus trapping and keyboard navigation
 * - **Accessibility**: Complete ARIA attributes and screen reader support
 * - **Custom Content**: Flexible header, content, and footer areas
 * - **Item Management**: Built-in support for navigation items with icons and badges
 * - **Extensive Styling**: Over 40 style props for complete customization
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 *
 * ## Usage
 *
 * ### Basic Usage (Controlled):
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Drawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Navigation"
 * >
 *   <p>Drawer content goes here</p>
 * </Drawer>
 * ```
 *
 * ### With Navigation Items:
 * ```tsx
 * const items = [
 *   { id: '1', label: 'Dashboard', icon: '📊' },
 *   { id: '2', label: 'Settings', icon: '⚙️' },
 *   { id: '3', label: 'Profile', icon: '👤' }
 * ]
 *
 * <Drawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   items={items}
 *   title="Menu"
 * />
 * ```
 *
 * ### Different Positions:
 * ```tsx
 * <Drawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   position="right"
 *   title="Side Panel"
 * >
 *   Content here
 * </Drawer>
 * ```
 *
 * ### Collapsible Navigation:
 * ```tsx
 * <Drawer
 *   open={true}
 *   variant="persistent"
 *   collapsible={true}
 *   collapsed={collapsed}
 *   onCollapsedChange={setCollapsed}
 *   items={navigationItems}
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Drawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   backgroundColor="#f8fafc"
 *   borderColor="#e2e8f0"
 *   headerBackgroundColor="#1e293b"
 *   headerTextColor="white"
 * >
 *   Custom styled drawer
 * </Drawer>
 * ```
 */
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core props
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      control: false,
      description: 'Callback when open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state for uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    items: {
      control: false,
      description: 'Array of navigation items to display',
      table: {
        type: { summary: 'DrawerItem[]' },
      },
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the drawer',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'overlay', 'push', 'mini', 'persistent'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the drawer',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },

    // Content
    title: {
      control: 'text',
      description: 'Title text for the drawer header',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Main content of the drawer',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    header: {
      control: false,
      description: 'Custom header content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    footer: {
      control: false,
      description: 'Custom footer content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },

    // States
    disabled: {
      control: 'boolean',
      description: 'Disable the drawer',
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
    collapsible: {
      control: 'boolean',
      description: 'Enable collapsible mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    collapsed: {
      control: 'boolean',
      description: 'Controlled collapsed state',
      table: {
        type: { summary: 'boolean' },
      },
    },

    // Behavior
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close drawer when clicking overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close drawer when pressing Escape',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCloseIcon: {
      control: 'boolean',
      description: 'Show close icon in header',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    preventScroll: {
      control: 'boolean',
      description: 'Prevent body scroll when open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    focusTrap: {
      control: 'boolean',
      description: 'Enable focus trapping',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    // Messages
    loadingMessage: {
      control: 'text',
      description: 'Message shown during loading state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no items are available',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No items found' },
      },
    },

    // Styling variants
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
      description: 'Animation style for drawer',
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
        defaultValue: { summary: 300 },
      },
    },

    // Custom render functions
    renderItem: {
      control: false,
      description: 'Custom render function for items',
      table: {
        category: 'Custom Render',
        type: { summary: '(item: DrawerItem, isActive: boolean) => React.ReactNode' },
      },
    },
    renderHeader: {
      control: false,
      description: 'Custom render function for header',
      table: {
        category: 'Custom Render',
        type: { summary: '() => React.ReactNode' },
      },
    },
    renderFooter: {
      control: false,
      description: 'Custom render function for footer',
      table: {
        category: 'Custom Render',
        type: { summary: '() => React.ReactNode' },
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

    // Colors
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    overlayColor: {
      control: 'color',
      description: 'Overlay background color',
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
      description: 'Box shadow (set to "none" to remove shadow)',
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

    // Dimensions
    width: {
      control: 'text',
      description: 'Custom width (overrides size)',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
      },
    },
    height: {
      control: 'text',
      description: 'Custom height (overrides size)',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
      },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
      },
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height',
      table: {
        category: 'Dimensions',
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

    // Header styles
    headerBackgroundColor: {
      control: 'color',
      description: 'Header background color',
      table: {
        category: 'Header Styles',
        type: { summary: 'string' },
      },
    },
    headerBorderColor: {
      control: 'color',
      description: 'Header border color',
      table: {
        category: 'Header Styles',
        type: { summary: 'string' },
      },
    },
    headerPadding: {
      control: 'text',
      description: 'Header padding',
      table: {
        category: 'Header Styles',
        type: { summary: 'string' },
      },
    },
    headerFontSize: {
      control: 'text',
      description: 'Header font size',
      table: {
        category: 'Header Styles',
        type: { summary: 'string' },
      },
    },
    headerFontWeight: {
      control: 'text',
      description: 'Header font weight',
      table: {
        category: 'Header Styles',
        type: { summary: 'string' },
      },
    },
    headerTextColor: {
      control: 'color',
      description: 'Header text color',
      table: {
        category: 'Header Styles',
        type: { summary: 'string' },
      },
    },

    // Footer styles
    footerBackgroundColor: {
      control: 'color',
      description: 'Footer background color',
      table: {
        category: 'Footer Styles',
        type: { summary: 'string' },
      },
    },
    footerBorderColor: {
      control: 'color',
      description: 'Footer border color',
      table: {
        category: 'Footer Styles',
        type: { summary: 'string' },
      },
    },
    footerPadding: {
      control: 'text',
      description: 'Footer padding',
      table: {
        category: 'Footer Styles',
        type: { summary: 'string' },
      },
    },

    // Item styles
    itemPadding: {
      control: 'text',
      description: 'Item padding',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemHoverBackgroundColor: {
      control: 'color',
      description: 'Item background color on hover',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemActiveBackgroundColor: {
      control: 'color',
      description: 'Active item background color',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemActiveTextColor: {
      control: 'color',
      description: 'Active item text color',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemDisabledOpacity: {
      control: 'text',
      description: 'Disabled item opacity',
      table: {
        category: 'Item Styles',
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

    // Event handlers
    onFocus: {
      control: false,
      description: 'Callback when drawer receives focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Callback when drawer loses focus',
      table: {
        type: { summary: '() => void' },
      },
    },
    onItemClick: {
      control: false,
      description: 'Callback when an item is clicked',
      table: {
        type: { summary: '(item: DrawerItem) => void' },
      },
    },

    // Close icon
    closeIcon: {
      control: false,
      description: 'Custom close icon',
      table: {
        category: 'Close Icon',
        type: { summary: 'React.ReactNode' },
      },
    },
    closeIconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of close icon',
      table: {
        category: 'Close Icon',
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
    closeIconClassName: {
      control: 'text',
      description: 'Additional CSS classes for close icon button',
      table: {
        category: 'Close Icon',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const basicItems: DrawerItem[] = [
  { id: '1', label: 'Dashboard', icon: '📊' },
  { id: '2', label: 'Analytics', icon: '📈' },
  { id: '3', label: 'Reports', icon: '📋' },
  { id: '4', label: 'Settings', icon: '⚙️' },
  { id: '5', label: 'Profile', icon: '👤' },
]

const itemsWithBadges: DrawerItem[] = [
  { id: '1', label: 'Inbox', icon: '📧', badge: '5' },
  { id: '2', label: 'Drafts', icon: '📝', badge: '2' },
  { id: '3', label: 'Sent', icon: '📤' },
  { id: '4', label: 'Archive', icon: '📦', badge: '12' },
  { id: '5', label: 'Trash', icon: '🗑️' },
]

const itemsWithDescriptions: DrawerItem[] = [
  { id: '1', label: 'Home', icon: '🏠', description: 'Main dashboard view' },
  { id: '2', label: 'Projects', icon: '📁', description: 'Manage your projects' },
  { id: '3', label: 'Team', icon: '👥', description: 'Team collaboration' },
  { id: '4', label: 'Calendar', icon: '📅', description: 'Schedule and events' },
]

const itemsWithDisabled: DrawerItem[] = [
  { id: '1', label: 'Available Item', icon: '✅' },
  { id: '2', label: 'Disabled Item', icon: '❌', disabled: true },
  { id: '3', label: 'Another Available', icon: '✅' },
  { id: '4', label: 'Also Disabled', icon: '❌', disabled: true },
]

// Wrapper component for controlled stories
const DrawerWithState = ({
  defaultOpen = false,
  defaultCollapsed = false,
  onOpenChange,
  onCollapsedChange,
  ...props
}: Omit<React.ComponentProps<typeof Drawer>, 'open' | 'collapsed'> & {
  defaultOpen?: boolean
  defaultCollapsed?: boolean
  onOpenChange?: (open: boolean) => void
  onCollapsedChange?: (collapsed: boolean) => void
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const handleCollapsedChange = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed)
    onCollapsedChange?.(newCollapsed)
  }

  return (
    <Drawer
      {...props}
      open={open}
      onOpenChange={handleOpenChange}
      collapsed={collapsed}
      onCollapsedChange={handleCollapsedChange}
    />
  )
}

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen relative overflow-y-scroll">
      <DrawerWithState {...args} />
      <div className="p-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {}}
        >
          Open Drawer
        </button>
        <p className="mt-4 text-gray-600">Click the button to open the drawer</p>
      </div>
    </div>
  ),
  args: {
    title: 'Navigation',
    items: basicItems,
    defaultOpen: true,
  },
}

export const ShowingDefaults: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Default Drawer (minimal props)</h3>
        <div className="h-80 relative border rounded">
          <DrawerWithState defaultOpen items={basicItems} />
        </div>
        <p className="text-xs text-gray-500">All default styles applied</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Title</h3>
        <div className="h-80 relative border rounded">
          <DrawerWithState defaultOpen items={basicItems} title="Navigation Menu" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Custom Content</h3>
        <div className="h-80 relative border rounded">
          <DrawerWithState defaultOpen title="Custom Content">
            <div className="p-4">
              <h4 className="font-medium mb-2">Welcome!</h4>
              <p className="text-gray-600">This is custom drawer content.</p>
              <button className="mt-4 px-3 py-1 bg-blue-500 text-white rounded text-sm">
                Action Button
              </button>
            </div>
          </DrawerWithState>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Header and Footer</h3>
        <div className="h-80 relative border rounded">
          <DrawerWithState
            defaultOpen
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Header Title</h3>
                <button className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
            }
            footer={
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-200 rounded text-sm">Cancel</button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Save</button>
              </div>
            }
          >
            <div className="p-4">
              <p>Content between header and footer</p>
            </div>
          </DrawerWithState>
        </div>
      </div>
    </div>
  ),
}

export const Positions: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Left Position (Default)</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen position="left" items={basicItems} title="Left Drawer" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Right Position</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen position="right" items={basicItems} title="Right Drawer" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Top Position</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen position="top" items={basicItems} title="Top Drawer" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Bottom Position</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              position="bottom"
              items={basicItems}
              title="Bottom Drawer"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Default Variant</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen variant="default" items={basicItems} title="Default" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Overlay Variant</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen variant="overlay" items={basicItems} title="Overlay" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Push Variant</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen variant="push" items={basicItems} title="Push" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Persistent Variant</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              variant="persistent"
              items={basicItems}
              title="Persistent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Mini Variant (Collapsible)</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              variant="mini"
              collapsible
              defaultCollapsed
              items={basicItems}
              title="Mini"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Small Size</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen size="sm" items={basicItems} title="Small" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Medium Size (Default)</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen size="md" items={basicItems} title="Medium" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Large Size</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen size="lg" items={basicItems} title="Large" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Extra Large Size</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen size="xl" items={basicItems} title="Extra Large" />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Default Status</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen status="default" items={basicItems} title="Default" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Success Status</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen status="success" items={basicItems} title="Success" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Warning Status</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen status="warning" items={basicItems} title="Warning" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Error Status</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen status="error" items={basicItems} title="Error" />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const States: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Loading State</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              loading
              loadingMessage="Loading navigation..."
              title="Loading"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Empty State</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={[]}
              emptyMessage="No navigation items"
              title="Empty"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Disabled State</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen disabled items={basicItems} title="Disabled" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">With Disabled Items</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen items={itemsWithDisabled} title="Some Disabled" />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const WithItemVariations: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Items with Badges</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen items={itemsWithBadges} title="Mail" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Items with Descriptions</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen items={itemsWithDescriptions} title="Navigation" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Icons</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={[
                {
                  id: '1',
                  label: 'React',
                  icon: <div className="w-4 h-4 bg-blue-500 rounded"></div>,
                },
                {
                  id: '2',
                  label: 'Vue',
                  icon: <div className="w-4 h-4 bg-green-500 rounded"></div>,
                },
                {
                  id: '3',
                  label: 'Angular',
                  icon: <div className="w-4 h-4 bg-red-500 rounded"></div>,
                },
              ]}
              title="Frameworks"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Mix of Features</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={[
                { id: '1', label: 'Dashboard', icon: '📊', badge: 'New' },
                { id: '2', label: 'Analytics', icon: '📈', description: 'View reports' },
                { id: '3', label: 'Settings', icon: '⚙️', disabled: true },
                { id: '4', label: 'Profile', icon: '👤', badge: '!' },
              ]}
              title="Mixed Features"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  args: {
    items: basicItems,
  },
  render: function TransitionsExample() {
    const [activeTransition, setActiveTransition] = useState<string>('slide')
    const [isOpen, setIsOpen] = useState(false)

    const transitions = ['none', 'fade', 'slide', 'scale', 'flip'] as const

    return (
      <div className="space-y-6 p-4 overflow-y-scroll">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Transition Effects</h3>
          <div className="flex gap-2 flex-wrap">
            {transitions.map((transition) => (
              <button
                key={transition}
                className={cn(
                  'px-3 py-1 rounded text-sm border',
                  activeTransition === transition
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                )}
                onClick={() => setActiveTransition(transition)}
              >
                {transition}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Drawer
          </button>
        </div>

        <div className="h-80 relative border rounded">
          <Drawer
            open={isOpen}
            onOpenChange={setIsOpen}
            transition={activeTransition as 'none' | 'fade' | 'slide' | 'scale' | 'flip'}
            transitionDuration={500}
            items={basicItems}
            title={`${activeTransition} Transition`}
            variant="overlay"
          />
          <div className="p-4">
            <p className="text-gray-600">
              Current transition: <strong>{activeTransition}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try different transitions and toggle the drawer to see the effects.
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export const CustomStyling: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Dark Theme</h3>
          <div className="h-80 relative border rounded bg-gray-900">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Dark Theme"
              backgroundColor="#1f2937"
              textColor="#f9fafb"
              headerBackgroundColor="#111827"
              headerTextColor="#f9fafb"
              borderColor="#374151"
              itemHoverBackgroundColor="#374151"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Colorful Theme</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Colorful"
              backgroundColor="#fef7ff"
              borderColor="#d946ef"
              borderWidth="2px"
              headerBackgroundColor="#a21caf"
              headerTextColor="white"
              itemHoverBackgroundColor="#f3e8ff"
              itemActiveBackgroundColor="#e879f9"
              iconColor="#a21caf"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Rounded Style</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Rounded"
              borderRadius="20px"
              headerBackgroundColor="#f0f9ff"
              headerTextColor="#0369a1"
              itemPadding="12px 20px"
              boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Typography</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Custom Fonts"
              fontSize="16px"
              fontWeight="500"
              headerFontSize="20px"
              headerFontWeight="700"
              itemPadding="16px"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const WithCloseIcon: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 overflow-y-scroll">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Default Close Icon</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState defaultOpen items={basicItems} title="With Close Icon" showCloseIcon />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Close Icon on Left</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Close Icon Left"
              showCloseIcon
              closeIconPosition="left"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Close Icon</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Custom Icon"
              showCloseIcon
              closeIcon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
              closeIconClassName="p-2 hover:bg-red-100 hover:text-red-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">No Shadow</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="No Shadow"
              boxShadow="none"
              showCloseIcon
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Shadow</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              title="Custom Shadow"
              boxShadow="0 0 20px rgba(0, 0, 0, 0.15)"
              showCloseIcon
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

const CollapsibleNavigationComponent = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>('1')

  const navigationItems: DrawerItem[] = [
    { id: '1', label: 'Dashboard', icon: '📊', description: 'Main overview' },
    { id: '2', label: 'Analytics', icon: '📈', description: 'Data insights' },
    { id: '3', label: 'Projects', icon: '📁', description: 'Manage projects', badge: '5' },
    { id: '4', label: 'Team', icon: '👥', description: 'Team members' },
    { id: '5', label: 'Calendar', icon: '📅', description: 'Schedule events' },
    { id: '6', label: 'Documents', icon: '📄', description: 'File management' },
    { id: '7', label: 'Settings', icon: '⚙️', description: 'App preferences' },
  ]

  return (
    <div className="h-80 flex bg-gray-50">
      <Drawer
        open={true}
        variant="persistent"
        collapsible={true}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        items={navigationItems}
        header={
          <div className="flex items-center justify-between">
            {!collapsed && <span className="font-semibold">Navigation</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-gray-200"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
        }
        footer={!collapsed && <div className="text-xs text-gray-500">Version 1.0.0</div>}
        onItemClick={(item) => setSelectedItem(item.id as string)}
        renderItem={(item) => (
          <div
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg mx-2 transition-colors cursor-pointer',
              selectedItem === item.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-500 truncate">{item.description}</div>
                )}
              </div>
            )}
          </div>
        )}
      />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          {navigationItems.find((item) => item.id === selectedItem)?.label}
        </h1>
        <p className="text-gray-600">
          This is the main content area. The navigation drawer is persistent and collapsible.
        </p>
        <div className="mt-6 p-4 bg-white rounded border">
          <h3 className="font-medium mb-2">Current Selection</h3>
          <p>
            Selected item ID: <code className="bg-gray-100 px-1 rounded">{selectedItem}</code>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Click items in the drawer to see them highlighted here.
          </p>
        </div>
      </div>
    </div>
  )
}

export const CollapsibleNavigation: Story = {
  args: {
    items: basicItems,
  },
  render: () => <CollapsibleNavigationComponent />,
}

const FormIntegrationComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify(formData, null, 2))
    setDrawerOpen(false)
  }

  return (
    <div className="h-80 relative">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Contact Form Integration</h2>
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Contact Form
        </button>
        <p className="mt-4 text-gray-600">Click the button to open a drawer with a contact form.</p>
      </div>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        position="right"
        variant="overlay"
        size="md"
        title="Contact Us"
        footer={
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="contact-form"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        }
      >
        <form id="contact-form" onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </form>
      </Drawer>
    </div>
  )
}

export const FormIntegration: Story = {
  args: {
    items: basicItems,
  },
  render: () => <FormIntegrationComponent />,
}

export const CustomRendering: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Item Rendering</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={itemsWithDescriptions}
              title="Custom Items"
              renderItem={(item, isActive) => (
                <div
                  className={cn(
                    'p-4 border-l-4 transition-colors',
                    isActive ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Header</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={basicItems}
              renderHeader={() => (
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <h2 className="text-lg font-bold">🎨 Creative Header</h2>
                  <p className="text-sm opacity-90">Custom styled header</p>
                </div>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Empty State</h3>
          <div className="h-80 relative border rounded">
            <DrawerWithState
              defaultOpen
              items={[]}
              title="Empty Drawer"
              renderEmpty={() => (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first item</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add Item
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AccessibilityExample: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-6 p-4 overflow-y-scroll">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All drawers support keyboard navigation. Try using Tab, Enter, Escape, and Arrow keys.
        </p>

        <div className="h-80 relative border rounded">
          <DrawerWithState
            defaultOpen
            items={basicItems}
            title="Accessible Drawer"
            aria-label="Main navigation drawer"
            aria-describedby="drawer-description"
            focusTrap={true}
            closeOnEscape={true}
          />
          <div className="p-4">
            <p id="drawer-description" className="text-sm text-gray-600">
              This drawer demonstrates accessibility features including focus trapping, keyboard
              navigation, and proper ARIA attributes.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>Tab:</strong> Navigate between focusable elements
              </p>
              <p>
                <strong>Escape:</strong> Close the drawer
              </p>
              <p>
                <strong>Enter/Space:</strong> Activate focused item
              </p>
              <p>
                <strong>Arrow keys:</strong> Navigate between items (when implemented)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div className="space-y-8 p-4 overflow-y-scroll">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">E-commerce Product Filters</h3>
          <div className="h-80 relative border rounded bg-gray-50">
            <DrawerWithState
              defaultOpen
              position="left"
              size="sm"
              title="Filters"
              items={[
                { id: '1', label: 'Category', icon: '📂', badge: '5' },
                { id: '2', label: 'Price Range', icon: '💰' },
                { id: '3', label: 'Brand', icon: '🏷️', badge: '12' },
                { id: '4', label: 'Rating', icon: '⭐' },
                { id: '5', label: 'Availability', icon: '📦' },
              ]}
              footer={
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Clear All
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Apply
                  </button>
                </div>
              }
            />
            <div className="p-6 ml-64">
              <h2 className="text-xl font-bold mb-4">Product Catalog</h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-4 rounded border">
                    <div className="h-24 bg-gray-200 rounded mb-2"></div>
                    <h3 className="font-medium">Product {i}</h3>
                    <p className="text-gray-600 text-sm">$99.99</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Admin Dashboard Navigation</h3>
          <div className="h-80 relative border rounded bg-gray-100">
            <DrawerWithState
              defaultOpen
              variant="persistent"
              collapsible={true}
              items={[
                { id: '1', label: 'Overview', icon: '📊', description: 'Dashboard home' },
                { id: '2', label: 'Users', icon: '👥', description: 'Manage users', badge: '24' },
                {
                  id: '3',
                  label: 'Orders',
                  icon: '📦',
                  description: 'Order management',
                  badge: '7',
                },
                { id: '4', label: 'Products', icon: '📱', description: 'Product catalog' },
                { id: '5', label: 'Analytics', icon: '📈', description: 'View reports' },
                { id: '6', label: 'Settings', icon: '⚙️', description: 'System settings' },
              ]}
              header={
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold">Admin Panel</div>
                    <div className="text-xs text-gray-500">v2.1.0</div>
                  </div>
                </div>
              }
              backgroundColor="white"
              headerBackgroundColor="#f8fafc"
              itemPadding="12px 16px"
            />
            <div className="p-6 ml-80">
              <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-medium text-gray-900">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-medium text-gray-900">Active Orders</h3>
                  <p className="text-2xl font-bold text-green-600">89</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Mobile App Menu</h3>
          <div className="h-80 relative border rounded bg-gray-900 overflow-hidden">
            <div className="w-full max-w-sm mx-auto bg-white h-full relative">
              <div className="h-16 bg-blue-500 flex items-center justify-between px-4 text-white">
                <h1 className="font-semibold">My App</h1>
                <button className="p-1" onClick={() => {}}>
                  ☰
                </button>
              </div>

              <DrawerWithState
                defaultOpen
                position="right"
                size="sm"
                variant="overlay"
                items={[
                  { id: '1', label: 'Home', icon: '🏠' },
                  { id: '2', label: 'Profile', icon: '👤', badge: '!' },
                  { id: '3', label: 'Messages', icon: '💬', badge: '3' },
                  { id: '4', label: 'Notifications', icon: '🔔', badge: '12' },
                  { id: '5', label: 'Settings', icon: '⚙️' },
                  { id: '6', label: 'Help', icon: '❓' },
                  { id: '7', label: 'Logout', icon: '🚪' },
                ]}
                backgroundColor="white"
                itemPadding="16px 20px"
                className="h-full"
              />

              <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Welcome Back!</h2>
                <p className="text-gray-600 text-sm">
                  This demonstrates a mobile-style sliding menu drawer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
