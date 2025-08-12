import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/tests/setupTests.ts'],
  },
  build: {
    lib: {
      entry: {
        index: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.ts'),
        styles: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/styles.ts'),
      },
      name: 'UILibrary',
      formats: ['es'],
      fileName: (_format, entryName) => {
        if (entryName === 'styles') {
          return 'styles.js'
        }
        return 'index.js'
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'styles.css'
          }
          return assetInfo.name || 'assets/[name].[ext]'
        },
        manualChunks: undefined,
        compact: true,
        generatedCode: {
          constBindings: true,
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
        ascii_only: true,
      },
    },
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), './src'),
    },
  },
})
