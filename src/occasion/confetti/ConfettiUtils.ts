export interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: 'square' | 'circle' | 'star' | 'triangle' | 'heart'
}

export interface ConfettiConfig {
  particleCount?: number
  spread?: number
  startVelocity?: number
  gravity?: number
  colors?: string[]
  shapes?: ConfettiParticle['shape'][]
  duration?: number
  fadeOut?: boolean
}

export const occasionConfettiThemes = {
  new_year: {
    colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9370DB'],
    shapes: ['star', 'circle', 'square'] as ConfettiParticle['shape'][],
    particleCount: 30,
    spread: 120,
    startVelocity: 45,
  },
  christmas: {
    colors: ['#DC143C', '#228B22', '#FFD700', '#FFFFFF', '#8B0000'],
    shapes: ['star', 'square', 'circle'] as ConfettiParticle['shape'][],
    particleCount: 25,
    spread: 100,
    startVelocity: 35,
  },
  diwali: {
    colors: ['#FFD700', '#FF6347', '#FFA500', '#FF4500', '#FF1493'],
    shapes: ['star', 'circle', 'square'] as ConfettiParticle['shape'][],
    particleCount: 40,
    spread: 150,
    startVelocity: 50,
  },
  halloween: {
    colors: ['#FF8C00', '#8B008B', '#000000', '#FF4500', '#483D8B'],
    shapes: ['triangle', 'square', 'circle'] as ConfettiParticle['shape'][],
    particleCount: 20,
    spread: 90,
    startVelocity: 30,
  },
  us_independence: {
    colors: ['#B22234', '#FFFFFF', '#3C3B6E'],
    shapes: ['star', 'square'] as ConfettiParticle['shape'][],
    particleCount: 35,
    spread: 110,
    startVelocity: 40,
  },
  in_independence: {
    colors: ['#FF9933', '#FFFFFF', '#138808'],
    shapes: ['circle', 'square'] as ConfettiParticle['shape'][],
    particleCount: 30,
    spread: 100,
    startVelocity: 35,
  },
  holi: {
    colors: ['#FF1493', '#00CED1', '#FFD700', '#FF69B4', '#9370DB', '#32CD32'],
    shapes: ['circle', 'square'] as ConfettiParticle['shape'][],
    particleCount: 50,
    spread: 180,
    startVelocity: 60,
  },
  thanksgiving: {
    colors: ['#D2691E', '#FF8C00', '#FFD700', '#8B4513', '#CD853F'],
    shapes: ['circle', 'square', 'triangle'] as ConfettiParticle['shape'][],
    particleCount: 20,
    spread: 80,
    startVelocity: 25,
  },
  memorial_day: {
    colors: ['#B22234', '#FFFFFF', '#3C3B6E'],
    shapes: ['star', 'square'] as ConfettiParticle['shape'][],
    particleCount: 15,
    spread: 70,
    startVelocity: 20,
  },
  labor_day: {
    colors: ['#4169E1', '#DC143C', '#FFFFFF'],
    shapes: ['square', 'circle'] as ConfettiParticle['shape'][],
    particleCount: 20,
    spread: 80,
    startVelocity: 25,
  },
  default: {
    colors: ['#9333EA', '#A855F7', '#C084FC', '#E9D5FF'],
    shapes: ['circle', 'square'] as ConfettiParticle['shape'][],
    particleCount: 15,
    spread: 60,
    startVelocity: 30,
  },
}

export function createConfettiParticle(
  x: number,
  y: number,
  config: ConfettiConfig
): ConfettiParticle {
  const angle = (Math.random() * config.spread! - config.spread! / 2) * (Math.PI / 180)
  const velocity = config.startVelocity! * (0.5 + Math.random() * 0.5)
  const shapes = config.shapes || ['square', 'circle']
  const colors = config.colors || ['#9333EA', '#A855F7']

  return {
    x,
    y,
    vx: Math.sin(angle) * velocity,
    vy: -Math.cos(angle) * velocity,
    size: 8 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    opacity: 1,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }
}
