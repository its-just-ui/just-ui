import React from 'react'
import { cn } from '@/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  children: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'relative w-full rounded-lg border p-4'
    
    const variants = {
      default: 'bg-white border-gray-200 text-gray-900',
      success: 'bg-green-50 border-green-200 text-green-900',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      destructive: 'bg-red-50 border-red-200 text-red-900',
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          className
        )}
        role="alert"
        {...props}
      >
        {children}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn('mb-1 font-medium leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h5>
    )
  }
)

AlertTitle.displayName = 'AlertTitle'

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm leading-relaxed', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }