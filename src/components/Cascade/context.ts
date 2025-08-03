import { createContext } from 'react'
import type { CascadeContextValue } from './types'

export const CascadeContext = createContext<CascadeContextValue | undefined>(undefined)
