# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.3]

### Added

- Added benchmark tests

## [2.0.2]

- Fixed bug where using recursive strategy would run the iterative strategy too
- Removed getOppositeWall from cell (it wasn't used)
- Moved getOppositeDirection to Cell
- Separate strategy functions into their own files
- Moved Direction type definition to cell module
- Removed markVisited from Cell and now marking as visited inside carveWall
- Removed isCarved
- Renamed example file from iterative-heapdump.js to iterative.js

## [2.0.1]

### Changed

- Added tests

## [2.0.0]

### Changed

- Started using a changelog, :)
- Significantly decreased heap usage. Example: a 500x500 grid using the iterative strategy reduced from 570MB to 6.2MB
- Breaking change in API for response grid instance. Use `grid.getWalls()`, then each wall property, such as `walls.north` is now a boolean that indicates if the wall is "solid" (exists) or is "carved" (does not exist)
- Added a "clean" step to `yarn build`
- Added "GNU General Public License v3.0" (GNU GPLv3) license
