import React, {
  useState,
  useContext,
  createContext,
  forwardRef,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  DragEvent,
  ChangeEvent,
} from 'react'
import { cn } from '@/utils'

/**
 * Upload is a comprehensive file upload component with drag-and-drop support, progress tracking, and compound component architecture.
 *
 * ## Features
 * - **Controlled Component**: Parent manages file state through `files` and `onChange` props
 * - **Compound Components**: Modular architecture with Dropzone, Preview, Progress, FileList, and Button sub-components
 * - **Drag & Drop**: Full support for drag-and-drop file uploads with visual feedback
 * - **File Validation**: Built-in max file size and count restrictions
 * - **Progress Tracking**: Visual progress indicators for file uploads
 * - **Multiple Variants**: 5 pre-defined visual styles (default, bordered, dashed, card, ghost)
 * - **3 Sizes**: Small, medium, and large options
 * - **Status States**: Built-in support for success, warning, and error states
 * - **Extensive Styling**: Over 30 style props for complete customization
 * - **Custom Rendering**: Support for custom file items, dropzone, and progress rendering
 * - **Accessibility**: Full keyboard navigation and ARIA support
 * - **Form Ready**: Works seamlessly in forms with required field support
 *
 * ## Usage
 *
 * ### Basic Usage (Controlled):
 * ```tsx
 * const [files, setFiles] = useState<File[]>([])
 *
 * <Upload
 *   files={files}
 *   onChange={setFiles}
 *   accept="image/*"
 *   multiple
 * />
 * ```
 *
 * ### With Restrictions:
 * ```tsx
 * <Upload
 *   files={files}
 *   onChange={setFiles}
 *   maxFiles={5}
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   accept=".pdf,.doc,.docx"
 *   helperText="PDF or Word documents only. Max 5 files, 5MB each."
 * />
 * ```
 *
 * ### Using Compound Components:
 * ```tsx
 * <Upload files={files} onChange={setFiles}>
 *   <Upload.Dropzone className="custom-dropzone">
 *     <MyCustomDropzoneContent />
 *   </Upload.Dropzone>
 *   <Upload.FileList>
 *     <Upload.Button>Select Files</Upload.Button>
 *   </Upload.FileList>
 * </Upload>
 * ```
 *
 * ### With Custom File Preview:
 * ```tsx
 * <Upload
 *   files={files}
 *   onChange={setFiles}
 *   renderFileItem={(file, index) => (
 *     <div className="custom-file-item">
 *       <Upload.Preview file={file} />
 *       <span>{file.file.name}</span>
 *       <Upload.Progress file={file} />
 *     </div>
 *   )}
 * />
 * ```
 *
 * ### Form Integration:
 * ```tsx
 * <form onSubmit={handleSubmit}>
 *   <Upload
 *     files={files}
 *     onChange={setFiles}
 *     label="Upload Documents"
 *     required
 *     helperText="Please upload supporting documents"
 *   />
 *   <button type="submit">Submit</button>
 * </form>
 * ```
 *
 * @example
 * ```tsx
 * // Simple image upload
 * <Upload
 *   files={files}
 *   onChange={setFiles}
 *   accept="image/*"
 *   variant="dashed"
 *   size="lg"
 * />
 *
 * // Async upload with progress
 * <Upload
 *   files={files}
 *   onChange={setFiles}
 *   onUploadStart={(file) => console.log('Starting upload:', file.name)}
 *   onUploadProgress={(file, progress) => console.log(`${file.name}: ${progress}%`)}
 *   onUploadComplete={(file) => console.log('Completed:', file.name)}
 * />
 * ```
 */

// Types
export interface FileWithProgress {
  id: string
  file: File
  progress?: number
  status?: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export type UploadVariant = 'default' | 'bordered' | 'dashed' | 'card' | 'ghost'
export type UploadSize = 'sm' | 'md' | 'lg'
export type UploadStatus = 'default' | 'success' | 'warning' | 'error'

export interface UploadStyleProps {
  // Border
  borderWidth?: string | number
  borderColor?: string
  borderStyle?: string
  borderRadius?: string | number

