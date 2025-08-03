import { createContext, useContext } from 'react'
import type { AnchorContextValue } from './types'

export const AnchorContext = createContext<AnchorContextValue | null>(null)

export const useAnchor = (): AnchorContextValue => {
  const context = useContext(AnchorContext)
  if (!context) {
    throw new Error('useAnchor must be used within an Anchor component')
  }
  return context
}
