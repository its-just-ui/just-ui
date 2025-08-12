/* Date rule helpers for occasions. All utilities are pure functions. */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0=Sunday

export function isSameMonthDay(date: Date, monthZeroIndexed: number, day: number): boolean {
  return date.getMonth() === monthZeroIndexed && date.getDate() === day
}

export function fixedMonthDay(monthZeroIndexed: number, day: number) {
  return (date: Date) => isSameMonthDay(date, monthZeroIndexed, day)
}

export function nthWeekdayOfMonth(
  year: number,
  monthZeroIndexed: number,
  weekday: Weekday,
  n: number
): Date {
  const firstOfMonth = new Date(year, monthZeroIndexed, 1)
  const firstWeekday = firstOfMonth.getDay() as Weekday
  const offset = (weekday - firstWeekday + 7) % 7
  const day = 1 + offset + (n - 1) * 7
  return new Date(year, monthZeroIndexed, day)
}

export function lastWeekdayOfMonth(year: number, monthZeroIndexed: number, weekday: Weekday): Date {
  const firstOfNextMonth = new Date(year, monthZeroIndexed + 1, 1)
  const lastOfMonth = new Date(firstOfNextMonth.getTime() - 1)
  const lastWeekday = lastOfMonth.getDay() as Weekday
  const offset = (lastWeekday - weekday + 7) % 7
  const day = lastOfMonth.getDate() - offset
  return new Date(year, monthZeroIndexed, day)
}

export function isWithinWindow(target: Date, reference: Date, windowDays = 0): boolean {
  const msInDay = 24 * 60 * 60 * 1000
  const diffDays = Math.floor(
    (stripTime(target).getTime() - stripTime(reference).getTime()) / msInDay
  )
  return Math.abs(diffDays) <= windowDays
}

export function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function aroundDate(datePredicate: (date: Date) => boolean, windowDays = 0) {
  return (date: Date) => {
    if (datePredicate(date)) return true
    // If not exact day, check the range around by checking +/- windowDays
    const base = stripTime(date)
    for (let i = -windowDays; i <= windowDays; i++) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      if (datePredicate(d)) return true
    }
    return false
  }
}

// For lunar/variable dates, allow override injection from server/app.
export type OverrideProvider = () => Record<string, Date | undefined> | undefined

let overrideProvider: OverrideProvider | undefined

export function setOverrideProvider(provider: OverrideProvider) {
  overrideProvider = provider
}

export function lunarOverride(key: string, fallback: (year: number) => Date) {
  return (date: Date) => {
    const overrides = overrideProvider?.()
    const year = date.getFullYear()
    const overrideDate = overrides?.[`${key}:${year}`]
    const target = overrideDate ?? fallback(year)
    return isWithinWindow(date, target, 0)
  }
}
