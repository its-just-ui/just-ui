import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import TreeSelectComponent from './TreeSelect'
import type { TreeSelectProps, TreeNode, TreeSelectValue } from './TreeSelect'

// Use the default export which has the compound components attached
const TreeSelect = TreeSelectComponent

/**
 * # TreeSelect Component
 *
 * A comprehensive, accessible tree select component with support for single/multiple selection, hierarchical data,
 * search functionality, and async loading. Built with compound component architecture for maximum flexibility.
 *
 * ## Features
 *
 * ### Core Functionality
 * - **Single/Multiple Selection**: Choose between single item selection or multiple selections with checkboxes
 * - **Hierarchical Data**: Support for nested tree structures with expand/collapse functionality
 * - **Search & Filter**: Built-in search with customizable filtering logic and highlighting
 * - **Async Loading**: Load child nodes dynamically with loading states
 * - **Keyboard Navigation**: Full keyboard support with arrow keys, enter, space, escape
 * - **Accessibility**: WCAG compliant with proper ARIA attributes and screen reader support
 *
 * ### Selection Modes
 * - **Single Mode**: Select one item at a time with radio-like behavior
 * - **Multiple Mode**: Select multiple items with checkbox behavior
 * - **Checkable Nodes**: Parent-child linkage with configurable check strategies
 *
 * ### Visual Variants
 * - **Bordered**: Default variant with full border
 * - **Minimal**: Clean variant with bottom border only
 * - **Inline Tree**: Embedded tree without popup
 * - **Popup Tree**: Dropdown tree selector
 * - **Searchable**: Enhanced search capabilities
 * - **Multi-select**: Optimized for multiple selection with tags
 *
 * ### Check Strategies
 * - **SHOW_PARENT**: Only show parent nodes in selection
 * - **SHOW_CHILD**: Only show leaf nodes in selection
 * - **SHOW_ALL**: Show all checked nodes regardless of hierarchy
 *
 * ## Basic Usage
 *
 * ```tsx
 * import { TreeSelect } from 'its-just-ui'
 *
 * // Basic tree select
 * const [value, setValue] = useState()
 * const treeData = [
 *   {
 *     key: '1',
 *     title: 'Parent 1',
 *     children: [
 *       { key: '1-1', title: 'Child 1-1' },
 *       { key: '1-2', title: 'Child 1-2' }
 *     ]
 *   }
 * ]
 * return <TreeSelect value={value} onChange={setValue} treeData={treeData} />
 *
 * // Multiple selection with checkboxes
 * return (
 *   <TreeSelect
 *     mode="multiple"
 *     checkable
 *     value={values}
 *     onChange={setValues}
 *     treeData={treeData}
 *   />
 * )
 *
 * // Searchable tree select
 * return (
 *   <TreeSelect
 *     searchable
 *     placeholder="Search and select..."
 *     treeData={treeData}
 *   />
 * )
 *
 * // Inline tree (no popup)
 * return <TreeSelect inline variant="inline-tree" treeData={treeData} />
 * ```
 *
 * ## Controlled vs Uncontrolled
 *
 * The TreeSelect supports both controlled and uncontrolled usage patterns:
 *
 * ```tsx
 * // Controlled - you manage the state
 * const [value, setValue] = useState()
 * const [open, setOpen] = useState(false)
 * const [expandedKeys, setExpandedKeys] = useState([])
 * return (
 *   <TreeSelect
 *     value={value}
 *     onChange={setValue}
 *     open={open}
 *     onDropdownVisibleChange={setOpen}
 *     expandedKeys={expandedKeys}
 *     onExpand={setExpandedKeys}
 *     treeData={treeData}
 *   />
 * )
 *
 * // Uncontrolled - component manages its own state
 * return (
 *   <TreeSelect
 *     defaultValue={defaultValue}
 *     defaultOpen={false}
 *     defaultExpandedKeys={['1', '2']}
 *     treeData={treeData}
 *   />
 * )
 * ```
 *
 * ## Async Loading
 *
 * ```tsx
 * const loadData = async (node: TreeNode) => {
 *   // Fetch children for the node
 *   const children = await fetchChildren(node.key)
 *   node.children = children
 * }
 *
 * return <TreeSelect loadData={loadData} treeData={treeData} />
 * ```
 *
 * ## Custom Rendering
 *
 * ```tsx
 * // Custom node renderer
 * const renderNode = (node, { selected, checked, expanded, level }) => (
 *   <div className={`custom-node level-${level}`}>
 *     <span className={selected ? 'selected' : ''}>{node.title}</span>
 *     {node.badge && <span className="badge">{node.badge}</span>}
 *   </div>
 * )
 *
 * // Custom tag renderer for multiple mode
 * const renderTag = ({ value, onClose, disabled }) => (
 *   <div className="custom-tag">
 *     <span>{value.title}</span>
 *     {!disabled && <button onClick={onClose}>×</button>}
 *   </div>
 * )
 *
 * return (
 *   <TreeSelect
 *     renderNode={renderNode}
 *     renderTag={renderTag}
 *     treeData={treeData}
 *   />
 * )
 * ```
 *
 * ## Compound Components
 *
 * ```tsx
 * return (
 *   <TreeSelect treeData={treeData}>
 *     <TreeSelect.Input placeholder="Custom search..." />
 *     <TreeSelect.Popup>
 *       <div className="custom-header">Select items:</div>
 *       // Tree nodes will be rendered automatically
 *     </TreeSelect.Popup>
 *   </TreeSelect>
 * )
 * ```
 *
 * ## Accessibility
 *
 * The TreeSelect is fully accessible with:
 * - **Keyboard Navigation**: Arrow keys for navigation, Enter/Space to select, Escape to close
 * - **Screen Reader Support**: Proper ARIA labels, roles, and state announcements
 * - **Focus Management**: Logical focus flow and focus trapping in popup
 * - **High Contrast**: Supports high contrast mode and custom color themes
 */
