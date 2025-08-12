import React, { useState } from 'react'
import { OccasionProvider } from '../occasion/OccasionProvider'
import { DecorationPortal } from '../occasion/DecorationPortal'
import { OccasionDecorator } from '../components/OccasionDecorator/OccasionDecorator'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const App: React.FC = () => {
  const [locale, setLocale] = useState<'GLOBAL' | 'US' | 'IN'>('GLOBAL')
  const [enabled, setEnabled] = useState(true)
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <label>
          Locale:
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as 'GLOBAL' | 'US' | 'IN')}
            style={{ marginLeft: 8 }}
          >
            <option value="GLOBAL">GLOBAL</option>
            <option value="US">US</option>
            <option value="IN">IN</option>
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />{' '}
          Enable
        </label>
      </div>
      <OccasionProvider config={{ locale, enabled }}>
        <DecorationPortal />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
          <OccasionDecorator>
            <Input label="Your name" placeholder="Jane Doe" />
          </OccasionDecorator>
          <OccasionDecorator scope="clickBurst">
            <Button onClick={() => {}}>Save</Button>
          </OccasionDecorator>
        </div>
      </OccasionProvider>
    </div>
  )
}
