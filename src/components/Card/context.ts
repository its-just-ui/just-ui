import { createContext, useContext } from 'react'
import type { CardContextValue } from './types'

export const CardContext = createContext<CardContextValue | null>(null)

export const useCard = (): CardContextValue => {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCard must be used within a Card component')
  }
  return context
}
