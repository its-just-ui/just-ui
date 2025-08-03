# just-ui

A modern, accessible, and customizable React UI component library built with TypeScript and Tailwind CSS. Create beautiful, consistent user interfaces with ease.

[![npm version](https://img.shields.io/npm/v/just-ui.svg?style=flat)](https://www.npmjs.com/package/just-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- 🎨 **24+ Production-Ready Components** - Comprehensive set of UI components
- 🔧 **Full TypeScript Support** - Complete type safety and IntelliSense
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- ♿ **Accessibility First** - WAI-ARIA compliant with keyboard navigation
- 🎯 **Tree-shakeable** - Import only what you need for optimal bundle size
- 🌗 **Dark Mode Ready** - Built-in theming with CSS variables
- ⚡ **Zero Dependencies** - Lightweight with minimal external dependencies
- 🎛️ **Highly Customizable** - Extensive styling props and theme support
- 📚 **Storybook Documentation** - Interactive component explorer

## Installation

```bash
npm install just-ui
```

or

```bash
yarn add just-ui
```

or

```bash
pnpm add just-ui
```

## Quick Start

1. Import the CSS in your app's entry point:

```tsx
// main.tsx or App.tsx
import 'just-ui/dist/styles.css'
```

2. Start using components:

```tsx
import { Button, Card, Input, Checkbox } from 'just-ui'

function App() {
  return (
    <Card>
      <h2>Welcome to just-ui</h2>
      <Input placeholder="Enter your name" />
      <Checkbox label="I agree to the terms" />
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}
```

## Components

### Accordion

A collapsible content component for organizing information with support for single/multiple open items.

```tsx
import { Accordion } from 'just-ui'
;<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Is it styled?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It's styled with Tailwind CSS and fully customizable.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

**Props:** `type` ('single' | 'multiple'), `collapsible`, `defaultValue`, `disabled`

### Alert

Display important messages and notifications with multiple variants and dismissible options.

```tsx
import { Alert } from 'just-ui'
;<Alert variant="success" dismissible>
  <Alert.Title>Success!</Alert.Title>
  <Alert.Description>Your changes have been saved successfully.</Alert.Description>
</Alert>
```

**Variants:** `default`, `success`, `warning`, `error`, `info`

### Autocomplete

A powerful text input with search suggestions, async loading, and multi-select support.

```tsx
import { Autocomplete } from 'just-ui'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
]

<Autocomplete
  options={options}
  placeholder="Search fruits..."
  searchable
  onSelect={(item) => console.log(item)}
/>
```

**Features:** Search filtering, async loading, multi-select, custom rendering, keyboard navigation

### Avatar

Display user profile pictures with fallbacks and status indicators.

```tsx
import { Avatar } from 'just-ui'
;<Avatar src="/user.jpg" alt="John Doe" size="lg" status="online" fallback="JD" />
```

**Sizes:** `sm`, `md`, `lg`, `xl`  
**Status:** `online`, `offline`, `away`, `busy`

### Badge

Small status indicators and labels with extensive customization options.

```tsx
import { Badge } from 'just-ui'

<Badge variant="success" size="md">Active</Badge>
<Badge variant="warning" size="sm" closable>Pending</Badge>
<Badge variant="error" rounded>Failed</Badge>
```

**Variants:** `default`, `primary`, `secondary`, `success`, `warning`, `error`, `info`  
**Sizes:** `sm`, `md`, `lg`

### Breadcrumb

Navigation hierarchy indicator with customizable separators.

```tsx
import { Breadcrumb } from 'just-ui'
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

**Features:** Custom separators, overflow handling, current page highlighting

### Button

Interactive button component with multiple variants and states.

```tsx
import { Button } from 'just-ui'

<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary" size="sm" icon={<Icon />}>With Icon</Button>
<Button variant="outline" disabled>Disabled</Button>
<Button variant="ghost" loading>Loading...</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`  
**Sizes:** `sm`, `md`, `lg`  
**Features:** Loading states, icons, full width option

### Card

Flexible container component for grouping content with various layouts.

```tsx
import { Card } from 'just-ui'
;<Card variant="elevated" selectable>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description goes here</Card.Description>
  </Card.Header>
  <Card.Body>
    <p>Main content of the card</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Features:** Selection states, expandable content, badges, custom styling

### Checkbox ⭐ _New_

A comprehensive checkbox component with tri-state support, groups, and extensive customization.

```tsx
import { Checkbox } from 'just-ui'

// Basic checkbox
<Checkbox label="Accept terms and conditions" />

// Controlled checkbox
const [checked, setChecked] = useState(false)
<Checkbox
  checked={checked}
  onChange={setChecked}
  label="Subscribe to newsletter"
/>

// Tri-state checkbox
<Checkbox
  indeterminate={true}
  label="Select all items"
/>

// Checkbox group with select all
<Checkbox.Group label="Select features" value={selectedFeatures} onChange={setSelectedFeatures}>
  <Checkbox.SelectAll />
  <Checkbox.Item value="feature1" label="Feature 1" />
  <Checkbox.Item value="feature2" label="Feature 2" />
  <Checkbox.Item value="feature3" label="Feature 3" />
</Checkbox.Group>
```

**Key Features:**

- **7 Visual Variants:** `default`, `filled`, `outlined`, `ghost`, `toggle`, `switch`, `card`
- **3 Sizes:** `sm`, `md`, `lg` with consistent spacing
- **Tri-state Logic:** Unchecked, checked, and indeterminate states
- **Group Management:** Built-in group component with select-all functionality
- **Status States:** `success`, `warning`, `error`, `info` with visual feedback
- **Loading State:** Built-in spinner for async operations
- **Extensive Styling:** 40+ style props for complete customization
- **Form Ready:** Validation, error handling, helper text
- **Accessibility:** Full ARIA support, keyboard navigation

**Advanced Styling:**

```tsx
<Checkbox
  label="Custom styled checkbox"
  variant="filled"
  size="lg"
  checkedBackgroundColor="#10b981"
  borderRadius="8px"
  focusRingColor="#10b981"
  labelTextSize="18px"
  labelTextColor="#059669"
  helperText="With extensive customization options"
/>
```

### Chip

Compact elements for displaying tags, filters, or selections.

```tsx
import { Chip } from 'just-ui'

<Chip variant="default">Default Chip</Chip>
<Chip variant="primary" closable onClose={() => console.log('closed')}>
  Removable
</Chip>
<Chip variant="success" icon={<CheckIcon />}>
  With Icon
</Chip>
```

**Variants:** `default`, `primary`, `secondary`, `success`, `warning`, `error`

### Dialog

Modal dialog component for important interactions and confirmations.

```tsx
import { Dialog } from 'just-ui'
;<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure?</Dialog.Title>
      <Dialog.Description>This action cannot be undone.</Dialog.Description>
    </Dialog.Header>
    <div className="flex gap-2 justify-end">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </div>
  </Dialog.Content>
</Dialog>
```

**Features:** Focus management, escape key handling, backdrop close, custom sizes

### Drawer

Side panel overlay for navigation, filters, or additional content.

```tsx
import { Drawer } from 'just-ui'
;<Drawer>
  <Drawer.Trigger asChild>
    <Button>Open Drawer</Button>
  </Drawer.Trigger>
  <Drawer.Content position="right" size="md">
    <Drawer.Header>
      <Drawer.Title>Drawer Title</Drawer.Title>
    </Drawer.Header>
    <div className="p-4">Drawer content goes here</div>
  </Drawer.Content>
</Drawer>
```

**Positions:** `left`, `right`, `top`, `bottom`  
**Sizes:** `sm`, `md`, `lg`, `xl`, `full`

### Input

Versatile text input field with labels, validation, and various states.

```tsx
import { Input } from 'just-ui'

<Input placeholder="Enter your email" type="email" />
<Input
  label="Password"
  type="password"
  required
  helperText="Must be at least 8 characters"
/>
<Input
  label="Username"
  error
  errorMessage="Username is required"
/>
```

**Features:** Multiple input types, validation states, helper text, icons

### List

Display items in a structured, selectable list format.

```tsx
import { List } from 'just-ui'
;<List selectable>
  <List.Item>
    <List.ItemIcon>
      <UserIcon />
    </List.ItemIcon>
    <List.ItemText primary="John Doe" secondary="john@example.com" />
  </List.Item>
  <List.Item>
    <List.ItemIcon>
      <EmailIcon />
    </List.ItemIcon>
    <List.ItemText primary="jane@example.com" />
  </List.Item>
</List>
```

**Features:** Selection modes, icons, secondary text, dividers

### Pagination

Navigation for paginated content with various display options.

```tsx
import { Pagination } from 'just-ui'
;<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showPageNumbers
  showPageSizeSelector
  showTotalCount
/>
```

**Features:** Page size selection, jump to page, total count display

### RadioGroup

Group of radio buttons for single selection with flexible layouts.

```tsx
import { RadioGroup } from 'just-ui'
;<RadioGroup defaultValue="option1" orientation="vertical">
  <RadioGroup.Item value="option1" label="Option 1" />
  <RadioGroup.Item value="option2" label="Option 2" />
  <RadioGroup.Item value="option3" label="Option 3" disabled />
</RadioGroup>
```

**Orientations:** `horizontal`, `vertical`

### Rating

Star rating component for user feedback and reviews.

```tsx
import { Rating } from 'just-ui'
;<Rating value={rating} onChange={setRating} precision={0.5} size="lg" readOnly={false} />
```

**Features:** Half-star precision, custom icons, read-only mode

### Select

Advanced dropdown selection with search, multi-select, and grouping.

```tsx
import { Select } from 'just-ui'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' }
]

