import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { cn } from '@/utils'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeColors {
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  focus: string
  hover: string
  disabled: string
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

export interface ThemeBorderRadius {
  none: string
  sm: string
  DEFAULT: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  full: string
}

export interface ThemeShadows {
  none: string
  sm: string
  DEFAULT: string
  md: string
  lg: string
  xl: string
  '2xl': string
  inner: string
}

export interface ThemeTransitions {
  none: string
  all: string
  colors: string
  opacity: string
  shadow: string
  transform: string
}

export interface ThemeFonts {
  sans: string
  serif: string
  mono: string
  display: string
  body: string
  heading: string
}

export interface ThemeFontSizes {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
  '6xl': string
  '7xl': string
  '8xl': string
  '9xl': string
}

export interface ThemeFontWeights {
  thin: number
  extralight: number
  light: number
  normal: number
  medium: number
  semibold: number
  bold: number
  extrabold: number
  black: number
}

export interface ThemeBreakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface Theme {
  mode: ThemeMode
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  shadows: ThemeShadows
  transitions: ThemeTransitions
  fonts: ThemeFonts
  fontSizes: ThemeFontSizes
  fontWeights: ThemeFontWeights
  breakpoints: ThemeBreakpoints
}

export const defaultTheme: Theme = {
  mode: 'light',
  colors: {
    light: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      focus: '#3b82f6',
      hover: '#f3f4f6',
      disabled: '#9ca3af',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#9ca3af',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#22d3ee',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151',
      focus: '#60a5fa',
      hover: '#374151',
      disabled: '#6b7280',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  transitions: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors:
      'color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fonts: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    display:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    heading:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Partial<Theme>) => void
  toggleMode: () => void
  applyTheme: (element?: HTMLElement) => void
  currentColors: ThemeColors
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export interface ThemeProviderProps {
  children: React.ReactNode
  theme?: Partial<Theme>
  defaultMode?: ThemeMode
  storageKey?: string
  className?: string
  enableSystemMode?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: customTheme = {},
  defaultMode = 'light',
  storageKey = 'just-ui-theme-mode',
  className,
  enableSystemMode = true,
}) => {
  const mergedTheme: Theme = {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...(customTheme.colors || {}),
    },
    spacing: {
      ...defaultTheme.spacing,
      ...(customTheme.spacing || {}),
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...(customTheme.borderRadius || {}),
    },
    shadows: {
      ...defaultTheme.shadows,
      ...(customTheme.shadows || {}),
    },
    transitions: {
      ...defaultTheme.transitions,
      ...(customTheme.transitions || {}),
    },
    fonts: {
      ...defaultTheme.fonts,
      ...(customTheme.fonts || {}),
    },
    fontSizes: {
      ...defaultTheme.fontSizes,
      ...(customTheme.fontSizes || {}),
    },
    fontWeights: {
      ...defaultTheme.fontWeights,
      ...(customTheme.fontWeights || {}),
    },
    breakpoints: {
      ...defaultTheme.breakpoints,
      ...(customTheme.breakpoints || {}),
    },
  }

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem(storageKey) as ThemeMode
      return {
        ...mergedTheme,
        mode: storedMode || defaultMode,
      }
    }
    return {
      ...mergedTheme,
      mode: defaultMode,
    }
  })

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  const getEffectiveMode = useCallback((): 'light' | 'dark' => {
    if (theme.mode === 'system' && enableSystemMode) {
      return getSystemTheme()
    }
    return theme.mode === 'dark' ? 'dark' : 'light'
  }, [theme.mode, enableSystemMode, getSystemTheme])

  const isDark = getEffectiveMode() === 'dark'
  const currentColors = theme.colors[getEffectiveMode()]

  const applyTheme = useCallback(
    (element: HTMLElement = document.documentElement) => {
      const mode = getEffectiveMode()
      const colors = theme.colors[mode]

      // Apply theme mode class
      element.classList.remove('light', 'dark')
      element.classList.add(mode)

      // Apply CSS custom properties for colors
      Object.entries(colors).forEach(([key, value]) => {
        element.style.setProperty(`--theme-${key}`, value)
      })

      // Apply CSS custom properties for spacing
      Object.entries(theme.spacing).forEach(([key, value]) => {
        element.style.setProperty(`--spacing-${key}`, value)
      })

      // Apply CSS custom properties for border radius
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        element.style.setProperty(`--radius-${key}`, value)
      })

      // Apply CSS custom properties for shadows
      Object.entries(theme.shadows).forEach(([key, value]) => {
        element.style.setProperty(`--shadow-${key}`, value)
      })

      // Apply CSS custom properties for font sizes
      Object.entries(theme.fontSizes).forEach(([key, value]) => {
        element.style.setProperty(`--text-${key}`, value)
      })

      // Apply CSS custom properties for font weights
      Object.entries(theme.fontWeights).forEach(([key, value]) => {
        element.style.setProperty(`--font-${key}`, String(value))
      })

      // Apply CSS custom properties for breakpoints
      Object.entries(theme.breakpoints).forEach(([key, value]) => {
        element.style.setProperty(`--breakpoint-${key}`, value)
      })
    },
    [theme, getEffectiveMode]
  )

  const setTheme = (newTheme: Partial<Theme>) => {
    setThemeState((prev) => ({
      ...prev,
      ...newTheme,
      colors: {
        ...prev.colors,
        ...(newTheme.colors || {}),
      },
      spacing: {
        ...prev.spacing,
        ...(newTheme.spacing || {}),
      },
      borderRadius: {
        ...prev.borderRadius,
        ...(newTheme.borderRadius || {}),
      },
      shadows: {
        ...prev.shadows,
        ...(newTheme.shadows || {}),
      },
      transitions: {
        ...prev.transitions,
        ...(newTheme.transitions || {}),
      },
      fonts: {
        ...prev.fonts,
        ...(newTheme.fonts || {}),
      },
      fontSizes: {
        ...prev.fontSizes,
        ...(newTheme.fontSizes || {}),
      },
      fontWeights: {
        ...prev.fontWeights,
        ...(newTheme.fontWeights || {}),
      },
      breakpoints: {
        ...prev.breakpoints,
        ...(newTheme.breakpoints || {}),
      },
    }))
  }

  const toggleMode = () => {
    const modes: ThemeMode[] = enableSystemMode ? ['light', 'dark', 'system'] : ['light', 'dark']
    const currentIndex = modes.indexOf(theme.mode)
    const nextIndex = (currentIndex + 1) % modes.length
    const nextMode = modes[nextIndex]

    setThemeState((prev) => ({
      ...prev,
      mode: nextMode,
    }))

    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, nextMode)
    }
  }

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme()
  }, [theme, isDark, applyTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystemMode || theme.mode !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      applyTheme()
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme.mode, enableSystemMode, applyTheme])

  // Save theme mode to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme.mode)
    }
  }, [theme.mode, storageKey])

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleMode,
    applyTheme,
    currentColors,
    isDark,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={cn('theme-provider', isDark && 'dark', className)}>{children}</div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
