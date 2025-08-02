import type { Preview } from '@storybook/react'
import '../src/styles/index.css'
import './preview.css'

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
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'light',
          value: '#f8f8f8',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    layout: 'padded',
  },
}

export default preview