<Select
  options={options}
  placeholder="Select a framework"
  searchable
  clearable
  onChange={(value) => console.log(value)}
/>

// Multi-select
<Select
  options={options}
  multiple
  searchable
  placeholder="Select frameworks"
/>
```

**Features:** Multi-select, search, grouping, async loading, custom rendering

### Skeleton

Loading placeholders that match your content structure.

```tsx
import { Skeleton } from 'just-ui'
;<div className="space-y-4">
  <Skeleton variant="rectangular" width="100%" height="200px" />
  <Skeleton variant="text" lines={3} />
  <Skeleton variant="circular" width="40px" height="40px" />
</div>
```

**Variants:** `text`, `rectangular`, `circular`

### Stepper

Step-by-step progress indicator for workflows and forms.

```tsx
import { Stepper } from 'just-ui'

const steps = [
  { label: 'Account Details', description: 'Enter your information' },
  { label: 'Verification', description: 'Verify your email' },
  { label: 'Complete', description: 'Finish setup' }
]

<Stepper activeStep={1} orientation="horizontal">
  {steps.map((step, index) => (
    <Stepper.Step key={index} {...step} />
  ))}
</Stepper>
```

**Orientations:** `horizontal`, `vertical`  
**Features:** Custom icons, error states, clickable steps

### Switch

Toggle switch for on/off states with smooth animations.

```tsx
import { Switch } from 'just-ui'
;<Switch
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
  label="Enable notifications"
  size="lg"
