import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip, ChipContainer, ChipItem, ChipInput } from './Chip'

/**
 * Chip is a versatile component for displaying selectable or removable tags with extensive customization options.
 *
 * ## Features
 * - **Multiple Variants**: 5 visual styles from subtle to eye-catching designs (default, filled, outlined, soft, gradient)
 * - **Flexible Sizing**: 3 size options from small to large (sm, md, lg)
 * - **Status States**: Built-in semantic status colors for different contexts (default, success, warning, error, info)
 * - **Interactive Elements**: Support for selection, removal, and input with hover effects
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use ChipContainer, ChipItem, and ChipInput for full control
 * - **Extensive Styling**: Over 50 style props for complete visual customization
 * - **Form Integration**: Works seamlessly in forms with controlled/uncontrolled modes
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Input Validation**: Built-in validation for adding new chips
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Chip value="React" selectable />
 * <Chip value={["React", "Vue"]} multiple selectable />
 * ```
 *
 * ### Interactive Chips:
 * ```tsx
 * <Chip
 *   value={chips}
 *   onChange={setChips}
 *   multiple
 *   removable
 *   onRemove={(chip) => console.log('removed:', chip)}
 * >
 *   <ChipContainer>
 *     {chips.map(chip => (
 *       <ChipItem key={chip} value={chip} />
 *     ))}
 *     <ChipInput placeholder="Add chip..." />
 *   </ChipContainer>
 * </Chip>
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <Chip value={value} onChange={setValue}>
 *   <ChipContainer>
 *     <ChipItem value="React" icon="⚛️" />
 *     <ChipItem value="Vue" icon="💚" />
 *     <ChipInput placeholder="Add more..." />
 *   </ChipContainer>
 * </Chip>
 * ```
 *
 * ### With Validation:
 * ```tsx
 * <Chip value={chips} onChange={setChips} multiple>
 *   <ChipContainer>
 *     {chips.map(chip => (
 *       <ChipItem key={chip} value={chip} />
 *     ))}
 *     <ChipInput
 *       placeholder="Add chip..."
 *       validateInput={(value) => {
 *         if (value.length < 2) return 'Minimum 2 characters'
 *         if (!/^[a-zA-Z]+$/.test(value)) return 'Only letters allowed'
 *         return true
 *       }}
 *     />
 *   </ChipContainer>
 * </Chip>
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Chip
 *   value={chips}
 *   onChange={setChips}
 *   backgroundColor="#6366f1"
 *   textColor="white"
 *   borderRadius="20px"
 *   padding="8px 16px"
 *   boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
 * >
 *   Custom Styled Chips
 * </Chip>
 * ```
 *
 * ### Form Integration:
 * ```tsx
 * const [skills, setSkills] = useState(['React', 'TypeScript'])
 *
 * <Chip value={skills} onChange={setSkills} multiple>
 *   <ChipContainer>
 *     {skills.map(skill => (
 *       <ChipItem key={skill} value={skill} />
 *     ))}
 *     <ChipInput placeholder="Add skill..." />
 *   </ChipContainer>
 * </Chip>
 * ```
 */
