import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with some descriptive text.
        </AlertDescription>
      </>
    ),
    variant: 'default',
  },
}

export const Success: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your operation completed successfully.
        </AlertDescription>
      </>
    ),
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review this important information.
        </AlertDescription>
      </>
    ),
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </>
    ),
    variant: 'error',
  },
}

export const SimpleAlert: Story = {
  args: {
    children: 'This is a simple alert without title or description components.',
    variant: 'default',
  },
}