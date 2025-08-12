import React, { useEffect, useRef } from 'react'
import { OccasionId } from '../OccasionTypes'

interface AmbientEffectsProps {
  occasionId: OccasionId
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ occasionId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<AmbientParticle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const config = getAmbientConfig(occasionId)
    if (!config) return

    particlesRef.current = Array.from({ length: config.particleCount }, () =>
      createAmbientParticle(canvas.width, canvas.height, config)
    )

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.y += particle.speed
        particle.x += particle.drift

        if (config.type === 'snow') {
          particle.wobble += 0.01
          particle.x += Math.sin(particle.wobble) * 0.5
        }

        if (particle.y > canvas.height) {
          particle.y = -20
          particle.x = Math.random() * canvas.width
        }

        if (particle.x > canvas.width) {
          particle.x = 0
        } else if (particle.x < 0) {
          particle.x = canvas.width
        }

        ctx.save()
        ctx.globalAlpha = particle.opacity

        if (config.type === 'snow') {
          ctx.fillStyle = '#FFFFFF'
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (config.type === 'leaves') {
          ctx.fillStyle = particle.color
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation)
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.7)
        } else if (config.type === 'sparkles') {
          drawSparkle(ctx, particle.x, particle.y, particle.size, particle.color)
        } else if (config.type === 'fireworks') {
          if (particle.exploding) {
            drawFireworkBurst(ctx, particle)
          } else {
            ctx.fillStyle = particle.color
            ctx.fillRect(particle.x, particle.y, 2, 6)
          }
        }

        ctx.restore()

        if (config.type === 'fireworks' && !particle.exploding && Math.random() < 0.005) {
          particle.exploding = true
          particle.explosionRadius = 0
        }

        if (particle.exploding) {
          particle.explosionRadius = (particle.explosionRadius || 0) + 2
          if (particle.explosionRadius > 50) {
            particle.y = canvas.height + 50
            particle.exploding = false
            particle.explosionRadius = 0
          }
        }

        particle.rotation += particle.rotationSpeed || 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [occasionId])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999999,
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  )
}

interface AmbientParticle {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  opacity: number
  color: string
  wobble: number
  rotation: number
  rotationSpeed?: number
  exploding?: boolean
  explosionRadius?: number
}

interface AmbientConfig {
  type: 'snow' | 'leaves' | 'sparkles' | 'fireworks'
  particleCount: number
  colors: string[]
  speed: { min: number; max: number }
  size: { min: number; max: number }
}

function getAmbientConfig(occasionId: OccasionId): AmbientConfig | null {
  switch (occasionId) {
    case 'christmas':
      return {
        type: 'snow',
        particleCount: 50,
        colors: ['#FFFFFF'],
        speed: { min: 0.5, max: 2 },
        size: { min: 2, max: 5 },
      }
    case 'thanksgiving':
      return {
        type: 'leaves',
        particleCount: 20,
        colors: ['#D2691E', '#FF8C00', '#8B4513'],
        speed: { min: 1, max: 3 },
        size: { min: 8, max: 15 },
      }
    case 'diwali':
      return {
        type: 'fireworks',
        particleCount: 15,
        colors: ['#FFD700', '#FF6347', '#FFA500'],
        speed: { min: -3, max: -1 },
        size: { min: 3, max: 5 },
      }
    case 'new_year':
      return {
        type: 'sparkles',
        particleCount: 30,
        colors: ['#FFD700', '#FFA500', '#FF69B4'],
        speed: { min: 0.5, max: 1.5 },
        size: { min: 2, max: 4 },
      }
    case 'halloween':
      return {
        type: 'leaves',
        particleCount: 15,
        colors: ['#FF8C00', '#8B008B', '#483D8B'],
        speed: { min: 1.5, max: 3 },
        size: { min: 10, max: 20 },
      }
    default:
      return null
  }
}

function createAmbientParticle(
  width: number,
  height: number,
  config: AmbientConfig
): AmbientParticle {
  const colors = config.colors
  return {
    x: Math.random() * width,
    y: config.type === 'fireworks' ? height + Math.random() * 100 : Math.random() * height - height,
    size: config.size.min + Math.random() * (config.size.max - config.size.min),
    speed: config.speed.min + Math.random() * (config.speed.max - config.speed.min),
    drift: (Math.random() - 0.5) * 0.5,
    opacity: 0.3 + Math.random() * 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
    wobble: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.05,
  }
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x - size, y)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size)
  ctx.lineTo(x, y + size)
  ctx.moveTo(x - size * 0.7, y - size * 0.7)
  ctx.lineTo(x + size * 0.7, y + size * 0.7)
  ctx.moveTo(x - size * 0.7, y + size * 0.7)
  ctx.lineTo(x + size * 0.7, y - size * 0.7)
  ctx.stroke()
}

function drawFireworkBurst(ctx: CanvasRenderingContext2D, particle: AmbientParticle) {
  const numSparks = 12
  const radius = particle.explosionRadius || 0

  for (let i = 0; i < numSparks; i++) {
    const angle = (i / numSparks) * Math.PI * 2
    const sparkX = particle.x + Math.cos(angle) * radius
    const sparkY = particle.y + Math.sin(angle) * radius

    ctx.fillStyle = particle.color
    ctx.globalAlpha = Math.max(0, 1 - radius / 50)
    ctx.beginPath()
    ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2)
    ctx.fill()
  }
}
