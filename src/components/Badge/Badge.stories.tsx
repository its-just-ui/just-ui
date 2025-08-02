import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

/**
 * Badge is a versatile component for displaying status, labels, notifications, and interactive elements with extensive customization options.
 * 
 * ## Features
 * - **Multiple Variants**: 8 visual styles from subtle to eye-catching designs
 * - **Flexible Sizing**: 6 size options from extra small to extra extra large
 * - **Status States**: Built-in semantic status colors for different contexts
 * - **Interactive Elements**: Support for icons, close buttons, and click handlers
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use Badge.Icon, Badge.CloseButton, Badge.Label, and Badge.HelperText for full control
 * - **Extensive Styling**: Over 60 style props for complete visual customization
 * - **Smooth Animations**: Multiple animation effects with customizable timing
 * - **Accessibility First**: Full ARIA support and keyboard navigation
 * 
 * ## Usage
 * 
 * ### Basic Usage:
 * ```tsx
 * <Badge>Default Badge</Badge>
 * <Badge variant="filled" size="lg">Filled Badge</Badge>
 * <Badge status="success">Success</Badge>
 * ```
 * 
 * ### Interactive Badges:
 * ```tsx
 * <Badge 
 *   icon="⭐" 
 *   closeButton 
 *   onClose={() => console.log('closed')}
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
 *   <Badge.HelperText>Helper</Badge.HelperText>
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
 * >
 *   Custom Styled Badge
 * </Badge>
 * ```
 */

