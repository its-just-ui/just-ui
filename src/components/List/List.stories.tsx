import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { List, ListContainer, ListItemData, ListHeader, ListFooter } from './List'

/**
 * List is a versatile component for displaying selectable or interactive items with extensive customization options.
 *
 * ## Features
 * - **Multiple Variants**: 5 visual styles from minimal to elevated designs (default, bordered, card, minimal, elevated)
 * - **Flexible Sizing**: 3 size options from small to large (sm, md, lg)
 * - **Status States**: Built-in semantic status colors for different contexts (default, success, warning, error, info)
 * - **Interactive Elements**: Support for selection, click handlers, and hover effects
 * - **Loading & Disabled States**: Handle async operations and disabled states gracefully
 * - **Compound Components**: Use ListContainer, ListItemData, ListHeader, and ListFooter for full control
 * - **Extensive Styling**: Over 60 style props for complete visual customization
 * - **Form Integration**: Works seamlessly in forms with controlled/uncontrolled modes
 * - **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Rich Content**: Support for avatars, icons, badges, and custom actions
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <List items={items} />
 * <List items={items} selectable value={selected} onChange={setSelected} />
 * ```
 *
 * ### Interactive Lists:
 * ```tsx
 * <List
 *   items={items}
 *   selectable
 *   multiple
 *   onItemClick={(item) => console.log('clicked:', item)}
 *   onItemSelect={(item) => console.log('selected:', item)}
 * />
 * ```
 *
 * ### Compound Component Usage:
 * ```tsx
 * <List items={items} selectable>
 *   <ListHeader>User List</ListHeader>
 *   <ListContainer>
 *     {items.map(item => (
 *       <ListItemData key={item.id} item={item} />
 *     ))}
 *   </ListContainer>
 *   <ListFooter>Total: {items.length}</ListFooter>
 * </List>
 * ```
 *
 * ### With Custom Rendering:
 * ```tsx
 * <List
 *   items={items}
 *   renderItem={(item, isSelected) => (
 *     <div className={isSelected ? 'bg-blue-100' : ''}>
 *       <h3>{item.title}</h3>
 *       <p>{item.description}</p>
 *     </div>
 *   )}
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <List
 *   items={items}
 *   backgroundColor="#f8fafc"
 *   borderRadius="12px"
 *   padding="16px"
 *   boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
 * >
 *   Custom Styled List
 * </List>
 * ```
 *
 * ### Form Integration:
 * ```tsx
 * const [selectedUsers, setSelectedUsers] = useState<string[]>([])
 *
 * <List
 *   items={users}
 *   value={selectedUsers}
 *   onChange={setSelectedUsers}
 *   multiple
 *   selectable
 *   label="Select Users"
 *   helperText="Choose users to invite"
 * />
 * ```
 */
