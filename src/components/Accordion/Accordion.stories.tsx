import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether only one item can be open at a time',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled', 'separated'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the accordion',
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'collapse', 'zoom'],
      description: 'Transition animation style',
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transitions in milliseconds',
    },
    expandIconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the expand icon',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it styled?',
    content: 'Yes. It comes with default styles that matches the other components aesthetic.',
  },
  {
    value: 'item-3',
    title: 'Is it animated?',
    content: 'Yes. It\'s animated by default, but you can disable it if you prefer.',
  },
]

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-3'],
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const Separated: Story = {
  args: {
    variant: 'separated',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const FadeTransition: Story = {
  args: {
    transition: 'fade',
    transitionDuration: 500,
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const SlideTransition: Story = {
  args: {
    transition: 'slide',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const ZoomTransition: Story = {
  args: {
    transition: 'zoom',
    type: 'single',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const CustomIcon: Story = {
  args: {
    type: 'single',
    expandIcon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const IconAtStart: Story = {
  args: {
    type: 'single',
    expandIconPosition: 'start',
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    type: 'single',
    disabled: true,
    children: (
      <>
        {defaultItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </>
    ),
  },
}

export const MixedDisabled: Story = {
  args: {
    type: 'single',
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Enabled Item</AccordionTrigger>
          <AccordionContent>This item is enabled and can be toggled.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Disabled Item</AccordionTrigger>
          <AccordionContent>This item is disabled and cannot be toggled.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Another Enabled Item</AccordionTrigger>
          <AccordionContent>This item is also enabled.</AccordionContent>
        </AccordionItem>
      </>
    ),
  },
}

export const RichContent: Story = {
  args: {
    type: 'single',
    variant: 'separated',
    size: 'lg',
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Advanced Features</h3>
                <p className="text-sm text-gray-500">Explore our powerful features</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                Our advanced features provide you with powerful tools to enhance your workflow.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Real-time collaboration</li>
                <li>Advanced analytics</li>
                <li>Custom integrations</li>
                <li>Enterprise security</li>
              </ul>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Learn More
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Getting Started</h3>
                <p className="text-sm text-gray-500">Quick setup guide</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Follow these steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Create your account</li>
                <li>Set up your profile</li>
                <li>Connect your tools</li>
                <li>Start collaborating</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </>
    ),
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-2')
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setValue('item-1')}
          >
            Open First
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setValue('item-2')}
          >
            Open Second
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setValue('')}
          >
            Close All
          </button>
        </div>
        <Accordion type="single" value={value} onValueChange={setValue}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  },
}