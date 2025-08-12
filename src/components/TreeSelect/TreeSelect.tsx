import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  forwardRef,
  ReactNode,
  KeyboardEvent,
  FocusEvent,
  MouseEvent,
} from 'react'
import { cn } from '../../utils'

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface TreeNode {
  key: string
  title: ReactNode
  value?: unknown
  children?: TreeNode[]
  disabled?: boolean
  checkable?: boolean
  selectable?: boolean
  isLeaf?: boolean
  loading?: boolean
  icon?: ReactNode
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}

export type CheckStrategy = 'SHOW_PARENT' | 'SHOW_CHILD' | 'SHOW_ALL'

export type TreeSelectVariant =
  | 'bordered'
  | 'minimal'
  | 'inline-tree'
  | 'popup-tree'
  | 'searchable'
  | 'multi-select'

export type TreeSelectSize = 'sm' | 'md' | 'lg'

export type NodeStatus =
  | 'selected'
  | 'checked'
  | 'half-checked'
  | 'disabled'
  | 'hovered'
  | 'loading'

export interface TreeSelectValue {
  key: string
  title: ReactNode
  value?: unknown
}

export interface TreeSelectProps {
  // Core Props
  value?: TreeSelectValue | TreeSelectValue[]
  defaultValue?: TreeSelectValue | TreeSelectValue[]
  treeData?: TreeNode[]
  placeholder?: string
  mode?: 'single' | 'multiple'
  checkable?: boolean
  checkStrategy?: CheckStrategy

  // State Control
  open?: boolean
  defaultOpen?: boolean
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  searchValue?: string
  defaultSearchValue?: string
  disabled?: boolean
  loading?: boolean
  clearable?: boolean

  // Visual
  variant?: TreeSelectVariant
  size?: TreeSelectSize
  inline?: boolean
  maxTagCount?: number
  maxTagPlaceholder?: (omittedValues: TreeSelectValue[]) => ReactNode

  // Search & Filter
  searchable?: boolean
  filterTreeNode?: (inputValue: string, node: TreeNode) => boolean
  showSearch?: boolean
  searchPlaceholder?: string

  // Async Loading
  loadData?: (node: TreeNode) => Promise<void>

  // Styling Props
  className?: string
  style?: React.CSSProperties
  popupClassName?: string
  popupStyle?: React.CSSProperties
  dropdownStyle?: React.CSSProperties

  // Granular Styling
  borderRadius?: string
  borderColor?: string
  borderWidth?: string
  borderStyle?: string
  backgroundColor?: string
  hoverColor?: string
  selectedColor?: string
  disabledColor?: string
  focusRingColor?: string
  fontSize?: string
  fontWeight?: string
  placeholderColor?: string
  textColor?: string
  selectedTextColor?: string
  paddingX?: string
  paddingY?: string
  indentSize?: string

  // Icons
  dropdownIcon?: ReactNode
  clearIcon?: ReactNode
  expandIcon?: ReactNode
  collapseIcon?: ReactNode
  checkIcon?: ReactNode
  switcherIcon?: (props: { expanded: boolean; loading: boolean }) => ReactNode

  // Custom Renderers
  renderNode?: (
    node: TreeNode,
    options: {
      selected: boolean
      checked: boolean
      halfChecked: boolean
      expanded: boolean
      level: number
    }
  ) => ReactNode
  renderTag?: (props: {
    value: TreeSelectValue
    onClose: () => void
    disabled: boolean
  }) => ReactNode
  renderEmpty?: () => ReactNode
  renderLoading?: () => ReactNode

  // Event Handlers
  onChange?: (
    value: TreeSelectValue | TreeSelectValue[] | undefined,
    selectedNodes: TreeNode | TreeNode[] | undefined
  ) => void
  onSelect?: (
    selectedKeys: string[],
    info: {
      selected: boolean
      selectedNodes: TreeNode[]
      node: TreeNode
      event: MouseEvent
    }
  ) => void
  onDeselect?: (value: TreeSelectValue, node: TreeNode) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  onExpand?: (
    expandedKeys: string[],
    info: {
      expanded: boolean
      node: TreeNode
    }
  ) => void
  onLoad?: (
    loadedKeys: string[],
    info: {
      event: 'load'
      node: TreeNode
    }
  ) => void
  onFocus?: (event: FocusEvent<HTMLElement>) => void
  onBlur?: (event: FocusEvent<HTMLElement>) => void
  onDropdownVisibleChange?: (open: boolean) => void

