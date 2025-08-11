import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from './Rating'
import { Button } from '../Button/Button'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Rating is a component that allows users to provide feedback by rating items on a scale.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 6 pre-defined visual styles (default, soft, minimal, outlined, compact, emoji)
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, error, and info states
 * - **Precision Support**: Half-star and custom precision ratings (0.5, 0.1, etc.)
 * - **Hover Preview**: Visual feedback before selection
 * - **Keyboard Accessibility**: Full keyboard navigation with arrow keys, home/end, enter/space
 * - **Form Integration**: Works seamlessly in forms with name and value props
 * - **Extensive Styling**: Over 50 style props for complete customization
 * - **Custom Icons**: Support for custom star icons and emoji ratings
 * - **Accessibility**: Full ARIA attributes and screen reader support
 * - **Compound Components**: Flexible composition with Rating.Star, Rating.Label, etc.
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Rating defaultValue={3} maxValue={5} />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [rating, setRating] = useState(3)
 *
 * <Rating
 *   value={rating}
 *   onChange={setRating}
 *   maxValue={5}
 * />
 * ```
 *
 * ### With Labels:
 * ```tsx
 * <Rating
 *   defaultValue={4}
 *   label="Product Rating"
 *   description="Rate your experience"
 * />
 * ```
 *
 * ### Half-Star Precision:
 * ```tsx
 * <Rating
 *   defaultValue={3.5}
 *   precision={0.5}
 *   maxValue={5}
 * />
 * ```
 *
 * ### Custom Icons:
 * ```tsx
 * <Rating
 *   defaultValue={4}
 *   variant="emoji"
 *   renderIcon={({ isFilled }) => (
 *     <span>{isFilled ? '⭐' : '☆'}</span>
 *   )}
 * />
 * ```
 */
const meta = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Controlled rating value',
      table: {
        type: { summary: 'number' },
      },
    },
    defaultValue: {
      control: 'number',
      description: 'Default rating value for uncontrolled mode',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    maxValue: {
      control: 'number',
      description: 'Maximum rating value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    precision: {
      control: 'number',
      description: 'Precision for rating values (e.g., 0.5 for half-stars)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when rating value changes',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    onHoverChange: {
      control: false,
      description: 'Callback when hover value changes',
      table: {
        type: { summary: '(value: number | null) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the rating component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the rating read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Make the rating required in forms',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'soft', 'minimal', 'outlined', 'compact', 'emoji'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the rating component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status state for visual feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the rating',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text for the rating',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the rating',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (overrides helper text)',
      table: {
        type: { summary: 'string' },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'scale', 'grow', 'bounce'],
      description: 'Animation style for transitions',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'scale' },
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
    // Icon styles
    iconSize: {
      control: 'text',
      description: 'Size of rating icons',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    iconSpacing: {
      control: 'text',
      description: 'Spacing between rating icons',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    filledColor: {
      control: 'color',
      description: 'Color for filled rating icons',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    emptyColor: {
      control: 'color',
      description: 'Color for empty rating icons',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    hoverColor: {
      control: 'color',
      description: 'Color for hovered rating icons',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    disabledColor: {
      control: 'color',
      description: 'Color for disabled rating icons',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    // Label styles
    labelColor: {
      control: 'color',
      description: 'Label text color',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelFontSize: {
      control: 'text',
      description: 'Label font size',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelFontWeight: {
      control: 'text',
      description: 'Label font weight',
      table: {
        category: 'Label Styles',
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
    // Custom render
    renderIcon: {
      control: false,
      description: 'Custom render function for rating icons',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: IconRenderProps) => React.ReactNode' },
      },
    },
    renderLabel: {
      control: false,
      description: 'Custom render function for label',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: LabelRenderProps) => React.ReactNode' },
      },
    },
    renderDescription: {
      control: false,
      description: 'Custom render function for description',
      table: {
        category: 'Custom Render',
        type: { summary: '(props: DescriptionRenderProps) => React.ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const RatingWithState = ({
  defaultValue = 0,
  onChange,
  onHoverChange,
  ...props
}: React.ComponentProps<typeof Rating> & { defaultValue?: number }) => {
  const [rating, setRating] = useState(defaultValue)
  const [_hoverRating, setHoverRating] = useState<number | null>(null)

  const handleChange = (newRating: number) => {
    setRating(newRating)
    onChange?.(newRating)
  }

  const handleHoverChange = (newHoverRating: number | null) => {
    setHoverRating(newHoverRating)
    onHoverChange?.(newHoverRating)
  }

  return (
    <Rating {...props} value={rating} onChange={handleChange} onHoverChange={handleHoverChange} />
  )
}

export const Default: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Basic Rating</h3>
        <RatingWithState defaultValue={3} label="Product Rating" />
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Description</h3>
        <RatingWithState
          defaultValue={4}
          label="Experience"
          description="Rate your experience with our service"
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Required Field</h3>
        <RatingWithState
          defaultValue={0}
          label="Service Quality"
          required
          description="Please rate our service quality"
        />
      </div>
    </div>
  ),
}

export const Precision: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Half Star Precision</h3>
        <RatingWithState precision={0.5} defaultValue={3.5} label="Half star rating" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quarter Star Precision</h3>
        <RatingWithState precision={0.25} defaultValue={3.75} label="Quarter star rating" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Tenth Star Precision</h3>
        <RatingWithState precision={0.1} defaultValue={3.7} label="Tenth star rating" />
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled State</h3>
        <RatingWithState disabled defaultValue={4} label="Disabled rating" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Read Only State</h3>
        <RatingWithState readOnly defaultValue={4} label="Read only rating" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Error</h3>
        <RatingWithState
          defaultValue={2}
          label="Error rating"
          errorMessage="This rating has an error"
        />
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fade Transition</h3>
        <RatingWithState transition="fade" defaultValue={4} label="Fade transition" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Scale Transition</h3>
        <RatingWithState transition="scale" defaultValue={4} label="Scale transition" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Grow Transition</h3>
        <RatingWithState transition="grow" defaultValue={4} label="Grow transition" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Bounce Transition</h3>
        <RatingWithState transition="bounce" defaultValue={4} label="Bounce transition" />
      </div>
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Heart Icons</h3>
        <RatingWithState
          defaultValue={4}
          label="Heart rating"
          renderIcon={({ isFilled }) => <span className="text-xl">{isFilled ? '❤️' : '🤍'}</span>}
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Thumbs Up/Down</h3>
        <RatingWithState
          defaultValue={3}
          label="Thumbs rating"
          renderIcon={({ isFilled, index: _index }) => (
            <span className="text-xl">{isFilled ? '👍' : '👎'}</span>
          )}
        />
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50/80 to-amber-50/80 backdrop-blur-sm border border-yellow-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Star</h3>
        <RatingWithState
          defaultValue={4}
          label="Custom star"
          renderIcon={({ isFilled }) => <span className="text-xl">{isFilled ? '⭐' : '☆'}</span>}
        />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <RatingWithState variant="default" defaultValue={4} label="Default variant" />
      </div>

      <div className="p-6 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Soft</h3>
        <RatingWithState variant="soft" defaultValue={4} label="Soft variant" />
      </div>

      <div className="p-6 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-sm border border-indigo-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Minimal</h3>
        <RatingWithState variant="minimal" defaultValue={4} label="Minimal variant" />
      </div>

      <div className="p-6 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm border border-amber-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <RatingWithState variant="outlined" defaultValue={4} label="Outlined variant" />
      </div>

      <div className="p-6 bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm border border-slate-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Compact</h3>
        <RatingWithState variant="compact" defaultValue={4} label="Compact variant" />
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Emoji</h3>
        <RatingWithState
          variant="emoji"
          defaultValue={4}
          label="Emoji variant"
          renderIcon={({ isFilled }) => <span className="text-2xl">{isFilled ? '😊' : '😐'}</span>}
        />
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
          <RatingWithState size="sm" defaultValue={4} label="Small" />
          <RatingWithState size="md" defaultValue={4} label="Medium" />
          <RatingWithState size="lg" defaultValue={4} label="Large" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">All sizes with same label</h3>
        <div className="space-y-4">
          <RatingWithState size="sm" defaultValue={4} label="Product Quality" />
          <RatingWithState size="md" defaultValue={4} label="Product Quality" />
          <RatingWithState size="lg" defaultValue={4} label="Product Quality" />
        </div>
      </div>
    </div>
  ),
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

const FormIntegrationComponent = () => {
  const [ratings, setRatings] = useState({
    quality: 0,
    service: 0,
    value: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with ratings:', ratings)
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-6">Form Integration</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <RatingWithState
              name="quality"
              label="Product Quality"
              description="Rate the overall quality"
              defaultValue={ratings.quality}
              onChange={(value) => setRatings((prev) => ({ ...prev, quality: value }))}
            />
          </div>

          <div className="space-y-4">
            <RatingWithState
              name="service"
              label="Customer Service"
              description="Rate our service experience"
              defaultValue={ratings.service}
              onChange={(value) => setRatings((prev) => ({ ...prev, service: value }))}
            />
          </div>

          <div className="space-y-4">
            <RatingWithState
              name="value"
              label="Value for Money"
              description="Was it worth the price?"
              defaultValue={ratings.value}
              onChange={(value) => setRatings((prev) => ({ ...prev, value: value }))}
            />
          </div>

          <div className="pt-6">
            <Button type="submit" variant="filled" size="md" status="primary">
              Submit Ratings
            </Button>
          </div>
        </form>
      </div>

      <div className="p-4 bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm border border-slate-200/30 rounded-xl shadow-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Values:</h4>
        <pre className="text-xs text-gray-600 bg-white/50 p-2 rounded border">
          {JSON.stringify(ratings, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-sm border border-gray-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <RatingWithState status="default" defaultValue={4} label="Default status" />
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <RatingWithState status="success" defaultValue={4} label="Success status" />
      </div>

      <div className="p-6 bg-gradient-to-r from-yellow-50/80 to-amber-50/80 backdrop-blur-sm border border-yellow-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <RatingWithState status="warning" defaultValue={3} label="Warning status" />
      </div>

      <div className="p-6 bg-gradient-to-r from-red-50/80 to-rose-50/80 backdrop-blur-sm border border-red-200/30 rounded-xl shadow-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <RatingWithState
          status="error"
          defaultValue={2}
          label="Error status"
          errorMessage="This rating has an error"
        />
      </div>
    </div>
  ),
}

export const Playground: Story = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Rating).
      </p>
      <LivePlayground
        code={`<div className="space-y-2">
  <Rating defaultValue={3} maxValue={5} />
  <Rating defaultValue={4} variant="emoji" />
</div>`}
      />
    </div>
  ),
}
