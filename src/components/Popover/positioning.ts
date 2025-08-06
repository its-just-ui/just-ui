import type { PopoverPosition } from './types'

export interface PopoverRect {
  width: number
  height: number
  top: number
  left: number
}

export interface PopoverPositionResult {
  top: number
  left: number
  actualPosition: PopoverPosition
  arrowPosition?: {
    top?: number
    left?: number
    transform?: string
  }
}

const OFFSET = 8
const ARROW_SIZE = 8

export function calculatePopoverPosition(
  triggerElement: HTMLElement,
  contentElement: HTMLDivElement,
  preferredPosition: PopoverPosition,
  hasArrow: boolean = true,
  offset: number = OFFSET,
  offsetTop: number = 0,
  offsetBottom: number = 0,
  offsetLeft: number = 0,
  offsetRight: number = 0
): PopoverPositionResult {
  const triggerRect = triggerElement.getBoundingClientRect()
  const contentRect = contentElement.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  const arrowOffset = hasArrow ? ARROW_SIZE : 0
  const totalOffset = offset + arrowOffset

  // Calculate all possible positions with applied offsets
  const positions = {
    top: {
      top: triggerRect.top - contentRect.height - totalOffset - offsetTop,
      left:
        triggerRect.left + (triggerRect.width - contentRect.width) / 2 + offsetLeft - offsetRight,
    },
    'top-start': {
      top: triggerRect.top - contentRect.height - totalOffset - offsetTop,
      left: triggerRect.left + offsetLeft,
    },
    'top-end': {
      top: triggerRect.top - contentRect.height - totalOffset - offsetTop,
      left: triggerRect.right - contentRect.width - offsetRight,
    },
    bottom: {
      top: triggerRect.bottom + totalOffset + offsetBottom,
      left:
        triggerRect.left + (triggerRect.width - contentRect.width) / 2 + offsetLeft - offsetRight,
    },
    'bottom-start': {
      top: triggerRect.bottom + totalOffset + offsetBottom,
      left: triggerRect.left + offsetLeft,
    },
    'bottom-end': {
      top: triggerRect.bottom + totalOffset + offsetBottom,
      left: triggerRect.right - contentRect.width - offsetRight,
    },
    left: {
      top:
        triggerRect.top + (triggerRect.height - contentRect.height) / 2 + offsetTop - offsetBottom,
      left: triggerRect.left - contentRect.width - totalOffset - offsetLeft,
    },
    'left-start': {
      top: triggerRect.top + offsetTop,
      left: triggerRect.left - contentRect.width - totalOffset - offsetLeft,
    },
    'left-end': {
      top: triggerRect.bottom - contentRect.height - offsetBottom,
      left: triggerRect.left - contentRect.width - totalOffset - offsetLeft,
    },
    right: {
      top:
        triggerRect.top + (triggerRect.height - contentRect.height) / 2 + offsetTop - offsetBottom,
      left: triggerRect.right + totalOffset + offsetRight,
    },
    'right-start': {
      top: triggerRect.top + offsetTop,
      left: triggerRect.right + totalOffset + offsetRight,
    },
    'right-end': {
      top: triggerRect.bottom - contentRect.height - offsetBottom,
      left: triggerRect.right + totalOffset + offsetRight,
    },
  }

  // Check if position fits in viewport
  const fitsInViewport = (pos: { top: number; left: number }) => {
    return (
      pos.top >= 0 &&
      pos.left >= 0 &&
      pos.top + contentRect.height <= viewport.height &&
      pos.left + contentRect.width <= viewport.width
    )
  }

  // Try preferred position first
  let actualPosition: PopoverPosition = preferredPosition
  let finalPosition = positions[preferredPosition as keyof typeof positions]

  // If preferred position doesn't fit and it's 'auto', find the best fit
  if (preferredPosition === 'auto' || !fitsInViewport(finalPosition)) {
    const positionPriority: PopoverPosition[] = [
      'bottom',
      'top',
      'right',
      'left',
      'bottom-start',
      'bottom-end',
      'top-start',
      'top-end',
      'right-start',
      'right-end',
      'left-start',
      'left-end',
    ]

    for (const pos of positionPriority) {
      const testPos = positions[pos as keyof typeof positions]
      if (fitsInViewport(testPos)) {
        actualPosition = pos
        finalPosition = testPos
        break
      }
    }
  }

  // Constrain to viewport bounds as fallback
  const constrainedPosition = {
    top: Math.max(0, Math.min(finalPosition.top, viewport.height - contentRect.height)),
    left: Math.max(0, Math.min(finalPosition.left, viewport.width - contentRect.width)),
  }

  // Calculate arrow position
  let arrowPosition: PopoverPositionResult['arrowPosition']

  if (hasArrow) {
    const isTopOrBottom = actualPosition.startsWith('top') || actualPosition.startsWith('bottom')
    const isLeftOrRight = actualPosition.startsWith('left') || actualPosition.startsWith('right')

    if (isTopOrBottom) {
      const triggerCenter = triggerRect.left + triggerRect.width / 2
      const contentLeft = constrainedPosition.left
      const arrowLeft = triggerCenter - contentLeft - ARROW_SIZE / 2

      arrowPosition = {
        left: Math.max(8, Math.min(arrowLeft, contentRect.width - ARROW_SIZE - 8)),
        top: actualPosition.startsWith('top') ? contentRect.height : -ARROW_SIZE,
      }
    } else if (isLeftOrRight) {
      const triggerCenter = triggerRect.top + triggerRect.height / 2
      const contentTop = constrainedPosition.top
      const arrowTop = triggerCenter - contentTop - ARROW_SIZE / 2

      arrowPosition = {
        top: Math.max(8, Math.min(arrowTop, contentRect.height - ARROW_SIZE - 8)),
        left: actualPosition.startsWith('left') ? contentRect.width : -ARROW_SIZE,
      }
    }
  }

  return {
    top: constrainedPosition.top,
    left: constrainedPosition.left,
    actualPosition,
    arrowPosition,
  }
}