  // Accessibility
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  id?: string

  // Children for compound usage
  children?: ReactNode
}

// ============================================================================
// Context
// ============================================================================

interface TreeSelectContextValue {
  // State
  value: TreeSelectValue | TreeSelectValue[] | undefined
  treeData: TreeNode[]
  expandedKeys: string[]
  searchValue: string
  selectedKeys: string[]
  checkedKeys: string[]
  halfCheckedKeys: string[]
  loadedKeys: string[]
  open: boolean
  focused: boolean
  mode: 'single' | 'multiple'
  checkable: boolean
  checkStrategy: CheckStrategy

  // Styling
  variant: TreeSelectVariant
  size: TreeSelectSize
  disabled: boolean
  loading: boolean

  // Methods
  setValue: (value: TreeSelectValue | TreeSelectValue[] | undefined) => void
  setOpen: (open: boolean) => void
  setSearchValue: (value: string) => void
  setExpandedKeys: (keys: string[]) => void
  toggleExpanded: (key: string) => void
  selectNode: (node: TreeNode, selected: boolean) => void
  checkNode: (node: TreeNode, checked: boolean) => void
  clearSelection: () => void

  // Node utilities
  getNodeByKey: (key: string) => TreeNode | undefined
  getSelectedNodes: () => TreeNode[]
  getCheckedNodes: () => TreeNode[]
  isNodeSelected: (key: string) => boolean
  isNodeChecked: (key: string) => boolean
  isNodeHalfChecked: (key: string) => boolean
  isNodeExpanded: (key: string) => boolean
  isNodeDisabled: (node: TreeNode) => boolean

  // Props
  props: TreeSelectProps
}

const TreeSelectContext = createContext<TreeSelectContextValue | undefined>(undefined)

export const useTreeSelectContext = () => {
  const context = useContext(TreeSelectContext)
  if (!context) {
    throw new Error('TreeSelect compound components must be used within a TreeSelect component')
  }
  return context
}

// ============================================================================
// Utility Functions
// ============================================================================

const findNode = (nodes: TreeNode[], key: string): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.key === key) {
      return node
    }
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) return found
    }
  }
  return undefined
}

const getAllChildKeys = (node: TreeNode): string[] => {
  const keys: string[] = []
  if (node.children) {
    for (const child of node.children) {
      keys.push(child.key)
      keys.push(...getAllChildKeys(child))
    }
  }
  return keys
}

const filterTree = (
  nodes: TreeNode[],
  searchValue: string,
  filterFn?: (inputValue: string, node: TreeNode) => boolean
): TreeNode[] => {
  if (!searchValue.trim()) return nodes

  const defaultFilter = (input: string, node: TreeNode) => {
    const title = typeof node.title === 'string' ? node.title : String(node.title)
    return title.toLowerCase().includes(input.toLowerCase())
  }

  const filter = filterFn || defaultFilter

  const filterRecursive = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.reduce<TreeNode[]>((acc, node) => {
      const matchesFilter = filter(searchValue, node)
      const filteredChildren = node.children ? filterRecursive(node.children) : []

      if (matchesFilter || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        })
      }

      return acc
    }, [])
  }

  return filterRecursive(nodes)
}

// ============================================================================
// Sub-Components
// ============================================================================

export const TreeSelectInput = forwardRef<
  HTMLInputElement,
  {
    className?: string
    style?: React.CSSProperties
    placeholder?: string
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  }
>(({ className, style, placeholder, onFocus, onBlur, onKeyDown, ...props }, ref) => {
  const context = useTreeSelectContext()
  const { searchValue, setSearchValue, setOpen, props: treeSelectProps } = context

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    treeSelectProps.onSearch?.(value)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setOpen(true)
    onFocus?.(event)
    treeSelectProps.onFocus?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event)
    treeSelectProps.onBlur?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
    }
    onKeyDown?.(event)
  }

  return (
    <input
      ref={ref}
      type="text"
      value={searchValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder || treeSelectProps.placeholder}
      disabled={context.disabled}
      className={cn(
        'flex-1 border-none outline-none bg-transparent',
        'placeholder:text-gray-400',
        className
      )}
      style={style}
      {...props}
    />
  )
})

