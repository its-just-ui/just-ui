# Changelog

All notable changes to its-just-ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.6] - 2025-01-11

### Added

- 🎮 **Interactive Live Playground** - Major feature addition for enhanced developer experience
  - Real-time JSX code editing with instant visual feedback
  - Integrated into all 36+ component stories in Storybook
  - Powered by `react-live` (v4.1.8) and `prism-react-renderer` (v2.4.1)
  - Syntax highlighting with GitHub theme
  - Error handling and display for invalid code
  - Grid layout with preview on left, editor on right
  - Full access to all its-just-ui components in playground scope

### Dependencies

- Added `react-live: ^4.1.8` for interactive code playground functionality
- Added `prism-react-renderer: ^2.4.1` for syntax highlighting

### Developer Experience

- Transformed documentation from static to interactive
- Enabled real-time component testing and prototyping
- Improved onboarding experience for new users
- Added copy-paste ready code examples

## [1.5.5] - 2025-01-11

### Fixed

- Logo size improvements in Storybook
- Improved branding consistency

### Changed

- Enhanced Storybook manager styling via `manager-head.html`
- Updated gitignore patterns for better file management

## [1.5.4] - 2025-01-11

### Fixed

- CSS styling issues resolution
- Sitemap improvements

### Changed

- Minor internal optimizations

## [1.5.0 - 1.5.3] - 2025-01

### Added

- Initial stable release with 36+ production-ready components
- Full TypeScript support with comprehensive type definitions
- Dark mode support with automatic detection
- Comprehensive theming system via ThemeProvider
- WAI-ARIA compliant accessibility features
- Tree-shakeable architecture for optimal bundle size

### Components Included

#### Core Components (4)

- Button, Badge, Chip, ThemeProvider

#### Navigation Components (6)

- Anchor, Breadcrumb, Pagination, Stepper, Segmented, ToggleButtons

#### Form Components (11)

- Input, Select, Checkbox, RadioGroup, Switch, Slider
- DatePicker, ColorPicker, Upload, Autocomplete, TreeSelect

#### Data Display Components (7)

- Table, List, Card, Avatar, Carousel, Accordion, Rating

#### Feedback Components (3)

- Alert, Progress, Skeleton

#### Layout Components (6)

- Dialog, Drawer, Popover, Tooltip, Splitter, Cascade

### Features

- Zero configuration setup
- Tailwind CSS integration
- CSS variables for customization
- Keyboard navigation support
- Touch/swipe support for mobile
- Responsive design
- Form validation support
- Async data loading capabilities

## [1.0.0 - 1.4.x] - 2024

### Initial Development

- Component library foundation
- Basic component implementation
- Documentation setup
- Storybook integration
- Build pipeline configuration
- Testing infrastructure
- npm package publication

## Migration Guide

### Upgrading to 1.5.6

The 1.5.6 release is fully backward compatible. To access the new Live Playground feature:

1. Update to the latest version:

```bash
npm update its-just-ui
```

2. Access the playground in Storybook:

- Run `npm run storybook` in your development environment
- Navigate to any component story
- Select the "Live Playground" story variant
- Start editing code in real-time!

3. No code changes required in existing applications

### Bundle Size Impact

The Live Playground feature is only included in development builds (Storybook). Production bundle size remains unchanged at ~150KB gzipped.

## Support

For questions, issues, or feature requests:

- 📧 Email: support@its-just-ui.com
- 🐛 Issues: [GitHub Issues](https://github.com/its-just-ui/its-just-ui/issues)
- 📚 Docs: [Documentation](https://its-just-ui.com/docs)
- 💬 Discord: [Join our community](https://discord.gg/its-just-ui)
