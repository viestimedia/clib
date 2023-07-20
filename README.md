# React library

Component library boilerplate using [Vite](https://vitejs.dev/) as a build system.

Not necessarily intended to be published on npm, more like installed from GitHub directly.

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
# Assuming you didn't change the name in package.json
npm link clib 
```

Now, when you build the library (`npm run build`), it should automatically update in the project you linked it to.

You can also work on the components in isolation by running `npm run dev`. Include your components in `App.tsx` to see them in action.

