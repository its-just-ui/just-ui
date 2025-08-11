import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from './Button'
import LivePlayground from '../../../.storybook/components/LivePlayground'

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitMessage('Form submitted successfully!')

    // Clear message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '' })
    setSubmitMessage('')
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Form Integration Example</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="filled"
            status="primary"
            loading={isSubmitting}
            loadingText="Submitting..."
            disabled={!formData.name || !formData.email}
            className="flex-1"
          >
            Submit Form
          </Button>
          <Button
            type="button"
            variant="outlined"
            status="secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </div>

        {submitMessage && (
          <div className="mt-3 p-2 bg-green-100 text-green-700 rounded-md text-sm">
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  )
}

// Real World Examples Component
const RealWorldExamplesComponent = () => {
  const [likes, setLikes] = useState(42)
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="space-y-8 max-w-md mx-auto">
      {/* Social Media Post */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <div>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <Button
            variant={isFollowing ? 'outlined' : 'filled'}
            status="primary"
            size="sm"
            onClick={handleFollow}
            className="ml-auto"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>

        <p className="text-gray-700 mb-4">
          Just shipped a new feature! 🚀 Really excited to see how our users will use it.
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={isLiked ? 'filled' : 'ghost'}
            status={isLiked ? 'error' : 'default'}
            size="sm"
            onClick={handleLike}
            icon={<span>{isLiked ? '❤️' : '🤍'}</span>}
          >
            {likes}
          </Button>

          <Button variant="ghost" size="sm" icon={<span>💬</span>}>
            12
          </Button>

          <Button variant="ghost" size="sm" icon={<span>🔗</span>}>
            Share
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <h4 className="font-semibold">Common Actions</h4>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="filled" status="success" size="sm">
            <Button.Icon>✅</Button.Icon>
            <Button.Label>Approve</Button.Label>
          </Button>

          <Button variant="filled" status="error" size="sm">
            <Button.Icon>❌</Button.Icon>
            <Button.Label>Reject</Button.Label>
          </Button>

          <Button variant="outlined" status="warning" size="sm">
            <Button.Icon>⚠️</Button.Icon>
            <Button.Label>Warning</Button.Label>
          </Button>

          <Button variant="outlined" status="info" size="sm">
            <Button.Icon>ℹ️</Button.Icon>
            <Button.Label>Info</Button.Label>
          </Button>
        </div>
      </div>

      {/* Loading States */}
      <div className="space-y-3">
        <h4 className="font-semibold">Loading States</h4>

        <div className="space-y-2">
          <Button variant="filled" status="primary" loading size="sm" className="w-full">
            Processing Payment...
          </Button>
          <Button
            variant="outlined"
            status="secondary"
            loading
            loadingText="Saving..."
            size="sm"
            className="w-full"
          >
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  )
}

// Wrapper component for controlled state
const ButtonWithState = ({
  children,
  onClick,
  ...props
}: ButtonProps & { onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const [clickCount, setClickCount] = useState(0)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount((prev) => prev + 1)
    onClick?.(event)
  }

  return (
    <div className="space-y-4">
      <Button {...props} onClick={handleClick}>
        {children}
      </Button>
      <div className="text-sm text-gray-600">Clicked {clickCount} times</div>
    </div>
  )
}

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button is a comprehensive interactive component for user actions with extensive customization options.

## Features
- **Multiple Variants**: 9 visual styles from basic to eye-catching designs (default, filled, outlined, ghost, solid, gradient, glass, neon, link)
- **Flexible Sizing**: 6 size options from extra small to extra extra large (xs, sm, md, lg, xl, 2xl)
- **Status States**: Built-in semantic status colors for different contexts (default, success, warning, error, info, primary, secondary)
- **Interactive Elements**: Support for icons, loading states, and various click handlers with hover effects
- **Loading & Disabled States**: Handle async operations and disabled states gracefully
- **Compound Components**: Use Button.Icon, Button.Label, and Button.Spinner for full control
- **Extensive Styling**: Over 80 style props for complete visual customization
- **Smooth Animations**: Multiple animation effects (pulse, bounce, shake, glow) with customizable timing
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Form Integration**: Works seamlessly in forms with different button types

