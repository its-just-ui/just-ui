import { createContext } from 'react'
import { TableContextValue, RowData } from './types'

export const TableContext = createContext<TableContextValue<RowData> | undefined>(undefined)
