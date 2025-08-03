import { createContext } from 'react'
import type { TooltipSize, TooltipVariant, TooltipStatus, TooltipPlacement } from './types'

export interface TooltipContextValue {
  isOpen: boolean
  disabled: boolean
  size: TooltipSize
  variant: TooltipVariant
  status: TooltipStatus
  placement: TooltipPlacement
  onOpenChange?: (isOpen: boolean) => void
  triggerProps: React.HTMLAttributes<HTMLElement>
  contentId: string
}

export const TooltipContext = createContext<TooltipContextValue | null>(null)
