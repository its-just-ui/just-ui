import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Table } from './Table'
import type {
  ColumnDef,
  SelectionModel,
  SortDescriptor,
  FilterDescriptor,
  ExpandedState,
  EditingState,
  RowData,
} from './types'
import { Button } from '../Button'
import { Input } from '../Input'
import { Badge } from '../Badge'
import { Avatar } from '../Avatar'
import { Select } from '../Select'
import { Pagination } from '../Pagination'
import { Skeleton } from '../Skeleton'
import { Card, CardHeader, CardBody } from '../Card'

// Icon components to use in stories
const Users: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const Building: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
)

const Activity: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
)

const MoreVertical: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
)

const Package: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

const _DollarSign: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

const _TrendingUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

const _TrendingDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
)

const _FileText: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const _Settings: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m4.22-10.22l1.42-1.42m-1.42 11.31l1.42 1.42M20 12h-6m-6 0H2m10.22-4.22l-1.42-1.42m1.42 11.31l-1.42 1.42"></path>
  </svg>
)

const _Upload: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
)

const _Download: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

// Sample data types
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  department: string
  location: string
  joinDate: string
  avatar?: string
  [key: string]: unknown // To make it compatible with RowData
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  sales: number
  revenue: number
  trend: 'up' | 'down' | 'stable'
  [key: string]: unknown // To make it compatible with RowData
}

interface Order {
  id: string
  customer: string
  email: string
  product: string
  quantity: number
  price: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  paymentMethod: string
  shippingAddress: string
  [key: string]: unknown // To make it compatible with RowData
}

// Generate sample data
const generateUsers = (count: number): User[] => {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']
  const locations = ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin']
  const roles = ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst']
  const statuses: User['status'][] = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    department: departments[i % departments.length],
    location: locations[i % locations.length],
    joinDate: new Date(2020 + Math.floor(i / 50), i % 12, (i % 28) + 1).toISOString().split('T')[0],
    avatar: `https://i.pravatar.cc/150?u=user${i + 1}`,
  }))
}

const generateProducts = (count: number): Product[] => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys']
  const statuses: Product['status'][] = ['in-stock', 'low-stock', 'out-of-stock']
  const trends: Product['trend'][] = ['up', 'down', 'stable']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.round(Math.random() * 1000) / 10,
    stock: Math.floor(Math.random() * 100),
    status: statuses[i % statuses.length],
    sales: Math.floor(Math.random() * 1000),
    revenue: Math.round(Math.random() * 100000) / 100,
    trend: trends[i % trends.length],
  }))
}

const generateOrders = (count: number): Order[] => {
  const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson']
  const products = ['Laptop', 'Phone', 'Tablet', 'Headphones', 'Watch']
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash', 'Crypto']

  return Array.from({ length: count }, (_, i) => {
    const quantity = Math.floor(Math.random() * 10) + 1
    const price = Math.round(Math.random() * 1000) / 10
    return {
      id: `ORD-${String(i + 1).padStart(5, '0')}`,
      customer: customers[i % customers.length],
      email: `${customers[i % customers.length].toLowerCase().replace(' ', '.')}@example.com`,
      product: products[i % products.length],
      quantity,
      price,
      total: quantity * price,
      status: statuses[i % statuses.length],
      date: new Date(2024, 0, (i % 365) + 1).toISOString().split('T')[0],
      paymentMethod: paymentMethods[i % paymentMethods.length],
      shippingAddress: `${100 + i} Main Street, City ${i % 10}, State`,
    }
  })
}

/**
 * Table component provides a comprehensive data display solution with advanced features.
 *
 * ## Features
 * - Compound component architecture for maximum flexibility
 * - Sorting (single and multi-column)
 * - Filtering (column-level and global)
 * - Selection (single, multiple, with keyboard support)
 * - Pagination (client and server-side)
 * - Row expansion with custom content
 * - Inline cell editing
 * - Row grouping
 * - Virtualization support
 * - Sticky headers and columns
 * - Column resizing and reordering
 * - Comprehensive keyboard navigation
 * - Full accessibility with ARIA attributes
 * - Extensive styling customization
 * - Custom renderers for all components
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * const columns = [
 *   { id: 'name', header: 'Name', accessorKey: 'name' },
 *   { id: 'email', header: 'Email', accessorKey: 'email' },
 *   { id: 'role', header: 'Role', accessorKey: 'role' }
 * ]
 *
 * const data = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
 * ]
 *
 * <Table data={data} columns={columns} />
 * ```
 *
 * ### With Selection:
 * ```tsx
 * <Table
 *   data={data}
 *   columns={columns}
 *   selectionMode="multiple"
 *   onSelectionChange={(selection) => console.log(selection)}
 * />
 * ```
 *
 * ### With Sorting:
 * ```tsx
 * <Table
 *   data={data}
 *   columns={columns}
 *   enableSorting
 *   enableMultiSort
 *   onSortChange={(sort) => console.log(sort)}
 * />
 * ```
 *
 * ### With Pagination:
 * ```tsx
 * <Table
 *   data={data}
 *   columns={columns}
 *   enablePagination
 *   pagination={{ pageIndex: 0, pageSize: 10 }}
 *   onPaginationChange={(pagination) => console.log(pagination)}
 * />
 * ```
 *
 * ### With Custom Cell Rendering:
 * ```tsx
 * const columns = [
 *   {
 *     id: 'status',
 *     header: 'Status',
 *     accessorKey: 'status',
 *     cell: ({ value }) => (
 *       <Badge variant={value === 'active' ? 'success' : 'secondary'}>
 *         {value as React.ReactNode}
 *       </Badge>
 *     )
 *   }
 * ]
 * ```
 */