/>
```

**Sizes:** `sm`, `md`, `lg`  
**Features:** Custom labels, disabled states, controlled/uncontrolled

### Table

Comprehensive data table with sorting, filtering, pagination, and more.

```tsx
import { Table } from 'just-ui'

const columns = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email', filterable: true },
  { id: 'role', header: 'Role', accessorKey: 'role' },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ value }) => <Badge variant={value === 'active' ? 'success' : 'error'}>{value}</Badge>
  }
]

<Table
  data={users}
  columns={columns}
  variant="striped"
  selectionMode="multiple"
  enableSorting
  enableFiltering
  enablePagination
  pagination={{ pageSize: 10 }}
/>
```

**Key Features:**

- **Sorting:** Single and multi-column sorting
- **Filtering:** Column-level and global search
- **Selection:** Single and multiple row selection
- **Pagination:** Client and server-side pagination
- **Expansion:** Expandable rows with custom content
- **Editing:** Inline cell editing
- **Virtualization:** Handle large datasets efficiently
- **Accessibility:** Full ARIA compliance with keyboard navigation

### ToggleButtons

Group of toggle buttons for multi-selection scenarios.

```tsx
import { ToggleButtons } from 'just-ui'
;<ToggleButtons>
  <ToggleButtons.Item value="bold" aria-label="Bold">
    <BoldIcon />
  </ToggleButtons.Item>
  <ToggleButtons.Item value="italic" aria-label="Italic">
    <ItalicIcon />
  </ToggleButtons.Item>
  <ToggleButtons.Item value="underline" aria-label="Underline">
    <UnderlineIcon />
  </ToggleButtons.Item>
