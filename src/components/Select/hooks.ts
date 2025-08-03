import { useContext } from 'react'
import { SelectContext } from './context'

export const useSelect = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('useSelect must be used within a Select component')
  }
  return context
}
