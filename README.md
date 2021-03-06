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

## Tests

```
yarn test
```

## Publishing a Release

1. Checkout the commit that is ready to release.
2. Check this out as a branch named `release-X.X.X`
3. Compile `yarn build` (this will also clean the build directory first) - the TypeScript is compiled to JavaScript into the `dist` directory.
4. Publish with `yarn publish --access=public`. The CLI will prompt for the version number and npm credentials.
5. Navigate to https://www.npmjs.com/package/@miketmoore/maze-generator and smile :)

## Benchmark

```
yarn && yarn build && yarn benchmark
```

Example output after benchmark test runs:

```
recursive x 117 ops/sec ±2.39% (66 runs sampled)
iterative x 125 ops/sec ±1.16% (71 runs sampled)
Fastest is iterative
```
