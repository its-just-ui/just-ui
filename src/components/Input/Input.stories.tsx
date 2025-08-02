import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Hello World',
    onChange: () => {},
  },
}

export const WithError: Story = {
  args: {
    placeholder: 'Enter email...',
    error: true,
    type: 'email',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
  },
}

export const Number: Story = {
  args: {
    placeholder: 'Enter number...',
    type: 'number',
  },
}

export const Email: Story = {
  args: {
    placeholder: 'Enter email...',
    type: 'email',
  },
}