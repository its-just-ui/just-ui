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

// ============================================================================
// Real-World Examples
// ============================================================================

// Hotel Booking System
const HotelBookingComponent: React.FC = () => {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(2)

  const today = new Date()
  const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }
    return 0
  }

  const nights = calculateNights()
  const pricePerNight = 120
  const totalPrice = nights * pricePerNight

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🏨 Hotel Booking System</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Hotel reservation form with date validation
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <h4 className="font-medium text-lg">🌴 Ocean View Resort</h4>
          <span className="text-sm text-yellow-600">⭐⭐⭐⭐⭐</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Check-in Date</label>
            <DatePicker
              value={checkIn}
              onChange={(date) => {
                setCheckIn(date as Date)
                // Auto-set checkout to next day if not set
                if (!checkOut && date) {
                  const nextDay = new Date(date as Date)
                  nextDay.setDate(nextDay.getDate() + 1)
                  setCheckOut(nextDay)
                }
              }}
              placeholder="Select check-in"
              minDate={today}
              maxDate={maxDate}
              status={checkIn ? 'success' : 'default'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Check-out Date</label>
            <DatePicker
              value={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
              placeholder="Select check-out"
              minDate={checkIn || today}
              maxDate={maxDate}
              disabled={!checkIn}
              status={checkOut ? 'success' : 'default'}
              helperText={!checkIn ? 'Select check-in first' : ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {checkIn && checkOut && nights > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">📅 Stay Summary</span>
              <span className="text-sm text-blue-600">
                {nights} night{nights > 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium">{checkIn.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium">{checkOut.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-medium">{guests}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">${totalPrice}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium">
              Book Now - ${totalPrice}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export const HotelBookingSystem: Story = {
  render: () => <HotelBookingComponent />,
}

// Project Timeline Management
const ProjectTimelineComponent: React.FC = () => {
  const [projectData, setProjectData] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    milestones: [] as Array<{ id: string; name: string; date: Date }>,
  })

  const [newMilestone, setNewMilestone] = useState({
    name: '',
    date: undefined as Date | undefined,
  })

  const today = new Date()
  const maxProjectDate = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate())

  const addMilestone = () => {
    if (newMilestone.name && newMilestone.date) {
      setProjectData((prev) => ({
        ...prev,
        milestones: [
          ...prev.milestones,
          {
            id: Date.now().toString(),
            name: newMilestone.name,
            date: newMilestone.date!,
          },
        ],
      }))
      setNewMilestone({ name: '', date: undefined })
    }
  }

  const getProjectDuration = () => {
    if (projectData.startDate && projectData.endDate) {
      const diffTime = projectData.endDate.getTime() - projectData.startDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(diffDays / 7)
      const days = diffDays % 7
      return `${weeks} weeks${days > 0 ? ` ${days} days` : ''}`
    }
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">📋 Project Timeline Manager</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Project planning with milestones and deadlines
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h4 className="font-medium text-lg mb-4">🚀 New Product Launch</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Start Date</label>
            <DatePicker
              value={projectData.startDate}
              onChange={(date) => setProjectData((prev) => ({ ...prev, startDate: date as Date }))}
              placeholder="Select start date"
              minDate={today}
              maxDate={maxProjectDate}
              status={projectData.startDate ? 'success' : 'default'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project End Date</label>
            <DatePicker
              value={projectData.endDate}
              onChange={(date) => setProjectData((prev) => ({ ...prev, endDate: date as Date }))}
              placeholder="Select end date"
              minDate={projectData.startDate || today}
              maxDate={maxProjectDate}
              disabled={!projectData.startDate}
              status={projectData.endDate ? 'success' : 'default'}
              helperText={!projectData.startDate ? 'Set start date first' : ''}
            />
          </div>
        </div>

        {getProjectDuration() && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              <span className="font-medium">Project Duration:</span> {getProjectDuration()}
            </p>
          </div>
        )}

        <div className="border-t pt-4">
          <h5 className="font-medium mb-3">📌 Add Milestone</h5>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Milestone name"
              value={newMilestone.name}
              onChange={(e) => setNewMilestone((prev) => ({ ...prev, name: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <DatePicker
              value={newMilestone.date}
              onChange={(date) => setNewMilestone((prev) => ({ ...prev, date: date as Date }))}
              placeholder="Select date"
              minDate={projectData.startDate || today}
              maxDate={projectData.endDate || maxProjectDate}
              disabled={!projectData.startDate}
              className="w-48"
            />
            <button
              onClick={addMilestone}
              disabled={!newMilestone.name || !newMilestone.date}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {projectData.milestones.length > 0 && (
            <div>
              <h6 className="font-medium text-sm mb-2">Project Milestones:</h6>
              <div className="space-y-2">
                {projectData.milestones
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between p-2 bg-white border rounded"
                    >
                      <span className="font-medium">{milestone.name}</span>
                      <span className="text-sm text-gray-600">
                        {milestone.date.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const ProjectTimelineManager: Story = {
  render: () => <ProjectTimelineComponent />,
}

// Employee Leave Management
const EmployeeLeaveComponent: React.FC = () => {
  const [leaveType, setLeaveType] = useState('vacation')
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})
  const [reason, setReason] = useState('')

  const today = new Date()
  const maxLeaveDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

  const leaveTypes = {
    vacation: { label: '🏖️ Vacation', color: 'blue', maxDays: 20 },
    sick: { label: '🤒 Sick Leave', color: 'red', maxDays: 10 },
    personal: { label: '👤 Personal', color: 'purple', maxDays: 5 },
    emergency: { label: '🚨 Emergency', color: 'orange', maxDays: 3 },
  }

  const calculateLeaveDays = () => {
    if (dateRange.start && dateRange.end) {
      const diffTime = dateRange.end.getTime() - dateRange.start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end days
      return diffDays > 0 ? diffDays : 0
    }
    return 0
  }

  const leaveDays = calculateLeaveDays()
  const currentLeaveType = leaveTypes[leaveType as keyof typeof leaveTypes]
  const exceedsLimit = leaveDays > currentLeaveType.maxDays

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">📋 Employee Leave Management</h3>
      <p className="text-sm text-gray-600">
        Real-world example: HR leave application system with approval workflow
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <h4 className="font-medium text-lg">📝 Leave Application</h4>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            John Doe - Engineering
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(leaveTypes).map(([key, type]) => (
                <option key={key} value={key}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <DatePicker
                value={dateRange.start}
                onChange={(date) => {
                  setDateRange((prev) => ({ ...prev, start: date as Date }))
                  // Auto-set end date to same day if not set
                  if (!dateRange.end && date) {
                    setDateRange((prev) => ({ ...prev, end: date as Date }))
                  }
                }}
                placeholder="Select start date"
                minDate={today}
                maxDate={maxLeaveDate}
                status={dateRange.start ? 'success' : 'default'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <DatePicker
                value={dateRange.end}
                onChange={(date) => setDateRange((prev) => ({ ...prev, end: date as Date }))}
                placeholder="Select end date"
                minDate={dateRange.start || today}
                maxDate={maxLeaveDate}
                disabled={!dateRange.start}
                status={dateRange.end ? 'success' : 'default'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for your leave request..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {leaveDays > 0 && (
          <div
            className={`mt-4 p-4 rounded-lg border ${
              exceedsLimit ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">📊 Leave Summary</span>
              <span
                className={`text-sm font-medium ${
                  exceedsLimit ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {leaveDays} day{leaveDays > 1 ? 's' : ''}
              </span>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Leave Type:</span>
                <span className="font-medium">{currentLeaveType.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {dateRange.start?.toLocaleDateString()} - {dateRange.end?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Balance:</span>
                <span className={`font-medium ${exceedsLimit ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.max(0, currentLeaveType.maxDays - leaveDays)} days
                </span>
              </div>
            </div>

            {exceedsLimit && (
              <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-800 text-sm">
                ⚠️ This request exceeds your available {currentLeaveType.label.toLowerCase()}{' '}
                balance
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  exceedsLimit || !reason.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={exceedsLimit || !reason.trim()}
              >
                Submit for Approval
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Save Draft
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const EmployeeLeaveManagement: Story = {
  render: () => <EmployeeLeaveComponent />,
}

// Event Planning System
const EventPlanningComponent: React.FC = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: undefined as Date | undefined,
    startTime: '09:00',
    endTime: '17:00',
    type: 'conference',
  })

  const [registrationPeriod, setRegistrationPeriod] = useState<{ start?: Date; end?: Date }>({})

  const today = new Date()
  const maxEventDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())

  const eventTypes = {
    conference: { label: '🎤 Conference', icon: '🎤', duration: '8 hours' },
    workshop: { label: '🛠️ Workshop', icon: '🛠️', duration: '4 hours' },
    webinar: { label: '💻 Webinar', icon: '💻', duration: '2 hours' },
    meetup: { label: '☕ Meetup', icon: '☕', duration: '3 hours' },
  }

  const calculateEventDuration = () => {
    if (eventData.startTime && eventData.endTime) {
      const start = new Date(`2000-01-01T${eventData.startTime}:00`)
      const end = new Date(`2000-01-01T${eventData.endTime}:00`)
      const diffMs = end.getTime() - start.getTime()
      const hours = Math.floor(diffMs / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
    }
    return '0h'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🎉 Event Planning System</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Event management platform with scheduling and registration
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h4 className="font-medium text-lg mb-4">📅 Create New Event</h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Name</label>
              <input
                type="text"
                value={eventData.name}
                onChange={(e) => setEventData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter event name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Type</label>
              <select
                value={eventData.type}
                onChange={(e) => setEventData((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(eventTypes).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Date</label>
              <DatePicker
                value={eventData.date}
                onChange={(date) => setEventData((prev) => ({ ...prev, date: date as Date }))}
                placeholder="Select event date"
                minDate={today}
                maxDate={maxEventDate}
                status={eventData.date ? 'success' : 'default'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="time"
                value={eventData.startTime}
                onChange={(e) => setEventData((prev) => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="time"
                value={eventData.endTime}
                onChange={(e) => setEventData((prev) => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h5 className="font-medium mb-3">📝 Registration Period</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Registration Opens</label>
                <DatePicker
                  value={registrationPeriod.start}
                  onChange={(date) =>
                    setRegistrationPeriod((prev) => ({ ...prev, start: date as Date }))
                  }
                  placeholder="Select start date"
                  minDate={today}
                  maxDate={eventData.date || maxEventDate}
                  status={registrationPeriod.start ? 'success' : 'default'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Registration Closes</label>
                <DatePicker
                  value={registrationPeriod.end}
                  onChange={(date) =>
                    setRegistrationPeriod((prev) => ({ ...prev, end: date as Date }))
                  }
                  placeholder="Select end date"
                  minDate={registrationPeriod.start || today}
                  maxDate={eventData.date || maxEventDate}
                  disabled={!registrationPeriod.start}
                  status={registrationPeriod.end ? 'success' : 'default'}
                />
              </div>
            </div>
          </div>
        </div>

        {eventData.date && eventData.name && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-medium mb-3">📋 Event Summary</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span className="font-medium">{eventData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">
                    {eventTypes[eventData.type as keyof typeof eventTypes].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{eventData.date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{calculateEventDuration()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">
                    {eventData.startTime} - {eventData.endTime}
                  </span>
                </div>
                {registrationPeriod.start && registrationPeriod.end && (
                  <>
                    <div className="flex justify-between">
                      <span>Registration:</span>
                      <span className="font-medium">
                        {registrationPeriod.start.toLocaleDateString()} -{' '}
                        {registrationPeriod.end.toLocaleDateString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                Create Event
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Publish & Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const EventPlanningSystem: Story = {
  render: () => <EventPlanningComponent />,
}
