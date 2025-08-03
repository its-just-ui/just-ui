import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Anchor } from './Anchor'

/**
 * Anchor is a navigation component that provides smooth scrolling between sections with scroll spy functionality.
 *
 * ## Features
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **7 Variants**: Multiple visual styles including underline, side-border, filled, minimal, dot, icon-based, and nested
 * - **Scroll Spy**: Automatic detection of active section as user scrolls
 * - **Smooth Scrolling**: Animated scrolling with customizable easing and duration
 * - **Hash Synchronization**: Optional URL hash synchronization
 * - **Extensive Styling**: Over 30 style props for complete customization
 * - **Nested Navigation**: Support for multi-level navigation hierarchies
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Custom Renderers**: Flexible rendering with custom render functions
 *
 * ## Usage
 *
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Anchor targetIds={['section1', 'section2', 'section3']}>
 *   <Anchor.Link href="#section1">Section 1</Anchor.Link>
 *   <Anchor.Link href="#section2">Section 2</Anchor.Link>
 *   <Anchor.Link href="#section3">Section 3</Anchor.Link>
 * </Anchor>
 * ```
 *
 * ### Controlled Usage:
 * ```tsx
 * const [activeId, setActiveId] = useState('section1')
 *
 * <Anchor activeId={activeId} onChange={setActiveId}>
 *   <Anchor.Link href="#section1">Section 1</Anchor.Link>
 *   <Anchor.Link href="#section2">Section 2</Anchor.Link>
 * </Anchor>
 * ```
 *
 * ### With Groups and Indicator:
 * ```tsx
 * <Anchor variant="side-border" targetIds={['intro', 'features', 'api']}>
 *   <Anchor.Indicator />
 *   <Anchor.Group title="Documentation">
 *     <Anchor.Link href="#intro">Introduction</Anchor.Link>
 *     <Anchor.Link href="#features">Features</Anchor.Link>
 *   </Anchor.Group>
 *   <Anchor.Group title="Reference">
 *     <Anchor.Link href="#api">API Reference</Anchor.Link>
 *   </Anchor.Group>
 * </Anchor>
 * ```
 *
 * ### With Content Sections:
 * ```tsx
 * <div className="flex gap-8">
 *   <Anchor targetIds={['intro', 'guide']} className="w-64">
 *     <Anchor.Link href="#intro">Introduction</Anchor.Link>
 *     <Anchor.Link href="#guide">User Guide</Anchor.Link>
 *   </Anchor>
 *
 *   <div className="flex-1">
 *     <Anchor.Content anchorId="intro" title="Introduction">
 *       <p>Welcome to our documentation...</p>
 *     </Anchor.Content>
 *     <Anchor.Content anchorId="guide" title="User Guide">
 *       <p>This guide will help you get started...</p>
 *     </Anchor.Content>
 *   </div>
 * </div>
 * ```
 */
