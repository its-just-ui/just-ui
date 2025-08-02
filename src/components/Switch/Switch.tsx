import React, { createContext, useContext, useState, useCallback, forwardRef } from 'react'
import { cn } from '@/utils'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  // Core props
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  
  // Visual props
  variant?: 'default' | 'filled' | 'outlined' | 'flat' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  status?: 'default' | 'success' | 'warning' | 'error'
  
  // Label props
  label?: React.ReactNode
  labelPosition?: 'start' | 'end'
  labelSpacing?: string
  helperText?: React.ReactNode
  errorMessage?: string
  
  // Animation props
  transition?: 'none' | 'slide' | 'fade' | 'bounce' | 'smooth'
  transitionDuration?: number
  
  // Loading state
  loading?: boolean
  loadingIcon?: React.ReactNode
  
  // Container styles
  containerClassName?: string
  containerStyle?: React.CSSProperties
  backgroundColor?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  boxShadow?: string
  
  // Track styles (the background part)
  trackBackgroundColor?: string
  trackBackgroundColorChecked?: string
  trackBorderWidth?: string
  trackBorderColor?: string
  trackBorderColorChecked?: string
  trackBorderStyle?: string
  trackBorderRadius?: string
  trackWidth?: string
  trackHeight?: string
  trackPadding?: string
  trackBoxShadow?: string
  trackBoxShadowChecked?: string
  
  // Thumb styles (the sliding part)
  thumbBackgroundColor?: string
  thumbBackgroundColorChecked?: string
  thumbBorderWidth?: string
  thumbBorderColor?: string
  thumbBorderColorChecked?: string
  thumbBorderStyle?: string
  thumbBorderRadius?: string
  thumbSize?: string
  thumbBoxShadow?: string
  thumbBoxShadowChecked?: string
  thumbIcon?: React.ReactNode
  thumbIconChecked?: React.ReactNode
  thumbIconColor?: string
  thumbIconColorChecked?: string
  
  // Label styles
  labelColor?: string
  labelColorChecked?: string
  labelFontSize?: string
  labelFontWeight?: string
  labelFontFamily?: string
  
  // Helper text styles
  helperTextColor?: string
  helperTextFontSize?: string
  errorMessageColor?: string
  
  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  focusBoxShadow?: string
  
  // Hover styles
  hoverTrackBackgroundColor?: string
  hoverThumbBackgroundColor?: string
  hoverBorderColor?: string
  hoverBoxShadow?: string
  
  // Active styles
  activeTrackBackgroundColor?: string
  activeThumbBackgroundColor?: string
  activeScale?: string
  
  // Custom render props
  renderLabel?: (checked: boolean, disabled?: boolean) => React.ReactNode
  renderThumb?: (checked: boolean, disabled?: boolean) => React.ReactNode
  
  // Status colors
  successColor?: string
  warningColor?: string
  errorColor?: string
  
  children?: React.ReactNode
}

interface SwitchContextValue {
  checked: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined' | 'flat' | 'elevated'
  status?: 'default' | 'success' | 'warning' | 'error'
  onChange?: (checked: boolean) => void
}

const SwitchContext = createContext<SwitchContextValue | undefined>(undefined)

