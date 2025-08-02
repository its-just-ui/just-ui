import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

/**
 * Tooltip is a component that displays additional information when users hover over, focus on, or click an element.
 *
 * ## Features
 * - **Multiple Triggers**: Hover, click, focus, and manual trigger modes
 * - **Flexible Positioning**: 12 placement options with auto-placement support
 * - **Multiple Variants**: 5 pre-defined visual styles
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 * - **Extensive Styling**: Over 50 style props for complete customization
 * - **Accessibility**: Full keyboard and screen reader support
 * - **Auto-placement**: Smart positioning to keep tooltip in viewport
 * - **Delay Controls**: Configurable open/close delays
 *
 * ## Usage
 *
 * ### Basic Usage (Hover Trigger):
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <button className="px-3 py-1.5 bg-primary-600 text-white rounded text-sm">Hover me</button>
 * </Tooltip>
 * ```
 *
 * ### With Title and Description:
 * ```tsx
 * <Tooltip
 *   title="Important Information"
 *   description="This tooltip contains detailed information about the element."
 * >
 *   <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm">Hover for details</button>
 * </Tooltip>
 * ```
 *
 * ### Click Trigger:
 * ```tsx
 * <Tooltip trigger="click" content="Click to show/hide">
 *   <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm">Click me</button>
 * </Tooltip>
 * ```
 *
 * ### Custom Placement:
 * ```tsx
 * <Tooltip placement="bottom" content="Tooltip below">
 *   <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Bottom tooltip</button>
 * </Tooltip>
 * ```
 */