const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Data
    data: {
      description: 'Array of data objects to display in the table',
      control: { type: 'object' },
    },
    columns: {
      description: 'Array of column definitions',
      control: { type: 'object' },
    },
    getRowId: {
      description: 'Function to get unique row ID',
      control: false,
    },

    // Variants & Styling
    variant: {
      description: 'Visual variant of the table',
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered', 'minimal', 'card-style', 'compact'],
    },
    size: {
      description: 'Size of the table',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },

    // States
    loading: {
      description: 'Whether the table is in loading state',
      control: { type: 'boolean' },
    },
    loadingComponent: {
      description: 'Custom loading component',
      control: false,
    },
    empty: {
      description: 'Whether the table is empty',
      control: { type: 'boolean' },
    },
    emptyComponent: {
      description: 'Custom empty state component',
      control: false,
    },
    disabled: {
      description: 'Whether the table is disabled',
      control: { type: 'boolean' },
    },

    // Selection
    selectionMode: {
      description: 'Row selection mode',
      control: { type: 'select' },
      options: ['none', 'single', 'multiple'],
    },
    selectedRows: {
      description: 'Set of selected row IDs (controlled)',
      control: false,
    },
    defaultSelectedRows: {
      description: 'Default selected rows',
      control: false,
    },
    onSelectionChange: {
      description: 'Callback when selection changes',
      control: false,
    },

    // Sorting
    enableSorting: {
      description: 'Enable column sorting',
      control: { type: 'boolean' },
    },
    enableMultiSort: {
      description: 'Enable multi-column sorting',
      control: { type: 'boolean' },
    },
    sort: {
      description: 'Current sort state (controlled)',
      control: false,
    },
    onSortChange: {
      description: 'Callback when sort changes',
      control: false,
    },

    // Filtering
    enableFiltering: {
      description: 'Enable column filtering',
      control: { type: 'boolean' },
    },
    filters: {
      description: 'Current filter state (controlled)',
      control: false,
    },
    onFiltersChange: {
      description: 'Callback when filters change',
      control: false,
    },

    // Pagination
    enablePagination: {
      description: 'Enable pagination',
      control: { type: 'boolean' },
    },
    paginationMode: {
      description: 'Pagination mode',
      control: { type: 'select' },
      options: ['client', 'server'],
    },
    pagination: {
      description: 'Current pagination state (controlled)',
      control: false,
    },
    onPaginationChange: {
      description: 'Callback when pagination changes',
      control: false,
    },

    // Expansion
    enableExpanding: {
      description: 'Enable row expansion',
      control: { type: 'boolean' },
    },
    expandedRows: {
      description: 'Set of expanded row IDs (controlled)',
      control: false,
    },
    onExpandedChange: {
      description: 'Callback when expansion changes',
      control: false,
    },

    // Editing
    editMode: {
      description: 'Cell editing mode',
      control: { type: 'select' },
      options: ['none', 'cell', 'row', 'inline'],
    },

    // Style customization
    borderWidth: {
      description: 'Border width',
      control: { type: 'text' },
    },
    borderColor: {
      description: 'Border color',
      control: { type: 'color' },
    },
    borderRadius: {
      description: 'Border radius',
      control: { type: 'text' },
    },
    fontSize: {
      description: 'Font size',
      control: { type: 'text' },
    },
    textColor: {
      description: 'Text color',
      control: { type: 'color' },
    },
    backgroundColor: {
      description: 'Background color',
      control: { type: 'color' },
    },
    rowHoverBackground: {
      description: 'Row hover background color',
      control: { type: 'color' },
    },
    rowSelectedBackground: {
      description: 'Selected row background color',
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

// Basic table story
export const Default: Story = {
  args: {
    data: generateUsers(10) as RowData[],
    columns: [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
      { id: 'department', header: 'Department', accessorKey: 'department' },
      { id: 'status', header: 'Status', accessorKey: 'status' },
    ],
  },
}

// Variants showcase
export const Variants: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const data = generateUsers(5) as RowData[]
    const columns = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Default</h3>
          <Table data={data} columns={columns} variant="default" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Striped</h3>
          <Table data={data} columns={columns} variant="striped" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Bordered</h3>
          <Table data={data} columns={columns} variant="bordered" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Minimal</h3>
          <Table data={data} columns={columns} variant="minimal" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Card Style</h3>
          <Table data={data} columns={columns} variant="card-style" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Compact</h3>
          <Table data={data} columns={columns} variant="compact" />
        </div>
      </div>
    )
  },
}

// Sizes showcase
export const Sizes: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const data = generateUsers(3) as RowData[]
    const columns = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Small</h3>
          <Table data={data} columns={columns} size="sm" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Medium</h3>
          <Table data={data} columns={columns} size="md" />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Large</h3>
          <Table data={data} columns={columns} size="lg" />
        </div>
      </div>
    )
  },
}

// States showcase
export const States: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const columns = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Loading State</h3>
          <Table data={[]} columns={columns} loading loadingComponent={<Table.Loading />} />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Empty State</h3>
          <Table
            data={[]}
            columns={columns}
            emptyComponent={
              <Table.Empty message="No users found" action={<Button size="sm">Add User</Button>} />
            }
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Disabled State</h3>
          <Table data={generateUsers(3) as RowData[]} columns={columns} disabled />
        </div>
      </div>
    )
  },
}

// Custom cell rendering
export const CustomCellRendering: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const data = generateUsers(10) as RowData[] as RowData[]
    const columns = [
      {
        id: 'user',
        header: 'User',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar src={row.avatar as string} alt={row.name as string} size="sm" />
            <div>
              <div className="font-medium">{row.name as React.ReactNode}</div>
              <div className="text-sm text-muted-foreground">{row.email as React.ReactNode}</div>
            </div>
          </div>
        ),
      },
      {
        id: 'role',
        header: 'Role',
        accessorKey: 'role',
        cell: ({ value }) => (
          <Badge variant="outlined">
            <Users className="mr-1 h-3 w-3" />
            {value as React.ReactNode}
          </Badge>
        ),
      },
      {
        id: 'department',
        header: 'Department',
        accessorKey: 'department',
        cell: ({ value }) => (
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            {value as React.ReactNode}
          </div>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ value }) => {
          const statusConfig = {
            active: { variant: 'default' as const, icon: Activity },
            inactive: { variant: 'ghost' as const, icon: null },
            pending: { variant: 'filled' as const, icon: null },
          }
          const config = statusConfig[value as keyof typeof statusConfig]
          return (
            <Badge variant={config.variant}>
              {config.icon && <config.icon className="mr-1 h-3 w-3" />}
              {value as React.ReactNode}
            </Badge>
          )
        },
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: () => (
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        ),
      },
    ]

    return <Table data={data} columns={columns} />
  },
}

// Selection examples
const SelectionComponent = () => {
  const data = generateUsers(10) as RowData[]
  const columns = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'role', header: 'Role', accessorKey: 'role' },
  ]

  const [singleSelection, setSingleSelection] = useState<SelectionModel>(new Set())
  const [multiSelection, setMultiSelection] = useState<SelectionModel>(new Set())

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Single Selection</h3>
        <Table
          data={data}
          columns={columns}
          selectionMode="single"
          selectedRows={singleSelection}
          onSelectionChange={setSingleSelection}
        />
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {Array.from(singleSelection).join(', ') || 'None'}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Multiple Selection</h3>
        <Table
          data={data}
          columns={columns}
          selectionMode="multiple"
          selectedRows={multiSelection}
          onSelectionChange={setMultiSelection}
        />
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {Array.from(multiSelection).join(', ') || 'None'}
        </div>
      </div>
    </div>
  )
}

export const Selection: Story = {
  args: { data: [], columns: [] },
  render: () => <SelectionComponent />,
}

// Sorting examples
const SortingComponent = () => {
  const data = generateProducts(20) as RowData[]
  const columns = [
    { id: 'name', header: 'Product', accessorKey: 'name', sortable: true },
    { id: 'category', header: 'Category', accessorKey: 'category', sortable: true },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      sortable: true,
      cell: ({ value }) => `$${(value as number).toFixed(2)}`,
    },
    {
      id: 'stock',
      header: 'Stock',
      accessorKey: 'stock',
      sortable: true,
      cell: ({ value, row }) => (
        <Badge
          variant={
            row.status === 'in-stock'
              ? 'default'
              : row.status === 'low-stock'
                ? 'filled'
                : 'outlined'
          }
        >
          {value as React.ReactNode} units
        </Badge>
      ),
    },
    {
      id: 'sales',
      header: 'Sales',
      accessorKey: 'sales',
      sortable: true,
    },
  ]

  const [sort, setSort] = useState<SortDescriptor[]>([])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Click headers to sort (Shift+Click for multi-sort)
        </h3>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setSort([])}
          disabled={sort.length === 0}
        >
          Clear Sort
        </Button>
      </div>
      <Table
        data={data}
        columns={columns}
        enableSorting
        enableMultiSort
        sort={sort}
        onSortChange={setSort}
      />
      {sort.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Sorting by: {sort.map((s) => `${s.columnId} (${s.direction})`).join(', ')}
        </div>
      )}
    </div>
  )
}

export const Sorting: Story = {
  args: { data: [], columns: [] },
  render: () => <SortingComponent />,
}

// Filtering examples
const FilteringComponent = () => {
  const data = generateOrders(50) as RowData[]
  const [filters, setFilters] = useState<FilterDescriptor[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = [
    { id: 'id', header: 'Order ID', accessorKey: 'id', filterable: true },
    { id: 'customer', header: 'Customer', accessorKey: 'customer', filterable: true },
    { id: 'product', header: 'Product', accessorKey: 'product', filterable: true },
    {
      id: 'total',
      header: 'Total',
      accessorKey: 'total',
      cell: ({ value }) => `$${(value as number).toFixed(2)}`,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      filterable: true,
      cell: ({ value }) => {
        const statusConfig = {
          pending: { variant: 'filled' as const },
          processing: { variant: 'solid' as const },
          shipped: { variant: 'default' as const },
          delivered: { variant: 'default' as const },
          cancelled: { variant: 'outlined' as const },
        }
        return (
          <Badge variant={statusConfig[value as keyof typeof statusConfig].variant}>{value}</Badge>
        )
      },
    },
    { id: 'date', header: 'Date', accessorKey: 'date' },
  ]

  const handleColumnFilter = (columnId: string, value: string) => {
    setFilters((prev) => {
      const newFilters = prev.filter((f) => f.columnId !== columnId)
      if (value) {
        newFilters.push({ columnId, value, matchMode: 'contains' })
      }
      return newFilters
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Global Search</h3>
        <Table.GlobalFilter
          value={globalFilter}
          onChange={setGlobalFilter}
          placeholder="Search all columns..."
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Column Filters</h3>
        <div className="grid grid-cols-3 gap-4">
          <Input
            value={(filters.find((f) => f.columnId === 'id')?.value as string) || ''}
            onChange={(e) => handleColumnFilter('id', e.target.value)}
            placeholder="Filter by Order ID..."
          />
          <Input
            value={(filters.find((f) => f.columnId === 'customer')?.value as string) || ''}
            onChange={(e) => handleColumnFilter('customer', e.target.value)}
            placeholder="Filter by Customer..."
          />
          <Input
            value={(filters.find((f) => f.columnId === 'product')?.value as string) || ''}
            onChange={(e) => handleColumnFilter('product', e.target.value)}
            placeholder="Filter by Product..."
          />
        </div>
      </div>
      <Table
        data={data}
        columns={columns}
        enableFiltering
        filters={filters}
        onFiltersChange={setFilters}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />
    </div>
  )
}

export const Filtering: Story = {
  args: { data: [], columns: [] },
  render: () => <FilteringComponent />,
}

// Pagination examples
const PaginationComponent = () => {
  const allData = generateUsers(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const totalPages = Math.ceil(allData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allData.slice(startIndex, endIndex)

  const columns = [
    { id: 'id', header: 'ID', accessorKey: 'id' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'department', header: 'Department', accessorKey: 'department' },
    { id: 'location', header: 'Location', accessorKey: 'location' },
  ]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Client-side Pagination</h3>
      <Table data={currentData} columns={columns}>
        <Table.Header />
        <Table.Body />
      </Table>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <Select
            className="w-16"
            clearable={false}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
            ]}
            value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
            onChange={(option) => {
              const value = Array.isArray(option) ? option[0]?.value : option?.value
              if (typeof value === 'number') handleItemsPerPageChange(value)
            }}
          />
          <span className="ml-2">
            Showing {startIndex + 1} to {Math.min(endIndex, allData.length)} of {allData.length}{' '}
            results
          </span>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={allData.length}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
          showFirstLast
          showPrevNext
          showPageNumbers
          maxPageNumbers={5}
          variant="outlined"
        />
      </div>
    </div>
  )
}

export const TablePagination: Story = {
  args: { data: [], columns: [] },
  render: () => <PaginationComponent />,
}

// Expansion examples
const ExpansionComponent = () => {
  const data = generateUsers(10) as RowData[]
  const [expandedRows, setExpandedRows] = useState<ExpandedState>(new Set())

  const columns = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'role', header: 'Role', accessorKey: 'role' },
  ]

  return (
    <Table
      data={data}
      columns={columns}
      enableExpanding
      expandedRows={expandedRows}
      onExpandedChange={setExpandedRows}
      expandedContent={({ row }) => (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Additional Information</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Department</div>
                <div>{row.department}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Location</div>
                <div>{row.location}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Join Date</div>
                <div>{row.joinDate}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <Badge>{row.status as string}</Badge>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    />
  )
}

export const Expansion: Story = {
  args: { data: [], columns: [] },
  render: () => <ExpansionComponent />,
}

// Editable cells
const EditableCellsComponent = () => {
  const [data, setData] = useState(generateUsers(5) as RowData[])
  const [editingCell, setEditingCell] = useState<EditingState | null>(null)

  const handleEditCommit = async (rowId: string | number, columnId: string, value: unknown) => {
    setData((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          return { ...row, [columnId]: value }
        }
        return row
      })
    )
  }

  const columns = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      editable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      editable: true,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      editable: true,
      editComponent: ({ value, onSave }) => {
        const options = [
          { value: 'Admin', label: 'Admin' },
          { value: 'Manager', label: 'Manager' },
          { value: 'Developer', label: 'Developer' },
          { value: 'Designer', label: 'Designer' },
          { value: 'Analyst', label: 'Analyst' },
        ]
        const currentOption = options.find((opt) => opt.value === value)
        return (
          <Select
            options={options}
            value={currentOption}
            onChange={(option) =>
              onSave(Array.isArray(option) ? option[0]?.value : option?.value || value)
            }
            placeholder="Select role"
          />
        )
      },
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
      editable: true,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Double-click cells to edit</h3>
      <Table
        data={data}
        columns={columns}
        editMode="cell"
        editingCell={editingCell}
        onEditingCellChange={setEditingCell}
        onEditCommit={handleEditCommit}
      />
    </div>
  )
}

