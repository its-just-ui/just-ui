import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import { Progress } from './Progress'

/**
 * Progress is a versatile component for displaying task completion status, loading states,
 * and multi-step workflows. It supports both determinate and indeterminate modes, multiple
 * visual variants, and extensive customization options.
 *
 * ## Features
 * - **Multiple Variants**: Linear, circular, striped, segmented, and more visual styles
 * - **Determinate & Indeterminate**: Show specific progress or loading states
 * - **Compound Architecture**: Use sub-components for maximum flexibility
 * - **Buffering Support**: Display buffer levels for media loading scenarios
 * - **Multi-segment Progress**: Show progress across multiple tasks or categories
 * - **Threshold Markers**: Visual indicators and callbacks at specific values
 * - **Simulation Mode**: Built-in auto-incrementing for demos and prototyping
 * - **Interactive Controls**: Pause, resume, and cancel functionality
 * - **Extensive Styling**: 40+ style props for complete visual customization
 * - **Full Accessibility**: ARIA compliant with screen reader support
 *
 * ## Usage
 *
 * ### Basic Usage:
 * ```tsx
 * <Progress value={45} />
 * ```
 *
 * ### Controlled Progress:
 * ```tsx
 * const [progress, setProgress] = useState(0)
 *
 * useEffect(() => {
 *   // Simulate async operation
 *   const timer = setInterval(() => {
 *     setProgress(prev => prev < 100 ? prev + 10 : 100)
 *   }, 500)
 *   return () => clearInterval(timer)
 * }, [])
 *
 * <Progress value={progress} onComplete={() => console.log('Done!')} />
 * ```
 *
 * ### Indeterminate Loading:
 * ```tsx
 * <Progress isIndeterminate />
 * ```
 *
 * ### Circular Progress:
 * ```tsx
 * <Progress
 *   variant="circular"
 *   value={75}
 *   size="lg"
 * />
 * ```
 *
 * ### Multi-segment Progress:
 * ```tsx
 * <Progress
 *   segments={[
 *     { id: 'task1', value: 30, color: '#10b981', label: 'Task 1' },
 *     { id: 'task2', value: 25, color: '#3b82f6', label: 'Task 2' },
 *     { id: 'task3', value: 20, color: '#f59e0b', label: 'Task 3' }
 *   ]}
 * />
 * ```
 *
 * ### With Thresholds:
 * ```tsx
 * <Progress
 *   value={85}
 *   thresholds={[
 *     { value: 25, color: '#10b981', label: 'Good start' },
 *     { value: 50, color: '#3b82f6', label: 'Halfway there' },
 *     { value: 75, color: '#f59e0b', label: 'Almost done' },
 *     { value: 90, color: '#ef4444', label: 'Critical level' }
 *   ]}
 * />
 * ```
 *
 * ### Custom Styling:
 * ```tsx
 * <Progress
 *   value={60}
 *   variant="striped"
 *   size="lg"
 *   barColor="#8b5cf6"
 *   trackColor="#e5e7eb"
 *   borderRadius="12px"
 *   height="16px"
 *   labelColor="#6b21a8"
 * />
 * ```
 *
 * ### Compound Components:
 * ```tsx
 * <Progress value={75}>
 *   <Progress.Track />
 *   <Progress.Bar />
 *   <Progress.Label format="fraction" />
 *   <Progress.ThresholdMarker threshold={{ value: 50, color: '#f59e0b' }} />
 *   <Progress.Indicator type="check" />
 * </Progress>
 * ```
 */

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    // Core functionality
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    bufferValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Buffer/preload progress value',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Show indeterminate loading state',
    },

    // Configuration
    variant: {
      control: 'select',
      options: [
        'linear',
        'circular',
        'dashed',
        'striped',
        'segmented',
        'pill',
        'bordered',
        'minimal',
        'bar-with-label',
        'overlay-style',
        'inverse',
      ],
      description: 'Visual variant of the progress bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'paused', 'complete', 'failed'],
      description: 'Status affecting color and behavior',
    },
    transition: {
      control: 'select',
      options: ['none', 'smooth', 'bounce', 'elastic', 'spring'],
      description: 'Animation transition style',
    },

    // Styling
    trackColor: {
      control: 'color',
      description: 'Background track color',
    },
    barColor: {
      control: 'color',
      description: 'Progress bar color',
    },
    bufferColor: {
      control: 'color',
      description: 'Buffer progress color',
    },
    backgroundColor: {
      control: 'color',
      description: 'Container background color',
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius (CSS value)',
    },

    // Dimensions
    height: {
      control: 'text',
      description: 'Height for linear progress (CSS value)',
    },
    width: {
      control: 'text',
      description: 'Width of the component (CSS value)',
    },
    diameter: {
      control: 'text',
      description: 'Diameter for circular progress (CSS value)',
    },

    // Typography
    labelFontSize: {
      control: 'text',
      description: 'Font size for labels (CSS value)',
    },
    labelFontWeight: {
      control: 'select',
      options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description: 'Font weight for labels',
    },
    labelColor: {
      control: 'color',
      description: 'Color of label text',
    },

    // Event handlers
    onChange: {
      action: 'value changed',
      description: 'Callback when progress value changes',
    },
    onComplete: {
      action: 'completed',
      description: 'Callback when progress reaches 100%',
    },
    onError: {
      action: 'error occurred',
      description: 'Callback when an error occurs',
    },
    onThresholdCross: {
      action: 'threshold crossed',
      description: 'Callback when a threshold is crossed',
    },

    // Accessibility
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for the progress bar',
    },

    // Complex props - disable controls
    segments: { control: false },
    thresholds: { control: false },
    simulation: { control: false },
    renderLabel: { control: false },
    renderTrack: { control: false },
    renderBar: { control: false },
    renderThreshold: { control: false },
    renderIndicator: { control: false },
    renderTooltip: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

// Helper components for stories
interface ProgressWithStateProps {
  value?: number
  autoProgress?: boolean
  duration?: number
  onComplete?: () => void
  [key: string]: unknown
}

const ProgressWithState = ({
  value: initialValue = 0,
  autoProgress = false,
  duration = 3000,
  onComplete,
  ...props
}: ProgressWithStateProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (autoProgress) {
      const increment = 100 / (duration / 100)
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            onComplete?.()
            return 100
          }
          return prev + increment
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [autoProgress, duration, onComplete])

  return <Progress {...props} value={value} />
}

const _ProgressGroupWithState = ({
  children,
  ..._props
}: {
  children: React.ReactNode
  [key: string]: unknown
}) => {
  const [values, setValues] = useState({ task1: 0, task2: 0, task3: 0 })

  useEffect(() => {
    const intervals = Object.keys(values).map((key, index) => {
      return setInterval(
        () => {
          setValues((prev) => ({
            ...prev,
            [key]: Math.min(prev[key as keyof typeof prev] + Math.random() * 5, 100),
          }))
        },
        200 + index * 100
      )
    })

    return () => intervals.forEach(clearInterval)
  }, [values])

  return (
    <div className="space-y-4">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null
        }
        const key = `task${index + 1}` as keyof typeof values
        return React.cloneElement(child as React.ReactElement<{ value?: number }>, {
          value: values[key],
        })
      })}
    </div>
  )
}

