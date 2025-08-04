import React, {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
  useId,
  useRef,
  useEffect,
  forwardRef,
  memo,
} from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export type DatePickerVariant =
  | 'default'
  | 'bordered'
  | 'minimal'
  | 'inline-calendar'
  | 'popup-calendar'
  | 'withTime'
  | 'range'
  | 'month-only'

export type DatePickerSize = 'sm' | 'md' | 'lg'
export type DatePickerStatus = 'default' | 'success' | 'warning' | 'error' | 'info'
export type DatePickerTransition = 'none' | 'fade' | 'zoom' | 'slide'
export type DatePickerMode = 'single' | 'range' | 'multiple'
export type DatePickerView = 'day' | 'month' | 'year'

export interface DateRange {
  start?: Date
  end?: Date
}

export interface DisabledDateConfig {
  before?: Date
  after?: Date
  dates?: Date[]
  days?: number[] // 0-6 (Sunday-Saturday)
  custom?: (date: Date) => boolean
}

export interface LocaleConfig {
  locale?: string
  monthNames?: string[]
  monthNamesShort?: string[]
  dayNames?: string[]
  dayNamesShort?: string[]
  firstDayOfWeek?: number // 0-6 (Sunday-Saturday)
  dateFormat?: string
  timeFormat?: string
  rtl?: boolean
}

export interface DatePickerContextValue {
  // Core state
  selectedDate?: Date
  selectedRange?: DateRange
  selectedDates?: Date[]
  isOpen: boolean
  currentView: DatePickerView
  displayDate: Date
  focusedDate?: Date
  hoveredDate?: Date

  // Configuration
  mode: DatePickerMode
  variant: DatePickerVariant
  size: DatePickerSize
  status: DatePickerStatus
  transition: DatePickerTransition
  locale: LocaleConfig
  disabledDates?: DisabledDateConfig
  minDate?: Date
  maxDate?: Date
  showTime: boolean
  clearable: boolean
  todayButton: boolean
  readOnly: boolean

  // State setters
  setSelectedDate: (date?: Date) => void
  setSelectedRange: (range?: DateRange) => void
  setSelectedDates: (dates?: Date[]) => void
  setIsOpen: (open: boolean) => void
  setCurrentView: (view: DatePickerView) => void
  setDisplayDate: (date: Date) => void
  setFocusedDate: (date?: Date) => void
  setHoveredDate: (date?: Date) => void

  // Event handlers
  onDateSelect: (date: Date) => void
  onClear: () => void
  onTodayClick: () => void

  // Utility functions
  isDateDisabled: (date: Date) => boolean
  isDateSelected: (date: Date) => boolean
  isDateInRange: (date: Date) => boolean
  isDateToday: (date: Date) => boolean
  formatDate: (date: Date) => string

  // Custom renderers
  renderDay?: DayRenderer

  // IDs
  inputId: string
  calendarId: string
  labelId?: string
  descriptionId?: string
  errorId?: string

  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  placeholderColor?: string
  backgroundColor?: string
  selectedBackgroundColor?: string
  todayBorderColor?: string
  focusRingColor?: string
  boxShadow?: string
  calendarPopupShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  calendarPadding?: string
  selectedDateColor?: string
  disabledDateColor?: string
}

// Custom render function types
export type DayRenderer = (
  date: Date,
  isSelected: boolean,
  isDisabled: boolean,
  isToday: boolean,
  isInRange: boolean
) => React.ReactNode

export type HeaderRenderer = (
  displayDate: Date,
  view: DatePickerView,
  onPrevious: () => void,
  onNext: () => void,
  onViewChange: (view: DatePickerView) => void
) => React.ReactNode

export type FooterRenderer = () => React.ReactNode

export interface DatePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onFocus' | 'onBlur' | 'defaultValue'
  > {
  // Core props
  value?: Date | DateRange | Date[]
  defaultValue?: Date | DateRange | Date[]
  mode?: DatePickerMode
  variant?: DatePickerVariant
  size?: DatePickerSize
  status?: DatePickerStatus
  transition?: DatePickerTransition

  // State control
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  clearable?: boolean

  // Date configuration
  minDate?: Date
  maxDate?: Date
  disabledDates?: DisabledDateConfig
  showTime?: boolean
  todayButton?: boolean

  // Locale and formatting
  locale?: LocaleConfig
  placeholder?: string

  // UI configuration
  inline?: boolean
  closeOnSelect?: boolean

  // Labels and text
  label?: string
  helperText?: string
  errorText?: string
  clearButtonLabel?: string
  todayButtonLabel?: string

  // Icons
  calendarIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  previousIcon?: React.ReactNode
  nextIcon?: React.ReactNode

  // Custom renderers
  renderDay?: DayRenderer
  renderHeader?: HeaderRenderer
  renderFooter?: FooterRenderer

  // Event handlers
  onChange?: (value?: Date | DateRange | Date[]) => void
  onOpenChange?: (open: boolean) => void
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  onHoverDateChange?: (date?: Date) => void
  onViewModeChange?: (view: DatePickerView) => void
  onClear?: () => void
  onTodayClick?: () => void

  // Basic styling props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  placeholderColor?: string
  backgroundColor?: string
  selectedBackgroundColor?: string
  todayBorderColor?: string
  focusRingColor?: string
  boxShadow?: string
  calendarPopupShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  calendarPadding?: string
  selectedDateColor?: string
  disabledDateColor?: string

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-labelledby'?: string
  'aria-required'?: boolean
  'aria-invalid'?: boolean
}