export const EditableCells: Story = {
  args: { data: [], columns: [] },
  render: () => <EditableCellsComponent />,
}

// Custom styling example
export const CustomStyling: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const data = generateUsers(5) as RowData[]
    const columns = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
      { id: 'department', header: 'Department', accessorKey: 'department' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Custom Colors & Borders</h3>
          <Table
            data={data}
            columns={columns}
            variant="bordered"
            borderWidth="2px"
            borderColor="#e11d48"
            borderRadius="12px"
            backgroundColor="#fef2f2"
            headerBackgroundColor="#fee2e2"
            headerTextColor="#991b1b"
            rowHoverBackground="#fecaca"
            rowSelectedBackground="#fca5a5"
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Custom Typography & Spacing</h3>
          <Table
            data={data}
            columns={columns}
            fontSize="18px"
            fontWeight="500"
            fontFamily="Georgia, serif"
            padding="20px"
            cellPadding="16px 24px"
            headerPadding="20px 24px"
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Custom Focus Styles</h3>
          <Table
            data={data}
            columns={columns}
            selectionMode="multiple"
            focusRingColor="#8b5cf6"
            focusRingWidth="3px"
            focusRingOffset="2px"
            focusBorderColor="#7c3aed"
            focusBackgroundColor="#f3e8ff"
          />
        </div>
      </div>
    )
  },
}

// Accessibility example
export const Accessibility: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const data = generateUsers(10) as RowData[] as RowData[]
    const columns = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ]

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Keyboard Navigation & Screen Reader Support</h3>
        <p className="text-sm text-muted-foreground">
          Try navigating with keyboard: Arrow keys, Space to select, Enter to expand/edit
        </p>
        <Table
          data={data}
          columns={columns}
          selectionMode="multiple"
          enableExpanding
          expandedContent={({ row }) => (
            <div className="p-4">
              <p>Additional information for {row.name}</p>
              <p>Department: {row.department}</p>
              <p>Location: {row.location}</p>
            </div>
          )}
          aria-label="Users table with keyboard navigation"
          captionComponent={
            <span>
              Table of users with their roles and contact information. Use arrow keys to navigate.
            </span>
          }
        />
      </div>
    )
  },
}

// Form integration example
const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    items: [
      { id: 1, product: 'Laptop', quantity: 1, price: 999.99 },
      { id: 2, product: 'Mouse', quantity: 2, price: 29.99 },
      { id: 3, product: 'Keyboard', quantity: 1, price: 79.99 },
    ],
  })

  const columns = [
    {
      id: 'product',
      header: 'Product',
      accessorKey: 'product',
      editable: true,
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
      editable: true,
      cell: ({ value }) => value as string,
      editComponent: ({ value, onSave, onCancel }) => (
        <Input
          type="number"
          defaultValue={String(value)}
          onBlur={(e) => onSave(parseInt(e.target.value) || 0)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave(parseInt(e.currentTarget.value) || 0)
            if (e.key === 'Escape') onCancel()
          }}
          autoFocus
        />
      ),
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      editable: true,
      cell: ({ value }) => `$${(value as number).toFixed(2)}`,
      editComponent: ({ value, onSave, onCancel }) => (
        <Input
          type="number"
          step="0.01"
          defaultValue={String(value)}
          onBlur={(e) => onSave(parseFloat(e.target.value) || 0)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave(parseFloat(e.currentTarget.value) || 0)
            if (e.key === 'Escape') onCancel()
          }}
          autoFocus
        />
      ),
    },
    {
      id: 'total',
      header: 'Total',
      accessorFn: (row) => (row.quantity as number) * (row.price as number),
      cell: ({ value }) => `$${(value as number).toFixed(2)}`,
    },
  ]

  const handleEditCommit = (rowId: string | number, columnId: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === rowId) {
          return { ...item, [columnId]: value }
        }
        return item
      }),
    }))
  }

  const total = formData.items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Order Form</h3>
        <p className="text-sm text-gray-600">Edit items inline by double-clicking cells</p>
      </CardHeader>
      <CardBody className="space-y-4">
        <div>
          <label className="text-sm font-medium">Customer Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Order Items</label>
          <Table
            data={formData.items}
            columns={columns}
            editMode="cell"
            onEditCommit={handleEditCommit}
            variant="bordered"
          />
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
          <div className="flex gap-2">
            <Button variant="outlined">Cancel</Button>
            <Button>Submit Order</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export const FormIntegration: Story = {
  args: { data: [], columns: [] },
  render: () => <FormIntegrationComponent />,
}

