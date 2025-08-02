# UI Library Template

A modern, customizable UI component library built with React, TypeScript, and Tailwind CSS. This template provides a solid foundation for building your own design system with pre-configured development tools and example components.

## Features

- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom theme configuration
- 📦 **Tree-shakeable** - Only import what you need
- 🔧 **TypeScript** - Full type safety and IntelliSense support
- 📚 **Storybook** - Component development and documentation
- ⚡ **Vite** - Lightning fast development and build times
- 🎯 **ESLint & Prettier** - Code quality and formatting
- 🧩 **Example Components** - Button, Card, Input, Badge, Alert, and more

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/ui-library-template.git
cd ui-library-template
```

2. Install dependencies:

```bash
npm install
```

3. Start the development environment:

```bash
npm run storybook
```

This will start Storybook at http://localhost:6006

## Development

### Project Structure

```
├── src/
│   ├── components/          # Component source files
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Alert/
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── cn.ts          # Class name utility
│   │   └── index.ts
│   ├── styles/
│   │   └── index.css      # Tailwind CSS imports
│   └── index.ts           # Main entry point
├── .storybook/            # Storybook configuration
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

### Available Scripts

```bash
# Start Storybook development server
npm run storybook

# Build the library
npm run build

# Build Storybook static site
npm run build-storybook

# Run ESLint
npm run lint

# Preview the built library
npm run preview

# Watch mode for development
npm run build:watch
```

### Creating New Components

1. Create a new folder in `src/components/`:

```bash
mkdir src/components/MyComponent
```

2. Create the component file:

```tsx
// src/components/MyComponent/MyComponent.tsx
import React from 'react'
import { cn } from '@/utils'

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          variant === 'primary' && 'primary-styles',
          variant === 'secondary' && 'secondary-styles',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MyComponent.displayName = 'MyComponent'

export { MyComponent }
```

3. Create an index file:

```tsx
// src/components/MyComponent/index.ts
export * from './MyComponent'
```

4. Add to the main components index:

```tsx
// src/components/index.ts
export * from './MyComponent'
```

5. Create a Storybook story:

```tsx
// src/components/MyComponent/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './MyComponent'

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'My Component',
  },
}
```

## Using the Library

### In Your Project

1. Install the library:

```bash
npm install your-ui-library
```

2. Import the CSS:

```tsx
// In your app's entry point
import 'your-ui-library/styles.css'
```

3. Use components:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'your-ui-library'

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a card component from your UI library.</p>
        <Button variant="primary" size="md">
          Click me
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Customizing Tailwind Theme

Modify `tailwind.config.js` to customize your design tokens:

```js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom primary colors
        },
        secondary: {
          // Your custom secondary colors
        },
      },
      // Add more customizations
    },
  },
}
```

## Component Examples

### Button

```tsx
<Button variant="primary" size="md">
  Primary Button
</Button>

<Button variant="outline" size="sm">
  Outline Button
</Button>

<Button variant="destructive" disabled>
  Disabled Button
</Button>
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Input

```tsx
<Input type="email" placeholder="Enter your email" error={false} />
```

### Badge

```tsx
<Badge variant="success" size="sm">
  Active
</Badge>

<Badge variant="warning">
  Pending
</Badge>
```

### Alert

```tsx
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your action was completed successfully.</AlertDescription>
</Alert>
```

## Building for Production

1. Update package.json with your library details:
   - name
   - version
   - description
   - author
   - repository URLs

2. Build the library:

```bash
npm run build
```

This creates:

- `dist/index.js` - ES module build
- `dist/index.cjs` - CommonJS build
- `dist/index.d.ts` - TypeScript declarations
- `dist/styles.css` - Compiled CSS

3. Test locally using npm link:

```bash
npm link
# In your test project
npm link your-ui-library
```

4. Publish to npm:

```bash
npm publish
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this template for your own projects!

## Acknowledgments

Built with:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Storybook](https://storybook.js.org/)
