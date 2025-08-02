import React from 'react'
import { cn } from '@/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-600',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400',
      ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
      error: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    }
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }