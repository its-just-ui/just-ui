import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselSlide } from './Carousel'
import LivePlayground from '../../../.storybook/components/LivePlayground'

/**
 * Carousel component provides a flexible and customizable way to display a series of content in a sliding format.
 *
 * ## Features
 * - Multiple variants: default, fade, slide, zoom, stacked, coverflow
 * - Horizontal and vertical axis support
 * - Autoplay with pause on hover/focus
 * - Keyboard navigation
 * - Touch/swipe support
 * - Customizable controls and indicators
 * - Fully accessible with ARIA support
 * - Controlled and uncontrolled modes
 * - Responsive design
 * - Lazy loading support
 *
 * ## Usage
 * ```tsx
 * <Carousel>
 *   <Carousel.Slide>
 *     <img src="image1.jpg" alt="Slide 1" />
 *   </Carousel.Slide>
 *   <Carousel.Slide>
 *     <img src="image2.jpg" alt="Slide 2" />
 *   </Carousel.Slide>
 * </Carousel>
 * ```
 */
const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'fade', 'slide', 'zoom', 'stacked', 'coverflow'],
      description: 'Visual style variant of the carousel',
      defaultValue: 'default',
    },
    axis: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of carousel movement',
      defaultValue: 'horizontal',
    },
    transitionType: {
      control: 'select',
      options: ['slide', 'fade', 'scale', 'scroll'],
      description: 'Type of transition animation',
      defaultValue: 'slide',
    },
    direction: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction for the carousel',
      defaultValue: 'ltr',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop navigation',
      defaultValue: false,
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable automatic slide advancement',
      defaultValue: false,
    },
    autoplayInterval: {
      control: 'number',
      description: 'Time between automatic slide changes (ms)',
      defaultValue: 3000,
    },
    duration: {
      control: 'number',
      description: 'Transition animation duration (ms)',
      defaultValue: 500,
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause autoplay when hovering',
      defaultValue: true,
    },
    pauseOnFocus: {
      control: 'boolean',
      description: 'Pause autoplay when focused',
      defaultValue: true,
    },
    keyboardNavigation: {
      control: 'boolean',
      description: 'Enable arrow key navigation',
      defaultValue: true,
    },
    touchEnabled: {
      control: 'boolean',
      description: 'Enable touch interactions',
      defaultValue: true,
    },
    swipeEnabled: {
      control: 'boolean',
      description: 'Enable swipe gestures',
      defaultValue: true,
    },
    showIndicators: {
      control: 'boolean',
      description: 'Show slide indicators',
      defaultValue: true,
    },
    showControls: {
      control: 'boolean',
      description: 'Show prev/next controls',
      defaultValue: true,
    },
    indicatorPosition: {
      control: 'select',
      options: ['inside', 'outside', 'bottom', 'top'],
      description: 'Position of slide indicators',
      defaultValue: 'bottom',
    },
    controlPosition: {
      control: 'select',
      options: ['inside', 'outside', 'center', 'corners'],
      description: 'Position of navigation controls',
      defaultValue: 'center',
    },
    imageMode: {
      control: 'select',
      options: ['contain', 'cover', 'stretch'],
      description: 'How images should fit within slides',
      defaultValue: 'cover',
    },
    height: {
      control: 'text',
      description: 'Height of the carousel',
    },
    width: {
      control: 'text',
      description: 'Width of the carousel',
    },
    aspectRatio: {
      control: 'text',
      description: 'Aspect ratio of the carousel',
    },
    gap: {
      control: 'text',
      description: 'Gap between slides',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius of the carousel',
    },
    children: {
      control: false,
      description: 'Carousel slides content',
    },
    currentIndex: {
      control: false,
      description: 'Current slide index (controlled mode)',
    },
    onSlideChange: {
      control: false,
      description: 'Callback when slide changes',
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

// Demo images
const demoImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop',
]

export const Default: Story = {
  args: {
    height: '400px',
    width: '600px',
    borderRadius: '8px',
  },
  render: (args) => (
    <Carousel {...args}>
      {demoImages.map((src, index) => (
        <CarouselSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </CarouselSlide>
      ))}
    </Carousel>
  ),
}

export const FadeTransition: Story = {
  args: {
    ...Default.args,
    variant: 'fade',
    duration: 800,
  },
  render: Default.render,
}

export const ZoomEffect: Story = {
  args: {
    ...Default.args,
    variant: 'zoom',
    duration: 600,
  },
  render: Default.render,
}

export const StackedCards: Story = {
  args: {
    ...Default.args,
    variant: 'stacked',
    width: '400px',
    height: '300px',
  },
  render: Default.render,
}

export const Coverflow: Story = {
  args: {
    ...Default.args,
    variant: 'coverflow',
    width: '800px',
    height: '400px',
  },
  render: Default.render,
}

export const Autoplay: Story = {
  args: {
    ...Default.args,
    autoplay: true,
    autoplayInterval: 2000,
    loop: true,
    pauseOnHover: true,
  },
  render: Default.render,
}

export const VerticalCarousel: Story = {
  args: {
    ...Default.args,
    axis: 'vertical',
    height: '400px',
    width: '300px',
  },
  render: Default.render,
}

export const WithoutControls: Story = {
  args: {
    ...Default.args,
    showControls: false,
    showIndicators: true,
  },
  render: Default.render,
}

export const WithoutIndicators: Story = {
  args: {
    ...Default.args,
    showControls: true,
    showIndicators: false,
  },
  render: Default.render,
}

export const CustomStyling: Story = {
  args: {
    height: '400px',
    width: '600px',
    borderRadius: '16px',
    backgroundColor: '#f3f4f6',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    slideBackgroundColor: '#ffffff',
    slideBorderRadius: '12px',
    slideBoxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    controlBackgroundColor: '#3b82f6',
    controlHoverBackgroundColor: '#2563eb',
    controlBorderRadius: '8px',
    controlSize: '40',
    controlPadding: '8px',
    indicatorBackgroundColor: '#e5e7eb',
    indicatorActiveBackgroundColor: '#3b82f6',
    indicatorSize: '10',
  },
  render: Default.render,
}

export const TextSlides: Story = {
  args: {
    ...Default.args,
    variant: 'fade',
    slideBackgroundColor: '#f9fafb',
    slidePadding: '40px',
    textColor: '#1f2937',
    fontSize: '1.125rem',
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselSlide>
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Welcome to Our Service</h3>
            <p>Experience the best in class features with our innovative solutions.</p>
          </div>
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Powerful Features</h3>
            <p>Built with performance and scalability in mind for your growing needs.</p>
          </div>
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
            <p>Join thousands of satisfied customers who trust our platform.</p>
          </div>
        </div>
      </CarouselSlide>
    </Carousel>
  ),
}

export const ProductGallery: Story = {
  args: {
    height: '500px',
    width: '400px',
    borderRadius: '12px',
    imageMode: 'contain',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    indicatorPosition: 'outside',
  },
  render: Default.render,
}

// Controlled carousel example
const ControlledCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        {demoImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`px-4 py-2 rounded ${
              currentIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Slide {index + 1}
          </button>
        ))}
      </div>
      <Carousel
        currentIndex={currentIndex}
        onSlideChange={setCurrentIndex}
        height="400px"
        width="600px"
        borderRadius="8px"
      >
        {demoImages.map((src, index) => (
          <CarouselSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledCarousel />,
}

export const CustomControls: Story = {
  args: {
    height: '400px',
    width: '600px',
    borderRadius: '8px',
    nextIcon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6z" />
      </svg>
    ),
    prevIcon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    ),
  },
  render: Default.render,
}

export const ResponsiveCarousel: Story = {
  args: {
    height: '400px',
    width: '100%',
    maxWidth: '1200px',
    borderRadius: '8px',
    itemsPerSlide: 3,
    gap: '16px',
    responsive: {
      '640px': { itemsPerSlide: 1 },
      '768px': { itemsPerSlide: 2 },
      '1024px': { itemsPerSlide: 3 },
    },
  },
  render: (args) => (
    <Carousel {...args}>
      {demoImages.concat(demoImages).map((src, index) => (
        <CarouselSlide key={index}>
          <div className="p-4 bg-white rounded-lg shadow">
            <img src={src} alt={`Item ${index + 1}`} className="w-full h-48 object-cover rounded" />
            <h4 className="mt-2 font-semibold">Item {index + 1}</h4>
            <p className="text-gray-600">Description for item {index + 1}</p>
          </div>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
}

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    loadingMessage: 'Loading carousel...',
  },
  render: Default.render,
}

export const TestimonialCarousel: Story = {
  args: {
    height: '300px',
    width: '600px',
    variant: 'fade',
    autoplay: true,
    autoplayInterval: 4000,
    loop: true,
    showControls: false,
    slideBackgroundColor: '#f9fafb',
    slidePadding: '40px',
    slideBorderRadius: '16px',
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselSlide>
        <div className="text-center space-y-4">
          <p className="text-lg italic">
            {
              '"This product has completely transformed how we handle our workflow. Couldn\'t be happier!"'
            }
          </p>
          <div>
            <p className="font-semibold">Sarah Johnson</p>
            <p className="text-sm text-gray-600">CEO, TechCorp</p>
          </div>
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="text-center space-y-4">
          <p className="text-lg italic">
            {
              '"Outstanding service and incredible features. Our team productivity has increased by 50%!"'
            }
          </p>
          <div>
            <p className="font-semibold">Mike Chen</p>
            <p className="text-sm text-gray-600">Product Manager, StartupXYZ</p>
          </div>
        </div>
      </CarouselSlide>
      <CarouselSlide>
        <div className="text-center space-y-4">
          <p className="text-lg italic">
            {'"The best investment we\'ve made this year. Simple, powerful, and reliable."'}
          </p>
          <div>
            <p className="font-semibold">Emily Davis</p>
            <p className="text-sm text-gray-600">Director, Innovation Labs</p>
          </div>
        </div>
      </CarouselSlide>
    </Carousel>
  ),
}

export const Playground: StoryObj<typeof meta> = {
  name: 'Live Playground',
  render: () => (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Edit the JSX on the right. Components from Just UI are in scope (Carousel).
      </p>
      <LivePlayground
        code={`<Carousel>
  <Carousel.Slide><div className="h-24 bg-gray-100 flex items-center justify-center">Slide 1</div></Carousel.Slide>
  <Carousel.Slide><div className="h-24 bg-gray-100 flex items-center justify-center">Slide 2</div></Carousel.Slide>
  <Carousel.Slide><div className="h-24 bg-gray-100 flex items-center justify-center">Slide 3</div></Carousel.Slide>
</Carousel>`}
      />
    </div>
  ),
  args: {} as any,
}
