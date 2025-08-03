# just-ui

A modern, accessible, and customizable React UI component library built with TypeScript and Tailwind CSS. Create beautiful, consistent user interfaces with ease.

[![npm version](https://img.shields.io/npm/v/just-ui.svg?style=flat)](https://www.npmjs.com/package/just-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **20+ Customizable Components** - Comprehensive set of UI components
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎯 **Tree-shakeable** - Import only what you need
- 🌗 **Theming** - Easy customization with CSS variables
- ⚡ **Lightweight** - Minimal bundle size impact

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
import 'just-ui/dist/index.css'
```

2. Start using components:

```tsx
import { Button, Card, Input } from 'just-ui'

function App() {
  return (
    <Card>
      <h2>Welcome to just-ui</h2>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}
```

## Components

### Accordion

A collapsible content component for organizing information.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'just-ui'

;<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It's styled with Tailwind CSS and fully customizable.</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Props:**

- `type`: 'single' | 'multiple' - Allow single or multiple items open
- `collapsible`: boolean - Allow closing all items
- `defaultValue`: string | string[] - Default open items
- `disabled`: boolean - Disable the accordion

### Alert

Display important messages and notifications.

```tsx
import { Alert, AlertTitle, AlertDescription } from 'just-ui'

;<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>
```

**Variants:** `default`, `success`, `warning`, `error`, `info`

### Autocomplete

A text input with search suggestions.

```tsx
import { Autocomplete } from 'just-ui'

const suggestions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
]

<Autocomplete
  suggestions={suggestions}
  placeholder="Search fruits..."
  onSelect={(item) => console.log(item)}
/>
```

**Props:**

- `suggestions`: Array of suggestion items
- `onSelect`: Callback when item is selected
- `placeholder`: Input placeholder text
- `disabled`: boolean
- `loading`: boolean - Show loading state

### Badge

Small status indicators and labels.

```tsx
import { Badge } from 'just-ui'

<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
<Badge variant="error" rounded>Failed</Badge>
```

**Variants:** `default`, `success`, `warning`, `error`, `info`  
**Sizes:** `sm`, `md`, `lg`

### Breadcrumb

Navigation hierarchy indicator.

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from 'just-ui'

;<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Current Product</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Button

Interactive button component with multiple variants.

```tsx
import { Button } from 'just-ui'

<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="outline" disabled>Disabled</Button>
<Button variant="ghost" loading>Loading...</Button>
<Button variant="destructive" icon={<TrashIcon />}>Delete</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`  
**Sizes:** `sm`, `md`, `lg`  
**Props:**

- `loading`: boolean - Show loading spinner
- `disabled`: boolean - Disable the button
- `icon`: ReactNode - Icon to display
- `fullWidth`: boolean - Make button full width

### Card

Container component for grouping content.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'just-ui'

;<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content of the card</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Chip

Compact elements for displaying tags or selections.

```tsx
import { Chip } from 'just-ui'

<Chip variant="default">Default Chip</Chip>
<Chip variant="primary" onClose={() => console.log('closed')}>
  Removable
</Chip>
<Chip variant="success" icon={<CheckIcon />}>
  With Icon
</Chip>
```

**Variants:** `default`, `primary`, `secondary`, `success`, `warning`, `error`

### Dialog

Modal dialog for important interactions.

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'just-ui'

;<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <div className="flex gap-2 justify-end">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </div>
  </DialogContent>
</Dialog>
```

### Drawer

Side panel overlay for additional content.

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from 'just-ui'

;<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent position="right" size="md">
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
    </DrawerHeader>
    <div className="p-4">Drawer content goes here</div>
  </DrawerContent>
</Drawer>
```

**Positions:** `left`, `right`, `top`, `bottom`  
**Sizes:** `sm`, `md`, `lg`, `xl`, `full`

### Input

Text input field with various states and types.

```tsx
import { Input } from 'just-ui'

<Input placeholder="Enter your email" type="email" />
<Input label="Password" type="password" required />
<Input
  label="Username"
  error
  errorMessage="Username is required"
  helperText="Choose a unique username"
/>
```

**Props:**

- `label`: string - Field label
- `error`: boolean - Error state
- `errorMessage`: string - Error message to display
- `helperText`: string - Helper text below input
- `required`: boolean - Mark as required
- `disabled`: boolean - Disable the input

### List

Display items in a structured list format.

```tsx
import { List, ListItem, ListItemIcon, ListItemText } from 'just-ui'

;<List>
  <ListItem>
    <ListItemIcon>
      <UserIcon />
    </ListItemIcon>
    <ListItemText primary="John Doe" secondary="john@example.com" />
  </ListItem>
  <ListItem>
    <ListItemIcon>
      <EmailIcon />
    </ListItemIcon>
    <ListItemText primary="jane@example.com" />
  </ListItem>
</List>
```

### RadioGroup

Group of radio buttons for single selection.

```tsx
import { RadioGroup, RadioGroupItem } from 'just-ui'

;<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <label htmlFor="option2">Option 2</label>
  </div>
</RadioGroup>
```

### Select

Dropdown selection component with search and multi-select support.

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

**Props:**

- `options`: Array of options
- `multiple`: boolean - Enable multi-select
- `searchable`: boolean - Enable search
- `clearable`: boolean - Show clear button
- `disabled`: boolean
- `loading`: boolean

### Stepper

Step-by-step progress indicator.

```tsx
import { Stepper, Step } from 'just-ui'

const steps = [
  { label: 'Account Details', description: 'Enter your account information' },
  { label: 'Personal Info', description: 'Tell us about yourself' },
  { label: 'Review', description: 'Review and confirm' }
]

<Stepper activeStep={1} orientation="horizontal">
  {steps.map((step, index) => (
    <Step key={index} {...step} />
  ))}
</Stepper>
```

**Props:**

- `activeStep`: number - Current active step
- `orientation`: 'horizontal' | 'vertical'
- `variant`: 'default' | 'circle' | 'dot'

### Switch

Toggle switch for on/off states.

```tsx
import { Switch } from 'just-ui'

;<Switch checked={isEnabled} onCheckedChange={setIsEnabled} label="Enable notifications" />
```

**Props:**

- `checked`: boolean - Controlled state
- `defaultChecked`: boolean - Default state
- `onCheckedChange`: (checked: boolean) => void
- `disabled`: boolean
- `label`: string - Associated label

### ToggleButtons

Group of toggle buttons for multi-selection.

```tsx
import { ToggleButtons, ToggleButton } from 'just-ui'

;<ToggleButtons>
  <ToggleButton value="bold" aria-label="Bold">
    <BoldIcon />
  </ToggleButton>
  <ToggleButton value="italic" aria-label="Italic">
    <ItalicIcon />
  </ToggleButton>
  <ToggleButton value="underline" aria-label="Underline">
    <UnderlineIcon />
  </ToggleButton>
</ToggleButtons>
```

### Tooltip

Contextual information on hover or focus.

```tsx
import { Tooltip } from 'just-ui'

<Tooltip content="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Advanced usage
<Tooltip
  content="Custom tooltip content"
  placement="bottom"
  variant="dark"
  delayOpen={500}
  offsetX={10}
  offsetY={5}
>
  <span>Hover for info</span>
</Tooltip>
```

**Props:**

- `content`: ReactNode - Tooltip content
- `placement`: Position of tooltip (12 options)
- `variant`: 'default' | 'dark' | 'light'
- `delayOpen`: number - Delay before showing
- `delayClose`: number - Delay before hiding
- `offsetX`/`offsetY`: number - Position offset
- `nudgeLeft`/`nudgeRight`/`nudgeTop`/`nudgeBottom`: number - Fine-tune position

## Theming

### Custom Theme

Create a custom theme by modifying CSS variables:

```css
:root {
  /* Colors */
  --just-ui-primary: 59 130 246;
  --just-ui-secondary: 100 116 139;
  --just-ui-success: 34 197 94;
  --just-ui-warning: 251 146 60;
  --just-ui-error: 239 68 68;

  /* Spacing */
  --just-ui-spacing-unit: 0.25rem;

  /* Border Radius */
  --just-ui-radius-sm: 0.125rem;
  --just-ui-radius-md: 0.375rem;
  --just-ui-radius-lg: 0.5rem;

  /* Shadows */
  --just-ui-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --just-ui-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### Dark Mode

just-ui supports dark mode out of the box:

```css
/* Auto dark mode based on system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --just-ui-background: 18 18 18;
    --just-ui-foreground: 250 250 250;
  }
}

/* Manual dark mode */
.dark {
  --just-ui-background: 18 18 18;
  --just-ui-foreground: 250 250 250;
}
```

## TypeScript

just-ui is written in TypeScript and provides complete type definitions:

```tsx
import type { ButtonProps, SelectOption } from 'just-ui'

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}

const options: SelectOption[] = [{ value: '1', label: 'Option 1' }]
```

## Accessibility

All components follow WAI-ARIA guidelines:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Semantic HTML

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/just-ui.git
cd just-ui

# Install dependencies
npm install

# Start development server
npm run storybook

# Build library
npm run build

# Run tests
npm test
```

## License

MIT © [Your Name]

## Acknowledgments

Built with:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Storybook](https://storybook.js.org/)
