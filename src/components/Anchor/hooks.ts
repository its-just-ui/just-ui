import { useEffect, useRef, useCallback, useState } from 'react'
import type { ScrollBehavior, EasingFunction } from './types'

export interface UseScrollSpyOptions {
  offset?: number
  rootMargin?: string
  threshold?: number
  onChange?: (activeId: string | null) => void
}

export const useScrollSpy = (targetIds: string[], options: UseScrollSpyOptions = {}) => {
  const { offset = 0, rootMargin = '0px', threshold = 0.1, onChange } = options
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !targetIds.length) return

    const elements = targetIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length === 0) return

        // Find the entry that's closest to the top of the viewport (considering offset)
        const sortedEntries = visibleEntries.sort((a, b) => {
          const aTop = a.boundingClientRect.top - offset
          const bTop = b.boundingClientRect.top - offset
          return Math.abs(aTop) - Math.abs(bTop)
        })

        const newActiveId = sortedEntries[0].target.id
        if (newActiveId !== activeId) {
          setActiveId(newActiveId)
          onChange?.(newActiveId)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    elements.forEach((element) => observer.observe(element))
    observerRef.current = observer

    return () => {
      observer.disconnect()
      observerRef.current = null
    }
  }, [targetIds, offset, rootMargin, threshold, activeId, onChange])

  return activeId
}

export interface UseSmoothScrollOptions {
  behavior?: ScrollBehavior
  offset?: number
  duration?: number
  easing?: EasingFunction
  onScrollStart?: (targetId: string) => void
  onScrollEnd?: (targetId: string) => void
}

export const useSmoothScroll = (options: UseSmoothScrollOptions = {}) => {
  const {
    behavior = 'smooth',
    offset = 0,
    duration = 800,
    easing = 'ease-out',
    onScrollStart,
    onScrollEnd,
  } = options

  const scrollToElement = useCallback(
    (targetId: string, customBehavior?: ScrollBehavior) => {
      const element = document.getElementById(targetId)
      if (!element) return

      const actualBehavior = customBehavior || behavior
      onScrollStart?.(targetId)

      if (actualBehavior === 'instant' || !window.requestAnimationFrame) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: targetPosition,
          behavior: actualBehavior,
        })
        onScrollEnd?.(targetId)
        return
      }

      // Custom smooth scroll with easing
      const startPosition = window.pageYOffset
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
      const distance = targetPosition - startPosition
      const startTime = performance.now()

      const easingFunctions: Record<EasingFunction, (t: number) => number> = {
        linear: (t) => t,
        ease: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        'ease-in': (t) => t * t,
        'ease-out': (t) => t * (2 - t),
        'ease-in-out': (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      }

      const easingFunction = easingFunctions[easing]

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easingFunction(progress)

        window.scrollTo(0, startPosition + distance * easedProgress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          onScrollEnd?.(targetId)
        }
      }

      requestAnimationFrame(animate)
    },
    [behavior, offset, duration, easing, onScrollStart, onScrollEnd]
  )

  return scrollToElement
}

export const useHashSync = (activeId: string | null, onChange?: (hash: string) => void) => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        onChange?.(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [onChange])

  useEffect(() => {
    if (activeId && window.location.hash.replace('#', '') !== activeId) {
      const newUrl = `${window.location.pathname}${window.location.search}#${activeId}`
      window.history.replaceState(null, '', newUrl)
    }
  }, [activeId])
}