## Usage

### Basic Usage:
\`\`\`tsx
<Button>Click me</Button>
<Button variant="filled" size="lg" status="success">Success Button</Button>
\`\`\`

### Interactive Buttons:
\`\`\`tsx
<Button
  variant="gradient"
  icon="⭐"
  loading={isLoading}
  onClick={() => console.log('clicked')}
>
  Interactive Button
</Button>
\`\`\`

### Compound Component Usage:
\`\`\`tsx
<Button>
  <Button.Icon>🔔</Button.Icon>
  <Button.Label>Notification</Button.Label>
  <Button.Spinner />
</Button>
\`\`\`

### Custom Styling:
\`\`\`tsx
<Button
  backgroundColor="#6366f1"
  textColor="white"
  borderRadius="20px"
  padding="8px 16px"
  boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  hoverScale="1.05"
>
  Custom Styled Button
</Button>
\`\`\`

### Form Integration:
\`\`\`tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="filled" status="primary">
    Submit Form
  </Button>
  <Button type="reset" variant="outlined">
    Reset
  </Button>
</form>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core props
    variant: {
      control: 'select',
      options: [
        'default',
        'filled',
        'outlined',
        'ghost',
        'solid',
        'gradient',
        'glass',
        'neon',
        'link',
      ],
      description: 'Visual variant of the button',
      defaultValue: 'default',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the button',
      defaultValue: 'md',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'primary', 'secondary'],
      description: 'Status/semantic color of the button',
      defaultValue: 'default',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      defaultValue: false,
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      defaultValue: false,
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
      defaultValue: false,
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive hover/active effects',
      defaultValue: true,
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable CSS animations',
      defaultValue: false,
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
      },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'bounce', 'shake', 'glow'],
      description: 'Type of animation to apply',
      defaultValue: 'pulse',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'colors', 'transform', 'glow', 'slide', 'bounce'],
      description: 'Transition effect type',
      defaultValue: 'colors',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },
    transitionDuration: {
      control: 'text',
      description: 'Duration of transitions',
      defaultValue: '150ms',
      table: {
        category: 'Core',
        type: { summary: 'string' },
      },
    },

    // Content props
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Text label for the button',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the button',
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
        type: { summary: 'ReactNode' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
      defaultValue: 'left',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Text to show during loading',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    loadingSpinner: {
      control: false,
      description: 'Custom loading spinner element',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    // Form props
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      defaultValue: 'button',
      table: {
        category: 'Form',
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Form value',
      table: {
        category: 'Form',
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Form field name',
      table: {
        category: 'Form',
        type: { summary: 'string' },
      },
    },
    form: {
      control: 'text',
      description: 'Associated form ID',
      table: {
        category: 'Form',
        type: { summary: 'string' },
      },
    },

    // Border styling
    borderWidth: {
      control: 'text',
      description: 'Border width (e.g., "2px", 2)',
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
      description: 'Border radius (e.g., "8px", 8)',
      table: {
        category: 'Border Styles',
        type: { summary: 'string | number' },
      },
    },

    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size (e.g., "16px", 16)',
      table: {
        category: 'Typography',
        type: { summary: 'string | number' },
      },
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
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
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
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
    color: {
      control: 'color',
      description: 'Text color (alias for textColor)',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    hoverBackgroundColor: {
      control: 'color',
      description: 'Background color on hover',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    hoverTextColor: {
      control: 'color',
      description: 'Text color on hover',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    activeBackgroundColor: {
      control: 'color',
      description: 'Background color when active',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    activeTextColor: {
      control: 'color',
      description: 'Text color when active',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },

    // Transform and hover effects
    scale: {
      control: 'text',
      description: 'Scale transformation',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    hoverScale: {
      control: 'text',
      description: 'Scale transformation on hover',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    activeScale: {
      control: 'text',
      description: 'Scale transformation when active',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    opacity: {
      control: 'text',
      description: 'Opacity level',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    hoverOpacity: {
      control: 'text',
      description: 'Opacity on hover',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    activeOpacity: {
      control: 'text',
      description: 'Opacity when active',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    transform: {
      control: 'text',
      description: 'CSS transform property',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    hoverTransform: {
      control: 'text',
      description: 'Transform on hover',
      table: {
        category: 'Transform & Effects',
        type: { summary: 'string' },
      },
    },
    activeTransform: {
      control: 'text',
      description: 'Transform when active',
      table: {
        category: 'Transform & Effects',
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
      description: 'Border color when focused',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusBackgroundColor: {
      control: 'color',
      description: 'Background color when focused',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusTextColor: {
      control: 'color',
      description: 'Text color when focused',
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
      description: 'Box shadow when focused',
      table: {
        category: 'Shadows',
        type: { summary: 'string' },
      },
    },
    hoverBoxShadow: {
      control: 'text',
      description: 'Box shadow on hover',
      table: {
        category: 'Shadows',
        type: { summary: 'string' },
      },
    },
    activeBoxShadow: {
      control: 'text',
      description: 'Box shadow when active',
      table: {
        category: 'Shadows',
        type: { summary: 'string' },
      },
    },

    // Spacing
    padding: {
      control: 'text',
      description: 'Padding (e.g., "16px", 16)',
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
      description: 'Margin (e.g., "8px", 8)',
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

    // Layout
    width: {
      control: 'text',
      description: 'Width (e.g., "200px", 200, "100%")',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: 'Height (e.g., "40px", 40)',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    flex: {
      control: 'text',
      description: 'CSS flex property',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    flexGrow: {
      control: 'text',
      description: 'CSS flex-grow property',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    flexShrink: {
      control: 'text',
      description: 'CSS flex-shrink property',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },
    justifyContent: {
      control: 'select',
      options: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'CSS justify-content property',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'CSS align-items property',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
      },
    },
    gap: {
      control: 'text',
      description: 'CSS gap property',
      table: {
        category: 'Layout',
        type: { summary: 'string | number' },
      },
    },

    // Display
    display: {
      control: 'select',
      options: ['inline-flex', 'flex', 'inline-block', 'block', 'none'],
      description: 'CSS display property',
      table: {
        category: 'Display',
        type: { summary: 'string' },
      },
    },
    position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'CSS position property',
      table: {
        category: 'Display',
        type: { summary: 'string' },
      },
    },
    zIndex: {
      control: 'text',
      description: 'CSS z-index property',
      table: {
        category: 'Display',
        type: { summary: 'string | number' },
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
    'aria-labelledby': {
      control: 'text',
      description: 'ARIA labelledby',
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
    'aria-required': {
      control: 'boolean',
      description: 'ARIA required state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-disabled': {
      control: 'boolean',
      description: 'ARIA disabled state',
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
    'aria-haspopup': {
      control: 'boolean',
      description: 'ARIA haspopup state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    role: {
      control: 'text',
      description: 'ARIA role',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Tab index for keyboard navigation',
      table: {
        category: 'Accessibility',
        type: { summary: 'number' },
      },
    },

    // Event handlers
    onClick: {
      control: false,
      description: 'Click event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onMouseEnter: {
      control: false,
      description: 'Mouse enter event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onMouseLeave: {
      control: false,
      description: 'Mouse leave event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Key down event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onKeyUp: {
      control: false,
      description: 'Key up event handler',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic Usage Examples
export const Default: Story = {
  render: (args) => <Button {...args} />,
  args: {
    children: 'Button',
  },
}

export const WithIcon: Story = {
  render: (args) => <Button {...args} />,
  args: {
    children: 'Click me',
    icon: '🚀',
    iconPosition: 'left',
  },
}

export const Loading: Story = {
  render: (args) => <Button {...args} />,
  args: {
    children: 'Loading...',
    loading: true,
    loadingText: 'Please wait',
  },
}

export const Disabled: Story = {
  render: (args) => <Button {...args} />,
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

// Variant Showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="filled" status="primary">
            Filled
          </Button>
          <Button variant="outlined" status="primary">
            Outlined
          </Button>
          <Button variant="ghost" status="primary">
            Ghost
          </Button>
          <Button variant="solid" status="primary">
            Solid
          </Button>
          <Button variant="gradient" status="primary">
            Gradient
          </Button>
          <Button variant="glass" status="primary">
            Glass
          </Button>
          <Button variant="neon" status="primary">
            Neon
          </Button>
          <Button variant="link" status="primary">
            Link
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status Colors</h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="filled" status="default">
              Default
            </Button>
            <Button variant="filled" status="primary">
              Primary
            </Button>
            <Button variant="filled" status="secondary">
              Secondary
            </Button>
            <Button variant="filled" status="success">
              Success
            </Button>
            <Button variant="filled" status="warning">
              Warning
            </Button>
            <Button variant="filled" status="error">
              Error
            </Button>
            <Button variant="filled" status="info">
              Info
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outlined" status="default">
              Default
            </Button>
            <Button variant="outlined" status="primary">
              Primary
            </Button>
            <Button variant="outlined" status="secondary">
              Secondary
            </Button>
            <Button variant="outlined" status="success">
              Success
            </Button>
            <Button variant="outlined" status="warning">
              Warning
            </Button>
            <Button variant="outlined" status="error">
              Error
            </Button>
            <Button variant="outlined" status="info">
              Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Size Showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button size="xs" variant="filled" status="primary">
            Extra Small
          </Button>
          <Button size="sm" variant="filled" status="primary">
            Small
          </Button>
          <Button size="md" variant="filled" status="primary">
            Medium
          </Button>
          <Button size="lg" variant="filled" status="primary">
            Large
          </Button>
          <Button size="xl" variant="filled" status="primary">
            Extra Large
          </Button>
          <Button size="2xl" variant="filled" status="primary">
            2X Large
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex items-center gap-4">
          <Button size="xs" icon="⚡" variant="outlined" status="primary">
            XS
          </Button>
          <Button size="sm" icon="🚀" variant="outlined" status="primary">
            SM
          </Button>
          <Button size="md" icon="💫" variant="outlined" status="primary">
            MD
          </Button>
          <Button size="lg" icon="🌟" variant="outlined" status="primary">
            LG
          </Button>
          <Button size="xl" icon="✨" variant="outlined" status="primary">
            XL
          </Button>
          <Button size="2xl" icon="🎯" variant="outlined" status="primary">
            2XL
          </Button>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Interactive Examples
export const Interactive: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive States</h3>
        <div className="flex flex-wrap gap-4">
          <ButtonWithState variant="filled" status="primary">
            Click Counter
          </ButtonWithState>
          <ButtonWithState variant="gradient" status="success" icon="✓">
            Success Action
          </ButtonWithState>
          <ButtonWithState variant="neon" status="info" animated animation="pulse">
            Animated Button
          </ButtonWithState>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" status="primary" loading>
            Loading
          </Button>
          <Button variant="filled" status="success" loading loadingText="Saving...">
            Save Changes
          </Button>
          <Button variant="gradient" status="info" loading loadingText="Processing...">
            Process Data
          </Button>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Form Integration
export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Custom Styling Examples
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            backgroundColor="#6366f1"
            textColor="white"
            borderRadius="20px"
            padding="12px 24px"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            hoverScale="1.05"
            hoverBoxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          >
            Custom Purple
          </Button>
          <Button
            backgroundColor="#10b981"
            textColor="white"
            borderRadius="8px"
            padding="10px 20px"
            fontSize="14px"
            fontWeight="600"
            transform="rotate(-2deg)"
            hoverTransform="rotate(0deg)"
            transition="slide"
            transitionDuration="300ms"
          >
            Tilted Green
          </Button>
          <Button
            variant="outlined"
            borderColor="#f59e0b"
            textColor="#f59e0b"
            borderWidth="3px"
            borderRadius="25px"
            padding="8px 16px"
            hoverBackgroundColor="#f59e0b"
            hoverTextColor="white"
            transition="colors"
            transitionDuration="200ms"
          >
            Custom Orange
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Advanced Styling</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            backgroundColor="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
            textColor="white"
            borderRadius="50px"
            padding="12px 30px"
            fontSize="16px"
            fontWeight="bold"
            boxShadow="0 8px 16px rgba(255, 107, 107, 0.3)"
            hoverScale="1.1"
            hoverBoxShadow="0 12px 24px rgba(255, 107, 107, 0.4)"
            transition="slide"
            transitionDuration="250ms"
          >
            Gradient Magic
          </Button>
          <Button
            backgroundColor="#1f2937"
            textColor="#f9fafb"
            borderRadius="4px"
            padding="16px 32px"
            fontSize="18px"
            fontFamily="monospace"
            focusRingColor="#3b82f6"
            focusRingWidth="3px"
            focusRingOffset="2px"
          >
            Code Style
          </Button>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Compound Component Usage
export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compound Component Usage</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" status="primary">
            <Button.Icon>🔔</Button.Icon>
            <Button.Label>Notification</Button.Label>
          </Button>

          <Button variant="outlined" status="success" loading>
            <Button.Icon>✓</Button.Icon>
            <Button.Label>Success</Button.Label>
            <Button.Spinner />
          </Button>

          <Button variant="gradient" status="info">
            <Button.Label>Info Action</Button.Label>
            <Button.Icon>ℹ️</Button.Icon>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Icon Positioning</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" status="primary" iconPosition="left">
            <Button.Icon>←</Button.Icon>
            <Button.Label>Previous</Button.Label>
          </Button>

          <Button variant="filled" status="primary" iconPosition="right">
            <Button.Label>Next</Button.Label>
            <Button.Icon>→</Button.Icon>
          </Button>

          <Button variant="outlined" status="warning">
            <Button.Icon>⚠️</Button.Icon>
            <Button.Label>Warning</Button.Label>
          </Button>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Animation Showcase
export const Animations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Animation Effects</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" status="primary" animated animation="pulse">
            Pulse Animation
          </Button>
          <Button variant="filled" status="success" animated animation="bounce">
            Bounce Animation
          </Button>
          <Button variant="filled" status="warning" animated animation="shake">
            Shake Animation
          </Button>
          <Button variant="filled" status="info" animated animation="glow">
            Glow Animation
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transition Effects</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outlined" status="primary" transition="colors" interactive>
            Color Transition
          </Button>
          <Button variant="outlined" status="success" transition="transform" interactive>
            Transform Transition
          </Button>
          <Button variant="outlined" status="warning" transition="glow" interactive>
            Glow Transition
          </Button>
          <Button variant="outlined" status="info" transition="slide" interactive>
            Slide Transition
          </Button>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Accessibility Examples
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility Features</h3>
        <div className="space-y-3">
          <Button
            variant="filled"
            status="primary"
            aria-label="Save your changes to the document"
            aria-describedby="save-help"
          >
            Save
          </Button>
          <div id="save-help" className="text-sm text-gray-600">
            Keyboard shortcut: Ctrl+S
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outlined"
            status="warning"
            aria-pressed={false}
            role="switch"
            aria-label="Toggle dark mode"
          >
            🌙 Dark Mode
          </Button>
          <div className="text-sm text-gray-600">Press Space or Enter to toggle</div>
        </div>

        <div className="space-y-3">
          <Button
            variant="filled"
            status="error"
            aria-expanded={false}
            aria-haspopup={true}
            aria-label="Delete item menu"
          >
            🗑️ Delete
          </Button>
          <div className="text-sm text-gray-600">Opens confirmation dialog</div>
        </div>
      </div>
    </div>
  ),
  args: {
    children: 'Button content will be overridden by render function',
  },
}

// Real World Usage
export const RealWorldExamples: Story = {
  render: () => <RealWorldExamplesComponent />,
  args: {
    children: 'Button content will be overridden by render function',
  },
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components from Just UI are available in scope (e.g., Button).
      </p>
      <LivePlayground
        code={`<div className="flex flex-col gap-3">
  <Button variant="filled" status="primary">Primary</Button>
  <Button variant="outlined" status="success" icon="✅">Outlined Success</Button>
  <Button variant="gradient" status="info">Gradient Info</Button>
</div>`}
      />
    </div>
  ),
}
