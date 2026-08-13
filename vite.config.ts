/// <reference types="vitest" />
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// @ts-ignore Shut up and do it
import * as packageJson from './package.json';

const externalDeps = [
  ...Object.keys(packageJson.peerDependencies),
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];

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
    {
      // focus-trap-react is plain CJS and does `require('react')` in its own
      // source to read React.version. 'react' is external here, and rolldown's
      // fallback for a require() targeting an external only works if a global
      // `require` exists at runtime - true in Node's CJS mode, but not under
      // native ESM loaders (Vitest) or in the browser (Next.js/webpack), where
      // it either throws or fails to statically resolve. Converting this one
      // known require() call to a real import at the source level means
      // rolldown never needs that fallback for it at all.
      name: 'focus-trap-react-require-to-import',
      transform(code, id) {
        if (!id.includes('/focus-trap-react/')) return null;
        if (!code.includes("require('react')")) return null;
        return code.replace(
          "var React = require('react');",
          "import React from 'react';"
        );
      },
    },
  ],

  test: {
    globals: true,
    setupFiles: ['./src/vitest-setup.ts'],
    environment: 'happy-dom',
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
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
      cssFileName: 'style',
    },
    rolldownOptions: {
      external: externalDeps,
    },
  },
});
