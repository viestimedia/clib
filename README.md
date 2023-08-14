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

This library is automatically published on npm whenever a release is created from a version tag.

Easiest way to generate a tag is to navigate to https://github.com/viestimedia/clib/actions/workflows/generate-tag.yml, and click "Run workflow". Choose the version type (major, minor, patch), wait a few seconds for the action to complete, and then create a new release from the newly created tag: https://github.com/viestimedia/clib/releases/new

Select the tag you just created, click "Publish release". After a few minutes, you can run `npm install @viestimedia/clib` to update the library wherever you're consuming it.