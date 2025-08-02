import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

/**
 * Accordion is a vertically stacked set of interactive headings that reveal or hide associated content sections.
 * 
 * ## Features
 * - **Single or Multiple Mode**: Control whether one or multiple items can be expanded
 * - **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
 * - **Extensive Styling**: Over 90 style props for complete customization
 * - **Smooth Transitions**: Multiple transition effects with customizable duration
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Loading & Empty States**: Handle async data and empty content gracefully
 * - **Keyboard Navigation**: Full keyboard support with customizable focus styles
 * - **Compound Components**: Use AccordionItem, AccordionTrigger, and AccordionContent for full control
 * 
 * ## Usage
 * 
 * ### Basic Usage (Uncontrolled):
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes. It adheres to the WAI-ARIA design pattern.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 * 
 * ### Controlled Usage:
 * ```tsx
 * const [value, setValue] = useState<string>('')
 * 
 * <Accordion 
 *   type="single" 
 *   value={value} 
 *   onValueChange={setValue}
 * >
 *   {items}
 * </Accordion>
 * ```
 * 
 * ### Multiple Selection:
 * ```tsx
 * const [values, setValues] = useState<string[]>(['item-1'])
 * 
 * <Accordion 
 *   type="multiple" 
 *   value={values} 
 *   onValueChange={setValues}
 * >
 *   {items}
 * </Accordion>
 * ```
 */
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
      description: 'Whether only one or multiple items can be expanded at once',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'single' },
      },
    },
    value: {
      control: false,
      description: 'Controlled expanded item(s)',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    defaultValue: {
      control: false,
      description: 'Default expanded item(s) for uncontrolled mode',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    onValueChange: {
      control: false,
      description: 'Callback when expanded items change',
      table: {
        type: { summary: '(value: string | string[]) => void' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed (for single type)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled', 'separated', 'outlined'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the accordion',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state for visual feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    transition: {
      control: 'select',
      options: ['none', 'fade', 'slide', 'collapse', 'zoom', 'smooth'],
      description: 'Transition animation for content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'collapse' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of transitions in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 300 },
      },
    },
    expandIcon: {
      control: false,
      description: 'Custom expand/collapse icon',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    expandIconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the expand icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'end' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message to show when loading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when no items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No items to display' },
      },
    },
    // Container styles
    backgroundColor: {
      control: 'color',
      description: 'Container background color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Container border width',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Container border color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Container border radius',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'text',
      description: 'Container padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between items',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    boxShadow: {
      control: 'text',
      description: 'Container box shadow',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    // Typography
    fontSize: {
      control: 'text',
      description: 'Base font size',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'text',
      description: 'Base font weight',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Base text color',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    // Item styles
    itemBackgroundColor: {
      control: 'color',
      description: 'Item background color',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemBorderRadius: {
      control: 'text',
      description: 'Item border radius',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemPadding: {
      control: 'text',
      description: 'Item padding',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    // Trigger styles
    triggerBackgroundColor: {
      control: 'color',
      description: 'Trigger background color',
      table: {
        category: 'Trigger Styles',
        type: { summary: 'string' },
      },
    },
    triggerHoverBackgroundColor: {
      control: 'color',
      description: 'Trigger hover background color',
      table: {
        category: 'Trigger Styles',
        type: { summary: 'string' },
      },
    },
    triggerTextColor: {
      control: 'color',
      description: 'Trigger text color',
      table: {
        category: 'Trigger Styles',
        type: { summary: 'string' },
      },
    },
    triggerFontSize: {
      control: 'text',
      description: 'Trigger font size',
      table: {
        category: 'Trigger Styles',
        type: { summary: 'string' },
      },
    },
    triggerPadding: {
      control: 'text',
      description: 'Trigger padding',
      table: {
        category: 'Trigger Styles',
        type: { summary: 'string' },
      },
    },
    // Content styles
    contentBackgroundColor: {
      control: 'color',
      description: 'Content background color',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    contentTextColor: {
      control: 'color',
      description: 'Content text color',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    contentPadding: {
      control: 'text',
      description: 'Content padding',
      table: {
        category: 'Content Styles',
        type: { summary: 'string' },
      },
    },
    // Focus styles
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    focusRingWidth: {
      control: 'text',
      description: 'Focus ring width',
      table: {
        category: 'Focus Styles',
        type: { summary: 'string' },
      },
    },
    // Icon styles
    iconSize: {
      control: 'text',
      description: 'Expand icon size',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    iconColor: {
      control: 'color',
      description: 'Icon color',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
      },
    },
    iconRotation: {
      control: 'text',
      description: 'Icon rotation when expanded (degrees)',
      table: {
        category: 'Icon Styles',
        type: { summary: 'string' },
        defaultValue: { summary: '180' },
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const defaultItems = [
  {
    value: 'item-1',
    trigger: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    trigger: 'Is it styled?',
    content: 'Yes. It comes with default styles that matches the other components aesthetic.',
  },
  {
    value: 'item-3',
    trigger: 'Is it animated?',
    content: 'Yes. It\'s animated by default, but you can disable it if you prefer.',
  },
]

const faqItems = [
  {
    value: 'faq-1',
    trigger: 'What payment methods do you accept?',
    content: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For enterprise customers, we also offer invoicing options.',
  },
  {
    value: 'faq-2',
    trigger: 'How do I cancel my subscription?',
    content: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.',
  },
  {
    value: 'faq-3',
    trigger: 'Can I get a refund?',
    content: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied, contact our support team for a full refund.',
  },
  {
    value: 'faq-4',
    trigger: 'Do you offer student discounts?',
    content: 'Yes! Students get 50% off all plans. Simply verify your student status with your .edu email address.',
  },
]

// Wrapper component for controlled stories
const AccordionWithState = ({ type = 'single', defaultValue, ...props }: any) => {
  const [value, setValue] = useState<string | string[]>(
    type === 'multiple' 
      ? defaultValue || [] 
      : defaultValue || ''
  )
  
  return (
    <Accordion
      {...props}
      type={type}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Default: Story = {
  render: (args) => (
    <AccordionWithState {...args}>
      {defaultItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionWithState>
  ),
  args: {
    type: 'single',
    collapsible: true,
  },
}

export const ShowingDefaults: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default Accordion (no props)</h3>
        <Accordion>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-xs text-gray-500 mt-2">All default styles and behaviors applied</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Default Expanded</h3>
        <Accordion defaultValue="item-2">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Multiple Mode with Defaults</h3>
        <Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
        <AccordionWithState variant="default">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Bordered</h3>
        <AccordionWithState variant="bordered">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filled</h3>
        <AccordionWithState variant="filled">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Separated</h3>
        <AccordionWithState variant="separated">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Outlined</h3>
        <AccordionWithState variant="outlined">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
        <AccordionWithState size="sm">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Medium (Default)</h3>
        <AccordionWithState size="md">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
        <AccordionWithState size="lg">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Default Status</h3>
        <AccordionWithState status="default" variant="bordered">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Success Status</h3>
        <AccordionWithState status="success" variant="bordered">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Warning Status</h3>
        <AccordionWithState status="warning" variant="bordered">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Error Status</h3>
        <AccordionWithState status="error" variant="bordered">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
    </div>
  ),
}

export const Transitions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Collapse Transition (Default)</h3>
        <AccordionWithState transition="collapse" transitionDuration={300}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Fade Transition</h3>
        <AccordionWithState transition="fade" transitionDuration={200}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Slide Transition</h3>
        <AccordionWithState transition="slide" transitionDuration={250}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Zoom Transition</h3>
        <AccordionWithState transition="zoom" transitionDuration={200}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Smooth Transition</h3>
        <AccordionWithState transition="smooth" transitionDuration={400}>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
    </div>
  ),
}

export const IconPositions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Icon at End (Default)</h3>
        <AccordionWithState expandIconPosition="end">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Icon at Start</h3>
        <AccordionWithState expandIconPosition="start">
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Icon</h3>
        <AccordionWithState 
          expandIcon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
    </div>
  ),
}

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">All Disabled</h3>
        <Accordion disabled>
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Individual Items Disabled</h3>
        <AccordionWithState>
          <AccordionItem value="item-1">
            <AccordionTrigger>Enabled Item</AccordionTrigger>
            <AccordionContent>This item can be expanded</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" disabled>
            <AccordionTrigger>Disabled Item</AccordionTrigger>
            <AccordionContent>This content cannot be accessed</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Another Enabled Item</AccordionTrigger>
            <AccordionContent>This item can also be expanded</AccordionContent>
          </AccordionItem>
        </AccordionWithState>
      </div>
    </div>
  ),
}

export const LoadingAndEmpty: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Loading State</h3>
        <Accordion loading loadingMessage="Fetching accordion items...">
          {/* Children won't be rendered when loading */}
        </Accordion>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Empty State</h3>
        <Accordion emptyMessage="No FAQ items available at the moment">
          {/* No children provided */}
        </Accordion>
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <AccordionWithState
      variant="bordered"
      // Container styles
      backgroundColor="#f8fafc"
      borderColor="#e2e8f0"
      borderRadius="12px"
      padding="20px"
      gap="12px"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      // Typography
      fontSize="15px"
      fontWeight="500"
      textColor="#475569"
      // Item styles
      itemBackgroundColor="#ffffff"
      itemBorderRadius="8px"
      itemPadding="4px"
      itemBoxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
      // Trigger styles
      triggerBackgroundColor="#f1f5f9"
      triggerHoverBackgroundColor="#e2e8f0"
      triggerActiveBackgroundColor="#cbd5e1"
      triggerTextColor="#334155"
      triggerHoverTextColor="#1e293b"
      triggerActiveTextColor="#0f172a"
      triggerPadding="16px 20px"
      triggerBorderRadius="6px"
      // Content styles
      contentBackgroundColor="#ffffff"
      contentTextColor="#64748b"
      contentPadding="16px 20px"
      contentBorderWidth="1px 0 0 0"
      contentBorderColor="#e2e8f0"
      // Focus styles
      focusRingColor="#3b82f6"
      focusRingWidth="3px"
      focusRingOffset="2px"
      // Icon styles
      iconSize="20px"
      iconColor="#94a3b8"
      iconHoverColor="#64748b"
      iconActiveColor="#475569"
      iconRotation="180"
      // Divider styles
      dividerColor="#e2e8f0"
      dividerWidth="1px"
    >
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionWithState>
  ),
}

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Modern Gradient</h3>
        <AccordionWithState
          variant="separated"
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          borderRadius="16px"
          padding="24px"
          gap="16px"
          itemBackgroundColor="rgba(255, 255, 255, 0.95)"
          itemBorderRadius="12px"
          itemBoxShadow="0 8px 16px -4px rgba(0, 0, 0, 0.1)"
          triggerPadding="20px 24px"
          triggerTextColor="#4c1d95"
          triggerFontWeight="600"
          triggerHoverBackgroundColor="rgba(99, 102, 241, 0.1)"
          contentPadding="20px 24px"
          contentTextColor="#6b7280"
          iconColor="#7c3aed"
          focusRingColor="#8b5cf6"
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Flat</h3>
        <AccordionWithState
          borderWidth="0"
          backgroundColor="transparent"
          itemBackgroundColor="transparent"
          triggerBackgroundColor="transparent"
          triggerHoverBackgroundColor="#f9fafb"
          triggerTextColor="#111827"
          triggerPadding="16px 0"
          triggerFontWeight="400"
          contentBackgroundColor="transparent"
          contentTextColor="#6b7280"
          contentPadding="16px 0 24px 0"
          dividerColor="#e5e7eb"
          dividerWidth="1px"
          iconSize="16px"
          iconColor="#9ca3af"
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Dark Mode</h3>
        <AccordionWithState
          variant="filled"
          backgroundColor="#1f2937"
          borderRadius="12px"
          padding="16px"
          textColor="#f3f4f6"
          itemBackgroundColor="#374151"
          itemBorderRadius="8px"
          itemBoxShadow="0 1px 3px rgba(0, 0, 0, 0.3)"
          triggerBackgroundColor="#4b5563"
          triggerHoverBackgroundColor="#6b7280"
          triggerTextColor="#f9fafb"
          triggerPadding="16px 20px"
          contentBackgroundColor="#374151"
          contentTextColor="#d1d5db"
          contentPadding="16px 20px"
          dividerColor="#4b5563"
          iconColor="#9ca3af"
          iconHoverColor="#f3f4f6"
          focusRingColor="#60a5fa"
          focusRingOffsetColor="#1f2937"
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Material Design</h3>
        <AccordionWithState
          backgroundColor="#ffffff"
          borderWidth="0"
          boxShadow="0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          borderRadius="4px"
          itemBackgroundColor="transparent"
          triggerBackgroundColor="transparent"
          triggerHoverBackgroundColor="rgba(0, 0, 0, 0.04)"
          triggerTextColor="#202124"
          triggerFontSize="16px"
          triggerFontWeight="400"
          triggerPadding="16px"
          contentTextColor="#5f6368"
          contentPadding="0 16px 16px 16px"
          dividerColor="#e8eaed"
          iconColor="#5f6368"
          focusRingColor="#1a73e8"
          focusRingWidth="2px"
          transition="smooth"
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </AccordionWithState>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Glassmorphism</h3>
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100">
          <AccordionWithState
            backgroundColor="rgba(255, 255, 255, 0.7)"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.5)"
            borderRadius="16px"
            padding="8px"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            itemBackgroundColor="rgba(255, 255, 255, 0.6)"
            itemBorderRadius="12px"
            itemPadding="4px"
            triggerBackgroundColor="transparent"
            triggerHoverBackgroundColor="rgba(255, 255, 255, 0.3)"
            triggerPadding="16px 20px"
            contentPadding="16px 20px"
            iconColor="#8b5cf6"
            focusRingColor="#a78bfa"
          >
            {defaultItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </AccordionWithState>
        </div>
      </div>
    </div>
  ),
}

export const MultipleSelection: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['item-1', 'item-3'])
    
    return (
      <div className="space-y-4">
        <Accordion
          type="multiple"
          value={values}
          onValueChange={setValues}
          variant="separated"
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-medium mb-2">Expanded Items: {values.length > 0 ? values.join(', ') : 'None'}</h4>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => setValues(['item-1', 'item-2', 'item-3'])}
            >
              Expand All
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
              onClick={() => setValues([])}
            >
              Collapse All
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              onClick={() => setValues(['item-2'])}
            >
              Only Item 2
            </button>
          </div>
        </div>
      </div>
    )
  },
}

export const ControlledExample: Story = {
  render: () => {
    const [value, setValue] = useState<string>('item-2')
    const [history, setHistory] = useState<string[]>(['item-2'])
    
    const handleChange = (newValue: string) => {
      setValue(newValue)
      if (newValue) {
        setHistory([...history, newValue])
      }
    }
    
    return (
      <div className="space-y-4">
        <Accordion
          type="single"
          value={value}
          onValueChange={handleChange}
          collapsible
        >
          {defaultItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-medium mb-2">Current: {value || 'None'}</h4>
          <div className="space-x-2 mb-4">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => setValue('item-1')}
            >
              Open Item 1
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => setValue('item-2')}
            >
              Open Item 2
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={() => setValue('item-3')}
            >
              Open Item 3
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
              onClick={() => setValue('')}
            >
              Close All
            </button>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">History:</h4>
            <div className="text-sm text-gray-600">
              {history.map((item, index) => (
                <span key={index}>
                  {item}{index < history.length - 1 ? ' → ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const RealWorldExample: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <AccordionWithState
        type="single"
        collapsible
        variant="default"
        triggerFontSize="16px"
        triggerFontWeight="500"
        triggerPadding="20px 0"
        triggerHoverBackgroundColor="transparent"
        triggerHoverTextColor="#2563eb"
        contentFontSize="15px"
        contentTextColor="#4b5563"
        contentPadding="0 0 20px 0"
        dividerColor="#e5e7eb"
        iconSize="20px"
        iconColor="#6b7280"
        iconHoverColor="#2563eb"
        focusRingColor="#2563eb"
        transition="smooth"
        transitionDuration={200}
      >
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </AccordionWithState>
    </div>
  ),
}

export const NestedAccordions: Story = {
  render: () => (
    <AccordionWithState variant="bordered">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Categories</AccordionTrigger>
        <AccordionContent>
          <AccordionWithState 
            type="multiple" 
            variant="default"
            size="sm"
            itemPaddingX="16px"
          >
            <AccordionItem value="electronics">
              <AccordionTrigger>Electronics</AccordionTrigger>
              <AccordionContent>
                Laptops, Phones, Tablets, Cameras, and more...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="clothing">
              <AccordionTrigger>Clothing</AccordionTrigger>
              <AccordionContent>
                Men's, Women's, Kids, Shoes, Accessories...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="home">
              <AccordionTrigger>Home & Garden</AccordionTrigger>
              <AccordionContent>
                Furniture, Decor, Kitchen, Outdoor...
              </AccordionContent>
            </AccordionItem>
          </AccordionWithState>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Account Settings</AccordionTrigger>
        <AccordionContent>
          <AccordionWithState 
            type="single" 
            collapsible 
            variant="default"
            size="sm"
            itemPaddingX="16px"
          >
            <AccordionItem value="profile">
              <AccordionTrigger>Profile Information</AccordionTrigger>
              <AccordionContent>
                Update your name, email, and profile picture.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>Security</AccordionTrigger>
              <AccordionContent>
                Change password, enable 2FA, manage sessions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notifications">
              <AccordionTrigger>Notifications</AccordionTrigger>
              <AccordionContent>
                Configure email and push notification preferences.
              </AccordionContent>
            </AccordionItem>
          </AccordionWithState>
        </AccordionContent>
      </AccordionItem>
    </AccordionWithState>
  ),
}

export const WithComplexContent: Story = {
  render: () => (
    <AccordionWithState variant="separated">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center justify-between w-full">
            <span>Order #12345</span>
            <span className="text-sm text-gray-500 mr-4">Delivered</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order Date:</span>
              <span>March 15, 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span>$125.99</span>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items:</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Product A × 2</span>
                  <span>$50.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Product B × 1</span>
                  <span>$75.99</span>
                </li>
              </ul>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center justify-between w-full">
            <span>Order #12344</span>
            <span className="text-sm text-yellow-600 mr-4">In Transit</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                Your order is on its way! Expected delivery: March 20, 2024
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Tracking Number:</span>
              <a href="#" className="text-blue-600 hover:underline">1234567890</a>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </AccordionWithState>
  ),
}