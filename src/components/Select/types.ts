export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
  icon?: React.ReactNode
  description?: string
  [key: string]: unknown
}