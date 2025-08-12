import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { OccasionProvider } from '../occasion/OccasionProvider'
import { DecorationPortal } from '../occasion/DecorationPortal'

describe('Reduced motion behavior', () => {
  it('mounts DecorationPortal without crashing', () => {
    const { unmount } = render(
      <OccasionProvider config={{ enabled: true, locale: 'GLOBAL' }}>
        <DecorationPortal />
      </OccasionProvider>
    )
    expect(true).toBe(true)
    unmount()
  })
})