TreeSelectInput.displayName = 'TreeSelect.Input'

export const TreeSelectPopup = forwardRef<
  HTMLDivElement,
  {
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
  }
>(({ className, style, children, ...props }, ref) => {
  const context = useTreeSelectContext()
  const { open, props: treeSelectProps } = context

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-1 w-full',
        'bg-white border border-gray-200 rounded-md shadow-lg',
        'max-h-64 overflow-auto',
        treeSelectProps.popupClassName,
        className
      )}
      style={{
        ...treeSelectProps.popupStyle,
        ...treeSelectProps.dropdownStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

TreeSelectPopup.displayName = 'TreeSelect.Popup'

export const TreeSelectNode = forwardRef<
  HTMLDivElement,
  {
    node: TreeNode
    level?: number
    className?: string
    style?: React.CSSProperties
  }
>(({ node, level = 0, className, style, ...props }, ref) => {
  const context = useTreeSelectContext()
  const {
    isNodeSelected,
    isNodeChecked,
    isNodeHalfChecked,
    isNodeExpanded,
    isNodeDisabled,
    selectNode,
    checkNode,
    toggleExpanded,
    mode,
    checkable,
    props: treeSelectProps,
  } = context

  const selected = isNodeSelected(node.key)
  const checked = isNodeChecked(node.key)
  const halfChecked = isNodeHalfChecked(node.key)
  const expanded = isNodeExpanded(node.key)
  const disabled = isNodeDisabled(node)
  const hasChildren = node.children && node.children.length > 0

  const handleClick = () => {
    if (disabled) return

    if (mode === 'single') {
      selectNode(node, !selected)
    }
  }

  const handleCheck = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (disabled) return
    checkNode(node, !checked)
  }

  const handleExpand = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (hasChildren || node.loading) {
      toggleExpanded(node.key)
    }
  }

  const indentSize = treeSelectProps.indentSize || '1rem'
  const paddingLeft = `calc(${level} * ${indentSize})`

  // Custom renderer
  if (treeSelectProps.renderNode) {
    return (
      <div ref={ref} className={className} style={style} {...props}>
        {treeSelectProps.renderNode(node, {
          selected,
          checked,
          halfChecked,
          expanded,
          level,
        })}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-2 py-1 cursor-pointer hover:bg-gray-50',
        {
          'bg-blue-50 text-blue-600': selected,
          'text-gray-400 cursor-not-allowed': disabled,
          'bg-gray-100': disabled,
        },
        className
      )}
      style={{ paddingLeft, ...style }}
      onClick={handleClick}
      {...props}
    >
      {/* Expand/Collapse Icon */}
      {hasChildren && (
        <button
          onClick={handleExpand}
          className="mr-1 p-0.5 hover:bg-gray-200 rounded"
          disabled={disabled}
        >
          {treeSelectProps.switcherIcon ? (
            treeSelectProps.switcherIcon({ expanded, loading: !!node.loading })
          ) : (
            <span className={cn('transition-transform', expanded && 'rotate-90')}>▶</span>
          )}
        </button>
      )}

      {/* Checkbox */}
      {checkable && (
        <TreeSelectCheckbox
          checked={checked}
          halfChecked={halfChecked}
          disabled={disabled}
          onChange={handleCheck}
          className="mr-2"
        />
      )}

      {/* Node Icon */}
      {node.icon && <span className="mr-2">{node.icon}</span>}

      {/* Node Title */}
      <span className="flex-1 truncate">{node.title}</span>

      {/* Loading Indicator */}
      {node.loading && <span className="ml-2 text-gray-400">Loading...</span>}
    </div>
  )
})

TreeSelectNode.displayName = 'TreeSelect.Node'

export const TreeSelectCheckbox = forwardRef<
  HTMLInputElement,
  {
    checked?: boolean
    halfChecked?: boolean
    disabled?: boolean
    onChange?: (event: React.MouseEvent) => void
    className?: string
    style?: React.CSSProperties
  }