// File upload simulation
const FileUploadExample = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [bufferProgress, setBufferProgress] = useState(0)
  const [status, setStatus] = useState<'default' | 'success' | 'error'>('default')

  const startUpload = () => {
    setUploadProgress(0)
    setBufferProgress(0)
    setStatus('default')

    // Simulate buffer filling faster than upload
    const bufferInterval = setInterval(() => {
      setBufferProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bufferInterval)
          return 100
        }
        return prev + Math.random() * 8
      })
    }, 100)

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setStatus('success')
          return 100
        }
        return prev + Math.random() * 3
      })
    }, 150)
  }

  useEffect(() => {
    startUpload()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Uploading file...</h3>
        <button onClick={startUpload} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
          Restart
        </button>
      </div>
      <Progress
        value={uploadProgress}
        bufferValue={bufferProgress}
        status={status}
        variant="striped"
        size="md"
        height="12px"
        ariaLabel="File upload progress"
      />
      <div className="text-sm text-gray-600 relative top-4">
        Upload: {Math.round(uploadProgress)}% | Buffer: {Math.round(bufferProgress)}%
      </div>
    </div>
  )
}

// Multi-step wizard
const MultiStepWizardExample = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Account Information', 'Personal Details', 'Preferences', 'Review', 'Complete']

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Setup Wizard</h3>
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <Progress
        value={progress}
        variant="pill"
        size="lg"
        status={currentStep === steps.length - 1 ? 'complete' : 'default'}
        thresholds={steps.map((_, index) => ({
          value: ((index + 1) / steps.length) * 100,
          color: '#3b82f6',
          label: steps[index],
        }))}
      />

      <div className="text-center">
        <p className="font-medium mb-4">{steps[currentStep]}</p>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

// Dashboard metrics
const DashboardMetricsExample = () => {
  const metrics = [
    { label: 'CPU Usage', value: 45, color: '#10b981', status: 'success' as const },
    { label: 'Memory', value: 78, color: '#f59e0b', status: 'warning' as const },
    { label: 'Storage', value: 92, color: '#ef4444', status: 'error' as const },
    { label: 'Network', value: 34, color: '#3b82f6', status: 'default' as const },
  ]

  return (
    <div className="grid grid-cols-2 gap-6">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{metric.label}</span>
            <span className="text-sm text-gray-600">{metric.value}%</span>
          </div>
          <Progress
            value={metric.value}
            variant="linear"
            size="sm"
            status={metric.status}
            barColor={metric.color}
            height="6px"
          />
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// Stories
// ============================================================================

export const Default: Story = {
  args: {
    value: 45,
  },
}

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Linear</h3>
        <Progress value={45} variant="linear" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Striped</h3>
        <Progress value={65} variant="striped" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Pill</h3>
        <Progress value={75} variant="pill" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Bordered</h3>
        <Progress value={55} variant="bordered" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Circular with Centered Text</h3>
        <div className="flex space-x-6 items-center">
          <Progress value={45} variant="circular" size="sm" showLoadingText />
          <Progress value={65} variant="circular" size="md" showLoadingText />
          <Progress value={85} variant="circular" size="lg" showLoadingText />
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Small</h3>
        <Progress value={45} size="sm" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Medium</h3>
        <Progress value={65} size="md" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Large</h3>
        <Progress value={85} size="lg" />
      </div>
    </div>
  ),
}

export const StatusStates: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Default</h3>
        <Progress value={45} status="default" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Success</h3>
        <Progress value={100} status="success" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Warning</h3>
        <Progress value={75} status="warning" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Error</h3>
        <Progress value={35} status="error" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Paused</h3>
        <Progress value={60} status="paused" />
      </div>
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Linear Indeterminate</h3>
        <Progress isIndeterminate />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Circular Indeterminate with Loading Text</h3>
        <div className="flex space-x-6 items-center">
          <Progress isIndeterminate variant="circular" size="sm" showLoadingText />
          <Progress isIndeterminate variant="circular" size="md" showLoadingText={false} />
          <Progress
            isIndeterminate
            variant="circular"
            size="lg"
            showLoadingText={false}
            customLoadingContent={<span className="text-[10px]">🔄</span>}
          />
        </div>
      </div>
    </div>
  ),
}

