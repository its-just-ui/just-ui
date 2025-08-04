import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Upload, FileWithProgress } from './Upload'

/**
 * # Upload Component
 *
 * A comprehensive file upload component with drag-and-drop support, progress tracking, and compound component architecture.
 *
 * ## Key Features
 * - **Controlled Component**: Parent manages file state through `files` and `onChange` props
 * - **Compound Components**: Modular architecture with Dropzone, Preview, Progress, FileList, and Button sub-components
 * - **Drag & Drop**: Full support for drag-and-drop file uploads
 * - **File Validation**: Max file size and count restrictions
 * - **Progress Tracking**: Visual progress indicators for uploads
 * - **Customizable**: Extensive styling and rendering options
 *
 * ## Usage
 * ```tsx
 * const [files, setFiles] = useState<File[]>([]);
 *
 * <Upload
 *   files={files}
 *   onChange={setFiles}
 *   multiple
 *   accept="image/*"
 *   maxFiles={5}
 *   maxSize={5 * 1024 * 1024} // 5MB
 * />
 * ```
 */
const meta = {
  title: 'Components/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible file upload component with drag-and-drop, progress tracking, and customizable styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'dashed', 'card', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the upload component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Status state of the upload',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the upload component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
      table: {
        type: { summary: 'string' },
      },
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
      table: {
        type: { summary: 'number' },
      },
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
      table: {
        type: { summary: 'number' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the upload',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    emptyStateMessage: {
      control: 'text',
      description: 'Custom empty state message',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    // Style props
    borderRadius: {
      control: 'text',
      description: 'Border radius',
      table: {
        category: 'Style Props',
        type: { summary: 'string | number' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'Style Props',
        type: { summary: 'string' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'Style Props',
        type: { summary: 'string' },
      },
    },
    textColor: {
      control: 'color',
      description: 'Text color',
      table: {
        category: 'Style Props',
        type: { summary: 'string' },
      },
    },
    uploadIconColor: {
      control: 'color',
      description: 'Upload icon color',
      table: {
        category: 'Style Props',
        type: { summary: 'string' },
      },
    },
    transitionDuration: {
      control: 'text',
      description: 'Transition duration',
      table: {
        category: 'Style Props',
        type: { summary: 'string | number' },
      },
    },
    // Disable controls for functions
    files: { control: false },
    onChange: { control: false },
    onDrop: { control: false },
    onUploadStart: { control: false },
    onUploadProgress: { control: false },
    onUploadComplete: { control: false },
    onRemoveFile: { control: false },
    onError: { control: false },
    renderFileItem: { control: false },
    renderDropzone: { control: false },
    renderProgress: { control: false },
  },
} satisfies Meta<typeof Upload>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled behavior
const UploadWithState = (props: any) => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="w-full max-w-2xl">
      <Upload files={files} onChange={setFiles} {...props} />
    </div>
  )
}

// Basic usage
export const Default: Story = {
  render: (args) => <UploadWithState {...args} />,
}

// Multiple files
export const MultipleFiles: Story = {
  render: (args) => <UploadWithState {...args} />,
  args: {
    multiple: true,
    helperText: 'Upload multiple files at once',
  },
}

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <UploadWithState variant="default" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Bordered</h3>
        <UploadWithState variant="bordered" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Dashed</h3>
        <UploadWithState variant="dashed" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Card</h3>
        <UploadWithState variant="card" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Ghost</h3>
        <UploadWithState variant="ghost" />
      </div>
    </div>
  ),
}

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <UploadWithState size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium</h3>
        <UploadWithState size="md" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <UploadWithState size="lg" />
      </div>
    </div>
  ),
}

// Status states
export const StatusStates: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <UploadWithState status="default" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Success</h3>
        <UploadWithState status="success" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Warning</h3>
        <UploadWithState status="warning" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <UploadWithState status="error" />
      </div>
    </div>
  ),
}

// With restrictions
export const WithRestrictions: Story = {
  render: (args) => <UploadWithState {...args} />,
  args: {
    accept: 'image/*',
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
    helperText: 'Only images allowed. Max 3 files, 5MB each.',
  },
}

// Form integration
export const FormIntegration: Story = {
  render: () => {
    const FormComponent = () => {
      const [files, setFiles] = useState<File[]>([])
      const [submitted, setSubmitted] = useState(false)

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
      }

      return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>

          <Upload
            files={files}
            onChange={setFiles}
            label="Upload Documents"
            helperText="PDF, DOC, or DOCX files only"
            accept=".pdf,.doc,.docx"
            multiple
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>

          {submitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              Form submitted with {files.length} file(s)!
            </div>
          )}
        </form>
      )
    }

    return <FormComponent />
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: (args) => <UploadWithState {...args} />,
  args: {
    variant: 'dashed',
    borderColor: '#8b5cf6',
    borderRadius: '16px',
    backgroundColor: '#f3f4f6',
    textColor: '#4b5563',
    uploadIconColor: '#8b5cf6',
    focusRingColor: '#8b5cf6',
    transitionDuration: '300ms',
    emptyStateMessage: 'Drop your files here to upload',
  },
}

