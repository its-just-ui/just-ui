import React, { forwardRef } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import './OccasionCard.css'

export type OccasionCardVariant = 'elevated' | 'outlined' | 'filled' | 'gradient'
export type OccasionCardSize = 'small' | 'medium' | 'large' | 'fullwidth'

export interface OccasionCardProps {
  children: React.ReactNode
  variant?: OccasionCardVariant
  size?: OccasionCardSize
  header?: React.ReactNode
  footer?: React.ReactNode
  image?: string
  imageAlt?: string
  imagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'background'
  imageHeight?: string | number
  title?: string
  subtitle?: string
  description?: string
  actions?: React.ReactNode
  hoverable?: boolean
  clickable?: boolean
  selected?: boolean
  disabled?: boolean
  loading?: boolean
  badge?: React.ReactNode
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  occasionTheme?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | 'auto'
  layout?: 'vertical' | 'horizontal' | 'compact'
}

export const OccasionCard = forwardRef<HTMLDivElement, OccasionCardProps>(
  (
    {
      children,
      variant = 'elevated',
      size = 'medium',
      header,
      footer,
      image,
      imageAlt = '',
      imagePosition = 'top',
      imageHeight = 200,
      title,
      subtitle,
      description,
      actions,
      hoverable = false,
      clickable = false,
      selected = false,
      disabled = false,
      loading = false,
      badge,
      badgePosition = 'top-right',
      occasionTheme = true,
      className = '',
      onClick,
      aspectRatio = 'auto',
      layout = 'vertical',
    },
    ref
  ) => {
    const { activeOccasion, shouldAttachClickBurst, consumeClickBurstToken } = useOccasion() as {
      activeOccasion: string | null
      shouldAttachClickBurst: () => boolean
      consumeClickBurstToken: () => boolean
    }

    const clickBurstEnabled = shouldAttachClickBurst()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || loading) return

      if (clickable && clickBurstEnabled && occasionTheme) {
        if (consumeClickBurstToken && consumeClickBurstToken()) {
          const burst = document.createElement('div')
          burst.setAttribute('aria-hidden', 'true')
          burst.className = 'occasion-card-burst'
          burst.style.left = `${e.clientX}px`
          burst.style.top = `${e.clientY}px`
          // Sophisticated pulse effect
          burst.style.width = '40px'
          burst.style.height = '40px'
          burst.style.borderRadius = '50%'
          burst.style.background = `radial-gradient(circle, 
          rgba(${variant === 'gradient' ? '139, 92, 246' : '59, 130, 246'}, 0.5) 0%, 
          transparent 70%)`
          burst.style.animation = 'cardBurstPulse 800ms cubic-bezier(0.4, 0, 0.6, 1)'
          document.body.appendChild(burst)
          requestAnimationFrame(() => {
            burst.classList.add('occasion-card-burst-active')
          })
          setTimeout(() => burst.remove(), 650)
        }
      }

      onClick?.(e)
    }

    const occasionClass = occasionTheme && activeOccasion ? `occasion-${activeOccasion}` : ''

    const classes = [
      'occasion-card',
      `occasion-card--${variant}`,
      `occasion-card--${size}`,
      `occasion-card--${layout}`,
      `occasion-card--aspect-${aspectRatio.replace(':', '-')}`,
      hoverable && 'occasion-card--hoverable',
      clickable && 'occasion-card--clickable',
      selected && 'occasion-card--selected',
      disabled && 'occasion-card--disabled',
      loading && 'occasion-card--loading',
      image && `occasion-card--image-${imagePosition}`,
      occasionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const renderImage = () => {
      if (!image) return null

      if (imagePosition === 'background') {
        return (
          <div
            className="occasion-card__background-image"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={imageAlt}
          />
        )
      }

      return (
        <div className="occasion-card__image" style={{ height: imageHeight }}>
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
      )
    }

    const renderContent = () => (
      <>
        {header && <div className="occasion-card__header">{header}</div>}

        {(title || subtitle || description) && (
          <div className="occasion-card__meta">
            {title && <h3 className="occasion-card__title">{title}</h3>}
            {subtitle && <p className="occasion-card__subtitle">{subtitle}</p>}
            {description && <p className="occasion-card__description">{description}</p>}
          </div>
        )}

        <div className="occasion-card__body">{children}</div>

        {actions && <div className="occasion-card__actions">{actions}</div>}

        {footer && <div className="occasion-card__footer">{footer}</div>}
      </>
    )

    return (
      <div
        ref={ref}
        className={classes}
        onClick={handleClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        aria-selected={selected}
      >
        {loading && (
          <div className="occasion-card__loader">
            <div className="occasion-card__spinner" />
          </div>
        )}

        {badge && (
          <div className={`occasion-card__badge occasion-card__badge--${badgePosition}`}>
            {badge}
          </div>
        )}

        {imagePosition === 'background' && renderImage()}

        <div className="occasion-card__wrapper">
          {imagePosition === 'left' && renderImage()}

          <div className="occasion-card__content">
            {imagePosition === 'top' && renderImage()}
            {renderContent()}
            {imagePosition === 'bottom' && renderImage()}
          </div>

          {imagePosition === 'right' && renderImage()}
        </div>
      </div>
    )
  }
)

OccasionCard.displayName = 'OccasionCard'
