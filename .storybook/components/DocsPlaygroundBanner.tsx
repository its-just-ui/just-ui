import React from 'react'

const GLOBALS = 'occasionLocale:US;occasionEnabled:!false'

function titleToKindSlug(title: string): string {
  // Story id uses title path segments lowercased and hyphenated joined with '--'
  // e.g., 'Components/Slider' + story 'Playground' => 'components-slider--playground'
  const parts = title.split('/').map((p) =>
    p
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  )
  return parts.join('-')
}

export const DocsPlaygroundBanner: React.FC<{ title: string }> = ({ title }) => {
  const kindSlug = titleToKindSlug(title)
  const target = `?path=/story/${kindSlug}--playground&globals=${GLOBALS}`
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 14px',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        background: '#f9fafb',
        margin: '12px 0 20px',
      }}
    >
      <div style={{ fontSize: 14, color: '#374151' }}>
        Open the interactive Playground for this component.
      </div>
      <a
        href={target}
        rel="noreferrer noopener"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          padding: '8px 12px',
          background: '#111827',
          color: '#fff',
          borderRadius: 6,
          textDecoration: 'none',
          lineHeight: 1,
        }}
      >
        Go to Playground ↗
      </a>
    </div>
  )
}

export default DocsPlaygroundBanner
