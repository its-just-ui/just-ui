import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { OccasionDecorator } from './OccasionDecorator'
import { OccasionButton } from './OccasionButton'
import { OccasionAutocomplete } from './OccasionAutocomplete'
import { OccasionCard } from './OccasionCard'
import { OccasionList } from './OccasionList'
import { OccasionSwitch } from './OccasionSwitch'
import { OccasionTable } from './OccasionTable'
import { Input } from '../Input'
import { Button } from '../Button'
import { Card } from '../Card'
import { Select } from '../Select'
import { Checkbox } from '../Checkbox'
import { LocalOccasionLayer } from './LocalOccasionLayer'

const meta: Meta<typeof OccasionDecorator> = {
  title: 'Decorations/OccasionDecorator',
  component: OccasionDecorator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
OccasionDecorator adds occasion-aware decorations to any component.

## Features
- **Adjacent**: Small inline icon next to labels
- **Floating**: Subtle corner motif via portal
- **Ambient**: Confetti/snow/etc. (respects reduced motion)
- **Click bursts**: Rate-limited celebratory burst on clicks

## Usage

### Basic
\`\`\`tsx
<OccasionProvider config={{ enabled: true }}>
  <DecorationPortal />
  <OccasionDecorator>
    <Input label="Your name" />
  </OccasionDecorator>
</OccasionProvider>
\`\`\`

### Confetti only (no adjacent icons)
\`\`\`tsx
<OccasionProvider config={{ enabledScopes: ['ambient', 'floating', 'clickBurst'] }}>
  <DecorationPortal />
  <OccasionDecorator showAdjacent={false}>
    <Button>Save</Button>
  </OccasionDecorator>
</OccasionProvider>
\`\`\`

### Manual mode (force an occasion)
\`\`\`tsx
<OccasionProvider config={{ mode: 'manual', forcedOccasion: 'diwali' }}>
  <DecorationPortal />
  <OccasionDecorator>
    <Select label="Country" />
  </OccasionDecorator>
</OccasionProvider>
\`\`\`

### Size and intensity
\`\`\`tsx
<OccasionProvider config={{ sizes: { adjacentBasePx: 22, floatingScale: 1.1, ambientDensity: 1.4 } }}>
  <DecorationPortal />
  <OccasionDecorator>
    <Button>Checkout</Button>
  </OccasionDecorator>
</OccasionProvider>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    decorate: { control: 'boolean' },
    scope: {
      control: 'radio',
      options: ['adjacent', 'floating', 'ambient', 'clickBurst', 'all'],
    },
    showAdjacent: { control: 'boolean' },
  },
  args: {
    decorate: true,
    scope: 'adjacent',
    showAdjacent: true,
  },
}

export default meta
type Story = StoryObj<typeof OccasionDecorator>

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
        <OccasionDecorator {...args}>
          <Input label="Your name" placeholder="Jane Doe" />
        </OccasionDecorator>
        <OccasionDecorator scope="clickBurst">
          <Button>Click me</Button>
        </OccasionDecorator>
        <OccasionDecorator>
          <Select
            label="Favorite"
            options={[
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
            ]}
            placeholder="Pick one"
          />
        </OccasionDecorator>
        <OccasionDecorator>
          <Checkbox label="Accept terms" />
        </OccasionDecorator>
      </div>
      <Card className="p-4">
        <div className="space-y-3">
          <OccasionDecorator>
            <Button status="secondary">Inside Card</Button>
          </OccasionDecorator>
          <OccasionDecorator>
            <Input label="Email" placeholder="you@example.com" />
          </OccasionDecorator>
        </div>
      </Card>
    </div>
  ),
}

export const LocalOnly: Story = {
  name: 'Local-only decorations',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <LocalOccasionLayer>
        <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <Input label="Local ambient + floating" placeholder="Inside bounds" />
        </div>
      </LocalOccasionLayer>
      <LocalOccasionLayer showFloating={false}>
        <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <Input label="Ambient only" placeholder="No floating" />
        </div>
      </LocalOccasionLayer>
    </div>
  ),
}

export const OccasionButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <h3>Button Variants</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <OccasionButton variant="primary">Primary</OccasionButton>
        <OccasionButton variant="secondary">Secondary</OccasionButton>
        <OccasionButton variant="success">Success</OccasionButton>
        <OccasionButton variant="danger">Danger</OccasionButton>
        <OccasionButton variant="warning">Warning</OccasionButton>
        <OccasionButton variant="ghost">Ghost</OccasionButton>
      </div>

      <h3>Button Sizes</h3>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <OccasionButton size="small">Small</OccasionButton>
        <OccasionButton size="medium">Medium</OccasionButton>
        <OccasionButton size="large">Large</OccasionButton>
        <OccasionButton size="xlarge">X-Large</OccasionButton>
      </div>

      <h3>Button Features</h3>
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <OccasionButton loading>Loading...</OccasionButton>
        <OccasionButton disabled>Disabled</OccasionButton>
        <OccasionButton fullWidth>Full Width Button</OccasionButton>
        <OccasionButton rounded elevated>
          Send Email
        </OccasionButton>
      </div>
    </div>
  ),
}

const autocompleteOptions = [
  { value: 'apple', label: 'Apple', description: 'Red and sweet' },
  { value: 'banana', label: 'Banana', description: 'Yellow fruit' },
  { value: 'cherry', label: 'Cherry', description: 'Small and juicy' },
  { value: 'date', label: 'Date', description: 'Sweet and chewy' },
  { value: 'elderberry', label: 'Elderberry', description: 'Tart berry', group: 'Berries' },
  { value: 'fig', label: 'Fig', description: 'Sweet fruit', group: 'Exotic' },
  { value: 'grape', label: 'Grape', description: 'Bunches', group: 'Berries' },
]

export const OccasionAutocompletes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div style={{ width: '300px' }}>
        <h3>Standard Autocomplete</h3>
        <OccasionAutocomplete
          options={autocompleteOptions}
          placeholder="Select a fruit..."
          size="medium"
          clearable
          decorateOptions
        />
      </div>

      <div style={{ width: '300px' }}>
        <h3>Autocomplete Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <OccasionAutocomplete
            options={autocompleteOptions}
            variant="outlined"
            placeholder="Outlined"
          />
          <OccasionAutocomplete
            options={autocompleteOptions}
            variant="filled"
            placeholder="Filled"
          />
          <OccasionAutocomplete
            options={autocompleteOptions}
            variant="borderless"
            placeholder="Borderless"
            multiple
          />
        </div>
      </div>
    </div>
  ),
}

export const OccasionCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        <OccasionCard
          variant="elevated"
          title="Holiday Special"
          subtitle="Limited offer"
          description="Get 50% off during the festive season!"
          badge="NEW"
          badgePosition="top-right"
          hoverable
          clickable
          actions={
            <>
              <OccasionButton size="small" variant="primary">
                Buy Now
              </OccasionButton>
              <OccasionButton size="small" variant="ghost">
                Learn More
              </OccasionButton>
            </>
          }
        >
          <p>Special seasonal content!</p>
        </OccasionCard>

        <OccasionCard
          variant="gradient"
          title="Premium Feature"
          subtitle="Unlock more"
          image="https://via.placeholder.com/400x200"
          imagePosition="top"
          imageHeight={150}
          hoverable
        >
          <p>Gradient background with image</p>
        </OccasionCard>

        <OccasionCard
          variant="outlined"
          layout="horizontal"
          image="https://via.placeholder.com/150"
          imagePosition="left"
          title="Horizontal Card"
          description="Side-by-side layout"
        >
          <p>Content alongside image</p>
        </OccasionCard>
      </div>
    </div>
  ),
}

const listItems = [
  {
    id: 1,
    primary: 'Inbox',
    secondary: '12 new messages',
    metadata: 'Updated 5 min ago',
    actions: (
      <OccasionButton size="small" variant="ghost">
        View
      </OccasionButton>
    ),
  },
  {
    id: 2,
    primary: 'Drafts',
    secondary: '3 unsent',
    actions: (
      <OccasionButton size="small" variant="ghost">
        Edit
      </OccasionButton>
    ),
  },
  {
    id: 3,
    primary: 'Sent',
    secondary: 'All sent',
    metadata: 'Last: 2 hours ago',
  },
  {
    id: 4,
    primary: 'Spam',
    secondary: '99+ messages',
    disabled: true,
  },
]

export const OccasionLists: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div style={{ maxWidth: '500px' }}>
        <h3>Standard List</h3>
        <OccasionList
          items={listItems}
          variant="bordered"
          size="medium"
          hoverable
          divided
          decorateItems
          header="Mail Folders"
          footer="4 folders total"
        />
      </div>

      <div style={{ maxWidth: '500px' }}>
        <h3>Interactive List</h3>
        <OccasionList items={listItems} variant="separated" selectable multiSelect sortable />
      </div>
    </div>
  ),
}

export const OccasionSwitches: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div>
        <h3>Switch Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <OccasionSwitch label="Default Switch" description="Standard toggle" />
          <OccasionSwitch label="iOS Style" variant="ios" color="success" defaultChecked />
          <OccasionSwitch
            label="Material Style"
            variant="material"
            color="primary"
            labelPosition="left"
          />
          <OccasionSwitch label="Rounded Style" variant="rounded" color="warning" showDecoration />
        </div>
      </div>

      <div>
        <h3>Switch Sizes</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <OccasionSwitch size="small" label="Small" />
          <OccasionSwitch size="medium" label="Medium" defaultChecked />
          <OccasionSwitch size="large" label="Large" />
        </div>
      </div>
    </div>
  ),
}

const tableColumns = [
  { key: 'id', header: 'ID', sortable: true, width: 80, align: 'center' as const },
  { key: 'name', header: 'Name', sortable: true, filterable: true },
  { key: 'email', header: 'Email', sortable: true, filterable: true },
  { key: 'role', header: 'Role', sortable: true, filterable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value: unknown) => (
      <span
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          background: (value as string) === 'Active' ? '#10b981' : '#ef4444',
          color: 'white',
          fontSize: '0.875rem',
        }}
      >
        {String(value)}
      </span>
    ),
  },
]

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
]

export const OccasionTables: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div>
        <h3>Full Featured Table</h3>
        <OccasionTable
          columns={tableColumns}
          data={tableData}
          variant="bordered"
          size="medium"
          sortable
          filterable
          selectable
          multiSelect
          pagination
          pageSize={3}
          decorateHeaders
        />
      </div>

      <div>
        <h3>Simple Striped Table</h3>
        <OccasionTable
          columns={tableColumns.slice(0, 4)}
          data={tableData.slice(0, 3)}
          variant="striped"
          size="small"
        />
      </div>
    </div>
  ),
}

export const CompleteShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', flexDirection: 'column', padding: '2rem' }}>
      <section>
        <h2>Occasion-Themed Buttons</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <OccasionButton variant="primary">Christmas Sale</OccasionButton>
          <OccasionButton variant="success" rounded>
            Continue
          </OccasionButton>
          <OccasionButton variant="warning" elevated>
            Special Offer
          </OccasionButton>
        </div>
      </section>

      <section>
        <h2>Interactive Cards</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <OccasionCard variant="elevated" title="Festival Special" badge="50% OFF" hoverable>
            Limited time holiday offer!
          </OccasionCard>
          <OccasionCard variant="gradient" title="Premium Access">
            Get premium during the season
          </OccasionCard>
        </div>
      </section>

      <section>
        <h2>Form Controls</h2>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexDirection: 'column',
            marginTop: '1rem',
            maxWidth: '400px',
          }}
        >
          <OccasionAutocomplete
            options={autocompleteOptions}
            placeholder="Choose your favorite..."
            clearable
          />
          <OccasionSwitch
            label="Enable holiday theme"
            description="Apply seasonal decorations"
            defaultChecked
            showDecoration
          />
        </div>
      </section>

      <section>
        <h2>Data Display</h2>
        <div style={{ marginTop: '1rem' }}>
          <OccasionTable
            columns={tableColumns.slice(0, 5)}
            data={tableData.slice(0, 5)}
            variant="striped"
            sortable
            selectable
            pagination
            pageSize={3}
            decorateHeaders
          />
        </div>
      </section>
    </div>
  ),
}

export const Playground: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <OccasionDecorator>
        <Input label="Playground Input" placeholder="Type here" />
      </OccasionDecorator>
      <OccasionDecorator>
        <Button>Playground Button</Button>
      </OccasionDecorator>
      <OccasionDecorator>
        <Checkbox label="Playground Checkbox" />
      </OccasionDecorator>
    </div>
  ),
}