const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    activeId: {
      control: 'text',
      description: 'Controlled active anchor ID',
      table: {
        type: { summary: 'string | null' },
      },
    },
    defaultActiveId: {
      control: 'text',
      description: 'Default active anchor ID for uncontrolled mode',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback when active anchor changes',
      table: {
        type: { summary: '(activeId: string | null) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['underline', 'side-border', 'filled', 'minimal', 'dot', 'icon-based', 'nested'],
      description: 'Visual variant of the anchor navigation',
      table: {
        type: { summary: 'AnchorVariant' },
        defaultValue: { summary: 'underline' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the anchor navigation',
      table: {
        type: { summary: 'AnchorSize' },
        defaultValue: { summary: 'md' },
      },
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of the anchor navigation',
      table: {
        type: { summary: 'AnchorDirection' },
        defaultValue: { summary: 'vertical' },
      },
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
      description: 'Positioning behavior of the anchor navigation',
      table: {
        type: { summary: 'AnchorPosition' },
        defaultValue: { summary: 'static' },
      },
    },
    offset: {
      control: 'number',
      description: 'Scroll offset from top when navigating to anchor',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
      },
    },
    scrollBehavior: {
      control: 'select',
      options: ['smooth', 'instant'],
      description: 'Scroll behavior when navigating',
      table: {
        type: { summary: 'ScrollBehavior' },
        defaultValue: { summary: 'smooth' },
      },
    },
    easing: {
      control: 'select',
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
      description: 'Easing function for smooth scroll animation',
      table: {
        type: { summary: 'EasingFunction' },
        defaultValue: { summary: 'ease-out' },
      },
    },
    duration: {
      control: 'number',
      description: 'Duration of scroll animation in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '800' },
      },
    },
    hashSync: {
      control: 'boolean',
      description: 'Synchronize active anchor with URL hash',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    scrollSpy: {
      control: 'boolean',
      description: 'Enable automatic active anchor detection on scroll',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    targetIds: {
      control: 'object',
      description: 'Array of target element IDs for scroll spy',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    renderLink: {
      control: false,
      description: 'Custom link renderer function',
      table: {
        type: { summary: 'RenderLinkFunction' },
      },
    },
    renderGroup: {
      control: false,
      description: 'Custom group renderer function',
      table: {
        type: { summary: 'RenderGroupFunction' },
      },
    },
    renderIndicator: {
      control: false,
      description: 'Custom indicator renderer function',
      table: {
        type: { summary: 'RenderIndicatorFunction' },
      },
    },
    onClick: {
      control: false,
      description: 'Callback when anchor link is clicked',
      table: {
        type: { summary: '(id: string, href: string) => void' },
      },
    },
    onScrollStart: {
      control: false,
      description: 'Callback when scroll animation starts',
      table: {
        type: { summary: '(targetId: string) => void' },
      },
    },
    onScrollEnd: {
      control: false,
      description: 'Callback when scroll animation ends',
      table: {
        type: { summary: '(targetId: string) => void' },
      },
    },
    onActiveChange: {
      control: false,
      description: 'Callback when active anchor changes',
      table: {
        type: { summary: '(activeId: string | null, previousId: string | null) => void' },
      },
    },
    // Style props
    fontSize: {
      control: 'text',
      description: 'Font size override',
      table: {
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight override',
      table: {
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Default text color',
      table: {
        type: { summary: 'string' },
      },
    },
    hoverColor: {
      control: 'color',
      description: 'Text color on hover',
      table: {
        type: { summary: 'string' },
      },
    },
    activeColor: {
      control: 'color',
      description: 'Text color when active',
      table: {
        type: { summary: 'string' },
      },
    },
    visitedColor: {
      control: 'color',
      description: 'Text color when visited',
      table: {
        type: { summary: 'string' },
      },
    },
    indicatorColor: {
      control: 'color',
      description: 'Active indicator color',
      table: {
        type: { summary: 'string' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        type: { summary: 'string' },
      },
    },
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        type: { summary: 'string' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between anchor links',
      table: {
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'text',
      description: 'Internal padding',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Anchor>

export default meta
type Story = StoryObj<typeof meta>

// Helper component for creating mock content sections
const MockContent: React.FC<{
  id: string
  title: string
  height?: string
  offset?: number
  storyPrefix?: string
}> = ({ id, title, height = '600px', offset = 80, storyPrefix }) => {
  const uniqueId = storyPrefix ? `${storyPrefix}-${id}` : id

  return (
    <Anchor.Content
      anchorId={uniqueId}
      title={title}
      offset={offset}
      className="border border-gray-200 rounded-lg p-8"
      style={{ minHeight: height }}
    >
      <p className="text-gray-600 mb-4">
        This is the content for {title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-gray-600 mb-4">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-gray-600">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
      </p>
    </Anchor.Content>
  )
}

// Wrapper component for stories that need state management
const AnchorWithState: React.FC<{
  children: React.ReactNode
  defaultActiveId?: string
  storyPrefix?: string
}> = ({ children, defaultActiveId, storyPrefix = 'with-state' }) => {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId || null)
  const baseIds = ['introduction', 'getting-started', 'configuration', 'examples', 'api-reference']
  const targetIds = baseIds.map((id) => `${storyPrefix}-${id}`)

  return (
    <div className="min-h-screen">
      <div className="flex gap-8">
        <div className="w-64 sticky top-8 h-fit">
          <Anchor
            activeId={activeId}
            onChange={setActiveId}
            targetIds={targetIds}
            scrollSpy={false}
            scrollBehavior="smooth"
            duration={600}
            easing="ease-out"
          >
            {children}
          </Anchor>
        </div>
        <div className="flex-1">
          <MockContent id="introduction" title="Introduction" storyPrefix={storyPrefix} />
          <MockContent id="getting-started" title="Getting Started" storyPrefix={storyPrefix} />
          <MockContent id="configuration" title="Configuration" storyPrefix={storyPrefix} />
          <MockContent id="examples" title="Examples" storyPrefix={storyPrefix} />
          <MockContent id="api-reference" title="API Reference" storyPrefix={storyPrefix} />
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => {
    const storyPrefix = 'default'
    const targetIds = ['introduction', 'getting-started', 'configuration'].map(
      (id) => `${storyPrefix}-${id}`
    )

    return (
      <div className="min-h-screen">
        <div className="flex gap-8">
          <div className="w-64 sticky top-8 h-fit">
            <Anchor direction="vertical" variant="side-border" targetIds={targetIds} offset={100}>
              <Anchor.Indicator />
              <Anchor.Link href={`#${storyPrefix}-introduction`}>Introduction</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-getting-started`}>Getting Started</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-configuration`}>Configuration</Anchor.Link>
            </Anchor>
          </div>
          <div className="flex-1">
            <MockContent
              id="introduction"
              title="Introduction"
              storyPrefix={storyPrefix}
              offset={100}
            />
            <MockContent
              id="getting-started"
              title="Getting Started"
              storyPrefix={storyPrefix}
              offset={100}
            />
            <MockContent
              id="configuration"
              title="Configuration"
              storyPrefix={storyPrefix}
              offset={100}
            />
          </div>
        </div>
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-8">Vertical Variants</h2>
      {(
        ['underline', 'side-border', 'filled', 'minimal', 'dot', 'icon-based', 'nested'] as const
      ).map((variant) => (
        <div key={`vertical-${variant}`} className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 capitalize">
            {variant.replace('-', ' ')} (Vertical)
          </h3>
          <Anchor variant={variant} direction="vertical" className="w-64">
            <Anchor.Link href="#section1">Introduction</Anchor.Link>
            <Anchor.Link href="#section2">Getting Started</Anchor.Link>
            <Anchor.Link href="#section3" active>
              Configuration
            </Anchor.Link>
            <Anchor.Link href="#section4">Examples</Anchor.Link>
          </Anchor>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-8 mt-16">Horizontal Variants</h2>
      {(['underline', 'side-border', 'filled', 'minimal'] as const).map((variant) => (
        <div key={`horizontal-${variant}`} className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 capitalize">
            {variant.replace('-', ' ')} (Horizontal)
          </h3>
          <Anchor variant={variant} direction="horizontal">
            <Anchor.Link href="#section1">Introduction</Anchor.Link>
            <Anchor.Link href="#section2">Getting Started</Anchor.Link>
            <Anchor.Link href="#section3" active>
              Configuration
            </Anchor.Link>
            <Anchor.Link href="#section4">Examples</Anchor.Link>
          </Anchor>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Size: {size}</h3>
          <Anchor size={size} className="w-64">
            <Anchor.Link href="#section1">Introduction</Anchor.Link>
            <Anchor.Link href="#section2">Getting Started</Anchor.Link>
            <Anchor.Link href="#section3" active>
              Configuration
            </Anchor.Link>
          </Anchor>
        </div>
      ))}
    </div>
  ),
}

export const WithIndicator: Story = {
  render: () => {
    const storyPrefix = 'with-indicator'
    return (
      <AnchorWithState defaultActiveId={`${storyPrefix}-getting-started`} storyPrefix={storyPrefix}>
        <Anchor.Indicator />
        <Anchor.Link href={`#${storyPrefix}-introduction`}>Introduction</Anchor.Link>
        <Anchor.Link href={`#${storyPrefix}-getting-started`}>Getting Started</Anchor.Link>
        <Anchor.Link href={`#${storyPrefix}-configuration`}>Configuration</Anchor.Link>
        <Anchor.Link href={`#${storyPrefix}-examples`}>Examples</Anchor.Link>
        <Anchor.Link href={`#${storyPrefix}-api-reference`}>API Reference</Anchor.Link>
      </AnchorWithState>
    )
  },
}

export const WithGroups: Story = {
  render: () => {
    const storyPrefix = 'with-groups'
    return (
      <AnchorWithState storyPrefix={storyPrefix}>
        <Anchor.Indicator />
        <Anchor.Group title="Getting Started">
          <Anchor.Link href={`#${storyPrefix}-introduction`}>Introduction</Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-getting-started`}>Getting Started</Anchor.Link>
        </Anchor.Group>
        <Anchor.Group title="Configuration" collapsible>
          <Anchor.Link href={`#${storyPrefix}-configuration`}>Basic Config</Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-examples`}>Advanced Examples</Anchor.Link>
        </Anchor.Group>
        <Anchor.Group title="Reference">
          <Anchor.Link href={`#${storyPrefix}-api-reference`}>API Reference</Anchor.Link>
        </Anchor.Group>
      </AnchorWithState>
    )
  },
}

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Custom Colors</h3>
        <Anchor
          variant="side-border"
          activeColor="#059669"
          hoverColor="#10b981"
          indicatorColor="#059669"
          className="w-64"
        >
          <Anchor.Indicator />
          <Anchor.Link href="#section1">Introduction</Anchor.Link>
          <Anchor.Link href="#section2">Features</Anchor.Link>
          <Anchor.Link href="#section3" active>
            Configuration
          </Anchor.Link>
        </Anchor>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Filled Variant with Purple Theme</h3>
        <Anchor variant="filled" activeColor="#7c3aed" backgroundColor="#f3f4f6" className="w-64">
          <Anchor.Link href="#section1">Dashboard</Anchor.Link>
          <Anchor.Link href="#section2">Analytics</Anchor.Link>
          <Anchor.Link href="#section3" active>
            Settings
          </Anchor.Link>
        </Anchor>
      </div>
    </div>
  ),
}

export const NestedNavigation: Story = {
  render: () => {
    const storyPrefix = 'nested-nav'
    return (
      <AnchorWithState storyPrefix={storyPrefix}>
        <Anchor.Indicator />
        <Anchor.Group title="Documentation">
          <Anchor.Link href={`#${storyPrefix}-introduction`} level={0}>
            Introduction
          </Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-getting-started`} level={1}>
            Quick Start
          </Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-configuration`} level={1}>
            Configuration
          </Anchor.Link>
        </Anchor.Group>
        <Anchor.Group title="Examples" collapsible>
          <Anchor.Link href={`#${storyPrefix}-examples`} level={0}>
            Basic Examples
          </Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-api-reference`} level={1}>
            Advanced Usage
          </Anchor.Link>
        </Anchor.Group>
      </AnchorWithState>
    )
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Icon-based Navigation</h3>
      <Anchor variant="icon-based" className="w-64">
        <Anchor.Link
          href="#home"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          }
        >
          Home
        </Anchor.Link>
        <Anchor.Link
          href="#settings"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          active
        >
          Settings
        </Anchor.Link>
        <Anchor.Link
          href="#profile"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        >
          Profile
        </Anchor.Link>
      </Anchor>
    </div>
  ),
}

export const DotVariant: Story = {
  render: () => (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Dot Variant</h3>
      <Anchor variant="dot" dotColor="#3b82f6" className="w-64">
        <Anchor.Link href="#introduction">Introduction</Anchor.Link>
        <Anchor.Link href="#features">Features</Anchor.Link>
        <Anchor.Link href="#installation" active>
          Installation
        </Anchor.Link>
        <Anchor.Link href="#usage">Usage</Anchor.Link>
      </Anchor>
    </div>
  ),
}

const ProgrammaticScrollingComponent = () => {
  const [activeId, setActiveId] = useState<string | null>('section1')

  const handleButtonClick = (targetId: string) => {
    setActiveId(targetId)
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleButtonClick('section1')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Section 1
        </button>
        <button
          onClick={() => handleButtonClick('section2')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Section 2
        </button>
        <button
          onClick={() => handleButtonClick('section3')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Section 3
        </button>
      </div>

      <Anchor activeId={activeId} onChange={setActiveId} scrollSpy={false} className="w-64">
        <Anchor.Indicator />
        <Anchor.Link href="#section1">Section 1</Anchor.Link>
        <Anchor.Link href="#section2">Section 2</Anchor.Link>
        <Anchor.Link href="#section3">Section 3</Anchor.Link>
      </Anchor>
    </div>
  )
}

export const ProgrammaticScrolling: Story = {
  render: () => <ProgrammaticScrollingComponent />,
}

export const DisabledLinks: Story = {
  render: () => (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Disabled Links</h3>
      <Anchor className="w-64">
        <Anchor.Link href="#available">Available Section</Anchor.Link>
        <Anchor.Link href="#disabled" disabled>
          Disabled Section
        </Anchor.Link>
        <Anchor.Link href="#coming-soon" disabled>
          Coming Soon
        </Anchor.Link>
        <Anchor.Link href="#another-available" active>
          Current Section
        </Anchor.Link>
      </Anchor>
    </div>
  ),
}

export const HorizontalNavigation: Story = {
  render: () => {
    const storyPrefix = 'horizontal-nav'
    const targetIds = ['intro', 'features', 'installation', 'usage'].map(
      (id) => `${storyPrefix}-${id}`
    )

    return (
      <div className="min-h-screen">
        {/* Horizontal fixed header navigation */}
        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10 px-6 py-4">
          <Anchor
            direction="horizontal"
            variant="minimal"
            position="static"
            targetIds={targetIds}
            offset={120}
            scrollBehavior="smooth"
            duration={600}
            easing="ease-out"
          >
            <Anchor.Link href={`#${storyPrefix}-intro`}>Introduction</Anchor.Link>
            <Anchor.Link href={`#${storyPrefix}-features`}>Features</Anchor.Link>
            <Anchor.Link href={`#${storyPrefix}-installation`}>Installation</Anchor.Link>
            <Anchor.Link href={`#${storyPrefix}-usage`}>Usage</Anchor.Link>
          </Anchor>
        </div>

        {/* Content sections */}
        <div className="px-6">
          <MockContent id="intro" title="Introduction" storyPrefix={storyPrefix} offset={120} />
          <MockContent id="features" title="Features" storyPrefix={storyPrefix} offset={120} />
          <MockContent
            id="installation"
            title="Installation"
            storyPrefix={storyPrefix}
            offset={120}
          />
          <MockContent id="usage" title="Usage" storyPrefix={storyPrefix} offset={120} />
        </div>
      </div>
    )
  },
}

export const HorizontalTabs: Story = {
  render: () => {
    const storyPrefix = 'horizontal-tabs'
    const targetIds = ['overview', 'setup', 'examples', 'api'].map((id) => `${storyPrefix}-${id}`)

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Product Documentation</h1>

        {/* Horizontal tabs */}
        <Anchor
          direction="horizontal"
          variant="filled"
          targetIds={targetIds}
          offset={80}
          className="mb-8"
          scrollBehavior="smooth"
          duration={500}
          easing="ease-in-out"
        >
          <Anchor.Link href={`#${storyPrefix}-overview`}>Overview</Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-setup`}>Setup</Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-examples`}>Examples</Anchor.Link>
          <Anchor.Link href={`#${storyPrefix}-api`}>API Reference</Anchor.Link>
        </Anchor>

        {/* Content */}
        <MockContent
          id="overview"
          title="Overview"
          height="400px"
          storyPrefix={storyPrefix}
          offset={80}
        />
        <MockContent
          id="setup"
          title="Setup Guide"
          height="500px"
          storyPrefix={storyPrefix}
          offset={80}
        />
        <MockContent
          id="examples"
          title="Code Examples"
          height="600px"
          storyPrefix={storyPrefix}
          offset={80}
        />
        <MockContent
          id="api"
          title="API Reference"
          height="700px"
          storyPrefix={storyPrefix}
          offset={80}
        />
      </div>
    )
  },
}

export const VerticalSidebar: Story = {
  render: () => {
    const storyPrefix = 'vertical-sidebar'
    const targetIds = ['intro', 'installation', 'features', 'usage', 'advanced'].map(
      (id) => `${storyPrefix}-${id}`
    )

    return (
      <div className="min-h-screen flex">
        {/* Vertical sidebar navigation */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6">Documentation</h2>
          <Anchor
            direction="vertical"
            variant="side-border"
            targetIds={targetIds}
            offset={80}
            scrollBehavior="smooth"
            duration={700}
            easing="ease-out"
          >
            <Anchor.Indicator />
            <Anchor.Group title="Getting Started">
              <Anchor.Link href={`#${storyPrefix}-intro`}>Introduction</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-installation`}>Installation</Anchor.Link>
            </Anchor.Group>
            <Anchor.Group title="Documentation">
              <Anchor.Link href={`#${storyPrefix}-features`}>Features</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-usage`}>Basic Usage</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-advanced`}>Advanced Topics</Anchor.Link>
            </Anchor.Group>
          </Anchor>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <MockContent id="intro" title="Introduction" storyPrefix={storyPrefix} offset={80} />
          <MockContent
            id="installation"
            title="Installation"
            storyPrefix={storyPrefix}
            offset={80}
          />
          <MockContent id="features" title="Features" storyPrefix={storyPrefix} offset={80} />
          <MockContent id="usage" title="Basic Usage" storyPrefix={storyPrefix} offset={80} />
          <MockContent
            id="advanced"
            title="Advanced Topics"
            storyPrefix={storyPrefix}
            offset={80}
          />
        </div>
      </div>
    )
  },
}

export const WithContentSections: Story = {
  render: () => {
    const storyPrefix = 'content-sections'
    const targetIds = ['intro', 'features', 'installation', 'usage'].map(
      (id) => `${storyPrefix}-${id}`
    )

    return (
      <div className="min-h-screen">
        <div className="flex gap-8">
          <div className="w-64 sticky top-8 h-fit">
            <Anchor
              direction="vertical"
              variant="side-border"
              targetIds={targetIds}
              offset={100}
              scrollBehavior="smooth"
              duration={800}
              easing="ease-in-out"
            >
              <Anchor.Indicator />
              <Anchor.Link href={`#${storyPrefix}-intro`}>Introduction</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-features`}>Features</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-installation`}>Installation</Anchor.Link>
              <Anchor.Link href={`#${storyPrefix}-usage`}>Usage</Anchor.Link>
            </Anchor>
          </div>
          <div className="flex-1">
            <Anchor.Content
              anchorId={`${storyPrefix}-intro`}
              title="Introduction"
              level={1}
              offset={100}
            >
              <p className="text-gray-600 mb-4">
                Welcome to our component library! This introduction will help you understand the
                core concepts and get started quickly.
              </p>
              <p className="text-gray-600">
                Our library provides a comprehensive set of accessible, customizable components that
                work seamlessly together.
              </p>
            </Anchor.Content>

            <Anchor.Content
              anchorId={`${storyPrefix}-features`}
              title="Features"
              level={1}
              offset={100}
            >
              <ul className="text-gray-600 space-y-2">
                <li>• TypeScript support out of the box</li>
                <li>• Fully accessible components</li>
                <li>• Extensive customization options</li>
                <li>• Modern design system</li>
                <li>• Excellent developer experience</li>
              </ul>
            </Anchor.Content>

            <Anchor.Content
              anchorId={`${storyPrefix}-installation`}
              title="Installation"
              level={1}
              offset={100}
            >
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">npm install @your-org/ui-library</code>
              </div>
              <p className="text-gray-600">
                After installation, you can start importing and using components in your project.
              </p>
            </Anchor.Content>

            <Anchor.Content anchorId={`${storyPrefix}-usage`} title="Usage" level={1} offset={100}>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <pre className="text-sm">
                  <code>{`import { Anchor } from '@your-org/ui-library'

function MyComponent() {
  return (
    <Anchor>
      <Anchor.Link href="#section1">Section 1</Anchor.Link>
      <Anchor.Link href="#section2">Section 2</Anchor.Link>
    </Anchor>
  )
}`}</code>
                </pre>
              </div>
              <p className="text-gray-600">
                This example shows the basic usage of the Anchor component with links.
              </p>
            </Anchor.Content>
          </div>
        </div>
      </div>
    )
  },
}