const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    items: {
      control: 'object',
      description: 'Array of list items to display',
      table: {
        category: 'Core Props',
        type: { summary: 'ListItemData[]' },
      },
    },
    value: {
      control: false,
      description: 'The selected item(s). Can be string, string[], or null',
      table: {
        category: 'Core Props',
        type: { summary: 'string | string[] | null' },
      },
    },
    onChange: {
      control: false,
      description: 'Callback fired when the value changes',
      table: {
        category: 'Core Props',
        type: { summary: '(value: string | string[] | null) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'card', 'minimal', 'elevated'],
      description: 'Visual style variant of the list',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the list component',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Status state for semantic coloring',
      table: {
        category: 'Core Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the list interactions',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required (affects ARIA attributes)',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Enable item selection behavior',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple item selections',
      table: {
        category: 'Core Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    maxSelection: {
      control: 'number',
      description: 'Maximum number of items that can be selected',
      table: {
        category: 'Core Props',
        type: { summary: 'number' },
      },
    },

    // Content Props
    children: {
      control: false,
      description: 'Main content of the list component',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text above the component',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the component',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no items are available',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'No items found' },
      },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message shown when loading',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading...' },
      },
    },
    renderItem: {
      control: false,
      description: 'Custom render function for items',
      table: {
        category: 'Content',
        type: { summary: '(item: ListItemData, isSelected: boolean) => React.ReactNode' },
      },
    },

    // Container Styles
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderWidth: {
      control: 'text',
      description: 'Border width (e.g., "1px", "2px")',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double'],
      description: 'Border style',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius (e.g., "8px", "50%")',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding for the list',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    paddingX: {
      control: 'text',
      description: 'Horizontal padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    paddingY: {
      control: 'text',
      description: 'Vertical padding',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between list elements',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },

    // Typography
    fontSize: {
      control: 'text',
      description: 'Font size (e.g., "14px", "1rem")',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },
    fontFamily: {
      control: 'text',
      description: 'Font family',
      table: {
        category: 'Typography',
        type: { summary: 'string' },
      },
    },

    // Hover & Focus Effects
    hoverBackgroundColor: {
      control: 'color',
      description: 'Background color on hover',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingColor: {
      control: 'color',
      description: 'Focus ring color',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingWidth: {
      control: 'text',
      description: 'Focus ring width',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusRingOffset: {
      control: 'text',
      description: 'Focus ring offset',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusBorderColor: {
      control: 'color',
      description: 'Border color when focused',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },
    focusBackgroundColor: {
      control: 'color',
      description: 'Background color when focused',
      table: {
        category: 'Hover & Focus',
        type: { summary: 'string' },
      },
    },

    // Shadow Effects
    boxShadow: {
      control: 'text',
      description: 'Box shadow for the list',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    focusBoxShadow: {
      control: 'text',
      description: 'Box shadow when focused',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },
    hoverBoxShadow: {
      control: 'text',
      description: 'Box shadow on hover',
      table: {
        category: 'Shadow Effects',
        type: { summary: 'string' },
      },
    },

    // Icon customization
    iconColor: {
      control: 'color',
      description: 'Color for icons',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },
    actionIconColor: {
      control: 'color',
      description: 'Color for action icons',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },
    loadingIconColor: {
      control: 'color',
      description: 'Color for loading spinner',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },

    // Container styles
    containerBackgroundColor: {
      control: 'color',
      description: 'Background color of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerBorderColor: {
      control: 'color',
      description: 'Border color of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerBorderWidth: {
      control: 'text',
      description: 'Border width of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerBorderRadius: {
      control: 'text',
      description: 'Border radius of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerPadding: {
      control: 'text',
      description: 'Padding of the container',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },
    containerGap: {
      control: 'text',
      description: 'Gap between container elements',
      table: {
        category: 'Container Styles',
        type: { summary: 'string' },
      },
    },

    // Item styles
    itemPadding: {
      control: 'text',
      description: 'Padding for individual items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemBorderWidth: {
      control: 'text',
      description: 'Border width for items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemBorderColor: {
      control: 'color',
      description: 'Border color for items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemBorderRadius: {
      control: 'text',
      description: 'Border radius for items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemBackgroundColor: {
      control: 'color',
      description: 'Background color for items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemHoverBackgroundColor: {
      control: 'color',
      description: 'Background color for items on hover',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemSelectedBackgroundColor: {
      control: 'color',
      description: 'Background color for selected items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemSelectedTextColor: {
      control: 'color',
      description: 'Text color for selected items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemDisabledOpacity: {
      control: 'text',
      description: 'Opacity for disabled items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },
    itemGap: {
      control: 'text',
      description: 'Gap between items',
      table: {
        category: 'Item Styles',
        type: { summary: 'string' },
      },
    },

    // Title styles
    titleFontSize: {
      control: 'text',
      description: 'Font size for item titles',
      table: {
        category: 'Title Styles',
        type: { summary: 'string' },
      },
    },
    titleFontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight for item titles',
      table: {
        category: 'Title Styles',
        type: { summary: 'string' },
      },
    },
    titleColor: {
      control: 'color',
      description: 'Color for item titles',
      table: {
        category: 'Title Styles',
        type: { summary: 'string' },
      },
    },
    titleLineHeight: {
      control: 'text',
      description: 'Line height for item titles',
      table: {
        category: 'Title Styles',
        type: { summary: 'string' },
      },
    },

    // Description styles
    descriptionFontSize: {
      control: 'text',
      description: 'Font size for item descriptions',
      table: {
        category: 'Description Styles',
        type: { summary: 'string' },
      },
    },
    descriptionColor: {
      control: 'color',
      description: 'Color for item descriptions',
      table: {
        category: 'Description Styles',
        type: { summary: 'string' },
      },
    },
    descriptionLineHeight: {
      control: 'text',
      description: 'Line height for item descriptions',
      table: {
        category: 'Description Styles',
        type: { summary: 'string' },
      },
    },
    descriptionMarginTop: {
      control: 'text',
      description: 'Margin top for item descriptions',
      table: {
        category: 'Description Styles',
        type: { summary: 'string' },
      },
    },

    // Avatar styles
    avatarSize: {
      control: 'text',
      description: 'Size for item avatars',
      table: {
        category: 'Avatar Styles',
        type: { summary: 'string' },
      },
    },
    avatarBorderRadius: {
      control: 'text',
      description: 'Border radius for item avatars',
      table: {
        category: 'Avatar Styles',
        type: { summary: 'string' },
      },
    },
    avatarBorderWidth: {
      control: 'text',
      description: 'Border width for item avatars',
      table: {
        category: 'Avatar Styles',
        type: { summary: 'string' },
      },
    },
    avatarBorderColor: {
      control: 'color',
      description: 'Border color for item avatars',
      table: {
        category: 'Avatar Styles',
        type: { summary: 'string' },
      },
    },

    // Badge styles
    badgeFontSize: {
      control: 'text',
      description: 'Font size for item badges',
      table: {
        category: 'Badge Styles',
        type: { summary: 'string' },
      },
    },
    badgePadding: {
      control: 'text',
      description: 'Padding for item badges',
      table: {
        category: 'Badge Styles',
        type: { summary: 'string' },
      },
    },
    badgeBorderRadius: {
      control: 'text',
      description: 'Border radius for item badges',
      table: {
        category: 'Badge Styles',
        type: { summary: 'string' },
      },
    },
    badgeBackgroundColor: {
      control: 'color',
      description: 'Background color for item badges',
      table: {
        category: 'Badge Styles',
        type: { summary: 'string' },
      },
    },
    badgeTextColor: {
      control: 'color',
      description: 'Text color for item badges',
      table: {
        category: 'Badge Styles',
        type: { summary: 'string' },
      },
    },

    // Dark Mode
    darkMode: {
      control: 'boolean',
      description: 'Enable dark mode styling',
      table: {
        category: 'Dark Mode',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    darkBackgroundColor: {
      control: 'color',
      description: 'Background color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkTextColor: {
      control: 'color',
      description: 'Text color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkBorderColor: {
      control: 'color',
      description: 'Border color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkHoverBackgroundColor: {
      control: 'color',
      description: 'Hover background color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkSelectedBackgroundColor: {
      control: 'color',
      description: 'Selected background color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkDisabledBackgroundColor: {
      control: 'color',
      description: 'Disabled background color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkFocusRingColor: {
      control: 'color',
      description: 'Focus ring color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkFocusBorderColor: {
      control: 'color',
      description: 'Focus border color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkFocusBackgroundColor: {
      control: 'color',
      description: 'Focus background color in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkBoxShadow: {
      control: 'text',
      description: 'Box shadow in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkFocusBoxShadow: {
      control: 'text',
      description: 'Focus box shadow in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },
    darkHoverBoxShadow: {
      control: 'text',
      description: 'Hover box shadow in dark mode',
      table: {
        category: 'Dark Mode',
        type: { summary: 'string' },
      },
    },

    // Selection styles
    selectionIndicatorColor: {
      control: 'color',
      description: 'Color for selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },
    selectionIndicatorSize: {
      control: 'text',
      description: 'Size of selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },
    selectionIndicatorBorderRadius: {
      control: 'text',
      description: 'Border radius for selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },
    selectionIndicatorBorderWidth: {
      control: 'text',
      description: 'Border width for selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },
    selectionIndicatorBorderColor: {
      control: 'color',
      description: 'Border color for selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },
    selectionIndicatorBackgroundColor: {
      control: 'color',
      description: 'Background color for selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },
    selectionIndicatorTextColor: {
      control: 'color',
      description: 'Text color for selection indicators',
      table: {
        category: 'Selection Styles',
        type: { summary: 'string' },
      },
    },

    // Animation
    animationDuration: {
      control: 'text',
      description: 'Duration of animations',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },
    animationTimingFunction: {
      control: 'select',
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
      description: 'Timing function for animations',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },
    animationDelay: {
      control: 'text',
      description: 'Delay before animations start',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },
    hoverScale: {
      control: 'text',
      description: 'Scale transform on hover',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },
    hoverRotate: {
      control: 'text',
      description: 'Rotation transform on hover',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },
    hoverTranslateX: {
      control: 'text',
      description: 'X translation on hover',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },
    hoverTranslateY: {
      control: 'text',
      description: 'Y translation on hover',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
      },
    },

    // Custom CSS
    customCSS: {
      control: 'text',
      description: 'Custom CSS for the main component',
      table: {
        category: 'Custom CSS',
        type: { summary: 'string' },
      },
    },
    customContainerCSS: {
      control: 'text',
      description: 'Custom CSS for the container',
      table: {
        category: 'Custom CSS',
        type: { summary: 'string' },
      },
    },
    customItemCSS: {
      control: 'text',
      description: 'Custom CSS for individual items',
      table: {
        category: 'Custom CSS',
        type: { summary: 'string' },
      },
    },

    // Label styles
    labelFontSize: {
      control: 'text',
      description: 'Font size of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelFontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelColor: {
      control: 'color',
      description: 'Color of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },
    labelMarginBottom: {
      control: 'text',
      description: 'Margin bottom of the label',
      table: {
        category: 'Label Styles',
        type: { summary: 'string' },
      },
    },

    // Helper text styles
    helperTextFontSize: {
      control: 'text',
      description: 'Font size of the helper text',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },
    helperTextColor: {
      control: 'color',
      description: 'Color of the helper text',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },
    helperTextMarginTop: {
      control: 'text',
      description: 'Margin top of the helper text',
      table: {
        category: 'Helper Text Styles',
        type: { summary: 'string' },
      },
    },

    // Event Handlers
    onItemClick: {
      control: false,
      description: 'Callback fired when an item is clicked',
      table: {
        category: 'Event Handlers',
        type: { summary: '(item: ListItemData) => void' },
      },
    },
    onItemSelect: {
      control: false,
      description: 'Callback fired when an item is selected',
      table: {
        category: 'Event Handlers',
        type: { summary: '(item: ListItemData) => void' },
      },
    },
    onClick: {
      control: false,
      description: 'Click event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onMouseEnter: {
      control: false,
      description: 'Mouse enter event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onMouseLeave: {
      control: false,
      description: 'Mouse leave event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Key down event handler',
      table: {
        category: 'Event Handlers',
        type: { summary: '(event: React.KeyboardEvent) => void' },
      },
    },

    // Accessibility
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      control: 'text',
      description: 'ARIA described by reference',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'ARIA invalid state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-required': {
      control: 'boolean',
      description: 'ARIA required state',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-live': {
      control: 'select',
      options: ['off', 'polite', 'assertive'],
      description: 'ARIA live region behavior',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  {
    id: '1',
    title: 'John Doe',
    description: 'Software Engineer at Tech Corp',
    avatar: (
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
        JD
      </div>
    ),
    badge: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
    ),
    action: <span>→</span>,
  },
  {
    id: '2',
    title: 'Jane Smith',
    description: 'Product Manager at Design Studio',
    avatar: (
      <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
        JS
      </div>
    ),
    badge: (
      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Away</span>
    ),
    action: <span>→</span>,
  },
  {
    id: '3',
    title: 'Bob Johnson',
    description: 'UX Designer at Creative Agency',
    avatar: (
      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
        BJ
      </div>
    ),
    badge: <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Busy</span>,
    action: <span>→</span>,
  },
]

const techItems = [
  {
    id: 'react',
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    icon: <span>⚛️</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Popular</span>
    ),
  },
  {
    id: 'vue',
    title: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    icon: <span>💚</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Trending</span>
    ),
  },
  {
    id: 'angular',
    title: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
    icon: <span>🅰️</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Enterprise</span>
    ),
  },
]

const statusItems = [
  {
    id: 'success',
    title: 'Success Status',
    description: 'Everything is working correctly',
    icon: <span>✅</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Success</span>
    ),
  },
  {
    id: 'warning',
    title: 'Warning Status',
    description: 'Something needs attention',
    icon: <span>⚠️</span>,
    badge: (
      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Warning</span>
    ),
  },
  {
    id: 'error',
    title: 'Error Status',
    description: 'Something went wrong',
    icon: <span>❌</span>,
    badge: <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Error</span>,
  },
]

// Wrapper component to handle state for stories
const ListWithState = (props: any) => {
  const [value, setValue] = useState<string | string[] | null>(
    props.multiple ? props.value || [] : props.value || null
  )

  return <List {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
  },
}

export const WithLabel: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
    label: 'Team Members',
    helperText: 'Select team members to invite',
  },
}

export const Selectable: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
    selectable: true,
    label: 'Selectable List',
  },
}

export const Multiple: Story = {
  render: (args) => <ListWithState {...args} />,
  args: {
    items: sampleItems,
    selectable: true,
    multiple: true,
    label: 'Multiple Selection',
    helperText: 'Select multiple team members (max 2)',
    maxSelection: 2,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState items={sampleItems} variant="default" label="Default Variant" />
      <ListWithState items={sampleItems} variant="bordered" label="Bordered Variant" />
      <ListWithState items={sampleItems} variant="card" label="Card Variant" />
      <ListWithState items={sampleItems} variant="minimal" label="Minimal Variant" />
      <ListWithState items={sampleItems} variant="elevated" label="Elevated Variant" />
      <ListWithState items={sampleItems} variant="glass" label="Glass Variant" />
      <ListWithState items={sampleItems} variant="gradient" label="Gradient Variant" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState items={sampleItems} size="sm" label="Small Size" />
      <ListWithState items={sampleItems} size="md" label="Medium Size" />
      <ListWithState items={sampleItems} size="lg" label="Large Size" />
    </div>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState items={statusItems} status="success" label="Success Status" />
      <ListWithState items={statusItems} status="warning" label="Warning Status" />
      <ListWithState items={statusItems} status="error" label="Error Status" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => <ListWithState items={techItems} label="Technologies with Icons" />,
}

export const Loading: Story = {
  render: () => <ListWithState loading label="Loading State" />,
}

const DisabledComponent = () => {
  const [value] = useState<string[]>(['1'])
  return (
    <List
      items={sampleItems}
      disabled
      label="Disabled List"
      helperText="This list cannot be interacted with"
      value={value}
      onChange={() => {}}
    />
  )
}

export const Disabled: Story = {
  render: () => <DisabledComponent />,
}

export const EmptyState: Story = {
  render: () => (
    <ListWithState
      items={[]}
      label="Empty List"
      emptyMessage="No items available. Add some to get started."
    />
  ),
}

export const CustomRendering: Story = {
  render: () => (
    <ListWithState
      items={sampleItems}
      label="Custom Rendered Items"
      renderItem={(item, isSelected) => (
        <div
          className={`p-4 rounded-lg ${isSelected ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'} border`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>
            {isSelected && <span className="text-blue-500">✓</span>}
          </div>
        </div>
      )}
    />
  ),
}

const ControlledComponent = () => {
  const [value, setValue] = useState<string | null>('1')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue('1')}>
          Select John
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue('2')}>
          Select Jane
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setValue(null)}>
          Clear
        </button>
      </div>
      <List
        items={sampleItems}
        value={value}
        onChange={(newValue) => setValue(newValue as string | null)}
        selectable
        label="Controlled List"
      />
      {value && (
        <p className="text-sm text-gray-600">
          Selected: {sampleItems.find((item) => item.id === value)?.title}
        </p>
      )}
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledComponent />,
}

const CompoundComponentsExample = () => {
  const [value, setValue] = useState<string | string[] | null>(null)

  return (
    <List items={sampleItems} value={value} onChange={setValue} label="Compound Component Usage">
      <ListHeader>Team Members</ListHeader>
      <ListContainer>
        {sampleItems.map((item) => (
          <ListItemData key={item.id} item={item} />
        ))}
      </ListContainer>
      <ListFooter>Total: {sampleItems.length} members</ListFooter>
    </List>
  )
}

export const CompoundComponents: Story = {
  render: () => <CompoundComponentsExample />,
}

export const CustomStyled: Story = {
  render: () => (
    <ListWithState
      items={sampleItems}
      label="Custom Styled List"
      helperText="This demonstrates custom styling capabilities"
      // Border styles
      borderWidth="2px"
      borderColor="#3b82f6"
      borderStyle="solid"
      borderRadius="12px"
      // Text customization
      fontSize="16px"
      fontWeight="500"
      textColor="#1e293b"
      // Colors
      backgroundColor="#f8fafc"
      selectedBackgroundColor="#dbeafe"
      // Focus styles
      focusRingColor="#3b82f6"
      focusRingWidth="3px"
      focusBorderColor="#2563eb"
      focusBackgroundColor="#ffffff"
      // Shadow
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      focusBoxShadow="0 4px 8px rgba(0, 0, 0, 0.15)"
      hoverBoxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      // Padding
      paddingX="16px"
      paddingY="12px"
      gap="12px"
      // Icon colors
      iconColor="#64748b"
      actionIconColor="#3b82f6"
      // Container styles
      containerBackgroundColor="#ffffff"
      containerBorderColor="#e2e8f0"
      containerBorderWidth="1px"
      containerBorderRadius="8px"
      containerPadding="16px"
      containerGap="8px"
      // Item styles
      itemPadding="16px"
      itemBorderWidth="1px"
      itemBorderColor="#e2e8f0"
      itemBorderRadius="8px"
      itemBackgroundColor="#ffffff"
      itemHoverBackgroundColor="#f1f5f9"
      itemSelectedBackgroundColor="#dbeafe"
      itemSelectedTextColor="#1e40af"
      itemGap="12px"
      // Title styles
      titleFontSize="16px"
      titleFontWeight="600"
      titleColor="#0f172a"
      titleLineHeight="1.5"
      // Description styles
      descriptionFontSize="14px"
      descriptionColor="#64748b"
      descriptionLineHeight="1.4"
      descriptionMarginTop="4px"
      // Avatar styles
      avatarSize="40px"
      avatarBorderRadius="50%"
      avatarBorderWidth="2px"
      avatarBorderColor="#e2e8f0"
      // Badge styles
      badgeFontSize="12px"
      badgePadding="4px 8px"
      badgeBorderRadius="12px"
      badgeBackgroundColor="#f1f5f9"
      badgeTextColor="#64748b"
      // Label styles
      labelFontSize="18px"
      labelFontWeight="600"
      labelColor="#0f172a"
      labelMarginBottom="8px"
      // Helper text styles
      helperTextFontSize="14px"
      helperTextColor="#64748b"
      helperTextMarginTop="6px"
    />
  ),
}

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Card Style</h3>
        <ListWithState
          items={sampleItems}
          variant="card"
          label="Card Style List"
          containerBackgroundColor="#ffffff"
          containerBorderRadius="12px"
          containerPadding="16px"
          itemBorderRadius="8px"
          itemHoverBackgroundColor="#f8fafc"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Style</h3>
        <ListWithState
          items={sampleItems}
          variant="minimal"
          label="Minimal Style List"
          containerBackgroundColor="transparent"
          containerPadding="0"
          itemPadding="12px"
          itemHoverBackgroundColor="#f9fafb"
          titleColor="#111827"
          descriptionColor="#6b7280"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Elevated Style</h3>
        <ListWithState
          items={sampleItems}
          variant="elevated"
          label="Elevated Style List"
          containerBackgroundColor="#ffffff"
          containerBorderRadius="16px"
          containerPadding="20px"
          itemBorderRadius="12px"
          itemHoverBackgroundColor="#f8fafc"
          boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          hoverBoxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        />
      </div>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-gray-900 rounded-lg">
      <ListWithState
        items={sampleItems}
        darkMode
        label="Dark Mode List"
        helperText="This list uses dark mode styling"
        selectable
        multiple
      />

      <ListWithState
        items={techItems}
        variant="glass"
        darkMode
        label="Dark Glass Variant"
        helperText="Glass effect in dark mode"
        selectable
      />

      <ListWithState
        items={statusItems}
        variant="gradient"
        darkMode
        label="Dark Gradient Variant"
        helperText="Gradient effect in dark mode"
        selectable
      />
    </div>
  ),
}

export const EnhancedSelection: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState
        items={sampleItems}
        selectable
        multiple
        maxSelection={3}
        label="Enhanced Multiple Selection"
        helperText="Select up to 3 items with custom indicators"
        selectionIndicatorSize="24px"
        selectionIndicatorBorderRadius="6px"
        selectionIndicatorBorderWidth="3px"
        selectionIndicatorBorderColor="#3b82f6"
        selectionIndicatorBackgroundColor="#3b82f6"
        selectionIndicatorTextColor="#ffffff"
      />

      <ListWithState
        items={techItems}
        selectable
        label="Single Selection with Custom Indicator"
        helperText="Custom selection indicator styling"
        selectionIndicatorSize="18px"
        selectionIndicatorBorderRadius="50%"
        selectionIndicatorBorderWidth="2px"
        selectionIndicatorBorderColor="#10b981"
        selectionIndicatorBackgroundColor="#10b981"
        selectionIndicatorTextColor="#ffffff"
      />
    </div>
  ),
}

export const AnimatedList: Story = {
  render: () => (
    <div className="space-y-6">
      <ListWithState
        items={sampleItems}
        label="Animated List"
        helperText="Items have hover animations"
        animationDuration="0.3s"
        animationTimingFunction="ease-in-out"
        hoverScale="1.02"
        hoverTranslateY="-2px"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        hoverBoxShadow="0 8px 16px rgba(0, 0, 0, 0.15)"
      />

      <ListWithState
        items={techItems}
        variant="card"
        label="Rotating Icons"
        helperText="Icons rotate on hover"
        iconColor="#3b82f6"
        hoverRotate="5deg"
        animationDuration="0.2s"
        animationTimingFunction="ease-out"
      />
    </div>
  ),
}

// Example showing how to use in a form
const FormExampleComponent = () => {
  const [formData, setFormData] = useState({
    users: [] as string[],
    technologies: [] as string[],
    priority: null as string | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(`Form submitted!\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <List
        items={sampleItems}
        value={formData.users}
        onChange={(value) => setFormData({ ...formData, users: value as string[] })}
        multiple
        selectable
        label="Select Team Members"
        helperText="Choose team members for the project"
      />

      <List
        items={techItems}
        value={formData.technologies}
        onChange={(value) => setFormData({ ...formData, technologies: value as string[] })}
        multiple
        selectable
        maxSelection={3}
        label="Select Technologies"
        helperText="Choose up to 3 technologies"
      />

      <List
        items={statusItems}
        value={formData.priority}
        onChange={(value) => setFormData({ ...formData, priority: value as string | null })}
        selectable
        label="Priority Level"
        helperText="Select the priority level"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setFormData({ users: [], technologies: [], priority: null })}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
}
