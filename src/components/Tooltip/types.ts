export type TooltipVariant = 'default' | 'filled' | 'outlined' | 'flat' | 'elevated'
export type TooltipSize = 'sm' | 'md' | 'lg'
export type TooltipStatus = 'default' | 'success' | 'warning' | 'error'
export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

export type TooltipTransition = 'none' | 'fade' | 'slide' | 'scale' | 'bounce'

export interface TooltipCustomStyles {
  // Border styles
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string

  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  placeholderColor?: string

  // Colors
  backgroundColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string

  // Spacing
  padding?: string
  paddingX?: string
  paddingY?: string

  // Sub-component styles
  arrowStyles?: React.CSSProperties
  contentStyles?: React.CSSProperties
  triggerStyles?: React.CSSProperties
}

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  // Core props
  isOpen?: boolean
  defaultIsOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  disabled?: boolean

  // Content props
  content?: React.ReactNode
  title?: string
  description?: string

  // Visual props
  variant?: TooltipVariant
  size?: TooltipSize
  status?: TooltipStatus

  // Positioning props
  placement?: TooltipPlacement
  offset?: number
  delayOpen?: number
  delayClose?: number
  autoPlacement?: boolean

  // Fine-tuning position props
  offsetX?: number
  offsetY?: number
  nudgeLeft?: number
  nudgeRight?: number
  nudgeTop?: number
  nudgeBottom?: number

  // Trigger props
  trigger?: 'hover' | 'click' | 'focus' | 'manual'
  showArrow?: boolean
  arrowSize?: number
  arrowColor?: string

  // Animation props
  transition?: TooltipTransition
  transitionDuration?: number

  // Container styles
  containerClassName?: string
  containerStyle?: React.CSSProperties
  maxWidth?: string
  minWidth?: string
  width?: string

  // Custom styles
  customStyles?: TooltipCustomStyles

  // Content styles
  contentBackgroundColor?: string
  contentBorderWidth?: string
  contentBorderColor?: string
  contentBorderRadius?: string
  contentPadding?: string
  contentBoxShadow?: string

  // Typography styles
  titleColor?: string
  titleFontSize?: string
  titleFontWeight?: string
  titleFontFamily?: string
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: string
  descriptionFontFamily?: string

  // Loading state
  loading?: boolean
  loadingMessage?: string

  // Empty state
  emptyMessage?: string

  // Required field support
  required?: boolean

  // Labels and helper text
  label?: React.ReactNode
  helperText?: React.ReactNode

  // Custom render functions
  renderContent?: (isOpen: boolean) => React.ReactNode
  renderTrigger?: (
    isOpen: boolean,
    triggerProps: React.HTMLAttributes<HTMLElement>
  ) => React.ReactNode

  children?: React.ReactNode
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
