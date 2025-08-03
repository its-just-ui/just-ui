import { useContext } from 'react'
import { TooltipContext } from './context'

export const useTooltipContext = () => {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('Tooltip sub-components must be used within a Tooltip')
  }
  return context
}
