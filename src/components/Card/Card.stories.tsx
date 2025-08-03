import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'
import type { CardAction } from './types'

/**
 * Card is a versatile container component that displays content in a structured, accessible way.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Full support for controlled and uncontrolled modes for selection, expansion, loading, disabled, and featured states
 * - **Compound Architecture**: Modular sub-components (Header, Media, Body, Footer, Badge, Actions, Overlay, etc.) that share context
 * - **Multiple Variants**: 9 pre-defined visual styles including elevated, outlined, flat, glass, interactive, and more
 * - **3 Sizes**: Small, medium, and large options affecting padding, media aspect ratio, and typography scale
 * - **Status States**: Built-in support for success, warning, error, info, and featured states with visual emphasis
 * - **Interactive Features**: Selection with checkboxes, expandable content panels, loading states, disabled states
 * - **Rich Media Support**: Images, videos, audio, and iframe content with customizable aspect ratios and object fitting
 * - **Comprehensive Styling**: 50+ style props for complete visual customization including borders, typography, colors, focus styles, shadows, and spacing
 * - **Flexible Actions**: Primary, secondary, and custom action buttons with loading states and click handlers
 * - **Badge System**: Positioned badges with variants and custom styling
 * - **Loading & Empty States**: Built-in skeleton loading and empty state handling with custom messages and actions
 * - **Accessibility**: Full keyboard navigation, screen reader support, and ARIA attributes
 * - **Custom Rendering**: Render props for all sections (header, media, body, footer, overlay, actions, empty, loading)
 * - **Transition Effects**: Multiple animation styles with customizable duration for hover, expand/collapse, and focus
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Card
 *   title="Card Title"
 *   description="Card description content"
 *   actions={[
 *     { id: 'action1', label: 'Primary Action', variant: 'primary' }
 *   ]}
 * />
 * ```
 *
 * ### Controlled Selection:
 * ```tsx
 * const [selected, setSelected] = useState(false)
 *
 * <Card
 *   title="Selectable Card"
 *   selectable
 *   isSelected={selected}
 *   onSelectChange={setSelected}
 *   showCheckbox
 * />
 * ```
 *
 * ### Expandable Content:
 * ```tsx
 * <Card
 *   title="Expandable Card"
 *   description="Initial content"
 *   expandable
 *   defaultExpanded={false}
 *   onExpandChange={(expanded) => console.log('Expanded:', expanded)}
 * >
 *   <p>This content appears when expanded</p>
 * </Card>
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <Card>
 *   <Card.Header title="Custom Header" subtitle="With subtitle" />
 *   <Card.Media type="image" src="/image.jpg" alt="Description" />
 *   <Card.Body>
 *     <p>Custom body content</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Card.Actions action={{ id: 'save', label: 'Save', variant: 'primary' }} />
 *   </Card.Footer>
 * </Card>
 * ```
 *
 * ### With Custom Styling:
 * ```tsx
 * <Card
 *   variant="elevated"
 *   size="lg"
 *   backgroundColor="#f8fafc"
 *   borderRadius="16px"
 *   boxShadow="0 10px 25px rgba(0,0,0,0.1)"
 *   hoverElevation
 * />
 * ```
 *
 * ### Form Integration:
 * ```tsx
 * <Card
 *   selectable
 *   isSelected={formData.cardSelected}
 *   onSelectChange={(selected) => setFormData({...formData, cardSelected: selected})}
 *   title="Select this option"
 *   description="This card represents a form option"
 * />
 * ```
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core functionality
    isSelected: {
      control: 'boolean',
      description: 'Controlled selected state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Default selected state for uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onSelectChange: {
      control: false,
      description: 'Callback when selected state changes',
      table: {
        type: { summary: '(selected: boolean) => void' },
      },
    },
    isExpanded: {
      control: 'boolean',
      description: 'Controlled expanded state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Default expanded state for uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onExpandChange: {
      control: false,
      description: 'Callback when expanded state changes',
      table: {
        type: { summary: '(expanded: boolean) => void' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Controlled loading state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Controlled disabled state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isFeatured: {
      control: 'boolean',
      description: 'Controlled featured state for visual emphasis',
      table: {
        type: { summary: 'boolean' },
      },
    },

    // Features
    selectable: {
      control: 'boolean',
      description: 'Enable selection functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    expandable: {
      control: 'boolean',
      description: 'Enable expand/collapse functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Show selection checkbox (requires selectable=true)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkboxPosition: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of selection checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top-left' },
      },
    },

    // Styling
    variant: {
      control: 'select',
      options: [
        'default',
        'elevated',
        'outlined',
        'flat',
        'glass',
        'card-with-shadow',
        'interactive',
        'bordered',
        'ghost',
      ],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size affecting padding and typography',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'featured'],
      description: 'Status state for visual feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },

    // Transitions
    transition: {
      control: 'select',
      options: ['none', 'slide', 'scale', 'fade', 'bounce', 'smooth'],
      description: 'Animation style for interactions',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'smooth' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of animations in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    hoverElevation: {
      control: 'boolean',
      description: 'Add hover elevation effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Content
    title: {
      control: 'text',
      description: 'Card title text',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle text',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Card description text',
      table: {
        type: { summary: 'string' },
      },
    },
    metadata: {
      control: 'text',
      description: 'Metadata text displayed below description',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed in footer',
      table: {
        type: { summary: 'string' },
      },
    },

    // Media
    media: {
      control: false,
      description: 'Media configuration object',
      table: {
        type: { summary: 'CardMediaConfig' },
      },
    },

    // Actions
    actions: {
      control: false,
      description: 'Array of action buttons',
      table: {
        type: { summary: 'CardAction[]' },
      },
    },
    primaryAction: {
      control: false,
      description: 'Primary action button',
      table: {
        type: { summary: 'CardAction' },
      },
    },
    secondaryActions: {
      control: false,
      description: 'Array of secondary action buttons',
      table: {
        type: { summary: 'CardAction[]' },
      },
    },

    // Loading/Empty states
    emptyMessage: {
      control: 'text',
      description: 'Message shown in empty state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No content available' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown during loading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    skeletonLines: {
      control: 'number',
      description: 'Number of skeleton lines in loading state',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 3 },
      },
    },

    // Custom render functions
    renderHeader: {
      control: false,
      description: 'Custom header render function',
      table: {
        category: 'Custom Render',
        type: { summary: '(selected, expanded, disabled, featured) => ReactNode' },
      },
    },
    renderMedia: {
      control: false,
      description: 'Custom media render function',
      table: {
        category: 'Custom Render',
        type: { summary: '(selected, expanded, disabled, featured) => ReactNode' },
      },
    },
    renderBody: {
      control: false,
      description: 'Custom body render function',
      table: {
        category: 'Custom Render',
        type: { summary: '(selected, expanded, disabled, featured) => ReactNode' },
      },
    },
    renderFooter: {
      control: false,
      description: 'Custom footer render function',
      table: {
        category: 'Custom Render',
        type: { summary: '(selected, expanded, disabled, featured) => ReactNode' },
      },
    },
    renderOverlay: {
      control: false,
      description: 'Custom overlay render function',
      table: {
        category: 'Custom Render',
        type: { summary: '(selected, expanded, disabled, featured) => ReactNode' },
      },
    },
    renderEmpty: {
      control: false,
      description: 'Custom empty state render function',
      table: {
        category: 'Custom Render',
        type: { summary: '() => ReactNode' },
      },
    },
    renderLoading: {
      control: false,
      description: 'Custom loading state render function',
      table: {
        category: 'Custom Render',
        type: { summary: '() => ReactNode' },
      },
    },

    // Style props - Borders
    borderWidth: {
      control: 'text',
      description: 'Border width override',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color override',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },
    borderStyle: {
      control: 'text',
      description: 'Border style override',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius override',
      table: {
        category: 'Border Styles',
        type: { summary: 'string' },
      },
    },

    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size override',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight override',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontFamily: {
      control: 'text',
      description: 'Font family override',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    titleTextColor: {
      control: 'color',
      description: 'Title text color',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    bodyTextColor: {
      control: 'color',
      description: 'Body text color',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    metaTextColor: {
      control: 'color',
      description: 'Metadata text color',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },

    // Colors
    backgroundColor: {
      control: 'color',
      description: 'Background color override',
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
    selectedBackgroundColor: {
      control: 'color',
      description: 'Background color when selected',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    disabledBackgroundColor: {
      control: 'color',
      description: 'Background color when disabled',
      table: {
        category: 'Colors',
        type: { summary: 'string' },
      },
    },
    featuredBackgroundColor: {
      control: 'color',
      description: 'Background color when featured',
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

    // Shadows
    boxShadow: {
      control: 'text',
      description: 'Box shadow override',
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
    featuredBoxShadow: {
      control: 'text',
      description: 'Box shadow when featured',
      table: {
        category: 'Shadows',
        type: { summary: 'string' },
      },
    },

    // Spacing
    padding: {
      control: 'text',
      description: 'Padding override',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    paddingX: {
      control: 'text',
      description: 'Horizontal padding override',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    paddingY: {
      control: 'text',
      description: 'Vertical padding override',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    headerPadding: {
      control: 'text',
      description: 'Header section padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    bodyPadding: {
      control: 'text',
      description: 'Body section padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    footerPadding: {
      control: 'text',
      description: 'Footer section padding',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },

    // Event handlers
    onClick: {
      control: false,
      description: 'Click handler',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onDoubleClick: {
      control: false,
      description: 'Double click handler',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    onActionClick: {
      control: false,
      description: 'Action button click handler',
      table: {
        category: 'Events',
        type: { summary: '(actionId: string, action: CardAction) => void' },
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const CardWithState = ({
  defaultSelected = false,
  defaultExpanded = false,
  defaultLoading = false,
  defaultDisabled = false,
  defaultFeatured = false,
  onSelectChange,
  onExpandChange,
  onLoadingChange,
  onDisabledChange,
  onFeaturedChange,
  ...props
}: React.ComponentProps<typeof Card> & {
  defaultSelected?: boolean
  defaultExpanded?: boolean
  defaultLoading?: boolean
  defaultDisabled?: boolean
  defaultFeatured?: boolean
}) => {
  const [selected, setSelected] = useState(defaultSelected)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [loading, setLoading] = useState(defaultLoading)
  const [disabled, setDisabled] = useState(defaultDisabled)
  const [featured, setFeatured] = useState(defaultFeatured)

  const handleSelectChange = (newSelected: boolean) => {
    setSelected(newSelected)
    onSelectChange?.(newSelected)
  }

  const handleExpandChange = (newExpanded: boolean) => {
    setExpanded(newExpanded)
    onExpandChange?.(newExpanded)
  }

  const handleLoadingChange = (newLoading: boolean) => {
    setLoading(newLoading)
    onLoadingChange?.(newLoading)
  }

  const handleDisabledChange = (newDisabled: boolean) => {
    setDisabled(newDisabled)
    onDisabledChange?.(newDisabled)
  }

  const handleFeaturedChange = (newFeatured: boolean) => {
    setFeatured(newFeatured)
    onFeaturedChange?.(newFeatured)
  }

  return (
    <Card
      {...props}
      isSelected={selected}
      onSelectChange={handleSelectChange}
      isExpanded={expanded}
      onExpandChange={handleExpandChange}
      isLoading={loading}
      onLoadingChange={handleLoadingChange}
      isDisabled={disabled}
      onDisabledChange={handleDisabledChange}
      isFeatured={featured}
      onFeaturedChange={handleFeaturedChange}
    />
  )
}

export const Default: Story = {
  render: (args) => <CardWithState {...args} />,
  args: {
    title: 'Card Title',
    description: 'This is a basic card with title and description content.',
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Card (no props)</h3>
        <Card />
        <p className="text-xs text-gray-500 mt-2">Empty card with default styles</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Title and Description</h3>
        <Card
          title="Default Card"
          description="This card shows the default appearance with basic content."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With All Basic Content</h3>
        <Card
          title="Complete Card"
          subtitle="With subtitle"
          description="This card demonstrates all basic content types including title, subtitle, description, and metadata."
          metadata="Created 2 hours ago"
          helperText="This is helper text that appears in the footer"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Action</h3>
        <Card
          title="Card with Action"
          description="This card includes a primary action button."
          primaryAction={{
            id: 'primary',
            label: 'Primary Action',
            variant: 'primary',
          }}
        />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Default</h4>
        <Card
          variant="default"
          title="Default Variant"
          description="Standard card with border and subtle shadow"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Elevated</h4>
        <Card
          variant="elevated"
          title="Elevated Variant"
          description="Card with prominent shadow and no border"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Outlined</h4>
        <Card
          variant="outlined"
          title="Outlined Variant"
          description="Card with thick border and no shadow"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Flat</h4>
        <Card
          variant="flat"
          title="Flat Variant"
          description="Minimal card with background color only"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Glass</h4>
        <Card
          variant="glass"
          title="Glass Variant"
          description="Translucent card with backdrop blur effect"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Card with Shadow</h4>
        <Card
          variant="card-with-shadow"
          title="Shadow Variant"
          description="Card with enhanced shadow and rounded corners"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Interactive</h4>
        <Card
          variant="interactive"
          title="Interactive Variant"
          description="Card optimized for interactions with hover effects"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Bordered</h4>
        <Card
          variant="bordered"
          title="Bordered Variant"
          description="Card with prominent border styling"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Ghost</h4>
        <Card
          variant="ghost"
          title="Ghost Variant"
          description="Transparent card with minimal styling"
        />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Small Size</h3>
        <Card
          size="sm"
          title="Small Card"
          description="This is a small card with compact spacing and typography."
          primaryAction={{ id: 'action', label: 'Action', variant: 'primary' }}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Medium Size (Default)</h3>
        <Card
          size="md"
          title="Medium Card"
          description="This is a medium card with standard spacing and typography."
          primaryAction={{ id: 'action', label: 'Action', variant: 'primary' }}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Large Size</h3>
        <Card
          size="lg"
          title="Large Card"
          description="This is a large card with generous spacing and typography."
          primaryAction={{ id: 'action', label: 'Action', variant: 'primary' }}
        />
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card status="default" title="Default Status" description="Standard card appearance" />

      <Card
        status="success"
        title="Success Status"
        description="Card indicating successful state or positive feedback"
      />

      <Card
        status="warning"
        title="Warning Status"
        description="Card indicating caution or important information"
      />

      <Card
        status="error"
        title="Error Status"
        description="Card indicating error state or negative feedback"
      />

      <Card status="info" title="Info Status" description="Card providing informational content" />

      <Card
        status="featured"
        title="Featured Status"
        description="Card highlighting featured or important content"
      />
    </div>
  ),
}

export const InteractiveFeatures: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Selectable Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardWithState
            selectable
            showCheckbox
            title="Selectable with Checkbox"
            description="Click anywhere or use the checkbox to select"
            checkboxPosition="top-right"
          />
          <CardWithState
            selectable
            title="Selectable without Checkbox"
            description="Click anywhere on the card to select"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Expandable Cards</h3>
        <div className="space-y-4">
          <CardWithState
            expandable
            title="Expandable Card"
            description="Click the expand button or press Enter/Space to expand"
            defaultExpanded={false}
          >
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-medium text-blue-900">Expanded Content</h4>
              <p className="text-blue-700 mt-2">
                This content is only visible when the card is expanded. You can put any content here
                including additional text, images, forms, or other components.
              </p>
            </div>
          </CardWithState>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Interactive States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardWithState
            title="Hover Elevation"
            description="This card elevates on hover"
            hoverElevation
            variant="elevated"
          />
          <CardWithState
            title="Featured Card"
            description="This card is marked as featured"
            isFeatured
            featuredIcon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  ),
}

export const LoadingAndEmptyStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Loading State</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card isLoading loadingMessage="Loading content..." skeletonLines={3} />
          <Card
            isLoading
            loadingMessage="Processing request..."
            skeletonLines={5}
            loadingIcon={
              <svg
                className="w-8 h-8 animate-pulse text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Empty State</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            emptyMessage="No items found"
            emptyIllustration={
              <svg
                className="w-20 h-20 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            }
          />
          <Card
            emptyMessage="Start by adding your first item"
            emptyAction={{
              id: 'add',
              label: 'Add Item',
              variant: 'primary',
              icon: <span>+</span>,
            }}
          />
        </div>
      </div>
    </div>
  ),
}

export const ActionCards: Story = {
  render: () => {
    const handleActionClick = (actionId: string, action: CardAction) => {
      console.log(`Action clicked: ${actionId}`, action)
    }

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Action Variants</h3>
          <Card
            title="Card with Multiple Actions"
            description="Demonstrating different action button variants"
            actions={[
              { id: 'primary', label: 'Primary', variant: 'primary' },
              { id: 'secondary', label: 'Secondary', variant: 'secondary' },
              { id: 'ghost', label: 'Ghost', variant: 'ghost' },
              { id: 'danger', label: 'Danger', variant: 'danger' },
            ]}
            onActionClick={handleActionClick}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Loading Actions</h3>
          <Card
            title="Card with Loading Actions"
            description="Actions can show loading states"
            actions={[
              { id: 'saving', label: 'Saving...', variant: 'primary', loading: true },
              { id: 'normal', label: 'Normal Action', variant: 'secondary' },
              { id: 'disabled', label: 'Disabled', variant: 'secondary', disabled: true },
            ]}
            onActionClick={handleActionClick}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Actions with Icons</h3>
          <Card
            title="Card with Icon Actions"
            description="Actions can include icons for better visual communication"
            primaryAction={{
              id: 'save',
              label: 'Save',
              variant: 'primary',
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ),
            }}
            secondaryActions={[
              {
                id: 'edit',
                label: 'Edit',
                variant: 'secondary',
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
              },
              {
                id: 'delete',
                label: 'Delete',
                variant: 'danger',
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                ),
              },
            ]}
            onActionClick={handleActionClick}
          />
        </div>
      </div>
    )
  },
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Custom Colors and Typography</h3>
        <Card
          title="Custom Styled Card"
          description="This card demonstrates custom styling capabilities"
          backgroundColor="#fef7ff"
          borderColor="#d946ef"
          borderWidth="2px"
          borderRadius="16px"
          titleTextColor="#a21caf"
          bodyTextColor="#7c2d92"
          boxShadow="0 10px 25px rgba(168, 85, 247, 0.15)"
          headerPadding="24px"
          bodyPadding="24px"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Gradient and Modern Styling</h3>
        <Card
          title="Modern Design"
          description="Gradient background with custom focus styles"
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          titleTextColor="white"
          bodyTextColor="rgba(255, 255, 255, 0.9)"
          borderRadius="20px"
          focusRingColor="#8b5cf6"
          focusRingWidth="3px"
          boxShadow="0 20px 40px rgba(102, 126, 234, 0.3)"
          selectable
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Minimal Design</h3>
        <Card
          variant="ghost"
          title="Minimal Card"
          description="Clean, minimal design with custom spacing"
          borderRadius="8px"
          headerPadding="16px 0"
          bodyPadding="16px 0"
          titleTextColor="#1f2937"
          bodyTextColor="#6b7280"
          backgroundColor="transparent"
          focusRingColor="#1f2937"
        />
      </div>
    </div>
  ),
}

export const TransitionEffects: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Transition Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardWithState
            title="Smooth Transition"
            description="Default smooth transition"
            transition="smooth"
            transitionDuration={300}
            hoverElevation
            selectable
          />
          <CardWithState
            title="Scale Transition"
            description="Scale transition effect"
            transition="scale"
            transitionDuration={200}
            hoverElevation
            selectable
          />
          <CardWithState
            title="Bounce Transition"
            description="Bouncy transition effect"
            transition="bounce"
            transitionDuration={400}
            hoverElevation
            selectable
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Expandable with Transitions</h3>
        <CardWithState
          title="Expandable with Slide"
          description="Click to expand with smooth slide transition"
          expandable
          transition="slide"
          transitionDuration={300}
        >
          <div className="space-y-4">
            <p>This content slides in smoothly when the card is expanded.</p>
            <div className="p-4 bg-gray-100 rounded-md">
              <h4 className="font-medium">Additional Content</h4>
              <p className="text-sm text-gray-600 mt-1">
                Any content can be placed in the expandable section.
              </p>
            </div>
          </div>
        </CardWithState>
      </div>
    </div>
  ),
}

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    selectedPlan: '',
    addOns: [] as string[],
    newsletter: false,
    featured: false,
  })

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$9/month',
      features: ['5 Projects', '10GB Storage', 'Email Support'],
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$19/month',
      features: ['25 Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: '$49/month',
      features: ['Unlimited Projects', '1TB Storage', '24/7 Phone Support', 'Custom Integrations'],
    },
  ]

  const addOns = [
    { id: 'backup', name: 'Daily Backups', price: '+$5/month' },
    { id: 'ssl', name: 'SSL Certificate', price: '+$2/month' },
    { id: 'cdn', name: 'CDN Service', price: '+$8/month' },
  ]

  const handlePlanSelect = (planId: string) => {
    setFormData({ ...formData, selectedPlan: planId })
  }

  const handleAddOnToggle = (addOnId: string) => {
    const newAddOns = formData.addOns.includes(addOnId)
      ? formData.addOns.filter((id) => id !== addOnId)
      : [...formData.addOns, addOnId]
    setFormData({ ...formData, addOns: newAddOns })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted! Check console for data.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <h3 className="text-xl font-semibold">Choose Your Plan</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            selectable
            showCheckbox={false}
            isSelected={formData.selectedPlan === plan.id}
            onSelectChange={() => handlePlanSelect(plan.id)}
            variant={formData.selectedPlan === plan.id ? 'elevated' : 'outlined'}
            title={plan.name}
            subtitle={plan.price}
            className="cursor-pointer"
            hoverElevation
            isFeatured={plan.id === 'pro'}
            featuredIcon={plan.id === 'pro' ? <span>⭐</span> : undefined}
          >
            <ul className="space-y-2 mt-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-semibold">Add-ons</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {addOns.map((addOn) => (
          <Card
            key={addOn.id}
            selectable
            showCheckbox
            isSelected={formData.addOns.includes(addOn.id)}
            onSelectChange={() => handleAddOnToggle(addOn.id)}
            title={addOn.name}
            subtitle={addOn.price}
            variant="outlined"
            size="sm"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          selectable
          showCheckbox
          isSelected={formData.newsletter}
          onSelectChange={(selected) => setFormData({ ...formData, newsletter: selected })}
          title="Newsletter Subscription"
          description="Receive weekly updates about new features and tips"
          variant="flat"
        />

        <Card
          selectable
          showCheckbox
          isSelected={formData.featured}
          onSelectChange={(selected) => setFormData({ ...formData, featured: selected })}
          title="Featured Listing"
          description="Highlight your profile in search results"
          status="featured"
        />
      </div>

      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium">Form Data Preview</h4>
          <pre className="text-sm text-gray-600 mt-2">{JSON.stringify(formData, null, 2)}</pre>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Manual Component Composition</h3>
        <Card variant="elevated" className="max-w-md">
          <Card.Header title="Custom Composed Card" subtitle="Built with compound components" />
          <Card.Body>
            <p>This card is built using the compound component API for maximum flexibility.</p>
          </Card.Body>
          <Card.Footer helperText="Additional context information">
            <Card.Actions action={{ id: 'learn-more', label: 'Learn More', variant: 'primary' }} />
          </Card.Footer>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">With Overlay</h3>
        <Card variant="default" className="max-w-md relative">
          <Card.Header title="Card with Overlay" />
          <Card.Body>
            <p>This card demonstrates overlay functionality.</p>
          </Card.Body>
          <Card.Overlay>
            <div className="text-white text-center">
              <h4 className="text-lg font-semibold mb-2">Overlay Content</h4>
              <p>Any content can be placed in the overlay.</p>
            </div>
          </Card.Overlay>
        </Card>
      </div>
    </div>
  ),
}

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All cards are keyboard accessible. Try tabbing through them and using Enter/Space to
          interact.
        </p>

        <CardWithState
          title="Keyboard Navigation"
          description="Use Tab to focus, Enter/Space to select or expand, Arrow keys for expansion"
          selectable
          expandable
          aria-label="Keyboard accessible card example"
          aria-describedby="keyboard-help"
        >
          <div id="keyboard-help" className="p-4 bg-blue-50 rounded-md">
            <h4 className="font-medium text-blue-900">Keyboard Shortcuts</h4>
            <ul className="text-blue-700 text-sm mt-2 space-y-1">
              <li>• Tab/Shift+Tab: Navigate between cards</li>
              <li>• Enter/Space: Toggle selection or expansion</li>
              <li>• Arrow Down/Up: Expand/collapse (when expandable)</li>
            </ul>
          </div>
        </CardWithState>

        <CardWithState
          title="Screen Reader Friendly"
          description="This card has proper ARIA attributes and semantic markup"
          status="info"
          selectable
          showCheckbox
          aria-label="Screen reader optimized card"
          aria-describedby="sr-description"
          role="region"
        >
          <div id="sr-description" className="mt-4">
            <p className="text-sm text-gray-600">
              This card provides clear context and state information to assistive technologies.
            </p>
          </div>
        </CardWithState>

        <Card
          title="High Contrast Support"
          description="Enhanced visual indicators for better accessibility"
          variant="outlined"
          focusRingColor="#000000"
          focusRingWidth="4px"
          borderWidth="3px"
          borderColor="#1f2937"
          selectable
          isSelected={false}
        />

        <Card
          title="Large Touch Targets"
          description="Optimized for touch interfaces and motor accessibility"
          size="lg"
          selectable
          showCheckbox
          checkboxPosition="top-right"
          padding="2rem"
          primaryAction={{
            id: 'large-action',
            label: 'Large Action Button',
            variant: 'primary',
          }}
        />
      </div>
    </div>
  ),
}
