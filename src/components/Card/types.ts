import React from 'react'

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'flat'
  | 'glass'
  | 'card-with-shadow'
  | 'interactive'
  | 'bordered'
  | 'ghost'

export type CardSize = 'sm' | 'md' | 'lg'

export type CardStatus = 'default' | 'success' | 'warning' | 'error' | 'info' | 'featured'

export type CardTransition = 'none' | 'slide' | 'scale' | 'fade' | 'bounce' | 'smooth'

export type CardMediaType = 'image' | 'video' | 'audio' | 'iframe'

export interface CardMediaConfig {
  type: CardMediaType
  src: string
  alt?: string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'eager' | 'lazy'
  poster?: string // for video
  controls?: boolean // for video/audio
  autoplay?: boolean // for video/audio
  muted?: boolean // for video/audio
  loop?: boolean // for video/audio
}

export interface CardBadgeConfig {
  id: string
  label: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  icon?: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  color?: string
  backgroundColor?: string
}

export interface CardAction {
  id: string
  label: string
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// Context types
export interface CardContextValue {
  isSelected: boolean
  setIsSelected: (selected: boolean) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isDisabled: boolean
  setIsDisabled: (disabled: boolean) => void
  isFeatured: boolean
  setIsFeatured: (featured: boolean) => void
  variant: CardVariant
  size: CardSize
  status: CardStatus
  transition: CardTransition
  transitionDuration: number
  // Event handlers
  onSelectChange?: (selected: boolean) => void
  onExpandChange?: (expanded: boolean) => void
  onFeaturedChange?: (featured: boolean) => void
  onClick?: () => void
  onDoubleClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onBlur?: () => void
  // Style props
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  titleTextColor?: string
  bodyTextColor?: string
  metaTextColor?: string
  placeholderColor?: string
  backgroundColor?: string
  hoverBackgroundColor?: string
  selectedBackgroundColor?: string
  disabledBackgroundColor?: string
  featuredBackgroundColor?: string
  overlayColor?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusBorderColor?: string
  focusBackgroundColor?: string
  boxShadow?: string
  hoverBoxShadow?: string
  focusBoxShadow?: string
  featuredBoxShadow?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  headerPadding?: string
  bodyPadding?: string
  footerPadding?: string
  actionGap?: string
  mediaGap?: string
}

// Render function types
export type RenderHeaderFunction = (
  isSelected: boolean,
  isExpanded: boolean,
  isDisabled: boolean,
  isFeatured: boolean
) => React.ReactNode

export type RenderMediaFunction = (
  isSelected: boolean,
  isExpanded: boolean,
  isDisabled: boolean,
  isFeatured: boolean
) => React.ReactNode

export type RenderBodyFunction = (
  isSelected: boolean,
  isExpanded: boolean,
  isDisabled: boolean,
  isFeatured: boolean
) => React.ReactNode

export type RenderFooterFunction = (
  isSelected: boolean,
  isExpanded: boolean,
  isDisabled: boolean,
  isFeatured: boolean
) => React.ReactNode

export type RenderOverlayFunction = (
  isSelected: boolean,
  isExpanded: boolean,
  isDisabled: boolean,
  isFeatured: boolean
) => React.ReactNode

export type RenderActionsFunction = (
  isSelected: boolean,
  isExpanded: boolean,
  isDisabled: boolean,
  isFeatured: boolean
) => React.ReactNode

export type RenderEmptyFunction = () => React.ReactNode

export type RenderLoadingFunction = () => React.ReactNode

export type ActionClickHandler = (actionId: string, action: CardAction) => void