// Wrapper component for controlled state
const BadgeWithState = ({ 
  children, 
  closeButton = false, 
  onClose,
  ...props 
}: any) => {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }
  
  if (!isVisible) return null
  
  return (
    <Badge 
      {...props} 
      closeButton={closeButton}
      onClose={handleClose}
    >
      {children}
    </Badge>
  )
}

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component for displaying status, labels, and notifications with extensive customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'solid', 'gradient', 'glass', 'neon'],
      description: 'The visual style variant of the badge',
      table: {
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'primary', 'secondary'],
      description: 'The status/state of the badge for semantic meaning',
      table: {
        type: { summary: 'BadgeStatus' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the badge is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the badge is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the badge is required (shows red ring)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is interactive (clickable)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Whether to enable animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    animation: {
      control: 'select',
      options: ['none', 'pulse', 'bounce', 'shake', 'glow', 'fade', 'slide'],
      description: 'Animation type to apply',
      table: {
        type: { summary: 'BadgeAnimation' },
        defaultValue: { summary: 'none' },
      },
    },
    
    // Content Props
    label: {
      control: 'text',
      description: 'The label text for the badge',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed next to the badge',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Icon element to display in the badge',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show a close button',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    
    // Loading Props
    loadingSpinner: {
      control: false,
      description: 'Custom loading spinner element',
      table: {
        category: 'Loading',
        type: { summary: 'React.ReactNode' },
      },
    },
    
    // Container Styles
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    style: {
      control: false,
      description: 'Inline styles',
      table: {
        category: 'Container Styles',
        type: { summary: 'React.CSSProperties' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    
    // Border Styles
    borderWidth: {
      control: 'text',
      description: 'Border width',
      table: {
        category: 'Border Styles',
        type: { summary: 'string | number' },
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
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
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
        type: { summary: 'string | number' },
      },
    },
    
    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size',
      table: {
        category: 'Typography',
        type: { summary: 'string | number' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight',
      table: {
        category: 'Typography',
        type: { summary: 'string | number' },
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
    letterSpacing: {
      control: 'text',
      description: 'Letter spacing',
      table: {
        category: 'Typography',
        type: { summary: 'string | number' },
      },
    },
    lineHeight: {
      control: 'text',
      description: 'Line height',
      table: {
        category: 'Typography',
        type: { summary: 'string | number' },
      },
    },
    
    // Color System
    color: {
      control: 'color',
      description: 'General color (falls back to text color)',
      table: {
        category: 'Color System',
        type: { summary: 'string' },
      },
    },
    hoverBackgroundColor: {
      control: 'color',
      description: 'Background color on hover',
      table: {
        category: 'Color System',
        type: { summary: 'string' },
      },
    },
    hoverTextColor: {
      control: 'color',
      description: 'Text color on hover',
      table: {
        category: 'Color System',
        type: { summary: 'string' },
      },
    },
    
    // Focus Styles
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
        type: { summary: 'string | number' },
      },
    },
    focusRingOffset: {
      control: 'text',
      description: 'Focus ring offset',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string | number' },
      },
    },
    focusBorderColor: {
      control: 'color',
      description: 'Focus border color',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    
    // Shadow Effects
    boxShadow: {
      control: 'text',
      description: 'Box shadow',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    focusBoxShadow: {
      control: 'text',
      description: 'Focus box shadow',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    hoverBoxShadow: {
      control: 'text',
      description: 'Hover box shadow',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    
    // Spacing
    padding: {
      control: 'text',
      description: 'Padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    paddingX: {
      control: 'text',
      description: 'Horizontal padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    paddingY: {
      control: 'text',
      description: 'Vertical padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    marginX: {
      control: 'text',
      description: 'Horizontal margin',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    marginY: {
      control: 'text',
      description: 'Vertical margin',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    
    // Transforms & Animation
    transform: {
      control: 'text',
      description: 'CSS transform property',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'string' },
      },
    },
    hoverTransform: {
      control: 'text',
      description: 'Transform on hover',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'string' },
      },
    },
    scale: {
      control: 'number',
      description: 'Scale factor',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'number' },
      },
    },
    hoverScale: {
      control: 'number',
      description: 'Scale factor on hover',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'number' },
      },
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'number' },
      },
    },
    hoverOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity on hover',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'number' },
      },
    },
    animationDuration: {
      control: 'text',
      description: 'Animation duration',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'string' },
        defaultValue: { summary: '1s' },
      },
    },
    animationDelay: {
      control: 'text',
      description: 'Animation delay',
      table: {
        category: 'Transform & Animation',
        type: { summary: 'string' },
      },
    },
    
    // Transitions
    transitionDuration: {
      control: 'text',
      description: 'Transition duration',
      table: {
        category: 'Transitions',
        type: { summary: 'string' },
        defaultValue: { summary: '150ms' },
      },
    },
    transitionProperty: {
      control: 'text',
      description: 'Transition property',
      table: {
        category: 'Transitions',
        type: { summary: 'string' },
        defaultValue: { summary: 'all' },
      },
    },
    transitionTimingFunction: {
      control: 'text',
      description: 'Transition timing function',
      table: {
        category: 'Transitions',
        type: { summary: 'string' },
        defaultValue: { summary: 'ease-in-out' },
      },
    },
    
    // Accessibility
    'aria-label': {
      control: 'text',
      description: 'ARIA label',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: 'text',
      description: 'ARIA describedby',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'ARIA invalid',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-required': {
      control: 'boolean',
      description: 'ARIA required',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-pressed': {
      control: 'boolean',
      description: 'ARIA pressed state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-expanded': {
      control: 'boolean',
      description: 'ARIA expanded state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-live': {
      control: 'select',
      options: ['off', 'polite', 'assertive'],
      description: 'ARIA live region',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    
    // Event Handlers
    onClick: {
      control: false,
      description: 'Click handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent<HTMLDivElement>) => void' },
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
      description: 'Mouse enter handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent<HTMLDivElement>) => void' },
      },
    },
    onMouseLeave: {
      control: false,
      description: 'Mouse leave handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent<HTMLDivElement>) => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent<HTMLDivElement>) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent<HTMLDivElement>) => void' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Key down handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.KeyboardEvent<HTMLDivElement>) => void' },
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC USAGE STORIES
// ============================================================================

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
}

export const ShowingDefaults: Story = {
  args: {
    children: 'Default Badge',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default Badge (no props)</h3>
        <Badge>Default Badge</Badge>
        <p className="text-xs text-gray-500 mt-2">All default styles and behaviors applied</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Label</h3>
        <Badge label="Badge Label">Content</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Helper Text</h3>
        <Badge helperText="Helper text">Badge with helper</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Interactive Badge</h3>
        <Badge interactive onClick={() => alert('Badge clicked!')}>
          Click me
        </Badge>
      </div>
    </div>
  ),
}

// ============================================================================
// VISUAL VARIATIONS
// ============================================================================

