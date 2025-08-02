import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

// Wrapper component for controlled state
const BadgeWithState = ({
  children,
  closeButton = false,
  onClose,
  ...props
}: React.ComponentProps<typeof Badge> & { closeButton?: boolean; onClose?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <Badge {...props} closeButton={closeButton} onClose={handleClose}>
      {children}
    </Badge>
  )
}

/**
 * Badge is a versatile component for displaying status, labels, notifications, and interactive elements with extensive customization options.
 *
 * ## Features
 * - **Multiple Variants**: 8 visual styles from subtle to eye-catching designs (default, filled, outlined, ghost, solid, gradient, glass, neon)
 * - **Flexible Sizing**: 6 size options from extra small to extra extra large (xs, sm, md, lg, xl, 2xl)
 * - **Status States**: Built-in semantic status colors for different contexts (default, success, warning, error, info, primary, secondary)
 * - **Interactive Elements**: Support for icons, close buttons, and click handlers with hover effects
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use Badge.Icon, Badge.CloseButton, Badge.Label, and Badge.HelperText for full control
 * - **Extensive Styling**: Over 60 style props for complete visual customization
 * - **Smooth Animations**: Multiple animation effects (pulse, bounce, shake, glow) with customizable timing
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Form Integration**: Works seamlessly in forms with controlled/uncontrolled modes
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Badge>Default Badge</Badge>
 * <Badge variant="filled" size="lg" status="success">Success Badge</Badge>
 * ```
 *
 * ### Interactive Badges:
 * ```tsx
 * <Badge
 *   interactive
 *   icon="⭐"
 *   closeButton
 *   onClose={() => console.log('closed')}
 *   onClick={() => console.log('clicked')}
 * >
 *   Interactive Badge
 * </Badge>
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <Badge>
 *   <Badge.Icon>🔔</Badge.Icon>
 *   <Badge.Label>Notification</Badge.Label>
 *   <Badge.CloseButton />
 *   <Badge.HelperText>Helper text</Badge.HelperText>
 * </Badge>
 * ```
 *
 * ### Animated Badges:
 * ```tsx
 * <Badge animated animation="pulse" status="error">
 *   Live Status
 * </Badge>
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Badge
 *   backgroundColor="#6366f1"
 *   textColor="white"
 *   borderRadius="20px"
 *   padding="8px 16px"
 *   boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
 *   hoverScale="1.05"
 * >
 *   Custom Styled Badge
 * </Badge>
 * ```
 *
 * ### Form Integration:
 * ```tsx
 * const [tags, setTags] = useState(['React', 'TypeScript'])
 *
 * {tags.map(tag => (
 *   <Badge
 *     key={tag}
 *     closeButton
 *     onClose={() => removeTag(tag)}
 *   >
 *     {tag}
 *   </Badge>
 * ))}
 * ```
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'solid', 'gradient', 'glass', 'neon'],
      description: 'Visual style variant of the badge',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the badge component',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'primary', 'secondary'],
      description: 'Status state for semantic coloring',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the badge interactions',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required (affects ARIA attributes)',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive behaviors (hover, click effects)',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    children: {
      control: 'text',
      description: 'Main content of the badge',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Label content for the badge',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the badge',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Icon element to display',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Show close button for dismissible badges',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loadingSpinner: {
      control: false,
      description: 'Custom loading spinner element',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },

    // Animation & Effects
    animated: {
      control: 'boolean',
      description: 'Enable animations',
      table: {
        category: 'Animation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'bounce', 'shake', 'glow'],
      description: 'Type of animation to apply',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
        defaultValue: { summary: 'pulse' },
      },
    },
    animationDuration: {
      control: 'number',
      description: 'Duration of animation in milliseconds',
      table: {
        category: 'Animation',
        type: { summary: 'number' },
        defaultValue: { summary: 1000 },
      },
    },
    animationDelay: {
      control: 'number',
      description: 'Delay before animation starts',
      table: {
        category: 'Animation',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    animationIterationCount: {
      control: 'text',
      description: 'Number of animation iterations',
      table: {
        category: 'Animation',
        type: { summary: 'string | number' },
        defaultValue: { summary: 'infinite' },
      },
    },

    // Container Styles
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Border width (e.g., "1px", "2px")',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double'],
      description: 'Border style',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius (e.g., "8px", "50%")',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding for the badge',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    paddingX: {
      control: 'text',
      description: 'Horizontal padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    paddingY: {
      control: 'text',
      description: 'Vertical padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin around the badge',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },

    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size (e.g., "14px", "1rem")',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
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
    letterSpacing: {
      control: 'text',
      description: 'Letter spacing',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    lineHeight: {
      control: 'text',
      description: 'Line height',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },

    // Hover & Focus Effects
    hoverBackgroundColor: {
      control: 'color',
      description: 'Background color on hover',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    hoverTextColor: {
      control: 'color',
      description: 'Text color on hover',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    hoverScale: {
      control: 'text',
      description: 'Scale transformation on hover',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    hoverOpacity: {
      control: 'text',
      description: 'Opacity on hover',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingWidth: {
      control: 'text',
      description: 'Focus ring width',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingOffset: {
      control: 'text',
      description: 'Focus ring offset',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },

    // Shadow Effects
    boxShadow: {
      control: 'text',
      description: 'Box shadow for the badge',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    focusBoxShadow: {
      control: 'text',
      description: 'Box shadow when focused',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    hoverBoxShadow: {
      control: 'text',
      description: 'Box shadow on hover',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },

    // Transform & Scale
    scale: {
      control: 'text',
      description: 'Scale transformation',
      table: {
        category: 'Transform',
        type: { summary: 'string' },
      },
    },
    transform: {
      control: 'text',
      description: 'Custom CSS transform',
      table: {
        category: 'Transform',
        type: { summary: 'string' },
      },
    },
    opacity: {
      control: 'text',
      description: 'Opacity level',
      table: {
        category: 'Transform',
        type: { summary: 'string' },
      },
    },

    // Transitions
    transitionDuration: {
      control: 'text',
      description: 'Transition duration (e.g., "200ms")',
      table: {
        category: 'Transitions',
        type: { summary: 'string' },
      },
    },
    transitionProperty: {
      control: 'text',
      description: 'CSS properties to transition',
      table: {
        category: 'Transitions',
        type: { summary: 'string' },
      },
    },
    transitionTimingFunction: {
      control: 'select',
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
      description: 'Transition timing function',
      table: {
        category: 'Transitions',
        type: { summary: 'string' },
      },
    },

    // Event Handlers
    onClick: {
      control: false,
      description: 'Click event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onClose: {
      control: false,
      description: 'Close button click handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '() => void' },
      },
    },
    onIconClick: {
      control: false,
      description: 'Icon click handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '() => void' },
      },
    },
    onMouseEnter: {
      control: false,
      description: 'Mouse enter event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onMouseLeave: {
      control: false,
      description: 'Mouse leave event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Key down event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.KeyboardEvent) => void' },
      },
    },

    // Accessibility
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: 'text',
      description: 'ARIA described by reference',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'ARIA invalid state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-required': {
      control: 'boolean',
      description: 'ARIA required state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-live': {
      control: 'select',
      options: ['off', 'polite', 'assertive'],
      description: 'ARIA live region behavior',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    children: 'Default Badge',
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Badge (no props)</h3>
        <Badge>Basic Badge</Badge>
        <p className="text-xs text-gray-500 mt-2">All default styles applied</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Label</h3>
        <Badge label="Status">Badge with Label</Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Interactive Badge</h3>
        <Badge interactive onClick={() => console.log('clicked')}>
          Clickable Badge
        </Badge>
        <p className="text-xs text-gray-500 mt-2">Hover and click to see effects</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Helper Text</h3>
        <Badge helperText="Additional context information">Badge with Helper</Badge>
      </div>
    </div>
  ),
  args: {},
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="filled">Filled</Badge>
        <Badge variant="outlined">Outlined</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="gradient">Gradient</Badge>
        <Badge variant="glass">Glass</Badge>
        <Badge variant="neon">Neon</Badge>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">With Different Status</h3>

        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-2">Success Status</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" status="success">
              Default Success
            </Badge>
            <Badge variant="filled" status="success">
              Filled Success
            </Badge>
            <Badge variant="outlined" status="success">
              Outlined Success
            </Badge>
            <Badge variant="ghost" status="success">
              Ghost Success
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-2">Error Status</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" status="error">
              Default Error
            </Badge>
            <Badge variant="filled" status="error">
              Filled Error
            </Badge>
            <Badge variant="outlined" status="error">
              Outlined Error
            </Badge>
            <Badge variant="ghost" status="error">
              Ghost Error
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Badge size="xs">Extra Small</Badge>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
        <Badge size="xl">Extra Large</Badge>
        <Badge size="2xl">2X Large</Badge>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Same Content, Different Sizes</h3>
        <div className="space-y-3">
          <Badge size="xs" status="info">
            Notification
          </Badge>
          <Badge size="sm" status="info">
            Notification
          </Badge>
          <Badge size="md" status="info">
            Notification
          </Badge>
          <Badge size="lg" status="info">
            Notification
          </Badge>
          <Badge size="xl" status="info">
            Notification
          </Badge>
          <Badge size="2xl" status="info">
            Notification
          </Badge>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Badge status="default">Default</Badge>
        <Badge status="success">Success</Badge>
        <Badge status="warning">Warning</Badge>
        <Badge status="error">Error</Badge>
        <Badge status="info">Info</Badge>
        <Badge status="primary">Primary</Badge>
        <Badge status="secondary">Secondary</Badge>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Status with Context</h3>

        <div className="space-y-3">
          <Badge status="success" icon="✅">
            Completed
          </Badge>
          <Badge status="warning" icon="⚠️">
            Pending Review
          </Badge>
          <Badge status="error" icon="❌">
            Failed
          </Badge>
          <Badge status="info" icon="ℹ️">
            Information
          </Badge>
          <Badge status="primary" icon="⭐">
            Featured
          </Badge>
          <Badge status="secondary" icon="📄">
            Draft
          </Badge>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Normal State</h3>
        <Badge>Normal Badge</Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Interactive State</h3>
        <Badge interactive onClick={() => console.log('clicked')}>
          Interactive Badge
        </Badge>
        <p className="text-xs text-gray-500 mt-1">Hover and click to see effects</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled State</h3>
        <Badge disabled>Disabled Badge</Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading State</h3>
        <Badge loading>Loading Badge</Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required State</h3>
        <Badge required aria-required="true">
          Required Badge
        </Badge>
      </div>
    </div>
  ),
  args: {},
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Badge icon="🔔">Notification</Badge>
          <Badge icon="⭐">Favorite</Badge>
          <Badge icon="🏷️">Tag</Badge>
          <Badge icon="📊">Analytics</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Animated Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Badge icon="⚡" animated animation="pulse" status="warning">
            Live
          </Badge>
          <Badge icon="🔥" animated animation="bounce" status="error">
            Hot
          </Badge>
          <Badge icon="✨" animated animation="glow" status="primary">
            New
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Interactive Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Badge icon="❤️" interactive onIconClick={() => console.log('Icon clicked!')}>
            Like
          </Badge>
          <Badge icon="📋" interactive onIconClick={() => console.log('Copy clicked!')}>
            Copy
          </Badge>
        </div>
        <p className="text-xs text-gray-500 mt-1">Click on the icons</p>
      </div>
    </div>
  ),
  args: {},
}

export const WithCloseButton: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Closeable</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithState closeButton>Closeable Tag</BadgeWithState>
          <BadgeWithState closeButton status="success">
            Success Tag
          </BadgeWithState>
          <BadgeWithState closeButton status="warning">
            Warning Tag
          </BadgeWithState>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Icon and Close Button</h3>
        <div className="flex flex-wrap gap-3">
          <BadgeWithState icon="🏷️" closeButton onClose={() => console.log('Tag removed!')}>
            Removable Tag
          </BadgeWithState>
          <BadgeWithState icon="📂" closeButton status="info">
            Category
          </BadgeWithState>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const Animations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Animation Types</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animated animation="pulse" status="info">
            Pulse
          </Badge>
          <Badge animated animation="bounce" status="success">
            Bounce
          </Badge>
          <Badge animated animation="shake" status="warning">
            Shake
          </Badge>
          <Badge animated animation="glow" status="primary">
            Glow
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Duration</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animated animation="pulse" animationDuration={500} status="error">
            Fast (500ms)
          </Badge>
          <Badge animated animation="pulse" animationDuration={2000} status="info">
            Slow (2s)
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Limited Iterations</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animated animation="bounce" animationIterationCount={3} status="success">
            3 Bounces
          </Badge>
          <Badge animated animation="shake" animationIterationCount={1} status="warning">
            Shake Once
          </Badge>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Compound Usage</h3>
        <Badge>
          <Badge.Icon>🔔</Badge.Icon>
          <Badge.Label>Notification</Badge.Label>
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Helper Text</h3>
        <Badge>
          <Badge.Icon>📊</Badge.Icon>
          <Badge.Label>Analytics</Badge.Label>
          <Badge.HelperText>Real-time data</Badge.HelperText>
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Complex Compound</h3>
        <BadgeWithState>
          <Badge.Icon>⭐</Badge.Icon>
          <Badge.Label>Premium Feature</Badge.Label>
          <Badge.CloseButton />
          <Badge.HelperText>Available with Pro plan</Badge.HelperText>
        </BadgeWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Animated Compound</h3>
        <Badge animated animation="pulse" status="success">
          <Badge.Icon>✅</Badge.Icon>
          <Badge.Label>Live Status</Badge.Label>
        </Badge>
      </div>
    </div>
  ),
  args: {},
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <div className="flex flex-wrap gap-3">
          <Badge backgroundColor="#fbbf24" textColor="#92400e" borderColor="#f59e0b">
            Custom Yellow
          </Badge>
          <Badge backgroundColor="#a78bfa" textColor="white" borderColor="#8b5cf6">
            Custom Purple
          </Badge>
          <Badge backgroundColor="#34d399" textColor="#065f46" borderColor="#10b981">
            Custom Green
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Typography Customization</h3>
        <div className="flex flex-wrap gap-3">
          <Badge fontSize="18px" fontWeight="bold" letterSpacing="0.1em">
            Large Bold
          </Badge>
          <Badge fontSize="12px" fontFamily="monospace">
            Monospace
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Advanced Effects</h3>
        <div className="flex flex-wrap gap-3">
          <Badge
            backgroundColor="linear-gradient(45deg, #6366f1, #8b5cf6)"
            textColor="white"
            borderRadius="20px"
            padding="8px 16px"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            Gradient Badge
          </Badge>
          <Badge
            backgroundColor="rgba(255, 255, 255, 0.8)"
            borderColor="#e5e7eb"
            borderWidth="2px"
            borderStyle="dashed"
            textColor="#374151"
          >
            Dashed Border
          </Badge>
          <Badge
            interactive
            hoverScale="1.1"
            hoverBackgroundColor="#3b82f6"
            hoverTextColor="white"
            transitionDuration="300ms"
          >
            Hover Transform
          </Badge>
        </div>
      </div>
    </div>
  ),
  args: {},
}

export const RealWorldTagManagement: Story = {
  render: () => {
    const TagManagementExample = () => {
      const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Storybook'])
      const [newTag, setNewTag] = useState('')

      const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
          setTags([...tags, newTag.trim()])
          setNewTag('')
        }
      }

      const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
      }

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Project Tags</h3>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={tag}
                variant="outlined"
                status={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'success' : 'info'}
                closeButton
                onClose={() => removeTag(tag)}
                interactive
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add new tag..."
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>

          <div className="text-sm text-gray-600">Total tags: {tags.length}</div>
        </div>
      )
    }

    return <TagManagementExample />
  },
  args: {},
}

export const RealWorldNotifications: Story = {
  render: () => {
    const NotificationSystemExample = () => {
      const [notifications, setNotifications] = useState([
        { id: 1, type: 'success', message: 'File uploaded successfully', time: '2 min ago' },
        { id: 2, type: 'warning', message: 'Storage almost full', time: '5 min ago' },
        { id: 3, type: 'info', message: 'New feature available', time: '1 hour ago' },
        { id: 4, type: 'error', message: 'Sync failed', time: '2 hours ago' },
      ])

      const addNotification = () => {
        const types = ['success', 'warning', 'info', 'error']
        const messages = [
          'New message received',
          'Update available',
          'Backup completed',
          'Connection restored',
        ]

        const newNotification = {
          id: Date.now(),
          type: types[Math.floor(Math.random() * types.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          time: 'Just now',
        }

        setNotifications([newNotification, ...notifications])
      }

      const removeNotification = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id))
      }

      return (
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Notifications</h3>
            <button
              onClick={addNotification}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Notification
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge
                      size="sm"
                      status={notification.type as 'success' | 'warning' | 'info' | 'error'}
                      closeButton
                      onClose={() => removeNotification(notification.id)}
                      className="mb-2"
                    >
                      {notification.type}
                    </Badge>
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">No notifications</div>
          )}
        </div>
      )
    }

    return <NotificationSystemExample />
  },
  args: {},
}

export const RealWorldStatusDashboard: Story = {
  render: () => {
    const StatusDashboardExample = () => {
      const services = [
        { name: 'API Gateway', status: 'success', uptime: '99.9%' },
        { name: 'Database', status: 'success', uptime: '99.8%' },
        { name: 'File Storage', status: 'warning', uptime: '97.2%' },
        { name: 'CDN', status: 'success', uptime: '99.9%' },
        { name: 'Email Service', status: 'error', uptime: '85.1%' },
        { name: 'Analytics', status: 'info', uptime: 'Maintenance' },
      ]

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">System Status Dashboard</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                  </div>
                  <Badge
                    status={service.status as 'success' | 'warning' | 'error' | 'info'}
                    animated={service.status === 'error'}
                    animation={service.status === 'error' ? 'pulse' : undefined}
                  >
                    {service.status === 'success'
                      ? 'Operational'
                      : service.status === 'warning'
                        ? 'Degraded'
                        : service.status === 'error'
                          ? 'Down'
                          : 'Maintenance'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Badge variant="ghost" status="success">
              {services.filter((s) => s.status === 'success').length} Operational
            </Badge>
            <Badge variant="ghost" status="warning">
              {services.filter((s) => s.status === 'warning').length} Degraded
            </Badge>
            <Badge variant="ghost" status="error">
              {services.filter((s) => s.status === 'error').length} Down
            </Badge>
          </div>
        </div>
      )
    }

    return <StatusDashboardExample />
  },
  args: {},
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All badges support keyboard navigation and screen readers. Interactive badges can be
          activated with Enter or Space.
        </p>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">ARIA Labels</h4>
          <div className="flex flex-wrap gap-3">
            <Badge aria-label="High priority notification badge" status="error" interactive>
              High Priority
            </Badge>
            <Badge aria-label="User status: currently online" status="success" icon="🟢">
              Online
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Keyboard Navigation</h4>
          <div className="flex flex-wrap gap-3">
            <Badge
              interactive
              onClick={() => console.log('Badge activated')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  console.log('Badge activated via keyboard')
                }
              }}
            >
              Press Enter/Space
            </Badge>
            <BadgeWithState closeButton aria-label="Dismissible notification badge">
              Tab + Enter to close
            </BadgeWithState>
          </div>
          <p className="text-xs text-gray-500 mt-1">Try tabbing to these badges</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Live Regions</h4>
          <Badge
            animated
            animation="pulse"
            status="warning"
            aria-live="polite"
            aria-label="Live status update"
          >
            Live Status
          </Badge>
          <p className="text-xs text-gray-500 mt-1">Screen readers will announce changes</p>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Accessibility features:</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• All interactive badges are keyboard accessible</li>
            <li>• Proper ARIA attributes for screen readers</li>
            <li>• Focus indicators for keyboard navigation</li>
            <li>• Color is not the only indicator of status</li>
            <li>• Live regions for dynamic content</li>
            <li>• Sufficient color contrast ratios</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {},
}
