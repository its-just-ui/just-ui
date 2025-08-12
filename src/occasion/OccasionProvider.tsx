import React, { useEffect, useMemo, useRef, useState } from 'react'
import { occasionRegistry as defaultRegistry } from './OccasionRegistry'
import { OccasionId, OccasionScope, OccasionSpec } from './OccasionTypes'

/**
 * Global configuration for the Occasion system.
 *
 * Quick-start examples:
 * ```tsx
 * <OccasionProvider config={{ enabled: true }}>
 *   <DecorationPortal />
 *   <OccasionDecorator>
 *     <Input label="Your name" />
 *   </OccasionDecorator>
 * </OccasionProvider>
 * ```
 *
 * Show only confetti (no adjacent icons):
 * ```tsx
 * <OccasionProvider config={{ enabledScopes: ['ambient', 'floating', 'clickBurst'] }}>
 *   <DecorationPortal />
 *   <OccasionDecorator showAdjacent={false}>
 *     <Button>Save</Button>
 *   </OccasionDecorator>
 * </OccasionProvider>
 * ```
 */
export interface OccasionConfig {
  locale?: 'IN' | 'US' | 'GLOBAL'
  enabled?: boolean
  disabledOccasions?: OccasionId[]
  enabledOccasions?: OccasionId[]
  enabledScopes?: OccasionScope[]
  reducedMotion?: boolean
  overrides?: Partial<Record<OccasionId, Partial<OccasionSpec>>>
  /**
   * Mode 'auto' scans dates to find active occasions. Mode 'manual' only shows explicitly forced occasions.
   */
  mode?: 'auto' | 'manual'
  /** Explicitly force one occasion (manual mode) */
  forcedOccasion?: OccasionId
  /** Explicitly force multiple occasions (manual mode). Highest priority wins. */
  forcedOccasions?: OccasionId[]
  /** Global sizing/density controls */
  sizes?: {
    adjacentBasePx?: number // default 18
    floatingScale?: number // default 1
    ambientDensity?: number // default 1 (not fully used yet)
  }
}

interface OccasionContextValue {
  activeOccasion: OccasionSpec | null
  activeOccasions: OccasionSpec[]
  isActive: (id: OccasionId) => boolean
  getAsset: (scope: OccasionScope) => React.ReactNode | null
  shouldAttachClickBurst: () => boolean
  consumeClickBurstToken: () => boolean
  config: Required<Pick<OccasionConfig, 'enabled'>> & OccasionConfig
}

const OccasionContext = React.createContext<OccasionContextValue | null>(null)

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState<boolean>(() =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setPrefers(mql.matches)
    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [])
  return prefers
}

function applyOverrides(base: OccasionSpec, override?: Partial<OccasionSpec>): OccasionSpec {
  if (!override) return base
  return {
    ...base,
    ...override,
    assets: { ...base.assets, ...override.assets },
    behavior: { ...base.behavior, ...override.behavior },
  }
}

function isOccasionActive(spec: OccasionSpec, date: Date, locale?: string): boolean {
  if (locale && spec.locales.length && !spec.locales.includes(locale)) return false
  const active = spec.rule.isActive(date, locale)
  if (!active && spec.rule.windowDays && spec.rule.windowDays > 0) {
    // window handled within registry rules if needed, but rule may return exact-day only
    // No-op here since many rules already consider window. Keep compatibility.
  }
  return active
}

function pickHighestPriority(occasions: OccasionSpec[]): OccasionSpec | null {
  if (occasions.length === 0) return null
  return occasions.slice().sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0]
}