export const Variants: Story = {
  args: {
    children: 'Default Badge',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
        <Badge variant="default">Default</Badge>
        <p className="text-xs text-gray-500 mt-1">Subtle background with border</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filled</h3>
        <Badge variant="filled">Filled</Badge>
        <p className="text-xs text-gray-500 mt-1">Solid background with high contrast</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Outlined</h3>
        <Badge variant="outlined">Outlined</Badge>
        <p className="text-xs text-gray-500 mt-1">Transparent background with colored border</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Ghost</h3>
        <Badge variant="ghost">Ghost</Badge>
        <p className="text-xs text-gray-500 mt-1">Minimal styling with hover effects</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Solid</h3>
        <Badge variant="solid">Solid</Badge>
        <p className="text-xs text-gray-500 mt-1">High contrast with solid colors</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Gradient</h3>
        <Badge variant="gradient">Gradient</Badge>
        <p className="text-xs text-gray-500 mt-1">Beautiful gradient background</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Glass</h3>
        <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded">
          <Badge variant="glass">Glass</Badge>
        </div>
        <p className="text-xs text-gray-500 mt-1">Glassmorphism effect with backdrop blur</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Neon</h3>
        <div className="p-4 bg-black rounded">
          <Badge variant="neon">Neon</Badge>
        </div>
        <p className="text-xs text-gray-500 mt-1">Cyberpunk neon glow effect</p>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  args: {
    children: 'Default Badge',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Extra Small</h3>
        <Badge size="xs">Extra Small</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
        <Badge size="sm">Small</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Medium (Default)</h3>
        <Badge size="md">Medium</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
        <Badge size="lg">Large</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Extra Large</h3>
        <Badge size="xl">Extra Large</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Extra Extra Large</h3>
        <Badge size="2xl">Extra Extra Large</Badge>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default Status</h3>
        <Badge status="default">Default</Badge>
        <p className="text-xs text-gray-500 mt-1">Neutral gray styling</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Success Status</h3>
        <Badge status="success">Success</Badge>
        <p className="text-xs text-gray-500 mt-1">Green styling for positive states</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Warning Status</h3>
        <Badge status="warning">Warning</Badge>
        <p className="text-xs text-gray-500 mt-1">Yellow styling for caution states</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Error Status</h3>
        <Badge status="error">Error</Badge>
        <p className="text-xs text-gray-500 mt-1">Red styling for error states</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Info Status</h3>
        <Badge status="info">Info</Badge>
        <p className="text-xs text-gray-500 mt-1">Blue styling for informational states</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Primary Status</h3>
        <Badge status="primary">Primary</Badge>
        <p className="text-xs text-gray-500 mt-1">Primary brand color</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Secondary Status</h3>
        <Badge status="secondary">Secondary</Badge>
        <p className="text-xs text-gray-500 mt-1">Secondary brand color</p>
      </div>
    </div>
  ),
}

// ============================================================================
// INTERACTIVE STATES
// ============================================================================

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Normal State</h3>
        <Badge>Normal</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Interactive (Clickable)</h3>
        <Badge interactive onClick={() => alert('Badge clicked!')}>
          Click me
        </Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Disabled State</h3>
        <Badge disabled>Disabled</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Loading State</h3>
        <Badge loading>Loading</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Required State</h3>
        <Badge required>Required</Badge>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Basic Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Badge icon="⭐">Star</Badge>
          <Badge icon="🔔">Notification</Badge>
          <Badge icon="✓">Success</Badge>
          <Badge icon="⚠️">Warning</Badge>
          <Badge icon="❌">Error</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Animated Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Badge icon="🔄" animated>Rotating</Badge>
          <Badge icon="💫" animated animation="pulse">Pulsing</Badge>
          <Badge icon="⚡" animated animation="bounce">Bouncing</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Interactive Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Badge 
            icon="👍" 
            interactive
            onIconClick={() => alert('Icon clicked!')}
          >
            Like
          </Badge>
          <Badge 
            icon="❤️" 
            interactive
            onIconClick={() => alert('Heart clicked!')}
          >
            Love
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Basic Close Button</h3>
        <div className="flex flex-wrap gap-4">
          <BadgeWithState closeButton>Closable Badge</BadgeWithState>
          <BadgeWithState closeButton variant="filled">Filled Closable</BadgeWithState>
          <BadgeWithState closeButton status="success">Success Closable</BadgeWithState>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Icon and Close</h3>
        <div className="flex flex-wrap gap-4">
          <BadgeWithState closeButton icon="📧">Email</BadgeWithState>
          <BadgeWithState closeButton icon="🏷️" variant="outlined">Tag</BadgeWithState>
        </div>
      </div>
    </div>
  ),
}

// ============================================================================
// ANIMATIONS
// ============================================================================

