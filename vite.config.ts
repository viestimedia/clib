import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

// @ts-ignore Shut up and do it
import * as packageJson from './package.json'

console.log('packageJson', packageJson, Object.keys(packageJson.peerDependencies))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // jsxRuntime: 'classic',
    }),
    tsConfigPaths(),
    dts({
      include: ['src/components/'],
    }),
  ],

  build: {
    lib: {
      // entry: [resolve('src', 'exports.ts')],
      // entry: resolve('src', 'component/main.tsx'),
      entry: 'src/components/index.ts',

      name: 'clib',
      formats: ['es', 'cjs'],
      // formats: ['es', 'umd'],
      // formats: ['es'],
      fileName: (format, entry) => `${entry}.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // inlineDynamicImports: true,
      },
    },
  },
})
