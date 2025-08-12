import React, { forwardRef, useState, useEffect } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import './OccasionSwitch.css'

export interface OccasionSwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'ios' | 'material' | 'rounded'
  color?: 'primary' | 'success' | 'danger' | 'warning'
  label?: React.ReactNode
  labelPosition?: 'left' | 'right'
  description?: React.ReactNode
  required?: boolean
  name?: string
  value?: string
  occasionTheme?: boolean
  showDecoration?: boolean
  className?: string
}

export const OccasionSwitch = forwardRef<HTMLInputElement, OccasionSwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      loading = false,
      size = 'medium',
      variant = 'default',
      color = 'primary',
      label,
      labelPosition = 'right',
      description,
      required = false,
      name,
      value,
      occasionTheme = true,
      showDecoration = false,
      className = '',
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(controlledChecked ?? defaultChecked)

    const { getAssets, activeOccasion, shouldAttachClickBurst, consumeClickBurstToken } =
      useOccasion() as {
        getAssets: (scope: string) => React.ReactNode
        activeOccasion: string | null
        shouldAttachClickBurst: () => boolean
        consumeClickBurstToken: () => boolean
      }

    const decoration = occasionTheme ? getAssets('adjacent') : null
    const clickBurstEnabled = shouldAttachClickBurst()

    useEffect(() => {
      if (controlledChecked !== undefined) {
        setIsChecked(controlledChecked)
      }
    }, [controlledChecked])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || loading) return

      const newChecked = e.target.checked

      if (controlledChecked === undefined) {
        setIsChecked(newChecked)
      }

      onChange?.(newChecked)

      if (clickBurstEnabled && occasionTheme) {
        if (consumeClickBurstToken && consumeClickBurstToken()) {
          const rect = e.currentTarget.getBoundingClientRect()
          const burst = document.createElement('div')
          burst.setAttribute('aria-hidden', 'true')
          burst.className = 'occasion-switch-burst'
          burst.style.left = `${rect.left + rect.width / 2}px`
          burst.style.top = `${rect.top + rect.height / 2}px`
          // Enhanced switch animation with glow effect
          burst.style.width = '30px'
          burst.style.height = '30px'
          burst.style.borderRadius = '50%'
          burst.style.background = newChecked
            ? 'radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(156, 163, 175, 0.4) 0%, transparent 70%)'
          burst.style.animation = 'switchBurstGlow 600ms ease-out'
          document.body.appendChild(burst)
          requestAnimationFrame(() => {
            burst.classList.add('occasion-switch-burst-active')
          })
          setTimeout(() => burst.remove(), 650)
        }
      }
    }

    const occasionClass = occasionTheme && activeOccasion ? `occasion-${activeOccasion}` : ''

    const classes = [
      'occasion-switch',
      `occasion-switch--${size}`,
      `occasion-switch--${variant}`,
      `occasion-switch--${color}`,
      isChecked && 'occasion-switch--checked',
      disabled && 'occasion-switch--disabled',
      loading && 'occasion-switch--loading',
      occasionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const switchElement = (
      <label className={classes}>
        <input
          ref={ref}
          type="checkbox"
          className="occasion-switch__input"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled || loading}
          required={required}
          name={name}
          value={value}
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-required={required}
        />

        <span className="occasion-switch__track">
          <span className="occasion-switch__thumb">
            {loading && <span className="occasion-switch__spinner" />}
          </span>

          {showDecoration && decoration && (
            <span className="occasion-switch__decoration" aria-hidden="true">
              {decoration}
            </span>
          )}
        </span>
      </label>
    )

    if (!label && !description) {
      return switchElement
    }

    return (
      <div className={`occasion-switch-wrapper occasion-switch-wrapper--${labelPosition}`}>
        {labelPosition === 'left' && (
          <div className="occasion-switch__label-container">
            {label && (
              <span className="occasion-switch__label">
                {label}
                {required && <span className="occasion-switch__required">*</span>}
              </span>
            )}
            {description && <span className="occasion-switch__description">{description}</span>}
          </div>
        )}

        {switchElement}

        {labelPosition === 'right' && (
          <div className="occasion-switch__label-container">
            {label && (
              <span className="occasion-switch__label">
                {label}
                {required && <span className="occasion-switch__required">*</span>}
              </span>
            )}
            {description && <span className="occasion-switch__description">{description}</span>}
          </div>
        )}
      </div>
    )
  }
)

OccasionSwitch.displayName = 'OccasionSwitch'
