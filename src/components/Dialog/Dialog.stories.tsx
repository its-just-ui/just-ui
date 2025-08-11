import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './Dialog'
import LivePlayground from '../../../.storybook/components/LivePlayground'

// Wrapper component for controlled state management
const DialogWithState = ({
  children,
  defaultOpen = false,
  onOpenChange,
  triggerText = 'Open Dialog',
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'> & {
  children?: React.ReactNode
  defaultOpen?: boolean
  triggerText?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [open, setOpen] = useState(defaultOpen)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {triggerText}
      </button>
      <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
        {children}
      </Dialog>
    </>
  )
}

/**
 * Dialog is a modal overlay component that displays content in a layer above the page with extensive customization options.
 *
 * ## Features
 * - **Multiple Variants**: 5 visual styles (default, filled, outlined, ghost, glass)
 * - **Flexible Sizing**: 5 size options from small to full screen (sm, md, lg, xl, full)
 * - **Position Control**: Center, top, bottom, left, or right positioning
 * - **Smooth Transitions**: Multiple animation types (fade, slide, scale) with customizable duration
 * - **Status States**: Built-in semantic styles for success, warning, error, and info states
 * - **Compound Components**: Use DialogHeader, DialogBody, DialogFooter for structured layouts
 * - **Extensive Styling**: Over 50 style props for complete visual customization
 * - **Custom Colors**: Dedicated props for backdrop and background colors
 * - **Interaction Control**: Options for modal behavior, ESC key, and overlay click handling
 * - **Accessibility First**: Full ARIA support, focus management, and keyboard navigation
 * - **Custom Rendering**: Override any part of the dialog with custom render functions
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * const [open, setOpen] = useState(false)
 *
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogHeader>
 *     <DialogTitle>Dialog Title</DialogTitle>
 *     <DialogDescription>Dialog description goes here.</DialogDescription>
 *   </DialogHeader>
 *   <DialogBody>
 *     Content goes here...
 *   </DialogBody>
 *   <DialogFooter>
 *     <button onClick={() => setOpen(false)}>Close</button>
 *   </DialogFooter>
 * </Dialog>
 * ```
 *
 * ### Simple Dialog:
 * ```tsx
 * <Dialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 * >
 *   <div className="flex gap-2 justify-end mt-4">
 *     <button onClick={() => setOpen(false)}>Cancel</button>
 *     <button onClick={handleConfirm}>Confirm</button>
 *   </div>
 * </Dialog>
 * ```
 *
 * ### Custom Styled Dialog:
 * ```tsx
 * <Dialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   variant="glass"
 *   size="lg"
 *   customStyles={{
 *     backgroundColor: 'rgba(255, 255, 255, 0.95)',
 *     borderRadius: '24px',
 *     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
 *   }}
 * >
 *   <DialogContent>...</DialogContent>
 * </Dialog>
 * ```
 *
 * ### Non-Modal Dialog:
 * ```tsx
 * <Dialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   modal={false}
 *   closeOnOverlayClick={false}
 *   position="bottom"
 * >
 *   <DialogBody>
 *     Non-modal content that doesn't block interaction
 *   </DialogBody>
 * </Dialog>
 * ```
 */
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        inline: false,
        height: '500px',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // State props
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the dialog',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      control: false,
      description: 'Callback when dialog open state changes',
      table: {
        category: 'State',
        type: { summary: '(open: boolean) => void' },
      },
    },

    // Core props
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'ghost', 'glass'],
      description: 'Visual style variant of the dialog',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the dialog',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status state for semantic styling',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    position: {
      control: 'select',
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Position of the dialog on screen',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable dialog interactions',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
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

    // Position offset props
    offsetX: {
      control: 'text',
      description: 'Horizontal offset from position',
      table: {
        category: 'Position',
        type: { summary: 'string | number' },
      },
    },
    offsetY: {
      control: 'text',
      description: 'Vertical offset from position',
      table: {
        category: 'Position',
        type: { summary: 'string | number' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the dialog',
      table: {
        category: 'Position',
        type: { summary: 'string | number' },
      },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the dialog',
      table: {
        category: 'Position',
        type: { summary: 'string | number' },
      },
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the dialog',
      table: {
        category: 'Position',
        type: { summary: 'string | number' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the dialog',
      table: {
        category: 'Position',
        type: { summary: 'string | number' },
      },
    },

    // Behavior props
    modal: {
      control: 'boolean',
      description: 'Whether the dialog is modal (blocks interaction with page)',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Close dialog when ESC key is pressed',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close dialog when clicking outside',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    preventScroll: {
      control: 'boolean',
      description: 'Prevent body scroll when dialog is open',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    container: {
      control: false,
      description: 'Container element to portal the dialog to',
      table: {
        category: 'Behavior',
        type: { summary: 'HTMLElement | null' },
      },
    },

    // Content props
    title: {
      control: 'text',
      description: 'Title content for the dialog',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: 'Description content for the dialog',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    children: {
      control: false,
      description: 'Main content of the dialog',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessibility label for the dialog',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text for screen readers',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    // Animation props
    transition: {
      control: 'select',
      options: ['fade', 'slide', 'scale', 'none'],
      description: 'Type of transition animation',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
        defaultValue: { summary: 'scale' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transition in milliseconds',
      table: {
        category: 'Animation',
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },

    // Styling props
    backdropColor: {
      control: 'color',
      description: 'Custom color for the backdrop/overlay',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color for the dialog',
      table: {
        category: 'Styling',
        type: { summary: 'string' },
      },
    },

    // Custom styles
    customStyles: {
      control: 'object',
      description: 'Custom styling options for the dialog',
      table: {
        category: 'Custom Styles',
        type: { summary: 'DialogCustomStyles' },
      },
    },

    // Event handlers
    onClose: {
      control: false,
      description: 'Callback when dialog is closed',
      table: {
        category: 'Event Handlers',
        type: { summary: '() => void' },
      },
    },
    onEscapeKeyDown: {
      control: false,
      description: 'Callback when ESC key is pressed',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: KeyboardEvent) => void' },
      },
    },
    onOverlayClick: {
      control: false,
      description: 'Callback when overlay is clicked',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },

    // Custom render functions
    renderOverlay: {
      control: false,
      description: 'Custom render function for overlay',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: DialogOverlayProps) => React.ReactNode' },
      },
    },
    renderContent: {
      control: false,
      description: 'Custom render function for content',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: DialogContentProps) => React.ReactNode' },
      },
    },
    renderHeader: {
      control: false,
      description: 'Custom render function for header',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: DialogHeaderProps) => React.ReactNode' },
      },
    },
    renderBody: {
      control: false,
      description: 'Custom render function for body',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: DialogBodyProps) => React.ReactNode' },
      },
    },
    renderFooter: {
      control: false,
      description: 'Custom render function for footer',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: DialogFooterProps) => React.ReactNode' },
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
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <DialogWithState {...args} />,
  args: {
    title: 'Dialog Title',
    description: 'This is a dialog description that provides context.',
    children: (
      <div className="py-4">
        <p className="text-gray-600">
          This is the main content of the dialog. You can put any content here.
        </p>
      </div>
    ),
    // Required props for the underlying Dialog component
    open: false,
    onOpenChange: () => {},
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Dialog (minimal props)</h3>
        <DialogWithState>
          <DialogBody>
            <p>This is a basic dialog with default styling.</p>
          </DialogBody>
        </DialogWithState>
        <p className="text-xs text-gray-500 mt-2">All default styles applied</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Title and Description</h3>
        <DialogWithState
          title="Welcome"
          description="This dialog demonstrates the title and description props."
          triggerText="Open Welcome Dialog"
        >
          <p className="py-4">Additional content goes here.</p>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Structured Content</h3>
        <DialogWithState triggerText="Open Structured Dialog">
          <DialogHeader>
            <DialogTitle>Structured Dialog</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogBody>
            <p>This dialog uses compound components for structure.</p>
          </DialogBody>
          <DialogFooter>
            <button className="px-3 py-1 text-sm border rounded">Cancel</button>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Save</button>
          </DialogFooter>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Helper Text</h3>
        <DialogWithState
          title="Accessible Dialog"
          helperText="This dialog includes helper text for screen readers"
          triggerText="Open Accessible Dialog"
        >
          <p className="py-4">Content with accessibility features.</p>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <DialogWithState variant="default" title="Default Variant">
          <DialogBody>
            <p>Standard dialog with subtle shadow and border.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <DialogWithState variant="filled" title="Filled Variant" triggerText="Open Filled Dialog">
          <DialogBody>
            <p>Dark background with high contrast for emphasis.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <DialogWithState
          variant="outlined"
          title="Outlined Variant"
          triggerText="Open Outlined Dialog"
        >
          <DialogBody>
            <p>Strong border with clean appearance.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Ghost</h3>
        <DialogWithState variant="ghost" title="Ghost Variant" triggerText="Open Ghost Dialog">
          <DialogBody>
            <p>Minimal styling with subtle backdrop blur.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Glass</h3>
        <DialogWithState variant="glass" title="Glass Variant" triggerText="Open Glass Dialog">
          <DialogBody>
            <p>Glassmorphism effect with transparency and blur.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Small</h3>
        <DialogWithState size="sm" title="Small Dialog" triggerText="Open Small">
          <DialogBody>
            <p>Compact size for brief messages.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Medium (Default)</h3>
        <DialogWithState size="md" title="Medium Dialog" triggerText="Open Medium">
          <DialogBody>
            <p>Standard size for most use cases.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Large</h3>
        <DialogWithState size="lg" title="Large Dialog" triggerText="Open Large">
          <DialogBody>
            <p>More space for complex content and forms.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Extra Large</h3>
        <DialogWithState size="xl" title="Extra Large Dialog" triggerText="Open Extra Large">
          <DialogBody>
            <p>Maximum width while maintaining margins.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Full Screen</h3>
        <DialogWithState size="full" title="Full Screen Dialog" triggerText="Open Full Screen">
          <DialogBody>
            <p>Takes up the entire viewport.</p>
          </DialogBody>
          <DialogFooter>
            <button className="px-4 py-2 bg-gray-200 rounded">Close</button>
          </DialogFooter>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const Positions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Center (Default)</h3>
        <DialogWithState position="center" title="Centered Dialog">
          <DialogBody>
            <p>Appears in the center of the viewport.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Top</h3>
        <DialogWithState
          position="top"
          title="Top Dialog"
          transition="slide"
          triggerText="Open at Top"
        >
          <DialogBody>
            <p>Slides down from the top of the screen.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Bottom</h3>
        <DialogWithState
          position="bottom"
          title="Bottom Dialog"
          transition="slide"
          triggerText="Open at Bottom"
        >
          <DialogBody>
            <p>Slides up from the bottom of the screen.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Left</h3>
        <DialogWithState position="left" size="sm" title="Left Dialog" triggerText="Open at Left">
          <DialogBody>
            <p>Appears on the left side as a sidebar.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Right</h3>
        <DialogWithState
          position="right"
          size="sm"
          title="Right Dialog"
          triggerText="Open at Right"
        >
          <DialogBody>
            <p>Appears on the right side as a sidebar.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <DialogWithState status="default" title="Default Status">
          <DialogBody>
            <p>Standard neutral styling.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <DialogWithState status="success" title="✅ Success!" triggerText="Open Success Dialog">
          <DialogBody>
            <p className="text-green-700">Operation completed successfully.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <DialogWithState status="warning" title="⚠️ Warning" triggerText="Open Warning Dialog">
          <DialogBody>
            <p className="text-yellow-700">Please review this information carefully.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <DialogWithState status="error" title="❌ Error" triggerText="Open Error Dialog">
          <DialogBody>
            <p className="text-red-700">Something went wrong. Please try again.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Info Status</h3>
        <DialogWithState status="info" title="ℹ️ Information" triggerText="Open Info Dialog">
          <DialogBody>
            <p className="text-blue-700">Here&apos;s some helpful information for you.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Normal State</h3>
        <DialogWithState title="Normal Dialog">
          <DialogBody>
            <p>Standard interactive dialog.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled State</h3>
        <DialogWithState disabled title="Disabled Dialog" triggerText="Open Disabled Dialog">
          <DialogBody>
            <p>This dialog has disabled interactions.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading State</h3>
        <DialogWithState loading title="Loading Dialog" triggerText="Open Loading Dialog">
          <DialogBody>
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <p>Loading content...</p>
            </div>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required State</h3>
        <DialogWithState required title="Required Dialog" triggerText="Open Required Dialog">
          <DialogBody>
            <p>This dialog is marked as required.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const BehaviorOptions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Non-Modal Dialog</h3>
        <DialogWithState modal={false} title="Non-Modal Dialog" triggerText="Open Non-Modal">
          <DialogBody>
            <p>You can still interact with the page behind this dialog.</p>
          </DialogBody>
        </DialogWithState>
        <p className="text-xs text-gray-500 mt-1">Page interaction is not blocked</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Close on Escape</h3>
        <DialogWithState closeOnEsc={false} title="No ESC Close" triggerText="Open No ESC">
          <DialogBody>
            <p>Pressing ESC key won&apos;t close this dialog.</p>
            <p className="text-sm text-gray-500 mt-2">Use the close button or click outside.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Close on Overlay Click</h3>
        <DialogWithState
          closeOnOverlayClick={false}
          title="No Overlay Close"
          triggerText="Open No Overlay Click"
        >
          <DialogBody>
            <p>Clicking outside won&apos;t close this dialog.</p>
            <p className="text-sm text-gray-500 mt-2">Use the close button or ESC key.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fully Persistent</h3>
        <DialogWithState
          closeOnEsc={false}
          closeOnOverlayClick={false}
          title="Persistent Dialog"
          triggerText="Open Persistent"
        >
          <DialogHeader>
            <DialogTitle>Persistent Dialog</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogBody>
            <p>This dialog can only be closed using the close button.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Scale Transition (Default)</h3>
        <DialogWithState transition="scale" title="Scale Transition">
          <DialogBody>
            <p>Scales in and out from the center.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fade Transition</h3>
        <DialogWithState transition="fade" title="Fade Transition" triggerText="Open Fade">
          <DialogBody>
            <p>Fades in and out smoothly.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slide Transition</h3>
        <DialogWithState
          transition="slide"
          position="bottom"
          title="Slide Transition"
          triggerText="Open Slide"
        >
          <DialogBody>
            <p>Slides in from the bottom (works with position).</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Transition</h3>
        <DialogWithState transition="none" title="No Transition" triggerText="Open Instant">
          <DialogBody>
            <p>Appears and disappears instantly.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slow Transition</h3>
        <DialogWithState
          transition="scale"
          transitionDuration={600}
          title="Slow Transition"
          triggerText="Open Slow"
        >
          <DialogBody>
            <p>600ms transition duration.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <DialogWithState
          customStyles={{
            backgroundColor: '#fef3c7',
            borderColor: '#f59e0b',
            textColor: '#92400e',
          }}
          title="Custom Colors"
          triggerText="Open Custom Colors"
        >
          <DialogBody>
            <p>This dialog uses custom color styling.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rounded Corners</h3>
        <DialogWithState
          customStyles={{
            borderRadius: '24px',
            backgroundColor: '#dbeafe',
            borderColor: '#3b82f6',
          }}
          title="Rounded Dialog"
          triggerText="Open Rounded"
        >
          <DialogBody>
            <p>This dialog has custom border radius.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Shadow</h3>
        <DialogWithState
          customStyles={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
          }}
          title="Shadow Dialog"
          triggerText="Open Shadow"
        >
          <DialogBody>
            <p>This dialog has a dramatic shadow.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Padding</h3>
        <DialogWithState
          customStyles={{
            contentStyles: { padding: '0' },
            headerStyles: { padding: '32px 32px 16px' },
            bodyStyles: { padding: '0 32px 32px' },
          }}
          title="Custom Spacing"
          triggerText="Open Custom Padding"
        >
          <DialogBody>
            <p>This dialog has custom padding values.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Gradient Background</h3>
        <DialogWithState
          variant="filled"
          customStyles={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textColor: 'white',
          }}
          title="Gradient Dialog"
          triggerText="Open Gradient"
        >
          <DialogBody>
            <p className="text-white">This dialog has a gradient background.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Backdrop Color</h3>
        <DialogWithState
          backdropColor="rgba(0, 0, 255, 0.3)"
          title="Blue Backdrop"
          triggerText="Open Blue Backdrop"
        >
          <DialogBody>
            <p>This dialog has a blue semi-transparent backdrop.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Background Color</h3>
        <DialogWithState
          backgroundColor="#f3f4f6"
          title="Gray Background"
          triggerText="Open Gray Background"
        >
          <DialogBody>
            <p>This dialog has a custom gray background color.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Gradient Background</h3>
        <DialogWithState
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          title="Gradient Dialog"
          triggerText="Open Gradient Dialog"
        >
          <DialogBody>
            <p className="text-white">This dialog has a gradient background.</p>
          </DialogBody>
          <DialogFooter>
            <button className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30">
              Close
            </button>
          </DialogFooter>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Dark Theme</h3>
        <DialogWithState
          backdropColor="rgba(0, 0, 0, 0.8)"
          backgroundColor="#1f2937"
          title="Dark Theme Dialog"
          triggerText="Open Dark Dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gray-100">Dark Theme Dialog</DialogTitle>
            <DialogDescription className="text-gray-400">
              Custom dark colors for backdrop and background
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-gray-300">This dialog uses dark theme colors throughout.</p>
          </DialogBody>
          <DialogFooter className="border-gray-700">
            <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
              Confirm
            </button>
          </DialogFooter>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Transparent Backdrop</h3>
        <DialogWithState
          backdropColor="transparent"
          backgroundColor="white"
          variant="outlined"
          title="No Backdrop"
          triggerText="Open Transparent Backdrop"
        >
          <DialogBody>
            <p>This dialog has a transparent backdrop (no overlay).</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const CompoundComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Full Structure</h3>
        <DialogWithState triggerText="Open Full Structure">
          <DialogHeader>
            <div className="pr-6">
              <DialogTitle>Complete Dialog Structure</DialogTitle>
              <DialogDescription>
                This shows all compound components working together.
              </DialogDescription>
            </div>
            <DialogClose />
          </DialogHeader>
          <DialogBody>
            <p>The body content goes here with proper spacing and scrolling.</p>
            <p className="mt-4">Additional paragraphs maintain consistent spacing.</p>
          </DialogBody>
          <DialogFooter>
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
            <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              Confirm
            </button>
          </DialogFooter>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Header Only</h3>
        <DialogWithState triggerText="Open Header Only">
          <DialogHeader>
            <DialogTitle>Header Only Dialog</DialogTitle>
            <DialogClose />
          </DialogHeader>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Body Only</h3>
        <DialogWithState triggerText="Open Body Only">
          <DialogBody>
            <h2 className="text-xl font-semibold mb-2">Simple Content</h2>
            <p>Dialog with just body content, no header or footer.</p>
          </DialogBody>
        </DialogWithState>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Close Button</h3>
        <DialogWithState triggerText="Open Custom Close">
          <DialogHeader>
            <DialogTitle>Custom Close Button</DialogTitle>
            <DialogClose className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-xl">&times;</span>
            </DialogClose>
          </DialogHeader>
          <DialogBody>
            <p>The close button can be customized.</p>
          </DialogBody>
        </DialogWithState>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const FormDialog: Story = {
  render: () => {
    const FormDialogExample = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      })
      const [open, setOpen] = useState(false)

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        setOpen(false)
        // Reset form
        setFormData({ name: '', email: '', message: '' })
      }

      return (
        <>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Contact Form
          </button>
          <Dialog open={open} onOpenChange={setOpen} size="lg">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
                <DialogDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </DialogDescription>
                <DialogClose />
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send Message
                </button>
              </DialogFooter>
            </form>
          </Dialog>
        </>
      )
    }

    return <FormDialogExample />
  },
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const ConfirmationDialog: Story = {
  render: () => {
    const ConfirmDialogExample = () => {
      const [open, setOpen] = useState(false)
      const [action, setAction] = useState<'delete' | 'save' | 'discard' | null>(null)

      const handleConfirm = () => {
        console.log(`Confirmed action: ${action}`)
        setOpen(false)
        setAction(null)
      }

      const openDialog = (actionType: 'delete' | 'save' | 'discard') => {
        setAction(actionType)
        setOpen(true)
      }

      const getDialogContent = () => {
        switch (action) {
          case 'delete':
            return {
              title: '⚠️ Delete Item',
              description:
                'Are you sure you want to delete this item? This action cannot be undone.',
              status: 'error' as const,
              confirmText: 'Delete',
              confirmClass: 'bg-red-500 hover:bg-red-600',
            }
          case 'save':
            return {
              title: '💾 Save Changes',
              description: 'Do you want to save your changes before leaving?',
              status: 'info' as const,
              confirmText: 'Save',
              confirmClass: 'bg-blue-500 hover:bg-blue-600',
            }
          case 'discard':
            return {
              title: '🗑️ Discard Changes',
              description: 'Are you sure you want to discard all unsaved changes?',
              status: 'warning' as const,
              confirmText: 'Discard',
              confirmClass: 'bg-yellow-500 hover:bg-yellow-600',
            }
          default:
            return {
              title: 'Confirm',
              description: 'Are you sure?',
              status: 'default' as const,
              confirmText: 'Confirm',
              confirmClass: 'bg-gray-500 hover:bg-gray-600',
            }
        }
      }

      const content = getDialogContent()

      return (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => openDialog('delete')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Item
            </button>
            <button
              onClick={() => openDialog('save')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => openDialog('discard')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Discard Changes
            </button>
          </div>

          <Dialog open={open} onOpenChange={setOpen} size="sm" status={content.status}>
            <DialogHeader>
              <DialogTitle>{content.title}</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogBody>
              <p>{content.description}</p>
            </DialogBody>
            <DialogFooter>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 text-sm text-white rounded ${content.confirmClass}`}
              >
                {content.confirmText}
              </button>
            </DialogFooter>
          </Dialog>
        </div>
      )
    }

    return <ConfirmDialogExample />
  },
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const ImageGalleryDialog: Story = {
  render: () => {
    const ImageGalleryExample = () => {
      const [open, setOpen] = useState(false)
      const [selectedImage, setSelectedImage] = useState(0)

      const images = [
        'https://via.placeholder.com/800x600/FF6B6B/FFFFFF?text=Image+1',
        'https://via.placeholder.com/800x600/4ECDC4/FFFFFF?text=Image+2',
        'https://via.placeholder.com/800x600/45B7D1/FFFFFF?text=Image+3',
        'https://via.placeholder.com/800x600/96CEB4/FFFFFF?text=Image+4',
      ]

      return (
        <>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Gallery
          </button>
          <Dialog
            open={open}
            onOpenChange={setOpen}
            size="xl"
            variant="ghost"
            customStyles={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              padding: '0',
            }}
          >
            <DialogHeader customStyles={{ borderColor: 'transparent', background: 'transparent' }}>
              <DialogTitle className="text-white">Image Gallery</DialogTitle>
              <DialogClose className="text-white hover:bg-white/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </DialogClose>
            </DialogHeader>
            <DialogBody customStyles={{ padding: '0' }}>
              <div className="relative">
                <img
                  src={images[selectedImage]}
                  alt={`Gallery image ${selectedImage + 1}`}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedImage ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </DialogBody>
          </Dialog>
        </>
      )
    }

    return <ImageGalleryExample />
  },
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const NotificationDialog: Story = {
  render: () => {
    const NotificationExample = () => {
      const [notifications, setNotifications] = useState([
        { id: 1, type: 'info', message: 'New message from John Doe', time: '5 min ago' },
        { id: 2, type: 'success', message: 'Your order has been shipped', time: '1 hour ago' },
        { id: 3, type: 'warning', message: 'Storage space running low', time: '2 hours ago' },
        { id: 4, type: 'error', message: 'Failed to sync data', time: '3 hours ago' },
      ])
      const [open, setOpen] = useState(false)

      const getIcon = (type: string) => {
        switch (type) {
          case 'success':
            return '✅'
          case 'warning':
            return '⚠️'
          case 'error':
            return '❌'
          default:
            return 'ℹ️'
        }
      }

      const clearNotification = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id))
      }

      return (
        <>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 relative"
          >
            Notifications
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          <Dialog open={open} onOpenChange={setOpen} position="right" size="sm" transition="slide">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogBody customStyles={{ padding: '0' }}>
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{getIcon(notification.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        <button
                          onClick={() => clearNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">No new notifications</div>
              )}
            </DialogBody>
            {notifications.length > 0 && (
              <DialogFooter>
                <button
                  onClick={() => setNotifications([])}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Clear All
                </button>
              </DialogFooter>
            )}
          </Dialog>
        </>
      )
    }

    return <NotificationExample />
  },
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Accessibility Features Demo</h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          All dialogs include proper ARIA attributes, focus management, and keyboard navigation.
        </p>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Focus Management</h4>
          <DialogWithState
            title="Focus Management Demo"
            label="Accessible dialog with focus management"
            triggerText="Open Focus Demo"
          >
            <DialogBody>
              <p className="mb-4">Focus is trapped within the dialog when open.</p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tab through these inputs"
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Focus cycles within dialog"
                  className="w-full px-3 py-2 border rounded"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Focusable Button
                </button>
              </div>
            </DialogBody>
          </DialogWithState>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Screen Reader Support</h4>
          <DialogWithState
            title="Screen Reader Friendly"
            description="This dialog provides context for screen readers"
            helperText="Additional context available to assistive technologies"
            label="Dialog with comprehensive ARIA labels"
            triggerText="Open Screen Reader Demo"
          >
            <DialogBody>
              <p>All interactive elements are properly labeled for screen readers.</p>
            </DialogBody>
          </DialogWithState>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Keyboard Navigation</h4>
          <DialogWithState title="Keyboard Navigation" triggerText="Open Keyboard Demo">
            <DialogBody>
              <p className="mb-4">Try these keyboard shortcuts:</p>
              <ul className="space-y-1 text-sm">
                <li>
                  • <kbd>Tab</kbd> - Navigate through focusable elements
                </li>
                <li>
                  • <kbd>Shift + Tab</kbd> - Navigate backwards
                </li>
                <li>
                  • <kbd>Escape</kbd> - Close the dialog
                </li>
                <li>
                  • <kbd>Enter</kbd> - Activate buttons
                </li>
              </ul>
            </DialogBody>
          </DialogWithState>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Accessibility features:</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • role=&quot;dialog&quot; and aria-modal=&quot;true&quot; for proper dialog semantics
            </li>
            <li>• Focus trap prevents tabbing outside the dialog</li>
            <li>• Focus returns to trigger element when dialog closes</li>
            <li>• Escape key closes the dialog (configurable)</li>
            <li>• Proper ARIA labels and descriptions</li>
            <li>• Announcement to screen readers when opened</li>
            <li>• Body scroll lock when modal is open</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {
    open: false,
    onOpenChange: () => {},
  },
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Dialog and sub-components).
      </p>
      <LivePlayground
        code={`<Dialog open>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>Dialog description goes here.</DialogDescription>
  </DialogHeader>
  <DialogBody>Content goes here...</DialogBody>
  <DialogFooter>
    <DialogClose>Close</DialogClose>
  </DialogFooter>
</Dialog>`}
      />
    </div>
  ),
}