</ToggleButtons>
```

### Cascade

Hierarchical dropdown/select component for nested options, ideal for location pickers, category trees, and more.

```tsx
import { Cascade } from 'just-ui'

const options = [
  {
    label: 'Asia',
    value: 'asia',
    children: [
      {
        label: 'India',
        value: 'india',
        children: [
          { label: 'Delhi', value: 'delhi' },
          { label: 'Mumbai', value: 'mumbai' }
        ]
      },
      {
        label: 'Japan',
        value: 'japan',
        children: [
          { label: 'Tokyo', value: 'tokyo' },
          { label: 'Osaka', value: 'osaka' }
        ]
      }
    ]
  },
  {
    label: 'Europe',
    value: 'europe',
    children: [
      {
        label: 'Germany',
        value: 'germany',
        children: [
          { label: 'Berlin', value: 'berlin' },
          { label: 'Munich', value: 'munich' }
        ]
      }
    ]
  }
]

// Basic usage
<Cascade
  options={options}
  placeholder="Select location"
  onChange={(value) => console.log(value)}
  searchable
  clearable
/>

// Advanced usage with multiple selection
<Cascade
  options={options}
  multiple
  placeholder="Select multiple locations"
  onChange={(values) => console.log(values)}
  searchable
  clearable
  showPath
  maxLevels={3}
  variant="filled"
  size="lg"
/>

// With custom rendering
<Cascade
  options={options}
  renderOption={(option, isSelected, level) => (
    <div className="flex items-center gap-2">
      <span>{option.label}</span>
      {option.icon && <span>{option.icon}</span>}
      {isSelected && <CheckIcon />}
    </div>
  )}
  renderValue={(value) => (
    <span className="font-medium">{value?.label}</span>
  )}
/>
```

**Key Features:**

- **Multi-level Selection:** Navigate through nested options with unlimited depth
- **Search & Filter:** Search across all levels with real-time filtering
- **Multiple Selection:** Support for single and multiple value selection
- **Custom Rendering:** Customize option and value display with render functions
- **Keyboard Navigation:** Full keyboard support with arrow keys and shortcuts
- **Accessibility:** ARIA compliant with screen reader support
- **Loading States:** Built-in loading indicators for async data
- **Path Display:** Show selected path with customizable separators
- **Form Integration:** Works seamlessly with form libraries
- **Validation:** Error states and helper text support

**Props:**

**Core:** `options`, `placeholder`, `onChange`, `defaultValue`, `value`  
**Selection:** `multiple`, `maxLevels`, `showPath`  
**Interaction:** `searchable`, `clearable`, `disabled`, `loading`  
**Styling:** `variant`, `size`, `status`, `placement`  
**Customization:** `renderOption`, `renderValue`, `renderEmpty`, `renderPath`  
**Animation:** `transition`, `transitionDuration`  
**Icons:** `dropdownIcon`, `clearIcon`, `loadingIcon`  
**Messages:** `emptyMessage`, `loadingMessage`, `helperText`, `errorMessage`

**Variants:** `default`, `filled`, `outlined`, `ghost`, `underlined`  
**Sizes:** `sm`, `md`, `lg`  
**Status:** `default`, `success`, `warning`, `error`

### Tooltip

Contextual information on hover or focus with smart positioning.

```tsx
import { Tooltip } from 'just-ui'