const meta: Meta<typeof TreeSelect> = {
  title: 'Components/TreeSelect',
  component: TreeSelect,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    value: {
      description: 'The controlled value(s) of the tree select',
      control: false,
    },
    defaultValue: {
      description: 'The default value for uncontrolled usage',
      control: false,
    },
    treeData: {
      description: 'The tree data structure',
      control: false,
    },
    placeholder: {
      description: 'Placeholder text when no selection',
      control: 'text',
      table: {
        defaultValue: { summary: "'Please select'" },
      },
    },
    mode: {
      description: 'Selection mode',
      control: 'select',
      options: ['single', 'multiple'],
      table: {
        type: { summary: "'single' | 'multiple'" },
        defaultValue: { summary: "'single'" },
      },
    },
    checkable: {
      description: 'Whether nodes are checkable',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    checkStrategy: {
      description: 'Strategy for showing checked values',
      control: 'select',
      options: ['SHOW_PARENT', 'SHOW_CHILD', 'SHOW_ALL'],
      table: {
        type: { summary: "'SHOW_PARENT' | 'SHOW_CHILD' | 'SHOW_ALL'" },
        defaultValue: { summary: "'SHOW_CHILD'" },
      },
    },

    // State Control
    open: {
      description: 'Controlled open state',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the component is disabled',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Whether the component is in loading state',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      description: 'Whether to show clear button',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },

    // Visual
    variant: {
      description: 'Visual variant',
      control: 'select',
      options: ['bordered', 'minimal', 'inline-tree', 'popup-tree', 'searchable', 'multi-select'],
      table: {
        type: {
          summary:
            "'bordered' | 'minimal' | 'inline-tree' | 'popup-tree' | 'searchable' | 'multi-select'",
        },
        defaultValue: { summary: "'bordered'" },
      },
    },
    size: {
      description: 'Size of the component',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    inline: {
      description: 'Whether to show as inline tree (no popup)',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxTagCount: {
      description: 'Maximum number of tags to display in multiple mode',
      control: 'number',
    },

    // Search & Filter
    searchable: {
      description: 'Whether the tree select is searchable',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showSearch: {
      description: 'Whether to show search input',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    searchPlaceholder: {
      description: 'Placeholder for search input',
      control: 'text',
      table: {
        defaultValue: { summary: "'Search...'" },
      },
    },

    // Styling Props
    borderRadius: {
      description: 'Border radius',
      control: 'text',
    },
    backgroundColor: {
      description: 'Background color',
      control: 'color',
    },
    borderColor: {
      description: 'Border color',
      control: 'color',
    },
    selectedColor: {
      description: 'Selected item color',
      control: 'color',
    },
    focusRingColor: {
      description: 'Focus ring color',
      control: 'color',
    },

    // Event Handlers
    onChange: {
      description: 'Callback when selection changes',
      action: 'changed',
      control: false,
    },
    onSelect: {
      description: 'Callback when item is selected',
      action: 'selected',
      control: false,
    },
    onSearch: {
      description: 'Callback when search value changes',
      action: 'searched',
      control: false,
    },
    onExpand: {
      description: 'Callback when node is expanded/collapsed',
      action: 'expanded',
      control: false,
    },
    onClear: {
      description: 'Callback when selection is cleared',
      action: 'cleared',
      control: false,
    },

    // Disable controls for complex props
    expandedKeys: { control: false },
    defaultExpandedKeys: { control: false },
    searchValue: { control: false },
    defaultSearchValue: { control: false },
    loadData: { control: false },
    filterTreeNode: { control: false },
    renderNode: { control: false },
    renderTag: { control: false },
    renderEmpty: { control: false },
    renderLoading: { control: false },
    switcherIcon: { control: false },
    dropdownIcon: { control: false },
    clearIcon: { control: false },
    expandIcon: { control: false },
    collapseIcon: { control: false },
    checkIcon: { control: false },
    maxTagPlaceholder: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof TreeSelect>

// Helper data
const basicTreeData: TreeNode[] = [
  {
    key: '1',
    title: 'Documents',
    children: [
      {
        key: '1-1',
        title: 'Work Documents',
        children: [
          { key: '1-1-1', title: 'Project Plans.pdf' },
          { key: '1-1-2', title: 'Meeting Notes.docx' },
          { key: '1-1-3', title: 'Budget Report.xlsx' },
        ],
      },
      {
        key: '1-2',
        title: 'Personal Documents',
        children: [
          { key: '1-2-1', title: 'Resume.pdf' },
          { key: '1-2-2', title: 'Cover Letter.docx' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: 'Images',
    children: [
      {
        key: '2-1',
        title: 'Vacation Photos',
        children: [
          { key: '2-1-1', title: 'Beach.jpg' },
          { key: '2-1-2', title: 'Mountains.jpg' },
          { key: '2-1-3', title: 'City.jpg' },
        ],
      },
      {
        key: '2-2',
        title: 'Work Photos',
        children: [
          { key: '2-2-1', title: 'Office.jpg' },
          { key: '2-2-2', title: 'Team.jpg' },
        ],
      },
    ],
  },
  {
    key: '3',
    title: 'Videos',
    children: [
      { key: '3-1', title: 'Tutorial.mp4' },
      { key: '3-2', title: 'Presentation.mp4' },
    ],
  },
]

const departmentTreeData: TreeNode[] = [
  {
    key: 'engineering',
    title: 'Engineering',
    icon: '⚙️',
    children: [
      {
        key: 'frontend',
        title: 'Frontend Team',
        icon: '🎨',
        children: [
          { key: 'react-dev', title: 'React Developer', icon: '👨‍💻' },
          { key: 'vue-dev', title: 'Vue Developer', icon: '👩‍💻' },
          { key: 'ui-designer', title: 'UI Designer', icon: '🎨' },
        ],
      },
      {
        key: 'backend',
        title: 'Backend Team',
        icon: '🔧',
        children: [
          { key: 'node-dev', title: 'Node.js Developer', icon: '👨‍💻' },
          { key: 'python-dev', title: 'Python Developer', icon: '👩‍💻' },
          { key: 'devops', title: 'DevOps Engineer', icon: '🚀' },
        ],
      },
    ],
  },
  {
    key: 'marketing',
    title: 'Marketing',
    icon: '📈',
    children: [
      { key: 'content-marketing', title: 'Content Marketing', icon: '✍️' },
      { key: 'digital-marketing', title: 'Digital Marketing', icon: '💻' },
      { key: 'brand-marketing', title: 'Brand Marketing', icon: '🎯' },
    ],
  },
  {
    key: 'sales',
    title: 'Sales',
    icon: '💼',
    children: [
      { key: 'inside-sales', title: 'Inside Sales', icon: '📞' },
      { key: 'field-sales', title: 'Field Sales', icon: '🚗' },
      { key: 'sales-ops', title: 'Sales Operations', icon: '📊' },
    ],
  },
]

// Helper component for controlled examples
const ControlledTreeSelect: React.FC<TreeSelectProps> = ({
  mode = 'single',
  treeData = basicTreeData,
  ...props
}) => {
  const [value, setValue] = useState<TreeSelectValue | TreeSelectValue[] | undefined>()
  const [open, setOpen] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1', '2'])

  return (
    <div className="h-96">
      <TreeSelect
        {...props}
        mode={mode}
        treeData={treeData}
        value={value}
        onChange={setValue}
        open={open}
        onDropdownVisibleChange={setOpen}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
      />
    </div>
  )
}

// Basic Stories
export const Default: Story = {
  render: (args) => <ControlledTreeSelect {...args} />,
  args: {
    placeholder: 'Select a file or folder',
  },
}

export const WithIcons: Story = {
  render: (args) => <ControlledTreeSelect {...args} />,
  args: {
    placeholder: 'Select a department',
    treeData: departmentTreeData,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Small</label>
        <ControlledTreeSelect size="sm" placeholder="Small tree select" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Medium (Default)</label>
        <ControlledTreeSelect size="md" placeholder="Medium tree select" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Large</label>
        <ControlledTreeSelect size="lg" placeholder="Large tree select" />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Bordered (Default)</label>
        <ControlledTreeSelect variant="bordered" placeholder="Bordered variant" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Minimal</label>
        <ControlledTreeSelect variant="minimal" placeholder="Minimal variant" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Searchable</label>
        <ControlledTreeSelect variant="searchable" searchable placeholder="Searchable variant" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Multi-select</label>
        <ControlledTreeSelect
          variant="multi-select"
          mode="multiple"
          placeholder="Multi-select variant"
        />
      </div>
    </div>
  ),
}

// Selection Modes
const SingleModeComponent: React.FC = () => {
  const [value, setValue] = useState<TreeSelectValue>()

  return (
    <div className="space-y-4">
      <TreeSelect
        mode="single"
        value={value}
        onChange={(val) => setValue(val as TreeSelectValue)}
        treeData={basicTreeData}
        placeholder="Select a single item"
        defaultExpandedKeys={['1', '2']}
      />
      {value && (
        <div className="text-sm text-gray-600">
          Selected: <strong>{value.title}</strong> (key: {value.key})
        </div>
      )}
    </div>
  )
}

export const SingleMode: Story = {
  render: () => <SingleModeComponent />,
}

const MultipleModeComponent: React.FC = () => {
  const [values, setValues] = useState<TreeSelectValue[]>([])

  return (
    <div className="space-y-4">
      <TreeSelect
        mode="multiple"
        value={values}
        onChange={(val) => setValues(Array.isArray(val) ? val : [])}
        treeData={basicTreeData}
        placeholder="Select multiple items"
        defaultExpandedKeys={['1', '2']}
        maxTagCount={3}
      />
      {values.length > 0 && (
        <div className="text-sm text-gray-600">
          <p>Selected items ({values.length}):</p>
          <ul className="list-disc list-inside mt-1">
            {values.map((val) => (
              <li key={val.key}>{val.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const MultipleMode: Story = {
  render: () => <MultipleModeComponent />,
}

const CheckableModeComponent: React.FC = () => {
  const [values, setValues] = useState<TreeSelectValue[]>([])

  return (
    <div className="space-y-4">
      <TreeSelect
        mode="multiple"
        checkable
        value={values}
        onChange={(val) => setValues(Array.isArray(val) ? val : [])}
        treeData={departmentTreeData}
        placeholder="Select departments with checkboxes"
        defaultExpandedKeys={['engineering', 'marketing']}
        checkStrategy="SHOW_CHILD"
      />
      {values.length > 0 && (
        <div className="text-sm text-gray-600">
          <p>Checked items ({values.length}):</p>
          <ul className="list-disc list-inside mt-1">
            {values.map((val) => (
              <li key={val.key}>{val.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const CheckableMode: Story = {
  render: () => <CheckableModeComponent />,
}

// Search & Filter
const SearchableComponent: React.FC = () => {
  const [value, setValue] = useState<TreeSelectValue>()
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="space-y-4">
      <TreeSelect
        searchable
        showSearch
        value={value}
        onChange={(val) => setValue(val as TreeSelectValue)}
        searchValue={searchValue}
        onSearch={setSearchValue}
        treeData={basicTreeData}
        placeholder="Search and select..."
        searchPlaceholder="Type to search files..."
      />
      {searchValue && (
        <div className="text-sm text-gray-500">
          Searching for: <em>&ldquo;{searchValue}&rdquo;</em>
        </div>
      )}
      {value && (
        <div className="text-sm text-gray-600">
          Selected: <strong>{value.title}</strong>
        </div>
      )}
    </div>
  )
}

export const Searchable: Story = {
  render: () => <SearchableComponent />,
}

// Inline Tree
export const InlineTree: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Inline Tree (No Popup)</h3>
      <ControlledTreeSelect
        inline
        variant="inline-tree"
        treeData={departmentTreeData}
        defaultExpandedKeys={['engineering']}
      />
    </div>
  ),
}

// States
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <ControlledTreeSelect
        disabled
        placeholder="This tree select is disabled"
        defaultValue={{ key: '1-1-1', title: 'Project Plans.pdf' }}
      />
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <div className="space-y-4">
      <ControlledTreeSelect loading placeholder="Loading tree data..." treeData={[]} />
    </div>
  ),
}

// Async Loading
const AsyncLoadingComponent: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      key: '1',
      title: 'Async Folder 1',
      isLeaf: false,
    },
    {
      key: '2',
      title: 'Async Folder 2',
      isLeaf: false,
    },
    {
      key: '3',
      title: 'Regular File',
      isLeaf: true,
    },
  ])

  const loadData = async (node: TreeNode): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newChildren: TreeNode[] = [
          {
            key: `${node.key}-1`,
            title: `Child 1 of ${node.title}`,
            isLeaf: true,
          },
          {
            key: `${node.key}-2`,
            title: `Child 2 of ${node.title}`,
            isLeaf: true,
          },
          {
            key: `${node.key}-3`,
            title: `Subfolder of ${node.title}`,
            isLeaf: false,
          },
        ]

        const updateNode = (nodes: TreeNode[]): TreeNode[] => {
          return nodes.map((n) => {
            if (n.key === node.key) {
              return { ...n, children: newChildren, loading: false }
            }
            if (n.children) {
              return { ...n, children: updateNode(n.children) }
            }
            return n
          })
        }

        setTreeData((prev) => updateNode(prev))
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Async Loading</h3>
      <p className="text-sm text-gray-600">Click on folder icons to load children asynchronously</p>
      <ControlledTreeSelect
        treeData={treeData}
        loadData={loadData}
        placeholder="Select from async tree"
      />
    </div>
  )
}

export const AsyncLoading: Story = {
  render: () => <AsyncLoadingComponent />,
}

// Custom Rendering
const CustomRenderingComponent: React.FC = () => {
  const [value, setValue] = useState<TreeSelectValue[]>([])

  const renderNode = (
    node: TreeNode,
    { selected, level }: { selected: boolean; level: number }
  ) => (
    <div
      className={`flex items-center py-1 px-2 rounded ${
        selected ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
      }`}
      style={{ marginLeft: `${level * 16}px` }}
    >
      <span className="mr-2">{node.icon || '📄'}</span>
      <span className="font-medium">{node.title}</span>
      {node.children && (
        <span className="ml-auto text-xs text-gray-500">{node.children.length} items</span>
      )}
    </div>
  )

  const renderTag = ({ value, onClose }: { value: TreeSelectValue; onClose: () => void }) => (
    <span className="inline-flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm mr-1 mb-1">
      <span className="mr-1">🎯</span>
      {value.title}
      <button onClick={onClose} className="ml-1 text-purple-500 hover:text-purple-700">
        ×
      </button>
    </span>
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Rendering</h3>
      <p className="text-sm text-gray-600">Custom node and tag rendering with icons and styling</p>
      <TreeSelect
        mode="multiple"
        value={value}
        onChange={(val) => setValue(Array.isArray(val) ? val : [])}
        treeData={basicTreeData}
        renderNode={renderNode}
        renderTag={renderTag}
        placeholder="Select with custom rendering"
        maxTagCount={2}
      />
    </div>
  )
}

export const CustomRendering: Story = {
  render: () => <CustomRenderingComponent />,
}

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Styling</h3>
      <ControlledTreeSelect
        placeholder="Custom styled tree select"
        borderRadius="12px"
        borderColor="#6366f1"
        backgroundColor="#f8fafc"
        selectedColor="#6366f1"
        focusRingColor="#6366f1"
        treeData={departmentTreeData}
      />
    </div>
  ),
}

// Form Integration
const FormIntegrationComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    department: undefined as TreeSelectValue | undefined,
    skills: [] as TreeSelectValue[],
    primaryTool: undefined as TreeSelectValue | undefined,
  })

  const skillsData: TreeNode[] = [
    {
      key: 'programming',
      title: 'Programming',
      children: [
        { key: 'javascript', title: 'JavaScript' },
        { key: 'typescript', title: 'TypeScript' },
        { key: 'python', title: 'Python' },
        { key: 'java', title: 'Java' },
      ],
    },
    {
      key: 'design',
      title: 'Design',
      children: [
        { key: 'ui-design', title: 'UI Design' },
        { key: 'ux-design', title: 'UX Design' },
        { key: 'graphic-design', title: 'Graphic Design' },
      ],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold">Employee Information</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Department *</label>
        <TreeSelect
          value={formData.department}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, department: val as TreeSelectValue }))
          }
          treeData={departmentTreeData}
          placeholder="Select your department"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Skills</label>
        <TreeSelect
          mode="multiple"
          checkable
          value={formData.skills}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, skills: Array.isArray(val) ? val : [] }))
          }
          treeData={skillsData}
          placeholder="Select your skills"
          maxTagCount={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Primary Tool</label>
        <TreeSelect
          searchable
          value={formData.primaryTool}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, primaryTool: val as TreeSelectValue }))
          }
          treeData={skillsData}
          placeholder="Search and select your primary tool"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Submit Form
      </button>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}

// Accessibility Example
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Accessibility Features</h3>
      <ControlledTreeSelect
        aria-label="File and folder selection"
        placeholder="Navigate with keyboard"
        treeData={basicTreeData}
        defaultExpandedKeys={['1']}
      />
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <h4 className="font-medium mb-2">Keyboard Controls:</h4>
        <ul className="space-y-1">
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Tab</kbd> - Focus tree select
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter/Space</kbd> - Open/select
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">↑↓</kbd> - Navigate options
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">←→</kbd> - Expand/collapse
          </li>
          <li>
            <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Escape</kbd> - Close dropdown
          </li>
        </ul>
      </div>
    </div>
  ),
}