// Context
const DatePickerContext = createContext<DatePickerContextValue | null>(null)

export const useDatePicker = () => {
  const context = useContext(DatePickerContext)
  if (!context) {
    throw new Error('DatePicker compound components must be used within a DatePicker component')
  }
  return context
}

// Utility functions
const formatDateIntl = (date: Date, locale: LocaleConfig): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  if (locale.locale) {
    return new Intl.DateTimeFormat(locale.locale, options).format(date)
  }

  return date.toLocaleDateString('en-US', options)
}

const parseInputDate = (dateString: string): Date | null => {
  if (!dateString.trim()) return null

  try {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date
    }
  } catch {
    return null
  }

  return null
}

const isDateDisabled = (date: Date, config?: DisabledDateConfig): boolean => {
  if (!config) return false

  if (config.before && date < config.before) return true
  if (config.after && date > config.after) return true

  if (config.dates) {
    const dateString = date.toDateString()
    if (config.dates.some((d) => d.toDateString() === dateString)) return true
  }

  if (config.days) {
    const dayOfWeek = date.getDay()
    if (config.days.includes(dayOfWeek)) return true
  }

  if (config.custom) {
    return config.custom(date)
  }

  return false
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

const addYears = (date: Date, years: number): Date => {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}

const getMonthDays = (date: Date, firstDayOfWeek: number = 0): Date[] => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startDate = new Date(firstDay)
  const dayOfWeek = (firstDay.getDay() - firstDayOfWeek + 7) % 7
  startDate.setDate(startDate.getDate() - dayOfWeek)

  const endDate = new Date(lastDay)
  const endDayOfWeek = (lastDay.getDay() - firstDayOfWeek + 7) % 7
  endDate.setDate(endDate.getDate() + (6 - endDayOfWeek))

  const days: Date[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}

// Sub-components
export interface DatePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  calendarIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  onCalendarClick?: () => void
  onClearClick?: () => void
}