// Async upload simulation
export const AsyncUpload: Story = {
  render: () => {
    const AsyncUploadComponent = () => {
      const [files, setFiles] = useState<FileWithProgress[]>([])

      const simulateUpload = (file: FileWithProgress) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 10

          // Update file progress
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? ({
                    ...f,
                    progress,
                    status: progress < 100 ? 'uploading' : 'success',
                  } as FileWithProgress)
                : f
            )
          )

          if (progress >= 100) {
            clearInterval(interval)
          }
        }, 200)
      }

      const handleChange = (newFiles: File[]) => {
        const filesWithProgress = newFiles.map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          progress: 0,
          status: 'pending' as const,
        }))

        setFiles(filesWithProgress)

        // Start upload simulation for each file
        filesWithProgress.forEach((file) => {
          setTimeout(() => simulateUpload(file), 500)
        })
      }

      return (
        <div className="w-full max-w-2xl">
          <Upload
            files={files as any}
            onChange={handleChange as any}
            multiple
            helperText="Files will automatically upload with progress simulation"
          />
        </div>
      )
    }

    return <AsyncUploadComponent />
  },
}

// Custom compound component usage
export const CompoundComponents: Story = {
  render: () => {
    const CompoundComponentsWrapper = () => {
      const [files, setFiles] = useState<File[]>([])

      return (
        <div className="w-full max-w-2xl">
          <Upload files={files} onChange={setFiles} multiple>
            <div className="space-y-4">
              <Upload.Dropzone className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload to Cloud</h3>
                <p className="text-gray-500 mb-4">Drag files here or click to browse</p>
                <Upload.Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg">
                  Choose Files
                </Upload.Button>
              </Upload.Dropzone>

              {files.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Uploaded Files</h4>
                  <Upload.FileList />
                </div>
              )}
            </div>
          </Upload>
        </div>
      )
    }

    return <CompoundComponentsWrapper />
  },
}

// Custom file preview
export const CustomFilePreview: Story = {
  render: () => {
    const CustomFilePreviewComponent = () => {
      const [files, setFiles] = useState<File[]>([])

      const getFileIcon = (file: FileWithProgress) => {
        const actualFile = file.file || file
        if (actualFile.type && actualFile.type.startsWith('image/'))
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )
        if (actualFile.type && actualFile.type.startsWith('video/'))
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )
        if (actualFile.type && actualFile.type.startsWith('audio/'))
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          )
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      }

      const renderFileItem = (file: FileWithProgress, _index: number) => (
        <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            {getFileIcon(file)}
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-medium text-gray-900">{file.file?.name || (file as any).name}</p>
            <p className="text-sm text-gray-500">
              {((file.file?.size || (file as any).size) / 1024).toFixed(1)} KB
            </p>
            {file.status === 'uploading' && <Upload.Progress file={file} className="mt-2" />}
          </div>
        </div>
      )

      return (
        <div className="w-full max-w-2xl">
          <Upload
            files={files}
            onChange={setFiles}
            multiple
            renderFileItem={renderFileItem}
            variant="card"
          />
        </div>
      )
    }

    return <CustomFilePreviewComponent />
  },
}

// Profile image upload
export const ProfileImageUpload: Story = {
  render: () => {
    const ProfileImageUploadComponent = () => {
      const [files, setFiles] = useState<File[]>([])
      const [preview, setPreview] = useState<string | null>(null)

      const handleChange = (newFiles: File[]) => {
        setFiles(newFiles)

        if (newFiles[0]) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreview(reader.result as string)
          }
          reader.readAsDataURL(newFiles[0])
        } else {
          setPreview(null)
        }
      }

      return (
        <div className="w-full max-w-sm">
          <Upload
            files={files}
            onChange={handleChange}
            accept="image/*"
            maxFiles={1}
            renderDropzone={(isDragging) => (
              <div
                className={`relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 ${
                  isDragging ? 'border-blue-500' : 'border-gray-300'
                } transition-colors cursor-pointer`}
              >
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center transition-all">
                  <span className="text-white opacity-0 hover:opacity-100">Change</span>
                </div>
              </div>
            )}
          >
            <Upload.Dropzone />
            <p className="text-center mt-4 text-sm text-gray-500">Click to upload profile image</p>
          </Upload>
        </div>
      )
    }

    return <ProfileImageUploadComponent />
  },
}

// Disabled state
export const DisabledState: Story = {
  render: (args) => <UploadWithState {...args} />,
  args: {
    disabled: true,
    helperText: 'Upload is currently disabled',
  },
}

// With label and required
export const WithLabelRequired: Story = {
  render: (args) => <UploadWithState {...args} />,
  args: {
    label: 'Resume Upload',
    required: true,
    accept: '.pdf,.doc,.docx',
    helperText: 'Please upload your resume in PDF or Word format',
  },
}
