# Component library

```
npm install
npm run build
npm link # only once 

# cd to the project you want to use the library in
npm link clib
# Build should sync automatically
```

Current status: 

Renders simple components fine when using HMR, but server rendering errors with

Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
    at renderElement (/home/wsl/Projects/remix/ilmoitusautomaatti/node_modules/react-dom/cjs/react-dom-server.node.development.js:6109:9)