export const DatePickerInput = memo(
  forwardRef<HTMLInputElement, DatePickerInputProps>(
    ({ className, calendarIcon, clearIcon, onCalendarClick, onClearClick, ...props }, ref) => {
      const {
        variant,
        size,
        status,
        inputId,
        clearable,
        isOpen,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily,
        textColor,
        placeholderColor,
        backgroundColor,
        boxShadow,
        padding,
        paddingX,
        paddingY,
      } = useDatePicker()

      const baseStyles = cn(
        'relative flex items-center w-full transition-all border',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )

      const variantStyles = {
        default: cn(
          'bg-white border-gray-300 focus-within:ring-blue-500',
          status === 'error' && 'border-red-500 focus-within:ring-red-500',
          status === 'success' && 'border-green-500 focus-within:ring-green-500',
          status === 'warning' && 'border-yellow-500 focus-within:ring-yellow-500',
          status === 'info' && 'border-blue-500 focus-within:ring-blue-500'
        ),
        bordered: cn(
          'bg-white border-2 border-gray-400 focus-within:ring-blue-500',
          status === 'error' && 'border-red-500 focus-within:ring-red-500'
        ),
        minimal: 'bg-gray-50 border-gray-200 focus-within:ring-blue-500',
        'inline-calendar': 'hidden',
        'popup-calendar': 'bg-white border-gray-300 focus-within:ring-blue-500',
        withTime: 'bg-white border-gray-300 focus-within:ring-blue-500',
        range: 'bg-white border-gray-300 focus-within:ring-blue-500',
        'month-only': 'bg-white border-gray-300 focus-within:ring-blue-500',
      }

      const sizeStyles = {
        sm: 'h-8 px-2 text-xs rounded-md',
        md: 'h-10 px-3 text-sm rounded-md',
        lg: 'h-12 px-4 text-base rounded-lg',
      }

      const customStyles: React.CSSProperties = {
        ...(borderWidth && { borderWidth }),
        ...(borderColor && { borderColor }),
        ...(borderStyle && { borderStyle }),
        ...(borderRadius && { borderRadius }),
        ...(fontSize && { fontSize }),
        ...(fontWeight && { fontWeight }),
        ...(fontFamily && { fontFamily }),
        ...(textColor && { color: textColor }),
        ...(backgroundColor && { backgroundColor }),
        ...(boxShadow && { boxShadow }),
        ...(padding && { padding }),
        ...(paddingX && { paddingLeft: paddingX, paddingRight: paddingX }),
        ...(paddingY && { paddingTop: paddingY, paddingBottom: paddingY }),
      }

      const inputStyles = cn(
        'w-full bg-transparent border-0 outline-none',
        'placeholder:text-gray-400',
        clearable && 'pr-8'
      )

      if (variant === 'inline-calendar') {
        return null
      }

      return (
        <div
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
          style={customStyles}
        >
          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            style={{
              ...(placeholderColor &&
                ({ '--placeholder-color': placeholderColor } as React.CSSProperties)),
            }}
            {...props}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
            {clearable && props.value && (
              <button
                type="button"
                onClick={onClearClick}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                aria-label="Clear date"
              >
                {clearIcon || (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onCalendarClick}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              aria-label={isOpen ? 'Close calendar' : 'Open calendar'}
            >
              {calendarIcon || (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )
    }
  )
)

DatePickerInput.displayName = 'DatePickerInput'

export interface DatePickerCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatePickerCalendar = memo(
  forwardRef<HTMLDivElement, DatePickerCalendarProps>(({ className, children, ...props }, ref) => {
    const {
      variant,
      size,
      transition,
      isOpen,
      calendarId,
      calendarPopupShadow,
      calendarPadding,
      backgroundColor,
    } = useDatePicker()

    if (!isOpen && (variant === 'popup-calendar' || variant === 'default')) {
      return null
    }

    const baseStyles = cn(
      'bg-white border border-gray-200 rounded-lg',
      variant === 'inline-calendar' ? 'relative' : 'absolute top-full left-0 z-50 mt-1',
      'shadow-lg'
    )

    const sizeStyles = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    const transitionStyles = {
      none: '',
      fade: 'transition-opacity duration-200',
      zoom: 'transition-transform duration-200 transform scale-100',
      slide: 'transition-all duration-200',
    }

    const customStyles: React.CSSProperties = {
      ...(calendarPopupShadow && { boxShadow: calendarPopupShadow }),
      ...(calendarPadding && { padding: calendarPadding }),
      ...(backgroundColor && { backgroundColor }),
    }

    return (
      <div
        ref={ref}
        id={calendarId}
        className={cn(baseStyles, sizeStyles[size], transitionStyles[transition], className)}
        style={customStyles}
        role="dialog"
        aria-modal={variant !== 'inline-calendar'}
        aria-label="Date picker calendar"
        {...props}
      >
        {children}
      </div>
    )
  })
)

DatePickerCalendar.displayName = 'DatePickerCalendar'

export interface DatePickerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showMonthSelector?: boolean
  showYearSelector?: boolean
  previousIcon?: React.ReactNode
  nextIcon?: React.ReactNode
}

export const DatePickerHeader = memo(
  forwardRef<HTMLDivElement, DatePickerHeaderProps>(
    (
      {
        className,
        showMonthSelector = true,
        showYearSelector = true,
        previousIcon,
        nextIcon,
        ...props
      },
      ref
    ) => {
      const { displayDate, currentView, setDisplayDate, setCurrentView, locale, minDate, maxDate } =
        useDatePicker()

      const monthNames = locale.monthNames || [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const handlePrevious = useCallback(() => {
        if (currentView === 'day') {
          const newDate = addMonths(displayDate, -1)
          if (!minDate || newDate >= minDate) {
            setDisplayDate(newDate)
          }
        } else if (currentView === 'month') {
          const newDate = addYears(displayDate, -1)
          if (!minDate || newDate >= minDate) {
            setDisplayDate(newDate)
          }
        } else if (currentView === 'year') {
          const newDate = addYears(displayDate, -12)
          if (!minDate || newDate >= minDate) {
            setDisplayDate(newDate)
          }
        }
      }, [currentView, displayDate, minDate, setDisplayDate])

      const handleNext = useCallback(() => {
        if (currentView === 'day') {
          const newDate = addMonths(displayDate, 1)
          if (!maxDate || newDate <= maxDate) {
            setDisplayDate(newDate)
          }
        } else if (currentView === 'month') {
          const newDate = addYears(displayDate, 1)
          if (!maxDate || newDate <= maxDate) {
            setDisplayDate(newDate)
          }
        } else if (currentView === 'year') {
          const newDate = addYears(displayDate, 12)
          if (!maxDate || newDate <= maxDate) {
            setDisplayDate(newDate)
          }
        }
      }, [currentView, displayDate, maxDate, setDisplayDate])

      const handleMonthClick = useCallback(() => {
        if (showMonthSelector) {
          setCurrentView('month')
        }
      }, [showMonthSelector, setCurrentView])

      const handleYearClick = useCallback(() => {
        if (showYearSelector) {
          setCurrentView('year')
        }
      }, [showYearSelector, setCurrentView])

      const getHeaderTitle = () => {
        if (currentView === 'day') {
          return `${monthNames[displayDate.getMonth()]} ${displayDate.getFullYear()}`
        } else if (currentView === 'month') {
          return displayDate.getFullYear().toString()
        } else {
          const startYear = Math.floor(displayDate.getFullYear() / 12) * 12
          return `${startYear} - ${startYear + 11}`
        }
      }

      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-between p-3 border-b border-gray-200',
            className
          )}
          {...props}
        >
          <button
            type="button"
            onClick={handlePrevious}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            aria-label="Previous"
          >
            {previousIcon || (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-1">
            {currentView === 'day' && (
              <>
                <button
                  type="button"
                  onClick={handleMonthClick}
                  className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                  disabled={!showMonthSelector}
                >
                  {monthNames[displayDate.getMonth()]}
                </button>
                <button
                  type="button"
                  onClick={handleYearClick}
                  className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                  disabled={!showYearSelector}
                >
                  {displayDate.getFullYear()}
                </button>
              </>
            )}
            {currentView !== 'day' && (
              <h2 className="text-sm font-medium text-gray-700">{getHeaderTitle()}</h2>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            aria-label="Next"
          >
            {nextIcon || (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
      )
    }
  )
)

DatePickerHeader.displayName = 'DatePickerHeader'

export interface DatePickerDayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  date: Date
  isSelected?: boolean
  isDisabled?: boolean
  isToday?: boolean
  isInRange?: boolean
  isRangeStart?: boolean
  isRangeEnd?: boolean
  isOtherMonth?: boolean
}

export const DatePickerDay = memo(
  forwardRef<HTMLButtonElement, DatePickerDayProps>(
    (
      {
        className,
        date,
        isSelected = false,
        isDisabled = false,
        isToday = false,
        isInRange = false,
        isRangeStart = false,
        isRangeEnd = false,
        isOtherMonth = false,
        ...props
      },
      ref
    ) => {
      const {
        onDateSelect,
        setHoveredDate,
        selectedBackgroundColor,
        todayBorderColor,
        disabledDateColor,
      } = useDatePicker()

      const handleClick = useCallback(() => {
        if (!isDisabled) {
          onDateSelect(date)
        }
      }, [date, isDisabled, onDateSelect])

      const handleMouseEnter = useCallback(() => {
        if (!isDisabled) {
          setHoveredDate(date)
        }
      }, [date, isDisabled, setHoveredDate])

      const handleMouseLeave = useCallback(() => {
        setHoveredDate(undefined)
      }, [setHoveredDate])

      const dayClasses = cn(
        'relative flex items-center justify-center w-8 h-8 text-sm transition-colors rounded-full',
        'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
        isSelected && 'bg-blue-600 text-white hover:bg-blue-700',
        isToday && !isSelected && 'border-2 border-blue-600 font-semibold',
        isDisabled && 'text-gray-300 cursor-not-allowed hover:bg-transparent',
        isOtherMonth && !isSelected && 'text-gray-400',
        isInRange && !isSelected && 'bg-blue-100',
        (isRangeStart || isRangeEnd) && 'bg-blue-600 text-white',
        className
      )

      const customStyles: React.CSSProperties = {
        ...(selectedBackgroundColor && isSelected && { backgroundColor: selectedBackgroundColor }),
        ...(todayBorderColor && isToday && { borderColor: todayBorderColor }),
        ...(disabledDateColor && isDisabled && { color: disabledDateColor }),
      }

      return (
        <button
          ref={ref}
          type="button"
          className={dayClasses}
          style={customStyles}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={isDisabled}
          aria-label={`${date.toDateString()}${isSelected ? ', selected' : ''}${isToday ? ', today' : ''}`}
          aria-selected={isSelected}
          aria-disabled={isDisabled}
          {...props}
        >
          {date.getDate()}
        </button>
      )
    }
  )
)

DatePickerDay.displayName = 'DatePickerDay'

export interface DatePickerDaysViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const DatePickerDaysView = memo(
  forwardRef<HTMLDivElement, DatePickerDaysViewProps>(({ className, ...props }, ref) => {
    const {
      displayDate,
      mode,
      locale,
      isDateDisabled,
      isDateSelected,
      isDateInRange,
      isDateToday,
      hoveredDate,
      selectedRange,
      renderDay,
    } = useDatePicker()

    const dayNamesShort = locale.dayNamesShort || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const firstDayOfWeek = locale.firstDayOfWeek || 0

    const orderedDayNames = useMemo(() => {
      const days = [...dayNamesShort]
      return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)]
    }, [dayNamesShort, firstDayOfWeek])

    const monthDays = useMemo(() => {
      return getMonthDays(displayDate, firstDayOfWeek)
    }, [displayDate, firstDayOfWeek])

    const isInHoverRange = useCallback(
      (date: Date): boolean => {
        if (mode !== 'range' || !selectedRange?.start || !hoveredDate) return false

        const start = selectedRange.start
        const end = hoveredDate

        if (start > end) return date >= end && date <= start
        return date >= start && date <= end
      },
      [mode, selectedRange, hoveredDate]
    )

    return (
      <div ref={ref} className={cn('p-3', className)} {...props}>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {orderedDayNames.map((dayName) => (
            <div
              key={dayName}
              className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((date) => {
            const isSelected = isDateSelected(date)
            const isDisabled = isDateDisabled(date)
            const isToday = isDateToday(date)
            const isInRange = mode === 'range' && (isDateInRange(date) || isInHoverRange(date))
            const isOtherMonth = !isSameMonth(date, displayDate)
            const isRangeStart =
              mode === 'range' && selectedRange?.start && isSameDay(date, selectedRange.start)
            const isRangeEnd =
              mode === 'range' && selectedRange?.end && isSameDay(date, selectedRange.end)

            if (renderDay) {
              return (
                <div key={date.toISOString()}>
                  {renderDay(date, isSelected, isDisabled, isToday, isInRange)}
                </div>
              )
            }

            return (
              <DatePickerDay
                key={date.toISOString()}
                date={date}
                isSelected={isSelected}
                isDisabled={isDisabled}
                isToday={isToday}
                isInRange={isInRange}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                isOtherMonth={isOtherMonth}
              />
            )
          })}
        </div>
      </div>
    )
  })
)

DatePickerDaysView.displayName = 'DatePickerDaysView'

export interface DatePickerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  showTodayButton?: boolean
  showClearButton?: boolean
  todayButtonLabel?: string
  clearButtonLabel?: string
  children?: React.ReactNode
}

export const DatePickerFooter = memo(
  forwardRef<HTMLDivElement, DatePickerFooterProps>(
    (
      {
        className,
        showTodayButton = true,
        showClearButton = true,
        todayButtonLabel = 'Today',
        clearButtonLabel = 'Clear',
        ...props
      },
      ref
    ) => {
      const { onTodayClick, onClear, todayButton, clearable } = useDatePicker()

      if (!todayButton && !clearable) {
        return null
      }

      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-between p-3 border-t border-gray-200',
            className
          )}
          {...props}
        >
          <div className="flex space-x-2">
            {clearable && showClearButton && (
              <button
                type="button"
                onClick={onClear}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
              >
                {clearButtonLabel}
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            {todayButton && showTodayButton && (
              <button
                type="button"
                onClick={onTodayClick}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded"
              >
                {todayButtonLabel}
              </button>
            )}
          </div>
        </div>
      )
    }
  )
)

DatePickerFooter.displayName = 'DatePickerFooter'

// Main DatePicker Component
const DatePickerBase = memo(
  forwardRef<HTMLDivElement, DatePickerProps>(
    (
      {
        // Core props
        value,
        defaultValue,
        mode = 'single',
        variant = 'default',
        size = 'md',
        status = 'default',
        transition = 'fade',

        // State control
        open,
        defaultOpen = false,
        disabled = false,
        readOnly = false,
        required = false,
        clearable = true,

        // Date configuration
        minDate,
        maxDate,
        disabledDates,
        showTime = false,
        todayButton = true,

        // Locale and formatting
        locale = {},
        placeholder = 'Select date',

        // UI configuration
        inline = false,
        closeOnSelect = true,

        // Labels and text
        label,
        helperText,
        errorText,
        clearButtonLabel = 'Clear',
        todayButtonLabel = 'Today',

        // Icons
        calendarIcon,
        clearIcon,
        previousIcon,
        nextIcon,

        // Custom renderers
        renderDay: _renderDay,
        renderHeader: _renderHeader,
        renderFooter: _renderFooter,

        // Event handlers
        onChange,
        onOpenChange,
        onFocus,
        onBlur,
        onHoverDateChange,
        onViewModeChange,
        onClear,
        onTodayClick,

        // Styling props
        className,
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,
        fontSize,
        fontWeight,
        fontFamily,
        textColor,
        placeholderColor,
        backgroundColor,
        selectedBackgroundColor,
        todayBorderColor,
        focusRingColor,
        boxShadow,
        calendarPopupShadow,
        padding,
        paddingX,
        paddingY,
        calendarPadding,
        selectedDateColor,
        disabledDateColor,

        // Accessibility
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        'aria-labelledby': ariaLabelledby,
        'aria-required': ariaRequired,
        'aria-invalid': ariaInvalid,

        ...props
      },
      ref
    ) => {
      // IDs - call useId unconditionally
      const inputId = useId()
      const calendarId = useId()
      const labelId = useId()
      const descriptionId = useId()
      const errorId = useId()

      // Internal state for uncontrolled mode
      const [internalValue, setInternalValue] = useState<Date | DateRange | Date[] | undefined>(
        defaultValue
      )
      const [internalOpen, setInternalOpen] = useState(defaultOpen)
      const [currentView, setCurrentView] = useState<DatePickerView>('day')
      const [displayDate, setDisplayDate] = useState(() => {
        if (value && value instanceof Date) return value
        if (defaultValue && defaultValue instanceof Date) return defaultValue
        return new Date()
      })
      const [focusedDate, setFocusedDate] = useState<Date>()
      const [hoveredDate, setHoveredDate] = useState<Date>()
      const [inputValue, setInputValue] = useState('')

      // Refs
      const inputRef = useRef<HTMLInputElement>(null)
      const calendarRef = useRef<HTMLDivElement>(null)

      // Determine controlled vs uncontrolled
      const isControlledValue = value !== undefined
      const isControlledOpen = open !== undefined

      const currentValue = isControlledValue ? value : internalValue
      const currentOpen = isControlledOpen ? open : internalOpen

      // Initialize input value
      useEffect(() => {
        if (currentValue instanceof Date) {
          setInputValue(formatDateIntl(currentValue, locale))
        } else if (currentValue && typeof currentValue === 'object' && 'start' in currentValue) {
          const range = currentValue as DateRange
          if (range.start && range.end) {
            setInputValue(
              `${formatDateIntl(range.start, locale)} - ${formatDateIntl(range.end, locale)}`
            )
          } else if (range.start) {
            setInputValue(formatDateIntl(range.start, locale))
          } else {
            setInputValue('')
          }
        } else {
          setInputValue('')
        }
      }, [currentValue, locale])

      // Handle value changes
      const handleValueChange = useCallback(
        (newValue?: Date | DateRange | Date[]) => {
          if (!isControlledValue) {
            setInternalValue(newValue)
          }
          onChange?.(newValue)
        },
        [isControlledValue, onChange]
      )

      // Handle open state changes
      const handleOpenChange = useCallback(
        (newOpen: boolean) => {
          if (!isControlledOpen) {
            setInternalOpen(newOpen)
          }
          onOpenChange?.(newOpen)
        },
        [isControlledOpen, onOpenChange]
      )

      // Date selection handlers
      const handleDateSelect = useCallback(
        (date: Date) => {
          if (mode === 'single') {
            handleValueChange(date)
            if (closeOnSelect && !showTime) {
              handleOpenChange(false)
            }
          } else if (mode === 'range') {
            const currentRange = currentValue as DateRange | undefined
            if (!currentRange?.start || (currentRange.start && currentRange.end)) {
              handleValueChange({ start: date })
            } else {
              const start = currentRange.start
              if (date < start) {
                handleValueChange({ start: date, end: start })
              } else {
                handleValueChange({ start, end: date })
              }
              if (closeOnSelect) {
                handleOpenChange(false)
              }
            }
          } else if (mode === 'multiple') {
            const currentDates = (currentValue as Date[] | undefined) || []
            const existingIndex = currentDates.findIndex((d) => isSameDay(d, date))
            if (existingIndex >= 0) {
              const newDates = [...currentDates]
              newDates.splice(existingIndex, 1)
              handleValueChange(newDates)
            } else {
              handleValueChange([...currentDates, date])
            }
          }
        },
        [mode, currentValue, handleValueChange, closeOnSelect, showTime, handleOpenChange]
      )

      // Clear handler
      const handleClear = useCallback(() => {
        handleValueChange(undefined)
        setInputValue('')
        onClear?.()
      }, [handleValueChange, onClear])

      // Today handler
      const handleTodayClick = useCallback(() => {
        const today = new Date()
        handleDateSelect(today)
        setDisplayDate(today)
        onTodayClick?.()
      }, [handleDateSelect, onTodayClick])

      // View change handler
      const handleViewChange = useCallback(
        (view: DatePickerView) => {
          setCurrentView(view)
          onViewModeChange?.(view)
        },
        [onViewModeChange]
      )

      // Input handlers
      const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value
          setInputValue(newValue)

          if (mode === 'single') {
            const parsedDate = parseInputDate(newValue)
            if (parsedDate) {
              handleValueChange(parsedDate)
              setDisplayDate(parsedDate)
            }
          }
        },
        [mode, handleValueChange]
      )

      const handleInputFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
          if (!readOnly) {
            handleOpenChange(true)
          }
          onFocus?.(e)
        },
        [readOnly, handleOpenChange, onFocus]
      )

      const handleInputBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
          // Only close if clicking outside the component
          setTimeout(() => {
            if (!calendarRef.current?.contains(document.activeElement)) {
              handleOpenChange(false)
            }
          }, 100)
          onBlur?.(e)
        },
        [handleOpenChange, onBlur]
      )

      const handleInputKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Escape') {
            handleOpenChange(false)
            inputRef.current?.blur()
          } else if (e.key === 'Enter') {
            if (!currentOpen) {
              handleOpenChange(true)
            }
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            handleOpenChange(true)
          }
        },
        [currentOpen, handleOpenChange]
      )

      // Calendar handlers
      const handleCalendarClick = useCallback(() => {
        handleOpenChange(!currentOpen)
      }, [currentOpen, handleOpenChange])

      const handleClearClick = useCallback(() => {
        handleClear()
      }, [handleClear])

      // Utility functions
      const isDateDisabledUtil = useCallback(
        (date: Date): boolean => {
          if (minDate && date < minDate) return true
          if (maxDate && date > maxDate) return true
          return isDateDisabled(date, disabledDates)
        },
        [minDate, maxDate, disabledDates]
      )

      const isDateSelectedUtil = useCallback(
        (date: Date): boolean => {
          if (mode === 'single') {
            return currentValue instanceof Date && isSameDay(date, currentValue)
          } else if (mode === 'range') {
            const range = currentValue as DateRange | undefined
            return !!(
              (range?.start && isSameDay(date, range.start)) ||
              (range?.end && isSameDay(date, range.end))
            )
          } else if (mode === 'multiple') {
            const dates = currentValue as Date[] | undefined
            return !!dates?.some((d) => isSameDay(date, d))
          }
          return false
        },
        [mode, currentValue]
      )

      const isDateInRangeUtil = useCallback(
        (date: Date): boolean => {
          if (mode !== 'range') return false
          const range = currentValue as DateRange | undefined
          if (!range?.start || !range?.end) return false
          return date >= range.start && date <= range.end
        },
        [mode, currentValue]
      )

      const isDateTodayUtil = useCallback((date: Date): boolean => {
        const today = new Date()
        return isSameDay(date, today)
      }, [])

      const formatDateUtil = useCallback(
        (date: Date): string => {
          return formatDateIntl(date, locale)
        },
        [locale]
      )

      // Context value
      const contextValue = useMemo<DatePickerContextValue>(
        () => ({
          // Core state
          selectedDate: mode === 'single' ? (currentValue as Date) : undefined,
          selectedRange: mode === 'range' ? (currentValue as DateRange) : undefined,
          selectedDates: mode === 'multiple' ? (currentValue as Date[]) : undefined,
          isOpen: currentOpen,
          currentView,
          displayDate,
          focusedDate,
          hoveredDate,

          // Configuration
          mode,
          variant: inline ? 'inline-calendar' : variant,
          size,
          status,
          transition,
          locale,
          disabledDates,
          minDate,
          maxDate,
          showTime,
          clearable,
          todayButton,
          readOnly,

          // State setters
          setSelectedDate: handleValueChange as (date?: Date) => void,
          setSelectedRange: handleValueChange as (range?: DateRange) => void,
          setSelectedDates: handleValueChange as (dates?: Date[]) => void,
          setIsOpen: handleOpenChange,
          setCurrentView: setCurrentView,
          setDisplayDate,
          setFocusedDate,
          setHoveredDate: (date) => {
            setHoveredDate(date)
            onHoverDateChange?.(date)
          },

          // Event handlers
          onDateSelect: handleDateSelect,
          onClear: handleClear,
          onTodayClick: handleTodayClick,

          // Utility functions
          isDateDisabled: isDateDisabledUtil,
          isDateSelected: isDateSelectedUtil,
          isDateInRange: isDateInRangeUtil,
          isDateToday: isDateTodayUtil,
          formatDate: formatDateUtil,

          // Custom renderers
          renderDay: _renderDay,

          // IDs
          inputId,
          calendarId,
          labelId: label ? labelId : undefined,
          descriptionId: helperText ? descriptionId : undefined,
          errorId: errorText ? errorId : undefined,

          // Style props
          borderWidth,
          borderColor,
          borderStyle,
          borderRadius,
          fontSize,
          fontWeight,
          fontFamily,
          textColor,
          placeholderColor,
          backgroundColor,
          selectedBackgroundColor,
          todayBorderColor,
          focusRingColor,
          boxShadow,
          calendarPopupShadow,
          padding,
          paddingX,
          paddingY,
          calendarPadding,
          selectedDateColor,
          disabledDateColor,
        }),
        [
          mode,
          currentValue,
          currentOpen,
          currentView,
          displayDate,
          focusedDate,
          hoveredDate,
          inline,
          variant,
          size,
          status,
          transition,
          locale,
          disabledDates,
          minDate,
          maxDate,
          showTime,
          clearable,
          todayButton,
          readOnly,
          handleValueChange,
          handleOpenChange,
          setCurrentView,
          setDisplayDate,
          setFocusedDate,
          onHoverDateChange,
          handleDateSelect,
          handleClear,
          handleTodayClick,
          isDateDisabledUtil,
          isDateSelectedUtil,
          isDateInRangeUtil,
          isDateTodayUtil,
          formatDateUtil,
          inputId,
          calendarId,
          label,
          labelId,
          helperText,
          descriptionId,
          errorText,
          errorId,
          borderWidth,
          borderColor,
          borderStyle,
          borderRadius,
          fontSize,
          fontWeight,
          fontFamily,
          textColor,
          placeholderColor,
          backgroundColor,
          selectedBackgroundColor,
          todayBorderColor,
          focusRingColor,
          boxShadow,
          calendarPopupShadow,
          padding,
          paddingX,
          paddingY,
          calendarPadding,
          selectedDateColor,
          disabledDateColor,
        ]
      )

      // Click outside handler
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            ref &&
            typeof ref === 'object' &&
            ref.current &&
            !ref.current.contains(event.target as Node)
          ) {
            handleOpenChange(false)
          }
        }

        if (currentOpen) {
          document.addEventListener('mousedown', handleClickOutside)
          return () => document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [currentOpen, handleOpenChange, ref])

      // Keyboard navigation
      useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (!currentOpen) return

          switch (e.key) {
            case 'Escape':
              e.preventDefault()
              handleOpenChange(false)
              inputRef.current?.focus()
              break
            case 'Tab':
              // Allow normal tab behavior
              break
            default:
              break
          }
        }

        if (currentOpen) {
          document.addEventListener('keydown', handleKeyDown)
          return () => document.removeEventListener('keydown', handleKeyDown)
        }
      }, [currentOpen, handleOpenChange])

      const containerClasses = cn(
        'relative',
        inline && 'inline-block',
        disabled && 'opacity-50 pointer-events-none',
        className
      )

      return (
        <DatePickerContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={containerClasses}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-labelledby={ariaLabelledby}
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            {...props}
          >
            {/* Label */}
            {label && (
              <label
                id={labelId}
                htmlFor={inputId}
                className={cn(
                  'block text-sm font-medium mb-1',
                  status === 'error' && 'text-red-600',
                  status === 'success' && 'text-green-600',
                  status === 'warning' && 'text-yellow-600',
                  status === 'info' && 'text-blue-600',
                  status === 'default' && 'text-gray-700',
                  disabled && 'text-gray-400'
                )}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}

            {/* Input */}
            <DatePickerInput
              ref={inputRef}
              value={inputValue}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              calendarIcon={calendarIcon}
              clearIcon={clearIcon}
              onCalendarClick={handleCalendarClick}
              onClearClick={handleClearClick}
              aria-labelledby={label ? labelId : undefined}
              aria-describedby={cn(
                helperText ? descriptionId : undefined,
                errorText ? errorId : undefined
              )}
              aria-invalid={status === 'error' || ariaInvalid}
              aria-expanded={currentOpen}
              aria-haspopup="dialog"
            />

            {/* Calendar */}
            <DatePickerCalendar ref={calendarRef}>
              {/* Header */}
              {_renderHeader ? (
                _renderHeader(
                  displayDate,
                  currentView,
                  () => setDisplayDate(addMonths(displayDate, -1)),
                  () => setDisplayDate(addMonths(displayDate, 1)),
                  handleViewChange
                )
              ) : (
                <DatePickerHeader previousIcon={previousIcon} nextIcon={nextIcon} />
              )}

              {/* Days View */}
              {currentView === 'day' && <DatePickerDaysView />}

              {/* Footer */}
              {_renderFooter ? (
                _renderFooter()
              ) : (
                <DatePickerFooter
                  todayButtonLabel={todayButtonLabel}
                  clearButtonLabel={clearButtonLabel}
                />
              )}
            </DatePickerCalendar>

            {/* Helper Text */}
            {helperText && (
              <div
                id={descriptionId}
                className={cn(
                  'mt-1 text-xs',
                  status === 'error' && 'text-red-600',
                  status === 'success' && 'text-green-600',
                  status === 'warning' && 'text-yellow-600',
                  status === 'info' && 'text-blue-600',
                  status === 'default' && 'text-gray-500',
                  disabled && 'text-gray-400'
                )}
              >
                {helperText}
              </div>
            )}

            {/* Error Text */}
            {errorText && (
              <div id={errorId} className="mt-1 text-xs text-red-600">
                {errorText}
              </div>
            )}
          </div>
        </DatePickerContext.Provider>
      )
    }
  )
)

DatePickerBase.displayName = 'DatePicker'

// Compound component interface
interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>> {
  Input: typeof DatePickerInput
  Calendar: typeof DatePickerCalendar
  Header: typeof DatePickerHeader
  Day: typeof DatePickerDay
  DaysView: typeof DatePickerDaysView
  Footer: typeof DatePickerFooter
}

// Create compound component
const DatePicker = DatePickerBase as unknown as DatePickerComponent
DatePicker.Input = DatePickerInput
DatePicker.Calendar = DatePickerCalendar
DatePicker.Header = DatePickerHeader
DatePicker.Day = DatePickerDay
DatePicker.DaysView = DatePickerDaysView
DatePicker.Footer = DatePickerFooter

export { DatePicker }
export default DatePicker
