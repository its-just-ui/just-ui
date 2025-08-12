import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { OccasionProvider } from '../occasion/OccasionProvider'
import { OccasionDecorator } from '../components/OccasionDecorator/OccasionDecorator'

describe('OccasionDecorator opt-out', () => {
  it('renders children without decorations when decorate=false', () => {
    const { getByText, container } = render(
      <OccasionProvider config={{ enabled: true, locale: 'GLOBAL' }}>
        <OccasionDecorator decorate={false}>
          <button>Click</button>
        </OccasionDecorator>
      </OccasionProvider>
    )
    expect(getByText('Click')).toBeTruthy()
    // should not create aria-hidden decoration sibling
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
  })
})
