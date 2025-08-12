import type { Preview } from '@storybook/react'
import '../src/styles/index.css'
import '../src/components/OccasionDecorator/animations.css'
import '../src/components/OccasionDecorator/OccasionButton.css'
import '../src/components/OccasionDecorator/OccasionCard.css'
import '../src/components/OccasionDecorator/OccasionSwitch.css'
import '../src/components/OccasionDecorator/OccasionAutocomplete.css'
import '../src/components/OccasionDecorator/OccasionList.css'
import '../src/components/OccasionDecorator/OccasionTable.css'
import './preview.css'
import React from 'react'
import { DocsPlaygroundBanner } from './components/DocsPlaygroundBanner'
import { OccasionProvider } from '../src/occasion/OccasionProvider'
import { DecorationPortal } from '../src/occasion/DecorationPortal'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      grid: {
        disable: true,
      },
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#f8f8f8' },
        { name: 'dark', value: '#333333' },
      ],
    },
    layout: 'padded',
  },
  globalTypes: {
    occasionLocale: {
      name: 'Occasion Locale',
      description: 'Region for occasion rules',
      defaultValue: 'GLOBAL',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'GLOBAL', title: 'Global' },
          { value: 'US', title: 'US' },
          { value: 'IN', title: 'IN' },
        ],
      },
    },
    occasionEnabled: {
      name: 'Occasion Enabled',
      description: 'Enable/disable decorations globally',
      defaultValue: true,
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: true, title: 'On' },
          { value: false, title: 'Off' },
        ],
      },
    },
    occasionPreview: {
      name: 'Occasion Preview',
      description: 'Force a specific occasion for preview (manual mode)',
      defaultValue: 'auto',
      toolbar: {
        icon: 'starhollow',
        items: [
          { value: 'auto', title: 'Auto (by date)' },
          { value: 'new_year', title: "New Year's" },
          { value: 'us_independence', title: 'US Independence' },
          { value: 'memorial_day', title: 'Memorial Day' },
          { value: 'labor_day', title: 'Labor Day' },
          { value: 'halloween', title: 'Halloween' },
          { value: 'thanksgiving', title: 'Thanksgiving' },
          { value: 'christmas', title: 'Christmas' },
          { value: 'in_independence', title: 'IN Independence' },
          { value: 'makar_sankranti', title: 'Makar Sankranti' },
          { value: 'diwali', title: 'Diwali' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const locale = (context.globals.occasionLocale as 'GLOBAL' | 'US' | 'IN') || 'GLOBAL'
      const enabled = Boolean(context.globals.occasionEnabled)
      const preview = (context.globals.occasionPreview as string) || 'auto'
      const manualMode = preview !== 'auto'
      const forcedOccasion = manualMode ? (preview as any) : undefined
      return (
        <OccasionProvider
          config={{ locale, enabled, mode: manualMode ? 'manual' : 'auto', forcedOccasion }}
        >
          <DecorationPortal />
          <div style={{ minHeight: 240 }}>
            {/* Docs banner for MDX/Docs pages */}
            {context.viewMode === 'docs' ? (
              <DocsPlaygroundBanner title={context.kind || context.title || ''} />
            ) : null}
            <Story />
          </div>
        </OccasionProvider>
      )
    },
  ],
}

export default preview
