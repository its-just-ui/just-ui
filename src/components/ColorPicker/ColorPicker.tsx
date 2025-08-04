import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { cn } from '@/utils'
import { Popover } from '@/components/Popover'
import { Slider } from '@/components/Slider'

// Types
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'
export type ColorPickerVariant = 'default' | 'inline' | 'popover' | 'minimal' | 'advanced'
export type ColorPickerSize = 'sm' | 'md' | 'lg'

export interface RGBColor {
  r: number
  g: number
  b: number
  a?: number
}

export interface HSLColor {
  h: number
  s: number
  l: number
  a?: number
}

export interface ColorValue {
  hex: string
  rgb: RGBColor
  hsl: HSLColor
  format: ColorFormat
}

export interface PresetColor {
  value: string
  label?: string
}

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Core functionality - controlled component
  value: string
  onChange: (value: string, color: ColorValue) => void

  // Features
  disabled?: boolean
  readOnly?: boolean
  allowAlpha?: boolean
  defaultFormat?: ColorFormat
  presetColors?: PresetColor[]

  // Display options
  showPreview?: boolean
  showInputs?: boolean
  showSliders?: boolean
  showPresets?: boolean

  // Variants and styling
  variant?: ColorPickerVariant
  size?: ColorPickerSize

  // Labels
  label?: string
  placeholder?: string

  // Customization props
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

  // Focus styles
  focusRingColor?: string
  focusBorderColor?: string
  focusBoxShadow?: string

  // Spacing
  padding?: string
  gap?: string

  // Animation
  transitionDuration?: number

  // Swatch customization
  swatchShape?: 'circle' | 'square'
  swatchSize?: string
  swatchBorderColor?: string
  swatchBorderWidth?: string

  // Popover customization
  popoverBackgroundColor?: string
  popoverBorderColor?: string
  popoverBorderRadius?: string
  popoverBoxShadow?: string
  popoverPadding?: string
  popoverPosition?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  popoverOffset?: string
  popoverOffsetTop?: number
  popoverOffsetBottom?: number
  popoverOffsetLeft?: number
  popoverOffsetRight?: number

  // Custom rendering
  renderTrigger?: (props: {
    color: ColorValue
    onClick: () => void
    disabled?: boolean
  }) => React.ReactNode
  renderSwatch?: (props: {
    color: string
    selected: boolean
    onClick: () => void
  }) => React.ReactNode

  // Events
  onFocus?: () => void
  onBlur?: () => void
  onOpen?: () => void
  onClose?: () => void
  onFormatChange?: (format: ColorFormat) => void

  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

// Context
interface ColorPickerContextValue {
  value: ColorValue
  onChange: (color: Partial<ColorValue>) => void
  format: ColorFormat
  setFormat: (format: ColorFormat) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  disabled?: boolean
  readOnly?: boolean
  allowAlpha?: boolean
  variant: ColorPickerVariant
  size: ColorPickerSize
  presetColors?: PresetColor[]
  showPreview: boolean
  showInputs: boolean
  showSliders: boolean
  showPresets: boolean

  // Style props passed through context
  swatchShape?: 'circle' | 'square'
  swatchSize?: string
  swatchBorderColor?: string
  swatchBorderWidth?: string
  popoverBackgroundColor?: string
  popoverBorderColor?: string
  popoverBorderRadius?: string
  popoverBoxShadow?: string
  popoverPadding?: string

  // Render props
  renderSwatch?: (props: {
    color: string
    selected: boolean
    onClick: () => void
  }) => React.ReactNode
}

const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(null)

export const useColorPicker = () => {
  const context = React.useContext(ColorPickerContext)
  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPicker')
  }
  return context
}

// Color conversion utilities
const hexToRgb = (hex: string): RGBColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex)
  if (!result) {
    return { r: 0, g: 0, b: 0, a: 1 }
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] ? parseInt(result[4], 16) / 255 : 1,
  }
}

const rgbToHex = (rgb: RGBColor): string => {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
  if (rgb.a !== undefined && rgb.a < 1) {
    return hex + toHex(rgb.a * 255)
  }
  return hex
}

const rgbToHsl = (rgb: RGBColor): HSLColor => {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: rgb.a,
  }
}

