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
      output: {
        // Rolldown's ESM output for externals falls back to a `require()` that
        // throws in environments without a global `require` (e.g. Vitest
        // loading externalized deps via Node's native ESM loader) - some
        // bundled runtime deps (focus-trap-react) are plain CJS and call
        // require('react') internally. A real, working `require` bound to
        // this module satisfies that fallback everywhere it's checked.
        intro: "import { createRequire as __createRequire } from 'module';\nconst require = __createRequire(import.meta.url);",
      },
    },
  },
});
