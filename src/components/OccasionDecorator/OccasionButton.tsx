import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import './OccasionButton.css'

export type OccasionButtonSize = 'small' | 'medium' | 'large' | 'xlarge'
export type OccasionButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'

export interface OccasionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: OccasionButtonSize
  variant?: OccasionButtonVariant
  fullWidth?: boolean
  loading?: boolean
  ripple?: boolean
  rounded?: boolean
  elevated?: boolean
  occasionTheme?: boolean
}

export const OccasionButton = forwardRef<HTMLButtonElement, OccasionButtonProps>(
  (
    {
      children,
      size = 'medium',
      variant = 'primary',
      fullWidth = false,
      loading = false,
      ripple = true,
      rounded = false,
      elevated = false,
      occasionTheme = true,
      className = '',
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const { shouldAttachClickBurst, consumeClickBurstToken, activeOccasion } = useOccasion()

    const clickBurstEnabled = shouldAttachClickBurst()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled) {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const rippleEl = document.createElement('span')
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        rippleEl.className = 'occasion-button-ripple'
        rippleEl.style.width = rippleEl.style.height = `${size}px`
        rippleEl.style.left = `${x}px`
        rippleEl.style.top = `${y}px`

        button.appendChild(rippleEl)
        setTimeout(() => rippleEl.remove(), 600)
      }

      if (clickBurstEnabled && occasionTheme && !disabled) {
        if (consumeClickBurstToken && consumeClickBurstToken()) {
          const burst = document.createElement('div')
          burst.setAttribute('aria-hidden', 'true')
          burst.className = 'occasion-click-burst'
          burst.style.left = `${e.clientX}px`
          burst.style.top = `${e.clientY}px`

          // Enhanced burst animation with gradient effect
          burst.style.width = '30px'
          burst.style.height = '30px'
          burst.style.borderRadius = '50%'
          burst.style.background = `radial-gradient(circle, 
          rgba(${
            variant === 'primary'
              ? '99, 102, 241'
              : variant === 'success'
                ? '34, 197, 94'
                : variant === 'danger'
                  ? '239, 68, 68'
                  : variant === 'warning'
                    ? '251, 146, 60'
                    : '156, 163, 175'
          }, 0.6) 0%, 
          transparent 70%)`
          burst.style.animation = 'occasionBurstExpand 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'

          document.body.appendChild(burst)
          requestAnimationFrame(() => {
            burst.classList.add('occasion-click-burst-active')
          })
          setTimeout(() => burst.remove(), 650)
        }
      }

      onClick?.(e)
    }

    const occasionClass = occasionTheme && activeOccasion ? `occasion-${activeOccasion}` : ''

    const classes = [
      'occasion-button',
      `occasion-button--${size}`,
      `occasion-button--${variant}`,
      fullWidth && 'occasion-button--full-width',
      loading && 'occasion-button--loading',
      rounded && 'occasion-button--rounded',
      elevated && 'occasion-button--elevated',
      disabled && 'occasion-button--disabled',
      occasionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <span className="occasion-button__loader" aria-label="Loading">
            <svg className="occasion-button__spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" />
            </svg>
          </span>
        )}

        <span className="occasion-button__content">{children}</span>
      </button>
    )
  }
)

OccasionButton.displayName = 'OccasionButton'
