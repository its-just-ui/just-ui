import React, { useState } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import { OccasionConfetti } from '../../occasion/confetti/OccasionConfetti'
import { AmbientEffects } from '../../occasion/confetti/AmbientEffects'
import { createPortal } from 'react-dom'

/**
 * Wrap any component to attach adjacent decorations and click bursts.
 *
 * Examples:
 * ```tsx
 * <OccasionDecorator>
 *   <Button>Buy</Button>
 * </OccasionDecorator>
 *
 * // Confetti only (no adjacent icons)
 * <OccasionDecorator showAdjacent={false}>
 *   <Button>Save</Button>
 * </OccasionDecorator>
 * ```
 */
export interface OccasionDecoratorProps {
  decorate?: boolean
  scope?: 'adjacent' | 'floating' | 'ambient' | 'clickBurst' | 'all'
  showAdjacent?: boolean // opt-out adjacent icons while keeping other scopes
  showAmbient?: boolean
  children: React.ReactNode
}

export const OccasionDecorator: React.FC<OccasionDecoratorProps> = ({
  decorate = true,
  scope = 'all',
  showAdjacent: _showAdjacent = true,
  showAmbient = true,
  children,
}) => {
  const { activeOccasion, shouldAttachClickBurst, consumeClickBurstToken } = useOccasion()
  const [confettiBursts, setConfettiBursts] = useState<Array<{ id: number; x: number; y: number }>>(
    []
  )

  const clickBurstEnabled = shouldAttachClickBurst()

  const handleClick: React.MouseEventHandler = (e) => {
    if (!clickBurstEnabled) return
    if (!consumeClickBurstToken || !consumeClickBurstToken()) return

    if (activeOccasion) {
      const burstId = Date.now() + Math.random()
      setConfettiBursts((prev) => [...prev, { id: burstId, x: e.clientX, y: e.clientY }])
    }
  }

  const handleConfettiComplete = (burstId: number) => {
    setConfettiBursts((prev) => prev.filter((burst) => burst.id !== burstId))
  }

  if (!decorate) return <>{children}</>

  return (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center' }} onClick={handleClick}>
        {children}
      </span>

      {confettiBursts.map((burst) =>
        createPortal(
          <OccasionConfetti
            key={burst.id}
            occasionId={activeOccasion?.id}
            x={burst.x}
            y={burst.y}
            onComplete={() => handleConfettiComplete(burst.id)}
          />,
          document.body
        )
      )}

      {showAmbient &&
        activeOccasion &&
        (scope === 'all' || scope === 'ambient') &&
        createPortal(<AmbientEffects occasionId={activeOccasion.id} />, document.body)}
    </>
  )
}
