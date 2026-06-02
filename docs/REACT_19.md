# React 19 + its-just-ui — Complete Guide

> **Ship faster on React 19.** its-just-ui v1.6+ is tested on React 19 and remains compatible with React 18 — same APIs, same components, zero drama.

---

## At a glance

| Topic                               | Details                                        |
| ----------------------------------- | ---------------------------------------------- |
| **Supported React versions**        | React `^18.0.0` and React `^19.0.0`            |
| **Peer dependencies**               | `react` and `react-dom` `^18.0.0 \|\| ^19.0.0` |
| **TypeScript types**                | `@types/react` and `@types/react-dom` v19      |
| **Breaking changes in its-just-ui** | None for consumers upgrading from 1.5.x        |
| **Recommended for new projects**    | React 19 + TypeScript 5+                       |

---

## Why React 19 matters for your UI stack

React 19 brings improvements that pair naturally with a component library like its-just-ui:

- **Cleaner client boundaries** — Use Server Components in Next.js 15+ while keeping interactive widgets (Dialog, DatePicker, TreeSelect) in client islands.
- **Improved hydration** — Fewer mismatch surprises when SSR dashboards and marketing pages share the same design system.
- **Modern ref and context patterns** — Components that rely on refs and context (ThemeProvider, Popover, Drawer) align with current React idioms.
- **Future-proof toolchain** — Vite, Storybook 9, and current `@types/react` releases target React 19 first.

its-just-ui does not require you to rewrite components or adopt new APIs. Install the version of React your app uses — the library adapts via peer dependencies.

---

## Quick start (React 19)

### New project

```bash
# Create a Vite + React 19 app (example)
npm create vite@latest my-app -- --template react-ts
cd my-app

# Install React 19 and its-just-ui
npm install react@^19 react-dom@^19 its-just-ui
```

```tsx
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'its-just-ui/styles.css'
import { ThemeProvider } from 'its-just-ui'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultMode="system" enableSystemMode>
      <App />
    </ThemeProvider>
  </StrictMode>
)
```

```tsx
// App.tsx
import { Button, Card, Input } from 'its-just-ui'

export default function App() {
  return (
    <Card className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">React 19 + its-just-ui</h1>
      <Input label="Email" type="email" placeholder="you@company.com" className="mb-4" />
      <Button variant="primary" fullWidth>
        Get started
      </Button>
    </Card>
  )
}
```

### Existing React 18 project

Stay on React 18 until your framework supports 19. its-just-ui works on both:

```bash
npm install its-just-ui@latest
# peer deps satisfied by react@18 and react-dom@18
```

When you are ready:

```bash
npm install react@^19 react-dom@^19
npm install -D @types/react@^19 @types/react-dom@^19
```

Run your test suite and Storybook — component APIs are unchanged.

---

## Framework recipes

### Next.js 15 (App Router)

Use **client components** for interactive its-just-ui widgets:

```tsx
'use client'

import 'its-just-ui/styles.css'
import { ThemeProvider, Button } from 'its-just-ui'

export function UiShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultMode="system" enableSystemMode>
      {children}
    </ThemeProvider>
  )
}
```

Import `its-just-ui/styles.css` once in a root layout or the client shell above.

### Vite + React 19

Already shown in Quick start — ideal for SPAs, internal tools, and Storybook-driven design systems.

### Remix / React Router 7

Wrap the document root with `ThemeProvider` and import styles in `root.tsx`:

```tsx
import 'its-just-ui/styles.css'
import { ThemeProvider } from 'its-just-ui'

export default function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}
```

---

## Compatibility checklist

Before upgrading production apps:

- [ ] `react` and `react-dom` versions match (both 18 or both 19)
- [ ] `@types/react` and `@types/react-dom` match your React major version
- [ ] ESLint `eslint-plugin-react-hooks` is on a current release
- [ ] Framework docs confirm React 19 support (Next, Remix, etc.)
- [ ] Run `npm run build` and visual regression on Dialog, Select, DatePicker, TreeSelect
- [ ] Verify dark mode via `ThemeProvider` after hydration

---

## What we validate in this repo

| Area                            | React 19 status        |
| ------------------------------- | ---------------------- |
| All 36+ components in Storybook | ✅                     |
| Live Playground (`react-live`)  | ✅                     |
| TypeScript strict build         | ✅                     |
| ThemeProvider + system mode     | ✅                     |
| Peer dependency range           | `^18.0.0 \|\| ^19.0.0` |

Development dependencies pin React 19 for Storybook and internal testing. Published packages declare wide peer ranges so **your** app chooses the React major version.

---

## Troubleshooting

### Peer dependency warnings

If npm warns about React versions, align installs:

```bash
npm ls react react-dom
npm install react@^19 react-dom@^19
```

### Type errors after upgrade

```bash
npm install -D @types/react@^19 @types/react-dom@^19
```

Delete `node_modules` and lockfile only if versions are stuck from a partial upgrade.

### Styles missing

Always import the stylesheet once:

```tsx
import 'its-just-ui/styles.css'
```

### Hydration warnings in Next.js

Ensure interactive components are in files with `'use client'` and that `ThemeProvider` wraps only client subtrees that need theme context.

---

## FAQ

### Does its-just-ui require React 19?

No. React 18 and React 19 are supported. New greenfield apps should prefer React 19.

### Will upgrading its-just-ui force a React upgrade?

No. Peer dependencies allow `^18.0.0 || ^19.0.0`.

### Are there its-just-ui API changes for React 19?

No breaking consumer API changes in the 1.6.x line for React 19 support.

### Does the Live Playground work on React 19?

Yes. Storybook and `react-live` run on React 19 in this repository.

### Is this library compatible with React Server Components?

Use its-just-ui in **client components** (or equivalent). Presentational trees can live in Server Components if they do not import interactive primitives directly.

---

## Related documentation

- [README](../README.md) — Full component reference and comparisons
- [Live Playground](./LIVE_PLAYGROUND.md) — Interactive Storybook editing
- [Contributing](../CONTRIBUTING.md) — Local dev with React 19
- [Changelog](../CHANGELOG.md) — Release notes

---

**Questions?** [Open a GitHub issue](https://github.com/its-just-ui/just-ui/issues) or email support@its-just-ui.com.