>(({ checked, halfChecked, disabled, onChange, className, style, ...props }, _ref) => {
  const context = useTreeSelectContext()
  const { props: treeSelectProps } = context

  return (
    <div
      className={cn(
        'relative w-4 h-4 border border-gray-300 rounded',
        {
          'bg-blue-600 border-blue-600': checked,
          'bg-blue-100 border-blue-300': halfChecked,
          'bg-gray-100 border-gray-200 cursor-not-allowed': disabled,
          'cursor-pointer': !disabled,
        },
        className
      )}
      style={style}
      onClick={disabled ? undefined : onChange}
      {...props}
    >
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
          {treeSelectProps.checkIcon || '✓'}
        </span>
      )}
      {halfChecked && (
        <span className="absolute inset-0 flex items-center justify-center text-blue-600 text-xs">
          −
        </span>
      )}
    </div>
  )
})

TreeSelectCheckbox.displayName = 'TreeSelect.Checkbox'

export const TreeSelectClearButton = forwardRef<
  HTMLButtonElement,
  {
    className?: string
    style?: React.CSSProperties
    onClear?: () => void
  }
>(({ className, style, onClear, ...props }, ref) => {
  const context = useTreeSelectContext()
  const { clearSelection, props: treeSelectProps } = context

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation()
    clearSelection()
    onClear?.()
    treeSelectProps.onClear?.()
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClear}
      className={cn(
        'p-1 text-gray-400 hover:text-gray-600 rounded',
        'transition-colors duration-150',
        className
      )}
      style={style}
      {...props}
    >
      {treeSelectProps.clearIcon || '×'}
    </button>
  )
})

TreeSelectClearButton.displayName = 'TreeSelect.ClearButton'

export const TreeSelectExpandIcon = forwardRef<
  HTMLSpanElement,
  {
    expanded?: boolean
    loading?: boolean
    className?: string
    style?: React.CSSProperties
  }