// Performance Example
const PerformanceComponent: React.FC = () => {
  const generateLargeTree = (depth: number, breadth: number, prefix = ''): TreeNode[] => {
    if (depth === 0) return []

    return Array.from({ length: breadth }, (_, i) => ({
      key: `${prefix}${i}`,
      title: `${prefix ? `${prefix} - ` : ''}Node ${i}`,
      children: depth > 1 ? generateLargeTree(depth - 1, breadth, `${prefix}${i}-`) : undefined,
    }))
  }

  const largeTreeData = generateLargeTree(4, 5) // 5^4 = 625 nodes

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Performance (Large Dataset)</h3>
      <p className="text-sm text-gray-600">
        This tree contains 625 nodes across 4 levels. Search to filter the tree.
      </p>
      <ControlledTreeSelect
        searchable
        treeData={largeTreeData}
        placeholder="Search in large tree..."
        defaultExpandedKeys={['0', '1']}
      />
    </div>
  )
}

export const Performance: Story = {
  render: () => <PerformanceComponent />,
}

// Compound Components Example
const CompoundComponentsComponent: React.FC = () => {
  const [value, setValue] = useState<TreeSelectValue>()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compound Components Usage</h3>
      <p className="text-sm text-gray-600">
        Example using TreeSelect compound components for custom structure
      </p>

      <TreeSelect
        value={value}
        onChange={(val) => setValue(val as TreeSelectValue)}
        open={open}
        onDropdownVisibleChange={setOpen}
        treeData={basicTreeData}
        placeholder="Click to open custom tree"
      >
        <TreeSelect.Input placeholder="Search files and folders..." />
        <TreeSelect.Popup>
          <div className="p-2 border-b bg-gray-50">
            <h4 className="font-medium text-sm">File Browser</h4>
            <p className="text-xs text-gray-500">Select a file or folder</p>
          </div>
          {/* Tree nodes will be rendered automatically here */}
          <div className="p-2 border-t bg-gray-50 text-xs text-gray-500">
            Total items: {basicTreeData.length} folders
          </div>
        </TreeSelect.Popup>
      </TreeSelect>

      {value && (
        <div className="text-sm text-gray-600">
          Selected with compound components: <strong>{value.title}</strong>
        </div>
      )}
    </div>
  )
}

