import React from 'react'
import { OccasionSpec } from './OccasionTypes'
// dateRules helpers retained for apps that import them, not used in manual preview mode

// Assets have been removed, using null as placeholders

export const occasionRegistry: OccasionSpec[] = [
  // New Year's
  {
    id: 'new_year',
    displayName: "New Year's Day",
    locales: ['GLOBAL', 'US', 'IN'],
    rule: { isActive: () => true },
    priority: 10,
    assets: {
      adjacent: null,
      floating: null,
      ambient: null,
      clickBurst: React.createElement('div', { 'aria-hidden': true }),
    },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // US Independence Day
  {
    id: 'us_independence',
    displayName: 'Independence Day (US)',
    locales: ['US'],
    rule: { isActive: () => true },
    priority: 20,
    assets: { adjacent: null, floating: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // Memorial Day
  {
    id: 'memorial_day',
    displayName: 'Memorial Day',
    locales: ['US'],
    rule: { isActive: () => true },
    assets: { adjacent: null, floating: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // Labor Day
  {
    id: 'labor_day',
    displayName: 'Labor Day',
    locales: ['US'],
    rule: { isActive: () => true },
    assets: { adjacent: null, floating: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // Halloween
  {
    id: 'halloween',
    displayName: 'Halloween',
    locales: ['US', 'GLOBAL'],
    rule: { isActive: () => true },
    assets: { adjacent: null, floating: null, ambient: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // Thanksgiving
  {
    id: 'thanksgiving',
    displayName: 'Thanksgiving',
    locales: ['US'],
    rule: { isActive: () => true },
    assets: { adjacent: null, floating: null, ambient: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // Christmas
  {
    id: 'christmas',
    displayName: 'Christmas',
    locales: ['GLOBAL', 'US', 'IN'],
    rule: { isActive: () => true },
    priority: 90,
    assets: {
      adjacent: null,
      floating: null,
      ambient: null,
      clickBurst: React.createElement('div', { 'aria-hidden': true }),
    },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  // India specific
  {
    id: 'in_independence',
    displayName: 'Independence Day (IN)',
    locales: ['IN'],
    rule: { isActive: () => true },
    priority: 30,
    assets: { adjacent: null, floating: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  {
    id: 'makar_sankranti',
    displayName: 'Makar Sankranti',
    locales: ['IN'],
    rule: { isActive: () => true },
    assets: { adjacent: null, floating: null },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 12 },
  },
  {
    id: 'diwali',
    displayName: 'Diwali',
    locales: ['IN', 'GLOBAL'],
    rule: { isActive: () => true },
    priority: 95,
    assets: {
      adjacent: null,
      floating: null,
      ambient: undefined,
      clickBurst: React.createElement('div', { 'aria-hidden': true }),
    },
    behavior: { onAnyClick: true, maxBurstsPerMinute: 20 },
  },
]