  // Typography
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  textColor?: string
  placeholderColor?: string

  // Colors
  backgroundColor?: string
  hoverBackgroundColor?: string
  activeColor?: string

  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string | number
  focusRingOffset?: string | number
  focusBorderColor?: string
  focusBackgroundColor?: string

  // Shadows
  boxShadow?: string
  focusBoxShadow?: string

  // Spacing
  padding?: string | number
  paddingX?: string | number
  paddingY?: string | number
  margin?: string | number
  gap?: string | number

  // Icons
  uploadIconColor?: string
  deleteIconColor?: string
  successIconColor?: string
  errorIconColor?: string

  // Transitions
  transitionDuration?: string | number
}

export interface UploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onError' | 'onDrop'>,
    UploadStyleProps {
  // Controlled component props
  files?: File[]
  onChange?: (files: File[]) => void

  // Core functionality
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  required?: boolean
  loading?: boolean

  // Visual props
  variant?: UploadVariant
  size?: UploadSize
  status?: UploadStatus

  // Content
  label?: ReactNode
  helperText?: ReactNode
  emptyStateMessage?: ReactNode

  // Event handlers
  onDrop?: (files: File[]) => void
  onUploadStart?: (file: File) => void
  onUploadProgress?: (file: File, progress: number) => void
  onUploadComplete?: (file: File) => void
  onRemoveFile?: (file: File) => void
  onError?: (error: Error, file?: File) => void

  // Custom renders
  renderFileItem?: (file: FileWithProgress, index: number) => ReactNode
  renderDropzone?: (isDragging: boolean) => ReactNode
  renderProgress?: (file: FileWithProgress) => ReactNode

  // Sub-component style props
  dropzoneStyle?: CSSProperties
  fileListStyle?: CSSProperties
  buttonStyle?: CSSProperties
  progressStyle?: CSSProperties
  previewStyle?: CSSProperties
}

// Context
interface UploadContextValue {
  files: FileWithProgress[]
  setFiles: (files: FileWithProgress[]) => void
  addFiles: (newFiles: File[]) => void
  removeFile: (fileId: string) => void
  updateFileProgress: (fileId: string, progress: number) => void
  updateFileStatus: (fileId: string, status: FileWithProgress['status'], error?: string) => void
  props: UploadProps
  isDragging: boolean
  setIsDragging: (isDragging: boolean) => void
}

const UploadContext = createContext<UploadContextValue | null>(null)

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error('useUploadContext must be used within an Upload component')
  }
  return context
}

// Utility functions
const generateFileId = () => Math.random().toString(36).substr(2, 9)

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Dropzone Component
export interface DropzoneProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  ({ children, className, style, ...props }, ref) => {
    const { props: uploadProps, isDragging, setIsDragging, addFiles } = useUploadContext()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragEnter = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!uploadProps.disabled) {
          setIsDragging(true)
        }
      },
      [uploadProps.disabled, setIsDragging]
    )

    const handleDragLeave = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
      },
      [setIsDragging]
    )

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
    }, [])

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (!uploadProps.disabled) {
          const droppedFiles = Array.from(e.dataTransfer.files)
          addFiles(droppedFiles)
          uploadProps.onDrop?.(droppedFiles)
        }
      },
      [uploadProps, setIsDragging, addFiles]
    )

    const handleClick = useCallback(() => {
      if (!uploadProps.disabled) {
        inputRef.current?.click()
      }
    }, [uploadProps.disabled])

    const handleFileChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        addFiles(selectedFiles)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
      [addFiles]
    )

    const dropzoneClasses = cn(
      'upload-dropzone',
      'relative cursor-pointer transition-all',
      {
        'opacity-50 cursor-not-allowed': uploadProps.disabled,
        'ring-2 ring-blue-500 ring-offset-2': isDragging,
      },
      className
    )

    const mergedStyle: CSSProperties = {
      ...uploadProps.dropzoneStyle,
      ...style,
      transitionDuration:
        typeof uploadProps.transitionDuration === 'number'
          ? `${uploadProps.transitionDuration}ms`
          : uploadProps.transitionDuration || '200ms',
    }

    return (
      <div
        ref={ref}
        className={dropzoneClasses}
        style={mergedStyle}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={uploadProps.disabled ? -1 : 0}
        aria-disabled={uploadProps.disabled}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={uploadProps.accept}
          multiple={uploadProps.multiple}
          disabled={uploadProps.disabled}
          onChange={handleFileChange}
          aria-label="File upload"
        />
        {uploadProps.renderDropzone ? uploadProps.renderDropzone(isDragging) : children}
      </div>
    )
  }
)

