import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import { cn } from '../../utils'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Popover is a floating element that displays rich content in a portal, positioned relative to a trigger element.
 *
 * ## Features
 * - **Compound Components**: Flexible structure with Trigger, Content, Arrow, Title, Description, and Close sub-components
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Triggers**: Click, hover, or manual control
 * - **Smart Positioning**: 12 placement options with auto-fallback positioning
 * - **Portal Rendering**: Content rendered to document.body or custom container
 * - **Focus Management**: Keyboard navigation and focus trapping support
 * - **Accessibility**: Full ARIA attributes and keyboard support
 * - **Rich Animations**: 5 animation types with customizable duration and easing
 * - **Extensive Styling**: 50+ style props for complete visual customization
 * - **Close Behaviors**: Multiple ways to dismiss (outside click, escape, blur)
 * - **Arrow Support**: Optional decorative arrow with smart positioning
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Popover>
 *   <Popover.Trigger>
 *     <button>Open Popover</button>
 *   </Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Title>Title</Popover.Title>
 *     <Popover.Description>Description content</Popover.Description>
 *   </Popover.Content>
 * </Popover>
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Popover open={open} onOpenChange={setOpen}>
 *   <Popover.Trigger>Open</Popover.Trigger>
 *   <Popover.Content>Content</Popover.Content>
 * </Popover>
 * ```
 *
 * ### With Arrow:
 * ```tsx
 * <Popover hasArrow>
 *   <Popover.Trigger>Trigger</Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Arrow />
 *     Content with arrow
 *   </Popover.Content>
 * </Popover>
 * ```
 *
 * ### Hover Trigger:
 * ```tsx
 * <Popover trigger="hover">
 *   <Popover.Trigger>Hover me</Popover.Trigger>
 *   <Popover.Content>Tooltip-like content</Popover.Content>
 * </Popover>
 * ```
 *
 * ## Portal Behavior
 * Content is rendered using React Portal to document.body by default. This ensures proper z-index stacking and prevents overflow issues.
 *
 * ## Positioning
 * Uses intelligent positioning that automatically adjusts when there's insufficient space, ensuring the popover stays visible within the viewport.
 *
 * ## Accessibility
 * - Full keyboard support (Enter, Space, Escape, Tab)
 * - ARIA attributes for screen readers
 * - Focus management and trapping
 * - Proper role and state announcements
 */
const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        type: { summary: 'boolean' },
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
    onOpenChange: {
      control: false,
      description: 'Callback when open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    position: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'auto',
      ],
      description: 'Position of the popover relative to trigger',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      description: 'How the popover is triggered',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'click' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'shadowed', 'filled', 'translucent', 'minimal'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the popover',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    tone: {
      control: 'select',
      options: ['light', 'dark', 'info', 'danger', 'success', 'warning'],
      description: 'Color tone for theming',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'light' },
      },
    },
    hasArrow: {
      control: 'boolean',
      description: 'Show decorative arrow',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    transition: {
      control: 'select',
      options: ['fade', 'scale', 'slide', 'pop', 'none'],
      description: 'Animation type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'fade' },
      },
    },
    enterDuration: {
      control: 'number',
      description: 'Enter animation duration in ms',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    exitDuration: {
      control: 'number',
      description: 'Exit animation duration in ms',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 150 },
      },
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Close when trigger loses focus',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when Escape key is pressed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Close when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    // Styling props
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Text color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Border width',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    boxShadow: {
      control: 'text',
      description: 'Box shadow',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
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
    // Fine-tuned positioning offsets
    offsetTop: {
      control: 'number',
      description: 'Additional top offset in pixels',
      table: {
        category: 'Positioning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    offsetBottom: {
      control: 'number',
      description: 'Additional bottom offset in pixels',
      table: {
        category: 'Positioning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    offsetLeft: {
      control: 'number',
      description: 'Additional left offset in pixels',
      table: {
        category: 'Positioning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    offsetRight: {
      control: 'number',
      description: 'Additional right offset in pixels',
      table: {
        category: 'Positioning',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },

    // Disable complex props in controls
    renderContent: { control: false },
    renderTrigger: { control: false },
    portalContainer: { control: false },
    initialFocus: { control: false },
    onClose: { control: false },
    onOpen: { control: false },
    onEscapeKeyDown: { control: false },
    onOutsideClick: { control: false },
    onAnimationStart: { control: false },
    onAnimationEnd: { control: false },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const PopoverWithState = ({
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof Popover> & { defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return <Popover {...props} open={open} onOpenChange={handleOpenChange} />
}

export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center py-20">
      <Popover {...args}>
        <Popover.Trigger>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Open Popover
          </button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Title>Popover Title</Popover.Title>
          <Popover.Description>This is a basic popover with default settings.</Popover.Description>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Default Popover (closed)</h3>
        <Popover>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-gray-500 text-white rounded">Click to Open</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Default Settings</Popover.Title>
            <Popover.Description>All default styles and behaviors applied</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Default Open</h3>
        <Popover defaultOpen>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Started Open</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Default Open</Popover.Title>
            <Popover.Description>This popover starts in an open state</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">With Close Button</h3>
        <Popover>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-green-500 text-white rounded">With Close</button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="flex items-start justify-between">
              <div>
                <Popover.Title>Dismissible</Popover.Title>
                <Popover.Description>Click the X to close</Popover.Description>
              </div>
              <Popover.Close className="ml-4 text-gray-400 hover:text-gray-600" />
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {(['default', 'bordered', 'shadowed', 'filled', 'translucent', 'minimal'] as const).map(
        (variant) => (
          <div key={variant} className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-4 capitalize">{variant}</h3>
            <Popover variant={variant}>
              <Popover.Trigger>
                <button className="px-4 py-2 bg-blue-500 text-white rounded capitalize">
                  {variant}
                </button>
              </Popover.Trigger>
              <Popover.Content>
                <Popover.Arrow />
                <Popover.Title>{variant} Variant</Popover.Title>
                <Popover.Description>This shows the {variant} visual style</Popover.Description>
              </Popover.Content>
            </Popover>
          </div>
        )
      )}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex justify-center gap-8 py-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="text-center">
          <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase">{size}</h3>
          <Popover size={size}>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-purple-500 text-white rounded uppercase">
                {size}
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Size {size.toUpperCase()}</Popover.Title>
              <Popover.Description>
                This popover uses the {size} size configuration
              </Popover.Description>
            </Popover.Content>
          </Popover>
        </div>
      ))}
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8 items-center">
        {/* Top row */}
        <Popover position="top-start">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-blue-500 text-white rounded text-xs">Top Start</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Top Start</Popover.Title>
          </Popover.Content>
        </Popover>

        <Popover position="top">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-blue-500 text-white rounded text-xs">Top</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Top</Popover.Title>
          </Popover.Content>
        </Popover>

        <Popover position="top-end">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-blue-500 text-white rounded text-xs">Top End</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Top End</Popover.Title>
          </Popover.Content>
        </Popover>

        {/* Middle row */}
        <Popover position="left">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-green-500 text-white rounded text-xs">Left</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Left</Popover.Title>
          </Popover.Content>
        </Popover>

        <div className="flex items-center justify-center">
          <span className="text-gray-500 text-sm">Center Reference</span>
        </div>

        <Popover position="right">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-green-500 text-white rounded text-xs">Right</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Right</Popover.Title>
          </Popover.Content>
        </Popover>

        {/* Bottom row */}
        <Popover position="bottom-start">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-red-500 text-white rounded text-xs">
              Bottom Start
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Bottom Start</Popover.Title>
          </Popover.Content>
        </Popover>

        <Popover position="bottom">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-red-500 text-white rounded text-xs">Bottom</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Bottom</Popover.Title>
          </Popover.Content>
        </Popover>

        <Popover position="bottom-end">
          <Popover.Trigger>
            <button className="px-3 py-2 bg-red-500 text-white rounded text-xs">Bottom End</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Bottom End</Popover.Title>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  ),
}

export const TriggerModes: Story = {
  render: () => (
    <div className="flex justify-center gap-8 py-8">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Click Trigger</h3>
        <Popover trigger="click">
          <Popover.Trigger>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Click Me</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Click Triggered</Popover.Title>
            <Popover.Description>Opens when clicked</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Hover Trigger</h3>
        <Popover trigger="hover">
          <Popover.Trigger>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Hover Me</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Hover Triggered</Popover.Title>
            <Popover.Description>Opens on mouse hover</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Manual Control</h3>
        <PopoverWithState trigger="manual" defaultOpen>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-purple-500 text-white rounded">Manual Control</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Manual Control</Popover.Title>
            <Popover.Description>Controlled programmatically</Popover.Description>
            <div className="mt-3">
              <Popover.Close className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                Close
              </Popover.Close>
            </div>
          </Popover.Content>
        </PopoverWithState>
      </div>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {(['light', 'dark', 'info', 'success', 'warning', 'danger'] as const).map((tone) => (
        <div key={tone} className="text-center">
          <h3 className="text-sm font-medium text-gray-700 mb-4 capitalize">{tone}</h3>
          <Popover tone={tone}>
            <Popover.Trigger>
              <button
                className={cn(
                  'px-4 py-2 text-white rounded capitalize',
                  tone === 'light' && 'bg-gray-500',
                  tone === 'dark' && 'bg-gray-900',
                  tone === 'info' && 'bg-blue-500',
                  tone === 'success' && 'bg-green-500',
                  tone === 'warning' && 'bg-yellow-500',
                  tone === 'danger' && 'bg-red-500'
                )}
              >
                {tone}
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>{tone} Tone</Popover.Title>
              <Popover.Description>This popover uses the {tone} color theme</Popover.Description>
            </Popover.Content>
          </Popover>
        </div>
      ))}
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {(['fade', 'scale', 'slide', 'pop', 'none'] as const).map((transition) => (
        <div key={transition} className="text-center">
          <h3 className="text-sm font-medium text-gray-700 mb-4 capitalize">{transition}</h3>
          <Popover transition={transition}>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded capitalize">
                {transition}
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>{transition} Animation</Popover.Title>
              <Popover.Description>Uses {transition} transition effect</Popover.Description>
            </Popover.Content>
          </Popover>
        </div>
      ))}
    </div>
  ),
}

export const ControlledVsUncontrolled: Story = {
  render: () => (
    <div className="flex justify-center gap-8 py-8">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Uncontrolled</h3>
        <Popover>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Uncontrolled</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Uncontrolled Popover</Popover.Title>
            <Popover.Description>Manages its own open/close state internally</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Controlled</h3>
        <PopoverWithState>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Controlled</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Controlled Popover</Popover.Title>
            <Popover.Description>State managed by parent component</Popover.Description>
            <div className="mt-3 flex gap-2">
              <Popover.Close className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                Close
              </Popover.Close>
            </div>
          </Popover.Content>
        </PopoverWithState>
      </div>
    </div>
  ),
}

export const WithoutArrow: Story = {
  render: () => (
    <div className="flex justify-center gap-8 py-8">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">With Arrow</h3>
        <Popover hasArrow>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">With Arrow</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Has Arrow</Popover.Title>
            <Popover.Description>Shows decorative arrow</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Without Arrow</h3>
        <Popover hasArrow={false}>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-gray-500 text-white rounded">No Arrow</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>No Arrow</Popover.Title>
            <Popover.Description>Clean design without arrow</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 py-8">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Custom Colors</h3>
        <Popover
          backgroundColor="#f3e8ff"
          textColor="#6b21a8"
          borderColor="#c084fc"
          borderWidth="2px"
          arrowColor="#f3e8ff"
        >
          <Popover.Trigger>
            <button className="px-4 py-2 bg-purple-500 text-white rounded">Purple Theme</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Custom Purple</Popover.Title>
            <Popover.Description>Custom purple color scheme</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Custom Shape</h3>
        <Popover
          borderRadius="4px"
          padding="1.5rem"
          boxShadow="0 10px 25px rgba(0,0,0,0.15)"
          arrowSize="12px"
        >
          <Popover.Trigger>
            <button className="px-4 py-2 bg-teal-500 text-white rounded">Square Style</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Square Design</Popover.Title>
            <Popover.Description>Custom padding and sharp corners</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Gradient Border</h3>
        <Popover
          borderWidth="3px"
          borderColor="transparent"
          style={{
            background:
              'linear-gradient(white, white) padding-box, linear-gradient(45deg, #3b82f6, #8b5cf6) border-box',
          }}
        >
          <Popover.Trigger>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded">
              Gradient
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Gradient Border</Popover.Title>
            <Popover.Description>Fancy gradient border effect</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Typography</h3>
        <Popover fontSize="14px" fontWeight="500" headingColor="#1f2937" descriptionColor="#6b7280">
          <Popover.Trigger>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Custom Text</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Custom Typography</Popover.Title>
            <Popover.Description>Custom font sizes and colors for text content</Popover.Description>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  ),
}

export const FocusTrapDemo: Story = {
  render: () => (
    <div className="text-center py-8">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Focus Management Demo</h3>
      <p className="text-sm text-gray-600 mb-6">
        This popover demonstrates focus trapping and keyboard navigation
      </p>
      <Popover>
        <Popover.Trigger>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Open Form Popover</button>
        </Popover.Trigger>
        <Popover.Content className="w-80">
          <Popover.Arrow />
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <Popover.Title>User Information</Popover.Title>
              <Popover.Close className="text-gray-400 hover:text-gray-600" />
            </div>

            <Popover.Description>
              Fill out the form below. Use Tab to navigate between fields.
            </Popover.Description>

            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Submit
                </button>
                <Popover.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </Popover.Close>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-12 py-8">
      {/* User Profile Menu */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Profile Menu</h3>
        <Popover position="bottom-end">
          <Popover.Trigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </Popover.Trigger>
          <Popover.Content className="w-64 p-0">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-gray-500">john@example.com</div>
                </div>
              </div>
            </div>
            <div className="py-2">
              {[
                { icon: '👤', label: 'Profile' },
                { icon: '⚙️', label: 'Settings' },
                { icon: '💳', label: 'Billing' },
                { icon: '🎨', label: 'Theme' },
                { icon: '📊', label: 'Analytics' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
              <hr className="my-2" />
              <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-red-600">
                <span>🚪</span>
                <span className="text-sm">Sign out</span>
              </button>
            </div>
          </Popover.Content>
        </Popover>
      </div>

      {/* Help Tooltip */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Help Tooltip</h3>
        <div className="inline-flex items-center gap-2">
          <span>API Key</span>
          <Popover trigger="hover" hasArrow={false} variant="minimal" size="sm">
            <Popover.Trigger>
              <button className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center hover:bg-gray-500">
                ?
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Description>
                Your API key is used to authenticate requests to our API. Keep it secure and
                don&apos;t share it publicly.
              </Popover.Description>
            </Popover.Content>
          </Popover>
        </div>
      </div>

      {/* Command Menu */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Command Menu</h3>
        <Popover size="lg">
          <Popover.Trigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search commands...
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">⌘K</span>
            </button>
          </Popover.Trigger>
          <Popover.Content className="w-96 p-0">
            <div className="p-3 border-b">
              <input
                type="text"
                placeholder="Type a command or search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="py-2 max-h-64 overflow-y-auto">
              {[
                { category: 'Actions', items: ['Create new file', 'Open project', 'Save all'] },
                { category: 'Navigation', items: ['Go to file', 'Go to line', 'Go to symbol'] },
                {
                  category: 'Tools',
                  items: ['Format document', 'Find and replace', 'Toggle terminal'],
                },
              ].map((group) => (
                <div key={group.category}>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {group.category}
                  </div>
                  {group.items.map((item) => (
                    <button
                      key={item}
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-blue-50 text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover>
      </div>

      {/* Emoji Picker */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Emoji Picker</h3>
        <Popover>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-2xl">
              😀
            </button>
          </Popover.Trigger>
          <Popover.Content className="w-64 p-0">
            <div className="p-3 border-b">
              <Popover.Title>Choose an emoji</Popover.Title>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-8 gap-1">
                {[
                  '😀',
                  '😃',
                  '😄',
                  '😁',
                  '😅',
                  '😂',
                  '🤣',
                  '😊',
                  '😇',
                  '🙂',
                  '🙃',
                  '😉',
                  '😌',
                  '😍',
                  '🥰',
                  '😘',
                  '😗',
                  '😙',
                  '😚',
                  '😋',
                  '😛',
                  '😝',
                  '😜',
                  '🤪',
                  '🤨',
                  '🧐',
                  '🤓',
                  '😎',
                  '🤩',
                  '🥳',
                  '😏',
                  '😒',
                ].map((emoji) => (
                  <button
                    key={emoji}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  ),
}

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility Features</h3>
        <p className="text-sm text-gray-600 mb-6">
          All popovers are fully accessible with keyboard navigation, ARIA attributes, and screen
          reader support.
        </p>
      </div>

      <div className="flex justify-center gap-8">
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Keyboard Navigation</h4>
          <Popover>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-blue-500 text-white rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Tab to Focus
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Keyboard Accessible</Popover.Title>
              <Popover.Description>
                Use Tab to focus, Enter/Space to open, Escape to close
              </Popover.Description>
            </Popover.Content>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Screen Reader Support</h4>
          <Popover>
            <Popover.Trigger>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                aria-label="Open user settings popover"
              >
                Settings
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>User Settings</Popover.Title>
              <Popover.Description>
                This popover has proper ARIA attributes for screen readers
              </Popover.Description>
            </Popover.Content>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Focus Management</h4>
          <Popover returnFocus>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-purple-500 text-white rounded">Focus Returns</button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Focus Management</Popover.Title>
              <Popover.Description>Focus returns to trigger when closed</Popover.Description>
              <div className="mt-3">
                <Popover.Close className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                  Close and Return Focus
                </Popover.Close>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </div>
  ),
}

export const OffsetExample: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Positioning Offsets</h3>
        <p className="text-sm text-gray-600 mb-6">
          Fine-tune popover positioning with individual offset values
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Default Position</h4>
          <Popover>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Default</button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Default Position</Popover.Title>
              <Popover.Description>Standard positioning without offsets</Popover.Description>
            </Popover.Content>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">With Left Offset</h4>
          <Popover offsetLeft={20}>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-green-500 text-white rounded">Left +20px</button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Left Offset</Popover.Title>
              <Popover.Description>Moved 20px to the left</Popover.Description>
            </Popover.Content>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">With Top Offset</h4>
          <Popover offsetTop={15}>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-purple-500 text-white rounded">Top +15px</button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Top Offset</Popover.Title>
              <Popover.Description>Moved 15px up from default position</Popover.Description>
            </Popover.Content>
          </Popover>
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Multiple Offsets</h4>
          <Popover offsetTop={10} offsetLeft={15} offsetBottom={5}>
            <Popover.Trigger>
              <button className="px-4 py-2 bg-red-500 text-white rounded">Multiple</button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Title>Multiple Offsets</Popover.Title>
              <Popover.Description>Top +10px, Left +15px, Bottom +5px</Popover.Description>
            </Popover.Content>
          </Popover>
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Right Position with Right Offset</h4>
        <Popover position="right" offsetRight={25}>
          <Popover.Trigger>
            <button className="px-4 py-2 bg-teal-500 text-white rounded">Right +25px</button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Right Offset</Popover.Title>
            <Popover.Description>
              Positioned to the right with additional 25px offset
            </Popover.Description>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  ),
}

export const NestedPopover: Story = {
  render: () => (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Nested Popovers</h3>
      <p className="text-sm text-gray-600 mb-6">
        Popovers can be nested within each other for complex interactions
      </p>

      <Popover>
        <Popover.Trigger>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Open Main Menu</button>
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Arrow />
          <div className="space-y-3">
            <Popover.Title>Main Menu</Popover.Title>
            <Popover.Description>Choose an option below:</Popover.Description>

            <div className="space-y-2">
              <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded">
                Settings
              </button>

              <Popover position="right">
                <Popover.Trigger asChild>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center justify-between">
                    More Options
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Popover.Trigger>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Title>Sub Menu</Popover.Title>
                  <div className="space-y-2 mt-3">
                    <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded text-sm">
                      Advanced Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded text-sm">
                      Export Data
                    </button>
                    <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded text-sm">
                      Reset to Defaults
                    </button>
                  </div>
                </Popover.Content>
              </Popover>

              <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded">Help</button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Popover).
      </p>
      <LivePlayground
        code={`<Popover>
  <Popover.Trigger>
    <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Open Popover</button>
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Title>Title</Popover.Title>
    <Popover.Description>Description</Popover.Description>
  </Popover.Content>
</Popover>`}
      />
    </div>
  ),
  args: {},
}