export const useSwitch = () => {
  const context = useContext(SwitchContext)
  if (!context) {
    throw new Error('useSwitch must be used within a Switch')
  }
  return context
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    disabled = false,
    required = false,
    name,
    value,
    variant = 'default',
    size = 'md',
    status = 'default',
    label,
    labelPosition = 'end',
    labelSpacing,
    helperText,
    errorMessage,
    transition = 'slide',
    transitionDuration = 200,
    loading = false,
    loadingIcon,
    // Container styles
    containerClassName,
    containerStyle,
    backgroundColor,
    borderWidth,
    borderColor,
    borderStyle,
    borderRadius,
    padding,
    paddingX,
    paddingY,
    boxShadow,
    // Track styles
    trackBackgroundColor,
    trackBackgroundColorChecked,
    trackBorderWidth,
    trackBorderColor,
    trackBorderColorChecked,
    trackBorderStyle,
    trackBorderRadius,
    trackWidth,
    trackHeight,
    trackPadding,
    trackBoxShadow,
    trackBoxShadowChecked,
    // Thumb styles
    thumbBackgroundColor,
    thumbBackgroundColorChecked,
    thumbBorderWidth,
    thumbBorderColor,
    thumbBorderColorChecked,
    thumbBorderStyle,
    thumbBorderRadius,
    thumbSize,
    thumbBoxShadow,
    thumbBoxShadowChecked,
    thumbIcon,
    thumbIconChecked,
    thumbIconColor,
    thumbIconColorChecked,
    // Label styles
    labelColor,
    labelColorChecked,
    labelFontSize,
    labelFontWeight,
    labelFontFamily,
    // Helper text styles
    helperTextColor,
    helperTextFontSize,
    errorMessageColor,
    // Focus styles
    focusRingColor,
    focusRingWidth,
    focusRingOffset,
    focusRingOffsetColor,
    focusBorderColor,
    focusBackgroundColor,
    focusBoxShadow,
    // Hover styles
    hoverTrackBackgroundColor,
    hoverThumbBackgroundColor,
    hoverBorderColor,
    hoverBoxShadow,
    // Active styles
    activeTrackBackgroundColor,
    activeThumbBackgroundColor,
    activeScale,
    // Custom render
    renderLabel,
    renderThumb,
    // Status colors
    successColor,
    warningColor,
    errorColor,
    children,
    style,
    ...props
  }, ref) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : uncontrolledChecked
    
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) return
      
      const newChecked = e.target.checked
      
      if (!isControlled) {
        setUncontrolledChecked(newChecked)
      }
      
      onChange?.(newChecked)
    }, [disabled, loading, isControlled, onChange])
    
    // Get status colors
    const getStatusColors = () => {
      const statusColors = {
        default: { track: '#e5e7eb', trackChecked: '#3b82f6', thumb: '#ffffff' },
        success: { track: '#e5e7eb', trackChecked: successColor || '#10b981', thumb: '#ffffff' },
        warning: { track: '#e5e7eb', trackChecked: warningColor || '#f59e0b', thumb: '#ffffff' },
        error: { track: '#e5e7eb', trackChecked: errorColor || '#ef4444', thumb: '#ffffff' },
      }
      
      return statusColors[status]
    }
    
    const statusColors = getStatusColors()
    
    // Get size dimensions
    const getSizeDimensions = () => {
      const dimensions = {
        sm: { track: { width: '36px', height: '20px' }, thumb: '16px', fontSize: '0.875rem' },
        md: { track: { width: '44px', height: '24px' }, thumb: '20px', fontSize: '1rem' },
        lg: { track: { width: '56px', height: '32px' }, thumb: '28px', fontSize: '1.125rem' },
      }
      
      return dimensions[size]
    }
    
    const dimensions = getSizeDimensions()
    
    // Default styles based on variant
    const getDefaultStyles = () => {
      const variantStyles = {
        default: {
          track: {
            backgroundColor: checked 
              ? (trackBackgroundColorChecked || statusColors.trackChecked)
              : (trackBackgroundColor || statusColors.track),
            borderWidth: trackBorderWidth || '0',
            boxShadow: trackBoxShadow || 'none',
          },
          thumb: {
            backgroundColor: thumbBackgroundColor || statusColors.thumb,
            boxShadow: thumbBoxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
        filled: {
          track: {
            backgroundColor: checked
              ? (trackBackgroundColorChecked || statusColors.trackChecked)
              : (trackBackgroundColor || '#d1d5db'),
            borderWidth: trackBorderWidth || '0',
            boxShadow: checked
              ? (trackBoxShadowChecked || 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)')
              : (trackBoxShadow || 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'),
          },
          thumb: {
            backgroundColor: thumbBackgroundColor || '#ffffff',
            boxShadow: thumbBoxShadow || '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        outlined: {
          track: {
            backgroundColor: checked
              ? (trackBackgroundColorChecked || statusColors.trackChecked)
              : (trackBackgroundColor || 'transparent'),
            borderWidth: trackBorderWidth || '2px',
            borderColor: checked
              ? (trackBorderColorChecked || statusColors.trackChecked)
              : (trackBorderColor || '#d1d5db'),
            boxShadow: trackBoxShadow || 'none',
          },
          thumb: {
            backgroundColor: checked
              ? (thumbBackgroundColorChecked || statusColors.trackChecked)
              : (thumbBackgroundColor || '#6b7280'),
            boxShadow: thumbBoxShadow || 'none',
          },
        },
        flat: {
          track: {
            backgroundColor: checked
              ? (trackBackgroundColorChecked || statusColors.trackChecked)
              : (trackBackgroundColor || '#e5e7eb'),
            borderWidth: trackBorderWidth || '0',
            boxShadow: trackBoxShadow || 'none',
          },
          thumb: {
            backgroundColor: thumbBackgroundColor || '#ffffff',
            boxShadow: thumbBoxShadow || 'none',
          },
        },
        elevated: {
          track: {
            backgroundColor: checked
              ? (trackBackgroundColorChecked || statusColors.trackChecked)
              : (trackBackgroundColor || '#e5e7eb'),
            borderWidth: trackBorderWidth || '0',
            boxShadow: checked
              ? (trackBoxShadowChecked || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)')
              : (trackBoxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'),
          },
          thumb: {
            backgroundColor: thumbBackgroundColor || '#ffffff',
            boxShadow: thumbBoxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      }
      
      return variantStyles[variant]
    }
    
    const defaultStyles = getDefaultStyles()
    
    // Track styles
    const trackStyles: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: trackWidth || dimensions.track.width,
      height: trackHeight || dimensions.track.height,
      backgroundColor: isHovered && hoverTrackBackgroundColor
        ? hoverTrackBackgroundColor
        : isActive && activeTrackBackgroundColor
          ? activeTrackBackgroundColor
          : defaultStyles.track.backgroundColor,
      borderWidth: defaultStyles.track.borderWidth,
      borderColor: isHovered && hoverBorderColor
        ? hoverBorderColor
        : (defaultStyles.track as any).borderColor || 'transparent',
      borderStyle: trackBorderStyle || 'solid',
      borderRadius: trackBorderRadius || '9999px',
      padding: trackPadding || '2px',
      boxShadow: isHovered && hoverBoxShadow
        ? hoverBoxShadow
        : defaultStyles.track.boxShadow,
      transition: `all ${transitionDuration}ms ease-in-out`,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }
    
    // Thumb styles
    const thumbTranslateX = checked 
      ? `calc(${trackWidth || dimensions.track.width} - ${thumbSize || dimensions.thumb} - ${trackPadding || '2px'} * 2)`
      : '0'
    
    const thumbStyles: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: thumbSize || dimensions.thumb,
      height: thumbSize || dimensions.thumb,
      backgroundColor: isHovered && hoverThumbBackgroundColor
        ? hoverThumbBackgroundColor
        : isActive && activeThumbBackgroundColor
          ? activeThumbBackgroundColor
          : checked && thumbBackgroundColorChecked
            ? thumbBackgroundColorChecked
            : defaultStyles.thumb.backgroundColor,
      borderWidth: thumbBorderWidth || '0',
      borderColor: checked && thumbBorderColorChecked
        ? thumbBorderColorChecked
        : thumbBorderColor || 'transparent',
      borderStyle: thumbBorderStyle || 'solid',
      borderRadius: thumbBorderRadius || '50%',
      boxShadow: checked && thumbBoxShadowChecked
        ? thumbBoxShadowChecked
        : defaultStyles.thumb.boxShadow,
      transform: `translateX(${thumbTranslateX}) scale(${isActive && activeScale ? activeScale : '1'})`,
      transition: transition === 'none'
        ? 'none'
        : transition === 'bounce'
          ? `all ${transitionDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
          : transition === 'smooth'
            ? `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : `all ${transitionDuration}ms ease-in-out`,
    }
    
    // Label styles
    const labelStyles: React.CSSProperties = {
      color: checked && labelColorChecked
        ? labelColorChecked
        : labelColor || '#374151',
      fontSize: labelFontSize || dimensions.fontSize,
      fontWeight: labelFontWeight || '500',
      fontFamily: labelFontFamily,
      marginLeft: labelPosition === 'end' ? (labelSpacing || '0.5rem') : undefined,
      marginRight: labelPosition === 'start' ? (labelSpacing || '0.5rem') : undefined,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      userSelect: 'none',
    }
    
    // Container styles
    const containerStyles: React.CSSProperties = {
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      padding: padding || (paddingX || paddingY ? undefined : '0'),
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      boxShadow,
      ...containerStyle,
    }
    
    // Focus styles
    const focusStyles: React.CSSProperties = isFocused ? {
      outline: 'none',
      boxShadow: focusBoxShadow || `0 0 0 ${focusRingWidth || '2px'} ${focusRingColor || statusColors.trackChecked}`,
    } : {}
    
    const renderThumbContent = () => {
      if (loading && loadingIcon) {
        return <span className="animate-spin">{loadingIcon}</span>
      }
      
      if (renderThumb) {
        return renderThumb(checked, disabled)
      }
      
      if (checked && thumbIconChecked) {
        return (
          <span style={{ color: thumbIconColorChecked || 'currentColor' }}>
            {thumbIconChecked}
          </span>
        )
      }
      
      if (!checked && thumbIcon) {
        return (
          <span style={{ color: thumbIconColor || 'currentColor' }}>
            {thumbIcon}
          </span>
        )
      }
      
      return null
    }
    
    const labelContent = renderLabel ? renderLabel(checked, disabled) : label
    
    return (
      <SwitchContext.Provider
        value={{
          checked,
          disabled,
          loading,
          size,
          variant,
          status,
          onChange,
        }}
      >
        <div
          className={cn('inline-flex flex-col', containerClassName)}
          style={containerStyles}
        >
          <label
            className={cn(
              'inline-flex items-center',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            style={style}
          >
            {labelContent && labelPosition === 'start' && (
              <span style={labelStyles}>{labelContent}</span>
            )}
            
            <div className="relative inline-flex">
              <input
                ref={ref}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                disabled={disabled || loading}
                required={required}
                name={name}
                value={value}
                className="sr-only"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label={typeof label === 'string' ? label : undefined}
                aria-invalid={status === 'error' || !!errorMessage}
                aria-describedby={errorMessage ? 'switch-error' : helperText ? 'switch-helper' : undefined}
                {...props}
              />
              
              <div
                style={{ ...trackStyles, ...focusStyles }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
              >
                <div style={thumbStyles}>
                  {renderThumbContent()}
                </div>
              </div>
            </div>
            
            {labelContent && labelPosition === 'end' && (
              <span style={labelStyles}>{labelContent}</span>
            )}
          </label>
          
          {helperText && !errorMessage && (
            <span
              id="switch-helper"
              className="mt-1"
              style={{
                fontSize: helperTextFontSize || '0.875rem',
                color: helperTextColor || '#6b7280',
              }}
            >
              {helperText}
            </span>
          )}
          
          {errorMessage && (
            <span
              id="switch-error"
              className="mt-1"
              style={{
                fontSize: helperTextFontSize || '0.875rem',
                color: errorMessageColor || errorColor || '#ef4444',
              }}
            >
              {errorMessage}
            </span>
          )}
          
          {children}
        </div>
      </SwitchContext.Provider>
    )
  }
)

Switch.displayName = 'Switch'

// Export a simplified SwitchLabel component for custom layouts
export interface SwitchLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const SwitchLabel = forwardRef<HTMLLabelElement, SwitchLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { disabled } = useSwitch()
    
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)

SwitchLabel.displayName = 'SwitchLabel'

export { Switch, SwitchLabel }