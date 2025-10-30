import React, { createContext, useContext, forwardRef, memo, useState } from 'react'
import { cn } from '@/utils'

// Types and Interfaces
export interface ButtonContextValue {
  variant: ButtonVariant
  size: ButtonSize
  status: ButtonStatus
  isDisabled: boolean
  isLoading: boolean
  isRequired: boolean
  hasIcon: boolean
  iconPosition: 'left' | 'right'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type ButtonVariant =
  | 'default'
  | 'filled'
  | 'outlined'
  | 'ghost'
  | 'solid'
  | 'gradient'
  | 'glass'
  | 'neon'
  | 'link'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ButtonStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'primary'
  | 'secondary'

export type ButtonTransition = 'none' | 'colors' | 'transform' | 'glow' | 'slide' | 'bounce'

export interface ButtonBaseProps {
  // Core props
  variant?: ButtonVariant
  size?: ButtonSize
  status?: ButtonStatus
  disabled?: boolean
  loading?: boolean
  required?: boolean
  interactive?: boolean
  animated?: boolean
  animation?: 'pulse' | 'bounce' | 'shake' | 'glow'
  transition?: ButtonTransition
  transitionDuration?: string

  // Content props
  label?: string
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loadingText?: string
  loadingSpinner?: React.ReactNode
  ariaLabel?: string

  // Form integration
  type?: 'button' | 'submit' | 'reset'
  value?: string
  name?: string
  form?: string

  // Styling props
  className?: string
  style?: React.CSSProperties

  // Border styling
  borderWidth?: string | number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderRadius?: string | number

  // Typography
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  textColor?: string
  textAlign?: 'left' | 'center' | 'right'

  // Colors
  backgroundColor?: string
  color?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string

  // Transform and hover effects
  scale?: string
  hoverScale?: string
  activeScale?: string
  opacity?: string
  hoverOpacity?: string
  activeOpacity?: string
  transform?: string
  hoverTransform?: string
  activeTransform?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string | number
  focusRingOffset?: string | number
  focusBorderColor?: string
  focusBackgroundColor?: string
  focusTextColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string
  hoverBoxShadow?: string
  activeBoxShadow?: string

  // Spacing
  padding?: string | number
  paddingX?: string | number
  paddingY?: string | number
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  margin?: string | number
  marginX?: string | number
  marginY?: string | number
  marginTop?: string | number
  marginRight?: string | number
  marginBottom?: string | number
  marginLeft?: string | number

  // Layout
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  flex?: string | number
  flexGrow?: string | number
  flexShrink?: string | number
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  gap?: string | number

  // Display
  display?: 'inline-flex' | 'flex' | 'inline-block' | 'block' | 'none'
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  zIndex?: string | number

