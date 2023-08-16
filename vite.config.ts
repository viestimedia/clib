/// <reference types="vitest" />
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

// @ts-ignore Shut up and do it
import * as packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // This removes the JSX runtime but breaks the build, so don't do this.
      // jsxRuntime: 'classic',
    }),
    tsConfigPaths(),
    dts({
      include: ['src/components/'],
    }),
  ],

  test: {
    globals: true,
    setupFiles: ['./src/vitest-setup.ts'],
    environment: 'happy-dom',
  },

  build: {
    lib: {
      entry: 'src/components/index.ts',

      name: 'clib',
      formats: ['es', 'cjs'],

      // Do not touch this or everything will break
      fileName: (format, entry) => `${entry}.${format === 'es' ? 'es.js' : format}`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
