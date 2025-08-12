Occasion Theming – Quick Start

Add seasonal/festive decorations to your UI with accessibility and reduced-motion support.

Install and wire

```tsx
import { OccasionProvider, DecorationPortal, OccasionDecorator } from 'its-just-ui'

;<OccasionProvider config={{ enabled: true }}>
  <DecorationPortal />
  <OccasionDecorator>
    <Input label="Your name" />
  </OccasionDecorator>
</OccasionProvider>
```

Common recipes

- Confetti only (no adjacent icons)

```tsx
<OccasionProvider config={{ enabledScopes: ['ambient', 'floating', 'clickBurst'] }}>
  <DecorationPortal />
  <OccasionDecorator showAdjacent={false}>
    <Button>Save</Button>
  </OccasionDecorator>
</OccasionProvider>
```

- Manual mode (no date logic)

```tsx
<OccasionProvider config={{ mode: 'manual', forcedOccasion: 'diwali' }}>
  <DecorationPortal />
  <OccasionDecorator>
    <Select label="Country" />
  </OccasionDecorator>
</OccasionProvider>
```

- Limit which occasions show

```tsx
<OccasionProvider config={{ enabledOccasions: ['diwali', 'christmas'] }}>
  <DecorationPortal />
  <OccasionDecorator>
    <Input label="Email" />
  </OccasionDecorator>
</OccasionProvider>
```

- Tweak sizes and intensity

```tsx
<OccasionProvider
  config={{ sizes: { adjacentBasePx: 22, floatingScale: 1.1, ambientDensity: 1.4 } }}
>
  <DecorationPortal />
  <OccasionDecorator>
    <Button>Checkout</Button>
  </OccasionDecorator>
</OccasionProvider>
```

Add a new occasion (5 steps)

1. Add an entry to `src/occasion/OccasionRegistry.tsx` with `id`, `locales`, `rule`, and `assets` (adjacent/floating/ambient).
2. Create asset components under `src/occasion/assets/` (small React components or lazy loaders).
3. Optionally add date helpers/overrides in `src/occasion/dateRules.ts`.
4. Tune behavior with `behavior.onAnyClick` and `maxBurstsPerMinute`.
5. Add tests in `src/tests/occasion.test.tsx`.

Accessibility

- Respects `prefers-reduced-motion` and switches to static badges.
- All decorations are `aria-hidden` and not focusable.
- No flashing >3Hz; animations are rate-limited.

API surface

- `OccasionProvider(config)`
  - `enabled`, `enabledScopes`, `mode`, `forcedOccasion(s)`, `enabledOccasions`, `disabledOccasions`
  - `sizes: { adjacentBasePx, floatingScale, ambientDensity }`
- `DecorationPortal` – mounts floating/ambient via portal
- `OccasionDecorator({ showAdjacent })` – wraps any component; opt-out adjacent icons