const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultIsOpen: {
      control: 'boolean',
      description: 'Default open state for uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      control: false,
      description: 'Callback when open state changes',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    content: {
      control: 'text',
      description: 'Tooltip content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    title: {
      control: 'text',
      description: 'Tooltip title',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Tooltip description',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'flat', 'elevated'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state for visual feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: 'Tooltip placement relative to trigger',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'How the tooltip is triggered',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'hover' },
      },
    },
    offset: {
      control: 'number',
      description: 'Distance between tooltip and trigger',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 8 },
      },
    },
    delayOpen: {
      control: 'number',
      description: 'Delay before tooltip opens (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    delayClose: {
      control: 'number',
      description: 'Delay before tooltip closes (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow pointing to trigger',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    arrowSize: {
      control: 'number',
      description: 'Size of the arrow',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 6 },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'scale', 'bounce'],
      description: 'Animation style for the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'fade' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transition in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    autoPlacement: {
      control: 'boolean',
      description: 'Automatically adjust placement to stay in viewport',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    // Content styles
    contentBackgroundColor: {
      control: 'color',
      description: 'Tooltip background color',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    contentBorderColor: {
      control: 'color',
      description: 'Tooltip border color',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    contentBorderRadius: {
      control: 'text',
      description: 'Tooltip border radius',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    contentPadding: {
      control: 'text',
      description: 'Tooltip padding',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of tooltip',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    // Typography styles
    titleColor: {
      control: 'color',
      description: 'Title text color',
      table: {
        category: 'Typography Styles',
        type: { summary: 'string' },
      },
    },
    titleFontSize: {
      control: 'text',
      description: 'Title font size',
      table: {
        category: 'Typography Styles',
        type: { summary: 'string' },
      },
    },
    descriptionColor: {
      control: 'color',
      description: 'Description text color',
      table: {
        category: 'Typography Styles',
        type: { summary: 'string' },
      },
    },
    // Arrow styles
    arrowColor: {
      control: 'color',
      description: 'Arrow color',
      table: {
        category: 'Arrow Styles',
        type: { summary: 'string' },
      },
    },
    // Custom render
    renderContent: {
      control: false,
      description: 'Custom render function for tooltip content',
      table: {
        category: 'Custom Render',
        type: { summary: '(isOpen: boolean) => React.ReactNode' },
      },
    },
    renderTrigger: {
      control: false,
      description: 'Custom render function for trigger element',
      table: {
        category: 'Custom Render',
        type: { summary: '(isOpen: boolean, triggerProps: any) => React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const TooltipWithState = ({
  defaultIsOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof Tooltip> & { defaultIsOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  return <Tooltip {...props} isOpen={isOpen} onOpenChange={handleOpenChange} />
}

export const Default: Story = {
  render: (args) => <TooltipWithState {...args} />,
  args: {
    content: 'This is a tooltip',
    children: (
      <button className="px-3 py-1.5 bg-primary-600 text-white rounded text-sm hover:bg-primary-700">
        Hover me
      </button>
    ),
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Tooltip</h3>
        <Tooltip content="Simple tooltip">
          <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
            Hover me
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Title and Description</h3>
        <Tooltip
          title="Important Information"
          description="This tooltip contains detailed information about the element."
        >
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Hover for details
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Click Trigger</h3>
        <Tooltip trigger="click" content="Click to show/hide">
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
            Click me
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Focus Trigger</h3>
        <Tooltip trigger="focus" content="Focus to show">
          <button className="px-3 py-1.5 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
            Focus me
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <Tooltip variant="default" content="Default variant">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Default
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <Tooltip variant="filled" content="Filled variant">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Filled
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <Tooltip variant="outlined" content="Outlined variant">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Outlined
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Flat</h3>
        <Tooltip variant="flat" content="Flat variant">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Flat
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Elevated</h3>
        <Tooltip variant="elevated" content="Elevated variant">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Elevated
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Tooltip size="sm" content="Small tooltip">
          <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
            Small
          </button>
        </Tooltip>
        <Tooltip size="md" content="Medium tooltip">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Medium
          </button>
        </Tooltip>
        <Tooltip size="lg" content="Large tooltip">
          <button className="px-4 py-2 bg-blue-600 text-white rounded text-base hover:bg-blue-700">
            Large
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const Placements: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Tooltip placement="top" content="Top placement">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Top
          </button>
        </Tooltip>
      </div>

      <div className="flex justify-center gap-8">
        <Tooltip placement="left" content="Left placement">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Left
          </button>
        </Tooltip>
        <Tooltip placement="right" content="Right placement">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Right
          </button>
        </Tooltip>
      </div>

      <div className="flex justify-center">
        <Tooltip placement="bottom" content="Bottom placement">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Bottom
          </button>
        </Tooltip>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Tooltip placement="top-start" content="Top start">
          <button className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
            Top Start
          </button>
        </Tooltip>
        <Tooltip placement="top-end" content="Top end">
          <button className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
            Top End
          </button>
        </Tooltip>
        <Tooltip placement="bottom-start" content="Bottom start">
          <button className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
            Bottom Start
          </button>
        </Tooltip>
        <Tooltip placement="bottom-end" content="Bottom end">
          <button className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
            Bottom End
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <Tooltip status="default" content="Default status tooltip">
          <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
            Default
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <Tooltip status="success" content="Success status tooltip">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Success
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <Tooltip status="warning" content="Warning status tooltip">
          <button className="px-3 py-1.5 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
            Warning
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <Tooltip status="error" content="Error status tooltip">
          <button className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700">
            Error
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const Triggers: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Hover Trigger (Default)</h3>
        <Tooltip trigger="hover" content="Hover to show">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Hover me
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Click Trigger</h3>
        <Tooltip trigger="click" content="Click to toggle">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Click me
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Focus Trigger</h3>
        <Tooltip trigger="focus" content="Focus to show">
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
            Focus me
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Manual Trigger</h3>
        <TooltipWithState trigger="manual" content="Manually controlled">
          <button className="px-3 py-1.5 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
            Manual control
          </button>
        </TooltipWithState>
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fade Transition (Default)</h3>
        <Tooltip transition="fade" content="Fade animation">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Fade
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slide Transition</h3>
        <Tooltip transition="slide" content="Slide animation">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Slide
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Scale Transition</h3>
        <Tooltip transition="scale" content="Scale animation">
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
            Scale
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Bounce Transition</h3>
        <Tooltip transition="bounce" content="Bounce animation">
          <button className="px-3 py-1.5 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
            Bounce
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Transition</h3>
        <Tooltip transition="none" content="No animation">
          <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
            No transition
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slow Transition</h3>
        <Tooltip transition="fade" transitionDuration={600} content="600ms duration">
          <button className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700">
            Slow fade
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const Delays: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Delay</h3>
        <Tooltip delayOpen={0} delayClose={0} content="Instant show/hide">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            No delay
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Open Delay (500ms)</h3>
        <Tooltip delayOpen={500} content="Wait 500ms to show">
          <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
            Open delay
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Close Delay (1000ms)</h3>
        <Tooltip delayClose={1000} content="Wait 1000ms to hide">
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
            Close delay
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Both Delays</h3>
        <Tooltip delayOpen={300} delayClose={500} content="Open: 300ms, Close: 500ms">
          <button className="px-3 py-1.5 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
            Both delays
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <Tooltip
          contentBackgroundColor="#8b5cf6"
          titleColor="#ffffff"
          descriptionColor="#e9d5ff"
          content="Purple theme tooltip"
          title="Custom Styling"
          description="This tooltip uses custom colors"
        >
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
            Custom colors
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Border</h3>
        <Tooltip
          contentBorderWidth="2px"
          contentBorderColor="#f59e0b"
          contentBorderRadius="12px"
          content="Custom border tooltip"
        >
          <button className="px-3 py-1.5 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
            Custom border
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Large Arrow</h3>
        <Tooltip arrowSize={12} arrowColor="#ef4444" content="Large red arrow">
          <button className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700">
            Large arrow
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Arrow</h3>
        <Tooltip showArrow={false} content="Tooltip without arrow">
          <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
            No arrow
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Width</h3>
        <Tooltip
          maxWidth="300px"
          minWidth="150px"
          content="This tooltip has a custom width range. It will be between 150px and 300px wide, depending on the content."
        >
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Custom width
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const CustomContent: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rich Content</h3>
        <Tooltip
          renderContent={() => (
            <div className="space-y-2">
              <div className="font-bold text-sm">Rich Tooltip</div>
              <div className="text-xs opacity-90">
                This tooltip contains rich content with multiple elements.
              </div>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">Tag 1</span>
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">Tag 2</span>
              </div>
            </div>
          )}
        >
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Rich content
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Trigger</h3>
        <Tooltip
          content="Custom trigger element"
          renderTrigger={(isOpen, triggerProps) => (
            <div
              {...triggerProps}
              className={`px-3 py-1.5 rounded cursor-pointer transition-colors text-sm ${
                isOpen ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {isOpen ? 'Tooltip is open' : 'Hover to open'}
            </div>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Icon with Tooltip</h3>
        <Tooltip content="Information icon">
          <svg
            className="w-5 h-5 text-blue-500 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </Tooltip>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Field Help</h3>
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Email Address</label>
            <Tooltip content="We'll never share your email with anyone else">
              <svg
                className="w-4 h-4 text-gray-400 cursor-help"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </Tooltip>
          </div>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Action Buttons</h3>
        <div className="flex gap-4">
          <Tooltip content="Save your changes">
            <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </Tooltip>

          <Tooltip content="Delete this item">
            <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </Tooltip>

          <Tooltip content="Edit this item">
            <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Status Indicators</h3>
        <div className="flex gap-4">
          <Tooltip status="success" content="All systems operational">
            <div className="w-3 h-3 bg-green-500 rounded-full cursor-help"></div>
          </Tooltip>

          <Tooltip status="warning" content="System experiencing issues">
            <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-help"></div>
          </Tooltip>

          <Tooltip status="error" content="Critical system failure">
            <div className="w-3 h-3 bg-red-500 rounded-full cursor-help"></div>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All tooltips are keyboard accessible. Try tabbing through them and using Enter/Space to
          trigger.
        </p>

        <Tooltip trigger="focus" content="Focus to show tooltip">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Focus me
          </button>
        </Tooltip>

        <Tooltip
          trigger="click"
          content="Click to show tooltip"
          renderTrigger={(isOpen, triggerProps) => (
            <button
              {...triggerProps}
              className={`px-3 py-1.5 rounded text-sm ${
                isOpen ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
              }`}
              aria-expanded={isOpen}
            >
              {isOpen ? 'Tooltip is open' : 'Click to open'}
            </button>
          )}
        />

        <Tooltip content="Screen reader friendly tooltip">
          <button
            className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            aria-describedby="tooltip-description"
          >
            Accessible button
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const ComplexLayouts: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">User Profile</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
          </div>
          <Tooltip content="Click to edit profile">
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </Tooltip>
        </div>
        <div className="text-sm text-gray-600">Profile information will be displayed here</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '📊', label: 'Analytics', tooltip: 'View detailed analytics' },
          { icon: '⚙️', label: 'Settings', tooltip: 'Configure application settings' },
          { icon: '👤', label: 'Profile', tooltip: 'Manage your profile' },
          { icon: '📧', label: 'Messages', tooltip: 'Check your messages' },
          { icon: '🔔', label: 'Notifications', tooltip: 'View notifications' },
          { icon: '❓', label: 'Help', tooltip: 'Get help and support' },
        ].map((item) => (
          <Tooltip key={item.label} content={item.tooltip}>
            <div className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium">{item.label}</div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  ),
}