// Styling examples with animations and transitions
const StyledExamplesComponent = () => {
  const data = generateUsers(15) as RowData[]
  const [selectedRows, setSelectedRows] = useState<SelectionModel>(new Set())

  const columns = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.avatar as string} alt={value as string} />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => (
        <Badge
          status={value === 'active' ? 'success' : 'secondary'}
          className="transition-all duration-200 hover:scale-105"
        >
          {value as React.ReactNode}
        </Badge>
      ),
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
      cell: ({ value }) => (
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary inline-block transition-colors duration-200 hover:bg-primary/20">
          {value as React.ReactNode}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="transition-all duration-200 hover:scale-110 hover:shadow-lg"
            onClick={() => alert(`Edit ${row.name}`)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive transition-all duration-200 hover:scale-110 hover:bg-destructive/10"
            onClick={() => alert(`Delete ${row.name}`)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hover Effects & Transitions</h3>
        <Table
          data={data.slice(0, 5)}
          columns={columns}
          variant="bordered"
          className="transition-all duration-300"
          rowClassName="transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer"
          rowHoverBackground="rgba(59, 130, 246, 0.05)"
          onRowClick={(row) => alert(`Clicked on ${row.name}`)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Selection with Animation</h3>
        <Table
          data={data.slice(5, 10)}
          columns={columns}
          variant="striped"
          selectionMode="multiple"
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          rowClassName={(row) => {
            const isSelected = selectedRows.has(row.id)
            return `transition-all duration-300 ${
              isSelected
                ? 'scale-[1.01] shadow-lg bg-primary/5 border-l-4 border-primary'
                : 'hover:bg-gray-50'
            }`
          }}
          cellClassName="transition-all duration-200"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Card Style with Click Effects</h3>
        <Table
          data={data.slice(10, 15)}
          columns={columns}
          variant="card-style"
          className="overflow-visible"
          rowClassName="mb-4 transition-all duration-300 hover:translate-x-2 hover:shadow-xl cursor-pointer bg-white rounded-lg border"
          cellPadding="1rem"
          borderRadius="0.5rem"
          boxShadow="0 1px 3px 0 rgb(0 0 0 / 0.1)"
          focusBoxShadow="0 0 0 3px rgb(59 130 246 / 0.5)"
          onRowClick={(row) => alert(`View details for ${row.name}`)}
        />
      </div>
    </div>
  )
}

export const StyledExamples: Story = {
  args: { data: [], columns: [] },
  render: () => <StyledExamplesComponent />,
}

// Advanced styling with custom animations
const AdvancedStylingComponent = () => {
  const data = generateProducts(25) as RowData[]
  const [expandedRows, setExpandedRows] = useState<ExpandedState>(new Set())
  const [filters, setFilters] = useState<FilterDescriptor[]>([])
  const [sort, setSort] = useState<SortDescriptor[]>([])
  const [selectedRows, setSelectedRows] = useState<SelectionModel>(new Set())

  const columns = [
    {
      id: 'product',
      header: 'Product',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
      cell: ({ value, row }) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-sm text-muted-foreground">
              SKU: PRD-{String(row.id).padStart(5, '0')}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      sortable: true,
      cell: ({ value }) => (
        <div className="font-mono text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {value as React.ReactNode}
        </div>
      ),
    },
    {
      id: 'stock',
      header: 'Stock',
      accessorKey: 'stock',
      sortable: true,
      filterable: true,
      cell: ({ value }) => {
        const percentage = Math.min(value / 100, 1)
        const color =
          percentage > 0.5 ? 'bg-green-500' : percentage > 0.2 ? 'bg-yellow-500' : 'bg-red-500'

        return (
          <div className="space-y-1">
            <div className="text-sm font-medium">{value} units</div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${color} transition-all duration-500 ease-out`}
                style={{ width: `${percentage * 100}%` }}
              />
            </div>
          </div>
        )
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      cell: ({ value }) => {
        const statusConfig = {
          'in-stock': { color: 'bg-green-100 text-green-800 border-green-200', icon: '✓' },
          'low-stock': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '!' },
          'out-of-stock': { color: 'bg-red-100 text-red-800 border-red-200', icon: '✗' },
        }
        const config = statusConfig[value as keyof typeof statusConfig] || statusConfig['in-stock']

        return (
          <div
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border transition-all duration-300 hover:scale-105 ${config.color}`}
          >
            <span className="text-lg">{config.icon}</span>
            <span className="text-sm font-medium">{value.replace('-', ' ')}</span>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Product Inventory Dashboard</h3>
        <p className="text-muted-foreground mb-4">
          Advanced inventory management with real-time data, sorting, filtering, and selection
        </p>

        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {selectedRows.size > 0 && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outlined">
              Export CSV
            </Button>
            <Button size="sm">Add Product</Button>
          </div>
        </div>

        <Table
          data={data}
          columns={columns}
          variant="minimal"
          selectionMode="multiple"
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          enableSorting
          enableMultiSort
          sort={sort}
          onSortChange={setSort}
          enableFiltering
          filters={filters}
          onFiltersChange={setFilters}
          enableExpanding
          expandedRows={expandedRows}
          onExpandedChange={setExpandedRows}
          expandedContent={({ row }) => (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm">
                    Premium quality {(row.name as string)?.toLowerCase() || 'product'} with advanced
                    features and modern design. Built to last with high-quality materials.
                  </p>
                  <div className="mt-3">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Category: Electronics
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Specifications
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Weight: {(Math.random() * 3 + 0.5).toFixed(1)} kg</li>
                    <li>
                      • Dimensions: {Math.floor(Math.random() * 20 + 20)}x
                      {Math.floor(Math.random() * 15 + 15)}x{Math.floor(Math.random() * 10 + 5)} cm
                    </li>
                    <li>• Material: Premium grade aluminum</li>
                    <li>• Warranty: 2 years manufacturer</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Actions</h4>
                  <div className="flex gap-2 mb-3">
                    <Button size="sm" className="transition-all duration-200 hover:shadow-lg">
                      Order More
                    </Button>
                    <Button
                      variant="outlined"
                      size="sm"
                      className="transition-all duration-200 hover:shadow-lg"
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>
                      Last restocked:{' '}
                      {new Date(
                        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </p>
                    <p>Supplier: TechCorp Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          rowClassName={(row, index) => `
            transition-all duration-300 
            ${expandedRows.has(row.id) ? 'bg-primary/5 shadow-lg' : 'hover:bg-gray-50/50'}
            ${index === 0 ? 'rounded-t-lg' : ''}
            ${index === data.length - 1 && !expandedRows.has(row.id) ? 'rounded-b-lg' : ''}
          `}
          headerClassName="bg-gradient-to-r from-gray-50 to-gray-100 font-semibold"
          cellClassName="py-4"
          animationType="fade"
          animationDuration={300}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Click the expand button to see more details with smooth animations</p>
      </div>
    </div>
  )
}

export const AdvancedStyling: Story = {
  args: { data: [], columns: [] },
  render: () => <AdvancedStylingComponent />,
}

// Server-side pagination example
const ServerPaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<User[]>([])
  const [totalCount, setTotalCount] = useState(0)

  // Simulate server-side data fetching
  const fetchData = useCallback(async (page: number, size: number) => {
    setLoading(true)
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const allData = generateUsers(247) // Total dataset
    const startIndex = (page - 1) * size
    const endIndex = startIndex + size
    const pageData = allData.slice(startIndex, endIndex)

    setData(pageData)
    setTotalCount(allData.length)
    setLoading(false)
  }, [])

  // Fetch data when pagination changes
  useEffect(() => {
    fetchData(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage, fetchData])

  const columns = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      width: 80,
      cell: ({ value }) => (
        <Badge variant="outlined" className="font-mono">
          {String(value).padStart(3, '0')}
        </Badge>
      ),
    },
    {
      id: 'user',
      header: 'User',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar as string} alt={row.name as string} className="h-8 w-8" />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      cell: ({ value }) => <Badge variant="ghost">{value as string}</Badge>,
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
      cell: ({ value }) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          {value as React.ReactNode}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => {
        const statusConfig = {
          active: { variant: 'default' as const, color: 'text-green-600' },
          inactive: { variant: 'outlined' as const, color: 'text-gray-600' },
          pending: { variant: 'filled' as const, color: 'text-yellow-600' },
        }
        const config = statusConfig[value as keyof typeof statusConfig]
        return (
          <Badge variant={config.variant} className={config.color}>
            {value as React.ReactNode}
          </Badge>
        )
      },
    },
  ]

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Server-side Pagination</h3>
        <div className="text-sm text-muted-foreground">
          Total Records: {totalCount.toLocaleString()}
        </div>
      </div>

      <Table
        data={data}
        columns={columns}
        loading={loading}
        variant="bordered"
        loadingComponent={<Table.Loading message="Loading user data..." />}
      >
        <Table.Header />
        <Table.Body />
      </Table>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <Select
            className="w-16"
            clearable={false}
            options={[
              { value: 10, label: '10' },
              { value: 15, label: '15' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
            ]}
            value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
            onChange={(option) => {
              const value = Array.isArray(option) ? option[0]?.value : option?.value
              if (typeof value === 'number') handleItemsPerPageChange(value)
            }}
          />
          <span className="ml-2">
            {((currentPage - 1) * itemsPerPage + 1).toLocaleString()} to{' '}
            {Math.min(currentPage * itemsPerPage, totalCount).toLocaleString()} of{' '}
            {totalCount.toLocaleString()} results
          </span>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
          loading={loading}
          showFirstLast
          showPrevNext
          showPageNumbers
          maxPageNumbers={7}
          variant="filled"
        />
      </div>
    </div>
  )
}

export const ServerPagination: Story = {
  args: { data: [], columns: [] },
  render: () => <ServerPaginationComponent />,
}

// Compact pagination with different page sizes
const CompactPaginationComponent = () => {
  const allData = generateProducts(150)

  // State for small pagination
  const [smallPage, setSmallPage] = useState(1)
  const [smallItemsPerPage] = useState(5)

  // State for medium pagination
  const [mediumPage, setMediumPage] = useState(1)
  const [mediumItemsPerPage] = useState(10)

  // State for large pagination
  const [largePage, setLargePage] = useState(1)
  const [largeItemsPerPage] = useState(25)

  const columns = [
    {
      id: 'name',
      header: 'Product',
      accessorKey: 'name',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">ID: {row.id}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      cell: ({ value }) => (
        <span className="font-mono font-semibold text-green-600">${value.toFixed(2)}</span>
      ),
    },
    {
      id: 'stock',
      header: 'Stock',
      accessorKey: 'stock',
      cell: ({ value, row }) => (
        <div className="text-center">
          <div className="font-medium">{value}</div>
          <Badge
            variant={
              row.status === 'in-stock'
                ? 'default'
                : row.status === 'low-stock'
                  ? 'filled'
                  : 'outlined'
            }
            className="text-xs"
          >
            {row.status.replace('-', ' ')}
          </Badge>
        </div>
      ),
    },
  ]

  // Calculate data for each table
  const smallStartIndex = (smallPage - 1) * smallItemsPerPage
  const smallData = allData.slice(smallStartIndex, smallStartIndex + smallItemsPerPage)
  const smallTotalPages = Math.ceil(allData.length / smallItemsPerPage)

  const mediumStartIndex = (mediumPage - 1) * mediumItemsPerPage
  const mediumData = allData.slice(mediumStartIndex, mediumStartIndex + mediumItemsPerPage)
  const mediumTotalPages = Math.ceil(allData.length / mediumItemsPerPage)

  const largeStartIndex = (largePage - 1) * largeItemsPerPage
  const largeData = allData.slice(largeStartIndex, largeStartIndex + largeItemsPerPage)
  const largeTotalPages = Math.ceil(allData.length / largeItemsPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Pagination (5 per page)</h3>
        <Table data={smallData} columns={columns} size="sm" variant="striped">
          <Table.Header />
          <Table.Body />
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {smallStartIndex + 1} to{' '}
            {Math.min(smallStartIndex + smallItemsPerPage, allData.length)} of {allData.length}{' '}
            results
          </div>
          <Pagination
            currentPage={smallPage}
            totalPages={smallTotalPages}
            totalItems={allData.length}
            itemsPerPage={smallItemsPerPage}
            onChange={setSmallPage}
            size="sm"
            variant="flat"
            maxPageNumbers={3}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Pagination (10 per page)</h3>
        <Table data={mediumData} columns={columns} variant="minimal">
          <Table.Header />
          <Table.Body />
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {mediumStartIndex + 1} to{' '}
            {Math.min(mediumStartIndex + mediumItemsPerPage, allData.length)} of {allData.length}{' '}
            results
          </div>
          <Pagination
            currentPage={mediumPage}
            totalPages={mediumTotalPages}
            totalItems={allData.length}
            itemsPerPage={mediumItemsPerPage}
            onChange={setMediumPage}
            size="md"
            variant="outlined"
            maxPageNumbers={5}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large Pagination (25 per page)</h3>
        <Table data={largeData} columns={columns} size="lg" variant="card-style">
          <Table.Header />
          <Table.Body />
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {largeStartIndex + 1} to{' '}
            {Math.min(largeStartIndex + largeItemsPerPage, allData.length)} of {allData.length}{' '}
            results
          </div>
          <Pagination
            currentPage={largePage}
            totalPages={largeTotalPages}
            totalItems={allData.length}
            itemsPerPage={largeItemsPerPage}
            onChange={setLargePage}
            size="lg"
            variant="elevated"
            maxPageNumbers={7}
            showFirstLast
            showPrevNext
            showPageNumbers
          />
        </div>
      </div>
    </div>
  )
}

export const CompactPagination: Story = {
  args: { data: [], columns: [] },
  render: () => <CompactPaginationComponent />,
}

// Advanced pagination with search and filtering
const AdvancedPaginationComponent = () => {
  const allData = generateOrders(500) as RowData[]
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState<FilterDescriptor[]>([])
  const [selectedRows, setSelectedRows] = useState<SelectionModel>(new Set())

  const columns = [
    {
      id: 'id',
      header: 'Order ID',
      accessorKey: 'id',
      filterable: true,
      width: 120,
      cell: ({ value }) => (
        <Badge variant="outlined" className="font-mono text-xs">
          {value as React.ReactNode}
        </Badge>
      ),
    },
    {
      id: 'customer',
      header: 'Customer',
      accessorKey: 'customer',
      filterable: true,
      cell: ({ value, row }) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      id: 'product',
      header: 'Product',
      accessorKey: 'product',
      filterable: true,
    },
    {
      id: 'quantity',
      header: 'Qty',
      accessorKey: 'quantity',
      width: 80,
      cell: ({ value }) => (
        <Badge variant="ghost" className="font-mono">
          {value as React.ReactNode}
        </Badge>
      ),
    },
    {
      id: 'total',
      header: 'Total',
      accessorKey: 'total',
      cell: ({ value }) => (
        <span className="font-semibold text-green-600">${value.toFixed(2)}</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      filterable: true,
      cell: ({ value }) => {
        const statusColors = {
          pending: 'bg-yellow-100 text-yellow-800',
          processing: 'bg-blue-100 text-blue-800',
          shipped: 'bg-purple-100 text-purple-800',
          delivered: 'bg-green-100 text-green-800',
          cancelled: 'bg-red-100 text-red-800',
        }
        return (
          <Badge className={statusColors[value as keyof typeof statusColors]}>
            {value as string}
          </Badge>
        )
      },
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      cell: ({ value }) => (
        <span className="text-sm">{new Date(value as string).toLocaleDateString()}</span>
      ),
    },
  ]

  // Apply filters and search
  const filteredData = useMemo(() => {
    let result = allData

    // Apply global filter
    if (globalFilter) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(globalFilter.toLowerCase())
        )
      )
    }

    // Apply column filters
    filters.forEach((filter) => {
      if (filter.value) {
        result = result.filter((item) => {
          const cellValue = String(item[filter.columnId as keyof Order]).toLowerCase()
          const filterValue = String(filter.value).toLowerCase()

          switch (filter.matchMode) {
            case 'equals':
              return cellValue === filterValue
            case 'contains':
            default:
              return cellValue.includes(filterValue)
          }
        })
      }
    })

    return result
  }, [allData, globalFilter, filters])

  // Apply pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const selectedTotal = Array.from(selectedRows)
    .map((id) => filteredData.find((order) => order.id === id))
    .filter(Boolean)
    .reduce((sum, order) => sum + (order?.total as number), 0)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Order Management Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Advanced pagination with search, filters, and bulk operations
          </p>
        </div>
        <div className="flex items-center gap-4">
          {selectedRows.size > 0 && (
            <div className="text-sm">
              <Badge variant="default" className="mr-2">
                {selectedRows.size} selected
              </Badge>
              <span className="text-muted-foreground">
                Total:{' '}
                <span className="font-semibold text-green-600">${selectedTotal.toFixed(2)}</span>
              </span>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Export Selected
            </Button>
            <Button size="sm">Bulk Actions</Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Table.GlobalFilter
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search orders, customers, products..."
          />
        </div>
        <Select
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          placeholder="Filter by status"
          onChange={(option) => {
            const value = Array.isArray(option) ? option[0]?.value : option?.value
            if (value) {
              setFilters([{ columnId: 'status', value, matchMode: 'equals' }])
            } else {
              setFilters([])
            }
          }}
        />
      </div>

      <Table
        data={paginatedData}
        columns={columns}
        selectionMode="multiple"
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        variant="minimal"
      >
        <Table.Header />
        <Table.Body />
      </Table>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <Select
            clearable={false}
            className="w-16"
            options={[
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
            ]}
            value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
            onChange={(option) => {
              const value = Array.isArray(option) ? option[0]?.value : option?.value
              if (typeof value === 'number') handleItemsPerPageChange(value)
            }}
          />
          <span className="ml-2">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{' '}
            {filteredData.length} results
            {filteredData.length !== allData.length && ` (filtered from ${allData.length})`}
          </span>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
          showFirstLast
          showPrevNext
          showPageNumbers
          maxPageNumbers={5}
          variant="default"
        />
      </div>

      {selectedRows.size > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <strong>{selectedRows.size}</strong> orders selected with total value of{' '}
              <strong className="text-green-600">${selectedTotal.toFixed(2)}</strong>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedRows(new Set())}>
                Clear Selection
              </Button>
              <Button variant="outlined" size="sm">
                Bulk Update Status
              </Button>
              <Button variant="outlined" size="sm">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const AdvancedPagination: Story = {
  args: { data: [], columns: [] },
  render: () => <AdvancedPaginationComponent />,
}

// Mobile-responsive pagination
const MobilePaginationComponent = () => {
  const allData = generateUsers(75)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const totalPages = Math.ceil(allData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allData.slice(startIndex, endIndex)

  const columns = [
    {
      id: 'user',
      header: 'User Info',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar as string} alt={row.name as string} className="h-10 w-10" />
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{row.name as React.ReactNode}</div>
            <div className="text-sm text-muted-foreground truncate">
              {row.email as React.ReactNode}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="ghost" className="text-xs">
                {row.role}
              </Badge>
              <Badge variant={row.status === 'active' ? 'default' : 'outlined'} className="text-xs">
                {row.status}
              </Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'details',
      header: 'Details',
      accessorKey: 'department',
      cell: ({ row }) => (
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-sm">
            <Building className="h-3 w-3" />
            {row.department}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{row.location}</div>
          <div className="text-xs text-muted-foreground">
            Joined: {new Date(row.joinDate).getFullYear()}
          </div>
        </div>
      ),
    },
  ]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Mobile-Responsive Pagination</h3>
      <div className="text-sm text-muted-foreground">
        Optimized layout for mobile devices with condensed information
      </div>

      <Table data={currentData} columns={columns} variant="card-style" className="w-full">
        <Table.Header />
        <Table.Body />
      </Table>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              className="w-16"
              clearable={false}
              options={[
                { value: 5, label: '5' },
                { value: 8, label: '8' },
                { value: 15, label: '15' },
                { value: 30, label: '30' },
              ]}
              value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
              onChange={(option) => {
                const value = Array.isArray(option) ? option[0]?.value : option?.value
                if (value) handleItemsPerPageChange(Number(value))
              }}
            />
          </div>
          <span className="text-center sm:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, allData.length)} of {allData.length}{' '}
            results
          </span>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={allData.length}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
          size="sm"
          variant="circular"
          maxPageNumbers={3}
          showPrevNext
        />
      </div>
    </div>
  )
}

export const MobilePagination: Story = {
  args: { data: [], columns: [] },
  render: () => <MobilePaginationComponent />,
}

// Performance optimization with virtual pagination
const VirtualPaginationComponent = () => {
  const [dataSize, setDataSize] = useState(1000)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [loading, setLoading] = useState(false)

  const generateLargeDataset = useCallback((size: number) => {
    setLoading(true)
    // Simulate heavy data generation
    setTimeout(() => {
      setLoading(false)
    }, 200)
    return generateUsers(size)
  }, [])

  const allData = useMemo(() => generateLargeDataset(dataSize), [dataSize, generateLargeDataset])

  const totalPages = Math.ceil(allData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allData.slice(startIndex, endIndex)

  const columns = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      width: 80,
      cell: ({ value }) => (
        <Badge variant="outlined" className="font-mono text-xs">
          #{value}
        </Badge>
      ),
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.avatar as string} alt={value as string} className="h-6 w-6" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      cell: ({ value }) => <span className="text-sm text-muted-foreground">{value}</span>,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      cell: ({ value }) => <Badge variant="ghost">{value as string}</Badge>,
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'default' : 'outlined'}>{value as string}</Badge>
      ),
    },
  ]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const handleDataSizeChange = (newSize: number) => {
    setDataSize(newSize)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Performance Pagination</h3>
          <p className="text-sm text-muted-foreground">
            Handling large datasets efficiently with pagination
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <label className="text-muted-foreground mr-2">Dataset Size:</label>
            <Select
              options={[
                { value: 500, label: '500 records' },
                { value: 1000, label: '1,000 records' },
                { value: 5000, label: '5,000 records' },
                { value: 10000, label: '10,000 records' },
              ]}
              value={{ value: dataSize, label: `${dataSize.toLocaleString()} records` }}
              onChange={(option) => {
                const value = Array.isArray(option) ? option[0]?.value : option?.value
                if (typeof value === 'number') handleDataSizeChange(value)
              }}
            />
          </div>
          <Badge variant="default">{allData.length.toLocaleString()} Total</Badge>
        </div>
      </div>

      <Table
        data={currentData}
        columns={columns as ColumnDef[]}
        loading={loading}
        variant="bordered"
        loadingComponent={<Table.Loading message="Generating dataset..." />}
      >
        <Table.Header />
        <Table.Body />
      </Table>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <Select
            className="w-16"
            clearable={false}
            options={[
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
            ]}
            value={{ value: itemsPerPage, label: itemsPerPage.toString() }}
            onChange={(option) => {
              const value = Array.isArray(option) ? option[0]?.value : option?.value
              if (typeof value === 'number') handleItemsPerPageChange(value)
            }}
          />
          <span className="ml-2">
            Showing {startIndex + 1} to {Math.min(endIndex, allData.length)} of{' '}
            {allData.length.toLocaleString()} results
          </span>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={allData.length}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
          loading={loading}
          showFirstLast
          showPrevNext
          showPageNumbers
          maxPageNumbers={7}
          variant="elevated"
        />
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Current Page</div>
            <div className="font-semibold">{currentPage}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Page Size</div>
            <div className="font-semibold">{itemsPerPage}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total Pages</div>
            <div className="font-semibold">{totalPages.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Memory Usage</div>
            <div className="font-semibold text-green-600">Optimized</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const VirtualPagination: Story = {
  args: { data: [], columns: [] },
  render: () => <VirtualPaginationComponent />,
}

interface UserData extends RowData {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar: string
}

const SkeletonLoadingComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<UserData[]>([])

  const columns: ColumnDef<UserData>[] = [
    {
      id: 'avatar',
      header: '',
      cell: ({ row }) =>
        isLoading ? (
          <Skeleton variant="avatar" size="md" />
        ) : (
          <Avatar src={row.avatar} alt={row.name} size="md" />
        ),
      width: 60,
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) =>
        isLoading ? (
          <Skeleton variant="text" width={120} />
        ) : (
          <div className="font-medium">{row.name}</div>
        ),
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) =>
        isLoading ? (
          <Skeleton variant="text" width={180} />
        ) : (
          <div className="text-muted-foreground">{row.email}</div>
        ),
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      cell: ({ row }) =>
        isLoading ? (
          <Skeleton variant="button" size="sm" width={80} />
        ) : (
          <Badge variant="outlined">{row.role}</Badge>
        ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) =>
        isLoading ? (
          <Skeleton variant="rounded" width={60} height={20} />
        ) : (
          <Badge variant={row.status === 'Active' ? 'default' : 'outlined'}>{row.status}</Badge>
        ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row: _row }) =>
        isLoading ? (
          <div className="flex gap-2">
            <Skeleton variant="button" size="sm" width={60} />
            <Skeleton variant="button" size="sm" width={60} />
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Edit
            </Button>
            <Button variant="outlined" size="sm">
              Delete
            </Button>
          </div>
        ),
    },
  ]

  const skeletonData: UserData[] = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: '',
    email: '',
    role: '',
    status: '',
    avatar: '',
  }))

  useEffect(() => {
    const actualDataRef = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        avatar: 'https://github.com/shadcn.png',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Active',
        avatar: 'https://github.com/vercel.png',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Editor',
        status: 'Inactive',
        avatar: 'https://github.com/github.png',
      },
      {
        id: 4,
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'User',
        status: 'Active',
        avatar: 'https://github.com/nextjs.png',
      },
      {
        id: 5,
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        role: 'Admin',
        status: 'Active',
        avatar: 'https://github.com/tailwindcss.png',
      },
    ]

    const timer = setTimeout(() => {
      setData(actualDataRef)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleReload = () => {
    setIsLoading(true)
    setData([])
    setTimeout(() => {
      const reloadData: UserData[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active',
          avatar: 'https://github.com/shadcn.png',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          status: 'Active',
          avatar: 'https://github.com/vercel.png',
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'Editor',
          status: 'Inactive',
          avatar: 'https://github.com/github.png',
        },
        {
          id: 4,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'User',
          status: 'Active',
          avatar: 'https://github.com/nextjs.png',
        },
        {
          id: 5,
          name: 'Charlie Wilson',
          email: 'charlie@example.com',
          role: 'Admin',
          status: 'Active',
          avatar: 'https://github.com/tailwindcss.png',
        },
      ]
      setData(reloadData)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Users Table</h3>
          <p className="text-sm text-muted-foreground">
            Example of skeleton loading states in table cells
          </p>
        </div>
        <Button onClick={handleReload} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Reload Data'}
        </Button>
      </div>

      <Table
        data={isLoading ? skeletonData : data}
        columns={columns as any}
        variant="default"
        size="md"
      />
    </div>
  )
}

export const SkeletonLoading: Story = {
  args: { data: [], columns: [] },
  render: () => <SkeletonLoadingComponent />,
}
