# Maze Generator

This is a javascript library, written in TypeScript that generates a maze data structure.

## Install

```
yarn add maze-generator --dev
```

## Usage

```
import { mazeGenerator } from 'maze-generator'
const grid = mazeGenerator({
    rows: 10,
    columns: 10
})
```

## Publishing a Release

1. Checkout the commit that is ready to release.
2. Check this out as a branch named `release-X.X.X`
3. Clean the build directory - `yarn clean`
4. Compile `yarn build` - the TypeScript is compiled to JavaScript into the `dist` directory.
5. Publish with `yarn publish --access=public`. The CLI will prompt for the version number and npm credentials.
6. Navigate to https://www.npmjs.com/package/@miketmoore/maze-generator and smile :)

## Heapdump Profiling

https://github.com/bnoordhuis/node-heapdump is installed as a development dependency. You can create a heapdump by running

```
yarn clean && yarn build && node examples/itertive-heapdump.js
```