export const WithBuffer: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Media Loading with Buffer</h3>
        <Progress value={45} bufferValue={75} bufferColor="#93c5fd" height="12px" />
        <div className="text-sm text-gray-600 relative top-4">Played: 45% | Buffered: 75%</div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Download Progress</h3>
        <Progress
          value={30}
          bufferValue={60}
          variant="striped"
          bufferColor="#d1fae5"
          height="10px"
        />
        <div className="text-sm text-gray-600 relative top-4">Downloaded: 30% | Cached: 60%</div>
      </div>
    </div>
  ),
}

export const MultiSegment: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Task Breakdown</h3>
        <Progress
          segments={[
            { id: 'analysis', value: 25, color: '#10b981', label: 'Analysis' },
            { id: 'development', value: 35, color: '#3b82f6', label: 'Development' },
            { id: 'testing', value: 20, color: '#f59e0b', label: 'Testing' },
            { id: 'deployment', value: 15, color: '#8b5cf6', label: 'Deployment' },
          ]}
          height="16px"
        />
        <div className="grid grid-cols-4 gap-2 text-xs relative top-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            Analysis (25%)
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            Development (35%)
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
            Testing (20%)
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
            Deployment (15%)
          </div>
        </div>
      </div>
    </div>
  ),
}

export const WithThresholds: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Performance Metrics with Thresholds</h3>
        <Progress
          value={85}
          thresholds={[
            { value: 25, color: '#10b981', label: 'Good' },
            { value: 50, color: '#3b82f6', label: 'Average' },
            { value: 75, color: '#f59e0b', label: 'Warning' },
            { value: 90, color: '#ef4444', label: 'Critical' },
          ]}
          height="14px"
          onThresholdCross={(threshold, value) =>
            console.log(`Crossed ${threshold.label} threshold at ${value}%`)
          }
        />
        <div className="text-sm text-gray-600 relative top-4">Current: 85% (Warning level)</div>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  args: {},
  render: () => <ProgressWithState autoProgress duration={4000} />,
}

export const SimulationMode: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Auto-simulation (3 seconds) - No Spinner</h3>
        <Progress
          simulation={{
            enabled: true,
            duration: 3000,
            increment: 2,
            interval: 60,
            autoComplete: true,
          }}
          hideIndicator
          onComplete={() => console.log('Auto-simulation completed!')}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Slower simulation (5 seconds) - No Spinner</h3>
        <Progress
          simulation={{
            enabled: true,
            duration: 5000,
            increment: 1,
            interval: 50,
            autoComplete: true,
          }}
          variant="striped"
          hideIndicator
          onComplete={() => console.log('Slow simulation completed!')}
        />
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Custom Colors</h3>
        <Progress
          value={60}
          barColor="#8b5cf6"
          trackColor="#f3e8ff"
          borderRadius="12px"
          height="12px"
          textColor="#6b21a8"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Gradient Backgrounds</h3>
        <Progress
          value={75}
          height="20px"
          borderRadius="10px"
          barGradient="linear-gradient(90deg, #10b981, #3b82f6)"
          trackGradient="linear-gradient(90deg, #f3f4f6, #e5e7eb)"
          boxShadow="0 2px 4px rgba(0,0,0,0.1)"
          textColor="#1f2937"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Enhanced Borders & Opacity</h3>
        <Progress
          value={45}
          height="16px"
          barColor="#f59e0b"
          trackColor="#fef3c7"
          barBorderColor="#d97706"
          trackBorderColor="#f59e0b"
          barBorderWidth="2px"
          trackBorderWidth="1px"
          barOpacity={0.9}
          trackOpacity={0.6}
          borderRadius="8px"
          percentageColor="#92400e"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Custom Animation Duration</h3>
        <Progress
          value={85}
          height="12px"
          barGradient="linear-gradient(45deg, #ec4899, #8b5cf6)"
          animationDuration="1.5s"
          transition="elastic"
          textColor="#7c3aed"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Multi-color Styling</h3>
        <Progress
          value={65}
          height="18px"
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          trackColor="#e2e8f0"
          percentageColor="#4c1d95"
          borderRadius="9px"
          boxShadow="inset 0 1px 3px rgba(0,0,0,0.1)"
        />
      </div>
    </div>
  ),
}

export const IndicatorControl: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">With Spinner (Default)</h3>
        <Progress value={65} />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Without Spinner (hideIndicator)</h3>
        <Progress value={65} hideIndicator />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Indeterminate with Spinner</h3>
        <Progress isIndeterminate />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Indeterminate without Spinner</h3>
        <Progress isIndeterminate hideIndicator />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Circular with Spinner</h3>
        <Progress value={75} variant="circular" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Circular without Spinner</h3>
        <Progress value={75} variant="circular" hideIndicator />
      </div>
    </div>
  ),
}

export const SpacingDemo: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Proper Spacing Between Progress and Content</h3>
        <p className="text-sm text-gray-600">
          Notice the adequate spacing between progress bars and the content below:
        </p>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <Progress value={65} height="12px" barColor="#3b82f6" labelPosition="bottom" />
            <p className="text-sm text-gray-700 mt-2 relative top-4">
              ✅ Bottom label with proper margin
            </p>
          </div>

          <div>
            <Progress value={45} height="12px" barColor="#10b981" labelPosition="top" />
            <p className="text-sm text-gray-700 mt-2 relative top-4">
              ✅ Top label with good separation
            </p>
          </div>

          <div>
            <Progress
              value={75}
              height="20px"
              barGradient="linear-gradient(90deg, #ec4899, #be185d)"
              labelPosition="overlay"
              labelColor="#ffffff"
            />
            <p className="text-sm text-gray-700 mt-2">
              ✅ Overlay doesn&apos;t interfere with content flow
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Real-world Example with Multiple Elements</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium mb-2">File Upload Progress</h4>
          <Progress value={82} height="14px" barColor="#059669" labelSize="md" />
          <div className="flex justify-between items-center text-sm text-gray-600 relative top-6">
            <span>uploading document.pdf</span>
            <span>2.3 MB / 2.8 MB</span>
          </div>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded text-sm mt-8">
            Cancel Upload
          </button>
        </div>
      </div>
    </div>
  ),
}

export const LabelPositioning: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Top Position</h3>
        <Progress
          value={65}
          height="12px"
          barColor="#3b82f6"
          labelPosition="top"
          labelColor="#1f2937"
        />
        <p className="text-xs text-gray-500 mt-2">Content below top-positioned label</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Bottom Position (Default)</h3>
        <Progress
          value={75}
          height="12px"
          barColor="#10b981"
          labelPosition="bottom"
          labelColor="#1f2937"
        />
        <p className="text-xs text-gray-500 mt-2">Content below bottom-positioned label</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Overlay Position</h3>
        <Progress
          value={85}
          height="24px"
          barGradient="linear-gradient(90deg, #ec4899, #be185d)"
          labelPosition="overlay"
          labelColor="#ffffff"
          labelSize="lg"
        />
        <p className="text-xs text-gray-500 mt-2">Content below overlay label</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Inside Position</h3>
        <Progress
          value={60}
          height="20px"
          barColor="#f59e0b"
          labelPosition="inside"
          labelColor="#ffffff"
          labelSize="md"
          borderRadius="10px"
        />
        <p className="text-xs text-gray-500 mt-2">Content below inside label</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Left Position</h3>
        <Progress
          value={40}
          height="12px"
          barColor="#8b5cf6"
          labelPosition="left"
          labelColor="#1f2937"
        />
        <p className="text-xs text-gray-500 mt-2">Content below left-positioned label</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Right Position</h3>
        <Progress
          value={90}
          height="12px"
          barColor="#ef4444"
          labelPosition="right"
          labelColor="#1f2937"
        />
        <p className="text-xs text-gray-500 mt-2">Content below right-positioned label</p>
      </div>
    </div>
  ),
}