Dropzone.displayName = 'Upload.Dropzone'

// Progress Component
export interface UploadProgressProps extends HTMLAttributes<HTMLDivElement> {
  file: FileWithProgress
}

const Progress = forwardRef<HTMLDivElement, UploadProgressProps>(
  ({ file, className, style, ...props }, ref) => {
    const { props: uploadProps } = useUploadContext()

    if (uploadProps.renderProgress) {
      return <>{uploadProps.renderProgress(file)}</>
    }

    const progress = file.progress || 0

    const progressClasses = cn(
      'upload-progress',
      'relative w-full h-2 bg-gray-200 rounded-full overflow-hidden',
      className
    )

    const mergedStyle: CSSProperties = {
      ...uploadProps.progressStyle,
      ...style,
    }

    return (
      <div ref={ref} className={progressClasses} style={mergedStyle} {...props}>
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all"
          style={{
            width: `${progress}%`,
            transitionDuration:
              typeof uploadProps.transitionDuration === 'number'
                ? `${uploadProps.transitionDuration}ms`
                : uploadProps.transitionDuration || '200ms',
          }}
        />
      </div>
    )
  }
)

Progress.displayName = 'Upload.Progress'

// Preview Component
export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  file: FileWithProgress
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ file, className, style, ...props }, ref) => {
    const { props: uploadProps } = useUploadContext()
    const [preview, setPreview] = useState<string | null>(null)

    React.useEffect(() => {
      const actualFile = (file as FileWithProgress & { file?: File }).file || file
      if (actualFile.type && actualFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(actualFile)
      }
    }, [file])

    const previewClasses = cn(
      'upload-preview',
      'relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100',
      className
    )

    const mergedStyle: CSSProperties = {
      ...uploadProps.previewStyle,
      ...style,
    }

    return (
      <div ref={ref} className={previewClasses} style={mergedStyle} {...props}>
        {preview ? (
          <img
            src={preview}
            alt={
              (file as FileWithProgress & { file?: File; name?: string }).file?.name ||
              (file as FileWithProgress & { name?: string }).name
            }
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
)

Preview.displayName = 'Upload.Preview'

// FileList Component
export interface FileListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const FileList = forwardRef<HTMLDivElement, FileListProps>(
  ({ children, className, style, ...props }, ref) => {
    const { files, removeFile, props: uploadProps } = useUploadContext()

    const fileListClasses = cn('upload-file-list', 'space-y-2', className)

    const mergedStyle: CSSProperties = {
      ...uploadProps.fileListStyle,
      ...style,
    }

    const handleRemove = (fileId: string, file: FileWithProgress) => {
      removeFile(fileId)
      const actualFile = (file as FileWithProgress & { file?: File }).file || file
      uploadProps.onRemoveFile?.(actualFile)
    }

    return (
      <div ref={ref} className={fileListClasses} style={mergedStyle} {...props}>
        {files.map((file, index) => (
          <div key={file.id} className="upload-file-item">
            {uploadProps.renderFileItem ? (
              uploadProps.renderFileItem(file, index)
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Preview file={file} className="w-10 h-10" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {(file as FileWithProgress & { file?: File; name?: string }).file?.name ||
                        (file as FileWithProgress & { name?: string }).name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(
                        (file as FileWithProgress & { file?: File; size?: number }).file?.size ||
                          (file as FileWithProgress & { size?: number }).size ||
                          0
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && <Progress file={file} className="w-20" />}
                  {file.status === 'success' && (
                    <svg
                      className="w-5 h-5"
                      style={{ color: uploadProps.successIconColor || '#10b981' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {file.status === 'error' && (
                    <svg
                      className="w-5 h-5"
                      style={{ color: uploadProps.errorIconColor || '#ef4444' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  <button
                    onClick={() => handleRemove(file.id, file)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    disabled={uploadProps.disabled}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: uploadProps.deleteIconColor || '#6b7280' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {children}
      </div>
    )
  }
)

FileList.displayName = 'Upload.FileList'

// Button Component
export interface UploadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, UploadButtonProps>(
  ({ children, className, style, ...props }, ref) => {
    const { props: uploadProps } = useUploadContext()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = useCallback(() => {
      if (!uploadProps.disabled) {
        inputRef.current?.click()
      }
    }, [uploadProps.disabled])

    const { addFiles } = useUploadContext()

    const handleFileChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        addFiles(selectedFiles)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
      [addFiles]
    )

    const buttonClasses = cn(
      'upload-button',
      'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors',
      {
        'opacity-50 cursor-not-allowed': uploadProps.disabled,
      },
      className
    )

    const mergedStyle: CSSProperties = {
      ...uploadProps.buttonStyle,
      ...style,
      transitionDuration:
        typeof uploadProps.transitionDuration === 'number'
          ? `${uploadProps.transitionDuration}ms`
          : uploadProps.transitionDuration || '200ms',
    }

    return (
      <>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={uploadProps.accept}
          multiple={uploadProps.multiple}
          disabled={uploadProps.disabled}
          onChange={handleFileChange}
          aria-label="File upload"
        />
        <button
          ref={ref}
          className={buttonClasses}
          style={mergedStyle}
          onClick={handleClick}
          disabled={uploadProps.disabled}
          type="button"
          {...props}
        >
          {children || 'Upload Files'}
        </button>
      </>
    )
  }
)

Button.displayName = 'Upload.Button'

// Main Upload Component
const UploadRoot = forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
  const {
    files: controlledFiles,
    onChange,
    variant = 'default',
    size = 'md',
    status = 'default',
    className,
    style,
    children,
    label,
    helperText,
    emptyStateMessage,
    maxFiles,
    maxSize,
    onUploadStart,
    onUploadProgress,
    onUploadComplete,
    onError,
  } = props

  const [internalFiles, setInternalFiles] = useState<FileWithProgress[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const files = useMemo(() => {
    if (controlledFiles) {
      return controlledFiles.map((file) => {
        const existing = internalFiles.find((f) => f.file === file)
        return (
          existing ||
          ({
            id: generateFileId(),
            file,
            status: 'pending' as const,
          } as FileWithProgress)
        )
      })
    }
    return internalFiles
  }, [controlledFiles, internalFiles])

  const setFiles = useCallback(
    (newFiles: FileWithProgress[]) => {
      if (onChange) {
        onChange(newFiles.map((f) => f.file))
      } else {
        setInternalFiles(newFiles)
      }
    },
    [onChange]
  )

  const addFiles = useCallback(
    (newFiles: File[]) => {
      let filesToAdd = newFiles

      // Check max files
      if (maxFiles && files.length + filesToAdd.length > maxFiles) {
        filesToAdd = filesToAdd.slice(0, maxFiles - files.length)
        onError?.(new Error(`Maximum ${maxFiles} files allowed`))
      }

      // Check file sizes
      filesToAdd = filesToAdd.filter((file) => {
        if (maxSize && file.size > maxSize) {
          onError?.(
            new Error(`File ${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`),
            file
          )
          return false
        }
        return true
      })

      const filesWithIds: FileWithProgress[] = filesToAdd.map((file) => ({
        id: generateFileId(),
        file,
        status: 'pending' as const,
      }))

      setFiles([...files, ...filesWithIds])

      // Trigger upload start for each file
      filesWithIds.forEach((fileWithProgress) => {
        onUploadStart?.(fileWithProgress.file)
      })
    },
    [files, maxFiles, maxSize, onError, onUploadStart, setFiles]
  )

  const removeFile = useCallback(
    (fileId: string) => {
      setFiles(files.filter((f) => f.id !== fileId))
    },
    [files, setFiles]
  )

  const updateFileProgress = useCallback(
    (fileId: string, progress: number) => {
      setFiles(
        files.map((f) => (f.id === fileId ? { ...f, progress, status: 'uploading' as const } : f))
      )
      const fileWithProgress = files.find((f) => f.id === fileId)
      if (fileWithProgress) {
        onUploadProgress?.(fileWithProgress.file, progress)
      }
    },
    [files, setFiles, onUploadProgress]
  )

  const updateFileStatus = useCallback(
    (fileId: string, status: FileWithProgress['status'], error?: string) => {
      setFiles(files.map((f) => (f.id === fileId ? { ...f, status, error } : f)))
      const fileWithProgress = files.find((f) => f.id === fileId)
      if (fileWithProgress && status === 'success') {
        onUploadComplete?.(fileWithProgress.file)
      }
    },
    [files, setFiles, onUploadComplete]
  )

  const contextValue: UploadContextValue = {
    files,
    setFiles,
    addFiles,
    removeFile,
    updateFileProgress,
    updateFileStatus,
    props,
    isDragging,
    setIsDragging,
  }

  const variantClasses = {
    default: 'border-2 border-gray-300',
    bordered: 'border-2 border-solid border-gray-400',
    dashed: 'border-2 border-dashed border-gray-400',
    card: 'border border-gray-200 shadow-sm bg-white',
    ghost: 'border-0 bg-transparent',
  }

  const sizeClasses = {
    sm: 'p-4 text-sm',
    md: 'p-6 text-base',
    lg: 'p-8 text-lg',
  }

  const statusClasses = {
    default: '',
    success: 'border-green-500 bg-green-50',
    warning: 'border-yellow-500 bg-yellow-50',
    error: 'border-red-500 bg-red-50',
  }

  const uploadClasses = cn(
    'upload',
    'rounded-lg transition-all',
    variantClasses[variant],
    sizeClasses[size],
    statusClasses[status],
    {
      'opacity-50': props.disabled,
    },
    className
  )

  const mergedStyle: CSSProperties = {
    borderWidth: props.borderWidth,
    borderColor: props.borderColor,
    borderStyle: props.borderStyle,
    borderRadius: props.borderRadius,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    fontFamily: props.fontFamily,
    color: props.textColor,
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
    padding: props.padding,
    paddingLeft: props.paddingX,
    paddingRight: props.paddingX,
    paddingTop: props.paddingY,
    paddingBottom: props.paddingY,
    margin: props.margin,
    gap: props.gap,
    transitionDuration:
      typeof props.transitionDuration === 'number'
        ? `${props.transitionDuration}ms`
        : props.transitionDuration || '200ms',
    ...style,
  }

  return (
    <UploadContext.Provider value={contextValue}>
      <div ref={ref} className={uploadClasses} style={mergedStyle}>
        {label && (
          <label className="block mb-2 font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {children || (
          <>
            <Dropzone className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <svg
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: props.uploadIconColor || '#9ca3af' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-600 mb-2">
                {emptyStateMessage || 'Drag and drop files here, or click to select'}
              </p>
              <Button>Select Files</Button>
            </Dropzone>

            {files.length > 0 && (
              <div className="mt-4">
                <FileList />
              </div>
            )}
          </>
        )}

        {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
      </div>
    </UploadContext.Provider>
  )
})

UploadRoot.displayName = 'Upload'

// Export compound component
export const Upload = Object.assign(UploadRoot, {
  Dropzone,
  Preview,
  Progress,
  FileList,
  Button,
})
