import React, {
  createContext,
  useContext,
  forwardRef,
  memo,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export interface RatingContextValue {
  value: number
  hoverValue: number | null
  maxValue: number
  precision: number
  size: RatingSize
  variant: RatingVariant
  status: RatingStatus
  isDisabled: boolean
  isReadOnly: boolean
  isRequired: boolean
  hasError: boolean
  onChange: (value: number) => void
  onHoverChange: (value: number | null) => void
  onFocus: () => void
  onBlur: () => void
  // Style props
  iconSpacing?: string
  iconSize?: string
  filledColor?: string
  emptyColor?: string
  hoverColor?: string
  disabledColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  labelColor?: string
  labelFontSize?: string
  labelFontWeight?: string
  labelMarginBottom?: string
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: string
  descriptionMarginTop?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  gap?: string
  padding?: string
  // Custom renderers
  renderIcon?: (props: IconRenderProps) => React.ReactNode
  renderLabel?: (props: LabelRenderProps) => React.ReactNode
  renderDescription?: (props: DescriptionRenderProps) => React.ReactNode
}

export type RatingVariant = 'default' | 'soft' | 'minimal' | 'outlined' | 'compact' | 'emoji'

export type RatingSize = 'sm' | 'md' | 'lg'

export type RatingStatus = 'default' | 'success' | 'warning' | 'error' | 'info'

export type RatingTransition = 'none' | 'fade' | 'scale' | 'grow' | 'bounce'

export interface IconRenderProps {
  index: number
  value: number
  hoverValue: number | null
  isFilled: boolean
  isPartial: boolean
  partialValue: number
  isHovered: boolean
  isDisabled: boolean
  isReadOnly: boolean
  size: RatingSize
  variant: RatingVariant
  status: RatingStatus
}

export interface LabelRenderProps {
  value: number
  maxValue: number
  isDisabled: boolean
  isReadOnly: boolean
  size: RatingSize
  variant: RatingVariant
  status: RatingStatus
}

export interface DescriptionRenderProps {
  value: number
  maxValue: number
  isDisabled: boolean
  isReadOnly: boolean
  size: RatingSize
  variant: RatingVariant
  status: RatingStatus
}

export interface RatingBaseProps {
  // Core functionality
  value?: number
  defaultValue?: number
  maxValue?: number
  precision?: number
  onChange?: (value: number) => void
  onHoverChange?: (value: number | null) => void

  // States
  disabled?: boolean
  readOnly?: boolean
  required?: boolean

  // Labels and messages
  label?: React.ReactNode
  description?: React.ReactNode
  helperText?: React.ReactNode
  errorMessage?: string

  // Styling variants
  variant?: RatingVariant
  size?: RatingSize
  status?: RatingStatus

  // Animation and transitions
  transition?: RatingTransition
  transitionDuration?: number

  // Custom render functions
  renderIcon?: (props: IconRenderProps) => React.ReactNode
  renderLabel?: (props: LabelRenderProps) => React.ReactNode
  renderDescription?: (props: DescriptionRenderProps) => React.ReactNode

  // Icons
  emptyIcon?: React.ReactNode
  filledIcon?: React.ReactNode
  hoverIcon?: React.ReactNode
  partialIcon?: React.ReactNode
  readOnlyIcon?: React.ReactNode

  // Form integration
  name?: string
  form?: string

  // Border styles
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string

  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string

  // Colors
  backgroundColor?: string
  hoverBackgroundColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string

  // Spacing
  padding?: string
  paddingX?: string
  paddingY?: string
  gap?: string
  iconSpacing?: string

  // Icon customization
  iconSize?: string
  iconColor?: string
  filledColor?: string
  emptyColor?: string
  hoverColor?: string
  disabledColor?: string
  partialColor?: string

  // Label styles
  labelColor?: string
  labelFontSize?: string
  labelFontWeight?: string
  labelMarginBottom?: string

  // Description styles
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: string
  descriptionMarginTop?: string

  // Helper text styles
  helperTextFontSize?: string
  helperTextColor?: string
  helperTextMarginTop?: string

  // Required asterisk styles
  requiredColor?: string

  // Event handlers
  onFocus?: () => void
  onBlur?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onKeyDown?: (event: React.KeyboardEvent) => void

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
  'aria-valuenow'?: number
  'aria-valuemin'?: number
  'aria-valuemax'?: number
  'aria-valuetext'?: string
}

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof RatingBaseProps>,
    RatingBaseProps {
  children?: React.ReactNode
}

// Context
const RatingContext = createContext<RatingContextValue | null>(null)

export const useRatingContext = () => {
  const context = useContext(RatingContext)
  if (!context) {
    throw new Error('Rating compound components must be used within a Rating component')
  }
  return context
}

// Sub-components
export const RatingStar = memo(
  forwardRef<
    HTMLButtonElement,
    {
      index: number
      children?: React.ReactNode
      className?: string
      style?: React.CSSProperties
    }
  >(({ index, children, className, style, ...props }, ref) => {
    const {
      value,
      hoverValue,
      maxValue,
      precision,
      size,
      variant,
      status,
      isDisabled,
      isReadOnly,
      onChange,
      onHoverChange,
      onFocus,
      onBlur,
      // Style props
      iconSpacing: _iconSpacing,
      iconSize,
      filledColor,
      emptyColor,
      hoverColor,
      disabledColor,
      focusRingColor,
      focusRingWidth,
      // Custom renderers
      renderIcon,
    } = useRatingContext()

    const [isFocused, setIsFocused] = useState(false)

    const currentValue = hoverValue !== null ? hoverValue : value
    const isFilled = currentValue >= index + 1
    const isPartial = precision < 1 && currentValue > index && currentValue < index + 1
    const partialValue = isPartial ? (currentValue - index) / 1 : 0
    const isHovered = hoverValue !== null

    const handleClick = useCallback(() => {
      if (isDisabled || isReadOnly) return
      const newValue = index + 1
      onChange(newValue)
    }, [index, isDisabled, isReadOnly, onChange])

    const handleMouseEnter = useCallback(() => {
      if (isDisabled || isReadOnly) return
      onHoverChange(index + 1)
    }, [index, isDisabled, isReadOnly, onHoverChange])

    const handleMouseLeave = useCallback(() => {
      if (isDisabled || isReadOnly) return
      onHoverChange(null)
    }, [isDisabled, isReadOnly, onHoverChange])

    const handleFocus = useCallback(() => {
      if (isDisabled || isReadOnly) return
      setIsFocused(true)
      onFocus?.()
    }, [isDisabled, isReadOnly, onFocus])

    const handleBlur = useCallback(() => {
      if (isDisabled || isReadOnly) return
      setIsFocused(false)
      onBlur?.()
    }, [isDisabled, isReadOnly, onBlur])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (isDisabled || isReadOnly) return

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp': {
            event.preventDefault()
            const nextValue = Math.min(value + precision, maxValue)
            onChange(nextValue)
            break
          }
          case 'ArrowLeft':
          case 'ArrowDown': {
            event.preventDefault()
            const prevValue = Math.max(value - precision, 0)
            onChange(prevValue)
            break
          }
          case 'Home':
            event.preventDefault()
            onChange(0)
            break
          case 'End':
            event.preventDefault()
            onChange(maxValue)
            break
          case 'Enter':
          case ' ':
            event.preventDefault()
            handleClick()
            break
        }
      },
      [isDisabled, isReadOnly, value, precision, maxValue, onChange, handleClick]
    )

    // Base styles
    const baseStyles = cn(
      'inline-flex items-center justify-center transition-all focus-visible:outline-none',
      'cursor-pointer select-none',
      isDisabled && 'cursor-not-allowed opacity-50',
      isReadOnly && 'cursor-default'
    )

    // Size styles
    const sizeStyles = {
      sm: cn('w-4 h-4', iconSize || 'w-4 h-4'),
      md: cn('w-5 h-5', iconSize || 'w-5 h-5'),
      lg: cn('w-6 h-6', iconSize || 'w-6 h-6'),
    }

    // Variant styles
    const variantStyles = {
      default: cn(
        'text-gray-300',
        isFilled && 'text-yellow-400',
        isHovered && !isFilled && 'text-yellow-300',
        isFocused && 'ring-2 ring-offset-2 ring-yellow-500'
      ),
      soft: cn(
        'text-gray-200',
        isFilled && 'text-yellow-300',
        isHovered && !isFilled && 'text-yellow-200',
        isFocused && 'ring-2 ring-offset-2 ring-yellow-400'
      ),
      minimal: cn(
        'text-gray-300',
        isFilled && 'text-yellow-500',
        isHovered && !isFilled && 'text-yellow-400',
        isFocused && 'ring-1 ring-yellow-500'
      ),
      outlined: cn(
        'text-gray-300 border border-gray-300',
        isFilled && 'text-yellow-400 border-yellow-400',
        isHovered && !isFilled && 'text-yellow-300 border-yellow-300',
        isFocused && 'ring-2 ring-offset-2 ring-yellow-500'
      ),
      compact: cn(
        'text-gray-300',
        isFilled && 'text-yellow-400',
        isHovered && !isFilled && 'text-yellow-300',
        isFocused && 'ring-1 ring-yellow-500'
      ),
      emoji: cn('text-2xl', isFilled && 'scale-110', isHovered && !isFilled && 'scale-105'),
    }

    // Status styles
    const statusStyles = {
      default: '',
      success: cn(
        'text-green-300',
        isFilled && 'text-green-400',
        isHovered && !isFilled && 'text-green-300'
      ),
      warning: cn(
        'text-yellow-300',
        isFilled && 'text-yellow-400',
        isHovered && !isFilled && 'text-yellow-300'
      ),
      error: cn(
        'text-red-300',
        isFilled && 'text-red-400',
        isHovered && !isFilled && 'text-red-300'
      ),
      info: cn(
        'text-blue-300',
        isFilled && 'text-blue-400',
        isHovered && !isFilled && 'text-blue-300'
      ),
    }

    // Custom styles
    const customStyles: React.CSSProperties = {
      ...style,
      ...(iconSize && { width: iconSize, height: iconSize }),
      ...(isFilled && filledColor && { color: filledColor }),
      ...(!isFilled && emptyColor && { color: emptyColor }),
      ...(isHovered && hoverColor && { color: hoverColor }),
      ...(isDisabled && disabledColor && { color: disabledColor }),
      ...(isFocused &&
        focusRingColor &&
        focusRingWidth && {
          boxShadow: `0 0 0 ${focusRingWidth} ${focusRingColor}`,
        }),
    }

    // Icon render props
    const iconProps: IconRenderProps = {
      index,
      value,
      hoverValue,
      isFilled,
      isPartial,
      partialValue,
      isHovered,
      isDisabled,
      isReadOnly,
      size,
      variant,
      status,
    }

    // Default star icon
    const defaultIcon = (
      <svg
        className="w-full h-full"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={variant === 'outlined' ? 1 : 0}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    )

    // Partial star rendering
    const renderPartialStar = () => {
      if (!isPartial) return null

      return (
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partialValue * 100}%` }}
          >
            {renderIcon ? renderIcon(iconProps) : defaultIcon}
          </div>
          <div className="absolute inset-0 opacity-30">
            {renderIcon ? renderIcon(iconProps) : defaultIcon}
          </div>
        </div>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          statusStyles[status],
          className
        )}
        style={customStyles}
        disabled={isDisabled}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        role="radio"
        aria-checked={isFilled}
        aria-label={`Rate ${index + 1} out of ${maxValue}`}
        tabIndex={isDisabled || isReadOnly ? -1 : 0}
        {...props}
      >
        {children ||
          (isPartial ? renderPartialStar() : renderIcon ? renderIcon(iconProps) : defaultIcon)}
      </button>
    )
  })
)

RatingStar.displayName = 'RatingStar'

export const RatingLabel = memo(
  forwardRef<HTMLSpanElement, { children?: React.ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => {
      const {
        value,
        maxValue,
        isDisabled,
        isReadOnly,
        size,
        variant,
        status,
        labelColor,
        labelFontSize,
        labelFontWeight,
        labelMarginBottom,
        renderLabel,
      } = useRatingContext()

      const labelProps: LabelRenderProps = {
        value,
        maxValue,
        isDisabled,
        isReadOnly,
        size,
        variant,
        status,
      }

      const baseStyles = cn(
        'block font-medium leading-tight text-gray-700',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base',
        isDisabled && 'opacity-50'
      )

      const customStyles: React.CSSProperties = {
        ...(labelColor && { color: labelColor }),
        ...(labelFontSize && { fontSize: labelFontSize }),
        ...(labelFontWeight && { fontWeight: labelFontWeight }),
        ...(labelMarginBottom && { marginBottom: labelMarginBottom }),
      }

      return (
        <span ref={ref} className={cn(baseStyles, className)} style={customStyles} {...props}>
          {children || (renderLabel ? renderLabel(labelProps) : `${value} out of ${maxValue}`)}
        </span>
      )
    }
  )
)

RatingLabel.displayName = 'RatingLabel'

export const RatingDescription = memo(
  forwardRef<HTMLSpanElement, { children?: React.ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => {
      const {
        value,
        maxValue,
        isDisabled,
        isReadOnly,
        size,
        variant,
        status,
        descriptionColor,
        descriptionFontSize,
        descriptionFontWeight,
        descriptionMarginTop,
        renderDescription,
      } = useRatingContext()

      const descriptionProps: DescriptionRenderProps = {
        value,
        maxValue,
        isDisabled,
        isReadOnly,
        size,
        variant,
        status,
      }

      const baseStyles = cn(
        'block leading-tight text-gray-600',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base',
        isDisabled && 'opacity-50'
      )

      const customStyles: React.CSSProperties = {
        ...(descriptionColor && { color: descriptionColor }),
        ...(descriptionFontSize && { fontSize: descriptionFontSize }),
        ...(descriptionFontWeight && { fontWeight: descriptionFontWeight }),
        ...(descriptionMarginTop && { marginTop: descriptionMarginTop }),
      }

      return (
        <span ref={ref} className={cn(baseStyles, className)} style={customStyles} {...props}>
          {children || (renderDescription ? renderDescription(descriptionProps) : '')}
        </span>
      )
    }
  )
)

RatingDescription.displayName = 'RatingDescription'

export const RatingInput = memo(
  forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
      const { value, isDisabled, isReadOnly, isRequired } = useRatingContext()

      return (
        <input
          ref={ref}
          type="hidden"
          value={value}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          className={cn('sr-only', className)}
          {...props}
        />
      )
    }
  )
)

RatingInput.displayName = 'RatingInput'

export const RatingIcon = memo(
  forwardRef<HTMLSpanElement, { children: React.ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => {
      const { size } = useRatingContext()

      const iconStyles = cn(
        'inline-flex items-center justify-center',
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-5 h-5',
        size === 'lg' && 'w-6 h-6',
        className
      )

      return (
        <span ref={ref} className={iconStyles} {...props}>
          {children}
        </span>
      )
    }
  )
)

RatingIcon.displayName = 'RatingIcon'

// Main Rating Component
const RatingBase = memo(
  forwardRef<HTMLDivElement, RatingProps>(
    (
      {
        // Core functionality
        value: controlledValue,
        defaultValue = 0,
        maxValue = 5,
        precision = 1,
        onChange,
        onHoverChange,

        // States
        disabled = false,
        readOnly = false,
        required = false,

        // Labels and messages
        children,
        label,
        description,
        helperText,
        errorMessage,

        // Styling variants
        variant = 'default',
        size = 'md',
        status = 'default',

        // Animation and transitions
        transition = 'scale',
        transitionDuration = 200,

        // Custom render functions
        renderIcon,
        renderLabel,
        renderDescription,

        // Icons
        emptyIcon: _emptyIcon,
        filledIcon: _filledIcon,
        hoverIcon: _hoverIcon,
        partialIcon: _partialIcon,
        readOnlyIcon: _readOnlyIcon,

        // Form integration
        name,
        form,

        // Style props
        className,
        style = {},

        // Border styling
        borderWidth,
        borderColor,
        borderStyle,
        borderRadius,

        // Typography
        fontSize,
        fontWeight,
        fontFamily,
        textColor,

        // Colors
        backgroundColor,
        hoverBackgroundColor: _hoverBackgroundColor,

        // Focus styles
        focusRingColor,
        focusRingWidth,
        focusRingOffset: _focusRingOffset,
        focusBorderColor: _focusBorderColor,
        focusBackgroundColor: _focusBackgroundColor,

        // Shadows
        boxShadow,
        focusBoxShadow: _focusBoxShadow,
        hoverBoxShadow: _hoverBoxShadow,

        // Spacing
        padding,
        paddingX,
        paddingY,
        gap,
        iconSpacing,

        // Icon customization
        iconSize,
        iconColor: _iconColor,
        filledColor,
        emptyColor,
        hoverColor,
        disabledColor,
        partialColor: _partialColor,

        // Label styles
        labelColor,
        labelFontSize: _labelFontSize,
        labelFontWeight: _labelFontWeight,
        labelMarginBottom: _labelMarginBottom,

        // Description styles
        descriptionColor,
        descriptionFontSize: _descriptionFontSize,
        descriptionFontWeight: _descriptionFontWeight,
        descriptionMarginTop: _descriptionMarginTop,

        // Helper text styles
        helperTextFontSize,
        helperTextColor,
        helperTextMarginTop,

        // Required asterisk styles
        requiredColor: _requiredColor,

        // Event handlers
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,

        // Accessibility
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        'aria-invalid': ariaInvalid,
        'aria-required': ariaRequired,
        'aria-valuenow': ariaValuenow,
        'aria-valuemin': ariaValuemin,
        'aria-valuemax': ariaValuemax,
        'aria-valuetext': ariaValuetext,

        // Rest of props
        ...props
      },
      ref
    ) => {
      const [internalValue, setInternalValue] = useState(defaultValue)
      const [hoverValue, setHoverValue] = useState<number | null>(null)

      const isControlled = controlledValue !== undefined
      const currentValue = isControlled ? controlledValue : internalValue
      const hasError = status === 'error' || Boolean(errorMessage)

      const handleChange = useCallback(
        (newValue: number) => {
          if (!isControlled) {
            setInternalValue(newValue)
          }
          onChange?.(newValue)
        },
        [isControlled, onChange]
      )

      const handleHoverChange = useCallback(
        (newHoverValue: number | null) => {
          setHoverValue(newHoverValue)
          onHoverChange?.(newHoverValue)
        },
        [onHoverChange]
      )

      const handleFocus = useCallback(() => {
        onFocus?.()
      }, [onFocus])

      const handleBlur = useCallback(() => {
        onBlur?.()
      }, [onBlur])

      const handleMouseEnter = useCallback(() => {
        onMouseEnter?.()
      }, [onMouseEnter])

      const handleMouseLeave = useCallback(() => {
        handleHoverChange(null)
        onMouseLeave?.()
      }, [handleHoverChange, onMouseLeave])

      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
          onKeyDown?.(event)
        },
        [onKeyDown]
      )

      // Context value
      const contextValue: RatingContextValue = {
        value: currentValue,
        hoverValue,
        maxValue,
        precision,
        size,
        variant,
        status,
        isDisabled: disabled,
        isReadOnly: readOnly,
        isRequired: required,
        hasError,
        onChange: handleChange,
        onHoverChange: handleHoverChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        // Style props
        iconSpacing,
        iconSize,
        filledColor,
        emptyColor,
        hoverColor,
        disabledColor,
        focusRingColor,
        focusRingWidth,
        labelColor,
        descriptionColor,
        fontSize,
        fontWeight,
        fontFamily,
        gap,
        padding,
        // Custom renderers
        renderIcon,
        renderLabel,
        renderDescription,
      }

      // Base styles
      const baseStyles = cn(
        'inline-flex items-center',
        disabled && 'pointer-events-none',
        readOnly && 'pointer-events-none'
      )

      // Transition styles
      const transitionStyles = {
        none: '',
        fade: cn('transition-opacity', `duration-${transitionDuration}`),
        scale: cn('transition-transform', `duration-${transitionDuration}`),
        grow: cn('transition-all', `duration-${transitionDuration}`),
        bounce: cn('transition-all ease-bounce', `duration-${transitionDuration}`),
      }

      // Custom styles object
      const customStyles: React.CSSProperties = {
        ...style,
        // Border
        ...(borderWidth && { borderWidth }),
        ...(borderColor && { borderColor }),
        ...(borderStyle && { borderStyle }),
        ...(borderRadius && { borderRadius }),
        // Typography
        ...(fontSize && { fontSize }),
        ...(fontWeight && { fontWeight }),
        ...(fontFamily && { fontFamily }),
        ...(textColor && { color: textColor }),
        // Colors
        ...(backgroundColor && { backgroundColor }),
        // Shadows
        ...(boxShadow && { boxShadow }),
        // Spacing
        ...(padding && { padding }),
        ...(paddingX && {
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }),
        ...(paddingY && {
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }),
        ...(gap && { gap }),
      }

      // Generate stars
      const stars = useMemo(() => {
        return Array.from({ length: maxValue }, (_, index) => (
          <RatingStar key={index} index={index} />
        ))
      }, [maxValue])

      return (
        <RatingContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(baseStyles, transitionStyles[transition], className)}
            style={customStyles}
            role="radiogroup"
            aria-label={ariaLabel || (typeof label === 'string' ? label : 'Rating')}
            aria-describedby={ariaDescribedby}
            aria-invalid={ariaInvalid || hasError}
            aria-required={ariaRequired || required}
            aria-valuenow={ariaValuenow || currentValue}
            aria-valuemin={ariaValuemin || 0}
            aria-valuemax={ariaValuemax || maxValue}
            aria-valuetext={ariaValuetext || `${currentValue} out of ${maxValue}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            {...props}
          >
            {children || (
              <>
                <div className="flex items-center gap-4">
                  {label && <RatingLabel>{label}</RatingLabel>}
                  <div className="flex items-center gap-1">{stars}</div>
                </div>
                {description && (
                  <div className="mt-3 ml-2">
                    <RatingDescription>{description}</RatingDescription>
                  </div>
                )}
                <RatingInput name={name} form={form} />
              </>
            )}
            {(helperText || errorMessage) && (
              <p
                className={cn(
                  'mt-1.5 leading-tight',
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-sm',
                  size === 'lg' && 'text-base',
                  hasError ? 'text-red-600' : 'text-gray-500'
                )}
                style={{
                  fontSize: helperTextFontSize,
                  color: helperTextColor,
                  marginTop: helperTextMarginTop,
                }}
              >
                {errorMessage || helperText}
              </p>
            )}
          </div>
        </RatingContext.Provider>
      )
    }
  )
)

RatingBase.displayName = 'Rating'

// Compound component interface
interface RatingComponent
  extends React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLDivElement>> {
  Star: typeof RatingStar
  Label: typeof RatingLabel
  Description: typeof RatingDescription
  Input: typeof RatingInput
  Icon: typeof RatingIcon
}

// Compound component exports
const Rating = RatingBase as unknown as RatingComponent
Rating.Star = RatingStar
Rating.Label = RatingLabel
Rating.Description = RatingDescription
Rating.Input = RatingInput
Rating.Icon = RatingIcon

export { Rating }
export default Rating
