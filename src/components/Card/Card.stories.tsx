import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Card {...args} />,
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This is a card component. You can put any content here.
          </p>
        </CardContent>
      </>
    ),
  },
}

export const Simple: Story = {
  render: (args) => <Card {...args} />,
  args: {
    className: 'w-[350px] p-6',
    children: (
      <>
        <h3 className="text-lg font-semibold mb-2">Simple Card</h3>
        <p className="text-sm text-gray-600">
          This is a simpler card without using the sub-components.
        </p>
      </>
    ),
  },
}

export const Interactive: Story = {
  render: (args) => <Card {...args} />,
  args: {
    className: 'w-[350px] cursor-pointer hover:shadow-lg transition-shadow',
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This card has hover effects. Try hovering over it!
          </p>
        </CardContent>
      </>
    ),
  },
}
