import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Professional Slider component with clean, modern design.
 *
 * ## Features
 * - **Clean Design**: Modern styling with proper proportions
 * - **Single & Range Mode**: Support for both single value and range selection
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 5 visual styles (default, minimal, filled, track-only, thumbless)
 * - **3 Sizes**: Small, medium, and large with proper proportions
 * - **Status States**: Built-in support for success, warning, error, and info states
 * - **Marks & Labels**: Optional marks with labels and click handlers
 * - **Tooltip Support**: Value preview on hover/focus/drag
 * - **Keyboard Accessibility**: Full keyboard navigation
 * - **Form Integration**: Works seamlessly in forms
 * - **Professional Styling**: Clean, modern appearance suitable for production use
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Slider
 *   defaultValue={50}
 *   min={0}
 *   max={100}
 *   label="Volume"
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [value, setValue] = useState(50)
 *
 * <Slider
 *   value={value}
 *   onChange={setValue}
 *   label="Volume"
 * />
 * ```
 *
 * ### Range Slider:
 * ```tsx
 * <Slider
 *   range
 *   defaultValue={[20, 80]}
 *   label="Price range"
 * />
 * ```
 */
const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'object' },
      description: 'Controlled value(s)',
      table: {
        type: { summary: 'number | number[]' },
      },
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'Default value(s) for uncontrolled mode',
      table: {
        type: { summary: 'number | number[]' },
        defaultValue: { summary: '0' },
      },
    },
    min: {
      control: 'number',
      description: 'Minimum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: 'number',
      description: 'Step increment',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    range: {
      control: 'boolean',
      description: 'Enable range mode with two thumbs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the slider read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'filled', 'track-only', 'thumbless'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the slider',
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
      description: 'Label text for the slider',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover/focus',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
    },
    showMarks: {
      control: 'boolean',
      description: 'Show marks on the track',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when value changes',
      table: {
        type: { summary: '(values: number[]) => void' },
      },
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const SliderWithState = ({
  defaultValue = 0,
  onChange,
  ...props
}: React.ComponentProps<typeof Slider> & { defaultValue?: number | number[] }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValues: number[]) => {
    setValue(Array.isArray(defaultValue) ? newValues : newValues[0])
    onChange?.(newValues)
  }

  return <Slider {...props} value={value} onChange={handleChange} />
}

// Icon components for examples
const VolumeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

const VolumeDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
  </svg>
)

const VolumeUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const SkipPreviousIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
)

const SkipNextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
)

const BrightnessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
  </svg>
)

const PriceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
  </svg>
)

export const Default: Story = {
  render: (args) => <SliderWithState {...args} />,
  args: {
    label: 'Volume',
    defaultValue: 50,
  },
}

export const ContinuousSliders: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Continuous Sliders</h3>
        <p className="text-sm text-gray-600 mb-6">
          Continuous sliders allow users to select a value along a subjective range.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Volume</h4>
            <SliderWithState
              label="Volume"
              labelIcon={<VolumeIcon />}
              defaultValue={75}
              showTooltip
              formatTooltip={(value) => `${value}%`}
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Disabled slider</h4>
            <Slider disabled label="Volume" defaultValue={30} />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const DiscreteSliders: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Discrete Sliders</h3>
        <p className="text-sm text-gray-600">
          Discrete sliders can be adjusted to a specific value by referencing its value indicator.
        </p>

        {/* Temperature */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Temperature</h4>
          <SliderWithState
            defaultValue={20}
            min={10}
            max={110}
            step={10}
            showMarks
            marks={[
              { value: 10, label: '10°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 110, label: '110°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
            valueLabelDisplay="auto"
          />
        </div>

        {/* Disabled Temperature */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Disabled Temperature</h4>
          <SliderWithState
            defaultValue={20}
            min={10}
            max={110}
            step={10}
            disabled
            showMarks
            marks={[
              { value: 10, label: '10°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 110, label: '110°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
            valueLabelDisplay="auto"
          />
        </div>

        {/* Small Steps */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Small steps</h4>
          <SliderWithState
            defaultValue={0.00000005}
            min={-0.00000005}
            max={0.0000001}
            step={0.00000001}
            showMarks
            showTooltip
            formatTooltip={(value) => value.toExponential(2)}
            valueLabelDisplay="auto"
          />
        </div>

        {/* Custom Marks */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Custom marks</h4>
          <SliderWithState
            defaultValue={20}
            min={0}
            max={100}
            step={10}
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
            valueLabelDisplay="auto"
          />
        </div>

        {/* Restricted Values */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Restricted values</h4>
          <SliderWithState
            defaultValue={20}
            min={0}
            max={100}
            step={undefined}
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
            valueLabelDisplay="auto"
          />
        </div>

        {/* Label Always Visible */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Label always visible</h4>
          <SliderWithState
            defaultValue={80}
            min={0}
            max={100}
            step={10}
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
            valueLabelDisplay="on"
          />
        </div>
      </div>
    </div>
  ),
}

export const RangeSlider: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Range Slider</h3>
        <p className="text-sm text-gray-600 mb-6">
          The slider can be used to set the start and end of a range by supplying an array of
          values.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Temperature range</h4>
            <SliderWithState
              range
              label="Temperature range"
              defaultValue={[20, 37]}
              min={0}
              max={100}
              showTooltip
              formatTooltip={(value) => `${value}°C`}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

const SliderWithInputComponent = () => {
  const [value, setValue] = useState(30)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Slider with Input Field</h3>
        <p className="text-sm text-gray-600 mb-6">
          In this example an input allows a discrete value to be set.
        </p>
        <div className="space-y-4">
          <SliderWithState
            label="Volume"
            labelIcon={<VolumeIcon />}
            value={value}
            onChange={(values) => setValue(values[0])}
            showTooltip
            formatTooltip={(value) => `${value}%`}
          />
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
              min={0}
              max={100}
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SliderWithInput: Story = {
  render: () => <SliderWithInputComponent />,
}

export const CustomizedSliders: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Customized Sliders</h3>
        <p className="text-sm text-gray-600 mb-6">
          Here are some examples of customizing the component with different styles.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Minimal Style</h4>
            <SliderWithState
              label="Minimal"
              defaultValue={60}
              variant="minimal"
              size="lg"
              showTooltip
              formatTooltip={(value) => `${value}%`}
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Default Style</h4>
            <SliderWithState
              label="Default"
              defaultValue={20}
              variant="default"
              size="md"
              showTooltip
              formatTooltip={(value) => `${value}%`}
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Filled Style</h4>
            <SliderWithState
              label="Filled"
              defaultValue={20}
              variant="filled"
              size="md"
              showTooltip
              formatTooltip={(value) => `${value}%`}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const VerticalSliders: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="space-y-10">
        <h3 className="text-lg font-medium">Vertical Sliders</h3>
        <p className="text-sm text-gray-600">
          Vertical sliders can be created by applying CSS transforms to rotate the slider component.
        </p>

        <div className="flex items-center space-x-3 mt-10">
          <div className="flex items-center space-x-1">
            <span
              className="text-sm font-medium text-gray-700"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Temperature
            </span>
            <div
              className="relative"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            >
              <SliderWithState
                defaultValue={20}
                min={0}
                max={100}
                step={1}
                showMarks={false}
                showTooltip
                formatTooltip={(value) => `${value}°C`}
                style={{ width: '200px', height: '35px' }}
              />
            </div>
          </div>

          {/* Temperature labels positioned like MUI */}
          <div className="flex flex-col justify-between h-32 text-xs text-gray-600">
            <span>100°C</span>
            <span>37°C</span>
            <span>20°C</span>
            <span>0°C</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const TrackVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Track Variations</h3>

        {/* Removed Track */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Removed track</h4>
          <SliderWithState
            defaultValue={37}
            min={0}
            max={100}
            step={1}
            variant="removed-track"
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
          />
        </div>

        {/* Removed Track Range */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Removed track range slider</h4>
          <SliderWithState
            range
            defaultValue={[20, 37]}
            min={0}
            max={100}
            step={1}
            variant="removed-track"
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
          />
        </div>

        {/* Inverted Track */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Inverted track</h4>
          <SliderWithState
            defaultValue={37}
            min={0}
            max={100}
            step={1}
            variant="inverted-track"
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
          />
        </div>

        {/* Inverted Track Range */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Inverted track range</h4>
          <SliderWithState
            range
            defaultValue={[20, 37]}
            min={0}
            max={100}
            step={1}
            variant="inverted-track"
            showMarks
            marks={[
              { value: 0, label: '0°C' },
              { value: 20, label: '20°C' },
              { value: 37, label: '37°C' },
              { value: 100, label: '100°C' },
            ]}
            showTooltip
            formatTooltip={(value) => `${value}°C`}
          />
        </div>
      </div>
    </div>
  ),
}

const NonLinearScaleComponent = () => {
  const [value, setValue] = useState([1, 3])

  const scale = (x: number) => Math.pow(10, x)
  const valueLabelFormat = (value: number) => {
    return `${scale(value).toExponential(1)}`
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Non-linear Scale</h3>
        <p className="text-sm text-gray-600 mb-6">
          You can use custom scaling to represent the value on a different scale.
        </p>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Temperature range</h4>
            <SliderWithState
              range
              label="Temperature range"
              value={value}
              onChange={setValue}
              min={0}
              max={6}
              step={0.1}
              showTooltip
              formatTooltip={valueLabelFormat}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const NonLinearScale: Story = {
  render: () => <NonLinearScaleComponent />,
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Visual Variants</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Default</h4>
            <SliderWithState variant="default" label="Default variant" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Minimal</h4>
            <SliderWithState variant="minimal" label="Minimal variant" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Filled</h4>
            <SliderWithState variant="filled" label="Filled variant" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Track Only</h4>
            <SliderWithState variant="track-only" label="Track only variant" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Thumbless</h4>
            <SliderWithState variant="thumbless" label="Thumbless variant" defaultValue={50} />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Size Variations</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">All Sizes</h4>
            <div className="space-y-4">
              <SliderWithState size="sm" label="Small" defaultValue={50} />
              <SliderWithState size="md" label="Medium" defaultValue={50} />
              <SliderWithState size="lg" label="Large" defaultValue={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Status States</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Default</h4>
            <SliderWithState status="default" label="Default status" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Success</h4>
            <SliderWithState status="success" label="Success status" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Warning</h4>
            <SliderWithState status="warning" label="Warning status" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Error</h4>
            <SliderWithState status="error" label="Error status" defaultValue={50} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Info</h4>
            <SliderWithState status="info" label="Info status" defaultValue={50} />
          </div>
        </div>
      </div>
    </div>
  ),
}

const MusicPlayerComponent = () => {
  const [volume, setVolume] = useState(70)
  const [progress, setProgress] = useState(32)
  const [isPlaying, setIsPlaying] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Music Player</h3>
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          {/* Album Art and Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">🎵</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">can&apos;t win - Chilling Sunday</h4>
              <p className="text-sm text-gray-600">Jun Pulse</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <SliderWithState
              value={progress}
              onChange={(values) => setProgress(values[0])}
              min={0}
              max={100}
              showTooltip
              formatTooltip={(value) => formatTime(value)}
              size="sm"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(progress)}</span>
              <span>2:48</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <SkipPreviousIcon />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <SkipNextIcon />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <VolumeDownIcon />
              <div className="w-24">
                <SliderWithState
                  value={volume}
                  onChange={(values) => setVolume(values[0])}
                  min={0}
                  max={100}
                  size="sm"
                  showTooltip
                  formatTooltip={(value) => `${value}%`}
                />
              </div>
              <VolumeUpIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MusicPlayer: Story = {
  render: () => <MusicPlayerComponent />,
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Audio Controls</h3>
        <div className="space-y-4 p-4 border rounded-lg">
          <SliderWithState
            label="Volume"
            labelIcon={<VolumeIcon />}
            defaultValue={75}
            showTooltip
            formatTooltip={(value) => `${value}%`}
            status="success"
          />

          <SliderWithState
            label="Bass"
            defaultValue={60}
            showTooltip
            formatTooltip={(value) => `${value}%`}
          />

          <SliderWithState
            label="Treble"
            defaultValue={40}
            showTooltip
            formatTooltip={(value) => `${value}%`}
          />

          <SliderWithState
            label="Balance"
            min={-50}
            max={50}
            defaultValue={0}
            showTooltip
            formatTooltip={(value) => (value > 0 ? `Right ${value}%` : `Left ${Math.abs(value)}%`)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Image Editor</h3>
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <SliderWithState
            label="Brightness"
            labelIcon={<BrightnessIcon />}
            defaultValue={50}
            showTooltip
            formatTooltip={(value) => `${value}%`}
            variant="filled"
          />

          <SliderWithState
            label="Contrast"
            defaultValue={50}
            showTooltip
            formatTooltip={(value) => `${value}%`}
            variant="filled"
          />

          <SliderWithState
            label="Saturation"
            defaultValue={50}
            showTooltip
            formatTooltip={(value) => `${value}%`}
            variant="filled"
          />

          <SliderWithState
            label="Hue"
            min={0}
            max={360}
            defaultValue={180}
            showTooltip
            formatTooltip={(value) => `${value}°`}
            variant="filled"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Price Range Filter</h3>
        <div className="space-y-4 p-4 border rounded-lg">
          <SliderWithState
            range
            label="Price range"
            labelIcon={<PriceIcon />}
            min={0}
            max={1000}
            defaultValue={[100, 500]}
            showTooltip
            formatTooltip={(value) => `$${value}`}
            marks={[
              { value: 0, label: '$0', icon: <PriceIcon /> },
              { value: 250, label: '$250', icon: <PriceIcon /> },
              { value: 500, label: '$500', icon: <PriceIcon /> },
              { value: 750, label: '$750', icon: <PriceIcon /> },
              { value: 1000, label: '$1000', icon: <PriceIcon /> },
            ]}
            showMarks
            markIcons
          />
        </div>
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Interactive States</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Disabled</h4>
            <div className="space-y-2">
              <Slider disabled label="Disabled slider" defaultValue={50} />
              <Slider disabled label="Disabled range" range defaultValue={[20, 80]} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Read Only</h4>
            <div className="space-y-2">
              <Slider readOnly label="Read only slider" defaultValue={50} />
              <Slider readOnly label="Read only range" range defaultValue={[20, 80]} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Required</h4>
            <Slider required label="Required field" defaultValue={50} />
          </div>
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
          All sliders are keyboard accessible. Try tabbing through them and using arrow keys to
          adjust values.
        </p>

        <SliderWithState
          label="Screen reader friendly"
          defaultValue={50}
          showTooltip
          aria-label="Adjust volume level"
        />

        <SliderWithState label="High contrast mode" defaultValue={50} variant="minimal" />

        <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <SliderWithState label="Large click area" size="lg" defaultValue={50} />
        </div>

        <SliderWithState
          label="Step navigation"
          defaultValue={50}
          step={10}
          showTooltip
          formatTooltip={(value) => `${value}%`}
        />
      </div>
    </div>
  ),
}

export const Playground: StoryObj<typeof meta> = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components are in scope (Slider).
      </p>
      <LivePlayground
        code={`<div className="space-y-3">
  <Slider defaultValue={50} label="Volume" />
  <Slider range defaultValue={[20,80]} label="Range" />
</div>`}
      />
    </div>
  ),
}
