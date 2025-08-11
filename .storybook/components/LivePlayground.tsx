import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as JustUI from '../../src/components'

import { themes as prismThemes } from 'prism-react-renderer'

export type LivePlaygroundProps = {
  code: string
  noInline?: boolean
  scopeExtras?: Record<string, unknown>
  className?: string
}

const LivePlayground: React.FC<LivePlaygroundProps> = ({
  code,
  noInline = false,
  scopeExtras = {},
  className = '',
}) => {
  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <LiveProvider
        code={code}
        noInline={noInline}
        scope={{ React, ...JustUI, ...scopeExtras }}
        language="jsx"
        theme={prismThemes.github}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">Preview</div>
            <div className="p-2 rounded-md bg-white">
              <LivePreview />
            </div>
            <div className="mt-2 text-sm text-red-600">
              <LiveError />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border-b">
              Editor (JSX)
            </div>
            <LiveEditor className="font-mono text-sm leading-5" />
          </div>
        </div>
      </LiveProvider>
    </div>
  )
}

export default LivePlayground