export const PositioningAndLayout: Story = {
  args: {},
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Default Layout (Proper Spacing)</h3>
        <Progress value={65} height="12px" barColor="#3b82f6" textColor="#1f2937" />
        <p className="text-xs text-gray-500 mt-2">
          This content should not overlap with the progress label above
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Overlay Style with Centered Text</h3>
        <Progress
          value={75}
          variant="bar-with-label"
          height="24px"
          barGradient="linear-gradient(90deg, #10b981, #059669)"
          textColor="#ffffff"
          borderRadius="12px"
        />
        <p className="text-xs text-gray-500 mt-2">Overlay labels don&apos;t need extra spacing</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Label Size Variations with Proper Spacing</h3>
        <div className="space-y-4">
          <div>
            <Progress
              value={42}
              height="16px"
              barColor="#ec4899"
              labelSize="sm"
              labelColor="#1f2937"
            />
            <p className="text-xs text-gray-400">Small label - good spacing</p>
          </div>
          <div>
            <Progress
              value={62}
              height="18px"
              barColor="#06b6d4"
              labelSize="md"
              labelColor="#1f2937"
            />
            <p className="text-xs text-gray-400">Medium label - proper gap</p>
          </div>
          <div>
            <Progress
              value={82}
              height="20px"
              barColor="#84cc16"
              labelSize="lg"
              labelColor="#1f2937"
            />
            <p className="text-xs text-gray-400">Large label - no overlap</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Complex Layout with Multiple Elements</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Task Progress</span>
            <span className="text-sm text-gray-600">3 of 5 complete</span>
          </div>
          <Progress
            value={60}
            height="10px"
            barGradient="linear-gradient(90deg, #8b5cf6, #7c3aed)"
            trackColor="#e5e7eb"
            borderRadius="5px"
            labelPosition="top"
          />
          <p className="text-xs text-gray-500 mt-2">
            2 tasks remaining - proper spacing maintained
          </p>
          <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded text-xs">
            Continue
          </button>
        </div>
      </div>
    </div>
  ),
}

export const CompoundComponents: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Using Compound Components</h3>
        <Progress value={65}>
          <Progress.Track />
          <Progress.Bar />
          <div className="flex justify-between items-center mt-1">
            <Progress.Label format="fraction" />
            <Progress.ValueDescription content="Task in progress" />
          </div>
          <Progress.ThresholdMarker threshold={{ value: 50, color: '#f59e0b', label: 'Halfway' }} />
          <Progress.Indicator type="spinner" />
        </Progress>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Circular with Custom Label</h3>
        <Progress value={85} variant="circular">
          <Progress.Track />
          <Progress.Bar />
          <Progress.Label customContent={<span className="text-lg font-bold">85%</span>} />
          <Progress.Indicator type="check" />
        </Progress>
      </div>
    </div>
  ),
}

export const AccessibilityDemo: Story = {
  args: {},
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Accessibility Features</h3>
        <p className="text-sm text-gray-700 mb-4">
          All progress bars include proper ARIA attributes and screen reader support.
        </p>

        <div className="space-y-4">
          <div className="space-y-4">
            <label className="text-sm font-medium">File Upload Progress</label>
            <Progress value={65} ariaLabel="File upload progress" role="progressbar" height="10px">
              <Progress.ValueDescription content="File upload 65% complete" />
            </Progress>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Form Completion</label>
            <Progress value={40} ariaLabel="Form completion progress" variant="pill" height="8px" />
            <div className="text-sm text-gray-600 relative top-4">Step 2 of 5 completed</div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const FileUpload: Story = {
  args: {},
  render: () => <FileUploadExample />,
}

export const MultiStepWizard: Story = {
  args: {},
  render: () => <MultiStepWizardExample />,
}

export const DashboardMetrics: Story = {
  args: {},
  render: () => <DashboardMetricsExample />,
}
