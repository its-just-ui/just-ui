import { useOccasionContext } from './OccasionProvider'
import { OccasionScope } from './OccasionTypes'

export function useOccasion() {
  const ctx = useOccasionContext()
  return {
    activeOccasion: ctx.activeOccasion,
    activeOccasions: ctx.activeOccasions,
    isActive: ctx.isActive,
    getAssets(scope: OccasionScope) {
      return ctx.getAsset(scope)
    },
    shouldAttachClickBurst: ctx.shouldAttachClickBurst,
    consumeClickBurstToken: ctx.consumeClickBurstToken,
    config: ctx.config,
  }
}
