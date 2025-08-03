import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Splitter } from './Splitter'

/**
 * # Splitter Component
 *
 * A flexible splitter component that allows users to resize panes by dragging handles.
 *
 * ## Features
 * - **Horizontal and Vertical Layouts**: Support for both horizontal and vertical splitting
 * - **Controlled/Uncontrolled**: Can be controlled externally or manage its own state
 * - **Accessibility**: Full keyboard support and ARIA attributes
 * - **Customizable**: Extensive styling and behavior customization
 * - **Persistence**: Optional localStorage-based size persistence
 * - **Animation**: Smooth resize animations with configurable duration
 *
 * ## Usage
 * ```tsx
 * import { Splitter } from '@/components'
 *
 * <Splitter direction="horizontal" initialSizes={[30, 70]}>
 *   <Splitter.Pane index={0}>
 *     <div>Left Panel</div>
 *   </Splitter.Pane>
 *   <Splitter.Handle index={0} />
 *   <Splitter.Pane index={1}>
 *     <div>Right Panel</div>
 *   </Splitter.Pane>
 * </Splitter>
 * ```
 *
 * ## Props
 * - `direction`: Layout direction ('horizontal' | 'vertical')
 * - `sizes`: Controlled pane sizes (array of percentages)
 * - `initialSizes`: Initial pane sizes for uncontrolled mode
 * - `minSize`: Minimum pane size in pixels
 * - `maxSize`: Maximum pane size in pixels
 * - `onResize`: Callback when panes are resized
 * - `persistSizes`: Whether to persist sizes in localStorage
 * - `animateResize`: Whether to animate resize transitions
 */

const meta: Meta<typeof Splitter> = {
  title: 'Components/Splitter',
  component: Splitter,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction',
    },
    sizes: {
      control: 'object',
      description: 'Controlled pane sizes (array of percentages)',
    },
    initialSizes: {
      control: 'object',
      description: 'Initial pane sizes for uncontrolled mode',
    },
    minSize: {
      control: 'number',
      description: 'Minimum pane size in pixels',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum pane size in pixels',
    },
    variant: {
      control: 'select',
      options: ['basic', 'shadowed', 'bordered', 'compact'],
      description: 'Visual variant',
    },
    handleSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Handle size',
    },
    animateResize: {
      control: 'boolean',
      description: 'Whether to animate resize transitions',
    },
    persistSizes: {
      control: 'boolean',
      description: 'Whether to persist sizes in localStorage',
    },
    onResize: { action: 'resized' },
    onDragStart: { action: 'drag started' },
    onDragEnd: { action: 'drag ended' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Story wrapper for controlled behavior
const SplitterWithState = ({
  children,
  initialSizes = [50, 50],
  onResize,
  ...props
}: React.ComponentProps<typeof Splitter> & {
  initialSizes?: number[]
  onResize?: (index: number, sizes: number[]) => void
}) => {
  const [sizes, setSizes] = useState(initialSizes)

  const handleResize = (index: number, newSizes: number[]) => {
    setSizes(newSizes)
    onResize?.(index, newSizes)
  }

  return (
    <Splitter {...props} sizes={sizes} onResize={handleResize} controlled>
      {children}
    </Splitter>
  )
}

// Basic horizontal splitter
export const BasicHorizontal: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [30, 70],
    className: 'h-96',
  },
  render: (args) => (
    <Splitter {...args}>
      <Splitter.Pane index={0}>
        <div className="h-full bg-blue-50 p-4 border-r border-gray-200">
          <h3 className="font-semibold text-blue-900 mb-2">Left Panel</h3>
          <p className="text-blue-700 text-sm">
            This is the left panel. You can drag the handle to resize this panel.
          </p>
        </div>
      </Splitter.Pane>
      <Splitter.Handle index={0} />
      <Splitter.Pane index={1}>
        <div className="h-full bg-green-50 p-4">
          <h3 className="font-semibold text-green-900 mb-2">Right Panel</h3>
          <p className="text-green-700 text-sm">
            This is the right panel. The handle between panels can be dragged to resize.
          </p>
        </div>
      </Splitter.Pane>
    </Splitter>
  ),
}

