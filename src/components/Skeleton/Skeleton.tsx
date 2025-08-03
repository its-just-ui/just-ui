import React, { forwardRef, memo } from 'react'
import { cn } from '@/utils'

export type SkeletonVariant =
  | 'default'
  | 'rounded'
  | 'circular'
  | 'text'
  | 'avatar'
  | 'button'
  | 'card'
export type SkeletonSize = 'sm' | 'md' | 'lg' | 'xl'
export type SkeletonAnimation = 'pulse' | 'wave' | 'shimmer' | 'none'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  size?: SkeletonSize
  animation?: SkeletonAnimation
  lines?: number
  width?: string | number
  height?: string | number
  radius?: string | number
  animationDuration?: number
  animationDelay?: number
  showContent?: boolean
  contentOpacity?: number
  backgroundColor?: string
  foregroundColor?: string
  borderColor?: string
  borderWidth?: string
  borderStyle?: string
  gap?: string | number
  padding?: string | number
  margin?: string | number
  children?: React.ReactNode
}

export const Skeleton = memo(
  forwardRef<HTMLDivElement, SkeletonProps>(
    (
      {
        variant = 'default',
        size = 'md',
        animation = 'pulse',
        lines = 1,
        width,
        height,
        radius,
        animationDuration = 1000,
        animationDelay = 0,
        showContent = false,
        contentOpacity = 0.3,
        backgroundColor,
        foregroundColor,
        borderColor,
        borderWidth,
        borderStyle,
        gap,
        padding,
        margin,
        className,
        style,
        children,
        ...props
      },
      ref
    ) => {
      const baseStyles = cn(
        'relative overflow-hidden',
        'bg-gray-50 dark:bg-gray-500',
        'animate-pulse'
      )

      const variantStyles = {
        default: 'rounded',
        rounded: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4',
        avatar: 'rounded-full',
        button: 'rounded-md',
        card: 'rounded-lg border border-gray-50 dark:border-gray-400',
      }

      const sizeStyles = {
        sm: {
          default: 'h-3 w-16',
          rounded: 'h-3 w-16',
          circular: 'h-3 w-16',
          text: 'h-3',
          avatar: 'h-8 w-8',
          button: 'h-8 w-20',
          card: 'h-20 w-32',
        },
        md: {
          default: 'h-4 w-24',
          rounded: 'h-4 w-24',
          circular: 'h-4 w-24',
          text: 'h-4',
          avatar: 'h-10 w-10',
          button: 'h-10 w-24',
          card: 'h-32 w-48',
        },
        lg: {
          default: 'h-6 w-32',
          rounded: 'h-6 w-32',
          circular: 'h-6 w-32',
          text: 'h-6',
          avatar: 'h-12 w-12',
          button: 'h-12 w-32',
          card: 'h-40 w-64',
        },
        xl: {
          default: 'h-8 w-40',
          rounded: 'h-8 w-40',
          circular: 'h-8 w-40',
          text: 'h-8',
          avatar: 'h-16 w-16',
          button: 'h-16 w-40',
          card: 'h-48 w-80',
        },
      }

      const animationStyles = {
        pulse: 'animate-pulse',
        wave: 'animate-pulse',
        shimmer: 'animate-pulse',
        none: '',
      }

      const customStyles: React.CSSProperties = {
        ...style,
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
        ...(radius && { borderRadius: typeof radius === 'number' ? `${radius}px` : radius }),
        ...(backgroundColor && { backgroundColor }),
        ...(foregroundColor && { color: foregroundColor }),
        ...(borderColor && { borderColor }),
        ...(borderWidth && { borderWidth }),
        ...(borderStyle && { borderStyle }),
        ...(gap && { gap: typeof gap === 'number' ? `${gap}px` : gap }),
        ...(padding && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
        ...(margin && { margin: typeof margin === 'number' ? `${margin}px` : margin }),
        ...(animationDuration && { animationDuration: `${animationDuration}ms` }),
        ...(animationDelay && { animationDelay: `${animationDelay}ms` }),
      }

      const contentStyles: React.CSSProperties = {
        opacity: showContent ? contentOpacity : 0,
        pointerEvents: showContent ? 'auto' : ('none' as const),
      }

      if (variant === 'text' && lines > 1) {
        return (
          <div ref={ref} className={cn('space-y-2', className)} style={customStyles} {...props}>
            {Array.from({ length: lines }, (_, index) => (
              <div
                key={index}
                className={cn(
                  baseStyles,
                  variantStyles[variant],
                  sizeStyles[size][variant],
                  animationStyles[animation]
                )}
                style={{
                  ...customStyles,
                  width: index === lines - 1 ? '60%' : '100%',
                }}
              />
            ))}
          </div>
        )
      }

      return (
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size][variant],
            animationStyles[animation],
            className
          )}
          style={customStyles}
          {...props}
        >
          {children && (
            <div style={contentStyles} className="relative z-10">
              {children}
            </div>
          )}

          {animation === 'shimmer' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          )}
        </div>
      )
    }
  )
)

Skeleton.displayName = 'Skeleton'

export default Skeleton
