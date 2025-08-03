import { useContext, useCallback, useMemo } from 'react'
import { CascadeContext } from './context'
import type { CascadeOption, CascadeValue, CascadeLevel } from './types'

export const useCascade = () => {
  const context = useContext(CascadeContext)
  if (!context) {
    throw new Error('useCascade must be used within a Cascade component')
  }
  return context
}

export const useCascadeLevels = (options: CascadeOption[], maxLevels: number = 3) => {
  const buildLevels = useCallback(
    (opts: CascadeOption[], currentLevel: number = 0): CascadeLevel[] => {
      if (currentLevel >= maxLevels || !opts.length) {
        return []
      }

      const level: CascadeLevel = {
        options: opts,
        level: currentLevel,
      }

      return [level, ...buildLevels(opts, currentLevel + 1)]
    },
    [maxLevels]
  )

  const levels = useMemo(() => buildLevels(options), [options, buildLevels])

  return levels
}

export const useCascadeValue = (options: CascadeOption[]) => {
  const findValuePath = useCallback(
    (
      targetValue: string | number,
      opts: CascadeOption[],
      path: (string | number)[] = []
    ): (string | number)[] | null => {
      for (const option of opts) {
        const currentPath = [...path, option.value]

        if (option.value === targetValue) {
          return currentPath
        }

        if (option.children) {
          const found = findValuePath(targetValue, option.children, currentPath)
          if (found) return found
        }
      }
      return null
    },
    []
  )

  const getValueFromPath = useCallback(
    (path: (string | number)[]): CascadeValue | null => {
      let currentOptions = options
      const currentPath: (string | number)[] = []
      let currentLabel = ''

      for (let i = 0; i < path.length; i++) {
        const pathValue = path[i]
        const option = currentOptions.find((opt) => opt.value === pathValue)

        if (!option) return null

        currentPath.push(option.value)
        currentLabel = option.label
        currentOptions = option.children || []
      }

      return {
        value: path[path.length - 1],
        label: currentLabel,
        path: currentPath,
        level: path.length - 1,
      }
    },
    [options]
  )

  const getOptionsForLevel = useCallback(
    (level: number, selectedPath: (string | number)[] = []): CascadeOption[] => {
      if (level === 0) return options

      let currentOptions = options
      for (let i = 0; i < level && i < selectedPath.length; i++) {
        const pathValue = selectedPath[i]
        const option = currentOptions.find((opt) => opt.value === pathValue)
        if (!option || !option.children) return []
        currentOptions = option.children
      }

      return currentOptions
    },
    [options]
  )

  return {
    findValuePath,
    getValueFromPath,
    getOptionsForLevel,
  }
}
