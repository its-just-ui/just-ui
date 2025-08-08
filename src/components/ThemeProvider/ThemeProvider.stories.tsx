import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { ThemeProvider, useTheme, Theme } from './ThemeProvider'
import { Button } from '../Button'
import { Card } from '../Card'
import { Input } from '../Input'
import { Badge } from '../Badge'
import { Alert } from '../Alert'
import { Switch } from '../Switch'

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

const DemoContent = () => {
  const { theme, toggleMode, isDark, currentColors } = useTheme()
  const [showColors, setShowColors] = useState(false)

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: currentColors.background }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <Card.Header>
            <h2 className="text-xl font-semibold">Theme Provider Demo</h2>
            <p className="text-sm" style={{ color: currentColors.textSecondary }}>
              Current mode: <Badge variant="outlined">{theme.mode}</Badge>
            </p>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button onClick={toggleMode} variant="filled" status="primary">
                Toggle Theme Mode
              </Button>
              <span style={{ color: currentColors.text }}>
                {isDark ? 'Dark Mode' : 'Light Mode'} Active
              </span>
            </div>

            <Alert status="info">
              The ThemeProvider supports light, dark, and system modes. Click the button above to
              cycle through them.
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold" style={{ color: currentColors.text }}>
                  Button Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="filled" status="primary">
                    Primary
                  </Button>
                  <Button variant="outlined" status="secondary">
                    Secondary
                  </Button>
                  <Button variant="ghost" status="success">
                    Success
                  </Button>
                  <Button variant="solid" status="warning">
                    Warning
                  </Button>
                  <Button variant="gradient" status="error">
                    Error
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold" style={{ color: currentColors.text }}>
                  Form Elements
                </h3>
                <Input placeholder="Themed input field" />
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span style={{ color: currentColors.textSecondary }}>Enable notifications</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ color: currentColors.text }}>
                  Current Theme Colors
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowColors(!showColors)}>
                  {showColors ? 'Hide' : 'Show'} Colors
                </Button>
              </div>

              {showColors && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(currentColors).map(([name, color]) => (
                    <div key={name} className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: color, borderColor: currentColors.border }}
                      />
                      <div>
                        <div className="text-xs font-medium" style={{ color: currentColors.text }}>
                          {name}
                        </div>
                        <div className="text-xs" style={{ color: currentColors.textSecondary }}>
                          {color}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="p-6">
          <Card.Header>
            <h2 className="text-xl font-semibold">Themed Cards</h2>
          </Card.Header>
          <Card.Body className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: currentColors.surface }}>
              <h4 className="font-semibold mb-2" style={{ color: currentColors.text }}>
                Surface Color
              </h4>
              <p style={{ color: currentColors.textSecondary }}>
                This card uses the theme&apos;s surface color for its background.
              </p>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: currentColors.border }}>
              <h4 className="font-semibold mb-2" style={{ color: currentColors.text }}>
                Border Color
              </h4>
              <p style={{ color: currentColors.textSecondary }}>
                This card uses the theme&apos;s border color.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: currentColors.hover }}>
              <h4 className="font-semibold mb-2" style={{ color: currentColors.text }}>
                Hover Color
              </h4>
              <p style={{ color: currentColors.textSecondary }}>
                This card uses the theme&apos;s hover color for its background.
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <DemoContent />
    </ThemeProvider>
  ),
}

export const DarkModeDefault: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark">
      <DemoContent />
    </ThemeProvider>
  ),
}

export const SystemModeDefault: Story = {
  render: () => (
    <ThemeProvider defaultMode="system" enableSystemMode={true}>
      <DemoContent />
    </ThemeProvider>
  ),
}

const customTheme: Partial<Theme> = {
  colors: {
    light: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#737373',
      border: '#e5e5e5',
      focus: '#8b5cf6',
      hover: '#f5f5f5',
      disabled: '#a3a3a3',
    },
    dark: {
      primary: '#a78bfa',
      secondary: '#f472b6',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#22d3ee',
      background: '#0a0a0a',
      surface: '#171717',
      text: '#fafafa',
      textSecondary: '#a3a3a3',
      border: '#262626',
      focus: '#a78bfa',
      hover: '#262626',
      disabled: '#525252',
    },
  },
}

export const CustomTheme: Story = {
  render: () => (
    <ThemeProvider theme={customTheme}>
      <DemoContent />
    </ThemeProvider>
  ),
}

const NestedThemeDemo = () => {
  return (
    <ThemeProvider defaultMode="light">
      <div className="p-8 space-y-4">
        <Card className="p-6">
          <Card.Header>
            <h2 className="text-xl font-semibold">Parent Theme (Light)</h2>
          </Card.Header>
          <Card.Body className="space-y-4">
            <Button variant="filled" status="primary">
              Light Theme Button
            </Button>

            <ThemeProvider defaultMode="dark">
              <Card className="p-4">
                <Card.Header>
                  <h2 className="text-lg font-semibold">Nested Theme (Dark)</h2>
                </Card.Header>
                <Card.Body>
                  <Button variant="filled" status="primary">
                    Dark Theme Button
                  </Button>
                </Card.Body>
              </Card>
            </ThemeProvider>

            <Button variant="outlined" status="secondary">
              Back to Light Theme
            </Button>
          </Card.Body>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export const NestedThemes: Story = {
  render: () => <NestedThemeDemo />,
}

const ThemeControlPanel = () => {
  const { theme, setTheme, currentColors } = useTheme()

  const handleColorChange = (colorKey: keyof typeof currentColors, value: string) => {
    const mode =
      theme.mode === 'dark' ||
      (theme.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light'

    setTheme({
      colors: {
        ...theme.colors,
        [mode]: {
          ...theme.colors[mode],
          [colorKey]: value,
        },
      },
    })
  }

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: currentColors.background }}>
      <Card className="max-w-2xl mx-auto p-6">
        <Card.Header>
          <h2 className="text-xl font-semibold">Live Theme Editor</h2>
          <p className="text-sm" style={{ color: currentColors.textSecondary }}>
            Customize your theme colors in real-time
          </p>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: currentColors.text }}
              >
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-full h-10"
                />
                <span className="text-sm" style={{ color: currentColors.textSecondary }}>
                  {currentColors.primary}
                </span>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: currentColors.text }}
              >
                Secondary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-full h-10"
                />
                <span className="text-sm" style={{ color: currentColors.textSecondary }}>
                  {currentColors.secondary}
                </span>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: currentColors.text }}
              >
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentColors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-full h-10"
                />
                <span className="text-sm" style={{ color: currentColors.textSecondary }}>
                  {currentColors.background}
                </span>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: currentColors.text }}
              >
                Text Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentColors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="w-full h-10"
                />
                <span className="text-sm" style={{ color: currentColors.textSecondary }}>
                  {currentColors.text}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <h3 className="font-semibold" style={{ color: currentColors.text }}>
              Preview
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="filled" status="primary">
                Primary
              </Button>
              <Button variant="filled" status="secondary">
                Secondary
              </Button>
              <Button variant="outlined" status="primary">
                Outlined
              </Button>
              <Badge status="success">Success Badge</Badge>
              <Badge status="warning">Warning Badge</Badge>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export const LiveThemeEditor: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeControlPanel />
    </ThemeProvider>
  ),
}
