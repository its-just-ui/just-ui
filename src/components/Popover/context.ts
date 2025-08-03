import { createContext, useContext } from 'react'
import type { PopoverContextValue } from './types'

export const PopoverContext = createContext<PopoverContextValue | null>(null)

export const usePopover = (): PopoverContextValue => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a Popover component')
  }
  return context
}

PopoverContext.displayName = 'PopoverContext'
