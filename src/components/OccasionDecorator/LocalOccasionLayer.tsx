import React from 'react'

/**
 * Local overlay that confines floating/ambient effects to the wrapped area.
 */
export const LocalOccasionLayer: React.FC<{
  children: React.ReactNode
  showAmbient?: boolean
  showFloating?: boolean
}> = ({ children, showAmbient = true, showFloating = true }) => {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {showAmbient ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
              animation: 'occasionPulse 5s ease-in-out infinite',
            }}
          />
        ) : null}
        {showFloating ? (
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
              animation: 'occasionPulse 3s ease-in-out infinite',
            }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default LocalOccasionLayer