export const CompoundComponents: Story = {
  render: () => <CompoundComponentsComponent />,
}

// ============================================================================
// Real-World Examples
// ============================================================================

// Location Picker Example
const LocationPickerComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<TreeSelectValue>()

  const locationData: TreeNode[] = [
    {
      key: 'north-america',
      title: 'North America',
      icon: '🌎',
      children: [
        {
          key: 'usa',
          title: 'United States',
          icon: '🇺🇸',
          children: [
            {
              key: 'california',
              title: 'California',
              children: [
                { key: 'san-francisco', title: 'San Francisco', icon: '🌉' },
                { key: 'los-angeles', title: 'Los Angeles', icon: '🌴' },
                { key: 'san-diego', title: 'San Diego', icon: '🏖️' },
              ],
            },
            {
              key: 'new-york',
              title: 'New York',
              children: [
                { key: 'nyc', title: 'New York City', icon: '🗽' },
                { key: 'albany', title: 'Albany', icon: '🏛️' },
                { key: 'buffalo', title: 'Buffalo', icon: '❄️' },
              ],
            },
            {
              key: 'texas',
              title: 'Texas',
              children: [
                { key: 'houston', title: 'Houston', icon: '🚀' },
                { key: 'dallas', title: 'Dallas', icon: '🤠' },
                { key: 'austin', title: 'Austin', icon: '🎸' },
              ],
            },
          ],
        },
        {
          key: 'canada',
          title: 'Canada',
          icon: '🇨🇦',
          children: [
            {
              key: 'ontario',
              title: 'Ontario',
              children: [
                { key: 'toronto', title: 'Toronto', icon: '🏙️' },
                { key: 'ottawa', title: 'Ottawa', icon: '🍁' },
              ],
            },
            {
              key: 'british-columbia',
              title: 'British Columbia',
              children: [
                { key: 'vancouver', title: 'Vancouver', icon: '🏔️' },
                { key: 'victoria', title: 'Victoria', icon: '🌸' },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'europe',
      title: 'Europe',
      icon: '🌍',
      children: [
        {
          key: 'uk',
          title: 'United Kingdom',
          icon: '🇬🇧',
          children: [
            { key: 'london', title: 'London', icon: '🎭' },
            { key: 'manchester', title: 'Manchester', icon: '⚽' },
            { key: 'edinburgh', title: 'Edinburgh', icon: '🏰' },
          ],
        },
        {
          key: 'germany',
          title: 'Germany',
          icon: '🇩🇪',
          children: [
            { key: 'berlin', title: 'Berlin', icon: '🚪' },
            { key: 'munich', title: 'Munich', icon: '🍺' },
            { key: 'hamburg', title: 'Hamburg', icon: '⚓' },
          ],
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🗺️ Location Picker</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Select delivery location for an e-commerce app
      </p>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="font-medium mb-2">📦 Delivery Address</h4>
        <TreeSelect
          searchable
          value={selectedLocation}
          onChange={(val) => setSelectedLocation(val as TreeSelectValue)}
          treeData={locationData}
          placeholder="Select your delivery location..."
          defaultExpandedKeys={['north-america', 'usa']}
          className="w-full"
        />

        {selectedLocation && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              <span className="font-medium">Delivery Location:</span> {selectedLocation.title}
            </p>
            <p className="text-xs text-green-600 mt-1">Estimated delivery: 2-3 business days</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const LocationPicker: Story = {
  render: () => <LocationPickerComponent />,
}

// Organization Chart Example
const OrganizationChartComponent: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<TreeSelectValue>()

  const orgData: TreeNode[] = [
    {
      key: 'ceo',
      title: 'Sarah Johnson - CEO',
      icon: '👩‍💼',
      children: [
        {
          key: 'cto',
          title: 'Mike Chen - CTO',
          icon: '👨‍💻',
          children: [
            {
              key: 'engineering',
              title: 'Engineering Department',
              icon: '⚙️',
              children: [
                {
                  key: 'frontend-team',
                  title: 'Frontend Team',
                  icon: '🎨',
                  children: [
                    { key: 'alex-react', title: 'Alex Thompson - React Lead', icon: '👨‍💻' },
                    { key: 'emma-ui', title: 'Emma Davis - UI Designer', icon: '👩‍🎨' },
                    { key: 'sam-frontend', title: 'Sam Rodriguez - Frontend Dev', icon: '👨‍💻' },
                  ],
                },
                {
                  key: 'backend-team',
                  title: 'Backend Team',
                  icon: '🔧',
                  children: [
                    { key: 'john-backend', title: 'John Wilson - Backend Lead', icon: '👨‍💻' },
                    { key: 'lisa-api', title: 'Lisa Park - API Developer', icon: '👩‍💻' },
                    { key: 'david-devops', title: 'David Kim - DevOps Engineer', icon: '🚀' },
                  ],
                },
              ],
            },
            {
              key: 'qa-team',
              title: 'Quality Assurance',
              icon: '🧪',
              children: [
                { key: 'maria-qa', title: 'Maria Garcia - QA Lead', icon: '👩‍💼' },
                { key: 'tom-automation', title: 'Tom Brown - Automation Engineer', icon: '🤖' },
              ],
            },
          ],
        },
        {
          key: 'cfo',
          title: 'Robert Taylor - CFO',
          icon: '💼',
          children: [
            {
              key: 'finance',
              title: 'Finance Department',
              icon: '💰',
              children: [
                { key: 'anna-finance', title: 'Anna White - Finance Manager', icon: '👩‍💼' },
                { key: 'james-accounting', title: 'James Lee - Senior Accountant', icon: '👨‍💼' },
              ],
            },
          ],
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🏢 Organization Chart</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Employee directory and project assignment system
      </p>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="font-medium mb-2">👥 Assign Project Member</h4>
        <TreeSelect
          searchable
          value={selectedEmployee}
          onChange={(val) => setSelectedEmployee(val as TreeSelectValue)}
          treeData={orgData}
          placeholder="Select team member for project..."
          defaultExpandedKeys={['ceo', 'cto', 'engineering']}
          className="w-full"
        />

        {selectedEmployee && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Assigned to:</span> {selectedEmployee.title}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Project: React Component Library Development
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const OrganizationChart: Story = {
  render: () => <OrganizationChartComponent />,
}

// Permission Management Example
const PermissionManagerComponent: React.FC = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<TreeSelectValue[]>([])

  const permissionData: TreeNode[] = [
    {
      key: 'admin',
      title: 'Admin Panel',
      icon: '⚙️',
      children: [
        {
          key: 'user-management',
          title: 'User Management',
          icon: '👥',
          children: [
            { key: 'create-user', title: 'Create Users', icon: '➕' },
            { key: 'edit-user', title: 'Edit Users', icon: '✏️' },
            { key: 'delete-user', title: 'Delete Users', icon: '🗑️' },
            { key: 'view-user', title: 'View Users', icon: '👁️' },
          ],
        },
        {
          key: 'role-management',
          title: 'Role Management',
          icon: '🎭',
          children: [
            { key: 'create-role', title: 'Create Roles', icon: '➕' },
            { key: 'assign-role', title: 'Assign Roles', icon: '🔗' },
            { key: 'modify-permissions', title: 'Modify Permissions', icon: '🔧' },
          ],
        },
        {
          key: 'system-settings',
          title: 'System Settings',
          icon: '⚙️',
          children: [
            { key: 'backup-restore', title: 'Backup & Restore', icon: '💾' },
            { key: 'email-config', title: 'Email Configuration', icon: '📧' },
            { key: 'security-settings', title: 'Security Settings', icon: '🔒' },
          ],
        },
      ],
    },
    {
      key: 'content',
      title: 'Content Management',
      icon: '📝',
      children: [
        {
          key: 'articles',
          title: 'Articles',
          icon: '📄',
          children: [
            { key: 'create-article', title: 'Create Articles', icon: '✍️' },
            { key: 'edit-article', title: 'Edit Articles', icon: '✏️' },
            { key: 'publish-article', title: 'Publish Articles', icon: '🚀' },
            { key: 'delete-article', title: 'Delete Articles', icon: '🗑️' },
          ],
        },
        {
          key: 'media',
          title: 'Media Library',
          icon: '🖼️',
          children: [
            { key: 'upload-media', title: 'Upload Media', icon: '⬆️' },
            { key: 'organize-media', title: 'Organize Media', icon: '📁' },
            { key: 'delete-media', title: 'Delete Media', icon: '🗑️' },
          ],
        },
      ],
    },
    {
      key: 'analytics',
      title: 'Analytics & Reports',
      icon: '📊',
      children: [
        { key: 'view-analytics', title: 'View Analytics Dashboard', icon: '📈' },
        { key: 'export-reports', title: 'Export Reports', icon: '📄' },
        { key: 'user-activity', title: 'View User Activity', icon: '👀' },
        { key: 'system-logs', title: 'Access System Logs', icon: '📋' },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🔐 Permission Manager</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Configure role-based permissions for team members
      </p>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">🎭 Editor Role Permissions</h4>
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
            {selectedPermissions.length} permissions selected
          </span>
        </div>

        <TreeSelect
          mode="multiple"
          checkable
          value={selectedPermissions}
          onChange={(val) => setSelectedPermissions(Array.isArray(val) ? val : [])}
          treeData={permissionData}
          placeholder="Select permissions for this role..."
          defaultExpandedKeys={['content', 'articles']}
          maxTagCount={3}
          className="w-full"
          checkStrategy="SHOW_CHILD"
        />

        {selectedPermissions.length > 0 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded">
            <h5 className="font-medium text-sm text-orange-800 mb-2">
              Selected Permissions ({selectedPermissions.length}):
            </h5>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {selectedPermissions.slice(0, 8).map((perm) => (
                <div key={perm.key} className="text-orange-700">
                  • {perm.title}
                </div>
              ))}
              {selectedPermissions.length > 8 && (
                <div className="text-orange-600 italic col-span-2">
                  ... and {selectedPermissions.length - 8} more
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700">
                Save Role
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                Preview Access
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const PermissionManager: Story = {
  render: () => <PermissionManagerComponent />,
}

// E-commerce Category Picker
const EcommerceCategoryPickerComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TreeSelectValue>()

  const categoryData: TreeNode[] = [
    {
      key: 'electronics',
      title: 'Electronics',
      icon: '📱',
      children: [
        {
          key: 'smartphones',
          title: 'Smartphones & Tablets',
          icon: '📱',
          children: [
            { key: 'iphone', title: 'iPhone', icon: '📱' },
            { key: 'android', title: 'Android Phones', icon: '📱' },
            { key: 'tablets', title: 'Tablets', icon: '📱' },
            { key: 'accessories-mobile', title: 'Mobile Accessories', icon: '🔌' },
          ],
        },
        {
          key: 'computers',
          title: 'Computers & Laptops',
          icon: '💻',
          children: [
            { key: 'laptops', title: 'Laptops', icon: '💻' },
            { key: 'desktops', title: 'Desktop Computers', icon: '🖥️' },
            { key: 'monitors', title: 'Monitors', icon: '🖥️' },
            { key: 'accessories-computer', title: 'Computer Accessories', icon: '⌨️' },
          ],
        },
        {
          key: 'audio',
          title: 'Audio & Headphones',
          icon: '🎧',
          children: [
            { key: 'headphones', title: 'Headphones', icon: '🎧' },
            { key: 'speakers', title: 'Speakers', icon: '🔊' },
            { key: 'earbuds', title: 'Wireless Earbuds', icon: '🎧' },
          ],
        },
      ],
    },
    {
      key: 'clothing',
      title: 'Clothing & Fashion',
      icon: '👕',
      children: [
        {
          key: 'mens-clothing',
          title: "Men's Clothing",
          icon: '👔',
          children: [
            { key: 'mens-shirts', title: 'Shirts & T-Shirts', icon: '👕' },
            { key: 'mens-pants', title: 'Pants & Jeans', icon: '👖' },
            { key: 'mens-shoes', title: 'Shoes & Sneakers', icon: '👟' },
            { key: 'mens-accessories', title: 'Accessories', icon: '👜' },
          ],
        },
        {
          key: 'womens-clothing',
          title: "Women's Clothing",
          icon: '👗',
          children: [
            { key: 'womens-dresses', title: 'Dresses', icon: '👗' },
            { key: 'womens-tops', title: 'Tops & Blouses', icon: '👚' },
            { key: 'womens-bottoms', title: 'Bottoms', icon: '👖' },
            { key: 'womens-shoes', title: 'Shoes & Heels', icon: '👠' },
          ],
        },
      ],
    },
    {
      key: 'home-garden',
      title: 'Home & Garden',
      icon: '🏠',
      children: [
        {
          key: 'furniture',
          title: 'Furniture',
          icon: '🪑',
          children: [
            { key: 'living-room', title: 'Living Room', icon: '🛋️' },
            { key: 'bedroom', title: 'Bedroom', icon: '🛏️' },
            { key: 'kitchen', title: 'Kitchen & Dining', icon: '🍽️' },
            { key: 'office', title: 'Office Furniture', icon: '💼' },
          ],
        },
        {
          key: 'decor',
          title: 'Home Decor',
          icon: '🖼️',
          children: [
            { key: 'wall-art', title: 'Wall Art', icon: '🎨' },
            { key: 'lighting', title: 'Lighting', icon: '💡' },
            { key: 'rugs', title: 'Rugs & Carpets', icon: '🟫' },
            { key: 'pillows', title: 'Pillows & Cushions', icon: '🛋️' },
          ],
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">🛒 E-commerce Category Picker</h3>
      <p className="text-sm text-gray-600">
        Real-world example: Product category selection in a listing form
      </p>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="font-medium mb-2">📝 Product Listing</h4>
        <TreeSelect
          searchable
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val as TreeSelectValue)}
          treeData={categoryData}
          placeholder="Select product category..."
          defaultExpandedKeys={['electronics', 'clothing']}
          className="w-full"
        />

        {selectedCategory && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">
              <span className="font-medium">Category:</span> {selectedCategory.title}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Your product will be listed under this category
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const EcommerceCategoryPicker: Story = {
  render: () => <EcommerceCategoryPickerComponent />,
}
