# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Started using a changelog, :)
- Significantly decreased heap usage. Example: a 500x500 grid using the iterative strategy reduced from 570MB to 6.2MB
- Breaking change in API for response grid instance. Use `grid.getWalls()`, then each wall property, such as `walls.north` is now a boolean that indicates if the wall is "solid" (exists) or is "carved" (does not exist)
- Added a "clean" step to `yarn build`
- Added "GNU General Public License v3.0" (GNU GPLv3) license
