import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DatePicker } from './DatePicker'
import type { DatePickerProps, DateRange as DateRangeType, DatePickerMode } from './DatePicker'

/**
 * # DatePicker Component
 *
 * A comprehensive, accessible date picker component with support for single dates, date ranges, and multiple date selection.
 * Built with compound component architecture for maximum flexibility and customization.
 *
 * ## Features
 *
 * ### Core Functionality
 * - **Single Date Selection**: Select individual dates with optional time support
 * - **Date Range Selection**: Pick start and end dates with visual range indication
 * - **Multiple Date Selection**: Select multiple individual dates
 * - **Keyboard Navigation**: Full keyboard support with arrow keys, enter, escape
 * - **Accessibility**: WCAG compliant with proper ARIA attributes and screen reader support
 *
 * ### Modes & Variants
 * - **Modes**: `single`, `range`, `multiple`
 * - **Variants**: `default`, `bordered`, `minimal`, `inline-calendar`, `popup-calendar`, `withTime`, `range`, `month-only`
 * - **Sizes**: `sm`, `md`, `lg`
 *
 * ### Date Configuration
 * - **Min/Max Dates**: Restrict selectable date ranges
 * - **Disabled Dates**: Disable specific dates, date ranges, or days of week
 * - **Locale Support**: Customizable locales, date formats, and first day of week
 *
 * ### Customization
 * - **Custom Renderers**: Replace day cells, headers, footers, or input field
 * - **Styling Props**: Comprehensive styling options for colors, borders, spacing
 * - **Icons**: Custom calendar, clear, navigation icons
 *
 * ## Basic Usage
 *
 * ```tsx
 * import { DatePicker } from 'its-just-ui'
 *
 * // Single date picker
 * const [date, setDate] = useState<Date>()
 * return <DatePicker value={date} onChange={setDate} />
 *
 * // Date range picker
 * const [range, setRange] = useState<DateRange>()
 * return <DatePicker mode="range" value={range} onChange={setRange} />
 *
 * // Inline calendar
 * return <DatePicker inline variant="inline-calendar" />
 * ```
 *
 * ## Controlled vs Uncontrolled
 *
 * The DatePicker supports both controlled and uncontrolled usage patterns:
 *
 * ```tsx
 * // Controlled - you manage the state
 * const [date, setDate] = useState<Date>()
 * const [open, setOpen] = useState(false)
 * return (
 *   <DatePicker
 *     value={date}
 *     onChange={setDate}
 *     open={open}
 *     onOpenChange={setOpen}
 *   />
 * )
 *
 * // Uncontrolled - component manages its own state
 * return (
 *   <DatePicker
 *     defaultValue={new Date()}
 *     defaultOpen={false}
 *   />
 * )
 * ```
 *
 * ## Custom Renderers
 *
 * ```tsx
 * // Custom day renderer
 * const renderDay = (date, isSelected, isDisabled, isToday, isInRange) => (
 *   <div className={`custom-day ${isSelected ? 'selected' : ''}`}>
 *     {date.getDate()}
 *   </div>
 * )
 *
 * return <DatePicker renderDay={renderDay} />
 * ```
 *
 * ## Accessibility
 *
 * The DatePicker is fully accessible with:
 * - **Keyboard Navigation**: Arrow keys for date navigation, Enter to select, Escape to close
 * - **Screen Reader Support**: Proper ARIA labels and announcements
 * - **Focus Management**: Logical focus flow and focus trapping in calendar
 * - **High Contrast**: Supports high contrast mode and custom color themes
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        component:
          'A comprehensive date picker component with support for single dates, ranges, and multiple selection modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    value: {
      description: 'The controlled value of the date picker',
      control: false,
    },
    defaultValue: {
      description: 'The default value for uncontrolled usage',
      control: 'date',
    },
    mode: {
      description: 'The selection mode',
      control: 'select',
      options: ['single', 'range', 'multiple'],
      table: {
        type: { summary: "'single' | 'range' | 'multiple'" },
        defaultValue: { summary: "'single'" },
      },
    },
    variant: {
      description: 'The visual variant',
      control: 'select',
      options: [
        'default',
        'bordered',
        'minimal',
        'inline-calendar',
        'popup-calendar',
        'withTime',
        'range',
        'month-only',
      ],
      table: {
        type: {
          summary:
            "'default' | 'bordered' | 'minimal' | 'inline-calendar' | 'popup-calendar' | 'withTime' | 'range' | 'month-only'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      description: 'The size of the component',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    status: {
      description: 'The validation status',
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      table: {
        type: { summary: "'default' | 'success' | 'warning' | 'error' | 'info'" },
        defaultValue: { summary: "'default'" },
      },
    },

    // State Control
    open: {
      description: 'Controlled open state',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the component is disabled',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      description: 'Whether the input is read-only',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description: 'Whether the field is required',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      description: 'Whether to show clear button',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },

    // Date Configuration
    minDate: {
      description: 'Minimum selectable date',
      control: 'date',
    },
    maxDate: {
      description: 'Maximum selectable date',
      control: 'date',
    },
    showTime: {
      description: 'Whether to show time picker',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    todayButton: {
      description: 'Whether to show today button',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },

    // Locale and Formatting
    placeholder: {
      description: 'Input placeholder text',
      control: 'text',
      table: {
        defaultValue: { summary: "'Select date'" },
      },
    },

    // UI Configuration
    inline: {
      description: 'Whether to show inline calendar',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    closeOnSelect: {
      description: 'Whether to close calendar on selection',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },

    // Labels
    label: {
      description: 'Input label',
      control: 'text',
    },
    helperText: {
      description: 'Helper text below input',
      control: 'text',
    },
    errorText: {
      description: 'Error text (when status is error)',
      control: 'text',
    },

    // Styling - Basic
    borderRadius: {
      description: 'Border radius',
      control: 'text',
    },
    backgroundColor: {
      description: 'Background color',
      control: 'color',
    },
    borderColor: {
      description: 'Border color',
      control: 'color',
    },

    // Event Handlers
    onChange: {
      description: 'Callback when value changes',
      action: 'changed',
      control: false,
    },
    onOpenChange: {
      description: 'Callback when open state changes',
      action: 'openChanged',
      control: false,
    },
    onFocus: {
      description: 'Callback when input gains focus',
      action: 'focused',
      control: false,
    },
    onBlur: {
      description: 'Callback when input loses focus',
      action: 'blurred',
      control: false,
    },

    // Disable controls for complex props
    disabledDates: { control: false },
    locale: { control: false },
    renderDay: { control: false },
    renderHeader: { control: false },
    renderFooter: { control: false },
    calendarIcon: { control: false },
    clearIcon: { control: false },
    previousIcon: { control: false },
    nextIcon: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

// Helper component for controlled examples
const ControlledDatePicker = ({
  mode = 'single',
  ...props
}: DatePickerProps & { mode?: DatePickerMode }) => {
  const [value, setValue] = useState<Date | DateRangeType | Date[] | undefined>()
  const [open, setOpen] = useState(false)

  return (
    <div className="h-96">
      <DatePicker
        {...props}
        mode={mode}
        value={value}
        onChange={setValue}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}

// Basic Stories
export const Default: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    placeholder: 'Select a date',
  },
}

export const WithLabel: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    label: 'Birth Date',
    placeholder: 'Select your birth date',
    helperText: 'This will be used for age verification',
    required: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Small</label>
        <ControlledDatePicker size="sm" placeholder="Small date picker" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Medium (Default)</label>
        <ControlledDatePicker size="md" placeholder="Medium date picker" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <ControlledDatePicker size="lg" placeholder="Large date picker" />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Default</label>
        <ControlledDatePicker variant="default" placeholder="Default variant" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bordered</label>
        <ControlledDatePicker variant="bordered" placeholder="Bordered variant" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Minimal</label>
        <ControlledDatePicker variant="minimal" placeholder="Minimal variant" />
      </div>
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Default</label>
        <ControlledDatePicker status="default" placeholder="Default status" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Success</label>
        <ControlledDatePicker
          status="success"
          placeholder="Success status"
          helperText="Date is valid"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Warning</label>
        <ControlledDatePicker
          status="warning"
          placeholder="Warning status"
          helperText="Please verify this date"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Error</label>
        <ControlledDatePicker
          status="error"
          placeholder="Error status"
          errorText="Invalid date selected"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Info</label>
        <ControlledDatePicker
          status="info"
          placeholder="Info status"
          helperText="Additional information about this field"
        />
      </div>
    </div>
  ),
}

// Mode Stories
const SingleDateComponent: React.FC = () => {
  const [date, setDate] = useState<Date>()
  return (
    <div className="space-y-4">
      <DatePicker
        mode="single"
        value={date}
        onChange={(value) => setDate(value as Date | undefined)}
        label="Select Date"
        placeholder="Choose a date"
      />
      {date && <p className="text-sm text-gray-600">Selected: {date.toLocaleDateString()}</p>}
    </div>
  )
}

export const SingleDate: Story = {
  render: () => <SingleDateComponent />,
}

const DateRangeComponent: React.FC = () => {
  const [range, setRange] = useState<DateRangeType>()
  return (
    <div className="space-y-4">
      <DatePicker
        mode="range"
        value={range}
        onChange={(value) => setRange(value as DateRangeType | undefined)}
        label="Select Date Range"
        placeholder="Choose start and end dates"
      />
      {range && (
        <div className="text-sm text-gray-600">
          {range.start && <p>Start: {range.start.toLocaleDateString()}</p>}
          {range.end && <p>End: {range.end.toLocaleDateString()}</p>}
        </div>
      )}
    </div>
  )
}

export const DateRange: Story = {
  render: () => <DateRangeComponent />,
}

const MultipleDatesComponent: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([])
  return (
    <div className="space-y-4">
      <DatePicker
        mode="multiple"
        value={dates}
        onChange={(value) => setDates(Array.isArray(value) ? value : [])}
        label="Select Multiple Dates"
        placeholder="Choose multiple dates"
        closeOnSelect={false}
      />
      {dates.length > 0 && (
        <div className="text-sm text-gray-600">
          <p>Selected dates:</p>
          <ul className="list-disc list-inside">
            {dates.map((date, index) => (
              <li key={index}>{date.toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const MultipleDates: Story = {
  render: () => <MultipleDatesComponent />,
}

// Configuration Stories
export const WithMinMaxDates: Story = {
  render: () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

    return (
      <ControlledDatePicker
        label="Select Date (Limited Range)"
        placeholder="Select within allowed range"
        minDate={minDate}
        maxDate={maxDate}
        helperText={`Available: ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`}
      />
    )
  },
}

export const WithDisabledDates: Story = {
  render: () => {
    const disabledDates = {
      days: [0, 6], // Disable weekends
      dates: [
        new Date(2024, 0, 1), // New Year's Day
        new Date(2024, 6, 4), // July 4th
        new Date(2024, 11, 25), // Christmas
      ],
    }

    return (
      <ControlledDatePicker
        label="Business Days Only"
        placeholder="Weekends disabled"
        disabledDates={disabledDates}
        helperText="Weekends and holidays are disabled"
      />
    )
  },
}

export const InlineCalendar: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold">Inline Calendar</h3>
      <ControlledDatePicker inline variant="inline-calendar" todayButton />
    </div>
  ),
}

// Custom Renderers
export const CustomDayRenderer: Story = {
  render: () => {
    const renderDay = (date: Date, isSelected: boolean, isDisabled: boolean, isToday: boolean) => {
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      return (
        <div
          className={`
            relative flex items-center justify-center w-8 h-8 text-sm transition-colors rounded-full
            ${isSelected ? 'bg-purple-600 text-white' : ''}
            ${isToday && !isSelected ? 'bg-purple-100 font-bold text-purple-600' : ''}
            ${isWeekend && !isSelected && !isToday ? 'text-gray-400' : ''}
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-purple-100'}
          `}
        >
          {date.getDate()}
          {isWeekend && !isSelected && !isDisabled && (
            <div className="absolute -bottom-1 w-1 h-1 bg-orange-400 rounded-full" />
          )}
        </div>
      )
    }

    return (
      <ControlledDatePicker
        label="Custom Day Renderer"
        placeholder="Purple theme with weekend indicators"
        renderDay={renderDay}
        helperText="Weekends are marked with orange dots"
      />
    )
  },
}

// Accessibility & Keyboard Navigation
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Keyboard Navigation Demo</h3>
      <ControlledDatePicker
        label="Keyboard Accessible Date Picker"
        placeholder="Try keyboard navigation"
        helperText="Use Tab to focus, Arrow keys to navigate, Enter to select, Escape to close"
      />
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <h4 className="font-medium mb-2">Keyboard Controls:</h4>
        <ul className="space-y-1">
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Tab</kbd> - Focus input
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> - Open calendar
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">↑↓←→</kbd> - Navigate dates
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> - Select date
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Escape</kbd> - Close calendar
          </li>
        </ul>
      </div>
    </div>
  ),
}

// Form Integration
const FormIntegrationComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    birthDate: undefined as Date | undefined,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold">Form Integration</h3>

      <DatePicker
        label="Birth Date"
        placeholder="Select your birth date"
        value={formData.birthDate}
        onChange={(date) => setFormData((prev) => ({ ...prev, birthDate: date as Date }))}
        required
        maxDate={new Date()}
      />

      <DatePicker
        label="Start Date"
        placeholder="Project start date"
        value={formData.startDate}
        onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date as Date }))}
        minDate={new Date()}
      />

      <DatePicker
        label="End Date"
        placeholder="Project end date"
        value={formData.endDate}
        onChange={(date) => setFormData((prev) => ({ ...prev, endDate: date as Date }))}
        minDate={formData.startDate || new Date()}
        disabled={!formData.startDate}
        helperText={!formData.startDate ? 'Please select start date first' : ''}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Submit Form
      </button>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

// State Management Examples
const ControlledExampleComponent: React.FC = () => {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Controlled Component</h3>
      <DatePicker
        value={date}
        onChange={(value) => setDate(value as Date | undefined)}
        open={open}
        onOpenChange={setOpen}
        label="Controlled Date Picker"
        placeholder="Externally controlled"
      />

      <div className="flex gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {open ? 'Close' : 'Open'} Calendar
        </button>
        <button
          onClick={() => setDate(new Date())}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Set Today
        </button>
        <button
          onClick={() => setDate(undefined)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear
        </button>
      </div>

      {date && <p className="text-sm text-gray-600">Current value: {date.toISOString()}</p>}
    </div>
  )
}

export const ControlledExample: Story = {
  render: () => <ControlledExampleComponent />,
}

export const UncontrolledExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Uncontrolled Component</h3>
      <DatePicker
        defaultValue={new Date()}
        defaultOpen={false}
        label="Uncontrolled Date Picker"
        placeholder="Manages its own state"
        onChange={(date) => console.log('Date changed:', date)}
        helperText="Check console for change events"
      />
    </div>
  ),
}

// Styling Examples
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Styling</h3>
      <ControlledDatePicker
        label="Custom Styled Date Picker"
        placeholder="Custom colors and styling"
        borderRadius="12px"
        borderColor="#6366f1"
        selectedBackgroundColor="#6366f1"
        todayBorderColor="#f59e0b"
        focusRingColor="#6366f1"
        backgroundColor="#f8fafc"
        helperText="Custom indigo theme with rounded corners"
      />
    </div>
  ),
}

// Responsive and Mobile
export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Responsive Design</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ControlledDatePicker size="sm" placeholder="Small on mobile" label="Mobile Small" />
        <ControlledDatePicker size="md" placeholder="Medium responsive" label="Tablet Medium" />
        <ControlledDatePicker size="lg" placeholder="Large on desktop" label="Desktop Large" />
      </div>
    </div>
  ),
}

// Error Handling
const ErrorStatesComponent: React.FC = () => {
  const [date, setDate] = useState<Date>()
  const today = new Date()
  const isWeekend = date && (date.getDay() === 0 || date.getDay() === 6)
  const isFuture = date && date > today

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Error Handling</h3>
      <DatePicker
        value={date}
        onChange={(value) => {
          if (value instanceof Date || value === undefined) {
            setDate(value)
          }
        }}
        label="Business Date Selection"
        placeholder="Select a business day"
        status={isWeekend || isFuture ? 'error' : 'default'}
        errorText={
          isWeekend
            ? 'Weekends are not allowed'
            : isFuture
              ? 'Future dates are not allowed'
              : undefined
        }
        helperText="Only past weekdays are allowed"
      />
    </div>
  )
}

export const ErrorStates: Story = {
  render: () => <ErrorStatesComponent />,
}
