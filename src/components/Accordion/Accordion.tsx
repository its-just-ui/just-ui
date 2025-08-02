import React, { createContext, useContext, useState, useCallback } from 'react'
import { cn } from '@/utils'

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  collapsible?: boolean
  variant?: 'default' | 'bordered' | 'filled' | 'separated'
  size?: 'sm' | 'md' | 'lg'
  transition?: 'none' | 'fade' | 'slide' | 'collapse' | 'zoom'
  transitionDuration?: number
  expandIcon?: React.ReactNode
  expandIconPosition?: 'start' | 'end'
  children: React.ReactNode
}

interface AccordionContextValue {
  value: string[]
  onItemToggle: (itemValue: string) => void
  disabled?: boolean
  variant?: 'default' | 'bordered' | 'filled' | 'separated'
  size?: 'sm' | 'md' | 'lg'
  transition?: 'none' | 'fade' | 'slide' | 'collapse' | 'zoom'
  transitionDuration?: number
  expandIcon?: React.ReactNode
  expandIconPosition?: 'start' | 'end'
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

export const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion')
  }
  return context
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    className, 
    type = 'single',
    defaultValue,
    value: controlledValue,
    onValueChange,
    disabled = false,
    collapsible = true,
    variant = 'default',
    size = 'md',
    transition = 'collapse',
    transitionDuration = 300,
    expandIcon,
    expandIconPosition = 'end',
    children,
    ...props 
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      }
      return []
    })

    const value = controlledValue !== undefined
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : uncontrolledValue

    const onItemToggle = useCallback((itemValue: string) => {
      let newValue: string[]

      if (type === 'single') {
        if (value.includes(itemValue) && collapsible) {
          newValue = []
        } else {
          newValue = [itemValue]
        }
      } else {
        if (value.includes(itemValue)) {
          newValue = value.filter(v => v !== itemValue)
        } else {
          newValue = [...value, itemValue]
        }
      }

      if (controlledValue === undefined) {
        setUncontrolledValue(newValue)
      }

      if (onValueChange) {
        onValueChange(type === 'single' ? newValue[0] || '' : newValue)
      }
    }, [value, type, collapsible, controlledValue, onValueChange])

    const baseStyles = 'w-full'
    
    const variants = {
      default: '',
      bordered: 'border border-gray-200 rounded-lg overflow-hidden',
      filled: 'bg-gray-50 rounded-lg p-2',
      separated: 'space-y-2',
    }

    return (
      <AccordionContext.Provider
        value={{
          value,
          onItemToggle,
          disabled,
          variant,
          size,
          transition,
          transitionDuration,
          expandIcon,
          expandIconPosition,
        }}
      >
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { variant, size } = useAccordion()
    
    const baseStyles = 'group'
    
    const variants = {
      default: 'border-b border-gray-200 last:border-b-0',
      bordered: 'border-b border-gray-200 last:border-b-0',
      filled: 'bg-white rounded-md mb-2 last:mb-0 shadow-sm',
      separated: 'bg-white border border-gray-200 rounded-lg shadow-sm',
    }

    const sizes = {
      sm: '',
      md: '',
      lg: '',
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant || 'default'],
          sizes[size || 'md'],
          disabled && 'opacity-50',
          className
        )}
        data-state={value}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, disabled, ...props }, ref) => {
    const { value, onItemToggle, disabled: accordionDisabled, size, expandIcon, expandIconPosition } = useAccordion()
    const item = useContext(AccordionItemContext)
    
    if (!item) {
      throw new Error('AccordionTrigger must be used within an AccordionItem')
    }

    const isOpen = value.includes(item.value)
    const isDisabled = disabled || accordionDisabled || item.disabled

    const baseStyles = 'flex w-full items-center justify-between text-left transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    const defaultIcon = (
      <svg
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )

    const icon = expandIcon || defaultIcon

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          baseStyles,
          sizes[size || 'md'],
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={isDisabled}
        onClick={() => onItemToggle(item.value)}
        aria-expanded={isOpen}
        {...props}
      >
        {expandIconPosition === 'start' && <span className="mr-2">{icon}</span>}
        <span className="flex-1">{children}</span>
        {expandIconPosition === 'end' && <span className="ml-2">{icon}</span>}
      </button>
    )
  }
)

AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  forceMount?: boolean
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, forceMount = false, ...props }, ref) => {
    const { value, size, transition, transitionDuration } = useAccordion()
    const item = useContext(AccordionItemContext)
    
    if (!item) {
      throw new Error('AccordionContent must be used within an AccordionItem')
    }

    const isOpen = value.includes(item.value)

    if (!forceMount && !isOpen) {
      return null
    }

    const baseStyles = 'overflow-hidden'
    
    const sizes = {
      sm: 'px-3 pb-2 pt-0 text-sm',
      md: 'px-4 pb-3 pt-0 text-base',
      lg: 'px-5 pb-4 pt-0 text-lg',
    }

    const transitions = {
      none: '',
      fade: cn(
        'transition-opacity',
        `duration-${transitionDuration}`,
        isOpen ? 'opacity-100' : 'opacity-0'
      ),
      slide: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'translate-y-0' : '-translate-y-2'
      ),
      collapse: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'max-h-96' : 'max-h-0'
      ),
      zoom: cn(
        'transition-all',
        `duration-${transitionDuration}`,
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ),
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          transitions[transition || 'collapse'],
          className
        )}
        hidden={!forceMount && !isOpen}
        {...props}
      >
        <div className={cn(sizes[size || 'md'])}>
          {children}
        </div>
      </div>
    )
  }
)

AccordionContent.displayName = 'AccordionContent'

interface AccordionItemContextValue {
  value: string
  disabled?: boolean
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined)

const AccordionItemWrapper = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value, disabled }}>
        <AccordionItem ref={ref} value={value} disabled={disabled} {...props} />
      </AccordionItemContext.Provider>
    )
  }
)

AccordionItemWrapper.displayName = 'AccordionItem'

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }