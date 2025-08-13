# Live Playground Documentation

## Overview

The Live Playground is an interactive code editing feature introduced in its-just-ui v1.5.6 that transforms the component documentation experience. It allows developers to edit JSX code in real-time and see immediate visual feedback, making it the perfect tool for learning component APIs, testing configurations, and rapid prototyping.

## Features

### Real-Time Code Editing

- **Instant Feedback**: Changes to code are reflected immediately in the preview
- **JSX Support**: Full JSX syntax support with React components
- **Error Handling**: Clear error messages when code has syntax issues
- **Syntax Highlighting**: Beautiful code highlighting powered by Prism with GitHub theme

### Component Access

All its-just-ui components are available in the playground scope:

- Core components (Button, Card, Badge, Chip)
- Form components (Input, Select, Checkbox, Switch, etc.)
- Navigation components (Anchor, Breadcrumb, Pagination, etc.)
- Data display components (Table, List, Avatar, etc.)
- Layout components (Dialog, Drawer, Popover, etc.)
- And all other 36+ components

### User Interface

- **Split View Layout**: Code editor on the right, live preview on the left
- **Responsive Design**: Adapts to different screen sizes
- **Clean Interface**: Minimal distractions for focused learning

## How to Use

### Accessing the Playground

1. **Via Storybook** (Development):

```bash
npm run storybook
```

Navigate to any component and select the "Live Playground" story.

2. **Via Documentation Site**:
   Visit [https://its-just-ui.com/storybook](https://its-just-ui.com/storybook) and explore any component's playground.

### Basic Usage

The playground starts with a default code example for each component:

```jsx
// Default example for Button component
<Button variant="primary" size="md">
  Click Me
</Button>
```

Simply edit the code in the editor to see changes:

```jsx
// Try changing props
<Button variant="secondary" size="lg" fullWidth>
  Full Width Button
</Button>
```

### Advanced Examples

#### Multiple Components

```jsx
<Card className="p-6 max-w-md">
  <h2 className="text-2xl font-bold mb-4">User Profile</h2>
  <Input label="Name" placeholder="Enter your name" className="mb-4" />
  <Select
    options={[
      { value: 'dev', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
    ]}
    placeholder="Select role"
    className="mb-4"
  />
  <Button variant="primary" fullWidth>
    Save Profile
  </Button>
</Card>
```

#### Using State (with hooks)

```jsx
// Note: State management in playground is limited
// For complex state, use local development
<>
  <Input placeholder="Type something..." className="mb-4" />
  <Button onClick={() => alert('Clicked!')}>Show Alert</Button>
</>
```

#### Styling with Tailwind Classes

```jsx
<div className="flex gap-4 p-4 bg-gray-100 rounded-lg">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
</div>
```

## Technical Implementation

### Architecture

The Live Playground is built using:

- **react-live**: Provides the live coding environment
- **prism-react-renderer**: Syntax highlighting for the code editor
- **Custom LivePlayground Component**: Wraps and configures react-live for our needs

### Component Structure

```typescript
// LivePlayground.tsx structure
interface LivePlaygroundProps {
  code: string // Initial JSX code to display
  noInline?: boolean // Whether to wrap code in render()
  scopeExtras?: Record<string, unknown> // Additional scope items
  className?: string // Custom styling
}
```

### Scope Configuration

The playground scope includes:

- All its-just-ui components
- React and React.Fragment
- Basic React hooks (useState, useEffect, etc.)
- Common utilities

### Code Execution

The playground uses react-live's LiveProvider to:

1. Parse the JSX code
2. Transform it to executable JavaScript
3. Execute in a sandboxed environment
4. Render the result in the preview area

## Best Practices

### For Documentation Authors

1. **Start Simple**: Begin with basic examples that demonstrate core functionality
2. **Show Variations**: Include examples of different props and configurations
3. **Add Comments**: Use comments to explain complex parts
4. **Real-World Examples**: Include practical use cases

Example template:

```jsx
// Basic usage
<Component prop="value" />

// With multiple props
<Component
  prop1="value1"
  prop2="value2"
  onEvent={() => console.log('Event fired')}
/>

// Real-world example
<Card className="p-4">
  <Component prop="value">
    Child content
  </Component>
</Card>
```

### For Users

1. **Start with Defaults**: Begin with the provided example
2. **Incremental Changes**: Make small changes to understand each prop
3. **Check Console**: Use console.log for debugging
4. **Copy Working Code**: Once satisfied, copy the code for your project

## Limitations

### Current Limitations

1. **State Management**: Complex state management is limited
2. **External Dependencies**: Cannot import external libraries
3. **Async Operations**: Limited support for async/await
4. **File Imports**: Cannot import from local files
5. **Performance**: Very large code examples may be slow

### Workarounds

For complex scenarios:

1. Use the playground for initial prototyping
2. Copy the code to your local development environment
3. Add complex state management and external dependencies locally

## Integration Guide

### Adding Playground to a New Component

1. Create the story with playground:

```javascript
// Component.stories.jsx
export const LivePlayground = {
  render: () => (
    <LivePlaygroundComponent
      code={`
<Component 
  prop="value"
>
  Content
</Component>
      `.trim()}
    />
  ),
}
```

2. Ensure component is in scope:

```javascript
// LivePlayground.tsx
const scope = {
  Component,
  // ... other components
}
```

### Customizing the Playground

You can customize the playground appearance:

```jsx
<LivePlayground
  code={code}
  className="custom-playground"
  scopeExtras={{ customUtil: myUtilFunction }}
  noInline={false}
/>
```

## Future Enhancements

Planned improvements for future versions:

1. **Enhanced State Management**: Better support for useState and other hooks
2. **Theme Switching**: Live theme switching in playground
3. **Code Sharing**: Share playground links with code
4. **Multiple Files**: Support for multi-file examples
5. **TypeScript Support**: TypeScript code in playground
6. **Import Support**: Limited import capabilities
7. **Persistence**: Save and load playground sessions
8. **Mobile Experience**: Improved mobile editing experience

## Troubleshooting

### Common Issues

**Issue**: Code changes don't update preview

- **Solution**: Check for syntax errors in the console
- **Solution**: Ensure all brackets and quotes are closed

**Issue**: Component not found

- **Solution**: Verify component name is correct
- **Solution**: Check if component is exported from its-just-ui

**Issue**: Styling not applied

- **Solution**: Ensure Tailwind classes are valid
- **Solution**: Check className prop syntax

**Issue**: Performance issues

- **Solution**: Simplify complex code examples
- **Solution**: Reduce number of components rendered

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Refer to component documentation
3. Visit our [GitHub Issues](https://github.com/its-just-ui/its-just-ui/issues)
4. Join our [Discord community](https://discord.gg/its-just-ui)

## Contributing

We welcome contributions to improve the Live Playground!

### How to Contribute

1. **Report Issues**: Found a bug? Report it on GitHub
2. **Suggest Features**: Have ideas? Share them in discussions
3. **Submit PRs**: Improve the playground code
4. **Improve Examples**: Submit better playground examples

### Development Setup

```bash
# Clone the repository
git clone https://github.com/its-just-ui/its-just-ui.git

# Install dependencies
npm install

# Start development
npm run storybook

# The playground component is located at:
# .storybook/components/LivePlayground.tsx
```

## License

The Live Playground feature is part of its-just-ui and is released under the MIT License.

---

_Last updated: January 2025 (v1.5.6)_
