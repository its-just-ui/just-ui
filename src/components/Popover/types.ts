import React from 'react'
import type { PopoverPositionResult } from './positioning'

export type PopoverVariant =
  | 'default'
  | 'bordered'
  | 'shadowed'
  | 'filled'
  | 'translucent'
  | 'minimal'

export type PopoverSize = 'sm' | 'md' | 'lg'

export type PopoverPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'auto'

export type PopoverTransition = 'fade' | 'scale' | 'slide' | 'pop' | 'none'

export type PopoverTrigger = 'click' | 'hover' | 'manual'

export type PopoverTone = 'light' | 'dark' | 'info' | 'danger' | 'success' | 'warning'

export interface PopoverAnimationConfig {
  enterDuration?: number
  exitDuration?: number
  easing?: string
  animationType?: PopoverTransition
}

export interface PopoverEventHandlers {
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  onOpen?: () => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onOutsideClick?: (event: MouseEvent) => void
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
  onEnter?: () => void
  onExit?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  position: PopoverPosition
  trigger: PopoverTrigger
  variant: PopoverVariant
  size: PopoverSize
  tone: PopoverTone
  closeOnBlur: boolean
  closeOnEscape: boolean
  closeOnOutsideClick: boolean
  hasArrow: boolean
  triggerId: string
  contentId: string
  titleId: string
  descriptionId: string
  arrowRef: React.RefObject<HTMLDivElement>
  triggerRef: React.RefObject<HTMLElement>
  contentRef: React.RefObject<HTMLDivElement>

  // Animation config
  animation: PopoverAnimationConfig

  // Positioning result
  positioningResult?: PopoverPositionResult | null

  // Event handlers
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  onOpen?: () => void

  // Styling props
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  borderStyle?: string
  backgroundColor?: string
  textColor?: string
  shadowColor?: string
  arrowColor?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  headingColor?: string
  descriptionColor?: string
  padding?: string
  margin?: string
  gap?: string
  offset?: string
  arrowSize?: string

  // Fine-tuned positioning offsets
  offsetTop?: number
  offsetBottom?: number
  offsetLeft?: number
  offsetRight?: number

  focusBorderColor?: string
  focusRingColor?: string
  focusRingOffset?: string
  boxShadow?: string
  hoverShadow?: string
  focusBoxShadow?: string
}

export interface PopoverRenderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: PopoverPosition
  variant: PopoverVariant
  size: PopoverSize
}

export type RenderContentFunction = (props: PopoverRenderProps) => React.ReactNode
export type RenderTriggerFunction = (props: PopoverRenderProps) => React.ReactNode
