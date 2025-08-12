import React from 'react'

/**
 * Canonical identifier for supported occasions.
 * Extend this union in userland if you register additional occasions.
 */
export type OccasionId =
  | 'in_independence'
  | 'us_independence'
  | 'new_year'
  | 'memorial_day'
  | 'labor_day'
  | 'halloween'
  | 'thanksgiving'
  | 'christmas'
  | 'makar_sankranti'
  | 'holi'
  | 'eid_al_fitr'
  | 'raksha_bandhan'
  | 'ganesh_chaturthi'
  | 'navratri'
  | 'diwali'

/**
 * Rule describing when an occasion is active.
 */
export interface OccasionRule {
  /**
   * Returns true when the occasion should be considered active for a given date and optional locale.
   */
  isActive: (date: Date, locale?: string) => boolean
  /**
   * Optional convenience window, e.g. show decorations ±N days around main date.
   */
  windowDays?: number
}

/**
 * Full specification for an occasion. Registered in the occasion registry.
 */
export interface OccasionSpec {
  id: OccasionId
  displayName: string
  /** ISO-like region identifiers ('US', 'IN', or 'GLOBAL'). */
  locales: string[]
  rule: OccasionRule
  priority?: number
  assets: {
    /** Small inline decoration, usually rendered next to labels. */
    adjacent?: React.ReactNode | (() => Promise<{ default: React.ComponentType }>)
    /** Corner or portal-based floating decoration. */
    floating?: React.ReactNode | (() => Promise<{ default: React.ComponentType }>)
    /** Background/viewport ambient effects (e.g., snow, confetti). */
    ambient?: React.ReactNode | (() => Promise<{ default: React.ComponentType }>)
    clickBurst?: React.ReactNode
  }
  behavior?: {
    onAnyClick?: boolean
    maxBurstsPerMinute?: number
  }
}

export type OccasionScope = 'adjacent' | 'floating' | 'ambient' | 'clickBurst'
