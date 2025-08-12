import React from 'react'
import { ConfettiBurst } from './ConfettiBurst'
import { occasionConfettiThemes } from './ConfettiUtils'
import { OccasionId } from '../OccasionTypes'

interface OccasionConfettiProps {
  occasionId?: OccasionId
  x: number
  y: number
  onComplete?: () => void
}

export const OccasionConfetti: React.FC<OccasionConfettiProps> = ({
  occasionId,
  x,
  y,
  onComplete,
}) => {
  const theme = occasionId
    ? occasionConfettiThemes[occasionId as keyof typeof occasionConfettiThemes] ||
      occasionConfettiThemes.default
    : occasionConfettiThemes.default

  return (
    <ConfettiBurst
      x={x}
      y={y}
      config={{
        ...theme,
        gravity: occasionId === 'diwali' ? 0.2 : occasionId === 'holi' ? 0.15 : 0.3,
        duration: occasionId === 'diwali' || occasionId === 'holi' ? 4000 : 3000,
        fadeOut: true,
      }}
      onComplete={onComplete}
    />
  )
}
