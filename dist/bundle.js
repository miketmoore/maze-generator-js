/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/carve-maze.ts":
/*!***************************!*\
  !*** ./src/carve-maze.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const carveable_grid_1 = __webpack_require__(/*! ./carveable-grid */ "./src/carveable-grid.ts");
const rand_1 = __webpack_require__(/*! ./rand */ "./src/rand.ts");
function carveMaze(grid) {
    const cell = grid.getRandCell();
    cell.markStart();
    const carveableGrid = carveable_grid_1.carveGridFactory(grid);
    carve(carveableGrid, [cell]);
}
exports.carveMaze = carveMaze;
const getOppositeDirection = direction => {
    if (direction === 'north') {
        return 'south';
    }
    else if (direction === 'east') {
        return 'west';
    }
    else if (direction === 'south') {
        return 'north';
    }
    return 'east';
};
function carve(carveableGrid, history) {
    const cell = history[history.length - 1];
    // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
    const walls = carveableGrid.getAvailableCellWalls(cell, cell.getCoord());
    // get random wall from results
    if (walls.length === 0) {
        if (history.length >= 2) {
            const backtrackedCell = history.pop();
            if (backtrackedCell) {
                backtrackedCell.markPopped();
            }
            carve(carveableGrid, history);
            return;
        }
        return;
    }
    const wallIndex = rand_1.randInRange(0, walls.length);
    const wall = walls[wallIndex];
    wall.state = 'carved';
    cell.markVisited();
    const adjacentCell = carveableGrid.getAdjacentCell(wall.direction, cell.getCoord());
    if (adjacentCell) {
        if (!adjacentCell.isVisited()) {
            const oppDir = getOppositeDirection(wall.direction);
            adjacentCell.getWalls()[oppDir].state = 'carved';
            adjacentCell.markVisited();
            history.push(adjacentCell);
            carve(carveableGrid, history);
        }
    }
}


/***/ }),

/***/ "./src/carveable-grid.ts":
/*!*******************************!*\
  !*** ./src/carveable-grid.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CarveableGrid {
    constructor(grid) {
        this.getCell = (coord) => this.grid.getCell(coord);
        this.getAdjacentCell = (direction, coord) => this.grid.getAdjacentCell(direction, coord);
        this.getAvailableCellWalls = (cell, cellCoord) => {
            // available cell walls are walls that have not been carved and that are adjacent to a cell
            // that has not been visited
            const walls = cell.getWalls();
            const results = [];
            walls.forEach((direction, wall) => {
                if (wall.state === 'solid') {
                    const adjacentCell = this.grid.getAdjacentCell(direction, cellCoord);
                    if (adjacentCell && !adjacentCell.isVisited()) {
                        results.push(wall);
                    }
                }
            });
            return results;
        };
        this.forEachRow = (cb) => {
            this.grid.forEachRow(cb);
        };
        this.grid = grid;
    }
}
function carveGridFactory(grid) {
    return new CarveableGrid(grid);
}
exports.carveGridFactory = carveGridFactory;


/***/ }),

/***/ "./src/cell.ts":
/*!*********************!*\
  !*** ./src/cell.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const walls_1 = __webpack_require__(/*! ./walls */ "./src/walls.ts");
class Cell {
    constructor(coord) {
        this.walls = walls_1.wallsFactory();
        this.visited = false;
        this.start = false;
        this.isPopped = () => this.popped;
        this.markPopped = () => (this.popped = true);
        this.getWalls = () => this.walls;
        this.markVisited = () => (this.visited = true);
        this.markStart = () => (this.start = true);
        this.isStart = () => this.start;
        this.isVisited = () => this.visited;
        this.getOppositeWall = (wall) => {
            if (wall === 0) {
                return 2;
            }
            else if (wall === 1) {
                return 3;
            }
            else if (wall === 2) {
                return 0;
            }
            return 1;
        };
        this.getCoord = () => this.coord;
        this.coord = coord;
    }
}
exports.cellFactory = (coord) => new Cell(coord);


/***/ }),

/***/ "./src/coord.ts":
/*!**********************!*\
  !*** ./src/coord.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Coord {
    constructor(row, col) {
        this.toString = () => `[${this.row},${this.col}]`;
        this.row = row;
        this.col = col;
    }
}
exports.coordFactory = (row, col) => new Coord(row, col);


/***/ }),

