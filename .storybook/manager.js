import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light',

  // Brand
  brandTitle: 'its-just-ui',
  brandUrl: '/',
  brandImage: '/just-ui-logo.png',
  brandTarget: '_self',

  // Colors based on the dark teal from the logo
  colorPrimary: '#2C5F5F',
  colorSecondary: '#2C5F5F',

  // UI
  appBg: '#F8FAFA',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E0E8E8',
  appBorderRadius: 6,

  // Text colors
  textColor: '#2C5F5F',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#5A7D7D',

  // Toolbar
  barTextColor: '#2C5F5F',
  barSelectedColor: '#2C5F5F',
  barHoverColor: '#2C5F5F',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#D0E0E0',
  inputTextColor: '#2C5F5F',
  inputBorderRadius: 4,
})

addons.setConfig({
  theme,
})
