import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from './ColorPicker'
import { cn } from '@/utils'

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ColorPicker is a comprehensive color selection component that provides multiple ways for users to pick colors. 
It supports various color formats (hex, rgb, rgba, hsl, hsla), multiple UI variants, and extensive customization options.

## Features
- **Controlled Component**: Manages color state externally
- **Multiple Formats**: Supports hex, rgb, rgba, hsl, hsla
- **Variants**: default, inline, popover, minimal, advanced
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Extensive styling and behavior options
- **Compound Components**: Use sub-components for custom layouts

## Usage

\`\`\`tsx
import { ColorPicker } from 'just-ui'

function MyComponent() {
  const [color, setColor] = useState('#3b82f6')
  
  return (
    <ColorPicker
      value={color}
      onChange={(value, colorData) => {
        setColor(value)
        console.log('Color data:', colorData)
      }}
    />
  )
}
\`\`\`

## Compound Component Usage

\`\`\`tsx
<ColorPicker value={color} onChange={setColor}>
  <ColorPicker.Trigger />
  <ColorPicker.Popover>
    <ColorPicker.Content>
      <ColorPicker.Sliders />
      <ColorPicker.Inputs />
      <ColorPicker.Presets />
    </ColorPicker.Content>
  </ColorPicker.Popover>
</ColorPicker>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'color' },
      description: 'Current color value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#000000' },
      },
    },
    onChange: {
      action: 'onChange',
      description: 'Callback when color changes',
      table: {
        type: { summary: '(value: string, color: ColorValue) => void' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'inline', 'popover', 'minimal', 'advanced'],
      description: 'Visual variant of the color picker',
      table: {
        type: { summary: 'ColorPickerVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the color picker',
      table: {
        type: { summary: 'ColorPickerSize' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the color picker is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the color picker is read-only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    allowAlpha: {
      control: { type: 'boolean' },
      description: 'Whether to allow alpha channel selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    defaultFormat: {
      control: { type: 'select' },
      options: ['hex', 'rgb', 'rgba', 'hsl', 'hsla'],
      description: 'Default color format',
      table: {
        type: { summary: 'ColorFormat' },
        defaultValue: { summary: 'hex' },
      },
    },
    showPreview: {
      control: { type: 'boolean' },
      description: 'Whether to show color preview',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showInputs: {
      control: { type: 'boolean' },
      description: 'Whether to show color inputs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showSliders: {
      control: { type: 'boolean' },
      description: 'Whether to show color sliders',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showPresets: {
      control: { type: 'boolean' },
      description: 'Whether to show preset colors',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the color picker',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select color' },
      },
    },
    swatchShape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: 'Shape of color swatches',
      table: {
        type: { summary: "'circle' | 'square'" },
        defaultValue: { summary: 'square' },
      },
    },
    transitionDuration: {
      control: { type: 'number' },
      description: 'Transition duration in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    presetColors: {
      control: { type: 'object' },
      description: 'Array of preset colors',
      table: {
        type: { summary: 'PresetColor[]' },
      },
    },
    popoverPosition: {
      control: { type: 'select' },
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
      ],
      description: 'Position of the popover relative to the trigger',
      table: {
        type: { summary: 'PopoverPosition' },
        defaultValue: { summary: 'bottom' },
      },
    },
    popoverOffset: {
      control: { type: 'text' },
      description: 'Gap between trigger and popover',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '4px' },
      },
    },
    popoverOffsetTop: {
      control: { type: 'number' },
      description: 'Fine-tune top offset',
      table: {
        type: { summary: 'number' },
      },
    },
    popoverOffsetBottom: {
      control: { type: 'number' },
      description: 'Fine-tune bottom offset',
      table: {
        type: { summary: 'number' },
      },
    },
    popoverOffsetLeft: {
      control: { type: 'number' },
      description: 'Fine-tune left offset',
      table: {
        type: { summary: 'number' },
      },
    },
    popoverOffsetRight: {
      control: { type: 'number' },
      description: 'Fine-tune right offset',
      table: {
        type: { summary: 'number' },
      },
    },
    renderTrigger: {
      control: false,
      description: 'Custom trigger renderer',
      table: {
        type: { summary: '(props) => ReactNode' },
      },
    },
    renderSwatch: {
      control: false,
      description: 'Custom swatch renderer',
      table: {
        type: { summary: '(props) => ReactNode' },
      },
    },
    onFocus: {
      action: 'onFocus',
      description: 'Focus event handler',
      table: {
        type: { summary: '() => void' },
      },
    },
    onBlur: {
      action: 'onBlur',
      description: 'Blur event handler',
      table: {
        type: { summary: '() => void' },
      },
    },
    onOpen: {
      action: 'onOpen',
      description: 'Open event handler',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Close event handler',
      table: {
        type: { summary: '() => void' },
      },
    },
    onFormatChange: {
      action: 'onFormatChange',
      description: 'Format change event handler',
      table: {
        type: { summary: '(format: ColorFormat) => void' },
      },
    },
  },
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled state
interface ColorPickerWithStateProps {
  value?: string
  onChange?: (value: string, colorData: any) => void
  [key: string]: any
}

const ColorPickerWithState = (props: ColorPickerWithStateProps) => {
  const [color, setColor] = useState(props.value || '#3b82f6')

  return (
    <div className="space-y-4">
      <ColorPicker
        {...props}
        value={color}
        onChange={(value, colorData) => {
          setColor(value)
          props.onChange?.(value, colorData)
        }}
      />
      <div className="text-sm space-y-1">
        <div>
          Current value: <code className="bg-gray-100 px-1 py-0.5 rounded">{color}</code>
        </div>
      </div>
    </div>
  )
}

// Basic story
export const Basic: Story = {
  render: (args) => <ColorPickerWithState {...args} />,
  args: {
    value: '#3b82f6',
    label: 'Choose a color',
  },
}

// Variants
const VariantsComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')
  const [color3, setColor3] = useState('#ef4444')
  const [color4, setColor4] = useState('#8b5cf6')
  const [color5, setColor5] = useState('#f59e0b')

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <ColorPicker value={color1} onChange={setColor1} variant="default" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Inline</h3>
        <ColorPicker value={color2} onChange={setColor2} variant="inline" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Popover</h3>
        <ColorPicker value={color3} onChange={setColor3} variant="popover" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Minimal</h3>
        <ColorPicker value={color4} onChange={setColor4} variant="minimal" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Advanced</h3>
        <ColorPicker value={color5} onChange={setColor5} variant="advanced" />
      </div>
    </div>
  )
}

export const Variants: Story = {
  render: () => <VariantsComponent />,
}

// Sizes
const SizesComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')
  const [color3, setColor3] = useState('#ef4444')

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Small:</span>
        <ColorPicker value={color1} onChange={setColor1} size="sm" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Medium:</span>
        <ColorPicker value={color2} onChange={setColor2} size="md" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm w-20">Large:</span>
        <ColorPicker value={color3} onChange={setColor3} size="lg" />
      </div>
    </div>
  )
}

export const Sizes: Story = {
  render: () => <SizesComponent />,
}

// States
const StatesComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')
  const [color3, setColor3] = useState('#ef4444')

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Normal</h3>
        <ColorPicker value={color1} onChange={setColor1} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disabled</h3>
        <ColorPicker value={color2} onChange={setColor2} disabled />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Read Only</h3>
        <ColorPicker value={color3} onChange={setColor3} readOnly />
      </div>
    </div>
  )
}

export const States: Story = {
  render: () => <StatesComponent />,
}

// Without Alpha
export const WithoutAlpha: Story = {
  render: (args) => <ColorPickerWithState {...args} />,
  args: {
    value: '#3b82f6',
    allowAlpha: false,
    label: 'Color without alpha',
  },
}

// Custom Preset Colors
export const CustomPresets: Story = {
  render: (args) => <ColorPickerWithState {...args} />,
  args: {
    value: '#FF6B6B',
    presetColors: [
      { value: '#FF6B6B', label: 'Coral' },
      { value: '#4ECDC4', label: 'Turquoise' },
      { value: '#45B7D1', label: 'Sky Blue' },
      { value: '#96CEB4', label: 'Sage' },
      { value: '#FECA57', label: 'Sunflower' },
      { value: '#48DBFB', label: 'Light Blue' },
      { value: '#FF9FF3', label: 'Pink' },
      { value: '#54A0FF', label: 'Royal Blue' },
    ],
  },
}

// Swatch Shapes
const SwatchShapesComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Square Swatches</h3>
        <ColorPicker value={color1} onChange={setColor1} swatchShape="square" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Circle Swatches</h3>
        <ColorPicker value={color2} onChange={setColor2} swatchShape="circle" />
      </div>
    </div>
  )
}

export const SwatchShapes: Story = {
  render: () => <SwatchShapesComponent />,
}

// Display Options
const DisplayOptionsComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')
  const [color3, setColor3] = useState('#ef4444')
  const [color4, setColor4] = useState('#8b5cf6')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Only Sliders</h3>
        <ColorPicker
          value={color1}
          onChange={setColor1}
          variant="inline"
          showInputs={false}
          showPresets={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Only Inputs</h3>
        <ColorPicker
          value={color2}
          onChange={setColor2}
          variant="inline"
          showSliders={false}
          showPresets={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Only Presets</h3>
        <ColorPicker
          value={color3}
          onChange={setColor3}
          variant="inline"
          showSliders={false}
          showInputs={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">All Options</h3>
        <ColorPicker value={color4} onChange={setColor4} variant="inline" />
      </div>
    </div>
  )
}

export const DisplayOptions: Story = {
  render: () => <DisplayOptionsComponent />,
}

// Custom Styling
const CustomStylingComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')
  const [color3, setColor3] = useState('#ef4444')

  return (
    <div className="space-y-4">
      <ColorPicker
        value={color1}
        onChange={setColor1}
        label="Custom Border"
        borderWidth="2px"
        borderColor="#8b5cf6"
        borderRadius="12px"
        focusRingColor="rgba(139, 92, 246, 0.3)"
      />

      <ColorPicker
        value={color2}
        onChange={setColor2}
        label="Custom Colors"
        backgroundColor="#f3f4f6"
        textColor="#1f2937"
        popoverBackgroundColor="#fafafa"
        popoverBorderColor="#e5e7eb"
      />

      <ColorPicker
        value={color3}
        onChange={setColor3}
        label="Custom Sizes"
        padding="12px 20px"
        fontSize="18px"
        swatchSize="32px"
        sliderHeight="12px"
        sliderThumbSize="20px"
      />
    </div>
  )
}

export const CustomStyling: Story = {
  render: () => <CustomStylingComponent />,
}

// Custom Trigger
const CustomTriggerComponent = () => {
  const [color, setColor] = useState('#3b82f6')

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      renderTrigger={({ color, onClick, disabled }) => (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: color.hex }}
          />
          <div className="text-left">
            <div className="text-sm font-medium">Selected Color</div>
            <div className="text-xs text-gray-500">{color.hex}</div>
          </div>
        </button>
      )}
    />
  )
}

export const CustomTrigger: Story = {
  render: () => <CustomTriggerComponent />,
}

// Custom Swatch
const CustomSwatchComponent = () => {
  const [color, setColor] = useState('#3b82f6')

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      variant="inline"
      renderSwatch={({ color, selected, onClick }) => (
        <button
          onClick={onClick}
          className={cn(
            'relative w-10 h-10 rounded-lg transition-all',
            'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
            selected && 'ring-2 ring-offset-2 ring-primary-500'
          )}
          style={{ backgroundColor: color }}
        >
          {selected && (
            <svg
              className="absolute inset-0 w-full h-full p-2 text-white drop-shadow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
    />
  )
}

export const CustomSwatch: Story = {
  render: () => <CustomSwatchComponent />,
}

// Form Integration
const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Brand Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Enter brand name"
        />
      </div>

      <ColorPicker
        value={formData.primaryColor}
        onChange={(value) => setFormData({ ...formData, primaryColor: value })}
        label="Primary Color"
      />

      <ColorPicker
        value={formData.secondaryColor}
        onChange={(value) => setFormData({ ...formData, secondaryColor: value })}
        label="Secondary Color"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        Save Brand Colors
      </button>

      <div className="text-sm space-y-1 p-3 bg-gray-50 rounded">
        <div>Brand: {formData.name || 'Not set'}</div>
        <div>Primary: {formData.primaryColor}</div>
        <div>Secondary: {formData.secondaryColor}</div>
      </div>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

// Keyboard Navigation
const KeyboardNavigationComponent = () => {
  const [color, setColor] = useState('#3b82f6')

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 space-y-1">
        <p>• Tab to focus the color picker</p>
        <p>• Enter or Space to open/close popover</p>
        <p>• Arrow keys to adjust sliders</p>
        <p>• Escape to close popover</p>
      </div>

      <ColorPicker value={color} onChange={setColor} label="Try keyboard navigation" />
    </div>
  )
}

export const KeyboardNavigation: Story = {
  render: () => <KeyboardNavigationComponent />,
}

// Compound Component Usage
const CompoundUsageComponent = () => {
  const [color, setColor] = useState('#3b82f6')

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Custom Layout with Compound Components</h3>
        <ColorPicker value={color} onChange={setColor}>
          <div className="space-y-4">
            <ColorPicker.Trigger />
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <ColorPicker.Sliders />
              <hr className="border-gray-200" />
              <ColorPicker.Inputs />
              <hr className="border-gray-200" />
              <ColorPicker.Presets />
            </div>
          </div>
        </ColorPicker>
      </div>
    </div>
  )
}

export const CompoundUsage: Story = {
  render: () => <CompoundUsageComponent />,
}

// Popover Positioning
const PopoverPositioningComponent = () => {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#10b981')
  const [color3, setColor3] = useState('#ef4444')
  const [color4, setColor4] = useState('#8b5cf6')

  return (
    <div className="grid grid-cols-2 gap-8 min-h-[400px] place-items-center">
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium">Top Position</h3>
        <ColorPicker
          value={color1}
          onChange={setColor1}
          popoverPosition="top"
          popoverOffset="8px"
        />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium">Right Position</h3>
        <ColorPicker
          value={color2}
          onChange={setColor2}
          popoverPosition="right"
          popoverOffset="12px"
        />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium">Bottom-Start</h3>
        <ColorPicker
          value={color3}
          onChange={setColor3}
          popoverPosition="bottom-start"
          popoverOffsetTop={10}
          popoverOffsetLeft={-20}
        />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium">Left with Large Offset</h3>
        <ColorPicker
          value={color4}
          onChange={setColor4}
          popoverPosition="left"
          popoverOffset="20px"
        />
      </div>
    </div>
  )
}

export const PopoverPositioning: Story = {
  render: () => <PopoverPositioningComponent />,
  parameters: {
    layout: 'padded',
  },
}

// Copy to Clipboard
const CopyToClipboardComponent = () => {
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <ColorPicker value={color} onChange={setColor} label="Click the button to copy color" />

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        {copied ? 'Copied!' : `Copy ${color}`}
      </button>
    </div>
  )
}

export const CopyToClipboard: Story = {
  render: () => <CopyToClipboardComponent />,
}

// Async Color Updates
const AsyncUpdatesComponent = () => {
  const [color, setColor] = useState('#3b82f6')
  const [saving, setSaving] = useState(false)
  const [savedColor, setSavedColor] = useState('#3b82f6')

  const handleColorChange = async (value: string) => {
    setColor(value)
    setSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSavedColor(value)
    setSaving(false)
  }

  return (
    <div className="space-y-4">
      <ColorPicker
        value={color}
        onChange={handleColorChange}
        label="Color with async save"
        disabled={saving}
      />

      <div className="flex items-center gap-2 text-sm">
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-600">Saving...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600">Saved: {savedColor}</span>
          </>
        )}
      </div>
    </div>
  )
}

export const AsyncUpdates: Story = {
  render: () => <AsyncUpdatesComponent />,
}
