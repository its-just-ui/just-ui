# its-just-ui - (How hard could it be🙄?) 🚀

Oh, you know, it's JUST UI. Just whip up 36 production-ready React components with TypeScript, Tailwind CSS, full accessibility, dark mode, animations, and comprehensive testing. I mean, how hard could it be? It's not like frontend is real programming, right? 😏

**The ultimate Material UI alternative for modern React applications**

its-just-ui is the easiest, fastest React UI component library with 36+ production-ready components. Zero-config setup, plug-and-play design system perfect for startups, SaaS applications, dashboards, and enterprise projects. Built with TypeScript and Tailwind CSS for maximum developer experience.

> **Why choose its-just-ui over Material UI, Chakra UI, or Ant Design?**  
> ✅ Faster setup (5 minutes vs hours)  
> ✅ Smaller bundle size (150KB vs 1MB+)  
> ✅ Better TypeScript support  
> ✅ Modern Tailwind CSS styling  
> ✅ Zero configuration required

## Key Features - Perfect UI Kit for Rapid Development

🚀 **36+ Production-Ready Components** - Complete UI framework with forms, tables, navigation, and data display  
⚡ **Zero Configuration** - Install and start building immediately, no setup required  
🎨 **Highly Customizable** - Full theming system with CSS variables and Tailwind integration  
♿ **Accessibility First** - WCAG AA compliant, screen reader tested, keyboard navigation  
📱 **Mobile Responsive** - Perfect for dashboards, admin panels, and SaaS applications  
🔧 **TypeScript Native** - Full type safety with comprehensive type definitions  
🌗 **Dark Mode Ready** - Built-in dark theme support for modern applications  
📦 **Tree Shakeable** - Import only what you need, optimized bundle size