>(({ expanded, loading, className, style, ...props }, ref) => {
  const context = useTreeSelectContext()
  const { props: treeSelectProps } = context

  if (loading) {
    return (
      <span ref={ref} className={cn('animate-spin', className)} style={style} {...props}>
        ⟳
      </span>
    )
  }

  if (treeSelectProps.switcherIcon) {
    return (
      <span ref={ref} className={className} style={style} {...props}>
        {treeSelectProps.switcherIcon({ expanded: !!expanded, loading: !!loading })}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={cn('transition-transform duration-150', expanded && 'rotate-90', className)}
      style={style}
      {...props}
    >
      {expanded ? treeSelectProps.collapseIcon || '▼' : treeSelectProps.expandIcon || '▶'}
    </span>
  )
})

TreeSelectExpandIcon.displayName = 'TreeSelect.ExpandIcon'

// ============================================================================
// Main TreeSelect Component
// ============================================================================

const TreeSelectBase = forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      value,
      defaultValue,
      treeData = [],
      placeholder = 'Please select',
      mode = 'single',
      checkable = false,
      checkStrategy = 'SHOW_CHILD',

      open,
      defaultOpen = false,
      expandedKeys,
      defaultExpandedKeys = [],
      searchValue,
      defaultSearchValue = '',
      disabled = false,
      loading = false,
      clearable = true,

      variant = 'bordered',
      size = 'md',
      inline = false,
      maxTagCount,
      maxTagPlaceholder,

      searchable = false,
      filterTreeNode,
      showSearch = false,
      searchPlaceholder = 'Search...',

      loadData,

      className,
      style,
      popupClassName,
      popupStyle,
      dropdownStyle,

      // Styling props
      borderRadius,
      borderColor,
      borderWidth,
      borderStyle,
      backgroundColor,
      hoverColor,
      selectedColor,
      disabledColor,
      focusRingColor,
      fontSize,
      fontWeight,
      placeholderColor,
      textColor,
      selectedTextColor,
      paddingX,
      paddingY,
      indentSize,

      // Icons
      dropdownIcon,
      clearIcon,
      expandIcon,
      collapseIcon,
      checkIcon,
      switcherIcon,

      // Custom Renderers
      renderNode,
      renderTag,
      renderEmpty,
      renderLoading,

      // Event Handlers
      onChange,
      onSelect,
      onDeselect,
      onSearch,
      onClear,
      onExpand,
      onLoad,
      onFocus,
      onBlur,
      onDropdownVisibleChange,

      // Accessibility
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      id,

      children,
      ...props
    },
    ref
  ) => {
    // ============================================================================
    // State Management
    // ============================================================================

    const [internalValue, setInternalValue] = useState<
      TreeSelectValue | TreeSelectValue[] | undefined
    >(defaultValue)
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(defaultExpandedKeys)
    const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])
    const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([])
    const [loadedKeys, setLoadedKeys] = useState<string[]>([])
    const [focused, setFocused] = useState(false)

    // Controlled vs Uncontrolled
    const isControlledValue = value !== undefined
    const isControlledOpen = open !== undefined
    const isControlledExpanded = expandedKeys !== undefined
    const isControlledSearch = searchValue !== undefined

    const currentValue = isControlledValue ? value : internalValue
    const currentOpen = isControlledOpen ? open : internalOpen
    const currentExpandedKeys = isControlledExpanded ? expandedKeys : internalExpandedKeys
    const currentSearchValue = isControlledSearch ? searchValue : internalSearchValue

    // ============================================================================
    // Utility Functions
    // ============================================================================

    const getNodeByKey = useCallback(
      (key: string): TreeNode | undefined => {
        return findNode(treeData, key)
      },
      [treeData]
    )

    const getSelectedNodes = useCallback((): TreeNode[] => {
      return selectedKeys.map((key) => getNodeByKey(key)).filter(Boolean) as TreeNode[]
    }, [selectedKeys, getNodeByKey])

    const getCheckedNodes = useCallback((): TreeNode[] => {
      return checkedKeys.map((key) => getNodeByKey(key)).filter(Boolean) as TreeNode[]
    }, [checkedKeys, getNodeByKey])

    const isNodeSelected = useCallback(
      (key: string): boolean => {
        return selectedKeys.includes(key)
      },
      [selectedKeys]
    )

    const isNodeChecked = useCallback(
      (key: string): boolean => {
        return checkedKeys.includes(key)
      },
      [checkedKeys]
    )

    const isNodeHalfChecked = useCallback(
      (key: string): boolean => {
        return halfCheckedKeys.includes(key)
      },
      [halfCheckedKeys]
    )

    const isNodeExpanded = useCallback(
      (key: string): boolean => {
        return currentExpandedKeys.includes(key)
      },
      [currentExpandedKeys]
    )

    const isNodeDisabled = useCallback(
      (node: TreeNode): boolean => {
        return disabled || node.disabled === true
      },
      [disabled]
    )

    // ============================================================================
    // Event Handlers
    // ============================================================================

    const setValue = useCallback(
      (newValue: TreeSelectValue | TreeSelectValue[] | undefined) => {
        if (!isControlledValue) {
          setInternalValue(newValue)
        }

        // Update selected keys based on value
        if (Array.isArray(newValue)) {
          setSelectedKeys(newValue.map((v) => v.key))
        } else if (newValue) {
          setSelectedKeys([newValue.key])
        } else {
          setSelectedKeys([])
        }

        onChange?.(newValue, Array.isArray(newValue) ? getSelectedNodes() : getSelectedNodes()[0])
      },
      [isControlledValue, onChange, getSelectedNodes]
    )

    const setOpen = useCallback(
      (isOpen: boolean) => {
        if (!isControlledOpen) {
          setInternalOpen(isOpen)
        }
        onDropdownVisibleChange?.(isOpen)
      },
      [isControlledOpen, onDropdownVisibleChange]
    )

    const setSearchValue = useCallback(
      (search: string) => {
        if (!isControlledSearch) {
          setInternalSearchValue(search)
        }
        onSearch?.(search)
      },
      [isControlledSearch, onSearch]
    )

    const setExpandedKeys = useCallback(
      (keys: string[]) => {
        if (!isControlledExpanded) {
          setInternalExpandedKeys(keys)
        }
      },
      [isControlledExpanded]
    )

    const toggleExpanded = useCallback(
      async (key: string) => {
        const node = getNodeByKey(key)
        if (!node) return

        const isExpanded = currentExpandedKeys.includes(key)
        const newExpandedKeys = isExpanded
          ? currentExpandedKeys.filter((k) => k !== key)
          : [...currentExpandedKeys, key]

        setExpandedKeys(newExpandedKeys)
        onExpand?.(newExpandedKeys, { expanded: !isExpanded, node })

        // Handle async loading
        if (!isExpanded && loadData && !loadedKeys.includes(key)) {
          try {
            await loadData(node)
            setLoadedKeys((prev) => [...prev, key])
            onLoad?.(loadedKeys, { event: 'load', node })
          } catch (error) {
            console.error('Failed to load node data:', error)
          }
        }
      },
      [currentExpandedKeys, getNodeByKey, setExpandedKeys, onExpand, loadData, loadedKeys, onLoad]
    )

    const selectNode = useCallback(
      (node: TreeNode, selected: boolean) => {
        if (isNodeDisabled(node)) return

        if (mode === 'single') {
          const newValue = selected
            ? { key: node.key, title: node.title, value: node.value }
            : undefined
          setValue(newValue)
        } else {
          const currentValues = Array.isArray(currentValue) ? currentValue : []
          const newValues = selected
            ? [...currentValues, { key: node.key, title: node.title, value: node.value }]
            : currentValues.filter((v) => v.key !== node.key)

          setValue(newValues)
        }

        onSelect?.(selectedKeys, {
          selected,
          selectedNodes: getSelectedNodes(),
          node,
          event: {} as MouseEvent, // Placeholder for event
        })
      },
      [mode, currentValue, setValue, selectedKeys, getSelectedNodes, onSelect, isNodeDisabled]
    )

    const checkNode = useCallback(
      (node: TreeNode, checked: boolean) => {
        if (isNodeDisabled(node)) return

        const updateCheckedKeys = (
          keys: string[],
          nodeKey: string,
          isChecked: boolean
        ): string[] => {
          return isChecked
            ? [...keys.filter((k) => k !== nodeKey), nodeKey]
            : keys.filter((k) => k !== nodeKey)
        }

        let newCheckedKeys = updateCheckedKeys(checkedKeys, node.key, checked)

        // Handle parent-child relationships
        if (checked) {
          // Check all children
          const childKeys = getAllChildKeys(node)
          childKeys.forEach((childKey) => {
            newCheckedKeys = updateCheckedKeys(newCheckedKeys, childKey, true)
          })
        } else {
          // Uncheck all children
          const childKeys = getAllChildKeys(node)
          childKeys.forEach((childKey) => {
            newCheckedKeys = updateCheckedKeys(newCheckedKeys, childKey, false)
          })
        }

        setCheckedKeys(newCheckedKeys)

        // Update value based on check strategy
        const checkedNodes = newCheckedKeys
          .map((key) => getNodeByKey(key))
          .filter(Boolean) as TreeNode[]
        const checkedValues = checkedNodes.map((n) => ({
          key: n.key,
          title: n.title,
          value: n.value,
        }))

        setValue(checkedValues)
      },
      [checkedKeys, getNodeByKey, setValue, isNodeDisabled]
    )

    const clearSelection = useCallback(() => {
      setValue(undefined)
      setSelectedKeys([])
      setCheckedKeys([])
      setHalfCheckedKeys([])
    }, [setValue])

    // ============================================================================
    // Filtered Tree Data
    // ============================================================================

    const filteredTreeData = useMemo(() => {
      return filterTree(treeData, currentSearchValue, filterTreeNode)
    }, [treeData, currentSearchValue, filterTreeNode])

    // ============================================================================
    // Render Tree Nodes
    // ============================================================================

    const renderTreeNodes = useCallback(
      (nodes: TreeNode[], level = 0): ReactNode[] => {
        return nodes.map((node) => {
          const isExpanded = isNodeExpanded(node.key)
          const hasChildren = node.children && node.children.length > 0

          return (
            <React.Fragment key={node.key}>
              <TreeSelectNode node={node} level={level} />
              {hasChildren && isExpanded && renderTreeNodes(node.children!, level + 1)}
            </React.Fragment>
          )
        })
      },
      [isNodeExpanded]
    )

    // ============================================================================
    // Context Value
    // ============================================================================

    const contextValue: TreeSelectContextValue = {
      // State
      value: currentValue,
      treeData: filteredTreeData,
      expandedKeys: currentExpandedKeys,
      searchValue: currentSearchValue,
      selectedKeys,
      checkedKeys,
      halfCheckedKeys,
      loadedKeys,
      open: currentOpen,
      focused,
      mode,
      checkable,
      checkStrategy,

      // Styling
      variant,
      size,
      disabled,
      loading,

      // Methods
      setValue,
      setOpen,
      setSearchValue,
      setExpandedKeys,
      toggleExpanded,
      selectNode,
      checkNode,
      clearSelection,

      // Node utilities
      getNodeByKey,
      getSelectedNodes,
      getCheckedNodes,
      isNodeSelected,
      isNodeChecked,
      isNodeHalfChecked,
      isNodeExpanded,
      isNodeDisabled,

      // Props
      props: {
        value,
        defaultValue,
        treeData,
        placeholder,
        mode,
        checkable,
        checkStrategy,
        open,
        defaultOpen,
        expandedKeys,
        defaultExpandedKeys,
        searchValue,
        defaultSearchValue,
        disabled,
        loading,
        clearable,
        variant,
        size,
        inline,
        maxTagCount,
        maxTagPlaceholder,
        searchable,
        filterTreeNode,
        showSearch,
        searchPlaceholder,
        loadData,
        className,
        style,
        popupClassName,
        popupStyle,
        dropdownStyle,
        borderRadius,
        borderColor,
        borderWidth,
        borderStyle,
        backgroundColor,
        hoverColor,
        selectedColor,
        disabledColor,
        focusRingColor,
        fontSize,
        fontWeight,
        placeholderColor,
        textColor,
        selectedTextColor,
        paddingX,
        paddingY,
        indentSize,
        dropdownIcon,
        clearIcon,
        expandIcon,
        collapseIcon,
        checkIcon,
        switcherIcon,
        renderNode,
        renderTag,
        renderEmpty,
        renderLoading,
        onChange,
        onSelect,
        onDeselect,
        onSearch,
        onClear,
        onExpand,
        onLoad,
        onFocus,
        onBlur,
        onDropdownVisibleChange,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        id,
      },
    }

    // ============================================================================
    // Styling
    // ============================================================================

    const sizeStyles = {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
    }

    const variantStyles = {
      bordered: 'border border-gray-300 rounded-md',
      minimal: 'border-b border-gray-300',
      'inline-tree': 'border-none',
      'popup-tree': 'border border-gray-300 rounded-md',
      searchable: 'border border-gray-300 rounded-md',
      'multi-select': 'border border-gray-300 rounded-md min-h-[2.5rem]',
    }

    const customStyles: React.CSSProperties = {
      borderRadius,
      borderColor,
      borderWidth,
      borderStyle,
      backgroundColor,
      color: textColor,
      fontSize,
      fontWeight,
      padding:
        paddingX || paddingY ? `${paddingY || '0.5rem'} ${paddingX || '0.75rem'}` : undefined,
      ...style,
    }

    // ============================================================================
    // Render Selected Values
    // ============================================================================

    const renderSelectedValues = () => {
      if (!currentValue) {
        return (
          <span className="text-gray-400" style={{ color: placeholderColor }}>
            {placeholder}
          </span>
        )
      }

      if (Array.isArray(currentValue)) {
        const visibleValues =
          maxTagCount && currentValue.length > maxTagCount
            ? currentValue.slice(0, maxTagCount)
            : currentValue

        const hiddenCount =
          maxTagCount && currentValue.length > maxTagCount ? currentValue.length - maxTagCount : 0

        return (
          <div className="flex flex-wrap gap-1">
            {visibleValues.map((val) => {
              if (renderTag) {
                return renderTag({
                  value: val,
                  onClose: () => {
                    const newValues = currentValue.filter((v) => v.key !== val.key)
                    setValue(newValues.length > 0 ? newValues : undefined)
                  },
                  disabled,
                })
              }

              return (
                <span
                  key={val.key}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {val.title}
                  {!disabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const newValues = currentValue.filter((v) => v.key !== val.key)
                        setValue(newValues.length > 0 ? newValues : undefined)
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  )}
                </span>
              )
            })}

            {hiddenCount > 0 && (
              <span className="text-gray-500 text-sm">
                {maxTagPlaceholder
                  ? maxTagPlaceholder(currentValue.slice(maxTagCount))
                  : `+${hiddenCount} more`}
              </span>
            )}
          </div>
        )
      }

      return <span style={{ color: selectedTextColor }}>{currentValue.title}</span>
    }

    // ============================================================================
    // Event Handlers
    // ============================================================================

    const handleContainerClick = () => {
      if (!disabled) {
        setOpen(!currentOpen)
      }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      switch (event.key) {
        case 'Escape':
          setOpen(false)
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          setOpen(!currentOpen)
          break
        case 'ArrowDown':
          event.preventDefault()
          if (!currentOpen) {
            setOpen(true)
          }
          // TODO: Implement focus navigation
          break
        case 'ArrowUp':
          event.preventDefault()
          // TODO: Implement focus navigation
          break
      }
    }

    // ============================================================================
    // Render
    // ============================================================================

    if (inline) {
      return (
        <TreeSelectContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn('w-full', className)}
            style={customStyles}
            role="tree"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            id={id}
            {...props}
          >
            {children || (
              <div className="space-y-1">
                {filteredTreeData.length > 0 ? (
                  renderTreeNodes(filteredTreeData)
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {renderEmpty ? renderEmpty() : 'No data'}
                  </div>
                )}
              </div>
            )}
          </div>
        </TreeSelectContext.Provider>
      )
    }

    return (
      <TreeSelectContext.Provider value={contextValue}>
        <div className="relative w-full">
          <div
            ref={ref}
            className={cn(
              'flex items-center cursor-pointer relative',
              sizeStyles[size],
              variantStyles[variant],
              {
                'bg-gray-100 cursor-not-allowed': disabled,
                'ring-2 ring-blue-500 ring-opacity-50': focused && focusRingColor,
                'hover:border-gray-400': !disabled && hoverColor,
              },
              className
            )}
            style={customStyles}
            onClick={handleContainerClick}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={currentOpen}
            aria-haspopup="tree"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            id={id}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          >
            {/* Search Input */}
            {(searchable || showSearch) && currentOpen ? (
              <TreeSelectInput placeholder={searchPlaceholder} className="flex-1" />
            ) : (
              <div className="flex-1 min-w-0">{renderSelectedValues()}</div>
            )}

            {/* Clear Button */}
            {clearable && currentValue && !disabled && <TreeSelectClearButton className="mr-2" />}

            {/* Dropdown Icon */}
            <span className={cn('text-gray-400 transition-transform', currentOpen && 'rotate-180')}>
              {dropdownIcon || '▼'}
            </span>
          </div>

          {/* Popup */}
          {children ? (
            children
          ) : (
            <TreeSelectPopup>
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  {renderLoading ? renderLoading() : 'Loading...'}
                </div>
              ) : filteredTreeData.length > 0 ? (
                <div className="py-1">{renderTreeNodes(filteredTreeData)}</div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {renderEmpty ? renderEmpty() : 'No data'}
                </div>
              )}
            </TreeSelectPopup>
          )}
        </div>
      </TreeSelectContext.Provider>
    )
  }
)

TreeSelectBase.displayName = 'TreeSelect'

// ============================================================================
// Compound Component Interface
// ============================================================================

interface TreeSelectComponent
  extends React.ForwardRefExoticComponent<TreeSelectProps & React.RefAttributes<HTMLDivElement>> {
  Input: typeof TreeSelectInput
  Popup: typeof TreeSelectPopup
  Node: typeof TreeSelectNode
  Checkbox: typeof TreeSelectCheckbox
  ClearButton: typeof TreeSelectClearButton
  ExpandIcon: typeof TreeSelectExpandIcon
}

// ============================================================================
// Attach Sub-components
// ============================================================================

const TreeSelectWithSubComponents = TreeSelectBase as TreeSelectComponent

TreeSelectWithSubComponents.Input = TreeSelectInput
TreeSelectWithSubComponents.Popup = TreeSelectPopup
TreeSelectWithSubComponents.Node = TreeSelectNode
TreeSelectWithSubComponents.Checkbox = TreeSelectCheckbox
TreeSelectWithSubComponents.ClearButton = TreeSelectClearButton
TreeSelectWithSubComponents.ExpandIcon = TreeSelectExpandIcon

export { TreeSelectWithSubComponents as TreeSelect }
export default TreeSelectWithSubComponents
