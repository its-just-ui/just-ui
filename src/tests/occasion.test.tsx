import { describe, it, expect } from 'vitest'
import { occasionRegistry } from '../occasion/OccasionRegistry'

describe('Occasion registry date rules', () => {
  it('selects US Independence (Jul 4)', () => {
    const d = new Date(2025, 6, 4)
    const usInd = occasionRegistry.find((o) => o.id === 'us_independence')!
    expect(usInd.rule.isActive(d, 'US')).toBe(true)
  })
  it('selects Christmas (Dec 25)', () => {
    const d = new Date(2025, 11, 25)
    const xmas = occasionRegistry.find((o) => o.id === 'christmas')!
    expect(xmas.rule.isActive(d, 'GLOBAL')).toBe(true)
  })
  it('selects IN Independence (Aug 15)', () => {
    const d = new Date(2025, 7, 15)
    const ind = occasionRegistry.find((o) => o.id === 'in_independence')!
    expect(ind.rule.isActive(d, 'IN')).toBe(true)
  })
})
