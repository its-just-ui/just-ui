import React from 'react'

export type AnchorVariant =
  | 'underline'
  | 'side-border'
  | 'filled'
  | 'minimal'
  | 'dot'
  | 'icon-based'
  | 'nested'

export type AnchorSize = 'sm' | 'md' | 'lg'

export type AnchorDirection = 'vertical' | 'horizontal'

export type AnchorPosition = 'fixed' | 'sticky' | 'static'

export type AnchorStatus = 'default' | 'active' | 'visited' | 'hovered' | 'disabled'

export type ScrollBehavior = 'smooth' | 'instant'

export type EasingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

export interface AnchorLinkItem {
  id: string
  href: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  level?: number
  children?: AnchorLinkItem[]
}

export interface UnderlineOptions {
  width?: string
  height?: string
  offset?: string
}

export interface AnchorContextValue {
  // State
  activeId: string | null
  setActiveId: (id: string | null) => void
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  visitedIds: Set<string>
  addVisitedId: (id: string) => void

  // Configuration
  variant: AnchorVariant
  size: AnchorSize
  direction: AnchorDirection
  position: AnchorPosition
  offset: number
  scrollBehavior: ScrollBehavior
  easing: EasingFunction
  duration: number

  // Event handlers
  onChange?: (activeId: string | null) => void
  onClick?: (id: string, href: string) => void
  onScrollStart?: (targetId: string) => void
  onScrollEnd?: (targetId: string) => void
  onActiveChange?: (activeId: string | null, previousId: string | null) => void

  // Methods
  scrollToAnchor: (id: string, behavior?: ScrollBehavior) => void

  // Style props
  fontSize?: string
  fontWeight?: string
  textColor?: string
  hoverColor?: string
  activeColor?: string
  visitedColor?: string
  borderStyle?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  backgroundColor?: string
  hoverBackgroundColor?: string
  indicatorColor?: string
  lineColor?: string
  dotColor?: string
  focusRingColor?: string
  _focusRingWidth?: string
  _focusOutline?: string
  boxShadow?: string
  gap?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  margin?: string

  // Underline customization
  underlineWidth?: string
  underlineHeight?: string
  _underlineOffset?: string
}

export interface RenderLinkFunction {
  (props: {
    id: string
    href: string
    label: string
    isActive: boolean
    isVisited: boolean
    isHovered: boolean
    disabled?: boolean
    level?: number
    icon?: React.ReactNode
    onClick: (e: React.MouseEvent) => void
    onMouseEnter: () => void
    onMouseLeave: () => void
  }): React.ReactNode
}

export interface RenderGroupFunction {
  (props: { title?: string; level: number; children: React.ReactNode }): React.ReactNode
}

export interface RenderIndicatorFunction {
  (props: {
    activeId: string | null
    position: { top: number; height: number } | null
  }): React.ReactNode
}
