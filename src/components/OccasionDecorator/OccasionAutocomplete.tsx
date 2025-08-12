import React, { useState, useRef, useEffect, useMemo, forwardRef } from 'react'
import { useOccasion } from '../../occasion/useOccasion'
import './OccasionAutocomplete.css'

export interface OccasionAutocompleteOption {
  value: string
  label: string
  disabled?: boolean
  description?: string
  group?: string
}

export interface OccasionAutocompleteProps {
  options: OccasionAutocompleteOption[]
  value?: string
  onChange?: (value: string, option: OccasionAutocompleteOption | null) => void
  onInputChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'outlined' | 'filled' | 'borderless'
  clearable?: boolean
  multiple?: boolean
  maxHeight?: number
  noOptionsMessage?: string
  loadingMessage?: string
  customFilter?: (option: OccasionAutocompleteOption, searchValue: string) => boolean
  renderOption?: (option: OccasionAutocompleteOption, isSelected: boolean) => React.ReactNode
  renderValue?: (value: string, option: OccasionAutocompleteOption | null) => React.ReactNode
  occasionTheme?: boolean
  decorateOptions?: boolean
  autoFocus?: boolean
  className?: string
}

export const OccasionAutocomplete = forwardRef<HTMLInputElement, OccasionAutocompleteProps>(
  (
    {
      options,
      value = '',
      onChange,
      onInputChange,
      placeholder = 'Search...',
      disabled = false,
      loading = false,
      size = 'medium',
      variant = 'outlined',
      clearable = true,
      multiple = false,
      maxHeight = 300,
      noOptionsMessage = 'No options found',
      loadingMessage = 'Loading...',
      customFilter,
      renderOption,
      renderValue,
      occasionTheme = true,
      decorateOptions = true,
      autoFocus = false,
      className = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState(value)
    const [selectedValues, setSelectedValues] = useState<string[]>(multiple ? [] : [])
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const { getAssets, activeOccasion } = useOccasion() as {
      getAssets: (scope: string) => React.ReactNode
      activeOccasion: string | null
    }
    const decoration = occasionTheme ? getAssets('adjacent') : null

    const filteredOptions = useMemo(() => {
      if (!inputValue) return options

      if (customFilter) {
        return options.filter((option) => customFilter(option, inputValue))
      }

      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
          option.value.toLowerCase().includes(inputValue.toLowerCase())
      )
    }, [options, inputValue, customFilter])

    const groupedOptions = useMemo(() => {
      const groups = new Map<string | undefined, OccasionAutocompleteOption[]>()

      filteredOptions.forEach((option) => {
        const group = option.group
        if (!groups.has(group)) {
          groups.set(group, [])
        }
        groups.get(group)!.push(option)
      })

      return Array.from(groups.entries())
    }, [filteredOptions])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll('[role="option"]')
        items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
      }
    }, [highlightedIndex])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      setIsOpen(true)
      setHighlightedIndex(-1)
      onInputChange?.(newValue)
    }

    const handleOptionClick = (option: OccasionAutocompleteOption) => {
      if (option.disabled) return

      if (multiple) {
        const newValues = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value]
        setSelectedValues(newValues)
        onChange?.(newValues.join(','), option)
      } else {
        setInputValue(option.label)
        onChange?.(option.value, option)
        setIsOpen(false)
      }
    }

    const handleClear = () => {
      setInputValue('')
      setSelectedValues([])
      onChange?.('', null)
      onInputChange?.('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
        setIsOpen(true)
        return
      }

      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0) {
            handleOptionClick(filteredOptions[highlightedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setHighlightedIndex(-1)
          break
      }
    }

    const occasionClass = occasionTheme && activeOccasion ? `occasion-${activeOccasion}` : ''

    const classes = [
      'occasion-autocomplete',
      `occasion-autocomplete--${size}`,
      `occasion-autocomplete--${variant}`,
      disabled && 'occasion-autocomplete--disabled',
      isOpen && 'occasion-autocomplete--open',
      occasionClass,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={containerRef} className={classes}>
        <div className="occasion-autocomplete__input-wrapper">
          <input
            ref={ref}
            type="text"
            className="occasion-autocomplete__input"
            value={renderValue ? String(renderValue(inputValue, null)) : inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          />

          {clearable && inputValue && !disabled && (
            <button
              className="occasion-autocomplete__clear"
              onClick={handleClear}
              aria-label="Clear"
              type="button"
            >
              ✕
            </button>
          )}

          <span className="occasion-autocomplete__arrow" aria-hidden="true">
            ▼
          </span>
        </div>

        {isOpen && (
          <ul
            ref={listRef}
            className="occasion-autocomplete__dropdown"
            style={{ maxHeight }}
            role="listbox"
          >
            {loading ? (
              <li className="occasion-autocomplete__message">{loadingMessage}</li>
            ) : filteredOptions.length === 0 ? (
              <li className="occasion-autocomplete__message">{noOptionsMessage}</li>
            ) : (
              groupedOptions.map(([group, groupOptions]) => (
                <React.Fragment key={group || 'ungrouped'}>
                  {group && <li className="occasion-autocomplete__group-header">{group}</li>}
                  {groupOptions.map((option) => {
                    const globalIndex = filteredOptions.indexOf(option)
                    const isSelected = multiple
                      ? selectedValues.includes(option.value)
                      : inputValue === option.label
                    const isHighlighted = globalIndex === highlightedIndex

                    return (
                      <li
                        key={option.value}
                        className={[
                          'occasion-autocomplete__option',
                          isSelected && 'occasion-autocomplete__option--selected',
                          isHighlighted && 'occasion-autocomplete__option--highlighted',
                          option.disabled && 'occasion-autocomplete__option--disabled',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => handleOptionClick(option)}
                        onMouseEnter={() => setHighlightedIndex(globalIndex)}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                      >
                        {renderOption ? (
                          renderOption(option, isSelected)
                        ) : (
                          <>
                            {multiple && (
                              <span className="occasion-autocomplete__checkbox">
                                {isSelected ? '☑' : '☐'}
                              </span>
                            )}
                            <div className="occasion-autocomplete__option-content">
                              <span className="occasion-autocomplete__option-label">
                                {option.label}
                              </span>
                              {option.description && (
                                <span className="occasion-autocomplete__option-description">
                                  {option.description}
                                </span>
                              )}
                            </div>
                            {decorateOptions && decoration && (
                              <span className="occasion-autocomplete__option-decoration">
                                {decoration}
                              </span>
                            )}
                          </>
                        )}
                      </li>
                    )
                  })}
                </React.Fragment>
              ))
            )}
          </ul>
        )}
      </div>
    )
  }
)

OccasionAutocomplete.displayName = 'OccasionAutocomplete'