const hslToRgb = (hsl: HSLColor): RGBColor => {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsl.a,
  }
}

const parseColor = (value: string): ColorValue => {
  let rgb: RGBColor
  let format: ColorFormat = 'hex'

  if (value.startsWith('#')) {
    rgb = hexToRgb(value)
    format = value.length > 7 ? 'hex' : 'hex'
  } else if (value.startsWith('rgb')) {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (match) {
      rgb = {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1,
      }
      format = match[4] ? 'rgba' : 'rgb'
    } else {
      rgb = { r: 0, g: 0, b: 0, a: 1 }
    }
  } else if (value.startsWith('hsl')) {
    const match = value.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/)
    if (match) {
      const hsl: HSLColor = {
        h: parseInt(match[1]),
        s: parseInt(match[2]),
        l: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1,
      }
      rgb = hslToRgb(hsl)
      format = match[4] ? 'hsla' : 'hsl'
    } else {
      rgb = { r: 0, g: 0, b: 0, a: 1 }
    }
  } else {
    rgb = { r: 0, g: 0, b: 0, a: 1 }
  }

  const hsl = rgbToHsl(rgb)
  const hex = rgbToHex(rgb)

  return { hex, rgb, hsl, format }
}

const formatColor = (color: ColorValue, format: ColorFormat): string => {
  switch (format) {
    case 'hex':
      return color.rgb.a && color.rgb.a < 1 ? color.hex.slice(0, 7) : color.hex
    case 'rgb':
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
    case 'rgba':
      return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a || 1})`
    case 'hsl':
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
    case 'hsla':
      return `hsla(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%, ${color.hsl.a || 1})`
    default:
      return color.hex
  }
}

// Main ColorPicker component
const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      readOnly = false,
      allowAlpha = true,
      defaultFormat = 'hex',
      presetColors,
      showPreview = true,
      showInputs = true,
      showSliders = true,
      showPresets = true,
      variant = 'default',
      size = 'md',
      label,
      placeholder = 'Select color',

      // Style props
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      backgroundColor,
      focusRingColor,
      focusBorderColor,
      focusBoxShadow,
      padding,
      gap,
      transitionDuration = 200,

      // Component-specific props
      swatchShape = 'square',
      swatchSize,
      swatchBorderColor,
      swatchBorderWidth,
      popoverBackgroundColor,
      popoverBorderColor,
      popoverBorderRadius,
      popoverBoxShadow,
      popoverPadding,
      popoverPosition = 'bottom',
      popoverOffset,
      popoverOffsetTop,
      popoverOffsetBottom,
      popoverOffsetLeft,
      popoverOffsetRight,

      // Render props
      renderTrigger,
      renderSwatch,

      // Events
      onFocus,
      onBlur,
      onOpen,
      onClose,
      onFormatChange,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,

      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [format, setFormat] = useState<ColorFormat>(defaultFormat)
    const colorValue = useMemo(() => parseColor(value), [value])

    const handleChange = useCallback(
      (newColor: Partial<ColorValue>) => {
        const updatedColor = { ...colorValue, ...newColor }
        if (newColor.hex) {
          const parsed = parseColor(newColor.hex)
          Object.assign(updatedColor, parsed)
        } else if (newColor.rgb) {
          updatedColor.hex = rgbToHex(newColor.rgb)
          updatedColor.hsl = rgbToHsl(newColor.rgb)
        } else if (newColor.hsl) {
          updatedColor.rgb = hslToRgb(newColor.hsl)
          updatedColor.hex = rgbToHex(updatedColor.rgb)
        }

        const formattedValue = formatColor(updatedColor, format)
        onChange(formattedValue, updatedColor)
      },
      [colorValue, format, onChange]
    )

    const handleFormatChange = useCallback(
      (newFormat: ColorFormat) => {
        setFormat(newFormat)
        onFormatChange?.(newFormat)
        const formattedValue = formatColor(colorValue, newFormat)
        onChange(formattedValue, { ...colorValue, format: newFormat })
      },
      [colorValue, onChange, onFormatChange]
    )

    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (!disabled && !readOnly) {
          setIsOpen(open)
          if (open) {
            onOpen?.()
          } else {
            onClose?.()
          }
        }
      },
      [disabled, readOnly, onOpen, onClose]
    )

    const contextValue: ColorPickerContextValue = {
      value: colorValue,
      onChange: handleChange,
      format,
      setFormat: handleFormatChange,
      isOpen,
      setIsOpen: handleOpenChange,
      disabled,
      readOnly,
      allowAlpha,
      variant,
      size,
      presetColors,
      showPreview,
      showInputs,
      showSliders,
      showPresets,
      swatchShape,
      swatchSize,
      swatchBorderColor,
      swatchBorderWidth,
      popoverBackgroundColor,
      popoverBorderColor,
      popoverBorderRadius,
      popoverBoxShadow,
      popoverPadding,
      renderSwatch,
    }

    const baseStyles = 'relative inline-block'

    return (
      <ColorPickerContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(baseStyles, className)}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={ariaInvalid}
          {...props}
        >
          {label && (
            <label
              className={cn(
                'block mb-1.5 font-medium',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                disabled && 'opacity-50'
              )}
              style={{
                fontSize,
                fontWeight,
                fontFamily,
                color: textColor,
              }}
            >
              {label}
            </label>
          )}
          {children || (
            <>
              {variant === 'inline' ? (
                <>
                  <ColorPickerTrigger
                    placeholder={placeholder}
                    borderWidth={borderWidth}
                    borderColor={borderColor}
                    borderStyle={borderStyle}
                    borderRadius={borderRadius}
                    backgroundColor={backgroundColor}
                    focusRingColor={focusRingColor}
                    focusBorderColor={focusBorderColor}
                    focusBoxShadow={focusBoxShadow}
                    padding={padding}
                    transitionDuration={transitionDuration}
                    renderTrigger={renderTrigger}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <ColorPickerContent className="mt-2" gap={gap} />
                </>
              ) : (
                <Popover
                  open={isOpen}
                  onOpenChange={handleOpenChange}
                  position={popoverPosition}
                  trigger="click"
                  closeOnEscape
                  closeOnOutsideClick
                  closeOnBlur={false}
                  hasArrow={false}
                  transition="scale"
                  enterDuration={transitionDuration}
                  exitDuration={transitionDuration * 0.75}
                  backgroundColor={popoverBackgroundColor}
                  borderColor={popoverBorderColor}
                  borderRadius={popoverBorderRadius}
                  boxShadow={popoverBoxShadow}
                  padding={popoverPadding}
                  offset={popoverOffset}
                  offsetTop={popoverOffsetTop}
                  offsetBottom={popoverOffsetBottom}
                  offsetLeft={popoverOffsetLeft}
                  offsetRight={popoverOffsetRight}
                >
                  <Popover.Trigger asChild>
                    <ColorPickerTrigger
                      placeholder={placeholder}
                      borderWidth={borderWidth}
                      borderColor={borderColor}
                      borderStyle={borderStyle}
                      borderRadius={borderRadius}
                      backgroundColor={backgroundColor}
                      focusRingColor={focusRingColor}
                      focusBorderColor={focusBorderColor}
                      focusBoxShadow={focusBoxShadow}
                      padding={padding}
                      transitionDuration={transitionDuration}
                      renderTrigger={renderTrigger}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      asChild
                    />
                  </Popover.Trigger>
                  <Popover.Content className="min-w-[280px]">
                    <ColorPickerContent gap={gap} />
                  </Popover.Content>
                </Popover>
              )}
            </>
          )}
        </div>
      </ColorPickerContext.Provider>
    )
  }
)

ColorPicker.displayName = 'ColorPicker'

// Sub-components
interface ColorPickerTriggerProps {
  placeholder?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  backgroundColor?: string
  focusRingColor?: string
  focusBorderColor?: string
  focusBoxShadow?: string
  padding?: string
  transitionDuration?: number
  renderTrigger?: (props: {
    color: ColorValue
    onClick: () => void
    disabled?: boolean
  }) => React.ReactNode
  onFocus?: () => void
  onBlur?: () => void
  asChild?: boolean
}

const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  (
    {
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      backgroundColor,
      focusRingColor,
      focusBorderColor,
      focusBoxShadow,
      padding,
      transitionDuration,
      renderTrigger,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const {
      value,
      isOpen,
      setIsOpen,
      disabled,
      readOnly,
      variant,
      size,
      swatchShape,
      swatchSize,
      swatchBorderColor,
      swatchBorderWidth,
    } = useColorPicker()
    const [isFocused, setIsFocused] = useState(false)

    const handleClick = () => {
      if (!disabled && !readOnly && variant !== 'inline') {
        setIsOpen(!isOpen)
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
      onFocus?.()
    }

    const handleBlur = () => {
      setIsFocused(false)
      onBlur?.()
    }

    if (renderTrigger) {
      return <>{renderTrigger({ color: value, onClick: handleClick, disabled })}</>
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    }

    const customStyles: React.CSSProperties = {
      borderWidth: borderWidth || '1px',
      borderColor: borderColor || '#e5e7eb',
      borderStyle: borderStyle || 'solid',
      borderRadius: borderRadius || '0.375rem',
      backgroundColor: backgroundColor || 'white',
      padding,
      transition: `all ${transitionDuration}ms ease-in-out`,
      ...(isFocused && focusBorderColor && { borderColor: focusBorderColor }),
      ...(isFocused && focusBoxShadow && { boxShadow: focusBoxShadow }),
      ...(isFocused &&
        focusRingColor && {
          boxShadow: `0 0 0 3px ${focusRingColor}`,
        }),
    }

    const swatchStyles: React.CSSProperties = {
      backgroundColor: value.hex,
      width: swatchSize || (size === 'sm' ? '20px' : size === 'lg' ? '28px' : '24px'),
      height: swatchSize || (size === 'sm' ? '20px' : size === 'lg' ? '28px' : '24px'),
      borderRadius: swatchShape === 'circle' ? '50%' : '0.25rem',
      borderWidth: swatchBorderWidth || '1px',
      borderColor: swatchBorderColor || '#e5e7eb',
      borderStyle: 'solid',
    }

    if (variant === 'minimal') {
      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            'inline-flex items-center justify-center transition-all',
            'hover:opacity-80 focus:outline-none',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          style={swatchStyles}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-label={`Color picker, current color ${value.hex}`}
        />
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center gap-2 font-medium transition-all',
          'hover:bg-gray-50 focus:outline-none',
          sizes[size],
          disabled && 'cursor-not-allowed opacity-50'
        )}
        style={customStyles}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      >
        <span style={swatchStyles} />
        <span className="flex-1 text-left">{value.hex}</span>
        {variant !== 'inline' && (
          <svg
            className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
    )
  }
)

ColorPickerTrigger.displayName = 'ColorPickerTrigger'

interface ColorPickerContentProps {
  className?: string
  gap?: string
}

const ColorPickerContent: React.FC<ColorPickerContentProps> = ({ className, gap }) => {
  const { showSliders, showInputs, showPresets } = useColorPicker()

  const customStyles: React.CSSProperties = {
    gap: gap || '1rem',
  }

  return (
    <div className={cn('flex flex-col', className)} style={customStyles}>
      {showSliders && <ColorPickerSliders />}
      {showInputs && <ColorPickerInputs />}
      {showPresets && <ColorPickerPresets />}
    </div>
  )
}

const ColorPickerSliders: React.FC = () => {
  const { value, onChange, allowAlpha, size } = useColorPicker()

  const handleHueChange = (values: number[]) => {
    onChange({ hsl: { ...value.hsl, h: values[0] } })
  }

  const handleSaturationChange = (values: number[]) => {
    onChange({ hsl: { ...value.hsl, s: values[0] } })
  }

  const handleLightnessChange = (values: number[]) => {
    onChange({ hsl: { ...value.hsl, l: values[0] } })
  }

  const handleAlphaChange = (values: number[]) => {
    onChange({ rgb: { ...value.rgb, a: values[0] }, hsl: { ...value.hsl, a: values[0] } })
  }

  // Custom track styles for each slider
  const hueTrackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, 
      hsl(0, 100%, 50%), 
      hsl(60, 100%, 50%), 
      hsl(120, 100%, 50%), 
      hsl(180, 100%, 50%), 
      hsl(240, 100%, 50%), 
      hsl(300, 100%, 50%), 
      hsl(360, 100%, 50%))`,
  }

  const saturationTrackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, 
      hsl(${value.hsl.h}, 0%, ${value.hsl.l}%), 
      hsl(${value.hsl.h}, 100%, ${value.hsl.l}%))`,
  }

  const lightnessTrackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, 
      hsl(${value.hsl.h}, ${value.hsl.s}%, 0%), 
      hsl(${value.hsl.h}, ${value.hsl.s}%, 50%), 
      hsl(${value.hsl.h}, ${value.hsl.s}%, 100%))`,
  }

  const alphaTrackStyle: React.CSSProperties = {
    background: `linear-gradient(to right, 
      rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, 0), 
      rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, 1))`,
  }

  const sliderSize = size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm'

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Hue</label>
        <Slider
          value={value.hsl.h}
          onChange={handleHueChange}
          min={0}
          max={360}
          step={1}
          size={sliderSize}
          variant="default"
          showTooltip={false}
        >
          <Slider.Track style={hueTrackStyle}>
            <Slider.Range style={{ background: 'transparent' }} />
          </Slider.Track>
          <Slider.Thumb
            index={0}
            value={{ value: value.hsl.h, percentage: (value.hsl.h / 360) * 100 }}
          />
        </Slider>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Saturation</label>
        <Slider
          value={value.hsl.s}
          onChange={handleSaturationChange}
          min={0}
          max={100}
          step={1}
          size={sliderSize}
          variant="default"
          showTooltip={false}
        >
          <Slider.Track style={saturationTrackStyle}>
            <Slider.Range style={{ background: 'transparent' }} />
          </Slider.Track>
          <Slider.Thumb index={0} value={{ value: value.hsl.s, percentage: value.hsl.s }} />
        </Slider>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Lightness</label>
        <Slider
          value={value.hsl.l}
          onChange={handleLightnessChange}
          min={0}
          max={100}
          step={1}
          size={sliderSize}
          variant="default"
          showTooltip={false}
        >
          <Slider.Track style={lightnessTrackStyle}>
            <Slider.Range style={{ background: 'transparent' }} />
          </Slider.Track>
          <Slider.Thumb index={0} value={{ value: value.hsl.l, percentage: value.hsl.l }} />
        </Slider>
      </div>

      {allowAlpha && (
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Alpha</label>
          <div className="relative">
            <div
              className="absolute inset-0 rounded"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #e5e7eb 0px, #e5e7eb 5px, #f3f4f6 5px, #f3f4f6 10px)`,
                height: '8px',
                borderRadius: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <Slider
              value={value.rgb.a || 1}
              onChange={handleAlphaChange}
              min={0}
              max={1}
              step={0.01}
              size={sliderSize}
              variant="default"
              showTooltip={false}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <Slider.Track style={{ ...alphaTrackStyle, backgroundColor: 'transparent' }}>
                <Slider.Range style={{ background: 'transparent' }} />
              </Slider.Track>
              <Slider.Thumb
                index={0}
                value={{ value: value.rgb.a || 1, percentage: (value.rgb.a || 1) * 100 }}
              />
            </Slider>
          </div>
        </div>
      )}
    </div>
  )
}