[![npm version](https://img.shields.io/npm/v/its-just-ui.svg?style=flat)](https://www.npmjs.com/package/its-just-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/its-just-ui)](https://bundlephobia.com/package/its-just-ui)
[![npm downloads](https://img.shields.io/npm/dm/its-just-ui.svg?style=flat)](https://www.npmjs.com/package/its-just-ui)

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Component Library](#component-library)
  - [Core Components](#core-components)
  - [Navigation Components](#navigation-components)
  - [Form Components](#form-components)
  - [Data Display Components](#data-display-components)
  - [Feedback Components](#feedback-components)
  - [Layout Components](#layout-components)
- [Theming & Customization](#theming--customization)
- [TypeScript Support](#typescript-support)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Features

## Why Choose its-just-ui Over Other Component Libraries?

**The Smart Alternative to Material UI, Chakra UI, Ant Design & Bootstrap**

### 📊 its-just-ui vs Popular Alternatives

| Feature            | its-just-ui   | Material UI    | Chakra UI    | Ant Design | Bootstrap      |
| ------------------ | ------------- | -------------- | ------------ | ---------- | -------------- |
| **Setup Time**     | 5 minutes     | 2+ hours       | 1+ hour      | 1+ hour    | 30 minutes     |
| **Bundle Size**    | 150KB         | 1.2MB+         | 800KB+       | 2MB+       | 300KB+         |
| **TypeScript**     | Native        | Good           | Good         | Good       | Basic          |
| **Components**     | 36+           | 50+            | 40+          | 60+        | 20+            |
| **Customization**  | CSS Variables | Theme Provider | Theme Object | Less/CSS   | Sass Variables |
| **Learning Curve** | Minimal       | Steep          | Medium       | Medium     | Easy           |
| **Tree Shaking**   | Perfect       | Good           | Good         | Limited    | Manual         |
| **Dark Mode**      | Built-in      | Manual         | Built-in     | Manual     | Manual         |

### 🚀 Perfect For:

- **Startups & MVPs** - Get to market faster with zero configuration
- **SaaS Applications** - Professional components for dashboards and admin panels
- **Enterprise Projects** - Scalable, maintainable, and accessible by default
- **Rapid Prototyping** - Plug-and-play components for quick iterations
- **Frontend Teams** - Consistent design system across all projects

## Quick Start

Get up and running with its-just-ui in 5 minutes - the fastest React UI setup:

### Installation

```bash
# Using npm
npm install its-just-ui

# Using yarn
yarn add its-just-ui

# Using pnpm
pnpm add its-just-ui
```

**Package Details:**

- 📦 **Unpacked Size:** ~1.2MB (optimized from 1.6MB)
- 🗜️ **Gzipped:** ~150KB
- 🌳 **Tree-shakeable:** Import only what you need
- 📝 **TypeScript:** Full type definitions included
- 🚀 **Zero runtime dependencies:** Just React

### Basic Setup

1. **Import the required CSS** in your app's entry point:

```tsx
// main.tsx or App.tsx
import 'its-just-ui/styles.css'
import { ThemeProvider } from 'its-just-ui'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

> **Important:** The CSS import is required for proper styling. The ThemeProvider is optional but recommended for consistent theming across your application.

2. **Start using components** in your React application:

```tsx
import { Button, Card, Input, Checkbox, Progress, TreeSelect } from 'its-just-ui'

function App() {
  const treeData = [
    {
      key: 'react',
      title: 'React',
      children: [
        { key: 'hooks', title: 'Hooks' },
        { key: 'components', title: 'Components' },
      ],
    },
  ]

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome to its-just-ui</h2>
      <Input placeholder="Enter your name" label="Name" className="mb-4" />
      <TreeSelect
        treeData={treeData}
        placeholder="Select technology"
        label="Technology"
        className="mb-4"
      />
      <Checkbox label="I agree to the terms and conditions" className="mb-4" />
      <Progress value={75} className="mb-4" />
      <Button variant="primary" className="w-full">
        Get Started
      </Button>
    </Card>
  )
}
```

## Component Library

Our "comprehensive" component library is organized into categories that made sense at 2 AM after too much coffee.

### Component Statistics (Or: How We Justify Our Salaries)

- **Total Components:** 37 (But who's counting? Our PM, that's who)
- **Core Components:** 4 (The ones that actually work)
- **Navigation Components:** 6 (For when users get lost in your app)
- **Form Components:** 11 (Because HTML inputs are "too basic")
- **Data Display Components:** 7 (Tables are hard, okay?)
- **Feedback Components:** 3 (For telling users what they did wrong)
- **Layout Components:** 6 (Flexbox nightmares as React components)

### Complete Component List

<details>
<summary>📦 All 36 Components (Click to expand)</summary>

#### Core Components

- **Button** - The component that started it all
- **Badge** - For those important notification counts
- **Chip** - Tags, but fancier
- **ThemeProvider** - Because consistent theming is actually important

#### Navigation Components

- **Anchor** - Scroll spy included (you're welcome)
- **Breadcrumb** - So users know where they are
- **Pagination** - Because infinite scroll is "too mainstream"
- **Stepper** - Multi-step forms made "easy"
- **Segmented** - Radio buttons in disguise
- **ToggleButtons** - For when regular buttons aren't enough

#### Form Components

- **Input** - Text input with 47 different states
- **Select** - Dropdown that actually works on mobile
- **Checkbox** - With indeterminate state (because binary choices are outdated)
- **RadioGroup** - Round checkboxes, basically
- **Switch** - Toggle with unnecessary animations
- **Slider** - Draggable number picker
- **DatePicker** - Calendar component that handles leap years
- **ColorPicker** - 16.7 million choices
- **Upload** - Drag & drop with progress bars
- **Autocomplete** - Search with suggestions
- **TreeSelect** - Hierarchical selection nightmare

#### Data Display Components

- **Table** - Excel wannabe
- **List** - `<ul>` with superpowers
- **Card** - Container with shadows
- **Avatar** - Circle with initials
- **Carousel** - Slideshow nobody asked for
- **Accordion** - Collapsible content panels
- **Rating** - 5-star system (revolutionary!)

#### Feedback Components

- **Alert** - Important messages users ignore
- **Progress** - Loading bars for everything
- **Skeleton** - Placeholder for placeholders

#### Layout Components

- **Dialog** - Modal that traps focus
- **Drawer** - Slide-out panel
- **Popover** - Floating content container
- **Tooltip** - Hover hints
- **Splitter** - Resizable panels
- **Cascade** - Nested menus

</details>

### Core Components

Essential building blocks for any React application (because native HTML elements are for peasants).

#### ThemeProvider

Comprehensive theming solution for consistent styling across all components.

```tsx
import { ThemeProvider, useTheme } from 'its-just-ui'

// Basic usage with default theme
<ThemeProvider>
  <App />
</ThemeProvider>

// With custom theme configuration
const customTheme = {
  colors: {
    light: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      background: '#ffffff',
      text: '#1a1a1a',
      // ... other colors
    },
    dark: {
      primary: '#a78bfa',
      secondary: '#f472b6',
      background: '#0a0a0a',
      text: '#fafafa',
      // ... other colors
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    // ... other spacing
  }
}

<ThemeProvider theme={customTheme} defaultMode="light">
  <App />
</ThemeProvider>

// Using theme in components
function MyComponent() {
  const { theme, toggleMode, isDark, currentColors } = useTheme()

  return (
    <div style={{ backgroundColor: currentColors.background }}>
      <button onClick={toggleMode}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  )
}

// System preference detection
<ThemeProvider defaultMode="system" enableSystemMode={true}>
  <App />
</ThemeProvider>
```

**Features:**

- Light, dark, and system mode support
- Comprehensive theme configuration (colors, spacing, typography, shadows)
- CSS custom properties integration
- useTheme hook for easy access
- Local storage persistence
- Nested theme support
- Real-time theme updates
- System preference detection

**Theme Configuration:**

- **Colors**: Primary, secondary, success, warning, error, info, background, surface, text colors
- **Spacing**: xs to 4xl spacing values
- **Typography**: Font families, sizes, and weights
- **Border Radius**: From none to full rounded corners
- **Shadows**: Multiple shadow levels
- **Transitions**: Predefined transition configurations
- **Breakpoints**: Responsive design breakpoints

#### Button

Interactive button component with multiple variants, sizes, and states. Because `<button>` wasn't complicated enough.

```tsx
import { Button } from 'its-just-ui'

// Variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="link">Link Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>

// With Icons
<Button icon={<SearchIcon />}>Search</Button>
<Button rightIcon={<ArrowRightIcon />}>Next</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `icon`: ReactNode
- `rightIcon`: ReactNode

#### Card

Flexible container component for grouping related content.

```tsx
import { Card } from 'its-just-ui'
;<Card variant="elevated" selectable>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description goes here</Card.Description>
  </Card.Header>
  <Card.Body>
    <p>Main content of the card</p>
  </Card.Body>
  <Card.Footer>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>
```

**Features:**

- Compound component architecture
- Selection states
- Expandable content
- Badge support
- Custom styling
- Hover effects

#### Input

Versatile text input field with comprehensive features.

```tsx
import { Input } from 'its-just-ui'

// Basic input
<Input placeholder="Enter text" />

// With label and helper text
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

// With validation
<Input
  label="Password"
  type="password"
  required
  error
  errorMessage="Password must be at least 8 characters"
/>

// With icons
<Input
  placeholder="Search..."
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
/>
```

**Features:**

- Multiple input types
- Validation states
- Helper text
- Error messages
- Icons
- Controlled/uncontrolled
- Accessibility support

#### Checkbox

Advanced checkbox component with tri-state support and group management.

```tsx
import { Checkbox } from 'its-just-ui'

// Basic checkbox
<Checkbox label="Accept terms" />

// Tri-state checkbox
<Checkbox
  indeterminate={true}
  label="Select all"
/>

// Checkbox group
<Checkbox.Group label="Select options">
  <Checkbox.SelectAll />
  <Checkbox.Item value="option1" label="Option 1" />
  <Checkbox.Item value="option2" label="Option 2" />
  <Checkbox.Item value="option3" label="Option 3" />
</Checkbox.Group>

// Custom styling
<Checkbox
  variant="filled"
  size="lg"
  checkedBackgroundColor="#10b981"
  label="Custom styled"
/>
```

**Key Features:**

- 7 visual variants
- Tri-state logic
- Group management
- Select all functionality
- Status indicators
- Loading states
- 40+ style props

#### Progress

Versatile progress indicator with multiple variants and features.

```tsx
import { Progress } from 'its-just-ui'

// Basic progress
<Progress value={65} />

// Circular progress
<Progress variant="circular" value={75} size="lg" />

// Multi-segment progress
<Progress
  segments={[
    { id: '1', value: 30, color: '#10b981' },
    { id: '2', value: 25, color: '#3b82f6' },
    { id: '3', value: 20, color: '#f59e0b' }
  ]}
/>

// Indeterminate
<Progress isIndeterminate />

// With compound components
<Progress value={75}>
  <Progress.Track />
  <Progress.Bar />
  <Progress.Label>Upload Progress</Progress.Label>
  <Progress.ValueDescription>75% Complete</Progress.ValueDescription>
</Progress>
```

**Variants:** linear, circular, dashed, striped, segmented, pill, bordered, minimal

#### Slider

Flexible range input with marks and labels.

```tsx
import { Slider } from 'its-just-ui'

// Basic slider
<Slider
  value={[50]}
  onValueChange={setValue}
  min={0}
  max={100}
/>

// Range slider
<Slider
  value={[25, 75]}
  onValueChange={setRange}
/>

// With marks
<Slider
  value={[50]}
  marks={[
    { value: 0, label: '0%' },
    { value: 50, label: '50%' },
    { value: 100, label: '100%' }
  ]}
/>
```

**Features:**

- Single/range values
- Custom marks
- Labels
- Keyboard navigation
- Touch support
- Vertical orientation

### Navigation Components

Components for building intuitive navigation experiences.

#### Anchor

Advanced navigation component with scroll spy and smooth scrolling.

```tsx
import { Anchor } from 'its-just-ui'

// Basic navigation
<Anchor targetIds={['intro', 'features', 'pricing']}>
  <Anchor.Link href="#intro">Introduction</Anchor.Link>
  <Anchor.Link href="#features">Features</Anchor.Link>
  <Anchor.Link href="#pricing">Pricing</Anchor.Link>
</Anchor>

// With groups and indicator
<Anchor variant="side-border" scrollSpy hashSync>
  <Anchor.Indicator />
  <Anchor.Group title="Getting Started">
    <Anchor.Link href="#intro">Introduction</Anchor.Link>
    <Anchor.Link href="#install">Installation</Anchor.Link>
  </Anchor.Group>
  <Anchor.Group title="Components">
    <Anchor.Link href="#button">Button</Anchor.Link>
    <Anchor.Link href="#input">Input</Anchor.Link>
  </Anchor.Group>
</Anchor>
```

**Key Features:**

- 7 visual variants
- Auto scroll spy
- Smooth scrolling
- Hash synchronization
- Active indicators
- Nested groups
- Keyboard navigation

#### Breadcrumb

Navigation hierarchy indicator.

```tsx
import { Breadcrumb } from 'its-just-ui'
;<Breadcrumb>
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item isCurrentPage>
    <Breadcrumb.Link>Current Product</Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb>
```

#### Pagination

Navigate through pages of content.

```tsx
import { Pagination } from 'its-just-ui'
;<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
  showPageNumbers
  showPageSizeSelector
  pageSizeOptions={[10, 20, 50, 100]}
/>
```

#### ToggleButtons

Group of toggle buttons for multi-selection.

```tsx
import { ToggleButtons } from 'its-just-ui'
;<ToggleButtons value={['bold']} onValueChange={setFormats}>
  <ToggleButtons.Item value="bold">B</ToggleButtons.Item>
  <ToggleButtons.Item value="italic">I</ToggleButtons.Item>
  <ToggleButtons.Item value="underline">U</ToggleButtons.Item>
</ToggleButtons>
```

### Form Components

Comprehensive form controls for user input.

#### Segmented

Segmented control for switching between mutually exclusive options.

```tsx
import { Segmented } from 'its-just-ui'

// Basic usage
const options = [
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' },
  { label: 'Chart', value: 'chart' },
]

<Segmented
  value={view}
  onChange={setView}
  options={options}
/>

// With icons
const iconOptions = [
  { label: 'List', value: 'list', icon: <ListIcon /> },
  { label: 'Grid', value: 'grid', icon: <GridIcon /> },
  { label: 'Chart', value: 'chart', icon: <ChartIcon /> },
]

<Segmented
  options={iconOptions}
  variant="outline"
  size="lg"
/>

// Vertical layout
<Segmented
  options={options}
  direction="vertical"
  fullWidth
/>
```

**Features:**

- 5 visual variants (solid, outline, ghost, filled, minimal)
- Animated sliding indicator
- Keyboard navigation support
- Icon support
- Vertical/horizontal layouts
- Disabled option support
- WAI-ARIA compliant
- Custom styling props

#### Select

Advanced dropdown with search and multi-select.

```tsx
import { Select } from 'its-just-ui'

// Basic select
<Select
  options={options}
  placeholder="Select option"
  onChange={setSelected}
/>

// Multi-select with search
<Select
  options={options}
  multiple
  searchable
  clearable
  placeholder="Select multiple"
/>

// Grouped options
<Select
  options={groupedOptions}
  grouped
  renderGroup={(group) => <div className="font-bold">{group.label}</div>}
/>
```

#### Autocomplete

Text input with suggestions and async loading.

```tsx
import { Autocomplete } from 'its-just-ui'
;<Autocomplete
  options={options}
  searchable
  async
  onSearch={handleSearch}
  onSelect={handleSelect}
  placeholder="Search..."
/>
```

#### RadioGroup

Single selection from multiple options.

```tsx
import { RadioGroup } from 'its-just-ui'
;<RadioGroup value={value} onChange={setValue}>
  <RadioGroup.Item value="1" label="Option 1" />
  <RadioGroup.Item value="2" label="Option 2" />
  <RadioGroup.Item value="3" label="Option 3" />
</RadioGroup>
```

#### Switch

Toggle switch for boolean states.

```tsx
import { Switch } from 'its-just-ui'
;<Switch checked={enabled} onCheckedChange={setEnabled} label="Enable notifications" size="lg" />
```

#### Rating

Star rating input component.

```tsx
import { Rating } from 'its-just-ui'
;<Rating value={rating} onChange={setRating} precision={0.5} size="lg" showValue />
```

#### Cascade

Hierarchical selection component.

```tsx
import { Cascade } from 'its-just-ui'
;<Cascade
  options={locationOptions}
  placeholder="Select location"
  onChange={setLocation}
  searchable
  showPath
/>
```

#### TreeSelect

Hierarchical tree selection component with support for single/multiple selection, search, and async loading.

```tsx
import { TreeSelect } from 'its-just-ui'

// Basic tree select
const [value, setValue] = useState()
const treeData = [
  {
    key: '1',
    title: 'Parent 1',
    children: [
      { key: '1-1', title: 'Child 1-1' },
      { key: '1-2', title: 'Child 1-2' }
    ]
  }
]

<TreeSelect
  value={value}
  onChange={setValue}
  treeData={treeData}
  placeholder="Select from tree"
/>

// Multiple selection with checkboxes
<TreeSelect
  mode="multiple"
  checkable
  value={values}
  onChange={setValues}
  treeData={treeData}
  placeholder="Select multiple items"
  checkStrategy="SHOW_CHILD"
/>

// Searchable tree select
<TreeSelect
  searchable
  value={value}
  onChange={setValue}
  treeData={treeData}
  placeholder="Search and select..."
  filterTreeNode={(input, node) =>
    node.title.toLowerCase().includes(input.toLowerCase())
  }
/>

// Inline tree (no popup)
<TreeSelect
  inline
  variant="inline-tree"
  treeData={treeData}
  defaultExpandedKeys={['1', '2']}
/>

// Async loading
<TreeSelect
  treeData={treeData}
  loadData={async (node) => {
    const children = await fetchChildren(node.key)
    node.children = children
  }}
  placeholder="Load children dynamically"
/>

// Custom node rendering
<TreeSelect
  treeData={treeData}
  renderNode={(node, { selected, level }) => (
    <div className={`custom-node level-${level}`}>
      <span className={selected ? 'selected' : ''}>{node.title}</span>
      {node.badge && <span className="badge">{node.badge}</span>}
    </div>
  )}
/>

// Compound components
<TreeSelect treeData={treeData}>
  <TreeSelect.Input placeholder="Custom search..." />
  <TreeSelect.Popup>
    <div className="custom-header">Select items:</div>
    {/* Tree nodes rendered automatically */}
  </TreeSelect.Popup>
</TreeSelect>
```

**Features:**

- Single, multiple, and checkable selection modes
- Hierarchical data with expand/collapse
- Search and filter functionality
- Async loading support for large datasets
- Keyboard navigation (arrow keys, enter, escape)
- Custom node and tag renderers
- Compound component architecture
- Controlled and uncontrolled patterns
- Check strategies (SHOW_PARENT, SHOW_CHILD, SHOW_ALL)
- Inline or popup display modes
- Full accessibility support (ARIA roles, screen readers)
- Real-world examples: organization charts, permissions, locations

#### ColorPicker

Comprehensive color selection component with multiple formats and variants.

```tsx
import { ColorPicker } from 'its-just-ui'

// Basic color picker
<ColorPicker
  value={color}
  onChange={(value, colorData) => {
    setColor(value)
    console.log('Color data:', colorData)
  }}
/>

// Different variants
<ColorPicker value={color} onChange={setColor} variant="inline" />
<ColorPicker value={color} onChange={setColor} variant="popover" />
<ColorPicker value={color} onChange={setColor} variant="minimal" />

// Without alpha channel
<ColorPicker
  value={color}
  onChange={setColor}
  allowAlpha={false}
  defaultFormat="rgb"
/>

// Custom preset colors
<ColorPicker
  value={color}
  onChange={setColor}
  presetColors={[
    { value: '#FF6B6B', label: 'Coral' },
    { value: '#4ECDC4', label: 'Turquoise' },
    { value: '#45B7D1', label: 'Sky Blue' },
  ]}
/>

// Custom styling
<ColorPicker
  value={color}
  onChange={setColor}
  swatchShape="circle"
  borderRadius="12px"
  popoverBackgroundColor="#f3f4f6"
/>
```

**Features:**

- Multiple color formats (hex, rgb, rgba, hsl, hsla)
- Controlled component design
- Various UI variants (default, inline, popover, minimal)
- Customizable sliders, inputs, and preset swatches
- Alpha channel support
- Keyboard navigation
- Custom rendering options
- Extensive styling props

#### Upload

Comprehensive file upload component with drag-and-drop support and progress tracking.

```tsx
import { Upload } from 'its-just-ui'

// Basic upload
const [files, setFiles] = useState<File[]>([])

<Upload
  files={files}
  onChange={setFiles}
  accept="image/*"
  multiple
  maxFiles={5}
  maxSize={5 * 1024 * 1024} // 5MB
/>

// With custom dropzone
<Upload files={files} onChange={setFiles}>
  <Upload.Dropzone className="custom-dropzone">
    <MyCustomDropzoneContent />
  </Upload.Dropzone>
  <Upload.FileList />
</Upload>

// Async upload with progress
<Upload
  files={files}
  onChange={setFiles}
  onUploadStart={(file) => startUpload(file)}
  onUploadProgress={(file, progress) => updateProgress(file, progress)}
  onUploadComplete={(file) => completeUpload(file)}
/>

// Form integration
<Upload
  files={files}
  onChange={setFiles}
  label="Upload Documents"
  required
  helperText="PDF or Word documents only"
  accept=".pdf,.doc,.docx"
/>
```

**Features:**

- Controlled component with file state management
- Compound components: Dropzone, Preview, Progress, FileList, Button
- Drag-and-drop with visual feedback
- File validation (size, count, type)
- Upload progress tracking
- Multiple variants and sizes
- Custom rendering options
- Full accessibility support
- Form integration ready

#### DatePicker

Comprehensive date picker component with support for single dates, date ranges, and multiple date selection.

```tsx
import { DatePicker } from 'its-just-ui'

// Single date picker
const [date, setDate] = useState<Date>()
<DatePicker
  value={date}
  onChange={setDate}
  label="Select Date"
  placeholder="Choose a date"
/>

// Date range picker
const [range, setRange] = useState<DateRange>()
<DatePicker
  mode="range"
  value={range}
  onChange={setRange}
  label="Select Date Range"
  placeholder="Choose start and end dates"
/>

// Multiple date selection
const [dates, setDates] = useState<Date[]>([])
<DatePicker
  mode="multiple"
  value={dates}
  onChange={setDates}
  label="Select Multiple Dates"
  placeholder="Choose multiple dates"
  closeOnSelect={false}
/>

// Inline calendar
<DatePicker
  inline
  variant="inline-calendar"
  label="Inline Calendar"
/>

// With date restrictions
<DatePicker
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
  disabledDates={{
    days: [0, 6], // Disable weekends
    dates: [new Date(2024, 11, 25)] // Disable Christmas
  }}
  label="Business Days Only"
/>

// Custom day renderer
<DatePicker
  renderDay={(date, isSelected, isDisabled, isToday, isInRange) => (
    <div className={`custom-day ${isSelected ? 'selected' : ''}`}>
      {date.getDate()}
    </div>
  )}
  label="Custom Styled"
/>
```

**Features:**

- Single, range, and multiple date selection modes
- Inline or popup calendar display
- Keyboard navigation support
- Date restrictions (min/max dates, disabled dates/days)
- Locale and format customization
- Custom day renderers
- Comprehensive accessibility support
- Form integration ready
- Controlled and uncontrolled usage patterns

### Data Display Components

Components for presenting data effectively.

#### Table

Feature-rich data table component.

```tsx
import { Table } from 'its-just-ui'
;<Table
  data={users}
  columns={columns}
  variant="striped"
  selectionMode="multiple"
  enableSorting
  enableFiltering
  enablePagination
/>
```

**Features:**

- Sorting
- Filtering
- Pagination
- Selection
- Expandable rows
- Cell editing
- Virtualization

#### List

Structured list display.

```tsx
import { List } from 'its-just-ui'
;<List selectable>
  <List.Item>
    <List.ItemIcon>
      <UserIcon />
    </List.ItemIcon>
    <List.ItemText primary="John Doe" secondary="john@example.com" />
  </List.Item>
</List>
```

#### Badge

Status indicators and labels.

```tsx
import { Badge } from 'its-just-ui'

<Badge variant="success">Active</Badge>
<Badge variant="warning" closable>Pending</Badge>
<Badge variant="error" rounded>Failed</Badge>
```

#### Avatar

User profile pictures with fallbacks.

```tsx
import { Avatar } from 'its-just-ui'
;<Avatar src="/user.jpg" alt="John Doe" size="lg" status="online" fallback="JD" />
```

#### Chip

Compact elements for tags and filters.

```tsx
import { Chip } from 'its-just-ui'
;<Chip variant="primary" closable onClose={handleClose}>
  React
</Chip>
```

#### Carousel

Flexible image and content carousel with multiple transition effects.

```tsx
import { Carousel, CarouselSlide } from 'its-just-ui'

// Basic carousel
<Carousel height="400px" width="600px">
  <CarouselSlide>
    <img src="/image1.jpg" alt="Slide 1" />
  </CarouselSlide>
  <CarouselSlide>
    <img src="/image2.jpg" alt="Slide 2" />
  </CarouselSlide>
</Carousel>

// With autoplay and fade effect
<Carousel
  variant="fade"
  autoplay
  autoplayInterval={3000}
  loop
  pauseOnHover
>
  <CarouselSlide>Content 1</CarouselSlide>
  <CarouselSlide>Content 2</CarouselSlide>
</Carousel>

// Advanced variants
<Carousel variant="zoom">...</Carousel>
<Carousel variant="stacked">...</Carousel>
<Carousel variant="coverflow">...</Carousel>

// Controlled mode
<Carousel
  currentIndex={currentIndex}
  onSlideChange={setCurrentIndex}
>
  {slides}
</Carousel>
```

**Features:**

- Multiple variants: default, fade, slide, zoom, stacked, coverflow
- Autoplay with customizable interval
- Touch/swipe support
- Keyboard navigation
- Customizable controls and indicators
- Controlled and uncontrolled modes
- Lazy loading support
- Responsive design
- Full accessibility support

### Feedback Components

Components for user feedback and notifications.

#### Alert

Important messages and notifications.

```tsx
import { Alert } from 'its-just-ui'
;<Alert variant="success" dismissible>
  <Alert.Title>Success!</Alert.Title>
  <Alert.Description>Your changes have been saved.</Alert.Description>
</Alert>
```

#### Skeleton

Loading placeholders.

```tsx
import { Skeleton } from 'its-just-ui'

<Skeleton variant="text" lines={3} />
<Skeleton variant="rectangular" width="100%" height="200px" />
<Skeleton variant="circular" width="40px" height="40px" />
```

#### Tooltip

Contextual information on hover.

```tsx
import { Tooltip } from 'its-just-ui'
;<Tooltip content="Helpful information" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

### Layout Components

Components for page structure and layout.

#### Accordion

Collapsible content panels.

```tsx
import { Accordion } from 'its-just-ui'
;<Accordion type="single" collapsible>
  <Accordion.Item value="1">
    <Accordion.Trigger>Question 1</Accordion.Trigger>
    <Accordion.Content>Answer 1</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

#### Dialog

Modal dialogs for important interactions.

```tsx
import { Dialog } from 'its-just-ui'
;<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description>Are you sure you want to continue?</Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog>
```

#### Drawer

Side panel overlays.

```tsx
import { Drawer } from 'its-just-ui'
;<Drawer>
  <Drawer.Trigger asChild>
    <Button>Open Drawer</Button>
  </Drawer.Trigger>
  <Drawer.Content position="right" size="md">
    <Drawer.Header>
      <Drawer.Title>Settings</Drawer.Title>
    </Drawer.Header>
  </Drawer.Content>
</Drawer>
```

#### Stepper

Step-by-step process indicator.

```tsx
import { Stepper } from 'its-just-ui'
;<Stepper activeStep={1} orientation="horizontal">
  <Stepper.Step label="Account" description="Create account" />
  <Stepper.Step label="Profile" description="Setup profile" />
  <Stepper.Step label="Complete" description="Finish setup" />
</Stepper>
```

#### Splitter

Resizable split layouts.

```tsx
import { Splitter } from 'its-just-ui'
;<Splitter direction="horizontal" initialSizes={[30, 70]}>
  <Splitter.Pane index={0}>Left Panel</Splitter.Pane>
  <Splitter.Handle index={0} />
  <Splitter.Pane index={1}>Right Panel</Splitter.Pane>
</Splitter>
```

#### Popover

Floating content overlay.

```tsx
import { Popover } from 'its-just-ui'
;<Popover trigger="hover">
  <Popover.Trigger>Hover for info</Popover.Trigger>
  <Popover.Content>
    <Popover.Arrow />
    <Popover.Title>Information</Popover.Title>
    <Popover.Description>Additional details appear here.</Popover.Description>
  </Popover.Content>
</Popover>
```

## Theming & Customization

### ThemeProvider Integration

The recommended way to theme your application is using the ThemeProvider component:

```tsx
import { ThemeProvider, useTheme } from 'its-just-ui'

// Define your custom theme
const myTheme = {
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
}

// Apply the theme
function App() {
  return (
    <ThemeProvider theme={myTheme} defaultMode="light" storageKey="app-theme">
      <YourComponents />
    </ThemeProvider>
  )
}

// Access theme in components
function ThemedButton() {
  const { currentColors, isDark } = useTheme()

  return (
    <Button
      style={{
        backgroundColor: currentColors.primary,
        color: isDark ? '#000' : '#fff',
      }}
    >
      Themed Button
    </Button>
  )
}
```

### Theme Mode Management

```tsx
function ThemeSwitcher() {
  const { theme, toggleMode, setTheme } = useTheme()

  return (
    <div>
      {/* Toggle between light/dark/system */}
      <Button onClick={toggleMode}>Mode: {theme.mode}</Button>

      {/* Programmatically set theme */}
      <Button onClick={() => setTheme({ mode: 'dark' })}>Set Dark Mode</Button>

      {/* Update specific colors */}
      <Button
        onClick={() =>
          setTheme({
            colors: {
              ...theme.colors,
              light: {
                ...theme.colors.light,
                primary: '#8b5cf6',
              },
            },
          })
        }
      >
        Change Primary Color
      </Button>
    </div>
  )
}
```

### CSS Variables

Customize the entire design system using CSS variables:

```css
:root {
  /* Brand Colors */
  --just-ui-primary: 59 130 246;
  --just-ui-secondary: 100 116 139;
  --just-ui-success: 34 197 94;
  --just-ui-warning: 251 146 60;
  --just-ui-error: 239 68 68;
  --just-ui-info: 59 130 246;

  /* Gray Scale */
  --just-ui-gray-50: 249 250 251;
  --just-ui-gray-100: 243 244 246;
  --just-ui-gray-200: 229 231 235;
  --just-ui-gray-300: 209 213 219;
  --just-ui-gray-400: 156 163 175;
  --just-ui-gray-500: 107 114 128;
  --just-ui-gray-600: 75 85 99;
  --just-ui-gray-700: 55 65 81;
  --just-ui-gray-800: 31 41 55;
  --just-ui-gray-900: 17 24 39;

  /* Spacing */
  --just-ui-spacing-unit: 0.25rem;
  --just-ui-spacing-xs: calc(var(--just-ui-spacing-unit) * 1);
  --just-ui-spacing-sm: calc(var(--just-ui-spacing-unit) * 2);
  --just-ui-spacing-md: calc(var(--just-ui-spacing-unit) * 4);
  --just-ui-spacing-lg: calc(var(--just-ui-spacing-unit) * 6);
  --just-ui-spacing-xl: calc(var(--just-ui-spacing-unit) * 8);

  /* Border Radius */
  --just-ui-radius-sm: 0.125rem;
  --just-ui-radius-md: 0.375rem;
  --just-ui-radius-lg: 0.5rem;
  --just-ui-radius-xl: 0.75rem;
  --just-ui-radius-full: 9999px;

  /* Shadows */
  --just-ui-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --just-ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --just-ui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --just-ui-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* Typography */
  --just-ui-font-sans: system-ui, -apple-system, sans-serif;
  --just-ui-font-mono: ui-monospace, monospace;
  --just-ui-font-size-xs: 0.75rem;
  --just-ui-font-size-sm: 0.875rem;
  --just-ui-font-size-md: 1rem;
  --just-ui-font-size-lg: 1.125rem;
  --just-ui-font-size-xl: 1.25rem;

  /* Animation */
  --just-ui-transition-fast: 150ms;
  --just-ui-transition-normal: 300ms;
  --just-ui-transition-slow: 500ms;
}
```

### Dark Mode

Built-in dark mode support with automatic detection:

```css
/* Automatic dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --just-ui-background: 17 24 39;
    --just-ui-foreground: 249 250 251;
    --just-ui-muted: 31 41 55;
    --just-ui-border: 55 65 81;
  }
}

/* Manual dark mode toggle */
.dark {
  --just-ui-background: 17 24 39;
  --just-ui-foreground: 249 250 251;
}
```

### Component-level Styling

Fine-grained control with style props:

```tsx
<Button
  backgroundColor="#10b981"
  hoverBackgroundColor="#059669"
  borderRadius="12px"
  padding="12px 24px"
  fontSize="18px"
>
  Custom Styled Button
</Button>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions.

### Type Exports

```tsx
import type {
  ButtonProps,
  CheckboxProps,
  InputProps,
  SelectOption,
  TableColumn,
  AnchorProps,
  PopoverProps,
  ProgressSegment,
  SliderMark,
  TreeSelectProps,
  TreeNode,
  TreeSelectValue,
  CheckStrategy,
} from 'its-just-ui'
```

### Generic Components

```tsx
// Typed table columns
const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => `${row.firstName} ${row.lastName}`,
  },
]

// Typed select options
const options: SelectOption<number>[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
]

// Typed tree data
const treeData: TreeNode[] = [
  {
    key: 'engineering',
    title: 'Engineering',
    children: [
      { key: 'frontend', title: 'Frontend Team' },
      { key: 'backend', title: 'Backend Team' },
    ],
  },
]

// Typed tree select handler
const handleTreeChange = (value: TreeSelectValue | TreeSelectValue[] | undefined) => {
  console.log('Selected:', value)
}
```

### Custom Component Props

```tsx
interface CustomButtonProps extends ButtonProps {
  customProp?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />
}
```

## Accessibility

Built with accessibility as a core principle:

### ARIA Support

- ✅ Proper ARIA attributes and roles
- ✅ Semantic HTML elements
- ✅ Screen reader announcements
- ✅ Live regions for dynamic content

### Keyboard Navigation

- ✅ Tab navigation
- ✅ Arrow key navigation
- ✅ Enter/Space activation
- ✅ Escape key handling
- ✅ Focus trapping for modals

### Visual Accessibility

- ✅ WCAG AA color contrast
- ✅ Focus indicators
- ✅ High contrast mode support
- ✅ Reduced motion support

### Testing

- ✅ Tested with NVDA
- ✅ Tested with JAWS
- ✅ Tested with VoiceOver
- ✅ Keyboard-only testing

## Browser Support

Modern browser support with graceful degradation:

| Browser        | Version         |
| -------------- | --------------- |
| Chrome         | Last 2 versions |
| Firefox        | Last 2 versions |
| Safari         | Last 2 versions |
| Edge           | Last 2 versions |
| iOS Safari     | 12.0+           |
| Chrome Android | Last 2 versions |

## Performance

### Bundle Size

Tree-shakeable design for optimal bundle size:

```tsx
// Import only what you need
import { Button, Input } from 'its-just-ui'

// Or import from specific entry points
import Button from 'its-just-ui/Button'
import Input from 'its-just-ui/Input'
```

### Lazy Loading

Components support lazy loading:

```tsx
const Dialog = lazy(() => import('its-just-ui/Dialog'))
const Table = lazy(() => import('its-just-ui/Table'))
```

## Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md).

### Development Setup

```bash
# Clone the repository
git clone https://github.com/its-just-ui/its-just-ui.git
cd its-just-ui

# Install dependencies
npm install

# Start development server
npm run storybook

# Run tests
npm test

# Build library
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Commit Convention

We use conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

## License

MIT © its-just-ui

## Support

- 📧 Email: support@its-just-ui.com
- 💬 Discord: [Join our community](https://discord.gg/its-just-ui)
- 🐛 Issues: [GitHub Issues](https://github.com/its-just-ui/its-just-ui/issues)
- 📚 Docs: [Documentation](https://its-just-ui.com/docs)

## Acknowledgments

Built with ❤️ using:

- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Storybook](https://storybook.js.org/) - Component development

---

<div align="center">
  <strong>Made with ❤️ for the React community</strong>
  <br />
  <sub>Building better UIs, one component at a time</sub>
</div>