/***/ "./src/grid.ts":
/*!*********************!*\
  !*** ./src/grid.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const coord_1 = __webpack_require__(/*! ./coord */ "./src/coord.ts");
const cell_1 = __webpack_require__(/*! ./cell */ "./src/cell.ts");
const rand_1 = __webpack_require__(/*! ./rand */ "./src/rand.ts");
class Grid {
    constructor(rows, cols) {
        this.forEachRow = (cb) => {
            this.cells.forEach((row, rowIndex) => {
                cb(row, rowIndex);
            });
        };
        this.getCell = (coord) => this.cells[coord.row][coord.col];
        this.getAdjacentCellCoords = (direction, coord) => {
            switch (direction) {
                case 'north':
                    return coord_1.coordFactory(coord.row - 1, coord.col);
                case 'east':
                    return coord_1.coordFactory(coord.row, coord.col + 1);
                case 'south':
                    return coord_1.coordFactory(coord.row + 1, coord.col);
                case 'west':
                    return coord_1.coordFactory(coord.row, coord.col - 1);
            }
            return coord_1.coordFactory(-1, -1);
        };
        this.getAdjacentCell = (direction, coord) => {
            const adjacentCoords = this.getAdjacentCellCoords(direction, coord);
            return this.coordInBounds(adjacentCoords)
                ? this.getCell(adjacentCoords)
                : undefined;
        };
        this.rowInBounds = (row) => row >= 0 && row < this.rows;
        this.colInBounds = (col) => col >= 0 && col < this.cols;
        this.coordInBounds = (coord) => {
            return this.rowInBounds(coord.row) && this.colInBounds(coord.col);
        };
        this.getRandCoord = () => coord_1.coordFactory(rand_1.randInRange(0, this.rows - 1), rand_1.randInRange(0, this.cols - 1));
        this.getRandCell = () => {
            const coord = this.getRandCoord();
            return this.cells[coord.row][coord.col];
        };
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        for (let row = 0; row < rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < cols; col++) {
                this.cells[row][col] = cell_1.cellFactory(coord_1.coordFactory(row, col));
            }
        }
    }
}
exports.gridFactory = (rows, cols) => new Grid(rows, cols);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = __webpack_require__(/*! ./grid */ "./src/grid.ts");
const carve_maze_1 = __webpack_require__(/*! ./carve-maze */ "./src/carve-maze.ts");
class MazeGen {
    constructor(options) {
        this.generate = () => carve_maze_1.carveMaze(grid_1.gridFactory(this.rows, this.cols));
        if (!options.rows) {
            throw new Error('rows is required');
        }
        if (!options.cols) {
            throw new Error('cols is required');
        }
        this.rows = options.rows;
        this.cols = options.cols;
    }
}
exports.mazeGenerator = (options) => {
    const mazeGen = new MazeGen(options);
    return mazeGen.generate();
};


/***/ }),

/***/ "./src/rand.ts":
/*!*********************!*\
  !*** ./src/rand.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.randInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};


/***/ }),

/***/ "./src/walls.ts":
/*!**********************!*\
  !*** ./src/walls.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Wall {
    constructor(direction) {
        this.state = 'solid';
        this.direction = direction;
    }
}
exports.Wall = Wall;
const wallFactory = (direction) => new Wall(direction);
// const Walls = {
//   north: wallFactory(),
//   east: wallFactory(),
//   south: wallFactory(),
//   west: wallFactory(),
//   forEach: (cb: (direction: Direction, wall: Wall) => void) => {
//     Object.keys(this).forEach((direction: Direction) => {
//       cb(direction, this[direction])
//     })
//   }
// }
class Walls {
    constructor() {
        this.walls = {
            north: wallFactory('north'),
            east: wallFactory('east'),
            south: wallFactory('south'),
            west: wallFactory('west')
        };
        this.forEach = (cb) => {
            Object.keys(this.walls).forEach((direction) => {
                cb(direction, this.walls[direction]);
            });
        };
        this.north = this.walls.north;
        this.east = this.walls.east;
        this.south = this.walls.south;
        this.west = this.walls.west;
    }
}
exports.wallsFactory = () => new Walls();


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map