  // Accessibility
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-required'?: boolean
  'aria-disabled'?: boolean
  'aria-pressed'?: boolean
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean
  role?: string
  tabIndex?: number

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>,
    ButtonBaseProps {
  children?: React.ReactNode
}

// Context
const ButtonContext = createContext<ButtonContextValue | null>(null)

export const useButtonContext = () => {
  const context = useContext(ButtonContext)
  if (!context) {
    throw new Error('Button compound components must be used within a Button component')
  }
  return context
}

// Sub-components
export const ButtonIcon = memo(
  forwardRef<HTMLSpanElement, { children: React.ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => {
      const context = useButtonContext()

      const iconStyles = cn(
        'inline-flex items-center justify-center',
        context.size === 'xs' && 'w-3 h-3',
        context.size === 'sm' && 'w-4 h-4',
        context.size === 'md' && 'w-4 h-4',
        context.size === 'lg' && 'w-5 h-5',
        context.size === 'xl' && 'w-6 h-6',
        context.size === '2xl' && 'w-7 h-7',
        context.iconPosition === 'left' && 'mr-2',
        context.iconPosition === 'right' && 'ml-2',
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

ButtonIcon.displayName = 'ButtonIcon'

export const ButtonLabel = memo(
  forwardRef<HTMLSpanElement, { children: React.ReactNode; className?: string }>(
    ({ children, className, ...props }, ref) => {
      const context = useButtonContext()

      const labelStyles = cn(
        'inline-flex items-center',
        context.isLoading && 'opacity-0',
        className
      )

      return (
        <span ref={ref} className={labelStyles} {...props}>
          {children}
        </span>
      )
    }
  )
)

ButtonLabel.displayName = 'ButtonLabel'

export const ButtonSpinner = memo(
  forwardRef<HTMLDivElement, { className?: string }>(({ className, ...props }, ref) => {
    const context = useButtonContext()

    if (!context.isLoading) return null

    const spinnerStyles = cn(
      'absolute inset-0 flex items-center justify-center',
      'animate-spin',
      context.size === 'xs' && 'w-3 h-3',
      context.size === 'sm' && 'w-4 h-4',
      context.size === 'md' && 'w-4 h-4',
      context.size === 'lg' && 'w-5 h-5',
      context.size === 'xl' && 'w-6 h-6',
      context.size === '2xl' && 'w-7 h-7',
      className
    )

    return (
      <div ref={ref} className={spinnerStyles} {...props}>
        <svg className="animate-spin h-full w-full" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  })
)

ButtonSpinner.displayName = 'ButtonSpinner'

// Main Button Component
const ButtonBase = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        // Core props
        variant = 'default',
        size = 'md',
        status = 'default',
        disabled = false,
        loading = false,
        required = false,
        interactive = true,
        animated = false,
        animation = 'pulse',
        transition = 'colors',
        transitionDuration = '150ms',

        // Content props
        children,
        label,
        icon,
        iconPosition = 'left',
        loadingText,
        ariaLabel,

        // Form props
        type = 'button',
        value,
        name,
        form,

        // Styling props
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
        textAlign,

        // Colors
        backgroundColor,
        color,
        hoverBackgroundColor,
        hoverTextColor,
        activeBackgroundColor,
        activeTextColor,

        // Transform and hover effects
        scale,
        hoverScale,
        activeScale,
        opacity,
        hoverOpacity,
        activeOpacity,
        transform,
        hoverTransform,
        activeTransform,

        // Focus styles
        focusRingColor,
        focusRingWidth,
        focusRingOffset,
        focusBorderColor,
        focusBackgroundColor,
        focusTextColor,

        // Shadows
        boxShadow,
        focusBoxShadow,
        hoverBoxShadow,
        activeBoxShadow,

        // Spacing
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        margin,
        marginX,
        marginY,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,

        // Layout
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        flex,
        flexGrow,
        flexShrink,
        justifyContent,
        alignItems,
        gap,

        // Display
        display,
        position,
        zIndex,

        // Event handlers
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,

        // Rest of props
        ...props
      },
      ref
    ) => {
      const [isPressed, setIsPressed] = useState(false)
      const [isHovered, setIsHovered] = useState(false)
      const [isFocused, setIsFocused] = useState(false)

      const isDisabled = disabled || loading
      const hasIcon = Boolean(icon)

      // Context value
      const contextValue: ButtonContextValue = {
        variant,
        size,
        status,
        isDisabled,
        isLoading: loading,
        isRequired: required,
        hasIcon,
        iconPosition,
        onClick,
      }

      // Base styles
      const baseStyles = cn(
        'relative inline-flex items-center justify-center font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'select-none cursor-pointer',
        interactive && 'hover:scale-105 active:scale-95',
        animated && animation === 'pulse' && 'animate-pulse',
        animated && animation === 'bounce' && 'animate-bounce',
        animated && animation === 'shake' && 'animate-shake',
        animated && animation === 'glow' && 'animate-glow'
      )

      // Base variant styles (without status-specific colors)
      const baseVariantStyles = {
        default: cn(
          'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500',
          'focus-visible:ring-gray-500',
          'active:bg-gray-100 dark:active:bg-gray-600'
        ),
        filled: 'text-white', // Base filled style, colors come from status
        outlined: 'border-2 bg-transparent', // Base outlined style, colors come from status
        ghost: 'bg-transparent border-transparent', // Base ghost style, colors come from status
        solid: 'border-0 shadow-md', // Base solid style, colors come from status
        gradient: 'border-0 bg-gradient-to-r text-white shadow-lg', // Base gradient style, colors come from status
        glass: 'backdrop-blur-md bg-opacity-20 border border-opacity-30', // Base glass style, colors come from status
        neon: 'border-2 bg-transparent shadow-lg', // Base neon style, colors come from status
        link: cn(
          'bg-transparent border-transparent p-0 h-auto text-left underline-offset-4',
          'hover:underline focus-visible:ring-2 focus-visible:ring-offset-2'
        ),
      }

      // Status-specific styles for each variant
      const statusVariantStyles = {
        default: {
          primary: '',
          secondary: '',
          success: '',
          warning: '',
          error: '',
          info: '',
          default: '',
        },
        filled: {
          primary: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
          secondary: 'bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500',
          success: 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500',
          warning: 'bg-yellow-600 hover:bg-yellow-700 focus-visible:ring-yellow-500',
          error: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
          info: 'bg-cyan-600 hover:bg-cyan-700 focus-visible:ring-cyan-500',
          default: 'bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500',
        },
        outlined: {
          primary: 'border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500',
          secondary: 'border-gray-600 text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500',
          success: 'border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500',
          warning:
            'border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500',
          error: 'border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
          info: 'border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus-visible:ring-cyan-500',
          default: 'border-gray-600 text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500',
        },
        ghost: {
          primary: 'text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500',
          secondary: 'text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500',
          success: 'text-green-600 hover:bg-green-50 focus-visible:ring-green-500',
          warning: 'text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500',
          error: 'text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
          info: 'text-cyan-600 hover:bg-cyan-50 focus-visible:ring-cyan-500',
          default: 'text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-500',
        },
        solid: {
          primary: 'bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-600',
          secondary: 'bg-gray-700 text-white hover:bg-gray-800 focus-visible:ring-gray-600',
          success: 'bg-green-700 text-white hover:bg-green-800 focus-visible:ring-green-600',
          warning: 'bg-yellow-700 text-white hover:bg-yellow-800 focus-visible:ring-yellow-600',
          error: 'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-600',
          info: 'bg-cyan-700 text-white hover:bg-cyan-800 focus-visible:ring-cyan-600',
          default: 'bg-gray-700 text-white hover:bg-gray-800 focus-visible:ring-gray-600',
        },
        gradient: {
          primary:
            'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus-visible:ring-blue-500',
          secondary:
            'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus-visible:ring-gray-500',
          success:
            'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus-visible:ring-green-500',
          warning:
            'from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 focus-visible:ring-yellow-500',
          error:
            'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus-visible:ring-red-500',
          info: 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus-visible:ring-cyan-500',
          default:
            'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus-visible:ring-gray-500',
        },
        glass: {
          primary:
            'bg-blue-500 border-blue-300 text-blue-900 hover:bg-opacity-30 focus-visible:ring-blue-500',
          secondary:
            'bg-gray-500 border-gray-300 text-gray-900 hover:bg-opacity-30 focus-visible:ring-gray-500',
          success:
            'bg-green-500 border-green-300 text-green-900 hover:bg-opacity-30 focus-visible:ring-green-500',
          warning:
            'bg-yellow-500 border-yellow-300 text-yellow-900 hover:bg-opacity-30 focus-visible:ring-yellow-500',
          error:
            'bg-red-500 border-red-300 text-red-900 hover:bg-opacity-30 focus-visible:ring-red-500',
          info: 'bg-cyan-500 border-cyan-300 text-cyan-900 hover:bg-opacity-30 focus-visible:ring-cyan-500',
          default:
            'bg-gray-500 border-gray-300 text-gray-900 hover:bg-opacity-30 focus-visible:ring-gray-500',
        },
        neon: {
          primary:
            'border-blue-400 text-blue-400 shadow-blue-400/50 hover:shadow-blue-400/75 hover:text-blue-300 focus-visible:ring-blue-400',
          secondary:
            'border-gray-400 text-gray-400 shadow-gray-400/50 hover:shadow-gray-400/75 hover:text-gray-300 focus-visible:ring-gray-400',
          success:
            'border-green-400 text-green-400 shadow-green-400/50 hover:shadow-green-400/75 hover:text-green-300 focus-visible:ring-green-400',
          warning:
            'border-yellow-400 text-yellow-400 shadow-yellow-400/50 hover:shadow-yellow-400/75 hover:text-yellow-300 focus-visible:ring-yellow-400',
          error:
            'border-red-400 text-red-400 shadow-red-400/50 hover:shadow-red-400/75 hover:text-red-300 focus-visible:ring-red-400',
          info: 'border-cyan-400 text-cyan-400 shadow-cyan-400/50 hover:shadow-cyan-400/75 hover:text-cyan-300 focus-visible:ring-cyan-400',
          default:
            'border-gray-400 text-gray-400 shadow-gray-400/50 hover:shadow-gray-400/75 hover:text-gray-300 focus-visible:ring-gray-400',
        },
        link: {
          primary: 'text-blue-600 hover:text-blue-700 focus-visible:ring-blue-500',
          secondary: 'text-gray-600 hover:text-gray-700 focus-visible:ring-gray-500',
          success: 'text-green-600 hover:text-green-700 focus-visible:ring-green-500',
          warning: 'text-yellow-600 hover:text-yellow-700 focus-visible:ring-yellow-500',
          error: 'text-red-600 hover:text-red-700 focus-visible:ring-red-500',
          info: 'text-cyan-600 hover:text-cyan-700 focus-visible:ring-cyan-500',
          default: 'text-gray-600 hover:text-gray-700 focus-visible:ring-gray-500',
        },
      }

      // Combine base variant with status-specific styles
      const getVariantStyles = () => {
        const baseStyle = baseVariantStyles[variant] || baseVariantStyles.default
        const statusStyle =
          statusVariantStyles[variant]?.[status] || statusVariantStyles[variant]?.default || ''
        return cn(baseStyle, statusStyle)
      }

      const variantStyles = getVariantStyles()

      // Size styles
      const sizeStyles = {
        xs: variant === 'link' ? 'text-xs' : 'h-6 px-2 text-xs rounded',
        sm: variant === 'link' ? 'text-sm' : 'h-8 px-3 text-sm rounded-md',
        md: variant === 'link' ? 'text-base' : 'h-10 px-4 text-sm rounded-md',
        lg: variant === 'link' ? 'text-lg' : 'h-12 px-6 text-base rounded-lg',
        xl: variant === 'link' ? 'text-xl' : 'h-14 px-8 text-lg rounded-lg',
        '2xl': variant === 'link' ? 'text-2xl' : 'h-16 px-10 text-xl rounded-xl',
      }

      // Transition styles
      const transitionStyles = {
        none: '',
        colors: 'transition-colors',
        transform: 'transition-transform',
        glow: 'transition-shadow',
        slide: 'transition-all',
        bounce: 'transition-all ease-bounce',
      }

      // Custom styles object
      const customStyles: React.CSSProperties = {
        ...style,
        // Border
        ...(borderWidth && {
          borderWidth: typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
        }),
        ...(borderColor && { borderColor }),
        ...(borderStyle && { borderStyle }),
        ...(borderRadius && {
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        }),
        // Typography
        ...(fontSize && { fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize }),
        ...(fontWeight && { fontWeight }),
        ...(fontFamily && { fontFamily }),
        ...(textColor && { color: textColor }),
        ...(textAlign && { textAlign }),
        // Colors
        ...(backgroundColor && { backgroundColor }),
        ...(color && { color }),
        // Transform
        ...(scale && { transform: `scale(${scale})` }),
        ...(opacity && { opacity }),
        ...(transform && { transform }),
        // Focus styles
        ...(focusRingColor && { '--focus-ring-color': focusRingColor }),
        ...(focusRingWidth && {
          '--focus-ring-width':
            typeof focusRingWidth === 'number' ? `${focusRingWidth}px` : focusRingWidth,
        }),
        ...(focusRingOffset && {
          '--focus-ring-offset':
            typeof focusRingOffset === 'number' ? `${focusRingOffset}px` : focusRingOffset,
        }),
        // Shadows
        ...(boxShadow && { boxShadow }),
        // Spacing
        ...(padding && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
        ...(paddingX && {
          paddingLeft: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
          paddingRight: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
        }),
        ...(paddingY && {
          paddingTop: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
          paddingBottom: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
        }),
        ...(paddingTop && {
          paddingTop: typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop,
        }),
        ...(paddingRight && {
          paddingRight: typeof paddingRight === 'number' ? `${paddingRight}px` : paddingRight,
        }),
        ...(paddingBottom && {
          paddingBottom: typeof paddingBottom === 'number' ? `${paddingBottom}px` : paddingBottom,
        }),
        ...(paddingLeft && {
          paddingLeft: typeof paddingLeft === 'number' ? `${paddingLeft}px` : paddingLeft,
        }),
        ...(margin && { margin: typeof margin === 'number' ? `${margin}px` : margin }),
        ...(marginX && {
          marginLeft: typeof marginX === 'number' ? `${marginX}px` : marginX,
          marginRight: typeof marginX === 'number' ? `${marginX}px` : marginX,
        }),
        ...(marginY && {
          marginTop: typeof marginY === 'number' ? `${marginY}px` : marginY,
          marginBottom: typeof marginY === 'number' ? `${marginY}px` : marginY,
        }),
        ...(marginTop && {
          marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
        }),
        ...(marginRight && {
          marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight,
        }),
        ...(marginBottom && {
          marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
        }),
        ...(marginLeft && {
          marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
        }),
        // Layout
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
        ...(minWidth && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
        ...(minHeight && {
          minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        }),
        ...(maxWidth && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
        ...(maxHeight && {
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        }),
        ...(flex && { flex }),
        ...(flexGrow && { flexGrow }),
        ...(flexShrink && { flexShrink }),
        ...(justifyContent && { justifyContent }),
        ...(alignItems && { alignItems }),
        ...(gap && { gap: typeof gap === 'number' ? `${gap}px` : gap }),
        // Display
        ...(display && { display }),
        ...(position && { position }),
        ...(zIndex && { zIndex }),
        // Transition
        ...(transitionDuration && { transitionDuration }),
        // Hover states
        ...(isHovered && hoverBackgroundColor && { backgroundColor: hoverBackgroundColor }),
        ...(isHovered && hoverTextColor && { color: hoverTextColor }),
        ...(isHovered && hoverScale && { transform: `scale(${hoverScale})` }),
        ...(isHovered && hoverOpacity && { opacity: hoverOpacity }),
        ...(isHovered && hoverTransform && { transform: hoverTransform }),
        ...(isHovered && hoverBoxShadow && { boxShadow: hoverBoxShadow }),
        // Active states
        ...(isPressed && activeBackgroundColor && { backgroundColor: activeBackgroundColor }),
        ...(isPressed && activeTextColor && { color: activeTextColor }),
        ...(isPressed && activeScale && { transform: `scale(${activeScale})` }),
        ...(isPressed && activeOpacity && { opacity: activeOpacity }),
        ...(isPressed && activeTransform && { transform: activeTransform }),
        ...(isPressed && activeBoxShadow && { boxShadow: activeBoxShadow }),
        // Focus states
        ...(isFocused && focusBackgroundColor && { backgroundColor: focusBackgroundColor }),
        ...(isFocused && focusTextColor && { color: focusTextColor }),
        ...(isFocused && focusBorderColor && { borderColor: focusBorderColor }),
        ...(isFocused && focusBoxShadow && { boxShadow: focusBoxShadow }),
      }

      // Event handlers
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        onClick?.(event)
      }

      const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        setIsHovered(true)
        onMouseEnter?.(event)
      }

      const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        setIsHovered(false)
        setIsPressed(false)
        onMouseLeave?.(event)
      }

      const handleMouseDown = () => {
        if (isDisabled) return
        setIsPressed(true)
      }

      const handleMouseUp = () => {
        if (isDisabled) return
        setIsPressed(false)
      }

      const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        setIsFocused(true)
        onFocus?.(event)
      }

      const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        setIsFocused(false)
        setIsPressed(false)
        onBlur?.(event)
      }

      const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        if (event.key === ' ' || event.key === 'Enter') {
          setIsPressed(true)
        }
        onKeyDown?.(event)
      }

      const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return
        if (event.key === ' ' || event.key === 'Enter') {
          setIsPressed(false)
        }
        onKeyUp?.(event)
      }