export const Animations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Pulse Animation</h3>
        <Badge animated animation="pulse">Pulsing Badge</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Bounce Animation</h3>
        <Badge animated animation="bounce">Bouncing Badge</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Shake Animation</h3>
        <Badge animated animation="shake" status="error">Error Shake</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Glow Animation</h3>
        <Badge animated animation="glow" variant="neon">Glowing Badge</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Duration</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animated animation="pulse" animationDuration="0.5s">Fast</Badge>
          <Badge animated animation="pulse" animationDuration="2s">Slow</Badge>
        </div>
      </div>
    </div>
  ),
}

// ============================================================================
// COMPOUND COMPONENTS
// ============================================================================

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Basic Compound Usage</h3>
        <div className="flex flex-wrap gap-4">
          <Badge>
            <Badge.Icon>⭐</Badge.Icon>
            <Badge.Label>Star</Badge.Label>
          </Badge>
          
          <Badge>
            <Badge.Icon>🔔</Badge.Icon>
            <Badge.Label>Notification</Badge.Label>
            <Badge.CloseButton />
          </Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Helper Text</h3>
        <Badge>
          <Badge.Label>Custom Badge</Badge.Label>
          <Badge.HelperText>Helper</Badge.HelperText>
        </Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Complex Compound</h3>
        <Badge variant="outlined">
          <Badge.Icon>💼</Badge.Icon>
          <Badge.Label>Project Status</Badge.Label>
          <Badge.HelperText>Active</Badge.HelperText>
          <Badge.CloseButton />
        </Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Animated Compound</h3>
        <Badge animated variant="gradient">
          <Badge.Icon animated>🚀</Badge.Icon>
          <Badge.Label>Launch</Badge.Label>
          <Badge.CloseButton animated />
        </Badge>
      </div>
    </div>
  ),
}

// ============================================================================
// CUSTOM STYLING
// ============================================================================

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Colors</h3>
        <div className="flex flex-wrap gap-4">
          <Badge
            backgroundColor="#6366f1"
            textColor="white"
            borderRadius="20px"
            padding="8px 16px"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            Custom Styled
          </Badge>
          
          <Badge
            borderColor="#f59e0b"
            borderWidth="2px"
            borderStyle="dashed"
            textColor="#f59e0b"
            backgroundColor="transparent"
          >
            Dashed Border
          </Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Typography Customization</h3>
        <div className="flex flex-wrap gap-4">
          <Badge
            fontSize="18px"
            fontWeight="700"
            letterSpacing="0.05em"
            textColor="#1f2937"
          >
            Bold Typography
          </Badge>
          
          <Badge
            fontFamily="monospace"
            fontSize="12px"
            backgroundColor="#f3f4f6"
            textColor="#374151"
            padding="4px 8px"
          >
            Code Badge
          </Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Advanced Effects</h3>
        <div className="flex flex-wrap gap-4">
          <Badge
            backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            textColor="white"
            borderRadius="50px"
            padding="12px 24px"
            boxShadow="0 10px 20px rgba(0, 0, 0, 0.2)"
            transform="rotate(-2deg)"
          >
            Gradient Tilted
          </Badge>
          
          <Badge
            backgroundColor="#000"
            textColor="#00ff41"
            borderColor="#00ff41"
            borderWidth="1px"
            fontFamily="monospace"
            boxShadow="0 0 10px #00ff41"
          >
            Matrix Style
          </Badge>
        </div>
      </div>
    </div>
  ),
}

// ============================================================================
// REAL-WORLD EXAMPLES
// ============================================================================