// Basic vertical splitter
export const BasicVertical: Story = {
  args: {
    direction: 'vertical',
    initialSizes: [40, 60],
    className: 'h-96',
  },
  render: (args) => (
    <Splitter {...args}>
      <Splitter.Pane index={0}>
        <div className="h-full bg-purple-50 p-4 border-b border-gray-200">
          <h3 className="font-semibold text-purple-900 mb-2">Top Panel</h3>
          <p className="text-purple-700 text-sm">
            This is the top panel. Drag the handle below to resize.
          </p>
        </div>
      </Splitter.Pane>
      <Splitter.Handle index={0} />
      <Splitter.Pane index={1}>
        <div className="h-full bg-orange-50 p-4">
          <h3 className="font-semibold text-orange-900 mb-2">Bottom Panel</h3>
          <p className="text-orange-700 text-sm">
            This is the bottom panel. The handle above can be dragged to resize.
          </p>
        </div>
      </Splitter.Pane>
    </Splitter>
  ),
}

// Controlled splitter with state
export const Controlled: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [25, 75],
    className: 'h-96',
  },
  render: (args) => (
    <div className="space-y-4">
      <SplitterWithState {...args}>
        <Splitter.Pane index={0}>
          <div className="h-full bg-indigo-50 p-4 border-r border-gray-200">
            <h3 className="font-semibold text-indigo-900 mb-2">Controlled Panel</h3>
            <p className="text-indigo-700 text-sm">
              This splitter is controlled externally. The sizes are managed by React state.
            </p>
          </div>
        </Splitter.Pane>
        <Splitter.Handle index={0} />
        <Splitter.Pane index={1}>
          <div className="h-full bg-pink-50 p-4">
            <h3 className="font-semibold text-pink-900 mb-2">Resizable Panel</h3>
            <p className="text-pink-700 text-sm">
              Drag the handle to see the controlled behavior in action.
            </p>
          </div>
        </Splitter.Pane>
      </SplitterWithState>
    </div>
  ),
}

// Custom styled splitter
export const CustomStyled: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [40, 60],
    variant: 'bordered',
    handleSize: 'lg',
    className: 'h-96',
    style: {
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
    },
  },
  render: (args) => (
    <Splitter {...args}>
      <Splitter.Pane index={0}>
        <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 p-6 border-r-2 border-gray-300">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">Custom Styled</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            This splitter has custom styling with gradients, borders, and larger handles. The visual
            design can be customized extensively.
          </p>
        </div>
      </Splitter.Pane>
      <Splitter.Handle
        index={0}
        style={{
          backgroundColor: '#3b82f6',
          width: '8px',
          border: '2px solid #1d4ed8',
        }}
      />
      <Splitter.Pane index={1}>
        <div className="h-full bg-gradient-to-br from-green-100 to-green-200 p-6">
          <h3 className="font-bold text-green-900 mb-3 text-lg">Styled Panel</h3>
          <p className="text-green-800 text-sm leading-relaxed">
            Custom colors, gradients, and styling demonstrate the flexibility of the component.
          </p>
        </div>
      </Splitter.Pane>
    </Splitter>
  ),
}

// Three-pane splitter
export const ThreePanes: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [25, 50, 25],
    className: 'h-96',
  },
  render: (args) => (
    <Splitter {...args}>
      <Splitter.Pane index={0}>
        <div className="h-full bg-red-50 p-4 border-r border-gray-200">
          <h3 className="font-semibold text-red-900 mb-2">Left Panel</h3>
          <p className="text-red-700 text-sm">25% width</p>
        </div>
      </Splitter.Pane>
      <Splitter.Handle index={0} />
      <Splitter.Pane index={1}>
        <div className="h-full bg-yellow-50 p-4 border-r border-gray-200">
          <h3 className="font-semibold text-yellow-900 mb-2">Center Panel</h3>
          <p className="text-yellow-700 text-sm">50% width</p>
        </div>
      </Splitter.Pane>
      <Splitter.Handle index={1} />
      <Splitter.Pane index={2}>
        <div className="h-full bg-teal-50 p-4">
          <h3 className="font-semibold text-teal-900 mb-2">Right Panel</h3>
          <p className="text-teal-700 text-sm">25% width</p>
        </div>
      </Splitter.Pane>
    </Splitter>
  ),
}