const ColorPickerInputs: React.FC = () => {
  const { value, onChange, format, setFormat, allowAlpha } = useColorPicker()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(formatColor(value, format))
  }, [value, format])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    try {
      const parsed = parseColor(inputValue)
      onChange(parsed)
    } catch {
      setInputValue(formatColor(value, format))
    }
  }

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value as ColorFormat)
  }

  const formats = allowAlpha ? ['hex', 'rgb', 'rgba', 'hsl', 'hsla'] : ['hex', 'rgb', 'hsl']

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder={format.toUpperCase()}
        />
        <select
          value={format}
          onChange={handleFormatChange}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {formats.map((f) => (
            <option key={f} value={f}>
              {f.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {format.startsWith('rgb') && (
        <div className="grid grid-cols-4 gap-2">
          <input
            type="number"
            min="0"
            max="255"
            value={value.rgb.r}
            onChange={(e) => onChange({ rgb: { ...value.rgb, r: parseInt(e.target.value) || 0 } })}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="R"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={value.rgb.g}
            onChange={(e) => onChange({ rgb: { ...value.rgb, g: parseInt(e.target.value) || 0 } })}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="G"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={value.rgb.b}
            onChange={(e) => onChange({ rgb: { ...value.rgb, b: parseInt(e.target.value) || 0 } })}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="B"
          />
          {allowAlpha && format === 'rgba' && (
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={value.rgb.a || 1}
              onChange={(e) =>
                onChange({ rgb: { ...value.rgb, a: parseFloat(e.target.value) || 1 } })
              }
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="A"
            />
          )}
        </div>
      )}

      {format.startsWith('hsl') && (
        <div className="grid grid-cols-4 gap-2">
          <input
            type="number"
            min="0"
            max="360"
            value={value.hsl.h}
            onChange={(e) => onChange({ hsl: { ...value.hsl, h: parseInt(e.target.value) || 0 } })}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="H"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={value.hsl.s}
            onChange={(e) => onChange({ hsl: { ...value.hsl, s: parseInt(e.target.value) || 0 } })}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="S"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={value.hsl.l}
            onChange={(e) => onChange({ hsl: { ...value.hsl, l: parseInt(e.target.value) || 0 } })}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="L"
          />
          {allowAlpha && format === 'hsla' && (
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={value.hsl.a || 1}
              onChange={(e) =>
                onChange({ hsl: { ...value.hsl, a: parseFloat(e.target.value) || 1 } })
              }
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="A"
            />
          )}
        </div>
      )}
    </div>
  )
}

const ColorPickerPresets: React.FC = () => {
  const {
    value,
    onChange,
    presetColors,
    renderSwatch,
    swatchShape,
    swatchSize,
    swatchBorderColor,
    swatchBorderWidth,
  } = useColorPicker()

  const defaultPresets: PresetColor[] = [
    { value: '#000000', label: 'Black' },
    { value: '#ffffff', label: 'White' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#10b981', label: 'Emerald' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#8b5cf6', label: 'Violet' },
    { value: '#ec4899', label: 'Pink' },
  ]

  const colors = presetColors || defaultPresets

  const handleSwatchClick = (color: string) => {
    const parsed = parseColor(color)
    onChange(parsed)
  }

  const swatchStyles = (color: string): React.CSSProperties => ({
    backgroundColor: color,
    width: swatchSize || '32px',
    height: swatchSize || '32px',
    borderRadius: swatchShape === 'circle' ? '50%' : '0.25rem',
    borderWidth: swatchBorderWidth || '1px',
    borderColor: swatchBorderColor || '#e5e7eb',
    borderStyle: 'solid',
  })

  return (
    <div>
      <h4 className="text-xs font-medium text-gray-700 mb-2">Preset Colors</h4>
      <div className="grid grid-cols-8 gap-2">
        {colors.map((preset, index) => {
          const isSelected = value.hex.toLowerCase() === preset.value.toLowerCase()

          if (renderSwatch) {
            return (
              <div key={index}>
                {renderSwatch({
                  color: preset.value,
                  selected: isSelected,
                  onClick: () => handleSwatchClick(preset.value),
                })}
              </div>
            )
          }

          return (
            <button
              key={index}
              type="button"
              className={cn(
                'transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                isSelected && 'ring-2 ring-offset-2 ring-primary-500'
              )}
              style={swatchStyles(preset.value)}
              onClick={() => handleSwatchClick(preset.value)}
              title={preset.label || preset.value}
              aria-label={`Select ${preset.label || preset.value}`}
            />
          )
        })}
      </div>
    </div>
  )
}

// Export compound component
interface ColorPickerComponent
  extends React.ForwardRefExoticComponent<ColorPickerProps & React.RefAttributes<HTMLDivElement>> {
  Trigger: typeof ColorPickerTrigger
  Content: typeof ColorPickerContent
  Sliders: typeof ColorPickerSliders
  Inputs: typeof ColorPickerInputs
  Presets: typeof ColorPickerPresets
}

const ColorPickerCompound = ColorPicker as unknown as ColorPickerComponent
ColorPickerCompound.Trigger = ColorPickerTrigger
ColorPickerCompound.Content = ColorPickerContent
ColorPickerCompound.Sliders = ColorPickerSliders
ColorPickerCompound.Inputs = ColorPickerInputs
ColorPickerCompound.Presets = ColorPickerPresets

export { ColorPickerCompound as ColorPicker }
export default ColorPickerCompound
