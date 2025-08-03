import { defineConfig } from 'vite'
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
  build: {
    lib: {
      entry: {
        index: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.ts'),
        styles: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/styles.ts'),
      },
      name: 'UILibrary',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (entryName === 'styles') {
          return format === 'es' ? 'styles.js' : 'styles.cjs'
        }
        return format === 'es' ? 'index.js' : 'index.cjs'
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
      },
    },
    sourcemap: false,
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), './src'),
    },
  },
})
