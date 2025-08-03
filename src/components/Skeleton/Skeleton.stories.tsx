import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

/**
 * Skeleton is a loading placeholder component that displays animated placeholders
 * while content is being loaded.
 *
 * ## Features
 * - **Multiple Variants**: 7 pre-defined visual styles (default, rounded, circular, text, avatar, button, card)
 * - **4 Sizes**: Small, medium, large, and extra large options
 * - **Animation Types**: Pulse, wave, shimmer, and none animations
 * - **Text Lines**: Support for multiple text lines with varying widths
 * - **Customizable**: Width, height, radius, colors, and spacing
 * - **Content Overlay**: Option to show content with reduced opacity
 * - **Accessibility**: Proper ARIA attributes for screen readers
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Skeleton variant="default" size="md" />
 * ```
 *
 * ### Text Skeleton:
 * ```tsx
 * <Skeleton variant="text" lines={3} />
 * ```
 *
 * ### Avatar Skeleton:
 * ```tsx
 * <Skeleton variant="avatar" size="lg" />
 * ```
 *
 * ### Custom Dimensions:
 * ```tsx
 * <Skeleton width={200} height={100} radius={8} />
 * ```
 */
const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'circular', 'text', 'avatar', 'button', 'card'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the skeleton',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'shimmer', 'none'],
      description: 'Animation type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pulse' },
      },
    },
    lines: {
      control: 'number',
      description: 'Number of text lines (for text variant)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    width: {
      control: 'text',
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: 'Custom height',
      table: {
        type: { summary: 'string | number' },
      },
    },
    radius: {
      control: 'text',
      description: 'Custom border radius',
      table: {
        type: { summary: 'string | number' },
      },
    },
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1000' },
      },
    },
    animationDelay: {
      control: 'number',
      description: 'Animation delay in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    showContent: {
      control: 'boolean',
      description: 'Show content with reduced opacity',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    contentOpacity: {
      control: 'number',
      description: 'Opacity of content when shown',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.3' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Style',
        type: { summary: 'string' },
      },
    },
    foregroundColor: {
      control: 'color',
      description: 'Foreground color',
      table: {
        category: 'Style',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Style',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Border width',
      table: {
        category: 'Style',
        type: { summary: 'string' },
      },
    },
    borderStyle: {
      control: 'text',
      description: 'Border style',
      table: {
        category: 'Style',
        type: { summary: 'string' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between elements',
      table: {
        category: 'Spacing',
        type: { summary: 'string | number' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding',
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
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Skeleton</h3>
        <Skeleton />
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Dimensions</h3>
        <Skeleton width={200} height={100} radius={8} />
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Content</h3>
        <Skeleton showContent contentOpacity={0.5}>
          <div className="p-4 bg-blue-100 rounded">
            <h4 className="font-semibold">Loading Content</h4>
            <p>This content is visible with reduced opacity</p>
          </div>
        </Skeleton>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <Skeleton variant="default" />
      </div>

      <div className="p-6 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Rounded</h3>
        <Skeleton variant="rounded" />
      </div>

      <div className="p-6 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-sm border border-indigo-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Circular</h3>
        <Skeleton variant="circular" />
      </div>

      <div className="p-6 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm border border-amber-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Text</h3>
        <Skeleton variant="text" />
      </div>

      <div className="p-6 bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm border border-slate-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Avatar</h3>
        <Skeleton variant="avatar" />
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Button</h3>
        <Skeleton variant="button" />
      </div>

      <div className="p-6 bg-gradient-to-r from-cyan-50/80 to-teal-50/80 backdrop-blur-sm border border-cyan-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Card</h3>
        <Skeleton variant="card" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-cyan-50/80 to-teal-50/80 backdrop-blur-sm border border-cyan-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Size Comparison</h3>
        <div className="flex items-center gap-6">
          <Skeleton size="sm" />
          <Skeleton size="md" />
          <Skeleton size="lg" />
          <Skeleton size="xl" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Avatar Sizes</h3>
        <div className="flex items-center gap-6">
          <Skeleton variant="avatar" size="sm" />
          <Skeleton variant="avatar" size="md" />
          <Skeleton variant="avatar" size="lg" />
          <Skeleton variant="avatar" size="xl" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Button Sizes</h3>
        <div className="flex items-center gap-6">
          <Skeleton variant="button" size="sm" />
          <Skeleton variant="button" size="md" />
          <Skeleton variant="button" size="lg" />
          <Skeleton variant="button" size="xl" />
        </div>
      </div>
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Pulse Animation</h3>
        <Skeleton animation="pulse" />
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Wave Animation</h3>
        <Skeleton animation="wave" />
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Shimmer Animation</h3>
        <Skeleton animation="shimmer" />
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50/80 to-amber-50/80 backdrop-blur-sm border border-yellow-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Animation</h3>
        <Skeleton animation="none" />
      </div>
    </div>
  ),
}

export const TextLines: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Single Line</h3>
        <Skeleton variant="text" lines={1} />
      </div>

      <div className="p-6 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Multiple Lines</h3>
        <Skeleton variant="text" lines={3} />
      </div>

      <div className="p-6 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-sm border border-indigo-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Many Lines</h3>
        <Skeleton variant="text" lines={5} />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
        <Skeleton backgroundColor="#f8fafc" foregroundColor="#3b82f6" width={200} height={60} />
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Light Purple</h3>
        <Skeleton
          backgroundColor="#faf5ff"
          borderColor="#f3e8ff"
          borderWidth="2px"
          borderStyle="solid"
          width={200}
          height={60}
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-cyan-50/80 to-teal-50/80 backdrop-blur-sm border border-cyan-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Light Blue</h3>
        <Skeleton
          backgroundColor="#f0fdfa"
          borderColor="#ccfbf1"
          borderWidth="2px"
          borderStyle="solid"
          width={200}
          height={60}
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Light Green</h3>
        <Skeleton
          backgroundColor="#f0fdf4"
          borderColor="#dcfce7"
          borderWidth="2px"
          borderStyle="solid"
          width={200}
          height={60}
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50/80 to-amber-50/80 backdrop-blur-sm border border-yellow-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Light Yellow</h3>
        <Skeleton
          backgroundColor="#fefce8"
          borderColor="#fef3c7"
          borderWidth="2px"
          borderStyle="solid"
          width={200}
          height={60}
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Light Pink</h3>
        <Skeleton
          backgroundColor="#fdf2f8"
          borderColor="#fce7f3"
          borderWidth="2px"
          borderStyle="solid"
          width={200}
          height={60}
        />
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">User Profile Loading</h3>
        <div className="flex items-center gap-4">
          <Skeleton variant="avatar" size="lg" />
          <div className="space-y-2">
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={100} />
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Article Loading</h3>
        <div className="space-y-4">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Card Loading</h3>
        <div className="space-y-4">
          <Skeleton variant="card" />
          <div className="flex gap-4">
            <Skeleton variant="button" />
            <Skeleton variant="button" />
          </div>
        </div>
      </div>
    </div>
  ),
}