// Animated splitter
export const Animated: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [50, 50],
    animateResize: true,
    transitionDuration: '300ms',
    className: 'h-96',
  },
  render: (args) => (
    <Splitter {...args}>
      <Splitter.Pane index={0}>
        <div className="h-full bg-violet-50 p-4 border-r border-gray-200">
          <h3 className="font-semibold text-violet-900 mb-2">Animated Panel</h3>
          <p className="text-violet-700 text-sm">
            This splitter has smooth animations when resizing. Try dragging the handle slowly.
          </p>
        </div>
      </Splitter.Pane>
      <Splitter.Handle index={0} />
      <Splitter.Pane index={1}>
        <div className="h-full bg-cyan-50 p-4">
          <h3 className="font-semibold text-cyan-900 mb-2">Smooth Transitions</h3>
          <p className="text-cyan-700 text-sm">
            Notice the smooth transition effects during resize operations.
          </p>
        </div>
      </Splitter.Pane>
    </Splitter>
  ),
}

// Persistent splitter
export const Persistent: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [60, 40],
    persistSizes: true,
    storageKey: 'storybook-splitter-sizes',
    className: 'h-96',
  },
  render: (args) => (
    <div className="space-y-4">
      <Splitter {...args}>
        <Splitter.Pane index={0}>
          <div className="h-full bg-emerald-50 p-4 border-r border-gray-200">
            <h3 className="font-semibold text-emerald-900 mb-2">Persistent Panel</h3>
            <p className="text-emerald-700 text-sm">
              This splitter persists its sizes in localStorage. Try resizing and refreshing the
              page.
            </p>
          </div>
        </Splitter.Pane>
        <Splitter.Handle index={0} />
        <Splitter.Pane index={1}>
          <div className="h-full bg-rose-50 p-4">
            <h3 className="font-semibold text-rose-900 mb-2">Remembered Sizes</h3>
            <p className="text-rose-700 text-sm">
              Your resize preferences will be remembered across browser sessions.
            </p>
          </div>
        </Splitter.Pane>
      </Splitter>
      <p className="text-sm text-gray-600">
        💡 Resize the panels and refresh the page to see the persistence in action.
      </p>
    </div>
  ),
}

// Accessibility demo
export const Accessibility: Story = {
  args: {
    direction: 'horizontal',
    initialSizes: [50, 50],
    className: 'h-96',
  },
  render: (args) => (
    <div className="space-y-4">
      <Splitter {...args}>
        <Splitter.Pane index={0}>
          <div className="h-full bg-slate-50 p-4 border-r border-gray-200">
            <h3 className="font-semibold text-slate-900 mb-2">Keyboard Accessible</h3>
            <p className="text-slate-700 text-sm">
              Focus on the handle and use arrow keys to resize. Shift + arrow for larger steps.
            </p>
            <div className="mt-4 p-3 bg-slate-100 rounded text-xs">
              <strong>Keyboard Controls:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Tab to focus the handle</li>
                <li>• Arrow keys to resize</li>
                <li>• Shift + arrow for larger steps</li>
              </ul>
            </div>
          </div>
        </Splitter.Pane>
        <Splitter.Handle index={0} aria-label="Resize panels with keyboard or mouse" />
        <Splitter.Pane index={1}>
          <div className="h-full bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900 mb-2">ARIA Compliant</h3>
            <p className="text-slate-700 text-sm">
              This splitter includes proper ARIA attributes and keyboard navigation support.
            </p>
            <div className="mt-4 p-3 bg-slate-100 rounded text-xs">
              <strong>Accessibility Features:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Proper ARIA roles and labels</li>
                <li>• Keyboard navigation support</li>
                <li>• Focus management</li>
                <li>• Screen reader compatible</li>
              </ul>
            </div>
          </div>
        </Splitter.Pane>
      </Splitter>
      <p className="text-sm text-gray-600">
        💡 Try using Tab to focus the handle, then use arrow keys to resize.
      </p>
    </div>
  ),
}
