export function createPerMinuteRateLimiter(maxPerMinute: number) {
  const timestamps: number[] = []
  return function allow(): boolean {
    const now = Date.now()
    const windowMs = 60_000
    while (timestamps.length && now - timestamps[0] > windowMs) timestamps.shift()
    if (timestamps.length >= maxPerMinute) return false
    timestamps.push(now)
    return true
  }
}
