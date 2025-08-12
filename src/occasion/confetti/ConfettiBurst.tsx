import React, { useEffect, useRef } from 'react'
import { ConfettiConfig, createConfettiParticle, ConfettiParticle } from './ConfettiUtils'

interface ConfettiBurstProps {
  x: number
  y: number
  config?: ConfettiConfig
  onComplete?: () => void
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ x, y, config = {}, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<ConfettiParticle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const defaultConfig: ConfettiConfig = {
      particleCount: 20,
      spread: 90,
      startVelocity: 35,
      gravity: 0.3,
      colors: ['#9333EA', '#A855F7', '#C084FC', '#E9D5FF'],
      shapes: ['square', 'circle'],
      duration: 3000,
      fadeOut: true,
    }

    const finalConfig = { ...defaultConfig, ...config }

    particlesRef.current = Array.from({ length: finalConfig.particleCount! }, () =>
      createConfettiParticle(x, y, finalConfig)
    )

    const startTime = Date.now()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / finalConfig.duration!, 1)

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.vy += finalConfig.gravity!
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        if (finalConfig.fadeOut) {
          particle.opacity = Math.max(0, 1 - progress)
        }

        if (particle.opacity <= 0 || particle.y > canvas.height) {
          return false
        }

        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)

        switch (particle.shape) {
          case 'circle':
            ctx.fillStyle = particle.color
            ctx.beginPath()
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'star':
            drawStar(ctx, 0, 0, particle.size / 2, particle.color)
            break
          case 'triangle':
            ctx.fillStyle = particle.color
            ctx.beginPath()
            ctx.moveTo(0, -particle.size / 2)
            ctx.lineTo(-particle.size / 2, particle.size / 2)
            ctx.lineTo(particle.size / 2, particle.size / 2)
            ctx.closePath()
            ctx.fill()
            break
          case 'heart':
            drawHeart(ctx, 0, 0, particle.size, particle.color)
            break
          default:
            ctx.fillStyle = particle.color
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        }

        ctx.restore()
        return true
      })

      if (particlesRef.current.length > 0 && progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [x, y, config, onComplete])

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
        zIndex: 2147483647,
      }}
      aria-hidden="true"
    />
  )
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string
) {
  const spikes = 5
  const outerRadius = radius
  const innerRadius = radius * 0.5
  let rot = (Math.PI / 2) * 3
  const step = Math.PI / spikes

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius)
    rot += step
    ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius)
    rot += step
  }

  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath()
  ctx.fill()
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const width = size
  const height = size

  ctx.fillStyle = color
  ctx.beginPath()
  const topCurveHeight = height * 0.3
  ctx.moveTo(x, y + topCurveHeight)

  ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight)

  ctx.bezierCurveTo(
    x - width / 2,
    y + (height + topCurveHeight) / 2,
    x,
    y + (height + topCurveHeight) / 1.5,
    x,
    y + height
  )

  ctx.bezierCurveTo(
    x,
    y + (height + topCurveHeight) / 1.5,
    x + width / 2,
    y + (height + topCurveHeight) / 2,
    x + width / 2,
    y + topCurveHeight
  )

  ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight)

  ctx.closePath()
  ctx.fill()
}
