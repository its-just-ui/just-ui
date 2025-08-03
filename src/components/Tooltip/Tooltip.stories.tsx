import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

/**
 * Tooltip is a component that displays additional information when users hover over, focus on, or click an element.
 * It uses React Portal for exact positioning and rendering outside the DOM hierarchy.
 *
 * ## Features
 * - **React Portal**: Renders outside parent DOM hierarchy for perfect positioning
 * - **Multiple Triggers**: Hover, click, focus, and manual trigger modes
 * - **Flexible Positioning**: 12 placement options with auto-placement support
 * - **Fine Position Control**: offsetX/offsetY for precise adjustments, nudge props for easy directional shifts
 * - **Multiple Variants**: 5 pre-defined visual styles
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 * - **Extensive Styling**: Over 50 style props for complete customization
 * - **Accessibility**: Full keyboard and screen reader support with ARIA attributes
 * - **Auto-placement**: Smart positioning to keep tooltip in viewport
 * - **Delay Controls**: Configurable open/close delays
 * - **Loading States**: Built-in loading indicator support
 * - **Compound Components**: TooltipTrigger and TooltipContent for advanced layouts
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
 * ### Controlled Component:
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <Tooltip
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   content="Controlled tooltip"
 * >
 *   <button>Controlled</button>
 * </Tooltip>
 * ```
 *
 * ### With Title and Description:
 * ```tsx
 * <Tooltip
 *   title="Important Information"
 *   description="This tooltip contains detailed information about the element."
 * >
 *   <button>Hover for details</button>
 * </Tooltip>
 * ```
 *
 * ### Custom Placement:
 * ```tsx
 * <Tooltip placement="bottom" content="Tooltip below">
 *   <button>Bottom tooltip</button>
 * </Tooltip>
 * ```
 *
 * ### Fine-tuning Position:
 * ```tsx
 * <Tooltip
 *   content="Precisely positioned"
 *   offsetX={20}      // Move 20px right
 *   offsetY={-10}     // Move 10px up
 *   nudgeRight={5}    // Additional 5px right
 * >
 *   <button>Fine-tuned position</button>
 * </Tooltip>
 * ```
 *
 * ### Compound Components:
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>
 *     <button>Custom trigger</button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     Custom content with full control
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */
const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile tooltip component with React Portal support and extensive customization options.',
      },
    },
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
        defaultValue: { summary: '8' },
      },
    },
    offsetX: {
      control: 'number',
      description: 'Horizontal offset adjustment (positive = right, negative = left)',
      table: {
        category: 'Position Fine-tuning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset adjustment (positive = down, negative = up)',
      table: {
        category: 'Position Fine-tuning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    nudgeLeft: {
      control: 'number',
      description: 'Move tooltip left by this amount',
      table: {
        category: 'Position Fine-tuning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    nudgeRight: {
      control: 'number',
      description: 'Move tooltip right by this amount',
      table: {
        category: 'Position Fine-tuning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    nudgeTop: {
      control: 'number',
      description: 'Move tooltip up by this amount',
      table: {
        category: 'Position Fine-tuning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    nudgeBottom: {
      control: 'number',
      description: 'Move tooltip down by this amount',
      table: {
        category: 'Position Fine-tuning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    delayOpen: {
      control: 'number',
      description: 'Delay before tooltip opens (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    delayClose: {
      control: 'number',
      description: 'Delay before tooltip closes (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
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
        defaultValue: { summary: '6' },
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
        defaultValue: { summary: '200' },
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
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Loading message text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message when no content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No content' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Tooltip</h3>
        <Tooltip content="Simple tooltip with all defaults">
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
            Focus me (Tab)
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Open</h3>
        <Tooltip defaultIsOpen content="Starts open by default">
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
            Already showing
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
        <Tooltip variant="default" content="Default variant with shadow">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Default
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <Tooltip variant="filled" content="Filled variant with solid background">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Filled
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <Tooltip variant="outlined" content="Outlined variant with border">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Outlined
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Flat</h3>
        <Tooltip variant="flat" content="Flat variant with no shadow">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Flat
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Elevated</h3>
        <Tooltip variant="elevated" content="Elevated variant with large shadow">
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
        <Tooltip size="lg" content="Large tooltip with more content space">
          <button className="px-4 py-2 bg-blue-600 text-white rounded text-base hover:bg-blue-700">
            Large
          </button>
        </Tooltip>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Size comparison with same content</h3>
        <div className="flex items-center gap-4">
          <Tooltip size="sm" content="This is the same content in different sizes">
            <span className="text-sm">Small</span>
          </Tooltip>
          <Tooltip size="md" content="This is the same content in different sizes">
            <span className="text-sm">Medium</span>
          </Tooltip>
          <Tooltip size="lg" content="This is the same content in different sizes">
            <span className="text-sm">Large</span>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

export const PositionAdjustments: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Fine-tuning with offsetX and offsetY
        </h3>
        <div className="flex items-center gap-6">
          <Tooltip content="Normal position" placement="top">
            <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm">Default</button>
          </Tooltip>

          <Tooltip content="Shifted right (+20px)" placement="top" offsetX={20}>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">
              offsetX: 20
            </button>
          </Tooltip>

          <Tooltip content="Shifted left (-20px)" placement="top" offsetX={-20}>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">
              offsetX: -20
            </button>
          </Tooltip>

          <Tooltip content="Shifted down (+15px)" placement="right" offsetY={15}>
            <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm">
              offsetY: 15
            </button>
          </Tooltip>

          <Tooltip content="Shifted up (-15px)" placement="right" offsetY={-15}>
            <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm">
              offsetY: -15
            </button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Easy nudging in any direction</h3>
        <div className="grid grid-cols-3 gap-4 max-w-md">
          <div />
          <Tooltip content="Nudged up 10px" nudgeTop={10}>
            <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm w-full">
              ↑ nudgeTop: 10
            </button>
          </Tooltip>
          <div />

          <Tooltip content="Nudged left 15px" placement="right" nudgeLeft={15}>
            <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm w-full">
              ← nudgeLeft: 15
            </button>
          </Tooltip>

          <Tooltip content="No nudge">
            <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm w-full">
              Center
            </button>
          </Tooltip>

          <Tooltip content="Nudged right 15px" placement="left" nudgeRight={15}>
            <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm w-full">
              nudgeRight: 15 →
            </button>
          </Tooltip>

          <div />
          <Tooltip content="Nudged down 10px" nudgeBottom={10}>
            <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm w-full">
              nudgeBottom: 10 ↓
            </button>
          </Tooltip>
          <div />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Combining adjustments</h3>
        <div className="flex items-center gap-6">
          <Tooltip
            content="Multiple adjustments"
            placement="top"
            offset={20}
            offsetX={10}
            nudgeRight={5}
          >
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">
              offset + offsetX + nudge
            </button>
          </Tooltip>

          <Tooltip
            content="Diagonal positioning"
            placement="bottom"
            nudgeRight={20}
            nudgeBottom={20}
          >
            <button className="px-3 py-1.5 bg-pink-600 text-white rounded text-sm">
              Diagonal nudge
            </button>
          </Tooltip>

          <Tooltip content="Custom corner position" placement="top-end" offsetX={-10} nudgeTop={5}>
            <button className="px-3 py-1.5 bg-orange-600 text-white rounded text-sm">
              Fine-tuned corner
            </button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Practical example: Avoiding overlaps
        </h3>
        <div className="relative p-8 bg-gray-50 rounded-lg">
          <div className="absolute top-2 right-2 flex gap-1">
            <Tooltip content="Settings" placement="bottom" nudgeLeft={8}>
              <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">⚙️</button>
            </Tooltip>
            <Tooltip content="Notifications" placement="bottom">
              <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">🔔</button>
            </Tooltip>
            <Tooltip content="Profile" placement="bottom" nudgeRight={8}>
              <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">👤</button>
            </Tooltip>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              The tooltips above use nudge to avoid overlapping when shown simultaneously
            </p>
          </div>
        </div>
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

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="space-y-2">
          <Tooltip placement="left-start" content="Left start">
            <button className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700">
              Left Start
            </button>
          </Tooltip>
          <Tooltip placement="left-end" content="Left end">
            <button className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700">
              Left End
            </button>
          </Tooltip>
        </div>
        <div className="space-y-2">
          <Tooltip placement="right-start" content="Right start">
            <button className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700">
              Right Start
            </button>
          </Tooltip>
          <Tooltip placement="right-end" content="Right end">
            <button className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700">
              Right End
            </button>
          </Tooltip>
        </div>
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

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Titles and Status</h3>
        <div className="flex gap-4">
          <Tooltip status="success" title="Success" description="Operation completed successfully">
            <div className="w-3 h-3 bg-green-500 rounded-full cursor-help"></div>
          </Tooltip>
          <Tooltip status="warning" title="Warning" description="Please review this setting">
            <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-help"></div>
          </Tooltip>
          <Tooltip status="error" title="Error" description="Something went wrong">
            <div className="w-3 h-3 bg-red-500 rounded-full cursor-help"></div>
          </Tooltip>
        </div>
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
        <Tooltip trigger="focus" content="Focus to show (try Tab key)">
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Duration</h3>
        <Tooltip transition="scale" transitionDuration={600} content="600ms duration">
          <button className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700">
            Slow scale
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Delay (Default)</h3>
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

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled</h3>
        <Tooltip disabled content="This won't show">
          <button
            disabled
            className="px-3 py-1.5 bg-gray-400 text-gray-200 rounded text-sm cursor-not-allowed"
          >
            Disabled tooltip
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading State</h3>
        <Tooltip loading loadingMessage="Fetching data...">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Loading tooltip
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Empty State</h3>
        <Tooltip emptyMessage="No data available">
          <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
            Empty tooltip
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required Field</h3>
        <Tooltip
          required
          title="Email Address"
          description="Please enter a valid email"
          helperText="This field is required"
        >
          <input
            type="email"
            placeholder="Enter email"
            className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          arrowColor="#8b5cf6"
          title="Custom Styling"
          description="This tooltip uses custom colors"
        >
          <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
            Custom colors
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Border & Radius</h3>
        <Tooltip
          contentBorderWidth="2px"
          contentBorderColor="#f59e0b"
          contentBorderRadius="12px"
          contentPadding="0.75rem 1rem"
          content="Custom border and rounded corners"
        >
          <button className="px-3 py-1.5 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
            Custom border
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Large Arrow</h3>
        <Tooltip arrowSize={12} arrowColor="#ef4444" content="Large red arrow pointing to element">
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
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Width & Typography</h3>
        <Tooltip
          maxWidth="320px"
          minWidth="200px"
          titleFontSize="1rem"
          titleFontWeight="600"
          descriptionFontSize="0.875rem"
          title="Custom Typography"
          description="This tooltip has custom width constraints and typography settings. The text will wrap nicely within the defined boundaries."
        >
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Custom width
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Glass Effect</h3>
        <div className="p-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg">
          <Tooltip
            variant="outlined"
            contentBackgroundColor="rgba(255, 255, 255, 0.1)"
            contentBorderColor="rgba(255, 255, 255, 0.2)"
            contentBoxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            content="Glass morphism effect"
            customStyles={{
              contentStyles: {
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              },
            }}
          >
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30">
              Glass tooltip
            </button>
          </Tooltip>
        </div>
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
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  JD
                </div>
                <div>
                  <div className="font-bold text-sm">John Doe</div>
                  <div className="text-xs opacity-90">Software Engineer</div>
                </div>
              </div>
              <div className="text-xs">
                <div>📧 john.doe@example.com</div>
                <div>📱 +1 (555) 123-4567</div>
              </div>
              <div className="flex gap-1">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded">
                  React
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded">
                  Node.js
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded">
                  TypeScript
                </span>
              </div>
            </div>
          )}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-600">
            JD
          </div>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Interactive Content</h3>
        <Tooltip
          trigger="click"
          placement="bottom"
          renderContent={() => (
            <div className="space-y-3 min-w-[200px]">
              <div className="font-medium">Quick Actions</div>
              <div className="space-y-1">
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-white/10 rounded">
                  ✏️ Edit
                </button>
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-white/10 rounded">
                  📋 Copy
                </button>
                <button className="w-full text-left px-2 py-1 text-sm hover:bg-white/10 rounded">
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        >
          <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
            Context Menu
          </button>
        </Tooltip>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Trigger</h3>
        <Tooltip
          content="This has a custom trigger design"
          renderTrigger={(isOpen, triggerProps) => (
            <div
              {...triggerProps}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all text-sm font-medium ${
                isOpen
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {isOpen ? '🔓 Tooltip is open' : '🔒 Hover to open'}
            </div>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Progress Indicator</h3>
        <Tooltip
          placement="right"
          renderContent={() => (
            <div className="space-y-2">
              <div className="text-sm font-medium">Upload Progress</div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
              </div>
              <div className="text-xs">67% complete</div>
            </div>
          )}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-200">
            📊
          </div>
        </Tooltip>
      </div>
    </div>
  ),
}

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  return (
    <form className="space-y-6 max-w-md">
      <h3 className="text-lg font-medium">Registration Form</h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Tooltip content="We'll never share your email with anyone else" size="sm">
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
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Tooltip
            title="Password Requirements"
            description="Must be at least 8 characters with uppercase, lowercase, and numbers"
            size="sm"
            maxWidth="200px"
          >
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
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <Tooltip
          trigger="focus"
          content={
            formData.confirmPassword && formData.password !== formData.confirmPassword
              ? "Passwords don't match"
              : 'Passwords match'
          }
          status={
            formData.confirmPassword && formData.password !== formData.confirmPassword
              ? 'error'
              : 'success'
          }
        >
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm password"
          />
        </Tooltip>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All tooltips are keyboard accessible. Try tabbing through them and using Space/Enter to
          trigger.
        </p>

        <div className="space-y-3">
          <Tooltip
            trigger="focus"
            content="Focus-triggered tooltip for keyboard users"
            aria-label="Additional information about this field"
          >
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Focus me (Tab)
            </button>
          </Tooltip>

          <Tooltip
            content="Screen reader friendly tooltip with proper ARIA attributes"
            role="tooltip"
          >
            <button
              className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              aria-describedby="tooltip-description"
            >
              Accessible button
            </button>
          </Tooltip>

          <Tooltip
            trigger="click"
            content="Click-triggered tooltip"
            renderTrigger={(isOpen, triggerProps) => (
              <button
                {...triggerProps}
                className={`px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isOpen
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {isOpen ? 'Tooltip is open' : 'Click to open'}
              </button>
            )}
          />

          <Tooltip
            content="High contrast tooltip for better visibility"
            variant="outlined"
            contentBorderWidth="2px"
            contentBorderColor="#000000"
            contentBackgroundColor="#ffffff"
            customStyles={{ textColor: '#000000' }}
          >
            <button className="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
              High contrast
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Dashboard with status indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">System Status Dashboard</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'API Server', status: 'success', uptime: '99.9%' },
            { name: 'Database', status: 'success', uptime: '99.8%' },
            { name: 'Cache', status: 'warning', uptime: '97.2%' },
            { name: 'CDN', status: 'error', uptime: '85.1%' },
          ].map((service) => (
            <Tooltip
              key={service.name}
              status={service.status as 'success' | 'warning' | 'error'}
              title={service.name}
              description={`Uptime: ${service.uptime}`}
              placement="top"
            >
              <div
                className={`p-4 rounded-lg cursor-help ${
                  service.status === 'success'
                    ? 'bg-green-100 border-green-200'
                    : service.status === 'warning'
                      ? 'bg-yellow-100 border-yellow-200'
                      : 'bg-red-100 border-red-200'
                } border`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      service.status === 'success'
                        ? 'bg-green-500'
                        : service.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">{service.uptime}</div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Action buttons toolbar */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Action Toolbar</h3>
        <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
          {[
            { icon: '📝', action: 'Edit', shortcut: 'Ctrl+E' },
            { icon: '📋', action: 'Copy', shortcut: 'Ctrl+C' },
            { icon: '📤', action: 'Share', shortcut: 'Ctrl+S' },
            { icon: '🗑️', action: 'Delete', shortcut: 'Del' },
            { icon: '⚙️', action: 'Settings', shortcut: 'Ctrl+,' },
          ].map((tool) => (
            <Tooltip
              key={tool.action}
              title={tool.action}
              description={`Shortcut: ${tool.shortcut}`}
              size="sm"
              delayOpen={300}
            >
              <button className="p-2 text-lg hover:bg-gray-200 rounded transition-colors">
                {tool.icon}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* File explorer */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">File Explorer</h3>
        <div className="space-y-2 max-w-md">
          {[
            {
              name: 'project-readme.md',
              size: '2.4 KB',
              modified: '2 hours ago',
              type: 'markdown',
            },
            { name: 'components.tsx', size: '45.2 KB', modified: '1 day ago', type: 'typescript' },
            { name: 'styles.css', size: '8.7 KB', modified: '3 days ago', type: 'css' },
            { name: 'package.json', size: '1.8 KB', modified: '1 week ago', type: 'json' },
          ].map((file) => (
            <Tooltip
              key={file.name}
              placement="right"
              renderContent={() => (
                <div className="space-y-1">
                  <div className="font-medium">{file.name}</div>
                  <div className="text-xs opacity-90">Size: {file.size}</div>
                  <div className="text-xs opacity-90">Modified: {file.modified}</div>
                  <div className="text-xs opacity-90">Type: {file.type}</div>
                </div>
              )}
            >
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <div className="text-lg">
                  {file.type === 'markdown'
                    ? '📄'
                    : file.type === 'typescript'
                      ? '🔵'
                      : file.type === 'css'
                        ? '🎨'
                        : '📦'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-gray-500">{file.size}</div>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Chart data points */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Interactive Chart</h3>
        <div className="relative h-32 bg-gray-50 rounded-lg p-4">
          <div className="flex items-end justify-between h-full">
            {[
              { value: 45, label: 'Jan', data: { sales: '$12,450', orders: 234 } },
              { value: 62, label: 'Feb', data: { sales: '$18,250', orders: 312 } },
              { value: 38, label: 'Mar', data: { sales: '$9,880', orders: 189 } },
              { value: 71, label: 'Apr', data: { sales: '$22,100', orders: 387 } },
              { value: 85, label: 'May', data: { sales: '$28,750', orders: 456 } },
              { value: 59, label: 'Jun', data: { sales: '$16,900', orders: 298 } },
            ].map((point, index) => (
              <Tooltip
                key={index}
                title={point.label}
                renderContent={() => (
                  <div className="space-y-1">
                    <div className="font-medium">{point.label} 2024</div>
                    <div className="text-sm">Sales: {point.data.sales}</div>
                    <div className="text-sm">Orders: {point.data.orders}</div>
                  </div>
                )}
                placement="top"
                // Adjust position for tall bars to avoid overlap
                offsetY={point.value > 70 ? -10 : 0}
              >
                <div
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-t w-8 transition-colors"
                  style={{ height: `${point.value}%` }}
                />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Aligned icon buttons with adjusted tooltips */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Toolbar with Position Adjustments</h3>
        <div className="inline-flex rounded-lg border border-gray-200 divide-x divide-gray-200">
          <Tooltip content="Bold" placement="top" nudgeLeft={20}>
            <button className="p-2 hover:bg-gray-100 font-bold">B</button>
          </Tooltip>
          <Tooltip content="Italic" placement="top" nudgeLeft={10}>
            <button className="p-2 hover:bg-gray-100 italic">I</button>
          </Tooltip>
          <Tooltip content="Underline" placement="top">
            <button className="p-2 hover:bg-gray-100 underline">U</button>
          </Tooltip>
          <Tooltip content="Strikethrough" placement="top" nudgeRight={10}>
            <button className="p-2 hover:bg-gray-100 line-through">S</button>
          </Tooltip>
          <Tooltip content="Code" placement="top" nudgeRight={20}>
            <button className="p-2 hover:bg-gray-100 font-mono text-sm">&lt;/&gt;</button>
          </Tooltip>
        </div>
        <p className="text-xs text-gray-500">
          Tooltips are nudged to avoid overlapping when shown close together
        </p>
      </div>
    </div>
  ),
}

const ControlledExampleComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [manualTooltip, setManualTooltip] = useState(false)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Controlled Tooltip Examples</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">External Controls</h4>
          <div className="flex items-center gap-4">
            <Tooltip
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              content="This tooltip is controlled by external buttons"
              trigger="manual"
            >
              <div className="px-4 py-2 bg-gray-100 rounded border">Controlled Tooltip Target</div>
            </Tooltip>

            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Show
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Hide
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Toggle
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Current state: {isOpen ? 'Open' : 'Closed'}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Manual Trigger with State</h4>
          <div className="flex items-center gap-4">
            <Tooltip
              isOpen={manualTooltip}
              onOpenChange={setManualTooltip}
              content="Manual tooltip with programmatic control"
              trigger="manual"
              status={manualTooltip ? 'success' : 'default'}
            >
              <button
                onClick={() => setManualTooltip(!manualTooltip)}
                className={`px-4 py-2 rounded transition-colors ${
                  manualTooltip
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                {manualTooltip ? 'Hide Tooltip' : 'Show Tooltip'}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ControlledExample: Story = {
  render: () => <ControlledExampleComponent />,
}
