import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

/**
 * Pagination is a navigation component that allows users to navigate through multiple pages of content.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Multiple Variants**: 5 pre-defined visual styles
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Smooth Animations**: Multiple transition effects with customizable duration
 * - **Extensive Styling**: Over 50 style props for complete customization
 * - **Loading State**: Built-in loading indicator support
 * - **Flexible Display**: Configurable page numbers, navigation buttons, and info display
 * - **Accessibility**: Full keyboard and screen reader support
 * - **Compound Components**: Modular design with sub-components
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Pagination
 *   defaultCurrentPage={1}
 *   totalPages={10}
 * />
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [currentPage, setCurrentPage] = useState(1)
 *
 * <Pagination
 *   currentPage={currentPage}
 *   onChange={setCurrentPage}
 *   totalPages={10}
 * />
 * ```
 *
 * ### With Page Info:
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={20}
 *   totalItems={200}
 *   showPageInfo={true}
 *   showTotalItems={true}
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Pagination
 *   variant="filled"
 *   size="lg"
 *   buttonBackgroundColorCurrent="#10b981"
 *   textColorCurrent="#ffffff"
 * />
 * ```
 */
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Controlled current page',
      table: {
        type: { summary: 'number' },
      },
    },
    defaultCurrentPage: {
      control: 'number',
      description: 'Default current page for uncontrolled mode',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items (optional)',
      table: {
        type: { summary: 'number' },
      },
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when page changes',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    _required: {
      control: 'boolean',
      description: 'Make the pagination required in forms',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'flat', 'elevated'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state for visual feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first and last page buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Show previous and next page buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showPageNumbers: {
      control: 'boolean',
      description: 'Show page number buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showPageInfo: {
      control: 'boolean',
      description: 'Show page information text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showItemsPerPage: {
      control: 'boolean',
      description: 'Show items per page selector',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTotalItems: {
      control: 'boolean',
      description: 'Show total items count',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxPageNumbers: {
      control: 'number',
      description: 'Maximum number of page buttons to show',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the pagination',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the pagination',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (overrides helper text)',
      table: {
        type: { summary: 'string' },
      },
    },
    _transition: {
      control: 'select',
      options: ['none', 'slide', 'fade', 'bounce', 'smooth'],
      description: 'Animation style for transitions',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'smooth' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transition in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    // Button styles
    buttonBackgroundColor: {
      control: 'color',
      description: 'Button background color',
      table: {
        category: 'Button Styles',
        type: { summary: 'string' },
      },
    },
    buttonBackgroundColorCurrent: {
      control: 'color',
      description: 'Current page button background color',
      table: {
        category: 'Button Styles',
        type: { summary: 'string' },
      },
    },
    buttonBorderColor: {
      control: 'color',
      description: 'Button border color',
      table: {
        category: 'Button Styles',
        type: { summary: 'string' },
      },
    },
    buttonBorderColorCurrent: {
      control: 'color',
      description: 'Current page button border color',
      table: {
        category: 'Button Styles',
        type: { summary: 'string' },
      },
    },
    buttonBorderRadius: {
      control: 'text',
      description: 'Button border radius',
      table: {
        category: 'Button Styles',
        type: { summary: 'string' },
      },
    },
    buttonPadding: {
      control: 'text',
      description: 'Button padding',
      table: {
        category: 'Button Styles',
        type: { summary: 'string' },
      },
    },
    // Text styles
    textColor: {
      control: 'color',
      description: 'Text color',
      table: {
        category: 'Text Styles',
        type: { summary: 'string' },
      },
    },
    textColorCurrent: {
      control: 'color',
      description: 'Current page text color',
      table: {
        category: 'Text Styles',
        type: { summary: 'string' },
      },
    },
    fontSize: {
      control: 'text',
      description: 'Font size',
      table: {
        category: 'Text Styles',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight',
      table: {
        category: 'Text Styles',
        type: { summary: 'string' },
      },
    },
    // Icon styles
    iconColor: {
      control: 'color',
      description: 'Icon color',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    iconSize: {
      control: 'text',
      description: 'Icon size',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    // Focus styles
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusRingWidth: {
      control: 'text',
      description: 'Focus ring width',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    // Spacing
    gap: {
      control: 'text',
      description: 'Gap between elements',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    buttonGap: {
      control: 'text',
      description: 'Gap between buttons',
      table: {
        category: 'Spacing',
        type: { summary: 'string' },
      },
    },
    // Custom render
    renderButton: {
      control: false,
      description: 'Custom render function for page buttons',
      table: {
        category: 'Custom Render',
        type: {
          summary: '(page: number, isCurrent: boolean, disabled: boolean) => React.ReactNode',
        },
      },
    },
    renderPageInfo: {
      control: false,
      description: 'Custom render function for page info',
      table: {
        category: 'Custom Render',
        type: {
          summary:
            '(currentPage: number, totalPages: number, totalItems?: number) => React.ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled stories
const PaginationWithState = ({
  defaultCurrentPage = 1,
  onChange,
  ...props
}: React.ComponentProps<typeof Pagination> & { defaultCurrentPage?: number }) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage)

  const handleChange = (page: number) => {
    setCurrentPage(page)
    onChange?.(page)
  }

  return <Pagination {...props} currentPage={currentPage} onChange={handleChange} />
}

export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center">
      <PaginationWithState {...args} />
    </div>
  ),
  args: {
    totalPages: 10,
    defaultCurrentPage: 3,
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Pagination (no props)</h3>
        <div className="flex justify-center">
          <Pagination />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">All default styles applied</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Total Pages</h3>
        <div className="flex justify-center">
          <Pagination totalPages={5} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Page Info</h3>
        <div className="flex justify-center">
          <Pagination totalPages={20} showPageInfo={true} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Items Per Page</h3>
        <div className="flex justify-center">
          <Pagination totalPages={50} showItemsPerPage={true} />
        </div>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="default" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filled</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="filled" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outlined</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="outlined" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Flat</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="flat" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Elevated</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="elevated" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Circular</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="circular" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Square</h3>
        <div className="flex justify-center">
          <PaginationWithState variant="square" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">All Sizes</h3>
        <div className="flex justify-center items-center gap-6">
          <PaginationWithState size="sm" totalPages={10} defaultCurrentPage={3} />
          <PaginationWithState size="md" totalPages={10} defaultCurrentPage={3} />
          <PaginationWithState size="lg" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Individual Sizes</h3>
        <div className="flex justify-center">
          <PaginationWithState size="sm" totalPages={10} defaultCurrentPage={3} />
        </div>
        <div className="flex justify-center">
          <PaginationWithState size="md" totalPages={10} defaultCurrentPage={3} />
        </div>
        <div className="flex justify-center">
          <PaginationWithState size="lg" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Default Status</h3>
        <div className="flex justify-center">
          <PaginationWithState status="default" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Status</h3>
        <div className="flex justify-center">
          <PaginationWithState status="success" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Warning Status</h3>
        <div className="flex justify-center">
          <PaginationWithState status="warning" totalPages={10} defaultCurrentPage={3} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Error Status</h3>
        <div className="flex justify-center">
          <PaginationWithState
            status="error"
            totalPages={10}
            defaultCurrentPage={3}
            errorMessage="There was an error loading the pages"
          />
        </div>
      </div>
    </div>
  ),
}

export const DisplayOptions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">All Navigation Buttons</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          showFirstLast={true}
          showPrevNext={true}
          showPageNumbers={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Only Page Numbers</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          showFirstLast={false}
          showPrevNext={false}
          showPageNumbers={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Only Navigation</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          showFirstLast={true}
          showPrevNext={true}
          showPageNumbers={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Page Info</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          showPageInfo={true}
          totalItems={100}
          showTotalItems={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Items Per Page</h3>
        <PaginationWithState
          totalPages={50}
          defaultCurrentPage={3}
          showItemsPerPage={true}
          itemsPerPage={20}
        />
      </div>
    </div>
  ),
}

export const LargePageCounts: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Many Pages (Default Max)</h3>
        <PaginationWithState totalPages={100} defaultCurrentPage={50} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Max Page Numbers</h3>
        <PaginationWithState totalPages={100} defaultCurrentPage={50} maxPageNumbers={7} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Near First Page</h3>
        <PaginationWithState totalPages={100} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Near Last Page</h3>
        <PaginationWithState totalPages={100} defaultCurrentPage={98} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Middle Page</h3>
        <PaginationWithState totalPages={100} defaultCurrentPage={50} />
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Smooth Transition (Default)</h3>
        <PaginationWithState _transition="smooth" totalPages={10} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Bounce Transition</h3>
        <PaginationWithState _transition="bounce" totalPages={10} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slide Transition</h3>
        <PaginationWithState _transition="slide" totalPages={10} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Fade Transition</h3>
        <PaginationWithState _transition="fade" totalPages={10} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">No Transition</h3>
        <PaginationWithState _transition="none" totalPages={10} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Slow Transition</h3>
        <PaginationWithState
          _transition="smooth"
          transitionDuration={600}
          totalPages={10}
          defaultCurrentPage={3}
        />
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled</h3>
        <Pagination disabled totalPages={10} defaultCurrentPage={3} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Loading</h3>
        <Pagination
          loading
          totalPages={10}
          defaultCurrentPage={3}
          _loadingIcon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.25"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">With Error</h3>
        <Pagination
          status="error"
          totalPages={10}
          defaultCurrentPage={3}
          errorMessage="Failed to load page data"
        />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Colors</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            buttonBackgroundColorCurrent="#10b981"
            textColorCurrent="#ffffff"
            buttonBorderColorCurrent="#10b981"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Rounded Buttons</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            buttonBorderRadius="9999px"
            buttonPadding="0.75rem 1rem"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Large Gap</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            buttonGap="0.5rem"
            gap="1rem"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Focus Ring</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            focusRingColor="#8b5cf6"
            focusRingWidth="3px"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Minimal Design</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            variant="flat"
            buttonBackgroundColor="transparent"
            buttonBackgroundColorCurrent="#111827"
            textColorCurrent="#ffffff"
            buttonBoxShadow="none"
          />
        </div>
      </div>
    </div>
  ),
}

export const CustomRender: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Button Render</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          renderButton={(page, isCurrent, disabled) => (
            <button
              key={page}
              disabled={disabled}
              onClick={() => console.log(`Clicked page ${page}`)}
              className={`px-3 py-2 rounded ${
                isCurrent ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {page}
            </button>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Page Info</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          showPageInfo={true}
          renderPageInfo={(currentPage, totalPages, totalItems) => (
            <div className="text-sm text-blue-600 font-medium">
              📄 Page {currentPage} of {totalPages}
              {totalItems && ` • ${totalItems} items total`}
            </div>
          )}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Navigation Icons</h3>
        <PaginationWithState
          totalPages={10}
          defaultCurrentPage={3}
          renderPrevButton={(disabled) => (
            <button
              disabled={disabled}
              className="px-3 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              ⬅️ Prev
            </button>
          )}
          renderNextButton={(disabled) => (
            <button
              disabled={disabled}
              className="px-3 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next ➡️
            </button>
          )}
        />
      </div>
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Text Icons</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            firstIcon={<span className="font-bold text-sm">First</span>}
            lastIcon={<span className="font-bold text-sm">Last</span>}
            prevIcon={<span className="font-bold text-sm">Prev</span>}
            nextIcon={<span className="font-bold text-sm">Next</span>}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom SVG Icons</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            firstIcon={
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            lastIcon={
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 11H3a1 1 0 110-2h5.586L4.293 4.293z"
                  clipRule="evenodd"
                />
              </svg>
            }
            prevIcon={
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
            nextIcon={
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Mixed Custom Icons</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            firstIcon={<span className="text-lg">🏠</span>}
            lastIcon={<span className="text-lg">🏁</span>}
            prevIcon={
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
            nextIcon={<span className="text-lg">➡️</span>}
          />
        </div>
      </div>
    </div>
  ),
}

const DataTableComponent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, _setItemsPerPage] = useState(10)
  const totalItems = 150
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Simulate data
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const data = Array.from({ length: endIndex - startIndex }, (_, i) => ({
    id: startIndex + i + 1,
    name: `Item ${startIndex + i + 1}`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
  }))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Data Table with Pagination</h3>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onChange={setCurrentPage}
          showPageInfo={true}
          showItemsPerPage={true}
          renderItemsPerPage={(itemsPerPage, onItemsPerPageChange) => (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                {[5, 10, 25, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </div>
    </div>
  )
}

const TablePaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const totalItems = 150

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Table Pagination Example</h3>

      <div className="flex justify-center">
        <Pagination
          type="table"
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / rowsPerPage)}
          totalItems={totalItems}
          itemsPerPage={rowsPerPage}
          onChange={setCurrentPage}
          labelDisplayedRows={(from, to, count) => `${from}-${to} of ${count} rows`}
          labelRowsPerPage="Rows per page:"
          rowsPerPageOptions={[5, 10, 25, 50]}
          renderItemsPerPage={(itemsPerPage, onItemsPerPageChange) => (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  const newItemsPerPage = Number(e.target.value)
                  onItemsPerPageChange(newItemsPerPage)
                  setRowsPerPage(newItemsPerPage)
                }}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                {[5, 10, 25, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export const DataTable: Story = {
  render: () => <DataTableComponent />,
}

export const TablePagination: Story = {
  render: () => <TablePaginationComponent />,
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">E-commerce Product List</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Showing 1-20 of 150 products</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={8}
                defaultCurrentPage={1}
                totalItems={150}
                showPageInfo={true}
                variant="outlined"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Blog Article List</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Page 3 of 25</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={25}
                defaultCurrentPage={3}
                variant="filled"
                size="sm"
                showFirstLast={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Admin Dashboard</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-600">1-10 of 150</span>
            </div>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={15}
                defaultCurrentPage={1}
                variant="elevated"
                size="lg"
                showPageInfo={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Search Results</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Found 1,234 results</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={50}
                defaultCurrentPage={5}
                variant="flat"
                size="md"
                showPageInfo={true}
                showTotalItems={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Keyboard Navigation</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Use Tab to navigate between buttons, Enter/Space to activate, and arrow keys for quick
            navigation.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              variant="outlined"
              showFirstLast={true}
              showPrevNext={true}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Screen Reader Support</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            All buttons have proper ARIA labels and roles for screen reader compatibility.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              showPageInfo={true}
              totalItems={100}
              label="Product List Navigation"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">High Contrast Mode</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Designed with high contrast ratios for better visibility.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              variant="filled"
              buttonBackgroundColorCurrent="#1f2937"
              textColorCurrent="#ffffff"
              buttonBorderColorCurrent="#1f2937"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Focus Indicators</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Clear focus indicators for keyboard navigation.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              focusRingColor="#3b82f6"
              focusRingWidth="3px"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AdvancedStyling: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Gradient Buttons</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            buttonBackgroundColorCurrent="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            textColorCurrent="#ffffff"
            buttonBoxShadowCurrent="0 4px 15px rgba(102, 126, 234, 0.4)"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Glass Morphism</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            buttonBackgroundColor="rgba(255, 255, 255, 0.1)"
            buttonBackgroundColorCurrent="rgba(255, 255, 255, 0.2)"
            buttonBorderColor="rgba(255, 255, 255, 0.2)"
            textColor="#ffffff"
            textColorCurrent="#ffffff"
            buttonBoxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            buttonBoxShadowCurrent="0 8px 32px rgba(0, 0, 0, 0.2)"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '1rem',
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Neon Glow</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            buttonBackgroundColorCurrent="#00ff88"
            textColorCurrent="#000000"
            buttonBoxShadowCurrent="0 0 20px rgba(0, 255, 136, 0.6)"
            buttonBorderColorCurrent="#00ff88"
            variant="filled"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Minimalist Design</h3>
        <div className="flex justify-center">
          <PaginationWithState
            totalPages={10}
            defaultCurrentPage={3}
            variant="flat"
            buttonBackgroundColor="transparent"
            buttonBackgroundColorCurrent="#f3f4f6"
            textColor="#6b7280"
            textColorCurrent="#111827"
            buttonBoxShadow="none"
            buttonBorderColor="transparent"
            buttonBorderColorCurrent="transparent"
            gap="0.75rem"
          />
        </div>
      </div>
    </div>
  ),
}

export const EnhancedRealWorldExamples: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media Feed</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Showing posts 21-40 of 1,247</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={63}
                defaultCurrentPage={2}
                variant="flat"
                size="sm"
                showFirstLast={false}
                showPageInfo={true}
                totalItems={1247}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">File Manager</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Files per page:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-sm text-gray-600">41-60 of 1,234 files</span>
            </div>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={62}
                defaultCurrentPage={3}
                variant="outlined"
                size="md"
                showPageInfo={true}
                totalItems={1234}
                itemsPerPage={20}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Photo Gallery</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Album: Vacation 2024 (1,234 photos)</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={124}
                defaultCurrentPage={5}
                variant="filled"
                size="lg"
                showFirstLast={true}
                showPageInfo={true}
                totalItems={1234}
                itemsPerPage={10}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Dashboard</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Results per page:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-sm text-gray-600">Showing 1-25 of 2,847 results</span>
            </div>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={114}
                defaultCurrentPage={1}
                variant="elevated"
                size="md"
                showPageInfo={true}
                totalItems={2847}
                itemsPerPage={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const PerformanceExamples: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Large Dataset (10,000+ items)</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Showing 1-50 of 15,432 items</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={309}
                defaultCurrentPage={1}
                variant="outlined"
                size="sm"
                showPageInfo={true}
                totalItems={15432}
                itemsPerPage={50}
                maxPageNumbers={7}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compact Navigation</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Page 45 of 1,234</span>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={1234}
                defaultCurrentPage={45}
                variant="flat"
                size="sm"
                showFirstLast={true}
                showPrevNext={true}
                showPageNumbers={false}
                showPageInfo={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Loading States</h3>
        <div className="space-y-4">
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              loading={true}
              variant="outlined"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Individual Pagination Loading</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Small Loading Pagination</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                size="sm"
                variant="outlined"
                _loadingIcon={
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                }
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Medium Loading Pagination</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                size="md"
                variant="filled"
                _loadingIcon={
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                }
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Large Loading Pagination</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                size="lg"
                variant="elevated"
                _loadingIcon={
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Loading Icons</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Dots Loading</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                variant="outlined"
                _loadingIcon={
                  <div className="flex space-x-0.5">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                }
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Pulse Loading</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                variant="filled"
                _loadingIcon={
                  <div className="w-2.5 h-2.5 bg-current rounded-full animate-pulse"></div>
                }
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Text Loading</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                variant="flat"
                _loadingIcon={<span className="text-xs font-medium">Loading...</span>}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Loading with Page Info</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Loading with Total Items</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                showPageInfo={true}
                totalItems={100}
                variant="outlined"
                _loadingIcon={
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                }
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Loading with Items Per Page</h4>
            <div className="flex justify-center">
              <PaginationWithState
                totalPages={10}
                defaultCurrentPage={3}
                loading={true}
                showItemsPerPage={true}
                itemsPerPage={10}
                variant="filled"
                _loadingIcon={
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Table Pagination Loading</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Loading Table Pagination</h4>
            <div className="flex justify-center">
              <Pagination
                type="table"
                currentPage={3}
                totalPages={10}
                totalItems={100}
                itemsPerPage={10}
                loading={true}
                variant="outlined"
                _loadingIcon={
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const OverallLoadingScenarios: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Loading Scenario</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Simulating a scenario where data is being fetched and pagination is loading.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              loading={true}
              variant="outlined"
              size="md"
              showPageInfo={true}
              totalItems={100}
              _loadingIcon={
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">API Call Loading</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Pagination loading during API calls with custom loading indicator.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              loading={true}
              variant="filled"
              size="lg"
              _loadingIcon={
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <span className="text-xs">Loading data...</span>
                </div>
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Progressive Loading</h3>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Progressive loading with different loading states for different parts.
          </p>
          <div className="flex justify-center">
            <PaginationWithState
              totalPages={10}
              defaultCurrentPage={3}
              loading={true}
              variant="elevated"
              size="md"
              showPageInfo={true}
              totalItems={100}
              _loadingIcon={
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <span className="text-xs ml-1">Loading pages...</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  ),
}