export const OccasionProvider: React.FC<{ config?: OccasionConfig; children: React.ReactNode }> = ({
  config,
  children,
}) => {
  const {
    locale = 'GLOBAL',
    enabled = true,
    disabledOccasions = [],
    enabledOccasions,
    enabledScopes = ['adjacent', 'floating', 'ambient', 'clickBurst'],
    reducedMotion: reducedMotionProp,
    overrides = {},
    mode = 'auto',
    forcedOccasion,
    forcedOccasions,
    sizes = {},
  } = config || {}

  const prefersReduced = usePrefersReducedMotion()
  const reducedMotion = reducedMotionProp ?? prefersReduced

  // Resolve registry with overrides and filters
  const resolvedRegistry = useMemo(() => {
    let list = defaultRegistry
    if (enabledOccasions && enabledOccasions.length) {
      list = list.filter((o) => enabledOccasions.includes(o.id))
    }
    return list
      .filter((o) => !disabledOccasions.includes(o.id))
      .map((o) => applyOverrides(o, overrides[o.id]))
  }, [disabledOccasions, enabledOccasions, overrides])

  // Compute active occasions for today
  const today = useMemo(() => new Date(), [])
  const activeOccasions = useMemo(() => {
    if (!enabled) return []
    if (mode === 'manual') {
      const ids = forcedOccasions ?? (forcedOccasion ? [forcedOccasion] : [])
      if (!ids || ids.length === 0) return []
      return resolvedRegistry.filter((spec) => ids.includes(spec.id))
    }
    // auto mode (default) - detect by date and locale
    return resolvedRegistry.filter((spec) => isOccasionActive(spec, today, locale))
  }, [enabled, mode, forcedOccasion, forcedOccasions, resolvedRegistry, today, locale])

  const activeOccasion = useMemo(() => pickHighestPriority(activeOccasions), [activeOccasions])

  useEffect(() => {
    // Set data attribute for theming
    if (typeof document !== 'undefined') {
      const attrValue = activeOccasion?.id ?? ''
      const root = document.documentElement
      if (attrValue) root.setAttribute('data-occasion', attrValue)
      else root.removeAttribute('data-occasion')
    }
  }, [activeOccasion])

  // Asset getters
  const [lazyComponents, setLazyComponents] = useState<Record<string, React.ComponentType | null>>(
    {}
  )

  const getAsset = (scope: OccasionScope): React.ReactNode | null => {
    if (!enabled || !activeOccasion) return null
    if (!enabledScopes.includes(scope)) return null

    const nodeOrLoader = activeOccasion.assets[scope]
    if (!nodeOrLoader) return null

    const adjacentScale = (sizes.adjacentBasePx ?? 18) / 18
    const floatingScale = sizes.floatingScale ?? 1
    const wrapperStyle: React.CSSProperties =
      scope === 'adjacent'
        ? {
            display: 'inline-flex',
            transform: `scale(${adjacentScale})`,
            transformOrigin: 'center',
          }
        : scope === 'floating'
          ? {
              display: 'inline-flex',
              transform: `scale(${floatingScale})`,
              transformOrigin: 'center',
            }
          : { display: 'inline-flex' }

    if (typeof nodeOrLoader === 'function') {
      const key = `${activeOccasion.id}:${scope}`
      const Loaded = lazyComponents[key]
      if (Loaded) {
        const ambientProps =
          scope === 'ambient'
            ? ({
                // pass optional prop used by our ambient assets; others will ignore
                intensity:
                  (sizes.ambientDensity ?? 1) > 1.2
                    ? 'heavy'
                    : (sizes.ambientDensity ?? 1) < 0.9
                      ? 'less'
                      : 'medium',
              } as Record<string, unknown>)
            : undefined
        return React.createElement(
          'span',
          { 'aria-hidden': true, style: wrapperStyle },
          React.createElement(
            Loaded as React.ComponentType<Record<string, unknown>>,
            ambientProps as Record<string, unknown>
          )
        )
      }
      // kick off lazy load
      nodeOrLoader()
        .then((mod) => {
          setLazyComponents((s) => ({ ...s, [key]: mod.default }))
        })
        .catch(() => {
          // ignore
        })
      return null
    }
    return React.createElement('span', { 'aria-hidden': true, style: wrapperStyle }, nodeOrLoader)
  }

  // Click burst policy
  const lastBurstsRef = useRef<number[]>([])
  const shouldAttachClickBurst = () => {
    if (!enabled || !activeOccasion) return false
    if (!enabledScopes.includes('clickBurst')) return false
    if (!activeOccasion.behavior?.onAnyClick) return false
    return true
  }
  const rateLimitAllow = () => {
    const maxPerMinute = activeOccasion?.behavior?.maxBurstsPerMinute ?? 12
    const now = Date.now()
    lastBurstsRef.current = lastBurstsRef.current.filter((t) => now - t < 60_000)
    if (lastBurstsRef.current.length >= maxPerMinute) return false
    lastBurstsRef.current.push(now)
    return true
  }

  const value: OccasionContextValue = {
    activeOccasion,
    activeOccasions,
    isActive: (id) => !!activeOccasions.find((o) => o.id === id),
    getAsset,
    shouldAttachClickBurst,
    consumeClickBurstToken: rateLimitAllow,
    config: {
      enabled,
      locale,
      disabledOccasions,
      enabledScopes,
      reducedMotion,
      overrides,
      mode,
      forcedOccasion,
      forcedOccasions,
    },
  }

  return <OccasionContext.Provider value={value}>{children}</OccasionContext.Provider>
}

export function useOccasionContext() {
  const ctx = React.useContext(OccasionContext)
  if (!ctx) throw new Error('useOccasionContext must be used within OccasionProvider')
  return ctx
}
