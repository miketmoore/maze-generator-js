# Changelog

## [Unreleased]

### Changed

- Started using a changelog :)
- Significantly decreased heap usage. Example: a 500x500 grid using the iterative strategy reduced from 570MB to 6.2MB.
- Breaking change in API for response grid instance. Use `grid.getWalls()`, then each wall property, such as `walls.north` is now a boolean that indicates if the wall is "solid" (exists) or is "carved" (does not exist).
- Added a "clean" script: `yarn clean` that should be used before `yarn build`
