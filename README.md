# Viestimedia Component library

Component library boilerplate using [Vite](https://vitejs.dev/) as a build system.

Confirmed to work with Remix 1.19 and Next 12

## Local development

To link the library to a project locally,
run the following commands:

```
npm install
npm run build
npm link

```

Then, in the project you want to use the library in, run:

```
npm link @viestimedia/clib
```

Now, when you build the library (`npm run build`), it should automatically update in the project you linked it to.

You can also work on the components in isolation by running `npm run dev`. Include your components in `App.tsx` to see them in action.

## Troubleshooting

Chances are you will run into errors when `npm link`ing the library to a project.

### Changes not showing up in the project

If your changes aren't showing up, run `npm run build` in the library, and restart / rebuild the project you linked it to.

### Uncaught TypeError: Cannot read properties of null (reading 'useContext')

This is accompanied by https://react.dev/warnings/invalid-hook-call-warning

Most likely the library's React is not the same as the project's React.

Assuming the library and the project are in sibling folders, linking the project's React to the library should fix the problem:

```
npm link ../libraryconsumerproject/node_modules/react
```

## Publishing

This library is automatically published on NPM by a GitHub action that creates a version tag and a new release based on that tag.

Easiest way to generate a tag is to navigate to https://github.com/viestimedia/clib/actions/workflows/generate-tag.yml, and click "Run workflow". Choose the version type (major, minor, patch). If the workflow is successful, it will release a new version to NPM after first creating a tag and a release with release notes.
