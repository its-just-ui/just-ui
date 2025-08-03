import React, { forwardRef } from 'react'
import { cn } from '@/utils'

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'h-4 w-4 rounded border-gray-300',
        'text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