const TagManagementExample = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['React', 'TypeScript'])
  const availableTags = ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python', 'Docker']
  
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }
  
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Selected Technologies:</label>
        <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-lg bg-gray-50">
          {selectedTags.length === 0 ? (
            <span className="text-gray-500 text-sm">No technologies selected</span>
          ) : (
            selectedTags.map(tag => (
              <BadgeWithState
                key={tag}
                variant="filled"
                status="primary"
                closeButton
                onClose={() => removeTag(tag)}
              >
                {tag}
              </BadgeWithState>
            ))
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-3">Available Technologies:</label>
        <div className="flex flex-wrap gap-2">
          {availableTags
            .filter(tag => !selectedTags.includes(tag))
            .map(tag => (
              <Badge
                key={tag}
                variant="outlined"
                interactive
                onClick={() => addTag(tag)}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                + {tag}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )
}

export const RealWorldTagManagement: Story = {
  render: () => <TagManagementExample />,
}

const NotificationSystemExample = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'System update available', icon: 'ℹ️', timestamp: '2 min ago' },
    { id: 2, type: 'warning', message: 'Storage space low', icon: '⚠️', timestamp: '5 min ago' },
    { id: 3, type: 'error', message: 'Connection failed', icon: '❌', timestamp: '10 min ago' },
    { id: 4, type: 'success', message: 'Backup completed', icon: '✓', timestamp: '15 min ago' },
  ])
  
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }
  
  const getStatus = (type: string) => {
    switch (type) {
      case 'info': return 'info' as const
      case 'warning': return 'warning' as const
      case 'error': return 'error' as const
      case 'success': return 'success' as const
      default: return 'default' as const
    }
  }
  
  return (
    <div className="max-w-md space-y-3">
      <h3 className="font-semibold text-gray-800 mb-4">Notifications</h3>
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Badge variant="ghost" size="lg">No notifications</Badge>
        </div>
      ) : (
        notifications.map(notification => (
          <div key={notification.id} className="flex items-center justify-between">
            <BadgeWithState
              status={getStatus(notification.type)}
              icon={notification.icon}
              closeButton
              onClose={() => dismissNotification(notification.id)}
              className="flex-1 mr-2"
              style={{ 
                justifyContent: 'space-between',
                minWidth: '250px'
              }}
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{notification.message}</span>
                <span className="text-xs opacity-75">{notification.timestamp}</span>
              </div>
            </BadgeWithState>
          </div>
        ))
      )}
    </div>
  )
}

export const RealWorldNotifications: Story = {
  render: () => <NotificationSystemExample />,
}

const StatusDashboardExample = () => {
  const services = [
    { name: 'API Gateway', status: 'success', uptime: '99.9%' },
    { name: 'Database', status: 'success', uptime: '100%' },
    { name: 'Cache Layer', status: 'warning', uptime: '98.5%' },
    { name: 'File Storage', status: 'error', uptime: '95.2%' },
    { name: 'Analytics', status: 'info', uptime: '99.1%' },
  ]
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Operational'
      case 'warning': return 'Degraded'
      case 'error': return 'Down'
      case 'info': return 'Maintenance'
      default: return 'Unknown'
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      case 'info': return 'ℹ️'
      default: return '❓'
    }
  }
  
  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-bold mb-6">Service Status Dashboard</h3>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center space-x-4">
              <h4 className="font-medium text-gray-900">{service.name}</h4>
              <Badge
                status={service.status as any}
                icon={getStatusIcon(service.status)}
                variant="filled"
                size="sm"
              >
                {getStatusText(service.status)}
              </Badge>
            </div>
            <div className="text-right">
              <Badge variant="ghost" size="sm">
                {service.uptime} uptime
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const RealWorldStatusDashboard: Story = {
  render: () => <StatusDashboardExample />,
}

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">ARIA Labels</h3>
        <div className="flex flex-wrap gap-4">
          <Badge
            aria-label="Success notification badge"
            aria-describedby="success-description"
            status="success"
          >
            Success
          </Badge>
          
          <Badge
            status="error"
            aria-label="Error notification badge"
            aria-describedby="error-description"
            aria-invalid={true}
          >
            Error
          </Badge>
          
          <Badge
            required
            aria-required={true}
            aria-label="Required field badge"
          >
            Required
          </Badge>
        </div>
        
        <div className="mt-4 text-xs text-gray-600">
          <div id="success-description">This indicates a successful operation</div>
          <div id="error-description">This indicates an error that needs attention</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Keyboard Navigation</h3>
        <div className="flex flex-wrap gap-4">
          <Badge
            interactive
            onClick={() => alert('Badge activated!')}
            aria-label="Press Enter or Space to activate"
          >
            Keyboard Accessible
          </Badge>
          
          <Badge
            closeButton
            aria-label="Dismissible notification"
          >
            Tab to close button
          </Badge>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Use Tab to navigate, Enter/Space to activate, and Escape to close
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Live Regions</h3>
        <div className="flex flex-wrap gap-4">
          <Badge
            status="info"
            aria-live="polite"
            aria-label="Status update"
          >
            Polite Announcement
          </Badge>
          
          <Badge
            status="error"
            aria-live="assertive"
            aria-label="Critical alert"
          >
            Assertive Alert
          </Badge>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Screen readers will announce changes to these badges
        </p>
      </div>
    </div>
  ),
}