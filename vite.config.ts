/// <reference types="vitest" />
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// @ts-ignore Shut up and do it
import * as packageJson from './package.json';

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
    svgr({
      exportAsDefault: true,
    }),
  ],

  test: {
    globals: true,
    setupFiles: ['./src/vitest-setup.ts'],
    environment: 'happy-dom',
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',

      /**
       * Generate classes in the following format:
       *
       * .vmButton__blendButton
       */
      generateScopedName(name, filename, css) {
        const parts = filename.split('?')[0].split('/');
        const lastSegment = parts.pop();

        // Remove .module from the name, as it transforms into -module in the class name.
        const baseFilename = lastSegment.replace(/(\.module)?(\.\w+)$/, '');

        return `vm${baseFilename}__${name}`;
      },
      hashPrefix: '',
    },
  },

  build: {
    lib: {
      entry: 'src/components/index.ts',

      name: 'clib',
      formats: ['es'],
      // fileName(format, entry) {
      //   return entry + '.' + format;
      // },
      // formats: ['es', 'cjs'],

      // // Do not touch this or everything will break
      // fileName: (format, entry) =>
      //   `${entry}.${format === 'es' ? 'mjs' : format}`,
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
});
