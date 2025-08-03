import { createContext } from 'react'
import { TableContextValue } from './types'

export const TableContext = createContext<TableContextValue<any> | undefined>(undefined)