const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    value: {
      control: false,
      description: 'The selected chip(s). Can be string, string[], or null',
      table: {
        category: 'Core Props',
        type: { summary: 'string | string[] | null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback fired when the value changes',
      table: {
        category: 'Core Props',
        type: { summary: '(value: string | string[] | null) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'soft', 'gradient'],
      description: 'Visual style variant of the chip',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chip component',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status state for semantic coloring',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the chip interactions',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required (affects ARIA attributes)',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Enable chip selection behavior',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple chip selections',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    maxChips: {
      control: 'number',
      description: 'Maximum number of chips allowed',
      table: {
        category: 'Core Props',
        type: { summary: 'number' },
      },
    },

    // Content Props
    children: {
      control: false,
      description: 'Main content of the chip component',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text above the component',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the component',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no chips are selected',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'No chips selected' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown when loading',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    removable: {
      control: 'boolean',
      description: 'Allow removing chips with close button',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    renderChip: {
      control: false,
      description: 'Custom render function for chips',
      table: {
        category: 'Content',
        type: { summary: '(value: string, isSelected: boolean) => React.ReactNode' },
      },
    },

    // Container Styles
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Border width (e.g., "1px", "2px")',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double'],
      description: 'Border style',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius (e.g., "8px", "50%")',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding for the chip',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    paddingX: {
      control: 'text',
      description: 'Horizontal padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    paddingY: {
      control: 'text',
      description: 'Vertical padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between chip elements',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },

    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size (e.g., "14px", "1rem")',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontFamily: {
      control: 'text',
      description: 'Font family',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },

    // Hover & Focus Effects
    hoverBackgroundColor: {
      control: 'color',
      description: 'Background color on hover',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingWidth: {
      control: 'text',
      description: 'Focus ring width',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingOffset: {
      control: 'text',
      description: 'Focus ring offset',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusBorderColor: {
      control: 'color',
      description: 'Border color when focused',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusBackgroundColor: {
      control: 'color',
      description: 'Background color when focused',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },

    // Shadow Effects
    boxShadow: {
      control: 'text',
      description: 'Box shadow for the chip',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    focusBoxShadow: {
      control: 'text',
      description: 'Box shadow when focused',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    hoverBoxShadow: {
      control: 'text',
      description: 'Box shadow on hover',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },

    // Icon customization
    iconColor: {
      control: 'color',
      description: 'Color for icons',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },
    removeIconColor: {
      control: 'color',
      description: 'Color for remove button icon',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },
    loadingIconColor: {
      control: 'color',
      description: 'Color for loading spinner',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },

    // Container styles
    containerBackgroundColor: {
      control: 'color',
      description: 'Background color of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerBorderColor: {
      control: 'color',
      description: 'Border color of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerBorderWidth: {
      control: 'text',
      description: 'Border width of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerBorderRadius: {
      control: 'text',
      description: 'Border radius of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerPadding: {
      control: 'text',
      description: 'Padding of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerGap: {
      control: 'text',
      description: 'Gap between container elements',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },

    // Label styles
    labelFontSize: {
      control: 'text',
      description: 'Font size of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelFontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelColor: {
      control: 'color',
      description: 'Color of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelMarginBottom: {
      control: 'text',
      description: 'Margin bottom of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },

    // Helper text styles
    helperTextFontSize: {
      control: 'text',
      description: 'Font size of the helper text',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },
    helperTextColor: {
      control: 'color',
      description: 'Color of the helper text',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },
    helperTextMarginTop: {
      control: 'text',
      description: 'Margin top of the helper text',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },

    // Event Handlers
    onRemove: {
      control: false,
      description: 'Callback fired when a chip is removed',
      table: {
        category: 'Event Handlers',
        type: { summary: '(value: string) => void' },
      },
    },
    onSelect: {
      control: false,
      description: 'Callback fired when a chip is selected',
      table: {
        category: 'Event Handlers',
        type: { summary: '(value: string) => void' },
      },
    },
    onClick: {
      control: false,
      description: 'Click event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onMouseEnter: {
      control: false,
      description: 'Mouse enter event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onMouseLeave: {
      control: false,
      description: 'Mouse leave event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Key down event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.KeyboardEvent) => void' },
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
    'aria-invalid': {
      control: 'boolean',
      description: 'ARIA invalid state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-required': {
      control: 'boolean',
      description: 'ARIA required state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-live': {
      control: 'select',
      options: ['off', 'polite', 'assertive'],
      description: 'ARIA live region behavior',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

const sampleChips = ['React', 'Vue', 'Angular', 'Svelte']
const techChips = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C++']
const statusChips = ['Active', 'Pending', 'Completed', 'Cancelled']

// Wrapper component to handle state for stories
const ChipWithState = (props: any) => {
  const [value, setValue] = useState<string | string[] | null>(
    props.multiple ? props.value || [] : props.value || null
  )

  return <Chip {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <ChipWithState {...args} />,
  args: {
    value: sampleChips[0],
    selectable: true,
  },
}

export const WithLabel: Story = {
  render: (args) => <ChipWithState {...args} />,
  args: {
    value: sampleChips[0],
    label: 'Selected Framework',
    helperText: 'Choose your preferred framework',
    selectable: true,
  },
}

export const Multiple: Story = {
  render: (args) => <ChipWithState {...args} />,
  args: {
    value: sampleChips.slice(0, 2),
    multiple: true,
    selectable: true,
    label: 'Selected Frameworks',
  },
}

export const Removable: Story = {
  render: (args) => <ChipWithState {...args} />,
  args: {
    value: sampleChips,
    multiple: true,
    removable: true,
    label: 'Technologies',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <ChipWithState value={sampleChips[0]} variant="default" label="Default" selectable />
      <ChipWithState value={sampleChips[1]} variant="filled" label="Filled" selectable />
      <ChipWithState value={sampleChips[2]} variant="outlined" label="Outlined" selectable />
      <ChipWithState value={sampleChips[3]} variant="soft" label="Soft" selectable />
      <ChipWithState value={sampleChips[0]} variant="gradient" label="Gradient" selectable />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <ChipWithState value={sampleChips[0]} size="sm" label="Small" selectable />
      <ChipWithState value={sampleChips[1]} size="md" label="Medium" selectable />
      <ChipWithState value={sampleChips[2]} size="lg" label="Large" selectable />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="space-y-6">
      <ChipWithState value={statusChips[0]} status="success" label="Success" selectable />
      <ChipWithState value={statusChips[1]} status="warning" label="Warning" selectable />
      <ChipWithState value={statusChips[2]} status="error" label="Error" selectable />
      <ChipWithState value={statusChips[3]} status="info" label="Info" selectable />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ChipWithState value={sampleChips} multiple removable label="Technologies with Icons">
      <ChipContainer>
        <ChipItem value="React" icon={<span>⚛️</span>} />
        <ChipItem value="Vue" icon={<span>💚</span>} />
        <ChipItem value="Angular" icon={<span>🅰️</span>} />
        <ChipItem value="Svelte" icon={<span>⚡</span>} />
      </ChipContainer>
    </ChipWithState>
  ),
}

export const WithAvatars: Story = {
  render: () => (
    <ChipWithState
      value={['John Doe', 'Jane Smith', 'Bob Johnson']}
      multiple
      removable
      label="Team Members"
    >
      <ChipContainer>
        <ChipItem
          value="John Doe"
          avatar={
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
              JD
            </div>
          }
        />
        <ChipItem
          value="Jane Smith"
          avatar={
            <div className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">
              JS
            </div>
          }
        />
        <ChipItem
          value="Bob Johnson"
          avatar={
            <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
              BJ
            </div>
          }
        />
      </ChipContainer>
    </ChipWithState>
  ),
}

export const WithInput: Story = {
  render: () => (
    <ChipWithState value={sampleChips.slice(0, 2)} multiple removable label="Add Technologies">
      <ChipContainer>
        {sampleChips.slice(0, 2).map((chip) => (
          <ChipItem key={chip} value={chip} />
        ))}
        <ChipInput placeholder="Add technology..." />
      </ChipContainer>
    </ChipWithState>
  ),
}

export const MaxChips: Story = {
  render: () => (
    <ChipWithState
      value={techChips.slice(0, 3)}
      multiple
      removable
      maxChips={3}
      label="Max 3 Technologies"
      helperText="You can only select up to 3 technologies"
    >
      <ChipContainer>
        {techChips.slice(0, 3).map((chip) => (
          <ChipItem key={chip} value={chip} />
        ))}
        <ChipInput placeholder="Add technology..." />
      </ChipContainer>
    </ChipWithState>
  ),
}

export const Loading: Story = {
  render: () => <ChipWithState loading label="Loading Chips" />,
}

const DisabledComponent = () => {
  const [value] = useState<string[]>(sampleChips.slice(0, 2))
  return (
    <Chip
      value={value}
      disabled
      label="Disabled Chips"
      helperText="These chips cannot be modified"
    />
  )
}

export const Disabled: Story = {
  render: () => <DisabledComponent />,
}

export const CustomRendering: Story = {
  render: () => (
    <ChipWithState
      value={sampleChips}
      multiple
      label="Custom Rendered Chips"
      renderChip={(value, isSelected) => (
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className={isSelected ? 'font-bold' : ''}>{value}</span>
          {isSelected && <span className="text-green-500">✓</span>}
        </div>
      )}
    />
  ),
}

const ControlledComponent = () => {
  const [value, setValue] = useState<string | null>(sampleChips[0])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(sampleChips[0])}>
          Select React
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(sampleChips[1])}>
          Select Vue
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(null)}>
          Clear
        </button>
      </div>
      <Chip
        value={value}
        onChange={(newValue) => setValue(newValue as string | null)}
        selectable
        label="Controlled Chip"
      />
      {value && <p className="text-sm text-gray-600">Selected: {value}</p>}
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledComponent />,
}

export const Validation: Story = {
  render: () => (
    <ChipWithState
      value={[]}
      multiple
      label="Validated Input"
      helperText="Only alphanumeric values are allowed"
    >
      <ChipContainer>
        <ChipInput
          placeholder="Add validated chip..."
          validateInput={(value) => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
              return 'Only alphanumeric characters are allowed'
            }
            if (value.length < 2) {
              return 'Minimum 2 characters required'
            }
            return true
          }}
        />
      </ChipContainer>
    </ChipWithState>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <ChipWithState
      value={null}
      label="Empty State"
      emptyMessage="No chips selected. Add some to get started."
    />
  ),
}

export const LongList: Story = {
  render: () => (
    <ChipWithState
      value={Array.from({ length: 10 }, (_, i) => `Chip ${i + 1}`)}
      multiple
      removable
      label="Many Chips"
      helperText="Scroll to see all chips"
    />
  ),
}

export const CustomStyled: Story = {
  render: () => (
    <ChipWithState
      value={sampleChips.slice(0, 2)}
      multiple
      removable
      label="Custom Styled Chips"
      helperText="This demonstrates custom styling capabilities"
      // Border styles
      borderWidth="2px"
      borderColor="#3b82f6"
      borderStyle="solid"
      borderRadius="20px"
      // Text customization
      fontSize="14px"
      fontWeight="600"
      textColor="#1e293b"
      // Colors
      backgroundColor="#f8fafc"
      selectedBackgroundColor="#dbeafe"
      // Focus styles
      focusRingColor="#3b82f6"
      focusRingWidth="3px"
      focusBorderColor="#2563eb"
      focusBackgroundColor="#ffffff"
      // Shadow
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      focusBoxShadow="0 4px 8px rgba(0, 0, 0, 0.15)"
      hoverBoxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      // Padding
      paddingX="12px"
      paddingY="6px"
      gap="8px"
      // Icon colors
      iconColor="#64748b"
      removeIconColor="#ef4444"
      // Container styles
      containerBackgroundColor="#ffffff"
      containerBorderColor="#e2e8f0"
      containerBorderWidth="1px"
      containerBorderRadius="8px"
      containerPadding="12px"
      containerGap="8px"
      // Label styles
      labelFontSize="16px"
      labelFontWeight="600"
      labelColor="#0f172a"
      labelMarginBottom="8px"
      // Helper text styles
      helperTextFontSize="14px"
      helperTextColor="#64748b"
      helperTextMarginTop="6px"
      // Required color
      requiredColor="#dc2626"
    />
  ),
}

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Gradient Style</h3>
        <ChipWithState
          value={sampleChips.slice(0, 3)}
          multiple
          removable
          variant="gradient"
          borderWidth="0"
          borderRadius="20px"
          padding="8px 16px"
          fontSize="14px"
          fontWeight="600"
          containerBackgroundColor="transparent"
          containerBorderWidth="0"
          containerPadding="8px"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Flat Style</h3>
        <ChipWithState
          value={sampleChips.slice(0, 3)}
          multiple
          removable
          variant="soft"
          borderWidth="0"
          borderRadius="6px"
          backgroundColor="#f1f5f9"
          textColor="#475569"
          fontSize="13px"
          padding="6px 12px"
          containerBackgroundColor="#ffffff"
          containerBorderWidth="0"
          containerBorderRadius="6px"
          containerPadding="8px"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dark Mode Style</h3>
        <ChipWithState
          value={sampleChips.slice(0, 3)}
          multiple
          removable
          variant="outlined"
          borderWidth="1px"
          borderColor="#374151"
          borderRadius="8px"
          backgroundColor="#1f2937"
          textColor="#f9fafb"
          fontSize="14px"
          focusBorderColor="#60a5fa"
          focusRingColor="#60a5fa"
          focusRingWidth="2px"
          containerBackgroundColor="#1f2937"
          containerBorderColor="#374151"
          containerBorderRadius="8px"
          iconColor="#9ca3af"
          removeIconColor="#ef4444"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rounded Pill Style</h3>
        <ChipWithState
          value={sampleChips.slice(0, 3)}
          multiple
          removable
          variant="filled"
          borderWidth="0"
          borderRadius="9999px"
          backgroundColor="#e0e7ff"
          textColor="#3730a3"
          padding="8px 16px"
          fontSize="14px"
          focusRingColor="#8b5cf6"
          focusRingWidth="3px"
          focusRingOffset="2px"
          containerBorderRadius="12px"
          containerPadding="8px"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Material Design Style</h3>
        <ChipWithState
          value={sampleChips.slice(0, 3)}
          multiple
          removable
          variant="default"
          borderWidth="1px"
          borderColor="#e0e0e0"
          borderRadius="16px"
          backgroundColor="#ffffff"
          textColor="#212121"
          fontSize="14px"
          fontWeight="400"
          padding="8px 12px"
          focusBorderColor="#1976d2"
          focusRingColor="#1976d2"
          focusRingWidth="2px"
          containerBackgroundColor="#ffffff"
          containerBorderRadius="4px"
          containerPadding="8px"
          iconColor="#757575"
          removeIconColor="#f44336"
        />
      </div>
    </div>
  ),
}

// Example showing how to use in a form
const FormExampleComponent = () => {
  const [formData, setFormData] = useState({
    skills: [] as string[],
    interests: [] as string[],
    languages: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(`Form submitted!\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Chip
        value={formData.skills}
        onChange={(value) => setFormData({ ...formData, skills: value as string[] })}
        multiple
        label="Skills"
        helperText="Select your technical skills"
      >
        <ChipContainer>
          {formData.skills.map((skill) => (
            <ChipItem key={skill} value={skill} />
          ))}
          <ChipInput placeholder="Add skill..." />
        </ChipContainer>
      </Chip>

      <Chip
        value={formData.interests}
        onChange={(value) => setFormData({ ...formData, interests: value as string[] })}
        multiple
        maxChips={5}
        label="Interests"
        helperText="Select up to 5 interests"
      >
        <ChipContainer>
          {formData.interests.map((interest) => (
            <ChipItem key={interest} value={interest} />
          ))}
          <ChipInput placeholder="Add interest..." />
        </ChipContainer>
      </Chip>

      <Chip
        value={formData.languages}
        onChange={(value) => setFormData({ ...formData, languages: value as string[] })}
        multiple
        label="Programming Languages"
        helperText="Select languages you know"
      >
        <ChipContainer>
          {formData.languages.map((lang) => (
            <ChipItem key={lang} value={lang} />
          ))}
          <ChipInput
            placeholder="Add language..."
            validateInput={(value) => {
              if (value.length < 2) return 'Minimum 2 characters'
              if (!/^[a-zA-Z]+$/.test(value)) return 'Only letters allowed'
              return true
            }}
          />
        </ChipContainer>
      </Chip>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setFormData({ skills: [], interests: [], languages: [] })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
}

const CompoundComponentsComponent = () => {
  const [chips, setChips] = useState<string[]>(['React', 'Vue'])

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Using Compound Components</h3>
      <Chip value={chips} onChange={setChips} multiple label="Custom Layout">
        <ChipContainer>
          {chips.map((chip) => (
            <ChipItem key={chip} value={chip} icon={<span>🔧</span>} />
          ))}
          <ChipInput placeholder="Add technology..." />
        </ChipContainer>
      </Chip>

      <div className="text-sm text-gray-600">
        <p>This demonstrates using the compound component pattern:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Chip - Main container with context</li>
          <li>ChipContainer - Wrapper for chips and input</li>
          <li>ChipItem - Individual chip with remove button</li>
          <li>ChipInput - Input field for adding new chips</li>
        </ul>
      </div>
    </div>
  )
}

export const CompoundComponents: Story = {
  render: () => <CompoundComponentsComponent />,
}