      // Content rendering
      const renderContent = () => {
        if (children) {
          return children
        }

        return (
          <>
            {icon && iconPosition === 'left' && <ButtonIcon>{icon}</ButtonIcon>}
            {(label || loadingText) && (
              <ButtonLabel>{loading && loadingText ? loadingText : label}</ButtonLabel>
            )}
            {icon && iconPosition === 'right' && <ButtonIcon>{icon}</ButtonIcon>}
            {loading && <ButtonSpinner />}
          </>
        )
      }

      return (
        <ButtonContext.Provider value={contextValue}>
          <button
            ref={ref}
            type={type}
            disabled={isDisabled}
            value={value}
            name={name}
            form={form}
            className={cn(
              baseStyles,
              variantStyles,
              sizeStyles[size],
              transitionStyles[transition],
              className
            )}
            style={customStyles}
            aria-label={ariaLabel || props['aria-label']}
            aria-required={required || props['aria-required']}
            aria-disabled={isDisabled || props['aria-disabled']}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            {...props}
          >
            {renderContent()}
          </button>
        </ButtonContext.Provider>
      )
    }
  )
)

ButtonBase.displayName = 'Button'

// Compound component interface
interface ButtonComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>> {
  Icon: typeof ButtonIcon
  Label: typeof ButtonLabel
  Spinner: typeof ButtonSpinner
}

// Compound component exports
const Button = ButtonBase as unknown as ButtonComponent
Button.Icon = ButtonIcon
Button.Label = ButtonLabel
Button.Spinner = ButtonSpinner

export { Button }
export default Button
