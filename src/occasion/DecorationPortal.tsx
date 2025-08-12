import React, { useEffect, useMemo } from 'react'
/**
 * Renders floating and ambient decorations into a fixed overlay using a React portal.
 *
 * Usage:
 * ```tsx
 * <OccasionProvider config={{ enabled: true }}>
 *   <DecorationPortal />
 *   <OccasionDecorator>
 *     <Input label="Name" />
 *   </OccasionDecorator>
 * </OccasionProvider>
 * ```
 */
import { createPortal } from 'react-dom'
import { useOccasion } from './useOccasion'

export const DecorationPortal: React.FC = () => {
  const { getAssets } = useOccasion()
  const container = useMemo(() => {
    if (typeof document === 'undefined') return null
    const el = document.createElement('div')
    el.setAttribute('data-occasion-decorations', 'true')
    el.style.position = 'fixed'
    el.style.inset = '0'
    el.style.pointerEvents = 'none'
    el.style.zIndex = '2147483646'
    return el
  }, [])

  useEffect(() => {
    if (!container || typeof document === 'undefined') return
    document.body.appendChild(container)
    return () => {
      container.remove()
    }
  }, [container])

  if (!container) return null

  const floating = getAssets('floating')
  const ambient = getAssets('ambient')

  return createPortal(
    <div aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      {/* Rendering within a single fixed layer to avoid layout shift. */}
      <div style={{ position: 'absolute', inset: 0 }}>{ambient ?? null}</div>
      <div style={{ position: 'absolute', inset: 0 }}>{floating ?? null}</div>
    </div>,
    container
  )
}
