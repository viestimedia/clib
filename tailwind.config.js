/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // Disabling preflight as this is a component library that assumes
    // user is either using tailwind, or their own reset.
    // https://tailwindcss.com/docs/preflight
    // preflight: false,
    // It's better to disable this in the exported CSS, as
    // the reset is very much wanted by the index.html
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