<Tooltip content="This is a helpful tooltip" placement="top">
  <Button>Hover me</Button>
</Tooltip>

// Advanced usage
<Tooltip
  content="Custom tooltip content"
  placement="bottom-start"
  variant="dark"
  delayOpen={500}
  offsetX={10}
  offsetY={5}
>
  <span>Hover for info</span>
</Tooltip>
```

**Features:** 12 placement options, auto-positioning, custom delays, variants

## Theming & Customization

### CSS Variables

Customize the design system with CSS variables:

```css
:root {
  /* Brand Colors */
  --just-ui-primary: 59 130 246;
  --just-ui-secondary: 100 116 139;
  --just-ui-success: 34 197 94;
  --just-ui-warning: 251 146 60;
  --just-ui-error: 239 68 68;

  /* Spacing Scale */
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

  /* Shadows */
  --just-ui-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --just-ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --just-ui-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Typography */
  --just-ui-font-size-xs: 0.75rem;
  --just-ui-font-size-sm: 0.875rem;
  --just-ui-font-size-md: 1rem;
  --just-ui-font-size-lg: 1.125rem;
  --just-ui-font-size-xl: 1.25rem;
}
```

### Dark Mode Support

Built-in dark mode with system preference detection:

```css
/* Auto dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --just-ui-background: 18 18 18;
    --just-ui-foreground: 250 250 250;
    --just-ui-muted: 39 39 42;
    --just-ui-border: 63 63 70;
  }
}

/* Manual dark mode */
.dark {
  --just-ui-background: 18 18 18;
  --just-ui-foreground: 250 250 250;
  --just-ui-muted: 39 39 42;
  --just-ui-border: 63 63 70;
}
```

### Component-level Customization

Most components accept style props for fine-grained control:

```tsx
<Button
  variant="primary"
  backgroundColor="#10b981"
  hoverBackgroundColor="#059669"
  borderRadius="12px"
  padding="12px 24px"
>
  Custom Button
</Button>

<Checkbox
  variant="filled"
  checkedBackgroundColor="#8b5cf6"
  focusRingColor="#8b5cf6"
  labelTextColor="#6b21a8"
  borderRadius="6px"
/>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { ButtonProps, CheckboxProps, TableColumn, SelectOption } from 'just-ui'

// Custom button component
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}

// Typed table columns
const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => (
      <span>
        {row.firstName} {row.lastName}
      </span>
    ),
  },
]

// Typed select options
const options: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
]
```

## Accessibility

All components are built with accessibility in mind:

- ✅ **ARIA Compliance:** Proper ARIA attributes and roles
- ✅ **Keyboard Navigation:** Full keyboard support
- ✅ **Screen Readers:** Compatible with assistive technologies
- ✅ **Focus Management:** Logical focus flow and indicators
- ✅ **Color Contrast:** WCAG AA compliant color combinations
- ✅ **Semantic HTML:** Uses appropriate semantic elements

## Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)

## Bundle Size

Tree-shakeable design means you only bundle what you use:

```tsx
// Import only what you need
import { Button, Checkbox } from 'just-ui'

// Or import from specific modules
import { Button } from 'just-ui/Button'
import { Checkbox } from 'just-ui/Checkbox'
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/just-ui.git
cd just-ui

# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Build the library
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## License

MIT © just-ui

## Acknowledgments

Built with love using:

- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool
- [Storybook](https://storybook.js.org/) - Component documentation

---

**Made with ❤️ for the React community**
